import React,{Component} from 'react';
import {Button,Select,DatePicker} from 'antd';
import './style.css';
const {Option} = Select;

class StatisticsHeader extends Component{
    render(){

        return(
            <div className="meterinfo_statistics_header_root">
                <Select placeholder="搜索类型"
                    className="meterinfo_statistics_header_state">
                        <Option value="elec">电量</Option>
                        <Option value="power">功率</Option>
                        <Option value="volt">电压</Option>
                        <Option value="current">电流</Option>

                </Select>
                <DatePicker.RangePicker
                    className="meterinfo_statistics_input_date"
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    onOk={this.onOk}
                    onChange={this.onChange}
                    placeholder={['开始(yyyy-MM-dd HH:mm)', '结束(yyyy-MM-dd HH:mm)']}
                />

                <Button className="meterinfo_statistics_header_btn_search" type="primary" icon="search">搜索</Button>
               
            </div>
        )
    }
}
export default StatisticsHeader;