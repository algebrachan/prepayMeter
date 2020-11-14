import React, { Component, Fragment } from 'react';
import { Button, Spin, message, Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import intl from 'react-intl-universal';
import { deleteMeter, syncMeterData } from '../../../../utils/api';

class Maintain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                Devtp: 1, Index: 0, Keyid: 0,
                Dt: 0, D1: 0, D2: 0, D3: 0, D4: 0, 
                Left: 0, Stat: 0,
                Fa: 0, Fb: 0, Fc: 0, Ft: 0,
                Ia: 0, Ib: 0, Ic: 0,
                Va: 0, Vb: 0, Vc: 0,
                Ies: 0, Ses: 0, Ues: 0, Pes: 0,
                Pa: 0, Pb: 0, Pc: 0, Pt: 0,
                Logtp: 0, Tag: 0, Rowid: 0, Rpttp: 0, Seq: 0,
                Rtp: 1,// 1单费率 2多费率
                Sig: 1,
                ReadUtcStr: '',
                RpttpStr: '',
                key: '',
            },
            spinning: false,
        }
        this.clickDeleteBtn = this.clickDeleteBtn.bind(this);
        this.doDelete = this.doDelete.bind(this);
        this.clickSyncDataBtn = this.clickSyncDataBtn.bind(this);
        this.doSyncData = this.doSyncData.bind(this);
        this.debugReadData = this.debugReadData.bind(this);
    }

    render() {
        return (
            <Fragment>
                <div style={{ margin: 20 }}>
                    <Spin spinning={this.state.spinning}>
                        <Button style={{ marginBottom: 20 }} type="danger" onClick={this.clickDeleteBtn} >删除电表</Button>
                        <Button style={{ marginBottom: 20, marginLeft: 20 }} type='default' onClick={this.clickSyncDataBtn} >同步电表数据</Button>
                        {/* <Button style={{ marginBottom: 20, marginLeft: 20 }} type='default' onClick={this.debugReadData} >调试数据读取</Button> */}
                    </Spin>
                </div>
            </Fragment>
        );
    }


    componentDidMount() {
        
    }

    loading(spinning) {
        this.setState({
            spinning: spinning,
        });
    }

    /**
     * 点击同步电表数据按钮
     */
    clickSyncDataBtn()
    {
        var that = this;
        Modal.confirm({
            "centered": true,
            "title": "将电表的度数同步到系统中?",
            "content": (
                <Fragment>
                    1.适用于电表数据与系统不同步导致数据无法入库的情况<br/>
                    2.操作前确保电表当前没有订单正在进行中<br/>
                </Fragment>
            ),
            "onOk": () =>{
                that.doSyncData();
            }
        });
    }

    /**
     * 执行同步电表数据操作
     */
    doSyncData() {
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const hexkeyid = arr[arr.length - 1];
        this.loading(true);

        syncMeterData(
            hexkeyid,
            (res) => {
                this.loading(false);
                if (res.data.Status === 0) {
                    message.success(`${intl.get('COMMON_MESSAGE.OPER_SUCS')}`);
                    this.setState({
                        data: res.data.Data,
                    });
                }
                else {
                    message.error(res.data.Message);
                }
            },
            () => {
                this.loading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            })
    }

    /**
     * 点击删除按钮
     */
    clickDeleteBtn()
    {
        var that = this;
        Modal.confirm({
            "centered": true,
            "title": "确定要删除电表?",
            "content": (
                <Fragment>
                    该操作有可能造成数据丢失，请谨慎操作！
                </Fragment>
            ),
            "onOk": () =>{
                that.doDelete();
            }
        });
    }



    /**
     * 执行删除操作
     */
    doDelete() {
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const hexkeyid = arr[arr.length - 1];
        this.loading(true);

        deleteMeter(
            hexkeyid,
            (res) => {
                this.loading(false);
                if (res.data.Status === 0) {
                    message.success(`${intl.get('COMMON_MESSAGE.OPER_SUCS')}`);
                    this.setState({
                        data: res.data.Data,
                    });
                }
                else {
                    message.error(res.data.Message);
                }
            },
            () => {
                this.loading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            })
    }


    /**
     * 调试远程抄读电表数据
     */
    debugReadData() {
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const hexkeyid = arr[arr.length - 1];
        this.loading(true);

    }
}


export default withRouter(Maintain);