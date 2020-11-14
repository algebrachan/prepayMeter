import React, { Component } from 'react';
import { Button, Select, Input } from 'antd';
import { connect } from 'react-redux';
import * as adminModalCtors from '../EditSAccountModal/store/actionCreators';
import * as headerCtors from './store/actionCreators';
import * as tableCtors from '../SuperAccountTable/store/actionCreators';
import * as adminCtors from '../store/actionCreators';
import intl from 'react-intl-universal';
import './style.css';
const { Option } = Select;
class SuperAccountHeader extends Component {
    constructor(props) {
        super(props);
        this.searchClick = this.searchClick.bind(this);
    }

    render() {

        return (
            <div className="syspre_agent_header_root">
                <Select placeholder="搜索类型"
                    className="syspre_agent_header_state"
                    defaultValue='1'
                    onChange={this.props.changeSearchType}
                    value={this.props.search_type}
                >
                    <Option value="1">用户账号</Option>


                </Select>
                <Input className="syspre_agent_header_input_search"
                    placeholder={intl.get('COMMON_IPT.SEARCH_IPT')}
                    value={this.props.search_value}
                    onChange={this.props.changeSearchValue}
                />
                <Button className="syspre_agent_header_btn_search" type="primary" icon="search" onClick={this.searchClick}>{intl.get('COMMON_BTN.SEARCH')}</Button>
                <Button className="syspre_agent_header_btn_search" type="primary" icon="user-add" onClick={() => { this.props.showAddSAccount() }}>{intl.get('COMMON_BTN.ADD_ACT')}</Button>
            </div>
        )
    }

    componentDidMount() {
        this.searchClick();
    }

    //更新页面props触发的函数
    componentWillReceiveProps(nextProps) {


        if (this.props.pageindex !== nextProps.pageindex || this.props.pagesize !== nextProps.pagesize) {
            const type = this.props.search_type;
            const value = this.props.search_value;
            const pageindex = nextProps.pageindex - 1;
            const pagesize = nextProps.pagesize;
            const admtp = 2;
            this.props.updateAgents(type, value, admtp, pageindex, pagesize);
        }
    }

    searchClick() {
        const type = this.props.search_type;
        const value = this.props.search_value;
        const pageindex = this.props.pageindex - 1;
        const pagesize = this.props.pagesize;
        const admtp = 2;
        this.props.updateAgents(type, value, admtp, pageindex, pagesize);
    }

}
const mapStateToProps = (state) => {
    return {
        search_type: state.super_account_header.search_type,
        search_value: state.super_account_header.search_value,
        pageindex: state.super_account_header.pageindex,
        pagesize: state.super_account_header.pagesize,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateAgents(type, value, admtp, pageindex, pagesize) {
            //显示加载
            dispatch(tableCtors.getLoadingAction(true));
            //触发搜索
            dispatch(adminCtors.getDoSearchAgentAction(type, value, admtp, pageindex, pagesize));

        },
        showAddSAccount() {
            dispatch(adminModalCtors.getAddAction());
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

export default connect(mapStateToProps, mapDispatchToProps)(SuperAccountHeader);