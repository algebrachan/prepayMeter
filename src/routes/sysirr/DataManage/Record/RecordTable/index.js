import React,{Component} from 'react';
import {Tabs} from 'antd';
import Elec from './Elec';
import Power from './Power';
import Volt from './Volt';
import Current from './Current';
import './style.css';

const {TabPane} = Tabs;
class RecordTable extends Component{


      render(){
        
        return(
            <div>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="电量" key="1">
                    <Elec/>
                  </TabPane>
                  <TabPane tab="功率" key="2">
                    <Power/>
                  </TabPane>
                  <TabPane tab="电压" key="3">
                    <Volt/>
                  </TabPane>
                  <TabPane tab="电流" key="4">
                    <Current/>
                  </TabPane>
                </Tabs>

            </div>

        )
      }
}
export default RecordTable;