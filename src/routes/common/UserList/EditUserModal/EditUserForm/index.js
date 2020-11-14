import React, { Component } from 'react';
import { Input, Form, Row, Col, message, Button } from 'antd';
import { sendVeriCode } from '../../../../../utils/api';
import { VeriCodeType } from '../../../../../utils/enum';
import { isNull } from 'util';
import intl from 'react-intl-universal';
class EditUserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_keyid: props.data.user_keyid,
            user_name: props.data.user_name,
            user_phone: props.data.user_phone,
            user_agentid: props.data.user_agentid,
            mode: props.mode,
            btnname: `${intl.get('USER_LIST.MODAL.GET_VCODE')}`,
            waittime: 60,
            btnstat: false,
        }
        this.validatorLength = this.validatorLength.bind(this);
        this.validatorPhone = this.validatorPhone.bind(this);

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
        };
        return (
            <Form>
                <Form.Item label={intl.get('USER_LIST.ACCOUNT')} {...formItemLayout}>
                    {getFieldDecorator('user_keyid', {
                        rules: [{
                            required: false,
                        }],
                        initialValue: this.state.user_keyid
                    })(
                        <Input autoComplete='off' placeholder={intl.get('USER_LIST.MODAL.ACT_PH')} disabled={true} />
                    )}
                </Form.Item>
                <Form.Item label={intl.get('USER_LIST.NAME')} {...formItemLayout}>
                    {getFieldDecorator('user_name', {
                        rules: [{
                            required: true,
                            message: `${intl.get('USER_LIST.MODAL.NAME_MSG')}`,
                        },
                        {
                            validator: this.validatorLength,
                        }],
                        initialValue: this.state.user_name
                    })(
                        <Input autoComplete='off' placeholder={intl.get('USER_LIST.NAME')} />
                    )}
                </Form.Item>
                <Form.Item label={intl.get('USER_LIST.PHONE')} {...formItemLayout}>
                    {getFieldDecorator('user_phone', {
                        rules: [{
                            required: true,
                            message: `${intl.get('USER_LIST.MODAL.PHONE_MSG')} `,
                        },
                        {
                            validator: this.validatorPhone,
                        }],
                        initialValue: this.state.user_phone
                    })(
                        <Input autoComplete='off' placeholder={intl.get('USER_LIST.PHONE')} />
                    )}
                </Form.Item>
                <Form.Item label={intl.get('USER_LIST.MODAL.CODE')} {...formItemLayout}>
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('user_code', {
                                rules: [{ required: true, message: `${intl.get('USER_LIST.MODAL.CODE_MSG')}`, }]
                            })
                                (<Input autoComplete='off' placeholder={intl.get('USER_LIST.MODAL.CODE')} />)}
                        </Col>
                        <Col span={12}>
                            <Button className="modal_btn" onClick={() => this.getVerCode()} disabled={this.state.btnstat}>{this.state.btnname}</Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        );
    }

    componentDidMount() {

    }
    getVerCode() {
        const form = this.props.form;
        let isValid = false;
        form.validateFields(['user_phone'], { force: true }, (err, value) => {
            isValid = isNull(err);
        });
        if (!isValid) {
            return;
        }
        sendVeriCode(form.getFieldValue('user_phone'), VeriCodeType.REGISTER,
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
                btnname: this.state.waittime + `s ${intl.get('USER_LIST.MODAL.RSEND')}`,
                waittime: this.state.waittime - 1
            });
            if (this.state.waittime < 0) {
                clearInterval(inter);
                this.setState({
                    btnstat: false,
                    btnname: `${intl.get('USER_LIST.MODAL.GET_VCODE')}`,
                    waittime: 60,
                });
            }
        }.bind(this), 1000);
    }

    validatorLength(rule, value, callback) {

        if (value && value.length > 20) {
            callback(`${intl.get('COMMON_MESSAGE.LENGTH_CHECK')}`);
        }
        else {
            callback();
        }
    }
    validatorNumber(rule, value, callback) {
        if (value && (value.length > 20)) {
            callback(`${intl.get('COMMON_MESSAGE.LENGTH_CHECK')}`);
        } else if (value && (!/^[0-9]*$/.test(value))) {
            callback(`${intl.get('COMMON_MESSAGE.NUMBER_CHECK')}`);
        } else {
            callback();
        }
    }

    validatorPhone(rule, value, callback) {
        if (value && (value.length > 20 || !/^[0-9]*$/.test(value))) {
            callback(`${intl.get('COMMON_MESSAGE.PHONE_CHECK')}`);
        }
        else {
            callback();
        }
    }

}
export default Form.create({})(EditUserForm);