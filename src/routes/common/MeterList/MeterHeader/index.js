import React, { Component, Fragment } from 'react';
import { Input, Button, Select } from 'antd';
import { connect } from 'react-redux';
import * as headerCtors from '../MeterHeader/store/actionCreators';
import * as meterModalCtors from '../EditMeterModal/store/actionCreators';
import * as importModalCtors from '../ImportMetersModal/store/actionCreators';
import * as tableCtors from '../MeterTable/store/actionCreators';
import * as meterCtors from '../store/actionCreators';
import { searchGroups, searchAdmins } from '../../../../utils/api';
import { AdminType } from '../../../../utils/enum';
import * as session from '../../../../utils/Session';
import intl from 'react-intl-universal';
import './style.css';

const actType = session.getLoginVertificate().Type;

const { Option } = Select;
class MeterHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gpsearch: [],
            admsearch: [],
            selectload: false,
        }
        this.searchClick = this.searchClick.bind(this);
        this.loading = this.loading.bind(this);
    }


    render() {
        const options = this.state.gpsearch.map(item => <Option key={item.key} value={item.key}>{item.Name}</Option>);
        const admoptions = this.state.admsearch.map(item => <Option key={item.key} value={item.key}>{item.Usnam}</Option>);
        return (
            <div className="syspre_meter_header_root">
                <Select
                    className="syspre_meter_header_state"
                    defaultValue='1'
                    onChange={this.props.changeSearchType}
                    value={this.props.search_type}
                >
                    <Option value="1">名称</Option>
                    <Option value="2">编号</Option>
                </Select>
                <Input className="syspre_meter_header_input_search"
                    placeholder={intl.get('COMMON_IPT.SEARCH_IPT')}
                    value={this.props.search_value}
                    onChange={this.props.changeSearchValue}
                />
                <Select placeholder="是否在线"
                    className="syspre_meter_header_state"
                    value={this.props.search_olstt}
                    onChange={this.props.changeSearchOlstt}
                >
                    <Option key={0} value={0}>全部状态</Option>
                    <Option key={1} value={1}>在线</Option>
                    <Option key={2} value={2}>离线</Option>
                </Select>
                {actType === AdminType.AGENT_ADMIN ?
                    <Select placeholder="分组搜索"
                        className="syspre_meter_header_state"
                        onFocus={() => this.requestGroup()}
                        onChange={this.props.changeSearchGroupid}
                        value={this.props.search_groupid}
                    >
                        <Option key={0} value={0}>全部分组</Option>
                        {options}
                    </Select>
                    : ''
                }
                {actType === AdminType.AGENT_ADMIN ?
                    <Select placeholder="管理员搜索"
                        className="syspre_meter_header_state"
                        onFocus={() => this.requestAdmin()}
                        onChange={this.props.changeSearchAdmid}
                        value={this.props.search_admid}
                    >
                        <Option key={0} value={''}>全部管理员</Option>
                        {admoptions}
                    </Select>
                    : ''
                }
                <Button className="syspre_meter_header_btn_search" type="primary" icon="search" onClick={this.searchClick}>{intl.get('COMMON_BTN.SEARCH')}</Button>
                {actType === AdminType.SUPER_ADMIN ?
                    <Fragment>
                        <Button className="syspre_meter_header_btn_search" type="primary" icon="edit" onClick={() => this.props.showAddMeter()}>{intl.get('COMMON_BTN.ADD')}</Button>
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
            const olstt = this.props.search_olstt;
            const pageindex = nextProps.pageindex - 1;
            const pagesize = nextProps.pagesize;
            const key = '';
            const gpid = nextProps.search_groupid;
            const admid = nextProps.search_admid;
            this.props.updateMeters(type, value, pageindex, pagesize, key, gpid, olstt, admid);
        }

    }

    searchClick() {
        const type = this.props.search_type;
        const value = this.props.search_value;
        const olstt = this.props.search_olstt;
        const pageindex = this.props.pageindex - 1;
        const pagesize = this.props.pagesize;
        const gpid = this.props.search_groupid;
        const key = '';
        const admid = this.props.search_admid;
        this.props.updateMeters(type, value, pageindex, pagesize, key, gpid, olstt, admid);
    }

    requestGroup() {
        searchGroups('', 0, 20,
            (res) => {
                if (res.data.Status === 0) {
                    this.setState({
                        gpsearch: res.data.Data.Objs,
                    });
                } else {

                }
            },
            () => {

            });
    }

    requestAdmin() {
        searchAdmins(1, '', 4, 0, 20,
            (res) => {
                if (res.data.Status === 0) {
                    this.setState({
                        admsearch: res.data.Data.Objs
                    });
                } else {

                }
            },
            () => {

            });
    }

    loading(value) {
        this.setState({
            selectload: value,
        })
    }
}

const mapStateToProps = (state) => {
    return {
        search_type: state.meter_header.search_type,
        search_value: state.meter_header.search_value,
        search_groupid: state.meter_header.search_groupid,
        search_olstt: state.meter_header.search_olstt,
        search_admid: state.meter_header.search_admid,
        pageindex: state.meter_header.pageindex,
        pagesize: state.meter_header.pagesize,
        selectedRowKeys: state.meter_table.selectedRowKeys,
        batch: state.meter_table.batch,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateMeters(type, value, pageindex, pagesize, key, gpid, olstt, admid) {
            dispatch(tableCtors.getLoadingAction(true));
            dispatch(meterCtors.getDoSearchMeterAction(type, value, pageindex, pagesize, key, gpid, olstt, admid));
        },

        showImport() {
            dispatch(importModalCtors.getImportVisibleAction(true));
        },

        showAddMeter() {

            dispatch(meterModalCtors.getAddAction());
        },
        changeSearchType(value) {
            dispatch(headerCtors.getChangeTypeAction(value));
        },
        changeSearchGroupid(value) {
            dispatch(headerCtors.getChangeGroupidAction(value));
        },
        changeSearchOlstt(value) {
            dispatch(headerCtors.getChangeOlsttAction(value));
        },
        changeSearchAdmid(value) {
            dispatch(headerCtors.getChangeAdminAction(value));
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

export default connect(mapStateToProps, mapDispatchToProps)(MeterHeader);