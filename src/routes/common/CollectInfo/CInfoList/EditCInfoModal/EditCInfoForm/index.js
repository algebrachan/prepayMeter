import React, { Component } from 'react';
import { Input, Form } from 'antd';

class EditAgentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agent_keyid: props.data.agent_keyid,
            name: props.data.name,
            agent_company: props.data.agent_company,
            agent_owner: props.data.agent_owner,
            agent_phone: props.data.agent_phone,
            agent_locat: props.data.agent_locat,
            mode: props.mode,
        }
        this.validatorLength = this.validatorLength.bind(this);
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
                <Form.Item label="经销商ID" {...formItemLayout}>
                    {getFieldDecorator('agent_keyid',{
                        rules:[{
                            required:false,
                            
                        }
                    ],
                        initialValue: this.state.agent_keyid
                    })(
                        <Input autoComplete='off' placeholder='经销商ID自动创建' disabled={true}/>
                    )}
                </Form.Item>
                <Form.Item label="经销商名称" {...formItemLayout}>
                    {getFieldDecorator('name',{
                        rules:[{
                            required: true,
                            message: '请输入经销商名称',
                        },
                        {
                            validator: this.validatorLength,
                        }],
                        initialValue: this.state.name
                    })(
                        <Input autoComplete='off' placeholder='经销商'/>
                    )}
                </Form.Item>
                <Form.Item label="负责人" {...formItemLayout}>
                    {getFieldDecorator('agent_owner',{
                        rules:[{
                            required: true,
                            message: '请输入负责人',
                        },
                        {
                            validator: this.validatorLength,
                        }],
                        initialValue: this.state.agent_owner
                    })(
                        <Input autoComplete='off' placeholder='负责人'/>
                    )}
                </Form.Item>
                <Form.Item label="绑定手机号" {...formItemLayout}>
                    {getFieldDecorator('agent_phone',{
                        rules:[{
                            required: true,
                            message: '请输入绑定手机号',
                        },
                        {
                            validator: this.validatorLength,
                        }],
                        initialValue: this.state.agent_phone
                    })(
                        <Input autoComplete='off' placeholder='手机号'/>
                    )}
                </Form.Item>
                <Form.Item label="地址" {...formItemLayout}>
                    {getFieldDecorator('agent_locat',{
                        rules:[{
                            required: true,
                            message: '请输入地址',
                        },
                        {
                            validator: this.validatorLength,
                        }],
                        initialValue: this.state.agent_locat
                    })(
                        <Input autoComplete='off' placeholder='地址'/>
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

    
}

export default Form.create({})(EditAgentForm);