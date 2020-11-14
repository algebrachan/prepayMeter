import React, { Component } from 'react';
import { Row, Col, Button, Modal, Spin, message, Select, Anchor } from 'antd';
import { withRouter } from 'react-router-dom';
import * as session from '../../../../../utils/Session';
import { searchGroups, setTemplateToGroup, getAdminPower } from '../../../../../utils/api';
import Normal from './Normal';
import Ratio from './Ratio';
import Rates from './Rates';
import Sps from './Sps';
import Tmctl from './Tmctl';
import Tbls from './Tbls';
import intl from 'react-intl-universal';
import './style.css';

const { Option } = Select;
const { Link } = Anchor;
class EditParam extends Component {

    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const keyid = arr[arr.length - 1];
        this.state = {
            keyid: keyid,
            grouplist: [],
            showGroupModal: false,
            gpidval: '',
            gpspin: false,
            authority: {
                Right: [],
                Rtbl: false,
                Rate: false,
                Step: false,
                Tmctl: false,
                Ratio: false,
                Swh: false,
            },
            data: {

                tbls: [
                    { Tim: '00:00', Rate: '1' },
                    { Tim: '00:00', Rate: '1' },
                    { Tim: '00:00', Rate: '1' },
                    { Tim: '00:00', Rate: '1' },
                    { Tim: '00:00', Rate: '1' },
                    { Tim: '00:00', Rate: '1' },
                    { Tim: '00:00', Rate: '1' },
                    { Tim: '00:00', Rate: '1' },
                ],//时段费率表
                rates: [
                    { value: '', key: 1 },
                    { value: '', key: 2 },
                    { value: '', key: 3 },
                    { value: '', key: 4 },

                ],//费率
                sps: [
                    { engy: '', exp: '' },
                ],//阶梯计价
                tmctl: [
                    { start: '', end: '' },
                ],//时段控制
                ratio: '',//电能系数
                ovrdt: '',//允许透支额度
                hu: '',//电压上限
                lu: '',//电压下限
                hp: '',//功率上限
                alm: '',//报警额度
                mlp: '',//最大功率限定值
                keep: false,//保电

            },
            spinning: false,
        }
        this.loading = this.loading.bind(this);
        this.requestRight = this.requestRight.bind(this);
    }

    render() {
        const gpoptions = this.state.grouplist.map(item => <Option key={item.key} value={item.key}>{item.Name}</Option>);
        return (
            <div className="syspre_param_info_root">
                <Button style={{ marginBottom: 20, marginLeft: 10 }} type='primary' onClick={() => this.confirmSet()}>保存</Button>
                <Button style={{ marginBottom: 20, marginLeft: 10 }} type='primary' onClick={() => this.reFresh()}>{intl.get('COMMON_BTN.REFRESH')}</Button>
                <Button style={{ marginBottom: 20, marginLeft: 10 }} type="primary" icon="edit" onClick={() => this.setGroup()}>使用模板</Button>

                <Spin spinning={this.state.spinning}>
                    <Row>
                        <Col span={12}>
                            {this.state.authority.Rate ? <Rates fatherData={(obj) => this.setFatherData(obj)} data={this.state.data} /> : ''}
                            {this.state.authority.Rtbl ? <Tbls fatherData={(obj) => this.setFatherData(obj)} data={this.state.data} /> : ''}
                            {this.state.authority.Step ? <Sps fatherData={(obj) => this.setFatherData(obj)} data={this.state.data} /> : ''}
                            {this.state.authority.Tmctl ? <Tmctl fatherData={(obj) => this.setFatherData(obj)} data={this.state.data} /> : ''}
                            {this.state.authority.Ratio ? <Ratio fatherData={(obj) => this.setFatherData(obj)} data={this.state.data} /> : ''}

                            <Normal fatherData={(obj) => this.setFatherData(obj)} data={this.state.data} />
                        </Col>
                        <Col span={6}>
                            <Anchor className="syspre_param_info_anchor">
                                {this.state.authority.Rate ? <Link href="#param_rates" title="费率" /> : ''}
                                {this.state.authority.Rtbl ? <Link href="#param_tbls" title="费率时段表" /> : ''}
                                {this.state.authority.Step ? <Link href="#param_sps" title="阶梯计价" /> : ''}
                                {this.state.authority.Tmctl ? <Link href="#param_tmctl" title="时段控制" /> : ''}
                                {this.state.authority.Ratio ? <Link href="#param_ratio" title="电能系数" /> : ''}
                                <Link href="#param_normal" title="其他" />
                            </Anchor>
                        </Col>


                    </Row>

                </Spin>
                <Modal
                    title='选择分组'
                    visible={this.state.showGroupModal}
                    onOk={() => this.handleGpOk()}
                    onCancel={() => this.showGp(false)}
                    destroyOnClose
                    centered
                    width={400}
                >
                    <Spin spinning={this.state.gpspin}>
                        <div className="syspre_param_info_select">
                            将当前参数模板设置到分组
                    </div>
                        <Select placeholder='请选择分组'
                            onChange={(value) => this.hdChangeGp(value)} style={{ width: 300 }}>
                            {gpoptions}
                        </Select>
                    </Spin>

                </Modal>
            </div>
        );
    }

    componentDidMount() {
        // this.requestData();
        this.requestRight();
    }

    requestData() {

    }
    //请求权限
    requestRight() {
        let keyid = session.getLoginVertificate().AgtidStr;
        getAdminPower(
            (res) => {
                if (res.data.Status === 0) {
                    this.setState({
                        authority: res.data.Data
                    });
                } else {
                    message.error(res.data.Message);
                }

            },
            () => {
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            });
    }

    reFresh() {
        this.requestRight();
    }
    gpload(value) {
        this.setState({
            gpload: value,
        });
    }

    showGp(value) {
        this.setState({
            showGroupModal: value
        });
    }
    setGroup() {
        searchGroups('', 0, 20,
            (res) => {
                if (res.data.Status === 0) {
                    this.setState({
                        grouplist: res.data.Data.Objs,
                    });
                } else {
                    message.error(res.data.Message);
                }
            },
            () => {
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            });
        this.showGp(true);
    }
    hdChangeGp(value) {
        this.setState({
            gpidval: value,
        });
    }
    handleGpOk() {
        let tmpid = this.state.keyid;
        let gpid = this.state.gpidval;
        this.gpload(true);
        setTemplateToGroup(tmpid, gpid,
            (res) => {
                this.gpload(false);
                if (res.data.Status === 0) {
                    message.success(`${intl.get('COMMON_MESSAGE.SET_SUCS')}`);
                    this.showGp(false);
                } else {
                    message.error(res.data.Message);
                }
            },
            () => {
                this.gpload(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            }
        );
    }
    loading(value) {
        this.setState({
            spinning: value,
        });
    }
    setFatherData(obj) {
        this.setState({
            data: obj,
        });
    }

    resetData() {
    }

    confirmSet() {
        Modal.confirm({
            title: '请确认设置参数',
            okText: '确认',
            centered: true,
            cancelText: '取消',
            onOk: () => this.setData(),
            onCancel() {
            }
        });
    }

    handlePmOk() {
    }

    setData() {
        let action = 2;
        let tbls = this.state.data.tbls;
        let keyid = this.state.data.keyid;
        let ratio = this.state.data.ratio;
        let rates = this.state.data.rates;
        let sps = this.state.data.sps;
        let tmctl = this.state.data.tmctl;
        let hu = this.state.data.hu;
        let lu = this.state.data.lu;
        let hp = this.state.data.hp;
        let alm = this.state.data.alm;
        let mlp = this.state.data.mlp;
        let ovrdt = this.state.data.ovrdt;
        let keep = this.state.data.keep;

        const param = {
            Action: action,
            Tbls: tbls,
            Keyid: keyid,
            Ratio: ratio,
            Rates: rates,
            Sps: sps,
            Tmctl: tmctl,
            Hu: hu,
            Lu: lu,
            Hp: hp,
            Alm: alm,
            Mlp: mlp,
            Ovrdt: ovrdt,
            Keep: keep
        }
        this.loading(true);
        // modifyMeterParamTmp(param,
        //     (res) => {
        //         this.loading(false);
        //         if (res.data.Status === 0) {
        //             message.success('设置成功');
        //         } else {
        //             message.error(res.data.Message);
        //         }
        //     },
        //     () => {
        //         this.loading(false);
        //         message.error('网络连接异常');
        //     });

    }
}
export default withRouter(EditParam);