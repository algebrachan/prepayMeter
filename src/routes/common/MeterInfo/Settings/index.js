import React, { Component } from 'react';
import { Tabs } from 'antd';
import Rates from './SettingContent/Rates';
import RateParam from './SettingContent/RateParam';
import MeterReport from './SettingContent/MeterReport';
import CollectReport from './SettingContent/CollectReport';


const {TabPane} =Tabs;
class Settings extends Component{
    render(){
        return(
            <div >
                <Tabs tabPosition='left' defaultActiveKey='0'>
                    <TabPane tab="费率时段" key="0">
                        <Rates />
                    </TabPane>
                    <TabPane tab="费率参数" key="1">
                        <RateParam/>
                    </TabPane>
                    <TabPane tab="设备上报" key="2">
                        <MeterReport/>
                    </TabPane>
                    <TabPane tab="采集上报" key="3">
                        <CollectReport/>
                    </TabPane>
                </Tabs>
            </div>
        );     
    }
}
export default Settings;