import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { DatePicker, Button, message, Select, Spin } from 'antd';
import G2 from '@antv/g2';
import { getMeterEnergyStic } from '../../../../../utils/api';
import intl from 'react-intl-universal';
import DataSet from '@antv/data-set';

const global = {
    chart: undefined,
}

const { Option } = Select;
const { MonthPicker } = DatePicker;
class Year extends Component {

    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const keyid = arr[arr.length - 1];
        this.state = {
            keyid: keyid,
            year: "2020",
            spinning: false
        }
        this.loading = this.loading.bind(this);
    }
    render() {
        return (
            <div>
                <Spin spinning={this.state.spinning}>

                    <Select style={{ width: 120 }} onChange={(value) => this.onChangeYear(value)} value={this.state.year}>
                        <Option value="2020">2020</Option>
                        <Option value="2021">2021</Option>
                        <Option value="2022">2022</Option>
                        <Option value="2023">2023</Option>
                        <Option value="2024">2024</Option>
                        <Option value="2025">2025</Option>
                    </Select>
                    <Button type='primary' onClick={() => this.requestData()} style={{ marginLeft: 20 }}>{intl.get('COMMON_BTN.SEARCH')}</Button>
                    <div id="meter_info_chart_year">
                        <div className="meter_info_chart_block">每月用电</div>
                    </div>
                </Spin>
            </div >
        )
    }

    componentDidMount() {
        //创建 chart对象
        global.chart = new G2.Chart({
            container: 'meter_info_chart_year',
            forceFit: true,
            height: 500,
        });
        const e = document.createEvent('Event');
        e.initEvent('resize', true, true);
        window.dispatchEvent(e);
        global.chart.render();
    }
    onChangeYear(value) {
        this.setState({
            year: value
        })
    }
    loading(value) {
        this.setState({
            spinning: value,
        })
    }
    requestData() {
        let hexkeyid = this.state.keyid;
        let year = parseInt(this.state.year);
        let month = 0;
        this.loading(true);
        getMeterEnergyStic(year, month, hexkeyid,
            (res) => {
                this.loading(false);
                if (res.data.Status === 0) {
                    this.update(res.data.Data)
                } else {
                    this.update([]);
                    message.error(res.data.Message);
                }
            },
            () => {
                this.loading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            })
    }
    update(data) {
        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.transform({
            type: 'map',
            callback(row) {
                row.Dt = row.Dt / 1000000;
                row.Date = row.Date + "月";
                return row;
            }
        }).transform({
            type: 'rename',
            map: {
                Dt: '电能(度)',
                Date: '月份',
            }
        });
        if (global.chart) {
            //装载数据           
            global.chart.source(dv);
        }
        // x坐标 * y坐标
        global.chart.interval().position('月份*电能(度)');
        global.chart.render();
    }

}
export default withRouter(Year);
