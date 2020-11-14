import React,{Component} from 'react';
import {Input,Button,Select} from 'antd';
import './style.css';
const {Option} = Select;

class RecordHeader extends Component{
    render(){

        return(
            <div className="sysirr_data_record_header_root">
                <Select placeholder="搜索类型"
                    className="sysirr_data_record_header_state"
                >
                    <Option value="name">设备名</Option>                   
                </Select>
                <Input className="sysirr_data_record_header_input_search"
                    placeholder="请输入搜索内容"
                />
                <Button className="sysirr_data_record_header_btn_search" type="primary" icon="search">搜索</Button>
               
            </div>
        )
    }
}
export default RecordHeader;