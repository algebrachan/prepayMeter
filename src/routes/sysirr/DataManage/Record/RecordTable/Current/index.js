import React,{Component} from 'react';
import {Table} from 'antd';
 
class Current extends Component{

    initColumns(){
        const columns=[
        {
            title:'设备名',
            dataIndex:'name',
        },
        {
            title:'电流',
            dataIndex:'i',
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
export default Current;