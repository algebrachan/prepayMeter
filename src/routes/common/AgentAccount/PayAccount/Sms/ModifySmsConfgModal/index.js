import React, { Component, Fragment } from 'react';
import { Modal, Form, Input, Switch, Row, Col, message, Icon, Spin } from 'antd';
import { modifyAgentSmsAccount } from '../../../../../../utils/api';
import intl from 'react-intl-universal';
import { isNull } from 'util';

class ModifySmsConfigModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: {
                Almcny: props.data.Almcnl / 1000,
                Enable: props.data.Enable,
            }
        }
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let data =
        {
            Almcny: nextProps.data.Almcnl / 1000,
            Enable: nextProps.data.Enable
        }
        this.setState({
            data: data
        });
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
            }
        }
        return (
            <Modal
                title='编辑'
                visible={this.props.show}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                destroyOnClose
                centered >
                <Spin spinning={this.state.loading}>
                    <Form>
                    <Form.Item label="余额提醒(元)" {...formItemLayout}>
                        {getFieldDecorator('Almcny', {
                            rules: [
                                {
                                    required: true,
                                    type: 'integer',
                                    message: '请输入正确的提醒金额(整数元)',
                                    transform(value) {
                                        if (value) {
                                            return Number(value);
                                        }
                                    },
                                },
                                {
                                    validator: this.validatorLength,
                                }
                            ],
                            initialValue: this.state.data.Almcny,
                        })(
                            <Input autoComplete='off' placeholder='提醒余额0-1000元' />
                        )}
                    </Form.Item>                        
                        <Form.Item
                            label="启用短信提醒"
                            {...formItemLayout}>
                            {getFieldDecorator('Enable',
                                {
                                    rules: [],
                                    valuePropName: 'checked',
                                    initialValue: this.state.data.Enable,
                                },
                            )(
                                <Switch />
                            )}
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>

        );
    }

    validatorLength(rule, value, callback) {

        if (value && value > 1000) {
            callback('余额提醒金额不超过1000');
        }
        else {
            callback();
        }
    }

    changeCny(val) {
        this.setState({
            cny: val
        });
    }

    handleOk = () => {
        const form = this.props.form;
        let isValid = false;

        form.validateFields(['Almcny', 'Enable'], { force: true }, (err, value) => {
            isValid = isNull(err);
        });

        //校验失败直接返回
        if (!isValid) {
            return;
        }
        const Almcny = form.getFieldValue('Almcny');
        const Enable = form.getFieldValue('Enable');
        let param = {
            Mac: '',
            Agtid: '',
            Almcnl: Almcny * 1000,
            Enable: Enable
        }
        this.commit(param);
    }

    handleCancel = () => {
        this.props.onCancel();
    }

    Loading(loading)
    {
        this.setState({
            loading: loading
        })
    }

    commit(param) {
        this.Loading(true);

        modifyAgentSmsAccount(param,
            (res) => {
                this.Loading(false);
                if (res.data.Status === 0) {
                    this.handleCancel();
                }
                else
                {
                    message.error(`${intl.get('COMMON_MESSAGE.OPER_FAIL')}` + res.data.Message);
                }
            },
            () => {
                this.Loading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            }
        )
    }
}
export default Form.create({})(ModifySmsConfigModal)
