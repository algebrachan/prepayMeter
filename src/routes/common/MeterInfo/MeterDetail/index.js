import React, { Component, Fragment } from 'react';
import { Descriptions, Spin, message, Typography, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { getMeterInfo } from '../../../../utils/api';
import { AdminType } from '../../../../utils/enum';
import * as meterModalCtors from '../../MeterList/EditMeterModal/store/actionCreators';
import * as session from '../../../../utils/Session';
import EditMeterModal from '../../MeterList/EditMeterModal';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
import './style.css';


const actType = session.getLoginVertificate().Type;
class MeterDetail extends Component {
    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const sn = arr[arr.length - 1];
        const sys = arr[1];
        this.state = {
            data: {
                Absgp: '',
                Agentid: 0,
                AgentidStr: '',
                Agtnam: '',
                Chgtp: 0,
                Cncfg: 0,
                CncfgStrs: [],
                Devtp: 0,
                Dirgp: 0,
                ESN: '',
                Gpnam: '',
                Gtwyid: 0,
                GtwyidStr: '',
                Gtwynam: '',
                Irmt: 0,
                Istl: 0,
                Keyid: 0,
                Locat: '',
                Online: false,
                Prtl: 0,
                Ptp: 0,
                Pwd: '',
                Room: 0,
                Rtp: 0,
                Sys: 0,
                Tmpid: 0,
                TmpidStr: '',
                Tmpnam: '',
                TransRatio: 0,
                Usnam: '',
                Wmd: 0,
                key: '',
            },
            spinning: false,
            sn: sn,
            system: sys,
        }
        this.requestData = this.requestData.bind(this);
    }

    render() {
        return (
            <Fragment>
                <div style={{ margin: 20 }}>
                    <Spin spinning={this.state.spinning}>
                        <Button style={{ fontSize: '10px', margin: 10 }} type='primary' onClick={() => this.requestData()}>{intl.get('COMMON_BTN.REFRESH')}</Button>
                        {actType === AdminType.SUPER_ADMIN ?
                            <Button style={{ fontSize: '10px', margin: 10 }} type='primary' onClick={() => this.onEdit()}>{intl.get('COMMON_BTN.EDIT')}</Button> : ''
                        }
                        <Descriptions bordered>
                            <Descriptions.Item label="电表名称" span={1}>{this.state.data.Usnam}</Descriptions.Item>
                            <Descriptions.Item label="设备编号" span={1}>{this.state.data.key}</Descriptions.Item>
                            <Descriptions.Item label="电表类型" span={1}>{this.state.data.Devtp === 1 ? '单相表' : '三相表'}</Descriptions.Item>
                            <Descriptions.Item label="通讯方式" span={1}>{this.state.data.Irmt === 1 ? '网络通讯' : 'RS485'}</Descriptions.Item>
                            <Descriptions.Item label="计价类型" span={1}>{this.state.data.Chgtp === 1 ? '按电计价' : '按时计价'}</Descriptions.Item>
                            <Descriptions.Item label="计费方式" span={1}>{this.state.data.Ptp === 1 ? '表计本地计费' : '系统后台计费'}</Descriptions.Item>
                            <Descriptions.Item label="通讯协议" span={1}>{this.state.data.Prtl === 2 ? 'DLT645协议' : 'LydOut协议'}</Descriptions.Item>
                            <Descriptions.Item label="费率类型" span={1}>{this.state.data.Rtp === 1 ? '单费率' : '多费率'}</Descriptions.Item>
                            <Descriptions.Item label="经销商" span={1}>{this.state.data.Agtnam}</Descriptions.Item>
                            {
                                this.state.data.Irmt != 0 ? "" :
                                    <Fragment>
                                        <Descriptions.Item label="采集器ID" span={1}><Typography.Text className='meter_detail_link' onClick={() => this.onGtwLink(this.state.data.GtwyidStr)}>{this.state.data.Gtwyid > 0 ? this.state.data.GtwyidStr : ""}</Typography.Text></Descriptions.Item>
                                        <Descriptions.Item label="采集器名称" span={2}>{this.state.data.Gtwynam}</Descriptions.Item>
                                    </Fragment>
                            }
                            <Descriptions.Item label="安装地址" span={1}>{this.state.data.Locat}</Descriptions.Item>
                            <Descriptions.Item label="是否安装" span={1}></Descriptions.Item>
                            <Descriptions.Item label="分组" span={1}>{this.state.data.Gpnam}</Descriptions.Item>
                            <Descriptions.Item label="参数模板" span={1}>
                                <Typography.Text className='meter_detail_link' onClick={() => this.onTmpLink(this.state.data.TmpidStr)}>{this.state.data.Tmpnam}</Typography.Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="接线方式" span={this.state.data.Wmd === 0 ? 2 : 1}>{this.state.data.Wmd === 0 ? '直接式' : '互感式'}</Descriptions.Item>
                            {
                                this.state.data.Wmd === 1 ?
                                    <Descriptions.Item label="CT变比"><Typography.Text strong='true' type='warning' style={{ fontSize: 16 }} keyboard='true' >{this.state.data.TransRatio}</Typography.Text></Descriptions.Item>
                                    :
                                    ""
                            }
                            <Descriptions.Item label="通讯配置" span={3}>{this.showCncfg(this.state.data.CncfgStrs)}</Descriptions.Item>
                            <Descriptions.Item label="小程序二维码" span={3}><QRCode value={`${window.base_url}/${this.state.data.ESN}`} /></Descriptions.Item>

                        </Descriptions>
                    </Spin>
                    <EditMeterModal />
                </div>

            </Fragment>
        );
    }

    componentDidMount() {
        this.requestData();
    }

    loading(spinning) {
        this.setState({
            spinning: spinning,
        });
    }
    showCncfg() {
        let cncfg = this.state.data.CncfgStrs;
        let imrt = this.state.data.Irmt;
        let str = "";
        if (imrt === 0) {

            if (Array.isArray(cncfg) && cncfg.length === 3) {
                let chkstr = "";
                switch (Number(cncfg[0])) {
                    case 0: chkstr = "无"; break;
                    case 1: chkstr = "偶"; break;
                    case 2: chkstr = "奇"; break;
                }
                let dbit = Number(cncfg[1]);
                let brate = Number(cncfg[2]);
                str = chkstr + "-" + dbit + "-" + brate;
                return str;
            }
        } else {
            return str;
        }
    }
    requestData() {
        this.loading(true);

        getMeterInfo(
            this.state.sn,
            (res) => {
                this.loading(false);
                if (res.data.Status === 0) {
                    this.setState(({
                        data: res.data.Data,
                    }));
                }
                else {
                    message.error(`${intl.get('COMMON_MESSAGE.RST_FAIL')}`);
                }
            },
            () => {
                this.loading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            })
    }

    onGtwLink(key) {

        this.props.history.push(`/${this.state.system}/home/collectinfo/${key}`);
    }

    onTmpLink(key) {
        this.props.history.push(`/${this.state.system}/home/param/look/${key}`);
    }

    onEdit() {
        let obj = undefined;
        let chk = '';
        let dbit = '';
        let brate = '';
        if (this.state.data.Irmt === 0) {
            let cncfg = this.state.data.CncfgStrs;
            chk = Number(cncfg[0]);
            dbit = Number(cncfg[1]);
            brate = Number(cncfg[2]);
        }
        obj = {
            meter_keyid: this.state.data.key,//表号
            meter_name: this.state.data.Usnam,//电表名称
            meter_agent: this.state.data.AgentidStr,//经销商ID
            meter_devtp: this.state.data.Devtp,//电表类型
            meter_ptp: this.state.data.Ptp,//计费方式
            meter_rtp: this.state.data.Rtp,//费率类型
            meter_chgtp: this.state.data.Chgtp,//计价类型
            meter_irmt: this.state.data.Irmt,//通讯方式
            meter_prtl: this.state.data.Prtl,//支持的协议
            meter_psw: this.state.data.Pwd,//645表密码
            meter_wmd: this.state.data.Wmd,//接线方式
            meter_ctrt: this.state.data.TransRatio,//互感系数 ct变比
            meter_chk: chk,//奇偶校验
            meter_dbit: dbit,//数据位
            meter_brate: brate,//波特率
        }
        this.props.showEditMeter(obj);
    }

}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {

    return {
        showEditMeter(obj) {
            dispatch(meterModalCtors.getEditAction(obj));
        },
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MeterDetail));