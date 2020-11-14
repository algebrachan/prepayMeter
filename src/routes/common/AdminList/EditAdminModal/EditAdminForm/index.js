import React, { Component } from 'react';
import { Input, Form, Switch } from 'antd';

class EditAdminForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin_stat: props.data.admin_stat,
            admin_name: props.data.admin_name,
            admin_owner: props.data.admin_owner,
            mode: props.mode,
        }
        this.validatorLength = this.validatorLength.bind(this);
        this.validatorPhone = this.validatorPhone.bind(this);
        this.validatorCn = this.validatorCn.bind(this);
        this.validatorUsnam = this.validatorUsnam.bind(this);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 6 } },
            wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
        };
        return (
            <Form>
                <Form.Item label="用户名" {...formItemLayout} >
                    {getFieldDecorator('admin_name', {
                        rules: [{ required: true, message: '请输入用户名', }, { validator: this.validatorUsnam }],
                        initialValue: this.state.admin_name
                    })(
                        <Input autoComplete='off' placeholder='用户名' disabled={this.state.mode === 'add' ? false : true} />
                    )}
                </Form.Item>
                <Form.Item label="使用人" {...formItemLayout}>
                    {getFieldDecorator('admin_owner', {
                        rules: [{ required: true, message: '请输入使用人', }, { validator: this.validatorLength }],
                        initialValue: this.state.admin_owner
                    })(
                        <Input autoComplete='off' placeholder='使用人' />
                    )}
                </Form.Item>
                {this.state.mode === 'add' ? '' :
                    <Form.Item label="是否启用" {...formItemLayout}>
                        {getFieldDecorator('admin_stat', {
                            rules: [],
                            valuePropName: 'checked',
                            initialValue: this.state.admin_stat === 0,
                        })(
                            <Switch />
                        )}
                    </Form.Item>
                }
            </Form>
        );
    }
    validatorLength(rule, value, callback) {
        if (value && value.length > 20) {
            callback('请输入小于20个字符');
        } else { callback(); }
    }

    validatorPhone(rule, value, callback) {
        if (value && (value.length > 20 || !/^[0-9]*$/.test(value))) {
            callback('请输入正确的联系方式');
        } else { callback(); }
    }

    validatorCn(rule, value, callback) {
        if (value) {
            if (/[\u4E00-\u9FA5]/g.test(value)) {
                callback('编码不能输入汉字!');
            } else { callback(); }
        }
        callback();
    }

    validatorUsnam(rule, value, callback) {
        if (value && (value.length < 5 && value.length > 20)) {
            callback('请输入小于20字符');
        } else if (value && (!/^\w+$/.test(value))) {
            callback('用户名只包含数字、字母、下划线')
        } else { callback(); }
    }
}

export default Form.create({})(EditAdminForm);