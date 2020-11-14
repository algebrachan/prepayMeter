import React, { Component } from 'react';
import { Modal, Spin, message, Form, Input, Select } from 'antd';
import { withRouter } from 'react-router-dom';
import { isNull } from 'util';
import { batchConfigMetersToGateway } from '../../../../../utils/api';
import { openErrorsNotification } from '../../../../components/notifycation';
import intl from 'react-intl-universal';
const { TextArea } = Input;
class ImportGtwyMeters extends Component {
    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const keyid = arr[arr.length - 1];
        this.state = {
            spinning: false,
            keyid: keyid,
            meters: '',
            cmpt: 0,
        }
        this.Loading = this.Loading.bind(this);
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
            <Modal
                title={'批量配置电表'}
                visible={this.props.show}
                onOk={() => this.handleOk()}
                onCancel={this.props.hide}
                destroyOnClose
                centered
            >
                <Spin spinning={this.state.spinning}>
                    <Form>.
                        <Form.Item label="采集器编号" {...formItemLayout}>
                            {getFieldDecorator('gtwyid', {
                                initialValue: this.state.keyid
                            })(
                                <Input autoComplete='off' placeholder='请输入采集器编号' disabled />
                            )}
                        </Form.Item>
                        <Form.Item label="通讯端口" {...formItemLayout}>
                            {getFieldDecorator('cmpt', {
                                rules: [{
                                    required: true,
                                    message: '请选择通讯端口',
                                }],
                                initialValue: this.state.cmpt,
                            })(
                                <Select >
                                    <Select.Option key='0' value={0}>RS485-1</Select.Option>
                                    <Select.Option key='1' value={1}>RS485-2</Select.Option>
                                    <Select.Option key='2' value={2}>RS485-3</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="电表编号" {...formItemLayout}>
                            {getFieldDecorator('meterid', {
                                rules: [{
                                    required: true,
                                    message: '请输入设备ID',
                                }],
                                initialValue: this.state.meters
                            })(
                                <TextArea placeholder='输入电表编号，用 回车键 分隔'
                                    autoSize={true}
                                    autoComplete='off'
                                />
                            )}
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        );
    }
    Loading(value) {
        this.setState({
            spinning: value,
        });
    }
    handleOk() {
        const form = this.props.form;
        let isValid = false;

        form.validateFields(['gtwyid', 'meterid', 'cmpt'], { force: true }, (err, value) => {
            isValid = isNull(err);
        });
        //校验失败直接返回
        if (!isValid) {
            return;
        }
        const keyid = this.state.keyid;
        const meterid = form.getFieldValue('meterid');
        const cmpt = form.getFieldValue('cmpt');
        let arr = meterid.split('\n');

        const param = {
            Mac: '',
            Sn: this.state.keyid,
            Cmpt: cmpt,
            Meters: arr,
        }
        this.Loading(true);
        batchConfigMetersToGateway(param,
            (res) => {
                if (res.data.Status === 0 && res.data.Data) {
                    message.success("成功添加" + res.data.Data.Success + "个设备");
                    openErrorsNotification(res.data.Data.Errors,res.data.Data.Success);
                } else {
                    message.error(res.data.Message);
                }
                this.Loading(false);
                this.props.hide();

            },
            () => {
                this.Loading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            });

    }
}
export default withRouter(Form.create({})(ImportGtwyMeters));