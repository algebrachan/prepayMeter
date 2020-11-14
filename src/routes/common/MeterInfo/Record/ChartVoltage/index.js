import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';
const global = {
  chart: undefined,
}

class ChartVoltage extends Component {

  render() {
    return (
      <div id='u'>

      </div>
    );
  }
  componentWillReceiveProps(next) {
    if (next.data !== this.props.data) {
      this.update(next.data);
    }
  }

  componentDidMount() {
    global.chart = new G2.Chart({
      container: 'u', // 指定图表容器 ID
      forceFit: true, // 指定图表宽度
      height: 400 // 指定图表高度
    });
    // 让chart的forceFit功能刚载入的时候就生效
    const e = document.createEvent('Event');
    e.initEvent('resize', true, true);
    window.dispatchEvent(e);
    this.update(this.props.data);
  }

  update(data) {
    const type = this.props.type;
    const voltages = ['A相电压(V)', 'B相电压(V)', 'C相电压(V)'];
    const VolColor = ['#facc14', '#2fc25b', '#dc143c'];
    //数据转化
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({//为使legend显示为中文，先做重命名
      type: 'rename',
      map: {
        Va: 'A相电压(V)',
        Vb: 'B相电压(V)',
        Vc: 'C相电压(V)',
      }
    })//展开操作 因为多图position操作只能进行一次
      .transform({
        type: 'fold',
        fields: voltages,
        key: 'voltage',
        value: 'V',
      });
    if (global.chart) {
      global.chart.source(dv);
    }
    global.chart.line().position('Logtp*V').color('voltage', VolColor).style({
      lineWidth: 2,
    });

    if (type === 'd') {
      // HH:mm格式 间隔2小时
      global.chart.scale({
        Logtp: {
          alias: '时间',
          type: 'time',
          mask: 'HH:mm',
          tickInterval: 3600 * 1000 * 2
        },
      });
    }
    if (type === 'm') {
      // MM-DD格式 间隔1天
      global.chart.scale({
        Logtp: {
          alias: '时间',
          type: 'time',
          mask: 'MM-DD',
          tickInterval: 3600 * 1000 * 24
        },
      });
    }
    if (type === 'y') {
      // YYYY-MM  间隔30天
      global.chart.scale({
        Logtp: {
          alias: '时间',
          type: 'time',
          mask: 'YYYY-MM',
          tickInterval: 3600 * 1000 * 24 * 30
        },
      });
    }

    global.chart.legend({
      align: 'center',
      itemWidth: null, // 图例项按照实际宽度渲染
    });
    // Step 4: 渲染图表
    global.chart.render();
  }
}


export default withRouter(ChartVoltage);