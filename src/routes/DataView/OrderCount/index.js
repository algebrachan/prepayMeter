import React, { Component } from 'react';
import { Chart } from '@antv/g2';

const data = [
    { date: '年统计', type: '总订单', value: 75 },
    { date: '年统计', type: '微信订单', value: 27 },
    { date: '年统计', type: '支付宝订单', value: 8 },
    { date: '年统计', type: '现金订单', value: 40 },

    { date: '月统计', type: '总订单', value: 0 },
    { date: '月统计', type: '微信订单', value: 0 },
    { date: '月统计', type: '支付宝订单', value: 0 },
    { date: '月统计', type: '现金订单', value: 0 },

    { date: '日统计', type: '总订单', value: 0 },
    { date: '日统计', type: '微信订单', value: 0 },
    { date: '日统计', type: '支付宝订单', value: 0 },
    { date: '日统计', type: '现金订单', value: 0 },
];
let chart = undefined;
class OrderCount extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="order_count" >
            </div>
        );
    }

    componentDidMount() {
        if (chart == undefined) {
            chart = new Chart({
                container: 'order_count',
                forceFit: true,
                height: 280,
                width: 550,
                background: {
                    fill: '#000',
                    fillOpacity: 0.1,
                }
            });
        }
        chart.source(data, {
            value: {
                nice: false,
                alias: '订单数量(个)'
            }
        });
        chart.axis('date', {
            label: {
                textStyle: {
                    fill: '#aaaaaa',
                    fontSize: 12
                }
            },
            tickLine: {
                alignWithLabel: false,
                length: 0
            }
        });
        chart.axis('value', {
            label: {
                textStyle: {
                    fill: '#aaaaaa',
                    fontSize: 12
                }
            },
            title: {
                offset: 30,
                textStyle: {
                    fontSize: 14,
                    fontWeight: 300
                }
            }
        });
        chart.legend({
            position: 'bottom-center'
        });
        chart.coord().transpose();// x,y 转置
        chart.interval().position('date*value').color('type', ['#32749c', '#2f8cc0', '#75b6dd', '#4eb3ad'])
            .opacity(1)
            .adjust([{
                type: 'dodge',
                marginRatio: 0.3
            }]);
        chart.render();
    }

}
export default OrderCount;