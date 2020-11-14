import React, { Component } from 'react';
import { Typography, Input, Card, Button, Modal, message, Spin, Form, Row, Col } from 'antd';
import { isNull } from 'util';
import { modifyAgentAccount, getAgentAccount, sendEditAccountVeriCode } from '../../../../../utils/api';
import intl from 'react-intl-universal';
import '../style.css';
class Wx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalshow: false,
            account: '',
            password: '',
            spinning: false,
            modalspin: false,
            btnname: '获取验证码',
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
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        return (
            <div className="syspre_agent_account_pay_root">
                <Spin spinning={this.state.spinning} >
                    <Card className="syspre_agent_account_pay_card" >
                        <div className="agent_account_pay_title">微信商户号</div>
                        <div className="agent_account_pay_item">
                            <Typography.Text className="agent_account_pay_item_label">特约商户号：</Typography.Text>
                            <Input
                                autoComplete='off'
                                value={this.state.account}
                                className="agent_account_pay_item_input"
                                disabled
                            />
                        </div>
                        <div className="agent_account_pay_item">
                            <Button type="primary" className="agent_account_pay_item_btn" onClick={() => this.changeModal(true)}>
                                {intl.get('COMMON_BTN.EDIT')}
                            </Button>
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
                                <Form.Item label="微信商户号" {...formItemLayout}>
                                    {getFieldDecorator('submid', {
                                        rules: [{
                                            required: true,
                                            message: '商户号',
                                        }, {
                                            validator: this.validatorLength,
                                        }],
                                        initialValue: this.state.account
                                    })(
                                        <Input autoComplete='off' placeholder='请输入商户号' />
                                    )}
                                </Form.Item>
                                <Form.Item label="验证码" {...formItemLayout}>
                                    <Row gutter={8}>
                                        <Col span={12}>
                                            {getFieldDecorator('psw', {
                                                rules: [{ required: true, message: '请输入验证码', }, { validator: this.validatorLength, }],
                                            })(<Input autoComplete='off' placeholder='请输入验证码' />)}
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
            </div >
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
        getAgentAccount('wx',
            (res) => {
                this.Loading(false);
                if (res.data.Status === 0) {
                    this.setState({
                        account: res.data.Data.Mchid === null ? '' : res.data.Data.Mchid,
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
        form.validateFields(['submid', 'psw'], { force: true }, (err, value) => {
            isValid = isNull(err);
        });
        if (!isValid) {
            return;
        }
        const account = form.getFieldValue('submid');
        const password = form.getFieldValue('psw');

        const param = {
            Mac: '',
            Agtid: '',
            Wx_mchid: account,
            Paswd: password,
            Action: 'wx',
        }
        this.ModalLoading(true);
        modifyAgentAccount(param,
            (res) => {
                this.ModalLoading(false);
                this.Loading(false);
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
            modalshow: value
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
export default Form.create({})(Wx);