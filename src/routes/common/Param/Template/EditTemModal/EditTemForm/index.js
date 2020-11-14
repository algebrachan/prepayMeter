import React, { Component } from 'react';
import { Input, Form, Mentions } from 'antd';
import { trim } from '../../../../../../utils/string';

class EditTemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            param_keyid: props.data.param_keyid,
            param_name: props.data.param_name,
            param_desc: props.data.param_desc,
            mode: props.mode,
        }
        this.validatorName = this.validatorName.bind(this);
        this.validatorDesc = this.validatorDesc.bind(this);
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
                <Form.Item label="ID" {...formItemLayout}>
                    {getFieldDecorator('param_keyid', {
                        rules: [{
                            required: false,
                        }
                        ],
                        initialValue: this.state.param_keyid
                    })(
                        <Input autoComplete='off' placeholder='ID自动创建' disabled />
                    )}
                </Form.Item>
                <Form.Item label="名称" {...formItemLayout}>
                    {getFieldDecorator('param_name', {
                        rules: [{
                            required: true,
                            message: '名称不能为空',
                        },
                        {
                            validator: this.validatorName,
                        }
                        ],
                        initialValue: this.state.param_name
                    })(
                        <Input autoComplete='off' placeholder='请输入名称' />
                    )}
                </Form.Item>
                <Form.Item label="描述" {...formItemLayout}>
                    {getFieldDecorator('param_desc', {
                        rules: [{
                            required: false,
                        }, {
                            validator: this.validatorDesc,
                        }
                        ],
                        initialValue: this.state.param_desc
                    })(
                        <Mentions rows="3" placeholder="请输入描述">

                        </Mentions>,
                    )}
                </Form.Item>
            </Form>
        );
    }

    validatorName(rule, value, callback) {

        if (value && value.length > 20) {
            callback('请输入小于20个字符');
        } else if (trim(value).length === 0) {
            callback('名称不能为空字符串');
        }
        else {
            callback();
        }
    }
    validatorDesc(rule, value, callback) {

        if (value && value.length > 60) {
            callback('请输入小于60个字符');
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

export default Form.create({})(EditTemForm);