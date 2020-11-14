import React,{Component} from 'react';
import {Input,Button,Select} from 'antd';
import './style.css';
const {Option} = Select;

class SettingsHeader extends Component{
    render(){

        return(
            <div className="syspre_settings_header_root">
                <Select placeholder="搜索类型"
                    className="syspre_settings_header_state"
                >
                    <Option value="name">名称</Option>
                    <Option value="keyid">编号</Option>
                </Select>
                <Input className="syspre_settings_header_input_search"
                    placeholder="请输入搜索内容"
                />
                <Button className="syspre_settings_header_btn_search" type="primary" icon="search">搜索</Button>
               
            </div>
        )
    }
}
export default SettingsHeader;