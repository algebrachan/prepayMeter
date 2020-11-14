import React, { Component } from 'react';
import { Modal, Spin, message } from 'antd';
import { connect } from 'react-redux';
import EditTimeForm from './EditTimeForm';
import * as actionCreators from './store/actionCreators';
import * as tableCtors from '../ProfeeTable/store/actionCreators';
import * as feeCtors from '../store/actionCreators';
import { withRouter } from 'react-router-dom';
import intl from 'react-intl-universal';
// import { isNull } from 'util';
import { modifyBookItemExpire } from '../../../../../utils/api';


class EditTimeModal extends Component {
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
            expire: 0,
            tkey: '',
        }
        this.handleOk = this.handleOk.bind(this);
    }

    render() {
        return (

            <Modal
                title='修改到期时间'
                visible={this.props.show}
                onOk={this.handleOk}
                onCancel={this.props.hide}
                destroyOnClose
                centered
            >
                <Spin spinning={this.state.spinning}>

                    <EditTimeForm
                        tkey={this.props.time.time_keyid}
                        expire={this.props.time.time_expire}
                        mode={this.props.mode}
                        SetData={(expire, tkey) => this.SetPropsData(expire, tkey)}
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

    SetPropsData(expire, tkey) {
        this.setState({
            expire: expire,
            tkey: tkey,
        });
    }

    handleOk = () => {
        const keyid = this.state.tkey;
        const expire = this.state.expire;
        this.changeLoading(true);
        modifyBookItemExpire(keyid, expire,
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
        show: state.book_profee_expire.show,
        mode: state.book_profee_expire.mode,
        time: state.book_profee_expire.time,
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditTimeModal));