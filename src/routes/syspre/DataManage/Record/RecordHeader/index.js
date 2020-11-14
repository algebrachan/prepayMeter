import React, { Component } from 'react';
import { Input, Button, Select, DatePicker } from 'antd';
import moment from 'moment';
import './style.css';
const { Option } = Select;

const dateFormat = 'YYYY-MM-DD HH:mm';
class RecordHeader extends Component {
    

   
    render() {

        const time = Date.now();
        var d = new Date(time);

        return (
            <div className="syspre_data_record_header_root">
                <Select placeholder="记录查询"
                    className="syspre_data_record_header_state"
                >
                    <Option value="name">设备名</Option>
                </Select>
                <Input className="syspre_data_record_header_input_search"
                    placeholder="请输入搜索内容"
                />

                <DatePicker.RangePicker
                    className="syspre_data_record_input_date"
                    showTime={{ format: 'HH:mm' }}
                    format={dateFormat}
                    onOk={this.onOk}
                    onChange={this.onChange}
                    defaultValue={[moment(d, dateFormat), moment(d, dateFormat)]}
                />


                <Button className="syspre_data_record_header_btn_search" type="primary" icon="search">搜索</Button>

            </div>
        )
    }
}
export default RecordHeader;