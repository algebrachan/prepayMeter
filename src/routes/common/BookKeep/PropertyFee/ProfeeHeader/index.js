import React, { Component } from 'react';
import { Select, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as tableCtors from '../ProfeeTable/store/actionCreators';
import * as headerCtors from './store/actionCreators';
import * as cinfoCtors from '../store/actionCreators';
import * as modalCtros from '../EditProfeeModal/store/actionCreators';
import intl from 'react-intl-universal';


const { Option } = Select;
class ProfeeHeader extends Component {
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
        }
    }

    render() {
        return (
            <div className="book_profee_header_root">
                <Select
                    defaultValue='1'
                    className="book_profee_header_state"
                    onChange={this.props.changeSearchType}
                    value={this.props.search_type}
                >
                    <Option value="1">收费主体</Option>
                    <Option value="2">关联物业</Option>
                    <Option value="3">联系人</Option>
                    <Option value="4">联系电话</Option>
                </Select>
                {/* <Select placeholder=""
                    defaultValue='0'
                    className="book_profee_header_state"
                    onChange={this.props.changeSearchExpire}
                    value={this.props.search_expire}
                >
                    <Option value="0">全部</Option>
                    <Option value="1">过期</Option>
                    <Option value="2">未过期</Option>
                </Select> */}
                <Input className="book_profee_header_input_search"
                    placeholder={intl.get('COMMON_IPT.SEARCH_IPT')}
                    value={this.props.search_value}
                    onChange={this.props.changeSearchValue}
                />
                <Button className="book_profee_header_btn_search" type="primary" icon="search" onClick={() => this.searchClick()}>{intl.get('COMMON_BTN.SEARCH')}</Button>
                <Button className="book_profee_header_btn_search" type="primary" icon="edit" onClick={() => { this.props.showAddPark() }}>{intl.get('COMMON_BTN.ADD')}</Button>
            </div>
        );

    }

    componentDidMount() {
        this.searchClick();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.pageindex !== nextProps.pageindex || this.props.pagesize !== nextProps.pagesize) {
            const type = this.props.search_type;
            const value = this.props.search_value;
            const expire = this.props.search_expire;
            const pageindex = nextProps.pageindex - 1;
            const pagesize = nextProps.pagesize;
            const bookid = this.state.keyid;
            this.props.updateCinfos(type, value, bookid, expire, pageindex, pagesize);
        }
    }
    searchClick() {
        const type = this.props.search_type;
        const value = this.props.search_value;
        const expire = this.props.search_expire;
        const pageindex = this.props.pageindex - 1;
        const pagesize = this.props.pagesize;
        const bookid = this.state.keyid;
        this.props.updateCinfos(type, value, bookid, expire, pageindex, pagesize);
    }
}
const mapStateToProps = (state) => {
    return {
        search_type: state.book_profee_header.search_type,
        search_value: state.book_profee_header.search_value,
        search_expire: state.book_profee_header.search_expire,
        pageindex: state.book_profee_header.pageindex,
        pagesize: state.book_profee_header.pagesize,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateCinfos(type, value, bookid, expire, pageindex, pagesize) {
            dispatch(tableCtors.getLoadingAction(true));
            dispatch(cinfoCtors.getDoSearchCinfoAction(type, value, bookid, expire, pageindex, pagesize));
        },
        changeSearchType(value) {
            dispatch(headerCtors.getChangeTypeAction(value));
        },
        changeSearchExpire(value) {
            dispatch(headerCtors.getChangeExpireAction(value));
        },

        showAddPark() {
            dispatch(modalCtros.getAddAction());
        },
        // input框的参数,event.target.value
        changeSearchValue(e) {
            dispatch(headerCtors.getChangeValueAction(e.target.value));
        },
        changePagination(pageindex, pagesize) {
            dispatch(headerCtors.getChangePaginationAction(pageindex, pagesize));
        }
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfeeHeader));