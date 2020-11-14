import React, { Component } from 'react';
import { Modal, Spin, message } from 'antd';
import { connect } from 'react-redux';
import EditUserForm from './EditUserForm';
import * as actionCreators from './store/actionCreators';
import * as userCtors from '../store/actionCreators';
import * as tableCtors from '../UserTable/store/actionCreators';
import intl from 'react-intl-universal';
import { isNull } from 'util';
import { modifyCustomer } from '../../../../utils/api';

class EditUserModal extends Component {
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
                title={this.props.mode === 'add' ? '添加用户' : '编辑用户'}
                visible={this.props.show}
                onOk={this.handleOk}
                onCancel={this.props.hide}
                destroyOnClose
                centered
            >
                <Spin spinning={this.state.spinning}>
                    <EditUserForm
                        wrappedComponentRef={(form) => this.formRef = form}
                        data={this.props.user}
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
        form.validateFields(['user_keyid', 'user_name', 'user_phone','user_code'], { force: true }, (err, value) => {
            isValid = isNull(err);
        });
        //校验失败直接返回
        if (!isValid) {
            return;
        }
        const keyid = form.getFieldValue('user_keyid');
        const name = form.getFieldValue('user_name');
        const phone = form.getFieldValue('user_phone');
        const code = form.getFieldValue('user_code');
        const action = this.props.mode === 'add' ? 1 : 2;

        const param = {
            Mac: '',
            Action: action,
            Keyid: keyid,
            Usnam: name,
            Phone: phone,
            Code: code,
        }
        this.changeLoading(true);
        modifyCustomer(param,
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
        this.props.updateUsers(type, value, pageindex, pagesize);
    }

}
const mapStateToProps = (state) => {
    return {
        show: state.user_edit.show,
        mode: state.user_edit.mode,
        user: state.user_edit.user,
        //触发autosearch搜索需要的state
        search_type: state.user_header.search_type,
        search_value: state.user_header.search_value,
        pageindex: state.user_header.pageindex,
        pagesize: state.user_header.pagesize,

    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        updateUsers(type, value, pageindex, pagesize) {
            dispatch(tableCtors.getLoadingAction(true));

            dispatch(userCtors.getDoSearchUserAction(type, value, pageindex, pagesize));
        },

        hide() {
            dispatch(actionCreators.getHideAction());
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditUserModal);