import React, { Component } from 'react';
import { Button, Input } from 'antd';
import { connect } from 'react-redux';
import './style.css';
import * as groupModalCtors from '../EditGmModal/store/actionCreators';
import * as headerCtors from './store/actionCreators';
import * as tableCtors from '../GMTable/store/actionCreators';
import * as groupCtors from '../store/actionCreators';
import intl from 'react-intl-universal';

class GMHeader extends Component {
    constructor(props) {
        super(props);
        this.searchClick = this.searchClick.bind(this);
    }

    render() {
        return (

            <div className="syspre_group_header_root">
                <Input className="syspre_group_header_input_search"
                    placeholder={intl.get('COMMON_IPT.SEARCH_IPT')}
                    value={this.props.search_value}
                    onChange={this.props.changeSearchValue}
                />
                <Button className="syspre_group_header_btn_search" type="primary" icon="search" onClick={this.searchClick}>{intl.get('COMMON_BTN.SEARCH')}</Button>
                <Button className="syspre_group_header_btn_search" type="primary" icon="edit" onClick={() => { this.props.showAddGroup() }}>{intl.get('COMMON_BTN.ADD')}</Button>
            </div>
        )
    }

    componentDidMount() {
        this.searchClick();
    }

    //更新页面props触发的函数
    componentWillReceiveProps(nextProps) {
        if (this.props.pageindex !== nextProps.pageindex || this.props.pagesize !== nextProps.pagesize) {
            const value = this.props.search_value;
            const pageindex = nextProps.pageindex - 1;
            const pagesize = nextProps.pagesize;
            this.props.updateGroups(value, pageindex, pagesize);
        }
    }




    searchClick() {
        const value = this.props.search_value;
        const pageindex = this.props.pageindex - 1;
        const pagesize = this.props.pagesize;
        this.props.updateGroups(value, pageindex, pagesize);
    }

}
const mapStateToProps = (state) => {
    return {
        search_type: state.group_header.search_type,
        search_value: state.group_header.search_value,
        pageindex: state.group_header.pageindex,
        pagesize: state.group_header.pagesize,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateGroups(value, pageindex, pagesize) {
            //显示加载
            dispatch(tableCtors.getLoadingAction(true));
            //触发搜索
            dispatch(groupCtors.getDoSearchGroupAction(value, pageindex, pagesize));

        },
        showAddGroup() {
            dispatch(groupModalCtors.getAddAction());
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

export default connect(mapStateToProps, mapDispatchToProps)(GMHeader);