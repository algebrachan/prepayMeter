import React, { Component } from 'react';
import { Input, Form, Checkbox } from 'antd';

class EditAgentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin_name: props.data.admin_name,
            admin_owner: props.data.admin_owner,
            admin_system: props.data.admin_system,
            admin_agentid: props.data.admin_agentid,
            admin_stat: props.data.admin_stat,
            mode: props.mode,
        }
        this.validatorLength = this.validatorLength.bind(this);
        this.validatorNumber = this.validatorNumber.bind(this);
        this.validatorUsnam = this.validatorUsnam.bind(this);
        this.validatorAgentLength = this.validatorAgentLength.bind(this);
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
                <Form.Item label="用户名" {...formItemLayout}>
                    {getFieldDecorator('admin_name', {
                        rules: [{
                            required: true,
                            message: '请输入用户名',
                        },
                        {
                            validator: this.validatorUsnam,
                        },
                        {
                            validator: this.validatorAgentLength,
                        }
                        ],
                        initialValue: this.state.admin_name
                    })(
                        <Input autoComplete='off' placeholder='用户名' disabled={this.state.mode === 'add' ? false : true} />
                    )}
                </Form.Item>
                <Form.Item label="使用人" {...formItemLayout}>
                    {getFieldDecorator('admin_owner', {
                        rules: [{
                            required: true,
                            message: '请输入使用人',
                        },
                        {
                            validator: this.validatorLength,
                        }],
                        initialValue: this.state.admin_owner
                    })(
                        <Input autoComplete='off' placeholder='使用人' />
                    )}
                </Form.Item>
                <Form.Item label="系统" {...formItemLayout}>
                    {getFieldDecorator('admin_system', {
                        rules: [{
                            required: true,
                            message: '请输入系统',
                        },
                        {
                            validator: this.validatorLength,
                        }],
                        initialValue: this.state.admin_system
                    })(
                        <Checkbox.Group>
                            <Checkbox key='1' value={1}>预</Checkbox>
                            <Checkbox key='2' value={2}>农</Checkbox>
                            <Checkbox key='4' value={4}>开关</Checkbox>
                        </Checkbox.Group>
                    )}
                </Form.Item>
                <Form.Item label="经销商ID" {...formItemLayout}>
                    {getFieldDecorator('admin_agentid', {
                        rules: [{
                            required: true,
                            message: '请输入经销商ID',
                        },
                        {
                            validator: this.validatorNumber,
                        }],
                        initialValue: this.state.admin_agentid
                    })(
                        <Input autoComplete='off' placeholder='经销商ID' disabled={this.state.mode === 'add' ? false : true} />
                    )}
                </Form.Item>
            </Form>
        );
    }

    validatorAgentLength(rule, value, callback) {
        if (value && value.length < 6) {
            callback('用户名不得小于6个字符');
        } else {
            callback();
        }
    }

    validatorLength(rule, value, callback) {

        if (value && value.length > 20) {
            callback('请输入小于20个字符');
        }
        else {
            callback();
        }
    }

    validatorNumber(rule, value, callback) {
        if (value && (value.length > 20)) {
            callback('请输入小于20字符');
        } else if (value && (!/^[0-9]*$/.test(value))) {
            callback('请输入正确的数字');
        } else {
            callback();
        }
    }

    validatorUsnam(rule, value, callback) {
        if (value && (value.length > 20)) {
            callback('请输入小于20字符');
        } else if (value && (!/^\w+$/.test(value))) {
            callback('用户名只包含数字、字母、下划线')
        } else {
            callback();
        }
    }
}

export default Form.create({})(EditAgentForm);