import React, { Component } from 'react';
import { Modal, message, Spin } from 'antd';
import { withRouter } from 'react-router-dom';
import { isNull } from 'util';
import * as Api from '../../../../../utils/api';
import RechargeForm from './RechargeForm';
import intl from 'react-intl-universal';
class RechargeModal extends Component {

    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const Keyid = arr[arr.length - 1];
        this.state = {
            spinning: false,
            cstmid: Keyid,
        }
        this.onOk = this.onOk.bind(this);
    }


    render() {

        return (

            <Modal
                title={intl.get('METER.RCG')}
                visible={this.props.show}
                destroyOnClose
                centered
                onCancel={this.props.onHide}
                onOk={this.onOk}
            >
                <Spin spinning={this.state.spinning}>

                    <RechargeForm
                        cstmid={this.state.cstmid}
                        wrappedComponentRef={(form) => this.formRef = form}
                    />
                </Spin>
            </Modal>
        );
    }


    changeLoading(loading) {
        this.setState({
            spinning: loading
        })
    }

    onOk() {

        const form = this.formRef.props.form;
        let isValid = false;
        form.validateFields(['value', 'pwd', 'type'], { force: true }, (err, value) => {
            isValid = isNull(err);
        });
        //校验失败直接返回
        if (!isValid) {
            return;
        }
        const value = form.getFieldValue('value');
        const paswd = form.getFieldValue('pwd');
        const keyid = this.state.cstmid;

        this.changeLoading(true);
        Api.recharge(keyid, value, paswd,
            (res) => {
                this.changeLoading(false);
                if (res.data && res.data.Status === 0) {
                    message.success(`${intl.get('COMMON_MESSAGE.OPER_SUCS')}`);
                    this.props.onHide();
                    this.props.refresh();
                }
                else {
                    message.error(res.data.Message);
                    return;
                }

            },
            () => {
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
                this.changeLoading(false);
            });

    }

    componentDidMount() {
    }


}
export default withRouter(RechargeModal);