import React, { Component } from 'react';
import { Chart } from '@antv/g2';

const data = [
    { type: '汽车', value: 34 },
    { type: '建材家居', value: 85 },
    { type: '住宿旅游', value: 103 },
];

let chart = undefined;
class TotalElect extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div id="total_elect"></div>
        );
    }

    componentWillReceiveProps(next) {
        chart.data(data);
        chart.scale('population', { nice: true });
        chart.coordinate().transpose();
        chart.tooltip({
            showMarkers: false
        });
        chart.interaction('active-region');
        chart.interval().position('country*population');
        chart.render();
    }
    componentDidMount() {
        if (chart == undefined) {
            chart = new Chart({
                container: 'total_elect',
                autoFit: true,
                height: 280,
                width: 580,
                background: {
                    fill: '#000',
                    fillOpacity: 0.1,
                }
            });
        }
        // 让chart的forceFit功能刚载入的时候就生效
        const e = document.createEvent('Event');
        e.initEvent('resize', true, true);
        window.dispatchEvent(e);

        chart.source(data, {
            value: {
                max: 200,
                min: 0,
                nice: false,
                alias: '销量（百万）'
            }
        });
        chart.axis('type', {
            label: {
                textStyle: {
                    fill: '#8d8d8d',
                    fontSize: 12
                }
            },
            tickLine: {
                alignWithLabel: false,
                length: 0
            },
            line: {
                lineWidth: 0
            }
        });
        chart.axis('value', {
            label: null,
            title: {
                offset: 30,
                textStyle: {
                    fontSize: 12,
                    fontWeight: 300
                }
            }
        });
        chart.legend(false);
        chart.coord().transpose();
        chart.tooltip({
            useHtml: true,
            crosshairs: {
                type: 'rect',
                style: {
                    fill: 'gray', // 填充的颜色
                    stroke: 'gray', // 边框的颜色
                    strokeOpacity: 0.1, // 边框颜色的透明度，数值为 0 - 1 范围
                    fillOpacity: 0.1, // 填充的颜色透明度，数值为 0 - 1 范围
                    lineWidth: 0.1, // 边框的粗细
                    lineDash: 1 // 线的虚线样式
                }
            },
            title: false,
            // itemTpl: '<li data-index={index}>'
            //     + '<span style="background-color:rgba(0,0,0,0.2);width:20px;height:10px;border-radius:50%;display:inline-block;margin-right:8px;"></span>'
            //     + '{name}<span class="g2-tooltip-value">{value}</span>'
            //     + '</li>',
            // htmlContent: function (title, items) {
            //     return '<div><ul><li>111</li></ul></div>'
            // }
            containerTpl: '<div class="g2-tooltip">'
                + '<div class="g2-tooltip-title" style="margin-bottom: 4px;"></div>'
                + '<ul class="g2-tooltip-list"></ul>'
                + '</div>',
        });
        chart.interval().position('type*value').size(10)
            .opacity(1)
            .label('value', {
                textStyle: {
                    fill: '#8d8d8d'
                },
                offset: 10
            });
        chart.render();
    }
}
export default TotalElect;