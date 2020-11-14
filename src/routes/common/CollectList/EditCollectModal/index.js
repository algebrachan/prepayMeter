import React, { Component } from 'react';
import { Modal, Spin, message } from 'antd';
import { connect } from 'react-redux';
import EditCollectForm from './EditCollectForm';
import * as actionCreators from './store/actionCreators';
import * as collectCtors from '../store/actionCreators';
import * as tableCtors from '../CollectTable/store/actionCreators';
import { isNull } from 'util';
import { modifyGateway } from '../../../../utils/api';
import * as session from '../../../../utils/Session';
import intl from 'react-intl-universal';

class EditCollectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinning: false,
        }
        this.handleOk = this.handleOk.bind(this);
    }

    render() {
        const type = session.getLoginVertificate().Type;
        return (
            <Modal
                title={this.props.mode === 'add' ? '添加采集器' : '编辑采集器'}
                visible={this.props.show}
                onOk={this.handleOk}
                onCancel={this.props.hide}
                destroyOnClose
                centered

            >


                <Spin spinning={this.state.spinning}>
                    <EditCollectForm
                        wrappedComponentRef={(form) => this.formRef = form}
                        data={this.props.collect}
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
        form.validateFields(['collect_keyid', 'collect_name', 'collect_agent','collect_devtp'], { force: true }, (err, value) => {
            isValid = isNull(err);
        });
        //校验失败直接返回
        if (!isValid) {
            return;
        }
        const keyid = form.getFieldValue('collect_keyid');
        const name = form.getFieldValue('collect_name');
        const agent = form.getFieldValue('collect_agent');
        const devtp = form.getFieldValue('collect_devtp');
        const action = this.props.mode === 'add' ? 1 : 2;

        const param = {
            Mac:'',
            Action: action,
            HexKeyid: keyid,
            Usnam: name,
            Agent: agent,
            Devtp: devtp,
            Sys: 0,
        }
        this.changeLoading(true);
        modifyGateway(param,
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
        this.props.updateCollects(type, value, pageindex, pagesize);
    }

}

const mapStateToProps = (state) => {
    return {
        show: state.collect_edit.show,
        mode: state.collect_edit.mode,
        collect: state.collect_edit.collect,
        //触发搜索需要的state
        search_type: state.collect_header.search_type,
        search_value: state.collect_header.search_value,
        pageindex: state.collect_header.pageindex,
        pagesize: state.collect_header.pagesize,

    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        updateCollects(type, value, pageindex, pagesize) {
            //显示加载
            dispatch(tableCtors.getLoadingAction(true));
            //触发搜索
            dispatch(collectCtors.getDoSearchCollectAction(type, value, pageindex, pagesize));

        },

        hide() {
            dispatch(actionCreators.getHideAction());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCollectModal);