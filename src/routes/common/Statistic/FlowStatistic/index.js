import React, { Component, Fragment } from 'react';
import { Table, Button, Spin, Tag, Typography, DatePicker, Select, message, Input } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import * as rechargeCtors from './store/actionCreators';
import { searchTransactionLogs } from '../../../../utils/api';
import { getNextMonthUtc } from '../../../../utils/math';
import { exportExcel } from '../../../../utils/excelUtils';
import { getUtcString } from '../../../../utils/string';
import intl from 'react-intl-universal';
import PreViewStic from './PreViewStic';
import './style.css'

const { RangePicker } = DatePicker;
const { Option } = Select;

const initColumn = [
    {
        title: '流水号',
        key: 'key',
    },
    {
        title: '交易时间',
        key: 'UtcStr',
    },
    {
        title: '金额(元)',
        key: 'Cny',
    },
    {
        title: '商品ID',
        key: 'Target',
    },
    {
        title: '商品名称',
        key: 'Meternam',
    },
    {
        title: '交易方式(1:微信,2:支付宝,3:现金)',
        key: 'Pwy',
    },
    {
        title: '收支(in:收入,out:支出)',
        key: 'Dir',
    },
    {
        title: '第三方平台交易单号',
        key: 'Evid',
    },
];

class FlowStatistic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preViewData: {},
            preViewShow: false,
            btnload: false,
        }
        this.requestData = this.requestData.bind(this);
    }
    render() {
        const columns = this.initColumns();
        return (
            <div className="statistic_flow_root">
                <Spin spinning={this.props.loading}>
                    <div>
                        <Select value={this.props.type} onChange={(value) => this.props.changeType(value)} placeholder="请输入搜索方式" style={{ width: 120 }}>
                            <Option value={4}>商品ID</Option>
                        </Select>
                        <Input
                            placeholder={intl.get('COMMON_IPT.SEARCH_IPT')}
                            value={this.props.search_value}
                            onChange={this.props.changeSearchValue}
                            style={{ width: 200, marginLeft: 10 }}
                        />
                        <RangePicker onChange={(date, dateString) => this.onChangeRangeDate(date, dateString)} placeholder="请选择日期" style={{ marginLeft: 10 }} />
                        <Select value={this.props.pwy} onChange={(value) => this.props.changePwy(value)} placeholder="请选择入账方式" style={{ width: 120, marginLeft: 10 }}>
                            <Option value={0}>入账方式</Option>
                            <Option value={1}>微信</Option>
                            <Option value={2}>支付宝</Option>
                            <Option value={3}>现金</Option>
                        </Select>
                        <Select value={this.props.dir} onChange={(value) => this.props.changeDir(value)} placeholder="请选择收支形式" style={{ width: 120, marginLeft: 10 }}>
                            <Option value="">收支形式</Option>
                            <Option value="in">收入</Option>
                            <Option value="out">支出</Option>
                        </Select>
                        <Button style={{ marginLeft: 20 }} type='primary' icon="search" onClick={() => this.requestData()}>{intl.get('COMMON_BTN.SEARCH')}</Button>
                        <Button style={{ marginLeft: 20 }} type='primary' icon="download" onClick={() => this.exportData()} loading={this.state.btnload}>{intl.get('COMMON_BTN.OUTPUT')}</Button>
                    </div>
                    <Table
                        style={{ marginTop: 10 }}
                        columns={columns}
                        dataSource={this.props.flowstatistic}
                        bordered
                        showHeader
                        pagination={{
                            onShowSizeChange: this.props.changePagination,
                            onChange: this.props.changePagination,
                            current: this.props.pageindex,
                            pageSize: this.props.pagesize,
                            position: 'bottom',
                            showTotal: total => `${intl.get('COMMON.TOTAL')} ${total} ${intl.get('COMMON.ITME')}`,
                            total: this.props.total,
                            showSizeChanger: true,
                            pageSizeOptions: ["5", "10", "20", "50", "100"]
                        }}
                    />
                </Spin>
                <PreViewStic data={this.state.preViewData} show={this.state.preViewShow} hide={() => this.showPreView(false)} />
            </div>
        )
    }
    showPreView(value) {
        this.setState({
            preViewShow: value,
        })
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.pageindex !== nextProps.pageindex || this.props.pagesize !== nextProps.pagesize) {
            const keyid = this.state.keyid;
            const start = nextProps.start;
            const end = nextProps.end;
            const pwy = nextProps.pwy;
            const pageIndex = nextProps.pageindex - 1;
            const pageSize = nextProps.pagesize;
            const dir = nextProps.dir;
            const desc = true;
            const param = {
                Mac: '',
                Agtid: '',
                Sys: 0,
                Pwy: pwy,
                Keyid: keyid,
                Start: start,
                End: end,
                PageIndex: pageIndex,
                PageSize: pageSize,
                Desc: desc,
                Dir: dir,
            };

            this.search(param);

        }

    }

    componentDidMount() {

        this.requestData();
    }

    onChangeRangeDate(date, dateStr) {
        let start = 0;
        let end = 0;
        if (dateStr[0].length !== 0 && dateStr[1].length !== 0) {
            start = moment(dateStr[0]).valueOf();
            end = moment(dateStr[1]).valueOf() + 86400000;
        }
        this.props.changeTime(start, end);
    }

    onChangeMonth(date, dateString) {
        let start = 0;
        let end = 0;
        if (dateString.length !== 0) {
            start = moment(dateString).valueOf();
            end = getNextMonthUtc(dateString);
        }
        this.props.changeTime(start, end);
    }

    requestData() {

        const keyid = 0;
        const start = this.props.start;
        const end = this.props.end;
        const pwy = this.props.pwy;
        const pageIndex = this.props.pageindex - 1;
        const pageSize = this.props.pagesize;
        const dir = this.props.dir;
        const desc = true;
        const type = this.props.type;
        const value = this.props.search_value;
        const param = {
            Mac: '',
            Agtid: '',
            Sys: 0,
            Pwy: pwy,
            Keyid: keyid,
            Start: start,
            End: end,
            PageIndex: pageIndex,
            PageSize: pageSize,
            Desc: desc,
            Dir: dir,
            Type: type,
            Value: value,
        }
        this.search(param);
    }
    search(param) {
        this.props.setLoading(true);
        searchTransactionLogs(param,
            (res) => {
                if (res.data && res.data.Status === 0) {
                    let list = res.data.Data.Objs;
                    let total = res.data.Data.Total;
                    message.success(`${intl.get('COMMON_MESSAGE.RST_SUCS')}`);
                    this.props.update(list, total);
                }
                else if (res.data && res.data.Status === 1) {
                    message.info('没有数据');
                    this.props.update([], 0);
                }
                else {
                    message.error(res.data.Message);
                    this.props.setLoading(false);
                }
            },
            () => {
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
                this.props.setLoading(false);
            }
        );
    }

    exportData() {
        const keyid = 0;
        const start = this.props.start;
        const end = this.props.end;
        const pwy = this.props.pwy;
        const pageIndex = 0;
        const pageSize = 0;
        const dir = this.props.dir;
        const desc = true;
        const type = this.props.type;
        const value = this.props.search_value;
        const param = {
            Mac: '',
            Agtid: '',
            Sys: 0,
            Pwy: pwy,
            Keyid: keyid,
            Start: start,
            End: end,
            PageIndex: pageIndex,
            PageSize: pageSize,
            Desc: desc,
            Dir: dir,
            Type: type,
            Value: value,
        }
        this.export(param);
    }
    export(param) {
        this.onChangeBtnLoad(true);
        searchTransactionLogs(param,
            (res) => {
                this.onChangeBtnLoad(false);
                if (res.data && res.data.Status === 0) {
                    let list = res.data.Data.Objs;
                    exportExcel(initColumn, list, getUtcString() + ".xlsx");
                }
                else {
                    message.error(res.data.Message);
                }

            },
            () => {
                this.onChangeBtnLoad(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
                this.props.setLoading(false);
            }
        );
    }
    initColumns() {
        const columns = [
            {
                title: '流水号',
                dataIndex: 'key',
                align: 'center',
                key: 'key',
                width: 200,
            },
            {
                title: '交易时间',
                dataIndex: 'UtcStr',
                align: 'center',
                key: 'UtcStr',
                width: 200,
            },
            {
                title: '金额(元)',
                dataIndex: 'Cny',
                align: 'right',
                key: 'Cny',
                width: 100,
                render: Cny => {
                    return (<Typography.Text style={{ color: '#d86c14' }}>{Cny}</Typography.Text>);
                }
            },
            {
                title: '交易说明',
                dataIndex: 'Fwt',
                align: 'center',
                key: 'Fwt',
                width: 200,
                render: Fwt => {
                    switch (Fwt) {
                        case 1:
                            return "电表充值";
                        case 101:
                            return "电费结算";
                    }
                }
            },
            {
                title: '商品ID',
                dataIndex: 'Target',
                align: 'center',
                key: 'Target',
                width: 200,
            },
            {
                title: '商品名称',
                dataIndex: 'Meternam',
                align: 'center',
                key: 'Meternam',
            },
            {
                title: '交易方式',
                dataIndex: 'Pwy',
                align: 'center',
                key: 'Pwy',
                width: 120,
                render: Pwy => {
                    switch (Pwy) {
                        case 1:
                            return (<Tag color="green">微信</Tag>);
                        case 2:
                            return (<Tag color="blue">支付宝</Tag>);
                        case 3:
                            return (<Tag color="orange">现金</Tag>);
                    }
                }
            },
            {
                title: '收支',
                dataIndex: 'Dir',
                align: 'center',
                key: 'Dir',
                width: 120,
                render: Dir => {
                    switch (Dir) {
                        case "in":
                            return (<Tag color="red">收入</Tag>);
                        case "out":
                            return (<Tag color="green">支出</Tag>);
                        default:
                            return "";
                    }
                }
            },
            // {
            //     title: '第三方平台交易单号',
            //     dataIndex: 'Evid',
            //     align: 'center',
            //     key: 'Evid',
            // },
            {
                title: '操作',
                align: 'center',
                key: 'action',
                render: (item) =>
                    (
                        <Fragment>
                            <Button style={{ fontSize: '10px' }} type='primary' onClick={() => { this.onPreView(item.key) }}>{intl.get('COMMON_BTN.PREVIEW')}</Button>
                        </Fragment>
                    ),
            }
        ];
        return columns;
    }
    onPreView(key) {
        let order = this.props.flowstatistic.find(item => item.key === key);
        if (order) {
            this.setState({
                preViewData: order,
            });
        }
        this.showPreView(true);
    }
    onChangeBtnLoad(value) {
        this.setState({
            btnload: value,
        });
    }

}
const mapStateToProps = (state) => {
    return {
        flowstatistic: state.userinfo_flowstatistic.flowstatistic,
        loading: state.userinfo_flowstatistic.loading,
        total: state.userinfo_flowstatistic.total,
        pageindex: state.userinfo_flowstatistic.pageindex,
        pagesize: state.userinfo_flowstatistic.pagesize,
        start: state.userinfo_flowstatistic.start,
        end: state.userinfo_flowstatistic.end,
        pwy: state.userinfo_flowstatistic.pwy,
        dir: state.userinfo_flowstatistic.dir,
        type: state.userinfo_flowstatistic.type,
        search_value: state.userinfo_flowstatistic.value,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setLoading(show) {
            dispatch(rechargeCtors.getLoadingAction(show));
        },
        update(list, total) {
            dispatch(rechargeCtors.getUpdateAction(list, total))
        },
        changePagination(pageindex, pagesize) {
            dispatch(rechargeCtors.getChangePaginationAction(pageindex, pagesize))
        },
        changeTime(start, end) {
            dispatch(rechargeCtors.getChangeTimeAction(start, end))
        },
        changePwy(pwy) {
            dispatch(rechargeCtors.getChangePwyAction(pwy))
        },
        changeDir(dir) {
            dispatch(rechargeCtors.getChangeDirAction(dir))
        },
        changeType(value) {
            dispatch(rechargeCtors.getChangeTypeAction(value))
        },
        changeSearchValue(e) {
            dispatch(rechargeCtors.getChangeValueAction(e.target.value))
        }
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FlowStatistic));