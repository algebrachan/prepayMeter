import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import G2 from '@antv/g2';
import intl from 'react-intl-universal';
import './style.css';

const global = {
    chart: undefined,
}


class DevUseChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }

    render() {
        return (
            <div id="pie_chart">
                <div className="agent_home_pie_chart_block"> {intl.get('HOMEPAGE.DEV_USE.TITLE')}</div>
            </div>
        )
    }

    componentWillReceiveProps(next) {
        //数据更新的时候必须要做判断，不然会渲染多次 
        if (next.data !== this.props.data) {
            let list = [
                { item: `${intl.get('HOMEPAGE.DEV_USE.NORMAL')}`, count: next.data.Normal, percent: Math.round(next.data.Normal * 10000 / next.data.Total)/100 },
                { item: `${intl.get('HOMEPAGE.DEV_USE.PROBABLY')}`, count: next.data.Latent, percent: Math.round(next.data.Latent * 10000 / next.data.Total)/100 },
                { item: `${intl.get('HOMEPAGE.DEV_USE.ABNORMAL')}`, count: next.data.Err, percent: Math.round(next.data.Err * 10000 / next.data.Total)/100 },
            ];
            global.chart.guide().text({
                position: ['50%', '50%'],
                content: `${intl.get('COMMON.TOTAL')}：${next.data.Total}`,
                style: {
                    lineHeight: '240px',
                    fontSize: '20',
                    fill: '#262626',
                    textAlign: 'center',
                }
            });
            
            this.update(list);
        }
    }
    componentDidMount() {
        //创建 chart对象
        global.chart = new G2.Chart({
            container: 'pie_chart',
            forceFit: true,
            height: 400,
            animate: false,
        });
        // 让chart的forceFit功能刚载入的时候就生效
        const e = document.createEvent('Event');
        e.initEvent('resize', true, true);
        window.dispatchEvent(e);
        global.chart.render();
    }
    update(data) {
        if (global.chart) {
            global.chart.source(data, {
                percent: {
                    formatter: val => {
                        val = val + '%';
                        return val;
                    }
                }
            });
        }
        global.chart.coord('theta', {
            radius: 0.75,
            innerRadius: 0.6
        });
        // global.chart.tooltip({
        //     showTitle: false,
        //     itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        // });
        // 辅助文本
        global.chart.intervalStack()
            .position('percent')
            .color('item', ['#2fc25a', '#ff8f1e', '#fc4b6c'])
            .label('percent', {
                formatter: (val, item) => {
                    return item.point.item + ': ' + val;
                }
            })
            .tooltip('item*percent*count', (item, percent, count) => {
                percent = percent + '%';
                return {
                    title: `${intl.get('COMMON.COUNT')} ` + count,
                    name: item,
                    value: percent
                };
            })
            .style({
                lineWidth: 1,
                stroke: '#fff'
            });
        global.chart.render();
    }

}
export default withRouter(DevUseChart);
