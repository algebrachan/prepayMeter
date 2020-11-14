import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, PageHeader } from 'antd';
import UserAccount from './UserAccount';
import RentLog from './RentLog';
import UserDevs from './UserDevs';
import RechargeLog from './RechargeLog';
import intl from 'react-intl-universal';

const { TabPane } = Tabs;
class UserInfo extends Component {

    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const keyid = arr[arr.length - 1];
        this.state = {
            keyid: keyid,
        }
    }
    render() {

        return (
            <div style={{ backgroundColor: '#fff', margin: 20, minHeight: 'calc(100vh - 104px)' }}>
                <PageHeader onBack={() => window.history.back()} title={intl.get('USER_INFO.INFO')} subTitle={this.state.keyid} />
                <Tabs>
                    <TabPane tab={intl.get('USER_INFO.ACT_INFO')} key="1">
                        <UserAccount />
                    </TabPane>
                    <TabPane tab={intl.get('USER_INFO.CRT_ORDER')} key="2">
                        <UserDevs />
                    </TabPane>
                    <TabPane tab={intl.get('USER_INFO.ORDER_LOG')} key="3">
                        <RentLog />
                    </TabPane>
                    <TabPane tab={intl.get('USER_INFO.PAY_LOG')} key="4">
                        <RechargeLog />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default withRouter(UserInfo);