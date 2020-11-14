import React, { Component } from 'react';
import { Input, Form, Select } from 'antd';
import intl from 'react-intl-universal';
class EditAgentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agent_keyid: props.data.agent_keyid,
            agent_name: props.data.agent_name,
            agent_company: props.data.agent_company,
            agent_owner: props.data.agent_owner,
            agent_phone: props.data.agent_phone,
            agent_locat: props.data.agent_locat,
            agent_type: props.data.agent_type,
            mode: props.mode,
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
                <Form.Item label={intl.get('AGENT_LIST.HEADER.NUMBER')} {...formItemLayout}>
                    {getFieldDecorator('agent_keyid', {
                        rules: [{
                            required: false,
                        }
                        ],
                        initialValue: this.state.agent_keyid
                    })(
                        <Input autoComplete='off' placeholder={intl.get('AGENT_LIST.MODAL.NUMBER_PH')} disabled={true} />
                    )}
                </Form.Item>
                <Form.Item label={intl.get('AGENT_LIST.HEADER.NAME')} {...formItemLayout}>
                    {getFieldDecorator('agent_name', {
                        rules: [{
                            required: true,
                            message: `${intl.get('AGENT_LIST.MODAL.NAME_MSG')}`,
                        },
                        {
                            validator: this.validatorLength,
                        }],
                        initialValue: this.state.agent_name
                    })(
                        <Input autoComplete='off' placeholder={intl.get('AGENT_LIST.MODAL.NAME_PH')} />
                    )}
                </Form.Item>
                <Form.Item label={intl.get('AGENT_LIST.TABLE.TYPE')} {...formItemLayout}>
                    {getFieldDecorator('agent_type', {
                        rules: [{
                            required: true,
                            message: `${intl.get('AGENT_LIST.MODAL.TYPE_MSG')}`,
                        },
                        {
                            validator: this.validatorLength,
                        }],
                        initialValue: this.state.agent_type
                    })(
                        <Select disabled={this.state.mode == 'edit'}>
                            <Select.Option key='0' value={0}>{intl.get('AGENT_LIST.TABLE.TYPE_COMP')}</Select.Option>
                            <Select.Option key='1' value={1}>{intl.get('AGENT_LIST.TABLE.TYPE_P')}</Select.Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label={intl.get('AGENT_LIST.TABLE.OWNER')} {...formItemLayout}>
                    {getFieldDecorator('agent_owner', {
                        rules: [{
                            required: true,
                            message: `${intl.get('AGENT_LIST.MODAL.OWNER_MSG')}`,
                        },
                        {
                            validator: this.validatorLength,
                        }],
                        initialValue: this.state.agent_owner
                    })(
                        <Input autoComplete='off' placeholder={intl.get('AGENT_LIST.MODAL.OWNER_PH')} />
                    )}
                </Form.Item>
                <Form.Item label={intl.get('AGENT_LIST.HEADER.PHONE')} {...formItemLayout}>
                    {getFieldDecorator('agent_phone', {
                        rules: [{
                            required: true,
                            message: `${intl.get('AGENT_LIST.MODAL.PHONE_MSG')}`,
                        },
                        {
                            validator: this.validatorPhone,
                        }],
                        initialValue: this.state.agent_phone
                    })(
                        <Input autoComplete='off' placeholder={intl.get('AGENT_LIST.MODAL.PHONE_PH')} />
                    )}
                </Form.Item>
                <Form.Item label={intl.get('AGENT_LIST.TABLE.ADDR')} {...formItemLayout}>
                    {getFieldDecorator('agent_locat', {
                        rules: [{
                            required: true,
                            message: `${intl.get('AGENT_LIST.MODAL.ADDR_MSG')}`,
                        },
                        {
                            validator: this.validatorLength,
                        }],
                        initialValue: this.state.agent_locat
                    })(
                        <Input autoComplete='off' placeholder={intl.get('AGENT_LIST.MODAL.ADDR_PH')} />
                    )}
                </Form.Item>

            </Form>
        );
    }
    validatorLength(rule, value, callback) {

        if (value && value.length > 20) {
            callback(`${intl.get('COMMON_MESSAGE.LENGTH_CHECK')}`);
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

export default Form.create({})(EditAgentForm);