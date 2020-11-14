import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';
import intl from 'react-intl-universal';
import './style.css';

const global = {
    chart: undefined,
}

class DtUseChart extends Component {

    render() {
        return (
            <div id="line_chart">
                <div className="agent_home_line_chart_block">{intl.get('HOMEPAGE.DT_USE.TITLE')}</div>
            </div>
        )
    }

    componentWillReceiveProps(next) {
        if (next.data !== this.props.data) {
            this.update(next.data);
        }
    }
    componentDidMount() {
        //创建 chart对象
        global.chart = new G2.Chart({
            container: 'line_chart',
            forceFit: true,
            height: 400,
        });
        // 让chart的forceFit功能刚载入的时候就生效
        const e = document.createEvent('Event');
        e.initEvent('resize', true, true);
        window.dispatchEvent(e);
        global.chart.render();
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
                    Dt: `${intl.get('HOMEPAGE.DT_USE.ELECT')}`,
                    Date: `${intl.get('HOMEPAGE.DT_USE.DATE')}`,
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
        global.chart.line().position(`${intl.get('HOMEPAGE.DT_USE.DATE')}*${intl.get('HOMEPAGE.DT_USE.ELECT')}`).style({
            lineWidth: 1,
        });

        global.chart.point().position(`${intl.get('HOMEPAGE.DT_USE.DATE')}*${intl.get('HOMEPAGE.DT_USE.ELECT')}`)
            .size(4)
            .shape('circle')
            .style({
                stroke: '#fff',
                lineWidth: 1
            });
        global.chart.axis(`${intl.get('HOMEPAGE.DT_USE.ELECT')}`, {
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
export default withRouter(DtUseChart);
