import React, { Component } from 'react';
import { Input, Form } from 'antd';

class EditSwitchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switch_keyid:props.data.switch_keyid,
            switch_name:props.data.switch_name,
            switch_locat:props.data.switch_locat,
            switch_group:props.data.switch_group,
            switch_dirgp:props.data.switch_dirgp,
            switch_agent:props.data.switch_agent,
            switch_lng: props.data.switch_lng,
            switch_lat: props.data.switch_lat,

            mode: props.mode,
        }
        this.validatorLength = this.validatorLength.bind(this);
        this.validatorNumber = this.validatorNumber.bind(this);

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
            }
        };
        return (
            <Form>
            <Form.Item label="开关ID" {...formItemLayout}>
                {getFieldDecorator('switch_keyid', {
                    rules: [{
                        required:true,
                        message:'请输入开关ID'
                    },{
                        validator:this.validatorNumber,
                    }],
                    initialValue: this.state.switch_keyid
                })(
                    <Input autoComplete='off' placeholder='开关ID' disabled={this.state.mode==='add'?false:true}/>
                )}
            </Form.Item>
            <Form.Item label="开关名称" {...formItemLayout}>
                {getFieldDecorator('switch_name',{
                    rules:[{
                        required:true,
                        message:'请输入开关名称',
                    },{
                        validator:this.validatorLength,
                    }],
                    initialValue:this.state.switch_name,
                })(
                    <Input autoComplete='off' placeholder='开关名称'/>
                )}
            </Form.Item>
            <Form.Item label="经销商ID" {...formItemLayout}>
                {getFieldDecorator('switch_agent',{
                    rules:[{
                        required:true,
                        message:'请输入经销商ID',
                    },{
                        validator:this.validatorNumber,
                    }],
                    initialValue:this.state.switch_agent,
                })(
                    <Input autoComplete='off' placeholder='经销商ID'/>
                )}
            </Form.Item>
            <Form.Item label="经度" {...formItemLayout}>
                {getFieldDecorator('switch_lng',{
                    rules:[{
                        required:true,
                        message:'请输入经度',
                    },{
                        validator:this.validatorLength,
                    }],
                    initialValue:this.state.switch_lng,
                })(
                    <Input autoComplete='off' placeholder='经度'/>
                )}
            </Form.Item>
            <Form.Item label="纬度" {...formItemLayout}>
                {getFieldDecorator('switch_lat',{
                    rules:[{
                        required:true,
                        message:'请输入纬度',
                    },{
                        validator:this.validatorLength,
                    }],
                    initialValue:this.state.switch_lat,
                })(
                    <Input autoComplete='off' placeholder='纬度'/>
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
export default Form.create({})(EditSwitchForm);