import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, PageHeader } from 'antd';
import CInfoList from './CInfoList';
import GtwyDetail from './GtwyDetail';
import GtwyParam from './GtwyParam';
import Change from './Change';
import GtwyMaintain from './GtwyMaintain';
import { AdminType } from '../../../utils/enum';
import * as session from '../../../utils/Session';

const actType = session.getLoginVertificate().Type;

const { TabPane } = Tabs;
class CollectInfo extends Component {

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
                <PageHeader onBack={() => window.history.back()} title="采集器信息" subTitle={this.state.keyid} />

                <Tabs>
                    <TabPane tab="基本信息" key="1">
                        <GtwyDetail />
                    </TabPane>
                    <TabPane tab="下挂表计" key="2">
                        <CInfoList />
                    </TabPane>
                    {/* {actType === AdminType.SUPER_ADMIN ?
                        <TabPane tab="表计迁移" key="3">
                            <Change />
                        </TabPane>
                        : ''} */}
                    <TabPane tab="采集器参数" key="4">
                        <GtwyParam />
                    </TabPane>
                    {
                        actType === AdminType.SUPER_ADMIN ?
                            <TabPane tab="维护" key="5">
                                <GtwyMaintain />
                            </TabPane>
                            :
                            ''
                    }
                </Tabs>

            </div>
        );
    }
}
export default withRouter(CollectInfo);