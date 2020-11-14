import React,{Component} from 'react';
import {Table} from 'antd';
 
class Power extends Component{

    initColumns(){
        const columns=[
        {
            title:'设备名',
            dataIndex:'name',
        },
        {
            title:'功率',
            dataIndex:'p',
        },
        
        ];
        return columns;
    }
    render(){
        const columns = this.initColumns();
        return(
            <div>

                <Table 
                 bordered
                 showHeader
                 columns={columns}
                 />
            </div>
        )
    }
}
export default Power;