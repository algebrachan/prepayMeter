import React, { Component, Fragment } from 'react';
import { Card, Checkbox, Button, Modal, message, Spin } from 'antd';
import { modifyAgentPower, getAgentPower } from '../../../../utils/api';
import { withRouter } from 'react-router-dom';
import intl from 'react-intl-universal';

// const aopts = [
//     `${intl.get('AGENT_INFO.AUTH.RPT')}`,
//     `${intl.get('AGENT_INFO.AUTH.RATE')}`,
//     `${intl.get('AGENT_INFO.AUTH.TP')}`,


//     `${intl.get('AGENT_INFO.AUTH.PC')}`,
//     `${intl.get('AGENT_INFO.AUTH.ER')}`,
//     `${intl.get('AGENT_INFO.AUTH.GATE')}`,
//     `${intl.get('AGENT_INFO.AUTH.ME')}`,
// ];
// const aopts = ['费率时段表', '费率', '阶梯计价', '时段控制', '电能系数', '拉合闸', "人工售电"];
let aopts = [];
class Authority extends Component {

    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const keyid = arr[arr.length - 1];
        this.state = {
            keyid: keyid,
            data: {
                Keyid: 0,//经销商ID
                Right: [],//checkbox数组
                Rate: false,//费率
                Ratio: false,//电能系数
                Rtbl: false,//费率时段表
                Step: false,//阶梯计价
                Swh: false,//拉合闸
                Tmctl: false,//时段控制
                Rechg: false,//人工售电
            },
            indeterminate: true,
            checkAll: false,
            spinning: false,
        }
        this.onChange = this.onChange.bind(this);
        this.loading = this.loading.bind(this);
        this.onCheckAllChange = this.onCheckAllChange.bind(this);
        this.requestData = this.requestData.bind(this);

    }


    render() {
        return (
            <Fragment>

                <Spin style={{ margin: 20 }} spinning={this.state.spinning}>
                    <Button style={{ marginBottom: 20, marginLeft: 10 }} type='primary' onClick={() => this.confirmSet()}>{intl.get('COMMON_BTN.SET')}</Button>
                    <Button style={{ marginBottom: 20, marginLeft: 10 }} type='primary' onClick={() => this.requestData()}>{intl.get('COMMON_BTN.REFRESH')}</Button>
                    <Card style={{ width: 500, margin: 10 }}>
                        <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                            <Checkbox
                                indeterminate={this.state.indeterminate}
                                onChange={this.onCheckAllChange}
                                checked={this.state.checkAll}
                                style={{ margin: 10 }}
                            >
                                {intl.get('AGENT_INFO.AUTH.SECT_ALL')}
                            </Checkbox>
                        </div>
                        <br />
                        <Checkbox.Group
                            onChange={this.onChange}
                            value={this.state.data.Right}
                        >
                            <Checkbox key='1' value='Rtbl'>{aopts[0]}</Checkbox>
                            <Checkbox key='2' value='Rate'>{aopts[1]}</Checkbox>
                            <Checkbox key='3' value='Step'>{aopts[2]}</Checkbox>
                            <Checkbox key='4' value='Tmctl'>{aopts[3]}</Checkbox>
                            <Checkbox key='5' value='Ratio'>{aopts[4]}</Checkbox>
                            <Checkbox key='6' value='Swh'>{aopts[5]}</Checkbox>
                            <Checkbox key='7' value='Rechg'>{aopts[6]}</Checkbox>
                        </Checkbox.Group>
                    </Card>
                </Spin>
            </Fragment>

        );
    }
    componentDidMount() {
        this.requestData();
        aopts = [
            `${intl.get('AGENT_INFO.AUTH.RPT')}`,
            `${intl.get('AGENT_INFO.AUTH.RATE')}`,
            `${intl.get('AGENT_INFO.AUTH.TP')}`,
            `${intl.get('AGENT_INFO.AUTH.PC')}`,
            `${intl.get('AGENT_INFO.AUTH.ER')}`,
            `${intl.get('AGENT_INFO.AUTH.GATE')}`,
            `${intl.get('AGENT_INFO.AUTH.ME')}`,
        ];
    }
    loading(value) {
        this.setState({
            spinning: value,
        });
    }
    onChange(checkedList) {
        let data = this.state.data;
        data.Right = checkedList;
        this.setState({
            data: data,
            indeterminate: !!checkedList.length && checkedList.length < aopts.length,
            checkAll: checkedList.length === aopts.length,
        });
    }

    onCheckAllChange(e) {
        let data = this.state.data;
        data.Right = e.target.checked ? ['Rtbl', 'Rate', 'Step', 'Tmctl', 'Ratio', 'Swh', 'Rechg'] : [];
        this.setState({
            data: data,
            indeterminate: false,
            checkAll: e.target.checked,
        });
    }

    confirmSet() {
        Modal.confirm({
            title: `${intl.get('AGENT_INFO.AUTH.TITLE')}`,
            centered: true,
            onOk: () => this.setData(),
            onCancel() {

            }
        });
    }
    setData() {
        let keyid = this.state.keyid
        let right = this.state.data.Right;

        const param = {
            Mac: '',
            Keyid: keyid,
            Right: right,
        }
        this.loading(true);
        modifyAgentPower(param,
            (res) => {
                this.loading(false);
                if (res.data.Status === 0 && res.data.Data) {
                    message.success(`${intl.get('COMMON_MESSAGE.SAVE_SUCS')}`);
                } else {
                    message.error(res.data.Message);
                }
            },
            () => {
                this.loading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);

            });
    }
    requestData() {
        let keyid = this.state.keyid;
        this.loading(true);
        getAgentPower(keyid,
            (res) => {
                this.loading(false);
                if (res.data.Status === 0) {
                    let checkedList = res.data.Data.Right;
                    this.setState({
                        data: res.data.Data,
                        indeterminate: !!checkedList.length && checkedList.length < aopts.length,
                        checkAll: checkedList.length === aopts.length,
                    });
                    message.success(`${intl.get('COMMON_MESSAGE.RST_SUCS')}`);
                } else {
                    message.error(res.data.Message);
                }
            },
            () => {
                this.loading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            });
    }

}
export default withRouter(Authority);