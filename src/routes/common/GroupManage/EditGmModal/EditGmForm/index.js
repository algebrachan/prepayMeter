import React, { Component } from 'react';
import { Input, Form ,Mentions} from 'antd';

class EditAgentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group_keyid: props.data.group_keyid,
            group_name: props.data.group_name,
            group_desc: props.data.group_desc,
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
                {this.state.mode === 'add' ? '' :
                    <Form.Item label="ID" {...formItemLayout}>
                        {getFieldDecorator('group_keyid', {
                            rules: [{
                                required: true,
                                message: '请输入ID',
                            },
                            {
                                validator: this.validatorLength,
                            }],
                            initialValue: this.state.group_keyid
                        })(
                            <Input autoComplete='off' placeholder='ID' disabled={true} />
                        )}
                    </Form.Item>
                }
                <Form.Item label="名称" {...formItemLayout}>
                    {getFieldDecorator('group_name', {
                        rules: [{
                            required: true,
                            message: '请输入名称',
                        },
                        {
                            validator: this.validatorLength,
                        }],
                        initialValue: this.state.group_name
                    })(
                        <Input autoComplete='off' placeholder='名称' />
                    )}
                </Form.Item>
                <Form.Item label="描述" {...formItemLayout}>
                    {getFieldDecorator('group_desc', {
                        rules: [{
                            required: true,
                            message: '请输入描述内容',
                        },
                        ],
                        initialValue: this.state.group_desc
                    })(
                        <Mentions rows="3" placeholder="描述内容不得多于60字">
                        </Mentions>,
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

export default Form.create({})(EditAgentForm);