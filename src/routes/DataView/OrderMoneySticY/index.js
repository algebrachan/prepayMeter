import React, { Component } from 'react';
import { Chart } from '@antv/g2';

const data = [
    { type: '年总收入', value: 200 },
    { type: '微信年收入', value: 40 },
    { type: '支付宝年收入', value: 50 },
    { type: '现金年收入', value: 110 },
]

let chart = undefined;
class OrderMoneySticY extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="order_money_year" >
            </div>
        );
    }

    componentDidMount() {
        if (chart == undefined) {
            chart = new Chart({
                container: 'order_money_year',
                forceFit: true,
                height: 280,
                width: 550,
                padding: [20, 40, 50, 100],
                background: {
                    fill: '#000',
                    fillOpacity: 0.1,
                }
            });
        }
        chart.source(data, {
            value: {
                nice: false,
                alias: '年收入金额(元)'
            }
        });
        chart.axis('type', {
            label: {
                textStyle: {
                    fill: '#fff',
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
                    fill: '#fff',
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
        chart.legend(false);
        chart.coord().transpose();
        chart.interval().position('type*value').color('type', ['#32749c', '#2f8cc0', '#75b6dd', '#4eb3ad'])
            .opacity(1)
            .label('value', {
                textStyle: {
                    fill: '#fff'
                },
                offset: 10
            })
            .adjust([{
                type: 'dodge',
                marginRatio: 0.3
            }]);
        chart.render();
    }
    // ['#32749c', '#2f8cc0', '#75b6dd', '#4eb3ad']

}
export default OrderMoneySticY;