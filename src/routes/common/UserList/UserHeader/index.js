import React, { Component } from 'react';
import { Button, Input, Select } from 'antd';
import { connect } from 'react-redux';
import * as userModalCtors from '../EditUserModal/store/actionCreators';
import * as headerCtors from '../UserHeader/store/actionCreators';
import * as tableCtors from '../UserTable/store/actionCreators';
import * as userCtors from '../store/actionCreators';
import intl from 'react-intl-universal';
import './style.css';
class UserHeader extends Component {
    constructor(props) {
        super(props);
        this.searchClick = this.searchClick.bind(this);
    }



    render() {
        return (
            <div className="syspre_userlist_header_root">
                <Select placeholder="搜索类型"
                    className="syspre_userlist_header_state"
                    defaultValue='1'
                    onChange={this.props.changeSearchType}
                    value={this.props.search_type}

                >
                    <Select.Option key="1">{intl.get('USER_LIST.NAME')}</Select.Option>
                    <Select.Option key='2'>{intl.get('USER_LIST.ACCOUNT')}</Select.Option>
                </Select>
                <Input className="syspre_userlist_header_input_search"
                    placeholder={intl.get('COMMON_IPT.SEARCH_IPT')}
                    value={this.props.search_value}
                    onChange={this.props.changeSearchValue}
                />
                <Button className="syspre_userlist_header_btn" icon="search" type="primary" onClick={this.searchClick}>{intl.get('COMMON_BTN.SEARCH')}</Button>
                {/* <Button className="syspre_userlist_header_btn" icon="edit" type="primary" onClick={()=>{this.props.showAddUser()}}>添加</Button> */}
            </div>
        )
    }

    componentDidMount() {
        this.searchClick();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.pageindex !== nextProps.pageindex || this.props.pagesize !== nextProps.pagesize) {
            const type = this.props.search_type;
            const value = this.props.search_value;
            const pageindex = nextProps.pageindex - 1;
            const pagesize = nextProps.pagesize;
            this.props.updateUsers(type, value, pageindex, pagesize);
        }
    }

    searchClick() {
        const type = this.props.search_type;
        const value = this.props.search_value;
        const pageindex = this.props.pageindex - 1;
        const pagesize = this.props.pagesize;
        this.props.updateUsers(type, value, pageindex, pagesize);
    }
}

const mapStateToProps = (state) => {
    return {
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
        showAddUser() {
            dispatch(userModalCtors.getAddAction());
        },
        changeSearchType(value) {
            dispatch(headerCtors.getChangeTypeAction(value));
        },
        // input框的参数,event.target.value
        changeSearchValue(e) {
            dispatch(headerCtors.getChangeValueAction(e.target.value));
        },
        changePagination(pageindex, pagesize) {
            dispatch(headerCtors.getChangePaginationAction(pageindex, pagesize));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);