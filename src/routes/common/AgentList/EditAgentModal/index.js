import React, { Component } from 'react';
import { Modal, Spin, message } from 'antd';
import { connect } from 'react-redux';
import EditAgentForm from './EditAgentForm';
import * as actionCreators from './store/actionCreators';
import * as tableCtors from '../AgentTable/store/actionCreators';
import * as agentCtors from '../store/actionCreators';
import { isNull } from 'util';
import { modifyAgent } from '../../../../utils/api';
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
                title={this.props.mode === 'add' ? `${intl.get('AGENT_LIST.MODAL.ADD')}` : `${intl.get('AGENT_LIST.MODAL.EDIT')}`}
                visible={this.props.show}
                onOk={this.handleOk}
                onCancel={this.props.hide}
                destroyOnClose
                centered
            >
                <Spin spinning={this.state.spinning}>

                    <EditAgentForm
                        wrappedComponentRef={(form) => this.formRef = form}
                        data={this.props.agent}
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
        form.validateFields(['agent_keyid', 'agent_name', 'agent_owner', 'agent_phone', 'agent_locat', 'agent_type'], { force: true }, (err, value) => {
            isValid = isNull(err);
        });
        //校验失败直接返回
        if (!isValid) {
            return;
        }

        const keyid = form.getFieldValue('agent_keyid');
        const name = form.getFieldValue('agent_name');
        const owner = form.getFieldValue('agent_owner');
        const phone = form.getFieldValue('agent_phone');
        const locat = form.getFieldValue('agent_locat');
        const type = form.getFieldValue('agent_type');
        const param = {
            Mac: '',
            Keyid: keyid,
            Usnam: name,
            Phone: phone,
            Owner: owner,
            Locat: locat,
            Type: type,
        }
        this.changeLoading(true);
        modifyAgent(param,
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
        this.props.updateAgents(type, value, pageindex, pagesize);
    }
}

//将store映射到props
const mapStateToProps = (state) => {
    return {
        show: state.agent_edit.show,
        mode: state.agent_edit.mode,
        agent: state.agent_edit.agent,
        //触发搜索需要的state
        search_type: state.agent_header.search_type,
        search_value: state.agent_header.search_value,
        pageindex: state.agent_header.pageindex,
        pagesize: state.agent_header.pagesize,

    }
}
//stroe.dispatch挂载到props
const mapDispatchToProps = (dispatch) => {
    return {
        updateAgents(type, value, admtp, pageindex, pagesize) {
            //显示加载
            dispatch(tableCtors.getLoadingAction(true));
            //触发搜索
            dispatch(agentCtors.getDoSearchAgentAction(type, value, pageindex, pagesize));

        },
        hide() {
            dispatch(actionCreators.getHideAction());
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditAgentModal);