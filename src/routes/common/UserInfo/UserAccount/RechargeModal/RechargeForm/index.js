import React, { Component } from 'react';
import { Input, Select,  Form } from 'antd';
import intl from 'react-intl-universal';
class RechargeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

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
            },
        };
        return (
            <Form>
                <div style={{ display: this.state.mode === 'add' ? 'none' : 'block' }}>
                    <Form.Item
                        label={intl.get('USER_INFO.CSTM_NO')} {...formItemLayout}>
                        {getFieldDecorator('id', {
                            initialValue: this.props.cstmid,
                        })(
                            <Input autoComplete='off' disabled={this.state.mode !== 'add'} />
                        )}
                    </Form.Item>
                </div>
                <Form.Item label={intl.get('USER_INFO.RCG_MONEY')} {...formItemLayout}>
                    {getFieldDecorator('value', {
                        rules: [
                            {
                                required: true,
                                type: 'number',
                                message: `${intl.get('USER_INFO.RCG_MONEY_MSG')}`,
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
                        initialValue: this.state.name,
                    })(
                        <Input autoComplete='off' placeholder={intl.get('COMMON_MESSAGE.RCG_5000')} />
                    )}
                </Form.Item>
                <Form.Item
                    label={intl.get('USER_INFO.PAY_WAY')}
                    {...formItemLayout}>
                    {getFieldDecorator('type', {
                        rules: [{
                            required: true,
                            message:  `${intl.get('USER_INFO.PAY_WAY_MSG')}`,
                        }],
                        initialValue: undefined
                    })(
                        <Select>
                            <Select.Option key='1' value='1'>{intl.get('COMMON.ALI')}</Select.Option>
                            <Select.Option key='2' value='2'>{intl.get('COMMON.WX')}</Select.Option>
                            <Select.Option key='3' value='3'>{intl.get('COMMON.BANK')}</Select.Option>
                            <Select.Option key='4' value='4'>{intl.get('COMMON.CASH')}</Select.Option>
                            <Select.Option key='4' value='5'>{intl.get('COMMON.COR_ACT')}</Select.Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label={intl.get('LOGIN.PSW')} {...formItemLayout}>
                    {getFieldDecorator('pwd', {
                        rules: [
                            {
                                required: true,
                                message: `${intl.get('LOGIN.IPT_PH_PSW')}`,

                            }
                        ],

                    })(
                        <Input.Password autoComplete='off' visibilityToggle={false} />
                    )}
                </Form.Item>

            </Form>
        );
    }

    validatorLength(rule, value, callback) {

        if (value && value > 5000) {
            callback(`${intl.get('COMMON_MESSAGE.RCG_5000')}`);
        }
        else {
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

export default Form.create({

})(RechargeForm);;