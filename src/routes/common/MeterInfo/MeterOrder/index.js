import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, message, Descriptions, Spin, Modal, Icon, Tag } from 'antd';
import { getMeterOrder, getAdminPower, relieveOrder, manualRefund } from '../../../../utils/api';
import { MeterOrderState } from '../../../../utils/enum';
import * as session from '../../../../utils/Session';
import OrderModal from './OrderModal';
import RechargeModal from './RechargeModal';
import ModmarksModal from './ModmarksModal';
import intl from 'react-intl-universal';
import './style.css';
const { confirm } = Modal;
const actType = session.getLoginVertificate().Type;
const agtid = session.getLoginVertificate().AgtidStr;

class MeterOrder extends Component {
    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const keyid = arr[arr.length - 1];
        this.state = {
            keyid: keyid,
            data: {
                Cdt: 0,
                Sdt: 0,
                Cost: 0,
                Sutc: 0,
                Stt: 0,
                Man: false,
                CstmidStr: '',
                SutcStr: '',
                Moid: '',
                key: '',
                Rmk: '',//备注
            },
            showOrder: false,
            showRecharge: false,
            showMarks: false,
            spinning: false,
            showRechg: false,

        }
        this.requestData1 = this.requestData1.bind(this);
        this.requestData2 = this.requestData2.bind(this);
        this.loading = this.loading.bind(this);
        this.requestAuth = this.requestAuth.bind(this);
        this.setAuth = this.setAuth.bind(this);
        this.setData = this.setData.bind(this);
        this.relieveOrder = this.relieveOrder.bind(this);
    }
    render() {
        return (
            <div className="meterinfo_order_root">
                <Spin spinning={this.state.spinning}>
                    <Button type='primary'
                        className="meterinfo_order_btn"
                        onClick={() => this.requestData2()}
                    >{intl.get('COMMON_BTN.REFRESH')}</Button>
                    {this.state.data.CstmidStr === '' ?
                        <Button type='primary' onClick={() => this.createOrder()} className="meterinfo_order_btn">创建订单</Button>
                        :
                        <div>
                            <Descriptions bordered className="meterinfo_order_desc">
                                <Descriptions.Item label="订单编号" span={3}>{this.state.data.MoidStr}</Descriptions.Item>
                                <Descriptions.Item label="客户ID" span={3}>{this.state.data.CstmidStr}</Descriptions.Item>
                                <Descriptions.Item label="手机号" span={3}>{this.state.data.Phone}</Descriptions.Item>
                                <Descriptions.Item label="备注" span={3}>{this.state.data.Rmk}<Icon type="edit" style={{ marginLeft: 10, color: 'gray', fontSize: 16 }} onClick={() => this.iconClick()} /></Descriptions.Item>
                                <Descriptions.Item label="开始时间" span={3}>{this.state.data.SutcStr}</Descriptions.Item>
                                <Descriptions.Item label="开始电能(度)" span={3}>{this.state.data.Sdt / 1000000}</Descriptions.Item>
                                <Descriptions.Item label="当前电能(度)" span={3}>{this.state.data.Cdt / 1000000}</Descriptions.Item>
                                <Descriptions.Item label="电费(元)" span={3}>{this.state.data.Cost / 1000}</Descriptions.Item>
                                <Descriptions.Item label="余额(元)" span={3}>{this.state.data.Left / 1000}</Descriptions.Item>
                                <Descriptions.Item label="订单状态" span={3}>{this.ShowStt(this.state.data.Stt)}</Descriptions.Item>
                                {this.state.data.Stt === 2 ?
                                    <Descriptions.Item label="退费方式" span={3}>{this.state.data.Man ? '人工退费' : '自动退费'}</Descriptions.Item> : ''
                                }
                            </Descriptions>
                            {this.state.showRechg || actType === 1 ?
                                <Button type="primary"
                                    className="meterinfo_order_btn"
                                    onClick={() => this.Recharge()}>充值</Button> : ''
                            }
                            <Button type='primary'
                                className="meterinfo_order_btn"
                                onClick={() => this.relieveOrder()}
                                loading={this.state.btnload}>解除绑定</Button>
                            {this.state.data.Man ? <Button type="primary" className="meterinfo_order_btn"
                                onClick={() => this.refund()}>退费</Button> : ''}
                        </div>
                    }
                </Spin>
                <OrderModal show={this.state.showOrder} hide={() => this.hideOrder()} refresh={() => this.requestData2()} />
                <RechargeModal show={this.state.showRecharge} hide={() => this.hideRecharge()} moid={this.state.data.MoidStr} sn={this.state.keyid} />
                <ModmarksModal show={this.state.showMarks} hide={() => this.hideMarks()} refresh={() => this.requestData2()} keyid={this.state.keyid} mark={this.state.data.Rmk} />
            </div>
        )
    }

    ShowStt(stt) {
        if (stt === MeterOrderState.IDLE) {
            return (<Tag color="green">正常使用</Tag>);
        }
        if (stt === MeterOrderState.RECHARGING) {
            return (<Tag color="orange">充值中</Tag>);
        }
        if (stt === MeterOrderState.RELIEVE) {
            return (<Tag color="red">结算中</Tag>);
        }
    }
    componentDidMount() {
        this.loading(true);
        //利用Promise解决异步调用顺序问题
        this.requestAuth()
            .then((res) => {
                return this.setAuth(res);
            }, (err) => {
                return new Promise().reject();
            })
            .then((res) => {
                return this.requestData1();
            }, (err) => {
                return new Promise().reject();
            })
            .then((res) => {
                return this.setData(res.data.Data);
            }, (err) => {
                return new Promise().reject();
            })
            .then((res) => {
                this.loading(false);
                message.success(`${intl.get('COMMON_MESSAGE.RST_SUCS')}`);
            }, (err) => {
                this.loading(false);
                message.error('error');
            });
    }

    //Promise中的请求数据
    requestData1() {
        let p = new Promise((resolve, reject) => {
            getMeterOrder(this.state.keyid,
                (res) => {
                    if (res.data.Status === 0) {
                        resolve(res);
                    } else {
                        reject(res.data.Message);
                    }
                },
                (err) => {
                    reject('网络连接错误');
                });
        });
        return p;
    }

    // 单独请求数据
    requestData2() {
        this.loading(true);
        getMeterOrder(this.state.keyid,
            (res) => {
                this.loading(false);
                if (res.data.Status === 0) {
                    this.setState(({
                        data: res.data.Data,
                    }));
                }
                else {
                    message.error(res.data.Message);
                }
            },
            () => {
                this.loading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            });
    }


    //请求权限
    requestAuth() {
        let p = new Promise((resolve, reject) => {
            //请求权限
            getAdminPower(
                (res) => {
                    if (res.data.Status === 0) {
                        resolve(res.data.Data.Rechg);
                    } else {
                        reject(res.data.Message);
                    }
                },
                (err) => {
                    reject('网络连接错误');
                });
        });
        return p;
    }

    //设置权限
    setAuth(value) {
        let p = new Promise((resolve, reject) => {
            this.setState({
                showRechg: value
            });
            resolve('权限设置成功');
        });
        return p;
    }

    //设置参数
    setData(data) {
        let p = new Promise((resolve, reject) => {
            this.setState({
                data: data,
            });
            resolve('数据设置成功');
        })
        return p;
    }
    refund() {
        const key = this.state.keyid;

        confirm({
            title: '您确定要退费吗?',
            content: '退费',
            onOk: () => {
                this.loading(true);
                manualRefund(key,
                    (res) => {
                        this.loading(false);
                        if (res.data.Status === 0) {
                            message.success(`${intl.get('COMMON_MESSAGE.OPER_SUCS')}`);
                            this.requestData2();
                        } else {
                            message.error(res.data.Message);
                        }
                    },
                    () => {
                        this.loading(false);
                        message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);

                    });
            },
            onCancel: () => {

            },
            centered: true,
        });

    }
    relieveOrder() {
        const cstmid = this.state.data.CstmidStr;
        const key = this.state.keyid;

        confirm({
            title: '您确定要解除绑定吗?',
            content: '解除绑定',
            onOk: () => {
                this.loading(true);
                relieveOrder(cstmid, key,
                    (res) => {
                        this.loading(false);
                        if (res.data.Status === 0) {
                            message.success(`${intl.get('COMMON_MESSAGE.OPER_SUCS')}`);
                            this.requestData2();
                        } else {
                            message.error(res.data.Message);
                        }
                    },
                    () => {
                        this.loading(false);
                        message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
                    });
            },
            onCancel: () => {

            },
            centered: true,
        });
    }

    loading(spinning) {
        this.setState({
            spinning: spinning,
        });
    }


    Recharge() {
        this.setState({
            showRecharge: true,
        });
    }
    hideRecharge() {
        this.setState({
            showRecharge: false,
        })
    }
    createOrder() {
        this.setState({
            showOrder: true,
        });
    }
    hideOrder() {
        this.setState({
            showOrder: false,
        });
    }
    hideMarks() {
        this.setState({
            showMarks: false,
        });
    }
    iconClick() {
        this.setState({
            showMarks: true,
        });
    }

}
export default withRouter(MeterOrder);