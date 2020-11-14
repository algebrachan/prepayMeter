import React, { Component, Fragment } from 'react';
import { Button, Descriptions, Typography, Spin, message } from 'antd';
import { withRouter } from 'react-router-dom';
import * as Api from '../../../../utils/api';
import RechargeModal from './RechargeModal';
import intl from 'react-intl-universal';
class UserAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRecharge: false,
            data: {
                Agent: 0,
                Agentid: 0,
                Balance: 0,
                Keyid: 0,
                Phone: 0,
                Usnam: 0,
                key: 0,

            },

            spinning: false,
        }
        this.requestData = this.requestData.bind(this);
        this.changeRechargeVisibile = this.changeRechargeVisibile.bind(this);
        this.rechargeClick = this.rechargeClick.bind(this);
    }

    render() {
        return (
            <Fragment>
                <div style={{ margin: 20 }}>
                    <Spin spinning={this.state.spinning}>
                        <Button style={{ marginBottom: 20 }} type='primary' onClick={this.requestData}>{intl.get('COMMON_BTN.REFRESH')}</Button>
                        {/* <Button style={{ marginBottom: 20, marginLeft: 20 }} type='default' onClick={this.rechargeClick}>充值</Button> */}
                        {/* <Button style={{ marginBottom: 20, marginLeft: 20 }} type='default' onClick={this.requestData}>冻结</Button>
                        <Button style={{ marginBottom: 20, marginLeft: 20 }} type='danger' onClick={this.requestData}>销户</Button> */}
                        <Descriptions bordered>

                            <Descriptions.Item label={intl.get('USER_LIST.ACCOUNT')} span={3}>{this.state.data.key}</Descriptions.Item>
                            <Descriptions.Item label={intl.get('USER_LIST.NAME')} span={3}>{this.state.data.Usnam}</Descriptions.Item>
                            {/* <Descriptions.Item label="账户余额" span={2}><Typography.Text style={{ color: '#d86c14' }}>{this.state.data.Balance / 1000}元</Typography.Text></Descriptions.Item> */}
                            {/* <Descriptions.Item label="经销商" span={3}>{this.state.data.Agent}</Descriptions.Item> */}
                            <Descriptions.Item label={intl.get('USER_LIST.PHONE')}  span={2}>{this.state.data.Phone}</Descriptions.Item>
                            {/* <Descriptions.Item label="经销商ID" span={3}>{this.state.data.Agentid}</Descriptions.Item> */}

                        </Descriptions>
                    </Spin>
                    <RechargeModal show={this.state.showRecharge} onHide={() => { this.changeRechargeVisibile(false) }} refresh={() => this.requestData()} />
                </div>
            </Fragment>
        );
    }

    componentDidMount() {
        this.requestData();
    }

    rechargeClick() {
        this.changeRechargeVisibile(true);
    }

    changeRechargeVisibile(visible) {
        this.setState(({
            showRecharge: visible,
        }));
    }

    loading(spinning) {
        this.setState({
            spinning: spinning,
        });
    }

    requestData() {
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const keyid = arr[arr.length - 1];
        this.loading(true);
        // (keyid, then, error)
        Api.getCustomerInfo(keyid,
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

}
export default withRouter(UserAccount);