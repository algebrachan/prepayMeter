import React, { Component } from 'react';
import { Row, Col, message, Spin } from 'antd';
import './style.css';
import DataShow from './DataShow';
import { getAgentStic } from '../../../../utils/api';
import { getAgentMeterConnStic } from '../../../../utils/api';
import { getLoginVertificate } from '../../../../utils/Session';
import DevUseChart from './DevUseChart';
import DtUseChart from './DtUseChart';
import FundStic from './FundStic';
import intl from 'react-intl-universal';
class AgentHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data1: {
                Daily: [],
                Ddt: 0,
                Dincm: 0,
                Mdt: 0,
                Mincm: 0,
                Ydt: 0,
                Yincm: 0,
            },
            data2: {
                Total: 0,
                Normal: 0,
                Latent: 0,
                Err: 0,
            },
            spinning1: false,
            spinning2: false,
        }
        this.requestData1 = this.requestData1.bind(this);
        this.requestData2 = this.requestData2.bind(this);
    }

    render() {
        return (
            <div className="agent_home_root">
                <Row>
                    <Col span={16}>
                        <Row>
                            <Col span={24} style={{ padding: 10 }}>
                                <Spin spinning={this.state.spinning1}>
                                    <DataShow data={this.state.data1} />
                                </Spin>
                            </Col>
                            <Col span={24} style={{ padding: 10 }}>
                                <Spin spinning={this.state.spinning1}>
                                    <DtUseChart data={this.state.data1.Daily} />
                                </Spin>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8} style={{ padding: 10, paddingTop: 20 }}>
                        <Spin spinning={this.state.spinning2}>
                            <DevUseChart data={this.state.data2} />
                        </Spin>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FundStic />
                    </Col>
                </Row>

            </div>
        );
    }
    componentDidMount() {
        this.requestData1();
        this.requestData2();
    }
    loading1(spinning) {
        this.setState({
            spinning1: spinning,
        })
    }
    loading2(spinning) {
        this.setState({
            spinning2: spinning,
        })
    }
    requestData1() {
        this.loading1(true);
        // let agtid = getLoginVertificate().Agtid;
        getAgentStic(
            (res) => {
                if (res.data.Status === 0) {
                    this.setState({
                        data1: res.data.Data,
                    });
                }
                else {
                    message.error(res.data.Message);
                }
                this.loading1(false);
            },
            () => {
                this.loading1(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            });
    }
    requestData2() {
        this.loading2(true);
        let agtid = getLoginVertificate().Agtid;
        getAgentMeterConnStic(agtid,
            (res) => {
                if (res.data.Status === 0) {
                    this.setState({
                        data2: res.data.Data,
                    });
                }
                else {
                    message.info(res.data.Message);
                }
                this.loading2(false);
            },
            () => {
                this.loading2(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            });
    }


}

export default AgentHome;