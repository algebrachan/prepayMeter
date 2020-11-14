import React, { Component, Fragment } from 'react';
import { Modal, Spin, message, Form, Input, Upload, Icon, Typography, Select } from 'antd';
import * as importModalCtors from '../ImportMetersModal/store/actionCreators';
import { importMeters } from '../../../../utils/api';
import { isNull } from 'util';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
const globalState = {
    fileList: []
};
class ImportMetersModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            spinning: false,
            fileList: [],
            agtid: '',
            devtp: '',
            ptp: '',
            rtp: '',
            chgtp: '',
            irmt: '',
            prtl: '',
            psw: '',
            wmd: '',
            ctrt: '',
            cmpt: '',
            cmcfg: '',
        }
        this.handleOk = this.handleOk.bind(this);
        this.changeLoading = this.changeLoading.bind(this);
        this.onChangePrtl = this.onChangePrtl.bind(this);
        this.onChangeWmd = this.onChangeWmd.bind(this);
        this.onChangeIrmt = this.onChangeIrmt.bind(this);
        this.clear = this.clear.bind(this);
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
        const title = this.state.fileList.length > 0 ? '已选择文件' : '将文件拖到此处或点击选择文件';
        const content = this.state.fileList.length > 0 ? this.state.fileList[0].name : '请选择小于20k的txt文件';
        return (
            <Modal
                title={'批量导入电表'}
                visible={this.props.show}
                onOk={this.handleOk}
                onCancel={this.props.hide}
                destroyOnClose
                centered
            >
                <Spin spinning={this.state.spinning}>
                    <Form>
                        <Form.Item label="经销商ID" {...formItemLayout}>
                            {getFieldDecorator('agtid', {
                                rules: [{
                                    required: true,
                                    message: '请输入经销商ID',
                                }, {
                                    validator: this.validatorLength,
                                }],
                                initialValue: this.state.agtid
                            })(
                                <Input autoComplete='off' placeholder='请输入经销商ID' />
                            )}
                        </Form.Item>
                        <Form.Item label="设备类型" {...formItemLayout}>
                            {getFieldDecorator('devtp', {
                                rules: [{
                                    required: true,
                                    message: '请选择设备类型',
                                }],
                                initialValue: this.state.devtp,
                            })(
                                <Select >
                                    <Select.Option key='1' value={1}>单相表</Select.Option>
                                    <Select.Option key='2' value={2}>三相表</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="计费方式" {...formItemLayout}>
                            {getFieldDecorator('ptp', {
                                rules: [{
                                    required: true,
                                    message: '请选计费方式',
                                }],
                                initialValue: this.state.ptp,
                            })(
                                <Select >
                                    <Select.Option key='1' value={1}>表计本地计费</Select.Option>
                                    <Select.Option key='2' value={2}>系统后台计费</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="费率类型" {...formItemLayout}>
                            {getFieldDecorator('rtp', {
                                rules: [{
                                    required: true,
                                    message: '请选择费率类型',
                                }],
                                initialValue: this.state.rtp,
                            })(
                                <Select >
                                    <Select.Option key='1' value={1}>单费率</Select.Option>
                                    <Select.Option key='2' value={2}>多费率</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="计价类型" {...formItemLayout}>
                            {getFieldDecorator('chgtp', {
                                rules: [{
                                    required: true,
                                    message: '请选择计价类型',
                                }],
                                initialValue: this.state.chgtp,
                            })(
                                <Select >
                                    <Select.Option key='1' value={1}>按电计价</Select.Option>
                                    <Select.Option key='2' value={2}>按时计价</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="通讯方式" {...formItemLayout}>
                            {getFieldDecorator('irmt', {
                                rules: [{
                                    required: true,
                                    message: '请选择通讯方式',
                                }],
                                initialValue: this.state.irmt,
                            })(
                                <Select onChange={this.onChangeIrmt}>
                                    <Select.Option key='0' value={0}>RS485</Select.Option>
                                    <Select.Option key='1' value={1}>网络</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                        {this.onShowCmcfg(this.state.irmt)}
                        <Form.Item label="支持协议" {...formItemLayout}>
                            {getFieldDecorator('prtl', {
                                rules: [{
                                    required: true,
                                    message: '请选择支持协议',
                                }],
                                initialValue: this.state.prtl,
                            })(
                                <Select onChange={this.onChangePrtl}>
                                    <Select.Option key='1' value={1}>LydOut</Select.Option>
                                    <Select.Option key='2' value={2}>DLT645</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                        {this.state.prtl === 2 ?
                            <Form.Item label="密码" {...formItemLayout}>
                                {getFieldDecorator('psw', {
                                    rules: [{
                                        required: true,
                                        message: '请输入密码',
                                    },
                                    { validator: this.validatorPsw, }
                                    ],
                                    initialValue: this.state.psw,
                                })(
                                    <Input.Password autoComplete='off' placeholder='密码' />
                                )}
                            </Form.Item>
                            : ''
                        }
                        <Form.Item label="接线方式" {...formItemLayout}>
                            {getFieldDecorator('wmd', {
                                rules: [{
                                    required: true,
                                    message: '请选择接线方式',
                                }],
                                initialValue: this.state.wmd,
                            })(
                                <Select onChange={this.onChangeWmd}>
                                    <Select.Option key='0' value={0}>直接式</Select.Option>
                                    <Select.Option key='1' value={1}>互感式</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                        {this.state.wmd === 1 ?
                            <Form.Item label="CT变比" {...formItemLayout} >
                                {getFieldDecorator('ctrt', {
                                    rules: [{
                                        required: true,
                                        message: '请输入CT变比',
                                    },
                                    {
                                        validator: this.validatorNumber,
                                    }],
                                    initialValue: this.state.ctrt,
                                })(
                                    <Input autoComplete='off' placeholder='CT变比' />
                                )}
                            </Form.Item>
                            : ''
                        }
                        <Form.Item
                            label="文件"
                            {...formItemLayout}>
                            {getFieldDecorator('fw_file',
                                {
                                    rules: [{ required: true, message: "请选择文件" }],
                                    valuePropName: 'fileList',
                                    getValueFromEvent: (e) => {
                                        //这里不使用this.state.fileList是因为this.setState时异步的，
                                        //当在beforeUpload或者onChange中调用this.setState时，state中的fileList还没更新，先执行到了这里
                                        return globalState.fileList;
                                    }
                                },
                            )(
                                <Upload.Dragger
                                    accept='.txt'
                                    name='file'
                                    showUploadList={false}
                                    beforeUpload={(file) => { return this.beforeUpload(file) }}
                                    onChange={(info) => { this.onUploadChange(info) }}
                                >
                                    <p className="ant-upload-drag-icon"><Icon type="inbox" /></p>
                                    <p className="ant-upload-text">{title}</p>
                                    <p className="ant-upload-hint">{content}</p>
                                </Upload.Dragger>
                            )}
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>

        );
    }


    onShowCmcfg(irmt) {
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
        if (irmt === 0) {
            return (
                <Fragment>
                    <Form.Item label="校验" {...formItemLayout}>
                        {getFieldDecorator('chk', {
                            rules: [{
                                required: true,
                                message: '请选择校验方式',
                            }],
                            initialValue: this.state.chk,
                        })(
                            <Select >
                                <Select.Option key='0' value={0}>无校验</Select.Option>
                                <Select.Option key='1' value={1}>偶校验</Select.Option>
                                <Select.Option key='2' value={2}>奇校验</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="数据位" {...formItemLayout}>
                        {getFieldDecorator('dbit', {
                            rules: [{
                                required: true,
                                message: '请输入数据位',
                            }, { validator: this.validatorNumber }],
                            initialValue: this.state.dbit,
                        })(
                            <Select >
                                <Select.Option key='8' value={8}>8</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="波特率" {...formItemLayout}>
                        {getFieldDecorator('brate', {
                            rules: [{
                                required: true,
                                message: '请输入波特率',
                            }, { validator: this.validatorNumber }],
                            initialValue: this.state.brate,
                        })(
                            <Input
                                autoComplete='off' placeholder='波特率' />
                        )}
                    </Form.Item>
                </Fragment>
            );
        }
    }

    /**
     * 需要在使用时return该方法,如下
     * beforeUpload={(file)=>{return this.beforeUpload(file)}}
     * @param {} file 
     */
    beforeUpload(file) {
        if (!(/(?:txt)$/i.test(file.name))) {
            globalState.fileList = [];
            message.error('请选择正确的固件文件');
        }
        else if (file.size > 20 * 1024) {
            globalState.fileList = [];
            message.error('请选择小于20k的固件文件');
        }
        else {
            globalState.fileList = [file];
        }
        this.setState({
            fileList: [...globalState.fileList],
        });
        return false;
    }

    onUploadChange(info) {
    }

    changeLoading(loading) {
        this.setState({
            spinning: loading
        })
    }

    handleOk = () => {
        const form = this.props.form;
        let isValid = false;
        form.validateFields(['agtid', 'devtp', 'ptp', 'rtp', 'chgtp', 'irmt', 'prtl', 'psw', 'wmd', 'ctrt', 'cmpt', 'chk', 'dbit', 'brate', 'fw_file'], { force: true }, (err, value) => {
            isValid = isNull(err);
        });

        //校验失败直接返回
        if (!isValid) {
            return;
        }

        const agent = form.getFieldValue('agtid');
        const devtp = form.getFieldValue('devtp');
        const ptp = form.getFieldValue('ptp');
        const rtp = form.getFieldValue('rtp');
        const chgtp = form.getFieldValue('chgtp');
        const irmt = form.getFieldValue('irmt');
        const prtl = form.getFieldValue('prtl');
        const psw = form.getFieldValue('psw');
        const wmd = form.getFieldValue('wmd');
        const ctrt = form.getFieldValue('ctrt');
        const cmpt = form.getFieldValue('cmpt');

        const chk = form.getFieldValue('chk');
        const dbit = form.getFieldValue('dbit');
        const brate = form.getFieldValue('brate');

        const file = this.state.fileList[0];
        const rs485cfg = {
            Chktp: chk,
            DataBit: dbit,
            BaudRate: brate,
        }
        let formData = new FormData();


        const param = {
            Action: 1,
            Agent: agent,
            Devtp: devtp,
            Ptp: ptp,
            Rtp: rtp,
            Sys: 1,
            Chgtp: chgtp,
            Irmt: irmt,
            Prtl: prtl,
            Psw: psw,
            Wmd: wmd,
            Ctrt: ctrt,
            Cmpt: cmpt,
            Rs485cfg: rs485cfg,
        }
        formData.append('file', file);
        formData.append('param', JSON.stringify(param));
        this.changeLoading(true);
        importMeters(formData,
            (res) => {
                if (res.data.Status === 0 && res.data.Data) {
                    message.success("成功添加" + res.data.Data.Success + "个设备");
                } else {
                    message.error(res.data.Message);
                }
                this.changeLoading(false);
                this.props.hide();
                this.clear();
            },
            () => {
                this.changeLoading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            });
    }

    onChangePrtl(value) {
        this.setState({
            prtl: value,
        });
    }
    onChangeIrmt(value) {
        this.setState({
            irmt: value
        });
    }
    onChangeWmd(value) {
        this.setState({
            wmd: value
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
    clear() {
        this.setState({
            prtl: '',
            irmt: '',
            wmd: '',
        });
    }

}

const mapStateToProps = (state) => {
    return {
        show: state.meter_import.show,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hide() {
            dispatch(importModalCtors.getImportVisibleAction(false));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({})(ImportMetersModal));
