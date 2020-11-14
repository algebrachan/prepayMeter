import React, { Component, Fragment } from 'react';
import { Modal, Spin, message, Form, Input, Upload, Icon, Typography, Select } from 'antd';
import * as importModalCtors from './store/actionCreators';
import { importGateways } from '../../../../utils/api';
import { isNull } from 'util';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
const globalState = {
    fileList: []
};
class ImportCollectsModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            spinning: false,
            fileList: [],
            agent: '',
            devtp: '',
        }
        this.handleOk = this.handleOk.bind(this);
        this.changeLoading = this.changeLoading.bind(this);
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
        const content = this.state.fileList.length > 0 ? this.state.fileList[0].name : '请选择小于20k的文件';
        return (
            <Modal
                title={'批量导入采集器'}
                visible={this.props.show}
                onOk={this.handleOk}
                onCancel={this.props.hide}
                destroyOnClose
                centered
            >
                <Spin spinning={this.state.spinning}>
                    <Form>
                        <Form.Item label="经销商ID" {...formItemLayout}>
                            {getFieldDecorator('agent', {
                                rules: [{
                                    required: true,
                                    message: '请输入经销商ID',
                                }, {
                                    validator: this.validatorLength,
                                }],
                                initialValue: this.state.agent
                            })(
                                <Input autoComplete='off' placeholder='请输入经销商ID' />
                            )}
                        </Form.Item>
                        <Form.Item label="采集器类型" {...formItemLayout}>
                            {getFieldDecorator('devtp', {
                                rules: [{
                                    required: true,
                                    message: '请选择采集器类型',
                                }],
                                initialValue: this.state.devtp,
                            })(
                                <Select>
                                    <Select.Option value={32}>32型</Select.Option>
                                    <Select.Option value={96}>96型</Select.Option>
                                    {/* <Option value={64}>64型</Option>
                            <Option value={512}>512型</Option> */}
                                </Select>
                            )}
                        </Form.Item>
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

        form.validateFields(['agent', 'devtp', 'fw_file'], { force: true }, (err, value) => {
            isValid = isNull(err);
        });

        //校验失败直接返回
        if (!isValid) {
            return;
        }
        const agent = form.getFieldValue('agent');
        const devtp = form.getFieldValue('devtp');
        const file = this.state.fileList[0];
        const param = {
            Action: 1,
            Agent: agent,
            Devtp: devtp,
        }
        let formData = new FormData();
        formData.append('param', JSON.stringify(param));
        formData.append('file', file);
        this.changeLoading(true);
        importGateways(formData,
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

}

const mapStateToProps = (state) => {
    return {
        show: state.collect_import.show,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hide() {
            dispatch(importModalCtors.getImportVisibleAction(false));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({})(ImportCollectsModal));
