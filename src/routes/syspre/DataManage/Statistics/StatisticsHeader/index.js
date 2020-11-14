import React,{Component} from 'react';
import {Input,Button,Select,DatePicker} from 'antd';
import './style.css';
const {Option} = Select;

class StatisticsHeader extends Component{
    render(){

        return(
            <div className="syspre_data_statistics_header_root">
                <Select placeholder="统计数据"
                    className="syspre_data_statistics_header_state"
                >
                    <Option value="name">设备名</Option>                   
                </Select>
                <Input className="syspre_data_statistics_header_input_search"
                    placeholder="请输入搜索内容"
                />
                <DatePicker.RangePicker
                    className="syspre_data_statistics_input_date"
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    onOk={this.onOk}
                    onChange={this.onChange}
                    placeholder={['开始(yyyy-MM-dd HH:mm)', '结束(yyyy-MM-dd HH:mm)']}
                />

                <Button className="syspre_data_statistics_header_btn_search" type="primary" icon="search">搜索</Button>
               
            </div>
        )
    }
}
export default StatisticsHeader;