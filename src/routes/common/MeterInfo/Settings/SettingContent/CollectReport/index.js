import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {Button,  Modal } from 'antd';
import ChildCard from './ChildCard';

class CollectReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    a: 1,
                    b: 2,
                    c: 3,
                    d: 4,
                    e: 5,
                    f: 6,
                    g: true,

                },
                {
                    a: 1,
                    b: 2,
                    c: 3,
                    d: 4,
                    e: 5,
                    f: 6,
                    g: true,

                },

            ]
        }

    }

    render() {
        return (
            <Fragment>
                <div style={{ margin: 20 }}>
                    <div >
                        <Button style={{ marginBottom: 20, marginLeft: 10 }} type='primary' onClick={()=>this.requestData()}>{intl.get('COMMON_BTN.REFRESH')}</Button>
                        <Button style={{ marginBottom: 20, marginLeft: 10 }} type='primary' onClick={()=>this.confirmSet()}>设置</Button>
                        <Button style={{ marginBottom: 20, marginLeft: 10 }} type='primary' onClick={()=>this.resetData()}>恢复默认</Button>
                        <Button style={{ marginBottom: 20, marginLeft: 10 }} type='primary' onClick={()=>this.addDataList()}>新增数据组</Button>
                    </div>
                    {this.state.data.map((item, index) => {

                        return (
                               <ChildCard className="" obj={item} index={index} onDelete={()=>this.deleteDataList(index)} modPropsData={(obj)=>this.modifyData(obj,index)}/>
                            )
                    })}
                </div>

            </Fragment>
        );
    }

    requestData() {
    }

    confirmSet() {
        Modal.confirm({
            title: '确认要设置',
            content: '确认设置后将更新数据组',
            okText: '确认',
            okType: 'danger',
            centered: true,
            cancelText: '取消',
            onOk: () => { this.setData() },
            onCancel() {
            }
        });
    }

    resetData() {
    }

    setData() {
    }

    addDataList(){
        let data = this.state.data;
        const temp = {
            a: 0,
            b: 0,
            c: 0,
            d: 0,
            e: 0,
            f: 0,
            g: false,
        };
        data = [...data,temp];
        this.setState({
            data:data,
        })
    }

    deleteDataList(index) {
        let data = this.state.data;
        let temp = [];
        for (let i = 0; i < data.length; i++) {
            if (i !== index) {
                temp = [...temp, data[i]];
            }
        }
        this.setState({
            data: temp,
        })
    }

    modifyData(obj,index){
        let data = this.state.data;
        data[index] = obj;
        this.setState({
            data:data,
        })

    }

}
export default withRouter(CollectReport);