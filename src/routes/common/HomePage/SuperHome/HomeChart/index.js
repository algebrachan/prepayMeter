import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import G2 from '@antv/g2';
import './style.css';

const global = {
    chart: undefined,
}

const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
]; // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。

class HomeChart extends Component {

    render() {
        return (
            <div id="chart">

            </div>
        );
    }

    componentDidMount() {
        //创建 Chart对象
        global.chart = new G2.Chart({
            container: 'chart',
            forceFit: true,
            height: 400,
            padding: 'auto',
        });
        // 让chart的forceFit功能刚载入的时候就生效
        const e = document.createEvent('Event');
        e.initEvent('resize', true, true);
        window.dispatchEvent(e);
        // 载入数据源
        global.chart.source(data);
        // 创建图形语法 x*y
        global.chart.interval().position('genre*sold').color('genre');
        global.chart.render();
    }


}
export default withRouter(HomeChart);