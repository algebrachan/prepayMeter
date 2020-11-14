import React, { Component } from 'react';
import { Input, Button, Select } from 'antd';
import { connect } from 'react-redux';
import * as headerCtors from './store/actionCreators';
import * as switchModalCtors from '../EditSwitchModal/store/actionCreators';
import * as tableCtors from '../SwitchTable/store/actionCreators';
import * as switchCtors from '../store/actionCreators';
import intl from 'react-intl-universal';
import './style.css';



const { Option } = Select;
class SwitchHeader extends Component {
    constructor(props) {
        super(props);
        this.searchClick = this.searchClick.bind(this);
    }


    render() {

        return (
            <div className="sysswh_switch_header_root">
                <Select placeholder="搜索类型"
                    className="sysswh_switch_header_state"
                    defaultValue='1'
                    onChange={this.props.changeSearchType}
                    value={this.props.search_type}
                >
                    <Option value="1">名称</Option>
                    <Option value="2">编号</Option>
                </Select>
                <Input className="sysswh_switch_header_input_search"
                    placeholder={intl.get('COMMON_IPT.SEARCH_IPT')}
                    value={this.props.search_value}
                    onChange={this.props.changeSearchValue}
                />
                <Button className="sysswh_switch_header_btn_search" type="primary" icon="search" onClick={this.searchClick}>{intl.get('COMMON_BTN.SEARCH')}</Button>
                <Button className="sysswh_switch_header_btn_search" type="primary" icon="edit" onClick={() => { this.props.showAddSwitch() }}>{intl.get('COMMON_BTN.ADD')}</Button>
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
            this.props.updateSwitchs(type, value, pageindex, pagesize);
        }
    }

    searchClick() {
        const type = this.props.search_type;
        const value = this.props.search_value;
        const pageindex = this.props.pageindex - 1;
        const pagesize = this.props.pagesize;
        this.props.updateSwitchs(type, value, pageindex, pagesize);
    }

}

const mapStateToProps = (state) => {
    return {
        search_type: state.switch_header.search_type,
        search_value: state.switch_header.search_value,
        pageindex: state.switch_header.pageindex,
        pagesize: state.switch_header.pagesize,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        updateSwitchs(type, value, pageindex, pagesize) {
            dispatch(tableCtors.getLoadingAction(true));
            dispatch(switchCtors.getDoSearchMeterAction(type, value, pageindex, pagesize));
        },
        showAddSwitch() {

            dispatch(switchModalCtors.getAddAction());
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

export default connect(mapStateToProps, mapDispatchToProps)(SwitchHeader);