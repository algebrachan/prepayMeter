import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { DatePicker, Select, Spin, Button, message } from 'antd';
import moment from 'moment';
import ChartPower from './ChartPower';
import ChartCurrent from './ChartCurrent';
import ChartVoltage from './ChartVoltage';
import { searchMeterDatas } from '../../../../utils/api';
import intl from 'react-intl-universal';
import './style.css';


const { MonthPicker } = DatePicker;
let y = [];
for (let i = 2030; i >= 2010; i--) {
    y = [...y, { year: i }];
}

class Record extends Component {

    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const keyid = arr[arr.length - 1];
        this.state = {
            keyid: keyid,
            dateType: 'd',
            type: 'i',
            year: '',
            month: '',
            day: '',
            loading: false,
            list: [],
            total: 0,
            start: 0,
            end: 0,
        }
        this.loading = this.loading.bind(this);
        this.searchData = this.searchData.bind(this);
    }



    render() {
        return (
            <div style={{ margin: 20 }}>
                <Spin spinning={this.state.loading}>
                    <div>
                        <Select className="meter_info_record_header"
                            placeholder='选择显示方式'
                            onChange={(value) => this.changeDateType(value)}
                            value={this.state.dateType}>
                            <Select.Option value='d'>日统计</Select.Option>
                            <Select.Option value='m'>最近一个月统计</Select.Option>

                        </Select>
                        {this.getDatePicker()}
                        <Button type='primary' style={{ marginLeft: 10 }}
                            onClick={() => this.searchData()}
                        >{intl.get('COMMON_BTN.SEARCH')}</Button>
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <Select className="meter_info_record_header"
                            placeholder='选择数据类型'
                            onChange={(value) => this.changeDataType(value)}
                            value={this.state.type}>
                            <Select.Option value='p'>功率</Select.Option>
                            <Select.Option value='i'>电流</Select.Option>
                            <Select.Option value='u'>电压</Select.Option>
                        </Select>
                    </div>
                </Spin>
                <div style={{ marginTop: 20 }}>
                    {this.getChart()}
                </div>
            </div>
        );

    }

    getChart() {
        if (this.state.type === 'p') {
            return (<ChartPower data={this.state.list} type={this.state.dateType} />);
        }
        if (this.state.type === 'i') {
            return (<ChartCurrent data={this.state.list} type={this.state.dateType} />);
        }
        if (this.state.type === 'u') {
            return (<ChartVoltage data={this.state.list} type={this.state.dateType} />);
        }
    }

    getDatePicker() {
        if (this.state.dateType === 'd') {
            return (<DatePicker className="meter_info_record_header"
                onChange={(date, dateStr) => this.onChangeDate(date, dateStr)}
            />);
        }
        // if (this.state.dateType === 'm') {
        //     return (<MonthPicker className="meter_info_record_header"
        //         onChange={(date, dateStr) => this.onChangeMonth(date, dateStr)} />);
        // }
        // if (this.state.dateType === 'y') {
        //     return (
        //         <Select className="meter_info_record_header"
        //             placeholder='请选择年份'
        //             onChange={(value) => this.changeYear(value)}
        //             value={this.state.year}>
        //             {y.map((item) => {
        //                 return (<Select.Option value={'' + item.year}>{item.year}</Select.Option>)
        //             })}
        //         </Select>
        //     );
        // }
    }

    changeDataType(value) {
        this.setState({
            type: value
        });
    }
    changeDateType(value) {
        this.setState({
            dateType: value,
            year: '',
            month: '',
            day: '',
        });
    }
    loading(value) {
        this.setState({
            loading: value,
        });
    }

    //searchData搜索数据
    searchData() {
        const year = this.state.year;
        const month = this.state.month;
        const day = this.state.day;
        const key = this.state.keyid;
        //非空校验
        if (year === '' && month === '' && day === '') {
            return message.error('请选择日期');
        }
        this.loading(true);
        let param = {
            Mac: '',
            Keyid: this.state.keyid,
            HexKeyid: this.state.keyid,
            Start: this.state.start,
            End: this.state.end,
            PageIndex: 0,
            PageSize: 0,
            Desc: false,
        };
        searchMeterDatas(param,
            (res) => {
                this.loading(false);
                if (res.data.Status === 0) {
                    this.setState({
                        list: res.data.Data.Objs,
                        total: res.data.Data.Total,
                    });
                } else if (res.data.Status === 1) {
                    //没有数据，初始化list
                    message.info(res.data.Message);
                    this.setState({
                        list: [],
                        total: 0,
                    });
                }
                else {
                    message.error(res.data.Message);
                }
            },
            () => {
                this.loading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            }
        );

    }
    //change时间 str
    changeYear(value) {
        this.setState({
            year: value,
            month: '0',
            day: '0',
        });
    }
    onChangeDate(date, dateStr) {

        let utc = moment(dateStr).valueOf();
        const arr = dateStr.split('-');
        this.setState({
            year: arr[0],
            month: arr[1],
            day: arr[2],
            start: utc,
            end: utc + 24 * 3600 * 1000,
        });
    }
    onChangeMonth(date, dateStr) {
        const arr = dateStr.split('-');
        this.setState({
            year: arr[0],
            month: arr[1],
            day: '0',
        });
    }
}


export default withRouter(Record);