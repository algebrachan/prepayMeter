import React, { Component } from 'react';
import { Input, Form, Switch } from 'antd';

class EditFeeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profee_keyid: props.data.profee_keyid,
            profee_owner: props.data.profee_owner,
            profee_name: props.data.profee_name,
            profee_phone: props.data.profee_phone,
            profee_prop: props.data.profee_prop,
            profee_agtid: props.data.profee_agtid,
            profee_enable: props.data.profee_enable,
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
                <Form.Item label="条目ID" {...formItemLayout}>
                    {getFieldDecorator('profee_keyid', {
                        rules: [{
                            required: false,

                        }
                        ],
                        initialValue: this.state.profee_keyid
                    })(
                        <Input autoComplete='off' placeholder='条目ID自动创建' disabled={true} />
                    )}
                </Form.Item>
                <Form.Item label="主体" {...formItemLayout}>
                    {getFieldDecorator('profee_owner', {
                        rules: [{
                            required: true,
                            message: '请输入主体',
                        },
                        {
                            validator: this.validatorLength,
                        }],
                        initialValue: this.state.profee_owner
                    })(
                        <Input autoComplete='off' placeholder='主体' />
                    )}
                </Form.Item>
                <Form.Item label="联系人" {...formItemLayout}>
                    {getFieldDecorator('profee_name', {
                        rules: [{
                            required: true,
                            message: '请输入联系人',
                        },
                        {
                            validator: this.validatorLength,
                        }],
                        initialValue: this.state.profee_name
                    })(
                        <Input autoComplete='off' placeholder='联系人' />
                    )}
                </Form.Item>
                <Form.Item label="联系人电话" {...formItemLayout}>
                    {getFieldDecorator('profee_phone', {
                        rules: [{
                            required: true,
                            message: '请输入联系人电话',
                        },
                        {
                            validator: this.validatorLength,
                        }],
                        initialValue: this.state.profee_phone
                    })(
                        <Input autoComplete='off' placeholder='联系人电话' />
                    )}
                </Form.Item>
                <Form.Item label="关联物业" {...formItemLayout}>
                    {getFieldDecorator('profee_prop', {
                        rules: [{
                            required: true,
                            message: '请输入关联物业',
                        },
                        {
                            validator: this.validatorLength,
                        }],
                        initialValue: this.state.profee_prop
                    })(
                        <Input autoComplete='off' placeholder='关联物业' />
                    )}
                </Form.Item>
                <Form.Item label="是否启用" {...formItemLayout}>
                    {getFieldDecorator('profee_enable',
                        {
                            rules: [],
                            valuePropName: 'checked',
                            initialValue: this.state.profee_enable,
                        },
                    )(
                        <Switch />
                    )}
                </Form.Item>
            </Form>
        );
    }

    validatorLength(rule, value, callback) {

        if (value && value.length > 20) {
            callback('请输入小于20个字符');
        }
        else {
            callback();
        }
    }

    validatorPhone(rule, value, callback) {
        if (value && (value.length > 20 || !/^[0-9]*$/.test(value))) {
            callback('请输入正确的联系方式');
        }
        else {
            callback();
        }
    }

}

export default Form.create({})(EditFeeForm);