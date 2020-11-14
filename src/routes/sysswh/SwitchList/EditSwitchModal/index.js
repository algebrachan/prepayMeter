import React, { Component } from 'react';
import { Modal, Spin, message } from 'antd';
import EditMeterForm from './EditSwitchForm';
import { connect } from 'react-redux';
import * as tableCtors from '../SwitchTable/store/actionCreators';
import * as switchtors from '../store/actionCreators';
import * as actionCreators from './store/actionCreators';
import { isNull } from 'util';
import { modifySwitch } from '../../../../utils/api';
import intl from 'react-intl-universal';

class EditSwitchModal extends Component {

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
                title={this.props.mode === 'add' ? '添加开关' : '编辑开关'}
                visible={this.props.show}
                onOk={this.handleOk}
                onCancel={this.props.hide}
                destroyOnClose
                centered


            >
                <Spin spinning={this.state.spinning}>
                    <EditMeterForm

                        wrappedComponentRef={(form) => this.formRef = form}
                        data={this.props.switch}
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
        form.validateFields(['switch_keyid', 'switch_name', 'switch_agent','switch_lng','switch_lat'], { force: true }, (err, value) => {
            isValid = isNull(err);
        });
        //校验失败直接返回
        if (!isValid) {
            return;
        }
        const keyid = form.getFieldValue('switch_keyid');
        const name = form.getFieldValue('switch_name');
        const agent = form.getFieldValue('switch_agent');
        const lng = form.getFieldValue('switch_lng');
        const lat = form.getFieldValue('switch_lat');
        const action = this.props.mode === 'add' ? 1 : 2;

        const param = {
            Action: action,
            HexKeyid: keyid,
            Usnam: name,
            Agent: agent,
            Lng: lng,
            Lat: lat,
        }
        this.changeLoading(true);
        modifySwitch(param,
            (res) => {
                this.changeLoading(false);
                if (res.data && res.data.Status === 0 && res.data.Data) {
                    message.success(`${intl.get('COMMON_MESSAGE.SAVE_SUCS')}`);
                    this.props.hide();
                    this.autoSearch();

                }
                else {
                    message.error( res.data.Message);
                }
            },
            () => {
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
                this.changeLoading(false);
            });

    }
    autoSearch() {
        const type = this.props.search_type;
        const value = '';
        const pageindex = this.props.pageindex - 1;
        const pagesize = this.props.pagesize;
        this.props.updateSwitchs(type, value, pageindex, pagesize);
    }

}

const mapStateToProps = (state) => {
    return {
        show: state.switch_edit.show,
        mode: state.switch_edit.mode,
        switch: state.switch_edit.switch,
        //触发搜索需要的state
        search_type: state.switch_header.search_type,
        search_value: state.switch_header.search_value,
        pageindex: state.switch_header.pageindex,
        pagesize: state.switch_header.pagesize,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        updateSwitchs(type, value, pageindex, pagesize) {
            //显示加载
            dispatch(tableCtors.getLoadingAction(true));
            //触发搜索
            dispatch(switchtors.getDoSearchMeterAction(type, value, pageindex, pagesize));

        },
        hide() {
            dispatch(actionCreators.getHideAction());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSwitchModal);
