import React, { Component } from 'react';
import { Modal, message, Spin } from 'antd';
import { withRouter } from 'react-router-dom';
import { isNull } from 'util';
import OrderForm from './OrderForm';
import intl from 'react-intl-universal';
import { createOrder } from "../../../../../utils/api";

class OrderModal extends Component {

    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const keyid = arr[arr.length - 1];
        this.state = {
            spinning: false,
            keyid: keyid,
        }
        this.onOk = this.onOk.bind(this);
        this.loading = this.loading.bind(this);
    }


    render() {
        return (
            <Modal
                title='订单'
                visible={this.props.show}
                destroyOnClose
                centered
                onCancel={this.props.hide}
                onOk={() => this.onOk()}
            >
                <Spin spinning={this.state.spinning}>
                    <OrderForm wrappedComponentRef={(form) => this.formRef = form} />
                </Spin>
            </Modal>
        );
    }

    loading(value) {
        this.setState({
            spinning: value,
        });
    }
    onOk() {
        const form = this.formRef.props.form;
        let isValid = false;
        form.validateFields(['order_idtype', 'order_id', 'order_paswd'], { force: true }, (err, value) => {
            isValid = isNull(err);
        });
        //校验失败直接返回
        if (!isValid) {
            return;
        }
        const idtype = form.getFieldValue('order_idtype');
        const id = form.getFieldValue('order_id');
        const paswd = form.getFieldValue('order_paswd');
        const key = this.state.keyid;
        this.loading(true);
        createOrder(idtype, id, key, paswd,
            (res) => {
                this.loading(false);
                if (res.data.Status === 0) {
                    message.success(`${intl.get('COMMON_MESSAGE.OPER_SUCS')}`);
                    //调用父级方法 隐藏modal 刷新数据
                    this.props.hide();
                    this.props.refresh();
                } else {
                    message.error(res.data.Message);
                }
            },
            () => {
                this.loading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            });
    }

}
export default withRouter(OrderModal);