import React,{Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import './style.css';
class StatisticsChart extends Component{


  render(){
        
        
    const option = {
        title: {
            text: '属性'
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }]
    };
　　　　return(
            <div>
              <ReactEcharts  option={option} style={{height:'600px',width:'100%'}}/>
            </div>
　　　　　　
　　　　)
}
}
export default StatisticsChart;