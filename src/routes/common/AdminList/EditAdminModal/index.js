import React, { Component } from 'react';
import { Modal, Spin, message } from 'antd';
import { connect } from 'react-redux';
import EditAdminForm from './EditAdminForm';
import * as actionCreators from './store/actionCreators';
import * as tableCtors from '../AdminTable/store/actionCreators';
import * as agentCtors from '../store/actionCreators';
import intl from 'react-intl-universal';
import { isNull } from 'util';
import { modifyAgentSubAdmin } from '../../../../utils/api';

class EditAdminModal extends Component {
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
                title={this.props.mode === 'add' ? '添加子管理员' : '编辑子管理员'}
                visible={this.props.show}
                onOk={this.handleOk}
                onCancel={this.props.hide}
                destroyOnClose
                centered
            >
                <Spin spinning={this.state.spinning}>
                    <EditAdminForm wrappedComponentRef={(form) => this.formRef = form} data={this.props.agent} mode={this.props.mode} />
                </Spin>
            </Modal>
        );
    }
    changeLoading(loading) { this.setState({ spinning: loading }) }
    handleOk = () => {
        const form = this.formRef.props.form;
        let isValid = false;
        form.validateFields(['admin_stat', 'admin_name', 'admin_owner'], { force: true }, (err, value) => {
            isValid = isNull(err);
        });
        //校验失败直接返回
        if (!isValid) { return; }
        const action = this.props.mode === 'add' ? 1 : 2;
        const name = form.getFieldValue('admin_name');
        const owner = form.getFieldValue('admin_owner');
        const stat = form.getFieldValue('admin_stat');
        const param = {
            Action: action,
            Mac: '',
            Sys: '',
            Agentid: '',
            Usnam: name,
            Stat: stat ? 0 : -1,
            Owner: owner,
        }
        this.changeLoading(true);
        modifyAgentSubAdmin(param,
            (res) => {
                this.changeLoading(false);
                if (res.data && res.data.Status === 0 && res.data.Data) {
                    message.success(`${intl.get('COMMON_MESSAGE.SAVE_SUCS')}`);
                    this.props.hide();
                    this.autoSearch();
                } else {
                    message.error(res.data.Message);
                }
            },
            () => {
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
                this.changeLoading(false);
            });
    };

    autoSearch() {
        const type = this.props.search_type;
        const value = '';
        const pageindex = this.props.pageindex - 1;
        const pagesize = this.props.pagesize;
        const admtp = 4;
        this.props.updateAdmins(type, value, admtp, pageindex, pagesize);
    }
}

//将store映射到props
const mapStateToProps = (state) => {
    return {
        show: state.admin_edit.show,
        mode: state.admin_edit.mode,
        agent: state.admin_edit.agent,
        //触发搜索需要的state
        search_type: state.admin_header.search_type,
        search_value: state.admin_header.search_value,
        pageindex: state.admin_header.pageindex,
        pagesize: state.admin_header.pagesize,
    }
}
//stroe.dispatch挂载到props
const mapDispatchToProps = (dispatch) => {
    return {
        updateAdmins(type, value, admtp, pageindex, pagesize) {
            //显示加载
            dispatch(tableCtors.getLoadingAction(true));
            //触发搜索
            dispatch(agentCtors.getDoSearchAdminAction(type, value, admtp, pageindex, pagesize));
        },
        hide() {
            dispatch(actionCreators.getHideAction());
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditAdminModal);