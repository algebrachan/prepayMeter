import React, { Component } from 'react';
import { Modal, Spin, message } from 'antd';
import EditMeterForm from './EditMeterForm';
import { connect } from 'react-redux';
import * as tableCtors from '../MeterTable/store/actionCreators';
import * as metertors from '../store/actionCreators';
import * as actionCreators from './store/actionCreators';
import { isNull } from 'util';
import { modifyMeter } from '../../../../utils/api';
import intl from 'react-intl-universal';
class EditMeterModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            spinning: false,
        }
        this.handleOk = this.handleOk.bind(this);

    }

    render() {

        return (
            <Modal
                title={this.props.mode === 'add' ? '添加电表' : '编辑电表'}
                visible={this.props.show}
                onOk={this.handleOk}
                onCancel={this.props.hide}
                destroyOnClose
                centered
            >
                <Spin spinning={this.state.spinning}>
                    <EditMeterForm
                        wrappedComponentRef={(form) => this.formRef = form}
                        data={this.props.meter}
                        mode={this.props.mode}
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

    handleOk = () => {
        const form = this.formRef.props.form;
        let isValid = false;

        form.validateFields(['meter_keyid', 'meter_name', 'meter_agent', 'meter_devtp', 'meter_ptp', 'meter_rtp', 'meter_chgtp', 'meter_irmt', 'meter_prtl', 'meter_psw', 'meter_wmd',
            'meter_ctrt', 'meter_chk', 'meter_dbit', 'meter_brate'], { force: true }, (err, value) => {
                isValid = isNull(err);
            });

        //校验失败直接返回
        if (!isValid) {
            return;
        }
        const keyid = form.getFieldValue('meter_keyid');
        const name = form.getFieldValue('meter_name');
        const agent = form.getFieldValue('meter_agent');
        const type = form.getFieldValue('meter_devtp');
        const ptp = form.getFieldValue('meter_ptp');
        const rtp = form.getFieldValue('meter_rtp');
        const chgtp = form.getFieldValue('meter_chgtp');
        const irmt = form.getFieldValue('meter_irmt');
        const prtl = form.getFieldValue('meter_prtl');
        const psw = form.getFieldValue('meter_psw');
        const wmd = form.getFieldValue('meter_wmd');
        const ctrt = form.getFieldValue('meter_ctrt');

        const chk = form.getFieldValue('meter_chk');
        const dbit = form.getFieldValue('meter_dbit');
        const brate = form.getFieldValue('meter_brate');

        const action = this.props.mode === 'add' ? 1 : 2;

        const rs485cfg = {
            Chktp: chk,
            DataBit: dbit,
            BaudRate: brate,
        }
        const param = {
            Mac: '',
            Action: action,
            HexKeyid: keyid,
            Usnam: name,
            Agent: agent,
            Devtp: type,
            Ptp: ptp,
            Rtp: rtp,
            Sys: 0,
            Chgtp: chgtp,
            Irmt: irmt,
            Prtl: prtl,
            Psw: psw,
            Wmd: wmd,
            Ctrt: ctrt,
            Rs485cfg: rs485cfg
        }
        this.changeLoading(true);
        modifyMeter(param,
            (res) => {
                this.changeLoading(false);
                if (res.data && res.data.Status === 0 && res.data.Data) {
                    message.success(`${intl.get('COMMON_MESSAGE.SAVE_SUCS')}`);
                    this.props.hide();
                    // this.autoSearch();
                }
                else {
                    message.error(res.data.Message);
                }
            },
            () => {
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
                this.changeLoading(false);
            });

    }
    autoSearch() {
        const type = this.props.search_type;
        const value = this.props.search_value;
        const pageindex = this.props.pageindex - 1;
        const pagesize = this.props.pagesize;
        const gpid = 0;
        const key = '';
        const olstt = this.props.search_olstt;
        const admid = this.props.search_admid;
        this.props.updateMeters(type, value, pageindex, pagesize, key, gpid, olstt, admid);
    }

}

const mapStateToProps = (state) => {
    return {
        show: state.meter_edit.show,
        mode: state.meter_edit.mode,
        meter: state.meter_edit.meter,
        //触发搜索需要的state
        search_admid: state.meter_header.search_admid,
        search_type: state.meter_header.search_type,
        search_value: state.meter_header.search_value,
        search_olstt: state.meter_header.search_olstt,
        pageindex: state.meter_header.pageindex,
        pagesize: state.meter_header.pagesize,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        updateMeters(type, value, pageindex, pagesize, key, gpid, olstt, admid) {
            //显示加载
            dispatch(tableCtors.getLoadingAction(true));
            //触发搜索
            dispatch(metertors.getDoSearchMeterAction(type, value, pageindex, pagesize, key, gpid, olstt, admid));
        },
        hide() {
            dispatch(actionCreators.getHideAction());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMeterModal);
