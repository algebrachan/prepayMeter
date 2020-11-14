import React, { Component } from 'react';
import { Modal, Spin, message } from 'antd';
import { connect } from 'react-redux';
import EditGmForm from './EditGmForm';
import * as actionCreators from './store/actionCreators';
import * as tableCtors from '../GMTable/store/actionCreators';
import * as groupCtors from '../store/actionCreators';
import { isNull } from 'util';
import { modifyGroup } from '../../../../utils/api';
import intl from 'react-intl-universal';
class EditGmModal extends Component {
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
                title={this.props.mode === 'add' ? '添加分组' : '编辑分组'}
                visible={this.props.show}
                onOk={this.handleOk}
                onCancel={this.props.hide}
                destroyOnClose
                centered
            >
                <Spin spinning={this.state.spinning}>

                    <EditGmForm
                        wrappedComponentRef={(form) => this.formRef = form}
                        data={this.props.group}
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
        form.validateFields(['group_name','group_keyid','group_desc'], { force: true }, (err, value) => {
            isValid = isNull(err);
        });
        //校验失败直接返回
        if (!isValid) {
            return;
        }

        const name = form.getFieldValue('group_name');
        const keyid = form.getFieldValue('group_keyid');
        const desc = form.getFieldValue('group_desc');
        const action = this.props.mode === 'add' ? 1 : 2;
        
        const param = {
            Mac: '',
            Action: action,
            Keyid: keyid,
            Name: name,
            Agtid: '',
            Sys: '',
            Desc:desc,
        }
        this.changeLoading(true);
        modifyGroup(param,
            (res) => {
                this.changeLoading(false);
                if (res.data.Status === 0) {
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
            }
        );

    };

    autoSearch() {
        const value = '';
        const pageindex = this.props.pageindex - 1;
        const pagesize = this.props.pagesize;
        this.props.updateAgents(value, pageindex, pagesize);
    }
}

//将store映射到props
const mapStateToProps = (state) => {
    return {
        show: state.group_edit.show,
        mode: state.group_edit.mode,
        group: state.group_edit.group,
        gplist: state.group_table.gplist,
        //触发搜索需要的state
        search_type: state.group_header.search_type,
        search_value: state.group_header.search_value,
        pageindex: state.group_header.pageindex,
        pagesize: state.group_header.pagesize,

    }
}
//stroe.dispatch挂载到props
const mapDispatchToProps = (dispatch) => {
    return {
        updateAgents(value, pageindex, pagesize) {
            //显示加载
            dispatch(tableCtors.getLoadingAction(true));
            //触发搜索
            dispatch(groupCtors.getDoSearchGroupAction(value, pageindex, pagesize));

        },
        hide() {
            dispatch(actionCreators.getHideAction());
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditGmModal);