import React, { Component } from 'react';
import { Modal, message, Spin, Form, Input } from 'antd';
import { isNull } from 'util';
import { rechargeMeter } from '../../../../../utils/api';
import intl from 'react-intl-universal';
class RechargeModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            spinning: false,
        }
        this.onOk = this.onOk.bind(this);
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
                title='充值'
                visible={this.props.show}
                destroyOnClose
                centered
                onCancel={this.props.hide}
                onOk={() => this.onOk()}
            >
                <Spin spinning={this.state.spinning}>
                    <Form.Item label="充值金额" {...formItemLayout}>
                        {getFieldDecorator('value', {
                            rules: [
                                {
                                    required: true,
                                    type: 'integer',
                                    message: '请输入正确的充值金额(整数)',
                                    transform(value) {
                                        if (value) {
                                            return Number(value);
                                        }
                                    },
                                },
                                {
                                    validator: this.validatorLength,
                                }
                            ],
                        })(
                            <Input autoComplete='off' placeholder='单笔充值金额不超过5000元' />
                        )}
                    </Form.Item>
                    <Form.Item label="密码" {...formItemLayout}>
                        {getFieldDecorator('pwd', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入密码',
                                }
                            ],
                        })(
                            <Input.Password autoComplete='off' visibilityToggle={false} />
                        )}
                    </Form.Item>
                </Spin>
            </Modal>
        );
    }


    changeLoading(value) {
        this.setState({
            spinning: value
        })
    }

    onOk() {
        const form = this.props.form;
        let isValid = false;
        form.validateFields(['value', 'pwd'], { force: true }, (err, value) => {
            isValid = isNull(err);
        });
        //校验失败直接返回
        if (!isValid) {
            return;
        }
        const val = form.getFieldValue('value');
        const paswd = form.getFieldValue('pwd');
        const key = this.props.sn;
        const moid = this.props.moid;
        this.changeLoading(true);
        rechargeMeter(moid, key, paswd, val,
            (res) => {
                this.changeLoading(false);
                if (res.data.Status === 0) {
                    message.success('充值订单提交成功');
                    this.props.hide();
                } else {
                    message.error(res.data.Message);
                }
            },
            () => {
                this.changeLoading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            });
    }

    validatorLength(rule, value, callback) {

        if (value && value > 5000) {
            callback('单笔充值金额不超过5000元');
        }
        else {
            callback();
        }
    }
}
export default Form.create({})(RechargeModal);