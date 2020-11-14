
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';
const global = {
  chart: undefined,
}
// const data = [
//   { genre: 'Sports', sold: 275 },
//   { genre: 'Strategy', sold: 115 },
//   { genre: 'Action', sold: 120 },
//   { genre: 'Shooter', sold: 350 },
//   { genre: 'Other', sold: 150 }
// ]; // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
class ChartPower extends Component {

  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  render() {
    return (
      <div id='p'>

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
      container: 'p', // 指定图表容器 ID
      forceFit: true, // 指定图表宽度
      height: 400 // 指定图表高度
    });
    const e = document.createEvent('Event');
    e.initEvent('resize', true, true);
    window.dispatchEvent(e);
    this.update(this.props.data);
  }

  update(data) {
    const type = this.props.type;
    const powers = ['A相功率(W)', 'B相功率(W)', 'C相功率(W)', '总功率(W)'];
    const PowerColor = ['#facc14', '#2fc25b', '#dc143c', '	#4169E1'];
    //数据转化
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({//为使legend显示为中文，先做重命名
      type: 'rename',
      map: {
        Pa: 'A相功率(W)',
        Pb: 'B相功率(W)',
        Pc: 'C相功率(W)',
        Pt: '总功率(W)',
      }
    })//展开操作 因为多图position操作只能进行一次
      .transform({
        type: 'fold',
        fields: powers,
        key: 'power',
        value: 'P',
      });
    if (global.chart) {
      global.chart.source(dv);
    }
    global.chart.line().position('Logtp*P').color('power', PowerColor);

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


export default withRouter(ChartPower);