import React, { Component } from 'react';
import { Modal, message, Spin, Form, Input } from 'antd';
import { isNull } from 'util';
import { modifyOrderMark } from '../../../../../utils/api';
import intl from 'react-intl-universal';

class ModmarksModal extends Component {

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
                title='编辑'
                visible={this.props.show}
                destroyOnClose
                centered
                onCancel={this.props.hide}
                onOk={() => this.onOk()}
            >
                <Spin spinning={this.state.spinning}>
                    <Form.Item label="备注" {...formItemLayout}>
                        {getFieldDecorator('value', {
                            rules: [
                                {
                                    required: true,
                                    message: '备注',
                                },
                                {
                                    validator: this.validatorLength,
                                }
                            ],
                            initialValue: this.props.mark
                        })(
                            <Input autoComplete='off' placeholder='备注' />
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
        form.validateFields(['value'], { force: true }, (err, value) => {
            isValid = isNull(err);
        });
        //校验失败直接返回
        if (!isValid) {
            return;
        }
        const mark = form.getFieldValue('value');
        const sn = this.props.keyid;
        this.changeLoading(true);
        modifyOrderMark(sn, mark,
            (res) => {
                this.changeLoading(false);
                if (res.data.Status === 0) {
                    this.props.hide();
                    this.props.refresh();
                } else {
                    message.error(res.data.Message);
                }
            },
            () => {
                this.changeLoading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            })
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
export default Form.create({})(ModmarksModal);