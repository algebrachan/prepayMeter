import React, { Component } from 'react';
import { Typography, Input, Card, Button, Modal, message, Spin, Form, Row, Col } from 'antd';
import { isNull } from 'util';
import { modifyAgentAccount, getAgentAccount, sendEditAccountVeriCode } from '../../../../../utils/api';
import intl from 'react-intl-universal';
import '../style.css';

const { TextArea } = Input;

class Ali extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalshow: false,
            account: '',
            token: '',
            password: '',
            spinning: false,
            modalspin: false,
            btnname: '点击获取验证码',
            waittime: 60,
            btnstat: false,
        }
        this.requestData = this.requestData.bind(this);
        this.validatorLength = this.validatorLength.bind(this);
        this.Loading = this.Loading.bind(this);
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 6 } },
            wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
        };
        const formItemLayout2 = {
            labelCol: { xs: { span: 24 }, sm: { span: 6 } },
            wrapperCol: { xs: { span: 24 }, sm: { span: 8 } },
        };
        return (
            <div className="syspre_agent_account_pay_root">
                <Spin spinning={this.state.spinning} >
                    <Card className="syspre_agent_account_pay_card">
                        <div className="agent_account_pay_title">支付宝账号</div>
                        <div className="agent_account_pay_item">
                            <Typography.Text className="agent_account_pay_item_label">支付宝账号：</Typography.Text>
                            <Input autoComplete='off' value={this.state.account} className="agent_account_pay_item_input" disabled />
                        </div>
                        <div className="agent_account_pay_item">
                            <Typography.Text className="agent_account_pay_item_label">授权Token/实名认证名称：</Typography.Text>
                            <TextArea autoComplete='off' className="agent_account_pay_item_input" value={this.state.token} disabled />
                        </div>
                        <div className="agent_account_pay_item">
                            <Button type="primary" className="agent_account_pay_item_btn" onClick={() => this.changeModal(true)}>{intl.get('COMMON_BTN.EDIT')}</Button>
                        </div>
                    </Card>
                    <Modal
                        title='修改'
                        visible={this.state.modalshow}
                        destroyOnClose
                        centered
                        onCancel={() => this.changeModal(false)}
                        onOk={() => this.setData()}
                    >
                        <Spin spinning={this.state.modalspin}>
                            <Form>
                                <Form.Item label="支付宝账号" {...formItemLayout}>
                                    {getFieldDecorator('submid', {
                                        rules: [{
                                            required: true,
                                            message: '账号',
                                        }],
                                        initialValue: this.state.account
                                    })(
                                        <Input autoComplete='off' placeholder='请输入账号' />
                                    )}
                                </Form.Item>
                                <Form.Item label="Token/实名认证" {...formItemLayout}>
                                    {getFieldDecorator('token', {
                                        rules: [{
                                            required: true,
                                            message: 'Token',
                                        }],
                                        initialValue: this.state.token
                                    })(
                                        <Input autoComplete='off' placeholder='请输入Token/实名认证' />
                                    )}
                                </Form.Item>
                                <Form.Item label="密码" {...formItemLayout}>
                                    <Row gutter={8}>
                                        <Col span={12}>
                                            {getFieldDecorator('psw', {
                                                rules: [{ required: true, message: '请输入密码' }, { validator: this.validatorLength }],
                                            })(<Input autoComplete='off' placeholder='请输入密码' />)}
                                        </Col>
                                        <Col span={12}>
                                            <Button className="modal_btn" onClick={() => this.getVerCode()} disabled={this.state.btnstat}>{this.state.btnname}</Button>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Form>
                        </Spin>
                    </Modal>
                </Spin>
            </div>
        );
    }
    getVerCode() {
        sendEditAccountVeriCode(
            (res) => {
                if (res.data && res.data.Status === 0 && res.data.Data) {
                    message.success(`${intl.get('COMMON_MESSAGE.SEND_SUCS')}`);
                    this.changeVerCodeStat();
                } else {
                    message.error(res.data.Message);
                }
            },
            () => {
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            })


    }
    changeVerCodeStat() {
        var inter = setInterval(function () {
            this.setState({
                btnstat: true,
                btnname: this.state.waittime + 's后重发',
                waittime: this.state.waittime - 1
            });
            if (this.state.waittime < 0) {
                clearInterval(inter);
                this.setState({
                    btnstat: false,
                    btnname: '点击获取验证码',
                    waittime: 60,
                });
            }
        }.bind(this), 1000);
    }

    componentDidMount() {
        this.requestData();
    }

    requestData() {
        this.Loading(true);
        getAgentAccount('zfb',
            (res) => {
                this.Loading(false);
                if (res.data.Status === 0) {
                    this.setState({
                        account: res.data.Data.Mchid === null ? '' : res.data.Data.Mchid,
                        token: res.data.Data.Zfb_token === null ? '' : res.data.Data.Zfb_token,
                        password: '',
                    });
                }
            },
            () => {
                this.Loading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            }
        )
    }

    setData() {
        const form = this.props.form;
        let isValid = false;
        form.validateFields(['submid', 'psw', 'token'], { force: true }, (err, value) => {
            isValid = isNull(err);
        });
        if (!isValid) {
            return;
        }
        const account = form.getFieldValue('submid');
        const password = form.getFieldValue('psw');
        const token = form.getFieldValue('token');

        const param = {
            Mac: '',
            Agtid: '',
            Zfb_mchid: account,
            Zfb_token: token,
            Paswd: password,
            Action: 'zfb',
        }
        this.ModalLoading(true);
        modifyAgentAccount(param,
            (res) => {
                this.ModalLoading(false);
                if (res.data.Status === 0) {
                    message.success(`${intl.get('COMMON_MESSAGE.SAVE_SUCS')}`);
                    this.changeModal(false);
                    this.requestData();
                    return;
                } else {
                    message.error(res.data.Message);
                    return;
                }
            },
            () => {
                this.ModalLoading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            });
    }

    changeModal(value) {
        this.setState({
            modalshow: value,
        });
    }

    Loading(value) {
        this.setState({
            spinning: value
        });
    }

    ModalLoading(value) {
        this.setState({
            modalspin: value
        });
    }

    validatorLength(rule, value, callback) {

        if (value && value.length > 20) {
            callback('请输入小于20个字符');
        }
        else {
            callback();
        }
    }

}
export default Form.create({})(Ali);