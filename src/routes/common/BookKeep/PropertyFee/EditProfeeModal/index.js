import React, { Component } from 'react';
import { Modal, Spin, message } from 'antd';
import { connect } from 'react-redux';
import EditFeeForm from './EditFeeForm';
import * as actionCreators from './store/actionCreators';
import * as tableCtors from '../ProfeeTable/store/actionCreators';
import * as feeCtors from '../store/actionCreators';
import { withRouter } from 'react-router-dom';
import { isNull } from 'util';
import { modifyBookItem } from '../../../../../utils/api';
import intl from 'react-intl-universal';

class EditProfeeModal extends Component {
    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const string = arr[arr.length - 1];
        const arr2 = string.split('&');
        const keyid = arr2[0];
        const name = arr2[1];
        this.state = {
            keyid: keyid,
            name: name,
            spinning: false,
        }
        this.handleOk = this.handleOk.bind(this);
    }

    render() {
        return (

            <Modal
                title={this.props.mode === 'add' ? '添加' : '编辑'}
                visible={this.props.show}
                onOk={this.handleOk}
                onCancel={this.props.hide}
                destroyOnClose
                centered
            >
                <Spin spinning={this.state.spinning}>

                    <EditFeeForm
                        wrappedComponentRef={(form) => this.formRef = form}
                        data={this.props.profee}
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
        form.validateFields(['profee_keyid', 'profee_name', 'profee_owner', 'profee_phone', 'profee_prop', 'profee_agtid', 'profee_enable'], { force: true }, (err, value) => {
            isValid = isNull(err);
        });
        //校验失败直接返回
        if (!isValid) {
            return;
        }

        const keyid = form.getFieldValue('profee_keyid');
        const name = form.getFieldValue('profee_name');
        const owner = form.getFieldValue('profee_owner');
        const phone = form.getFieldValue('profee_phone');
        const prop = form.getFieldValue('profee_prop');
        const enable = form.getFieldValue('profee_enable');
        const bkid = this.state.keyid;
        const action = this.props.mode === 'add' ? 1 : 2;
        const param = {
            Action: action,
            Mac: '',
            Keyid: keyid,
            Owner: owner,
            Usnam: name,
            Phone: phone,
            Prop: prop,
            Agtid: '',
            Enable: enable,
            Bkid: bkid,
        }
        this.changeLoading(true);
        modifyBookItem(param, 
            (res) =>{
                this.changeLoading(false);
                if(res.data && res.data.Status === 0 && res.data.Data){
                    message.success(`${intl.get('COMMON_MESSAGE.SAVE_SUCS')}`);
                    this.props.hide();
                    this.autoSearch();
                }
                else{
                    message.error(res.data.Message);
                }
            }, 
            ()=>{
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
                this.changeLoading(false);
            });

    };

    autoSearch() {
        const type = this.props.search_type;
        const value = '';
        const expire = this.props.search_expire;
        const pageindex = this.props.pageindex - 1;
        const pagesize = this.props.pagesize;
        const bookid = this.state.keyid;
        this.props.updateCinfos(type, value, bookid, expire, pageindex, pagesize);
    }
}

//将store映射到props
const mapStateToProps = (state) => {
    return {
        show: state.book_profee_edit.show,
        mode: state.book_profee_edit.mode,
        profee: state.book_profee_edit.profee,
        //触发搜索需要的state
        search_type: state.book_profee_header.search_type,
        search_value: state.book_profee_header.search_value,
        search_expire: state.book_profee_header.search_expire,
        pageindex: state.book_profee_header.pageindex,
        pagesize: state.book_profee_header.pagesize,

    }
}
//stroe.dispatch挂载到props
const mapDispatchToProps = (dispatch) => {
    return {
        updateCinfos(type, value, bookid, expire, pageindex, pagesize) {
            //显示加载
            dispatch(tableCtors.getLoadingAction(true));
            //触发搜索
            dispatch(feeCtors.getDoSearchCinfoAction(type, value, bookid, expire, pageindex, pagesize));
        },
        hide() {
            dispatch(actionCreators.getHideAction());
        },
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfeeModal));