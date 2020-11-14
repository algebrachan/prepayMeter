import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, PageHeader } from 'antd';
import RealTime from './RealTime';
import Record from './Record';
// import Settings from './Settings';
import MeterDetail from './MeterDetail';
import Control from './Control';
import MeterOrder from './MeterOrder';
import DtChart from './DtChart';
import Maintain from './Maintain';
import * as session from '../../../utils/Session';
import { AdminType } from '../../../utils/enum';

const actType = session.getLoginVertificate().Type;
const { TabPane } = Tabs;
class MeterInfo extends Component {

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
                <PageHeader onBack={() => window.history.back()} title="电表信息" subTitle={this.state.keyid} />
                <Tabs defaultActiveKey='0'>
                    <TabPane tab="电表详情" key="0">
                        <MeterDetail />
                    </TabPane>
                    <TabPane tab="实时数据" key="1">
                        <RealTime />
                    </TabPane>
                    <TabPane tab="数据报表" key="2">
                        <Record />
                    </TabPane>
                    <TabPane tab="电量图表" key="3">
                        <DtChart />
                    </TabPane>
                    <TabPane tab="订单查询" key="4">
                        <MeterOrder />
                    </TabPane>
                    <TabPane tab="控制" key="5">
                        <Control />
                    </TabPane>
                    {
                        actType === AdminType.SUPER_ADMIN ?
                            <TabPane tab="维护" key="6">
                                <Maintain />
                            </TabPane>
                            :
                            ""
                    }
                </Tabs>
            </div>
        );

    }
}
export default withRouter(MeterInfo);