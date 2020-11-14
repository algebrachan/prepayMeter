import React,{Component} from 'react';
import {Select} from 'antd';
import './style.css';

const {Option} = Select;
class SubHeader extends Component{


    render(){


        return(

            <div className="syspre_data_statistics_sub_root">
                <Select placeholder="搜索类型"
                    className="syspre_data_statistics_sub_state">
                        <Option value="elec">电量</Option>
                        <Option value="power">功率</Option>
                        <Option value="volt">电压</Option>
                        <Option value="current">电流</Option>

                    </Select>

            </div>
        )
    }
}
export default SubHeader;