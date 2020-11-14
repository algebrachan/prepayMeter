import React, { Component } from 'react';
import { Button, Select, Input } from 'antd';
import { connect } from 'react-redux';
import * as agentModalCtors from '../EditAgentModal/store/actionCreators';
import * as headerCtors from './store/actionCreators';
import * as tableCtors from '../AgentTable/store/actionCreators';
import * as agentCtors from '../store/actionCreators';
import intl from 'react-intl-universal';
import './style.css';
const { Option } = Select;
class AgentHeader extends Component {
    constructor(props) {
        super(props);
        this.searchClick = this.searchClick.bind(this);
    }

    render() {

        return (
            <div className="syspre_agent_header_root">
                <Select
                    className="syspre_agent_header_state"
                    defaultValue='1'
                    onChange={this.props.changeSearchType}
                    value={this.props.search_type}
                >
                    <Option value="1">{intl.get('AGENT_LIST.HEADER.NAME')}</Option>
                    <Option value="2">{intl.get('AGENT_LIST.HEADER.NUMBER')}</Option>
                    <Option value="3">{intl.get('AGENT_LIST.HEADER.PHONE')}</Option>

                </Select>
                <Input className="syspre_agent_header_input_search"
                    placeholder={intl.get('COMMON_IPT.SEARCH_IPT')}
                    value={this.props.search_value}
                    onChange={this.props.changeSearchValue}
                />
                <Button className="syspre_agent_header_btn_search" type="primary" icon="search" onClick={this.searchClick}>{intl.get('COMMON_BTN.SEARCH')}</Button>
                <Button className="syspre_agent_header_btn_search" type="primary" icon="edit" onClick={() => { this.props.showAddAgent() }}>{intl.get('COMMON_BTN.ADD')}</Button>
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
            this.props.updateAgents(type, value, pageindex, pagesize);
        }
    }




    searchClick() {
        const type = this.props.search_type;
        const value = this.props.search_value;
        const pageindex = this.props.pageindex - 1;
        const pagesize = this.props.pagesize;
        this.props.updateAgents(type, value, pageindex, pagesize);
    }

}
const mapStateToProps = (state) => {
    return {
        search_type: state.agent_header.search_type,
        search_value: state.agent_header.search_value,
        pageindex: state.agent_header.pageindex,
        pagesize: state.agent_header.pagesize,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateAgents(type, value, pageindex, pagesize) {
            //显示加载
            dispatch(tableCtors.getLoadingAction(true));
            //触发搜索
            dispatch(agentCtors.getDoSearchAgentAction(type, value, pageindex, pagesize));

        },
        showAddAgent() {
            dispatch(agentModalCtors.getAddAction());
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

export default connect(mapStateToProps, mapDispatchToProps)(AgentHeader);