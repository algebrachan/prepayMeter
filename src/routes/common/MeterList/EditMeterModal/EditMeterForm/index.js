import React, { Component, Fragment } from 'react';
import { Input, Select, Form } from 'antd';
import * as session from '../../../../../utils/Session';
import { AdminType } from '../../../../../utils/enum';

class EditMeterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meter_keyid: props.data.meter_keyid,
            meter_name: props.data.meter_name,
            meter_agent: props.data.meter_agent,
            meter_devtp: props.data.meter_devtp,
            meter_ptp: props.data.meter_ptp,
            meter_rtp: props.data.meter_rtp,
            meter_chgtp: props.data.meter_chgtp,
            meter_irmt: props.data.meter_irmt,
            meter_prtl: props.data.meter_prtl,
            meter_psw: props.data.meter_psw,
            meter_wmd: props.data.meter_wmd,
            meter_ctrt: props.data.meter_ctrt,
            meter_chk: props.data.meter_chk,//奇偶校验
            meter_dbit: props.data.meter_dbit,//数据位
            meter_brate: props.data.meter_brate,//波特率
            mode: props.mode,
        }
        this.validatorLength = this.validatorLength.bind(this);
        this.validatorNumber = this.validatorNumber.bind(this);
        this.onChangePrtl = this.onChangePrtl.bind(this);
        this.onChangeWmd = this.onChangeWmd.bind(this);
        this.onChangeIrmt = this.onChangeIrmt.bind(this);

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
                <Form.Item label="设备编号" {...formItemLayout}>
                    {getFieldDecorator('meter_keyid', {
                        rules: [{
                            required: true,
                            message: '请输入设备编号'
                        },
                        {
                            validator: this.validatorNumber,
                        }],
                        initialValue: this.state.meter_keyid
                    })(
                        <Input autoComplete='off' placeholder='设备编号' disabled={this.state.mode === 'add' ? false : true} />
                    )}
                </Form.Item>
                <Form.Item label="设备名称" {...formItemLayout}>
                    {getFieldDecorator('meter_name', {
                        rules: [{
                            required: true,
                            message: '请输入设备名称',
                        },
                        {
                            validator: this.validatorLength,
                        }],
                        initialValue: this.state.meter_name,
                    })(
                        <Input autoComplete='off' placeholder='设备名称' />
                    )}
                </Form.Item>
                {type === AdminType.SUPER_ADMIN ?
                    <Form.Item label="经销商ID" {...formItemLayout}>
                        {getFieldDecorator('meter_agent', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入经销商ID',
                                }, {
                                    validator: this.validatorNumber,
                                }],
                            initialValue: this.state.meter_agent,
                        })(
                            <Input autoComplete='off' placeholder='经销商ID' />
                        )}
                    </Form.Item>
                    :
                    <Form.Item label="经销商ID" {...formItemLayout}>
                        {getFieldDecorator('meter_agent', {
                            initialValue: agtid,
                        })(
                            <Input autoComplete='off' placeholder='经销商ID' disabled />
                        )}
                    </Form.Item>
                }

                <Form.Item label="设备类型" {...formItemLayout}>
                    {getFieldDecorator('meter_devtp', {
                        rules: [{
                            required: true,
                            message: '请选择设备类型',
                        }],
                        initialValue: this.state.meter_devtp,
                    })(
                        <Select disabled={!(this.state.mode === 'add' || type === 1)}>
                            <Select.Option key='1' value={1}>单相表</Select.Option>
                            <Select.Option key='2' value={2}>三相表</Select.Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="计费方式" {...formItemLayout}>
                    {getFieldDecorator('meter_ptp', {
                        rules: [{
                            required: true,
                            message: '请选择计费方式',
                        }],
                        initialValue: this.state.meter_ptp,
                    })(
                        <Select disabled={!(this.state.mode === 'add' || type === 1)}>
                            <Select.Option key='1' value={1}>表计本地计费</Select.Option>
                            <Select.Option key='2' value={2}>系统后台计费</Select.Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="费率类型" {...formItemLayout}>
                    {getFieldDecorator('meter_rtp', {
                        rules: [{
                            required: true,
                            message: '请选择费率类型',
                        }],
                        initialValue: this.state.meter_rtp,
                    })(
                        <Select disabled={!(this.state.mode === 'add' || type === 1)}>
                            <Select.Option key='1' value={1}>单费率</Select.Option>
                            <Select.Option key='2' value={2}>多费率</Select.Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="计价类型" {...formItemLayout}>
                    {getFieldDecorator('meter_chgtp', {
                        rules: [{
                            required: true,
                            message: '请选择计价类型',
                        }],
                        initialValue: this.state.meter_chgtp,
                    })(
                        <Select disabled={!(this.state.mode === 'add' || type === 1)}>
                            <Select.Option key='1' value={1}>按电计价</Select.Option>
                            <Select.Option key='2' value={2}>按时计价</Select.Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="通讯方式" {...formItemLayout}>
                    {getFieldDecorator('meter_irmt', {
                        rules: [{
                            required: true,
                            message: '请选择通讯方式',
                        }],
                        initialValue: this.state.meter_irmt,
                    })(
                        <Select onChange={this.onChangeIrmt}
                            disabled={!(this.state.mode === 'add' || type === 1)}>
                            <Select.Option key='0' value={0}>RS485</Select.Option>
                            <Select.Option key='1' value={1}>网络</Select.Option>
                        </Select>
                    )}
                </Form.Item>
                {this.onShowCmcfg(this.state.meter_irmt)}
                <Form.Item label="支持协议" {...formItemLayout}>
                    {getFieldDecorator('meter_prtl', {
                        rules: [{
                            required: true,
                            message: '请选择支持协议',
                        }],
                        initialValue: this.state.meter_prtl,
                    })(
                        <Select onChange={this.onChangePrtl}>
                            <Select.Option key='1' value={1}>LydOut</Select.Option>
                            <Select.Option key='2' value={2}>DLT645</Select.Option>
                        </Select>
                    )}
                </Form.Item>
                {this.state.meter_prtl === 2 ?
                    <Form.Item label="密码" {...formItemLayout}>
                        {getFieldDecorator('meter_psw', {
                            rules: [{
                                required: true,
                                message: '请输入密码',
                            },
                            {
                                validator: this.validatorPsw,
                            }
                            ],
                            initialValue: this.state.meter_psw,
                        })(
                            <Input.Password autoComplete='off' placeholder='密码' />
                        )}
                    </Form.Item>
                    : ''
                }
                <Form.Item label="接线方式" {...formItemLayout}>
                    {getFieldDecorator('meter_wmd', {
                        rules: [{
                            required: true,
                            message: '请选择接线方式',
                        }],
                        initialValue: this.state.meter_wmd,
                    })(
                        <Select onChange={this.onChangeWmd}>
                            <Select.Option key='0' value={0}>直接式</Select.Option>
                            <Select.Option key='1' value={1}>互感式</Select.Option>
                        </Select>
                    )}
                </Form.Item>
                {this.state.meter_wmd === 1 ?
                    <Form.Item label="CT变比" {...formItemLayout} >
                        {getFieldDecorator('meter_ctrt', {
                            rules: [{
                                required: true,
                                message: '请输入CT变比',
                            },
                            { validator: this.validatorNumber, }],
                            initialValue: this.state.meter_ctrt,
                        })(
                            <Input autoComplete='off' placeholder='CT变比' />
                        )}
                    </Form.Item>
                    : ''
                }
            </Form>

        );
    }

    onShowCmcfg(irmt) {
        const { getFieldDecorator } = this.props.form;
        const type = session.getLoginVertificate().Type;
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
        if (irmt === 0) {
            return (
                <Fragment>
                    <Form.Item label="校验" {...formItemLayout}>
                        {getFieldDecorator('meter_chk', {
                            rules: [{
                                required: true,
                                message: '请选择校验方式',
                            }],
                            initialValue: this.state.meter_chk,
                        })(
                            <Select disabled={!(this.state.mode === 'add' || type === 1)}>
                                <Select.Option key='0' value={0}>无校验</Select.Option>
                                <Select.Option key='1' value={1}>偶校验</Select.Option>
                                <Select.Option key='2' value={2}>奇校验</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="数据位" {...formItemLayout}>
                        {getFieldDecorator('meter_dbit', {
                            rules: [{
                                required: true,
                                message: '请输入数据位',
                            }, { validator: this.validatorNumber }],
                            initialValue: this.state.meter_dbit,
                        })(
                            <Select disabled={!(this.state.mode === 'add' || type === 1)}>
                                <Select.Option key='8' value={8}>8</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="波特率" {...formItemLayout}>
                        {getFieldDecorator('meter_brate', {
                            rules: [{
                                required: true,
                                message: '请输入波特率',
                            }, { validator: this.validatorNumber }],
                            initialValue: this.state.meter_brate,
                        })(
                            <Input disabled={!(this.state.mode === 'add' || type === 1)}
                                autoComplete='off' placeholder='波特率' />
                        )}
                    </Form.Item>
                </Fragment>
            );
        }
    }

    onChangePrtl(value) {
        this.setState({
            meter_prtl: value,
        });
    }
    onChangeWmd(value) {
        this.setState({
            meter_wmd: value
        });
    }
    onChangeIrmt(value) {
        this.setState({
            meter_irmt: value
        });
    }
    validatorLength(rule, value, callback) {

        if (value && value.length > 20) {
            callback('请输入小于20个字符');
        }
        else {
            callback();
        }
    }

    validatorPsw(rule, value, callback) {
        if (value.length != 8) {
            callback('请输入8位密码')
        } else {
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
export default Form.create({})(EditMeterForm);