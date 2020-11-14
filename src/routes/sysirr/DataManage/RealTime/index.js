import React, { Component, Fragment } from 'react';
import { Button, Descriptions, Typography, Spin} from 'antd';

class RealTime extends Component{

    render(){
        return(
            <Fragment>
                <div style={{ margin: 20 }}>
                    <Button style={{ marginBottom: 20}} type='primary' >{intl.get('COMMON_BTN.REFRESH')}</Button>
                    <Button style={{ marginBottom: 20, marginLeft: 20 }} type='default' >读取实时数据</Button>
                    <Spin spinning={false}>
                        <Descriptions bordered>
                            <Descriptions.Item label="抄表时间" span={3}>12:11</Descriptions.Item>
                            <Descriptions.Item label="总电能" span={3}><Typography.Text style={{ color: '#d86c14' }}>1kWh</Typography.Text></Descriptions.Item>
                            <Descriptions.Item label="A相电能">1kWh</Descriptions.Item>
                            <Descriptions.Item label="B相电能">1kWh</Descriptions.Item>
                            <Descriptions.Item label="C相电能">1kWh</Descriptions.Item>
                            <Descriptions.Item label="总功率" span={3}>1kW</Descriptions.Item>
                            <Descriptions.Item label="A相功率">1kW</Descriptions.Item>
                            <Descriptions.Item label="B相功率">2kW</Descriptions.Item>
                            <Descriptions.Item label="C相功率">3kW</Descriptions.Item>
                        </Descriptions>
                    </Spin>
                </div>
            </Fragment>
        );

        
    }
}
export default RealTime;