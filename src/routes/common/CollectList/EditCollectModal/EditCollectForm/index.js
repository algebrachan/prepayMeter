import React, { Component } from 'react';
import { Input, Select, Form } from 'antd';
import * as session from '../../../../../utils/Session';
import { AdminType } from '../../../../../utils/enum';

function handleChange(value) {
}
const { Option } = Select;
class EditCollectForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collect_keyid: props.data.collect_keyid,
            collect_name: props.data.collect_name,
            collect_locat: props.data.collect_locat,
            collect_group: props.data.collect_group,
            collect_dirgp: props.data.collect_dirgp,
            collect_agent: props.data.collect_agent,
            collect_devtp: props.data.collect_devtp,
            mode: props.mode,
        }
        this.validatorLength = this.validatorLength.bind(this);
        this.validatorNumber = this.validatorNumber.bind(this);

    }

    render() {
        const agtid = session.getLoginVertificate().AgtidStr;
        const type = session.getLoginVertificate().Type;

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
                <Form.Item label="采集器ID" {...formItemLayout}>
                    {getFieldDecorator('collect_keyid', {
                        rules: [{
                            required: true,
                            message: '请输入采集器ID'
                        }, {
                            validator: this.validatorNumber,
                        }],
                        initialValue: this.state.collect_keyid
                    })(
                        <Input autoComplete='off' placeholder='采集器ID' disabled={this.state.mode === 'add' ? false : true} />
                    )}
                </Form.Item>
                <Form.Item label="采集器名称" {...formItemLayout}>
                    {getFieldDecorator('collect_name', {
                        rules: [{
                            required: true,
                            message: '请输入采集器名称',
                        }, {
                            validator: this.validatorLength,
                        }],
                        initialValue: this.state.collect_name,
                    })(
                        <Input autoComplete='off' placeholder='采集器名称' />
                    )}
                </Form.Item>
                {type === AdminType.SUPER_ADMIN ?
                    <Form.Item label="经销商ID" {...formItemLayout}>
                        {getFieldDecorator('collect_agent', {
                            rules: [{
                                required: true,
                                message: '请输入经销商ID',
                            }, {
                                validator: this.validatorNumber,
                            }],
                            initialValue: this.state.collect_agent,
                        })(
                            <Input autoComplete='off' placeholder='经销商ID' />
                        )}
                    </Form.Item>
                    :
                    <Form.Item label="经销商ID" {...formItemLayout}>
                        {getFieldDecorator('collect_agent', {
                            initialValue: agtid,
                        })(
                            <Input autoComplete='off' placeholder='经销商ID' disabled />
                        )}
                    </Form.Item>
                }
                <Form.Item label="采集器类型" {...formItemLayout}>
                    {getFieldDecorator('collect_devtp', {
                        rules: [{
                            required: true,
                            message: '请选择采集器类型',
                        }],
                        initialValue: this.state.collect_devtp,
                    })(
                        <Select
                            style={{ width: '100%' }}
                            placeholder="请选择采集器类型"
                            onChange={handleChange}
                            disabled={this.state.mode === 'add' ? false : true}
                        >
                            <Option value={32}>32型</Option>
                            <Option value={96}>96型</Option>
                            {/* <Option value={64}>64型</Option>
                            <Option value={512}>512型</Option> */}
                        </Select>
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

    validatorNumber(rule, value, callback) {
        if (value && (value.length > 20)) {
            callback('请输入小于20字符');
        } else if (value && (!/^[0-9]*$/.test(value))) {
            callback('请输入正确的数字');
        } else {
            callback();
        }
    }

}
export default Form.create({})(EditCollectForm);