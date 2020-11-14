import React, { Component } from 'react';
import { Input, Form, Select } from 'antd';
const { Option } = Select;
class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

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
                <Form.Item label="标识类型" {...formItemLayout}>
                    {getFieldDecorator('order_idtype', {
                        rules: [{ required: true, message: '请选择用户标识类型' }],
                        initialValue: 'phone',
                    })(
                        <Select >
                            <Option value={'phone'}>手机号</Option>
                            <Option value={'id'}>编号</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item
                    label="用户标识" {...formItemLayout}>
                    {getFieldDecorator('order_id', {
                        rules: [
                            {
                                required: true,
                                message: '请输入用户标识',
                            },
                            {
                                validator: this.validatorLength,
                            }]
                    })(
                        <Input autoComplete='off' />
                    )}
                </Form.Item>
                <Form.Item label="登录密码" {...formItemLayout}>
                    {getFieldDecorator('order_paswd', {
                        rules: [
                            {
                                required: true,
                                message: '请输入密码',
                            },
                            {
                                validator: this.validatorLength,
                            }],
                    })(
                        <Input.Password autoComplete='off' visibilityToggle={false} />
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

export default Form.create({
})(OrderForm);;