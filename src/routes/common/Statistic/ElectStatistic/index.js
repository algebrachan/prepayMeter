import React, { Component } from 'react';
import { Spin, Button, Table, Card, DatePicker, Select, message, Statistic, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { getAgentMeterEnergyStic } from '../../../../utils/api';
import * as rechargeCtors from './store/actionCreators';
import { exportExcel } from '../../../../utils/excelUtils';
import { getUtcString } from '../../../../utils/string';
import intl from 'react-intl-universal';
import './style.css';
const { MonthPicker, RangePicker } = DatePicker;
const { Option } = Select;

let y = [];
const time = new Date();
for (let i = 2020; i <= time.getFullYear(); i++) {
    y = [...y, { year: i }];
}

const initColumn = [
    {
        title: '设备编号',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: '电表名称',
        dataIndex: 'Usnam',
        key: 'Usnam'
    },
    {
        title: '电量/(度)',
        dataIndex: 'Dt',
        key: 'Dt',
    },
]
class ElectStatistic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 'm',
            year: 0,
            month: 0,
            day: 0,
            eday: 0,
            rangedate: [],
            btnload: false,
        }
        this.initDate = this.initDate.bind(this);
    }
    render() {
        const columns = this.initColumns();
        return (
            <div className="statistic_elect_root">
                <Spin spinning={this.props.loading}>
                    <div>
                        <Select className="statistic_elect_header"
                            placeholder='选择显示方式'
                            onChange={(value) => this.changeDateType(value)}
                            value={this.state.type}>
                            {/* <Select.Option value='d'>日统计</Select.Option> */}
                            <Select.Option value='m'>月统计</Select.Option>
                            <Select.Option value='y'>年统计</Select.Option>
                            <Select.Option value='diy'>自定义统计</Select.Option>
                        </Select>
                        {this.getDatePicker()}
                        <Button style={{ marginLeft: 20 }} type='primary' icon="search" onClick={() => this.requestData()}>{intl.get('COMMON_BTN.SEARCH')}</Button>
                        <Button style={{ marginLeft: 20 }} type='primary' icon="download" onClick={() => this.exportData()} loading={this.state.btnload}>{intl.get('COMMON_BTN.OUTPUT')}</Button>
                        <Statistic
                            className="statistic_elect_statistics"
                            title="总计"
                            value={this.props.sticeng}
                            precision={5}
                            valueStyle={{ color: '#cf1322' }}
                            suffix="度"
                        />
                    </div>
                    <Table
                        style={{ marginTop: 10 }}
                        columns={columns}
                        dataSource={this.props.electstatistic}
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
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.pageindex !== nextProps.pageindex || this.props.pagesize !== nextProps.pagesize) {
            let pageIndex = nextProps.pageindex - 1;
            let pageSize = nextProps.pagesize;
            let year = this.state.year;
            let day = this.state.day;
            let month = this.state.month;
            const param = {
                Mac: '',
                Agtid: '',
                Sys: '',
                Year: year,
                Month: month,
                Day: day,
                Desc: true,
                PageIndex: pageIndex,
                PageSize: pageSize,
            }

            this.search(param);

        }

    }
    requestData() {
        let pageIndex = this.props.pageindex - 1;
        let pageSize = this.props.pagesize;
        let year = this.state.year;
        let day = this.state.day;
        let eday = this.state.eday;
        let month = this.state.month;
        if (year === 0) {
            message.info('请选择时间');
            return;
        }
        const param = {
            Mac: '',
            Agtid: '',
            Sys: '',
            Year: year,
            Month: month,
            Day: day,
            Eday: eday,
            Desc: true,
            PageIndex: pageIndex,
            PageSize: pageSize,
        }
        this.search(param);
    }

    exportData() {
        let pageIndex = 0;
        let pageSize = 0;
        let year = this.state.year;
        let day = this.state.day;
        let eday = this.state.eday;
        let month = this.state.month;
        if (year === 0) {
            message.info('请选择时间');
            return;
        }
        const param = {
            Mac: '',
            Agtid: '',
            Sys: '',
            Year: year,
            Month: month,
            Day: day,
            Eday: eday,
            Desc: true,
            PageIndex: pageIndex,
            PageSize: pageSize,
        }
        this.export(param);
    }
    search(param) {
        this.props.setLoading(true);
        getAgentMeterEnergyStic(param,
            (res) => {
                if (res.data && (res.data.Status === 0 || res.data.Status === 1)) {
                    let list = res.data.Status === 0 ? res.data.Data.Objs : [];
                    let total = res.data.Status === 0 ? res.data.Data.Total : 0;
                    let sticeng = res.data.Status === 0 ? res.data.Data.Stictotal : 0;
                    this.props.update(list, total, sticeng);
                }
                else {
                    message.error(res.data.Message);
                    this.props.update([], 0, 0);
                    this.props.setLoading(false);
                }

            },
            () => {
                this.props.setLoading(false);
            }
        );
    }

    export(param) {
        this.onChangeBtnLoad(true);
        getAgentMeterEnergyStic(param,
            (res) => {
                this.onChangeBtnLoad(false);
                if (res.data && res.data.Status === 0) {
                    let list = res.data.Data.Objs;
                    list = [...list, { key: "总计", Usnam: "", Dt: res.data.Data.Stictotal }];
                    exportExcel(initColumn, list, getUtcString() + ".xlsx");
                }
                else {
                    message.error(res.data.Message);
                }
            },
            () => {
                this.onChangeBtnLoad(false);
            }
        );
    }

    onChangeBtnLoad(value) {
        this.setState({
            btnload: value,
        });
    }
    changeDateType(value) {
        this.setState({
            type: value,
        });
        this.initDate();
    }
    getDatePicker() {
        if (this.state.type === 'd') {
            return (<DatePicker className="statistic_elect_header"
                onChange={(date, dateStr) => this.onChangeDate(date, dateStr)}
            />);
        }
        if (this.state.type === 'm') {
            return (<MonthPicker className="statistic_elect_header"
                onChange={(date, dateStr) => this.onChangeMonth(date, dateStr)}
                placeholder='请选择月份' />);
        }
        if (this.state.type === 'y') {
            return (
                <Select className="statistic_elect_header"
                    placeholder='请选择年份'
                    onChange={(value) => this.changeYear(value)}
                >
                    {y.map((item) => {
                        return (<Select.Option value={item.year} key={item.year}>{item.year}</Select.Option>)
                    })}
                </Select>
            );
        }
        if (this.state.type === "diy") {
            return (
                <RangePicker className="statistic_elect_range_date_header"
                    onChange={(date, dateString) => this.onChangeRangeDate(date, dateString)}
                    value={this.state.rangedate}
                />
            );
        }
    }

    //change时间 str
    changeYear(value) {
        this.setState({
            year: value,
            month: 0,
            day: 0,
        });
    }
    onChangeDate(date, dateStr) {
        if (dateStr.length == 0) {
            this.initDate();
            return;
        }
        const arr = dateStr.split('-');
        this.setState({
            year: parseInt(arr[0]),
            month: parseInt(arr[1]),
            day: parseInt(arr[2]),
        });
    }

    onChangeRangeDate(date, dateStr) {
        if (dateStr[0].length === 0 || dateStr[1].length === 0) {
            this.initDate();
            this.setState({
                rangedate: [],
            })
            return;
        }
        let start = dateStr[0];
        let end = dateStr[1];
        let starty = start.split('-')[0];
        let startm = start.split('-')[1];
        let startd = start.split('-')[2];
        let endy = end.split('-')[0];
        let endm = end.split('-')[1];
        let endd = end.split('-')[2];

        if (starty == endy && startm == endm) {
            this.setState({
                rangedate: date,
                year: parseInt(starty),
                month: parseInt(startm),
                day: parseInt(startd),
                eday: parseInt(endd),
            });
            return;
        } else {
            message.warning("请选择同一月份");
            this.setState({
                rangedate: [],
            })
            return;
        }
    }

    checkRangeDate(startStr, endStr) {
        let starty = startStr.split('-')[0];
        let startm = startStr.split('-')[1];
        let endy = endStr.split('-')[0];
        let endm = endStr.split('-')[1];
        if (starty == endy && startm == endm) {
            return true;
        } else {
            return false;
        }
    }

    onChangeMonth(date, dateStr) {
        if (dateStr.length == 0) {
            this.initDate();
            return;
        }
        const arr = dateStr.split('-');
        this.setState({
            year: parseInt(arr[0]),
            month: parseInt(arr[1]),
            day: 0,
        });
    }

    initDate() {
        this.setState({
            year: 0,
            month: 0,
            day: 0,
            eday: 0,
        });
    }
    initColumns() {
        const columns = [
            {
                title: '设备编号',
                dataIndex: 'key',
                align: 'center',
                key: 'key',

            },
            {
                title: '电表名称',
                dataIndex: 'Usnam',
                align: 'center',
                key: 'Usnam'
            },
            {
                title: '电量/(度)',
                dataIndex: 'Dt',
                align: 'center',
                key: 'Dt',
                // render: Dt => {
                //     return (
                //         Dt / 1000000
                //     );
                // }
            },
        ];

        return columns;
    }

}
const mapStateToProps = (state) => {
    return {
        electstatistic: state.userinfo_electstatistic.electstatistic,
        loading: state.userinfo_electstatistic.loading,
        total: state.userinfo_electstatistic.total,
        sticeng: state.userinfo_electstatistic.sticeng,
        pageindex: state.userinfo_electstatistic.pageindex,
        pagesize: state.userinfo_electstatistic.pagesize,



    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setLoading(show) {
            dispatch(rechargeCtors.getLoadingAction(show));
        },
        update(list, total, sticeng) {
            dispatch(rechargeCtors.getUpdateAction(list, total, sticeng))
        },
        changePagination(pageindex, pagesize) {
            dispatch(rechargeCtors.getChangePaginationAction(pageindex, pagesize))
        }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ElectStatistic));