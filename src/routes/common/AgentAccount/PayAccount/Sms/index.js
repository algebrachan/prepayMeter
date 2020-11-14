import React, { Component } from 'react';
import { message, Descriptions, Typography, Button, Modal, Spin, InputNumber, Radio, Switch, Icon } from 'antd';
import { pay, getAgentSmsCtr } from '../../../../../utils/api';
import QRCode from 'qrcode.react';
import RechargeSmsModal from './RechargeSmsModal';
import ModifySmsConfigModal from './ModifySmsConfgModal';
import intl from 'react-intl-universal';
import '../style.css';
class Sms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showpay: false,
            showqrc: false,
            showedt: false,
            spinning: false,

            smsctr: 10,
            data: {
                Smsctr: 0,
                Almctr: 0,
                Almcnl: 0,
                Enable: false
            },
            pay: {
                cny: 0,
                pwy: 1,
                msgurl: '',
                msgpid: '',
            }

        }
        this.getMsgOrderUrl = this.getMsgOrderUrl.bind(this);
        this.setUrlParam = this.setUrlParam.bind(this);
        this.changeModal = this.changeModal.bind(this);
        this.Loading = this.Loading.bind(this);
        this.requestData = this.requestData.bind(this);
    }

    render() {
        return (

            <Spin spinning={this.state.spinning} >
                <div style={{ margin: 20, backgroundColor: '#FFFFFF', padding: 20 }}>
                    <Button style={{ margin: 20 }} type='primary' onClick={() => { this.requestData() }}>{intl.get('COMMON_BTN.REFRESH')}</Button>
                    <Button style={{ margin: 20 }} type='default' onClick={() => { this.changeModifySmsModalVisible(true) }}>{intl.get('COMMON_BTN.EDIT')}</Button>
                    <Button style={{ margin: 20 }} type='default' onClick={() => { this.changeRechargeSmsModalVisible(true) }}>充值</Button>
                    <Descriptions bordered column={1} >
                        <Descriptions.Item label="剩余短信数" ><Typography.Text style={{ color: 'orange', fontSize: 18 }}>{this.state.data.Smsctr}条</Typography.Text></Descriptions.Item>
                        {/* <Descriptions.Item label="剩余短信提醒"><Typography.Text style={{color: 'orange', fontSize: 18}}>100</Typography.Text><Icon type="question-circle" /></Descriptions.Item> */}
                        <Descriptions.Item label="余额提醒" ><Typography.Text style={{ color: 'orange', fontSize: 18 }}>{this.state.data.Almcnl / 1000}元</Typography.Text></Descriptions.Item>
                        {/* <Descriptions.Item label="提醒限额" ><Typography.Text style={{color: 'orange', fontSize: 18}}>5</Typography.Text><Icon type="question-circle" /></Descriptions.Item> */}
                        <Descriptions.Item label="是否启用" >{this.state.data.Enable ? '启用' : '禁用'}</Descriptions.Item>
                        {/* <Descriptions.Item ></Descriptions.Item> */}
                    </Descriptions>

                    <RechargeSmsModal
                        show={this.state.showpay}
                        onOk={(cny, pwy) => { this.requestPay(cny, pwy) }}
                        onCancel={() => { this.changeRechargeSmsModalVisible(false) }}
                    />
                    <ModifySmsConfigModal
                        show={this.state.showedt}
                        data={this.state.data}
                        onCancel={() => { this.changeModifySmsModalVisible(false) }}
                    />

                    <Modal
                        title={this.state.pay.pwy === 1 ? '微信' : '支付宝'}
                        visible={this.state.showqrc}
                        destroyOnClose
                        centered
                        onCancel={() => this.changeModal(false)}>
                        <div style={{ textAlign: 'center' }}>

                            <Typography.Title style={{ color: 'orange' }}>￥{this.state.pay.cny}元</Typography.Title>
                            <div style={{ textAlign: 'center' }}>
                                <QRCode value={this.state.pay.msgurl} />
                            </div>
                            <Typography.Text style={{ fontSize: 18 }}>请使用{this.state.pay.pwy === 1 ? '微信' : '支付宝'}扫码支付，有效期2分钟</Typography.Text>
                        </div>
                    </Modal>
                </div>
            </Spin>
        );

    }

    componentDidMount() {
        this.requestData();
    }

    requestData() {
        this.Loading(true);
        getAgentSmsCtr(
            (res) => {
                this.Loading(false);
                if (res.data.Status === 0) {
                    this.setState({
                        data: res.data.Data
                    });
                }
            },
            () => {
                this.Loading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            }
        )
    }

    /**
     * 请求支付
     * @param {*} cny 支付金额
     * @param {*} pwy 支付方式
     */
    requestPay(cny, pwy) {
        let param = {
            Mac: '',
            Sys: '',
            Fwt: 3,//短信3
            Pwy: pwy,//支付方式
            Cnl: cny * 1000,//支付金额
        }
        let pay = {
            pwy: pwy,
            cny: cny,
        }
        this.setState({
            pay: pay
        });
        this.Loading(true);
        this.getMsgOrderUrl(param)
            .then((res) => {
                return this.setUrlParam(res);
            },
                (err) => {
                    return new Promise().reject()
                })
            .then(
                (res) => {
                    this.Loading(false);

                    this.changeModal(true);
                    this.changeRechargeSmsModalVisible(false);
                },
                (err) => {
                    this.Loading(false);
                    message.error('请求支付失败');
                }
            )
    }

    // 需要用到promise
    getMsgOrderUrl(param) {
        let p = new Promise((resolve, reject) => {
            pay(param,
                (res) => {
                    if (res.data.Status === 0) {
                        resolve(res.data.Data);
                    } else {
                        reject(res.data.Message);
                    }
                },
                () => {
                    reject('网络连接错误');
                })
        });
        return p;
    }
    setUrlParam(value) {
        let obj = {
            msgurl: value.Url,
            msgpid: value.PidStr,
            pwy: this.state.pay.pwy,
            cny: this.state.pay.cny
        }
        let p = new Promise((resolve, reject) => {
            this.setState({
                pay: obj
            });
            resolve('url设置成功');
        });
        return p;
    }

    changeRechargeSmsModalVisible(val) {
        this.setState({
            showpay: val,
        });
    }
    changeModifySmsModalVisible(val) {
        this.setState({
            showedt: val,
        });
    }

    changeModal(value) {
        this.setState({
            showqrc: value,
        });
    }
    Loading(value) {
        this.setState({
            spinning: value,
        });
    }



}
export default Sms;