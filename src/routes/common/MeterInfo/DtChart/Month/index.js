import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { DatePicker, Button, message, Spin } from 'antd';
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';
import { getMeterEnergyStic } from '../../../../../utils/api';
import intl from 'react-intl-universal';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const global = {
    chart: undefined,
}
const { MonthPicker } = DatePicker;
class Month extends Component {

    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const keyid = arr[arr.length - 1];
        this.state = {
            keyid: keyid,
            year: 0,
            month: 0,
            spinning: false,

        }
        this.loading = this.loading.bind(this);
    }
    render() {
        return (
            <div>
                <Spin spinning={this.state.spinning}>
                    <MonthPicker
                        onChange={(date, dateStr) => this.onChangeMonth(date, dateStr)}
                    />
                    <Button type='primary' onClick={() => this.requestData()} style={{ marginLeft: 20 }}>{intl.get('COMMON_BTN.SEARCH')}</Button>
                    <div id="meter_info_chart_month">
                        <div className="meter_info_chart_block"><p>每日用电</p>
                        </div>
                    </div>
                </Spin>
            </div>
        )
    }

    componentDidMount() {
        //创建 chart对象
        global.chart = new G2.Chart({
            container: 'meter_info_chart_month',
            forceFit: true,
            height: 400,
        });
        const e = document.createEvent('Event');
        e.initEvent('resize', true, true);
        window.dispatchEvent(e);
        global.chart.render();

    }
    onChangeMonth(date, dateStr) {
        let year = parseInt(dateStr.split('-')[0]);
        let month = parseInt(dateStr.split('-')[1]);
        this.setState({
            year: year,
            month: month,
        });
    }
    requestData() {
        let hexkeyid = this.state.keyid;
        let year = this.state.year;
        let month = this.state.month;
        this.loading(true);
        getMeterEnergyStic(year, month, hexkeyid,
            (res) => {
                this.loading(false);
                if (res.data.Status === 0) {
                    this.update(res.data.Data)
                } else {
                    message.error(res.data.Message);
                    this.update([]);
                }
            },
            () => {
                this.loading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            })
    }
    loading(value) {
        this.setState({
            spinning: value
        });
    }
    update(data) {
        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.transform({
            type: 'map',
            callback(row) {
                row.Dt = row.Dt / 1000000
                return row;
            }
        })
            .transform({
                type: 'rename',
                map: {
                    Dt: '电能(度)',
                    Date: '日期',
                }
            });
        if (global.chart) {
            //装载数据           
            global.chart.source(dv);
        }

        global.chart.tooltip({
            crosshairs: {
                type: 'line'
            }
        });
        global.chart.line().position('日期*电能(度)').style({
            lineWidth: 1,
        });

        global.chart.point().position('日期*电能(度)')
            .size(4)
            .shape('circle')
            .style({
                stroke: '#fff',
                lineWidth: 1
            });
        global.chart.axis('电能(度)', {
            title: {
                textStyle: {
                    fontSize: 15, // 文本大小
                    textAlign: 'center', // 文本对齐方式
                    fill: '#5f6368', // 文本颜色
                }
            }
        });
        global.chart.render();
    }

}
export default withRouter(Month);
