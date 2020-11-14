import React, { Component, Fragment } from 'react';
import { Input, Button, Select } from 'antd';
import { connect } from 'react-redux';
import * as collectModalCtors from '../EditCollectModal/store/actionCreators';
import * as headerCtors from '../CollectHeader/store/actionCreators';
import * as tableCtors from '../CollectTable/store/actionCreators';
import * as collectCtors from '../store/actionCreators';
import * as importModalCtors from '../ImportCollectsModal/store/actionCreators';
import * as session from '../../../../utils/Session';
import { AdminType } from '../../../../utils/enum';
import intl from 'react-intl-universal';
import './style.css';

const { Option } = Select;
const actType = session.getLoginVertificate().Type;
class CollectHeader extends Component {
    constructor(props) {
        super(props);
        this.searchClick = this.searchClick.bind(this);
    }

    render() {

        return (
            <div className="syspre_collect_header_root">
                <Select
                    className="syspre_collect_header_state"
                    defaultValue='1'
                    onChange={this.props.changeSearchType}
                    value={this.props.search_type}
                >
                    <Option value="1">名称</Option>
                    <Option value="2">编号</Option>
                </Select>
                <Input className="syspre_collect_header_input_search"
                    placeholder={intl.get('COMMON_IPT.SEARCH_IPT')}
                    value={this.props.search_value}
                    onChange={this.props.changeSearchValue}
                />
                <Button className="syspre_collect_header_btn_search" type="primary" icon="search" onClick={this.searchClick}>{intl.get('COMMON_BTN.SEARCH')}</Button>
                {actType === AdminType.SUPER_ADMIN ?
                    <Fragment>
                        <Button className="syspre_collect_header_btn_search" type="primary" icon="edit" onClick={() => { this.props.showAddCollect() }}>{intl.get('COMMON_BTN.ADD')}</Button>
                        <Button className="syspre_meter_header_btn_search" type="primary" icon="upload" onClick={() => this.props.showImport()}>{intl.get('COMMON_BTN.BATCH_IMPORT')}</Button>
                    </Fragment>
                    : ''
                }
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
            this.props.updateCollects(type, value, pageindex, pagesize);
        }
    }

    searchClick() {
        const type = this.props.search_type;
        const value = this.props.search_value;
        const pageindex = this.props.pageindex - 1;
        const pagesize = this.props.pagesize;
        this.props.updateCollects(type, value, pageindex, pagesize);
    }
}

const mapStateToProps = (state) => {
    return {
        search_type: state.collect_header.search_type,
        search_value: state.collect_header.search_value,
        pageindex: state.collect_header.pageindex,
        pagesize: state.collect_header.pagesize,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCollects(type, value, pageindex, pagesize) {
            dispatch(tableCtors.getLoadingAction(true));

            dispatch(collectCtors.getDoSearchCollectAction(type, value, pageindex, pagesize));
        },
        showImport() {
            dispatch(importModalCtors.getImportVisibleAction(true));
        },
        showAddCollect() {

            dispatch(collectModalCtors.getAddAction());
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

export default connect(mapStateToProps, mapDispatchToProps)(CollectHeader);