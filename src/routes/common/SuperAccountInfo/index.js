import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, PageHeader } from 'antd';
import Authority from './Authority';
import intl from 'react-intl-universal';


const { TabPane } = Tabs;
class SuperAccountInfo extends Component {

    constructor(props) {
        super(props);
        const pathname = props.location.pathname;
        const arr = pathname.split('/');
        const keyid = arr[arr.length - 1];
        this.state = {
            keyid: keyid,
        }

    }


    render() {

        return (
            <div style={{ backgroundColor: '#fff', margin: 20, minHeight: 'calc(100vh - 104px)' }}>
                <PageHeader onBack={() => window.history.back()} title={intl.get('AGENT_INFO.INFO')} subTitle={this.state.keyid} />
                <Tabs>
                    <TabPane tab={intl.get('AGENT_INFO.AUTH.MANAGE')} key="0">
                        <Authority />
                    </TabPane>

                </Tabs>

            </div>
        );
    }
}
export default withRouter(SuperAccountInfo);