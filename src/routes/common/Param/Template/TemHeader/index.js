import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as paramModalCtors from '../EditTemModal/store/actionCreators';
import * as headerCtors from './store/actionCreators';
import * as tableCtors from '../TemTable/store/actionCreators';
import * as paramCtors from '../store/actionCreators';
import intl from 'react-intl-universal';
import './style.css';

class TemHeader extends Component {
    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const sys = arr[1];
        this.state = {
            system: sys,
        }
    }

    render() {
        return (
            <div className="syspre_param_template_header_root">
                <Button className="syspre_param_template_header_btn_search" type="primary" icon="search" onClick={() => this.searchClick()}>{intl.get('COMMON_BTN.SEARCH')}</Button>
                <Button className="syspre_param_template_header_btn_search" type="primary" icon="edit" onClick={() => this.jumpAddParam()}>{intl.get('COMMON_BTN.ADD')}</Button>
            </div>
        );
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
            this.props.updateParams(value, pageindex, pagesize);
        }
    }

    jumpAddParam() {
        this.props.history.push(`/${this.state.system}/home/param/add`);
    }

    searchClick() {

        const value = this.props.search_value;
        const pageindex = this.props.pageindex - 1;
        const pagesize = this.props.pagesize;
        this.props.updateParams(value, pageindex, pagesize);
    }

}
const mapStateToProps = (state) => {
    return {
        search_type: state.param_header.search_type,
        search_value: state.param_header.search_value,
        pageindex: state.param_header.pageindex,
        pagesize: state.param_header.pagesize,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateParams(value, pageindex, pagesize) {
            //显示加载
            dispatch(tableCtors.getLoadingAction(true));
            //触发搜索
            dispatch(paramCtors.getDoSearchParamAction(value, pageindex, pagesize));

        },
        showAddParam() {
            dispatch(paramModalCtors.getAddAction());
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TemHeader));