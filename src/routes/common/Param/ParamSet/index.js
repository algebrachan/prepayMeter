import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PageHeader } from 'antd';
import EditParam from './EditParam';
class ParamSet extends Component {

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
                <PageHeader onBack={() => window.history.back()} title="参数信息" subTitle={this.state.keyid} />
                <EditParam />
            </div>
        );
    }
}
export default withRouter(ParamSet);