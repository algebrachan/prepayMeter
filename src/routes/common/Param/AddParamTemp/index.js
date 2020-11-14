import React, { Component } from 'react';
import { PageHeader, Button, message, Spin, Modal } from 'antd';
import { getAdminPower } from '../../../../utils/api';
import { changeTimeStr2Min } from '../../../../utils/math';
// import * as session from '../../../../utils/Session';
import { isNumber } from '../../../../utils/math';
import { trim } from '../../../../utils/string';
import { modifyMeterParamTmp } from '../../../../utils/api';
import './style.css';
import ParamTempSet from '../ParamTempSet';
import intl from 'react-intl-universal';
import Name from './Name';

class AddParamTemp extends Component {
    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const sys = arr[1];
        this.state = {
            system: sys,
            authority: {
                Right: [],
                Rtbl: false,
                Rate: false,
                Step: false,
                Tmctl: false,
                Ratio: false,
                Swh: false,
            },
            loading: false,
        }
        this.requestRight = this.requestRight.bind(this);
        this.changeLoad = this.changeLoad.bind(this);
        this.confirmSet = this.confirmSet.bind(this);
    }

    render() {
        return (
            <div style={{ backgroundColor: '#fff', margin: 20, minHeight: 'calc(100vh - 104px)' }}>
                <PageHeader onBack={() => window.history.back()} title="添加参数信息" />
                <Spin spinning={this.state.loading}>
                    <Button className="syspre_param_add_btn" type='primary' onClick={() => this.confirmSet()}>设置</Button>
                    <Name onRef={(ref) => { this.total = ref }} />
                    <ParamTempSet authority={this.state.authority} onRef={(ref) => { this.child = ref }} />
                </Spin>
            </div>
        );
    }

    componentDidMount() {
        this.requestRight();

    }
    //请求权限
    requestRight() {
        // let keyid = session.getLoginVertificate().AgtidStr;
        this.changeLoad(true);
        getAdminPower(
            (res) => {
                this.changeLoad(false);
                if (res.data.Status === 0) {
                    this.setState({
                        authority: res.data.Data
                    });
                } else {
                    message.error(res.data.Message);
                }

            },
            () => {
                this.changeLoad(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            });
    }

    confirmSet() {
        Modal.confirm({
            title: '请确认参数设置',
            okText: '确认',
            centered: true,
            cancelText: '取消',
            onOk: () => this.setData(),
            onCancel() {

            }
        });
    }
    setData() {


        let Name = this.total.state.name;
        let Desc = this.total.state.desc;
        let Hp = this.child.showChildState().normal.Hp;
        let Hu = this.child.showChildState().normal.Hu;
        let Keep = this.child.showChildState().normal.Keep;
        let Lu = this.child.showChildState().normal.Lu;
        let Ratio = this.child.showChildState().ratio.Ratio;

        let Tbl = this.child.showChildState().tbls.Tbl;
        let Rates = JSON.parse(JSON.stringify(this.child.showChildState().rates.Rates));//复制一个数组，引用对象复制，开辟了新的内存

        let Step = this.child.showChildState().step.Step;
        let Tmctl = { Tbls: [] };
        Tmctl.Tbls = [this.child.showChildState().tmctl1.Tbl, this.child.showChildState().tmctl2.Tbl];
        if (trim(Name).length === 0) {
            message.warning("名称不能为空");
            return;
        }
        if (Name.length > 20) {
            message.warning("名称不能超过20个字符长度");
            return;
        }
        if (Desc.length > 60) {
            message.warning("描述不能超过60个字符长度");
            return;
        }
        // 校验费率
        for (let i = 0; i < 4; i++) {
            Rates[i] = Rates[i] === "" ? "0" : Rates[i];
            if (!isNumber(Rates[i])) {
                message.warning('费率请输入数字');
                return;
            }
        }
        // 费率赋值操作
        for (let i = 0; i < 4; i++) {
            let rate_tmp = parseFloat(Rates[i]);
            let rate = Math.floor(rate_tmp * 1000) / 1000;
            if (rate >= 10) {
                message.warning('费率请输入小于10的数字');
                return;
            }
            Rates[i] = rate * 1000;
        }

        // Tbl非空处理
        for (let j = 0; j < Tbl.Rtis.length; j++) {
            Tbl.Rtis[j].Tim = Tbl.Rtis[j].Tim === "" ? "00:00" : Tbl.Rtis[j].Tim
        }

        // Tbl校验问题
        for (let h = 1; h < Tbl.Rtis.length; h++) {
            let pretime = changeTimeStr2Min(Tbl.Rtis[h - 1].Tim);
            let thistime = changeTimeStr2Min(Tbl.Rtis[h].Tim);
            if (pretime > thistime) {
                message.warning('时段表时间顺序有误');
                return;
            }
        }
        //Tmctl非空处理
        for (let a = 0; a < 2; a++) {
            for (let b = 0; b < Tmctl.Tbls[a].Tis.length; b++) {
                Tmctl.Tbls[a].Tis[b].Start = Tmctl.Tbls[a].Tis[b].Start === "" ? "00:00" : Tmctl.Tbls[a].Tis[b].Start
                Tmctl.Tbls[a].Tis[b].End = Tmctl.Tbls[a].Tis[b].End === "" ? "00:00" : Tmctl.Tbls[a].Tis[b].End
            }
        }
        // 阶梯计价
        for (let i = 0; i < Step.Sps.length; i++) {
            Step.Sps[i].Engy = Step.Sps[i].Engy === "" ? "0" : Step.Sps[i].Engy;
            Step.Sps[i].Exp = Step.Sps[i].Exp === "" ? "0" : Step.Sps[i].Exp;
            if (!isNumber(Step.Sps[i].Engy)) {
                message.warning('阶梯计价请输入数字');
                return;
            }
            if (!isNumber(Step.Sps[i].Exp)) {
                message.warning('阶梯计价请输入数字');
                return;
            }
        }
        const param = {
            Action: 1,
            Mac: '',
            Keyid: '',
            Name: Name,
            Desc: Desc,
            Sys: '',
            Tbl: Tbl,
            Ratio: Ratio,
            Rates: Rates,
            Step: Step,
            Tmctl: Tmctl,
            Hu: Hu,
            Lu: Lu,
            Hp: Hp,
            Keep: Keep,
        }

        this.changeLoad(true);
        modifyMeterParamTmp(param,
            (res) => {

                this.changeLoad(false);
                if (res.data.Status === 0) {
                    //重定向
                    message.success(`${intl.get('COMMON_MESSAGE.OPER_SUCS')}`);
                    this.props.history.push(`/${this.state.system}/home/param/template`);
                } else {
                    message.error(res.data.Message);
                }
            },
            () => {
                this.changeLoad(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            })
    }

    changeLoad(value) {
        this.setState({
            loading: value,
        });
    }
}

export default AddParamTemp;