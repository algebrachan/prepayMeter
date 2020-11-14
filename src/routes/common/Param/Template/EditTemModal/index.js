import React, { Component } from 'react';
import { Modal, Spin, message } from 'antd';
import { connect } from 'react-redux';
import EditTemForm from './EditTemForm';
import { modifyMeterParamTmpBasic } from '../../../../../utils/api';
import * as actionCreators from './store/actionCreators';
import * as tableCtors from '../TemTable/store/actionCreators';
import * as paramCtors from '../store/actionCreators';
import intl from 'react-intl-universal';
import { isNull } from 'util';

class EditTemModal extends Component {
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
                title={this.props.mode === 'add' ? '添加模板' : '编辑模板'}
                visible={this.props.show}
                onOk={this.handleOk}
                onCancel={this.props.hide}
                destroyOnClose
                centered
            >
                <Spin spinning={this.state.spinning}>
                    <EditTemForm
                        wrappedComponentRef={(form) => this.formRef = form}
                        data={this.props.param}
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
        form.validateFields(['param_keyid','param_name','param_desc'], { force: true }, (err, value) => {
            isValid = isNull(err);
        });
        //校验失败直接返回
        if (!isValid) {
            return;
        }

        let keyid = form.getFieldValue('param_keyid');
        let name = form.getFieldValue('param_name');
        let desc = form.getFieldValue('param_desc');
        let action = this.props.mode === 'add' ? 1 : 2;
        const param = {
            Mac:'',
            Action: action,
            Keyid: keyid,
            Name:name,
            Desc:desc,
        }
        this.changeLoading(true);
        modifyMeterParamTmpBasic(param,
            (res) => {
                this.changeLoading(false);
                if (res.data.Status === 0) {
                    message.success(`${intl.get('COMMON_MESSAGE.SET_SUCS')}`);
                    //添加成功进行页面跳转               
                    this.props.hide();
                    this.autoSearch();
                }
                else {
                    message.error(res.data.Message);
                }
            },
            () => {
                this.changeLoading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            }
        );
    };

    autoSearch() {
        const value = '';
        const pageindex = this.props.pageindex - 1;
        const pagesize = this.props.pagesize;
        this.props.updateParams(value, pageindex, pagesize);
    }
}

//将store映射到props
const mapStateToProps = (state) => {
    return {
        show: state.param_edit.show,
        mode: state.param_edit.mode,
        param: state.param_edit.param,
        //触发搜索需要的state
        search_type: state.param_header.search_type,
        search_value: state.param_header.search_value,
        pageindex: state.param_header.pageindex,
        pagesize: state.param_header.pagesize,

    }
}
//stroe.dispatch挂载到props
const mapDispatchToProps = (dispatch) => {
    return {
        updateParams(value, pageindex, pagesize) {
            //显示加载
            dispatch(tableCtors.getLoadingAction(true));
            //触发搜索
            dispatch(paramCtors.getDoSearchParamAction(value, pageindex, pagesize));
        },
        hide() {
            dispatch(actionCreators.getHideAction());
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditTemModal);