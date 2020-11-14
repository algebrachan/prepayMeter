import React, { Component } from 'react';
import { Modal, Spin, message } from 'antd';
import { connect } from 'react-redux';
import EditSAccountForm from './EditSAccountForm';
import * as actionCreators from './store/actionCreators';
import * as tableCtors from '../SuperAccountTable/store/actionCreators';
import * as adminCtors from '../store/actionCreators';
import { isNull } from 'util';
import { modifyAdmin } from '../../../../utils/api';
import intl from 'react-intl-universal';

class EditAgentModal extends Component {
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
                title={this.props.mode === 'add' ? '添加经销商账号' : '编辑经销商账号'}
                visible={this.props.show}
                onOk={this.handleOk}
                onCancel={this.props.hide}
                destroyOnClose
                centered
            >
                <Spin spinning={this.state.spinning}>

                    <EditSAccountForm
                        wrappedComponentRef={(form) => this.formRef = form}
                        // products={this.props.products}
                        data={this.props.admin}
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
        form.validateFields(['admin_name', 'admin_owner', 'admin_system', 'admin_agentid', 'admin_stat'], { force: true }, (err, value) => {
            isValid = isNull(err);
        });
        //校验失败直接返回
        if (!isValid) {
            return;
        }
        const name = form.getFieldValue('admin_name');
        const owner = form.getFieldValue('admin_owner');
        const sys = form.getFieldValue('admin_system');
        let b = 0;
        for (let i = 0; i < sys.length; i++) {
            b = b + sys[i];
        }
        const agentid = form.getFieldValue('admin_agentid') + '';
        const stat = form.getFieldValue('admin_stat');
        const action = this.props.mode === 'add' ? 1 : 2;
        const param = {
            Action: action,
            Usnam: name,
            Owner: owner,
            Sys: b,
            Agentid: agentid,
            Stat: stat,
            Mac: '',
        }
        this.changeLoading(true);
        modifyAdmin(param,
            (res) => {
                this.changeLoading(false);
                if (res.data && res.data.Status === 0 && res.data.Data) {
                    message.success(`${intl.get('COMMON_MESSAGE.SAVE_SUCS')}`);
                    this.props.hide();
                    this.autoSearch();
                }
                else {
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
        const admtp = 2;
        this.props.updateAgents(type, value, admtp, pageindex, pagesize);
    }


}

//将store映射到props
const mapStateToProps = (state) => {
    return {
        show: state.super_account_edit.show,
        mode: state.super_account_edit.mode,
        admin: state.super_account_edit.admin,
        //触发搜索需要的state
        search_type: state.super_account_header.search_type,
        search_value: state.super_account_header.search_value,
        pageindex: state.super_account_header.pageindex,
        pagesize: state.super_account_header.pagesize,

    }
}

//stroe.dispatch挂载到props
const mapDispatchToProps = (dispatch) => {
    return {
        updateAgents(type, value, admtp, pageindex, pagesize) {
            //显示加载
            dispatch(tableCtors.getLoadingAction(true));
            //触发搜索
            dispatch(adminCtors.getDoSearchAgentAction(type, value, admtp, pageindex, pagesize));

        },
        hide() {
            dispatch(actionCreators.getHideAction());
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditAgentModal);