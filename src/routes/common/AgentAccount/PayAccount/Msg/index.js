import React, { Component } from 'react';
import { message, Card, Typography, Button, Modal, Spin, InputNumber, Radio } from 'antd';
import { pay, getAgentSmsCtr } from '../../../../../utils/api';
import { checkInt } from '../../../../../utils/math';
import QRCode from 'qrcode.react';
import intl from 'react-intl-universal';
import '../style.css';
class Msg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalshow: false,
            account: '',
            password: '',
            spinning: false,
            msgurl: '',
            msgpid: '',
            cnl: 1,
            pwy: 1,
            smsctr: 0,

        }
        this.getMsgOrderUrl = this.getMsgOrderUrl.bind(this);
        this.setUrlParam = this.setUrlParam.bind(this);
        this.changeModal = this.changeModal.bind(this);
        this.changeCnl = this.changeCnl.bind(this);
        this.Loading = this.Loading.bind(this);
        this.requestData = this.requestData.bind(this);
    }

    render() {
        return (
            <div className="syspre_agent_account_pay_root">
                <Spin spinning={this.state.spinning} >
                    <Card className="syspre_agent_account_pay_msg" >
                        <div className="agent_account_pay_item">
                            <div>通知短信每条0.1元</div>
                            <div>暂不支持开票和退款</div>
                        </div>
                        <div className="agent_account_pay_item">
                            <Typography.Text className="agent_account_pay_item_label">剩余短信数量：</Typography.Text>
                            <Typography.Text className="agent_account_pay_item_text">{this.state.smsctr}</Typography.Text>
                        </div>
                        <div className="agent_account_pay_item">
                            <Typography.Text className="agent_account_pay_item_label">充值金额(元)：</Typography.Text>
                            <InputNumber
                                autoComplete='off'
                                value={this.state.cnl}
                                className="agent_account_pay_item_input"
                                onChange={(e) => this.changeCnl(e)}
                                min={10}
                                max={10000}
                                precision={0}
                            />
                        </div>
                        <div className="agent_account_pay_item">
                            <Typography.Text className="agent_account_pay_item_label">支付方式：</Typography.Text>
                            <Radio.Group className="agent_account_pay_item_radio" onChange={(e) => this.onChangePwy(e)} value={this.state.pwy}>
                                <Radio value={1}>微信</Radio>
                                {/* <Radio value={2}>支付宝</Radio> */}
                            </Radio.Group>
                        </div>
                        <div className="agent_account_pay_item">
                            <Button type="primary" className="agent_account_pay_item_btn" onClick={() => this.subMit()}>充值</Button>
                            <Button type="primary" className="agent_account_pay_item_btn" onClick={() => this.requestData()}>{intl.get('COMMON_BTN.REFRESH')}</Button>
                        </div>

                    </Card>
                    <Modal
                        title='设置'
                        visible={this.state.modalshow}
                        destroyOnClose
                        centered
                        onCancel={() => this.changeModal(false)}
                        footer={[
                            <Button key="back" type="primary" onClick={() => this.changeModal(false)}>
                                已支付
                            </Button>
                        ]}
                    >
                        <div className="agent_account_pay_item_qr">
                            <QRCode className="agent_account_pay_item_qrcode" value={this.state.msgurl} />
                            <div className="agent_account_pay_item_pid">订单号：{this.state.msgpid}</div>
                        </div>

                    </Modal>
                </Spin>
            </div>
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
                        smsctr: res.data.Data.Smsctr
                    });
                }
            },
            () => {
                this.Loading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            }
        )
    }
    subMit() {
        let cnl = this.state.cnl;
        let pwy = this.state.pwy;
        if (!checkInt(cnl)) {
            message.info('请输入有效数字');
            return;
        }

        let param = {
            Mac: '',
            Sys: '',
            Fwt: 3,//短信3
            Pwy: pwy,//支付方式
            Cnl: cnl * 1000,//支付金额
        }
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
                },
                (err) => {
                    this.Loading(false);
                    message.error('error');
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
        let p = new Promise((resolve, reject) => {
            this.setState({
                msgurl: value.Url,
                msgpid: value.PidStr
            });
            resolve('url设置成功');
        });
        return p;
    }

    changeModal(value) {
        this.setState({
            modalshow: value,
        });
    }
    changeCnl(e) {
        this.setState({
            cnl: e,
        });
    }
    onChangePwy(e) {
        this.setState({
            pwy: e.target.value
        });
    }
    Loading(value) {
        this.setState({
            spinning: value,
        });
    }



}
export default Msg;