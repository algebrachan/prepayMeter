import React,{Component} from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Chart extends Component{


    render(){
          
          
      const option = {
          title: {
              text: '电量'
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
                <ReactEcharts  option={option} style={{height:'400px',width:'90%'}}/>
              </div>
  　　　　　　
  　　　　)
      }
  }
