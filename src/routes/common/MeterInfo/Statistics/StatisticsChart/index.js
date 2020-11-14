import React,{Component} from 'react';
import {Row,Col } from 'antd';
import './style.css';
import Chart from './Chart';

export default class StatisticsChart extends Component{


    render(){
        
        
    
　　　　return(
            <div>
              <Row>
                  <Col span={12} key={1}>
                      <div>
                          <Chart/>
                       </div>   
                </Col>
                  <Col span={12} key={2}>电压</Col>
              </Row>
              <Row>
                  <Col span={12} key={3}>电流</Col>
                  <Col span={12} key={4}>功率</Col>
              </Row>
            </div>
　　　　　　
　　　　)
    }
}
