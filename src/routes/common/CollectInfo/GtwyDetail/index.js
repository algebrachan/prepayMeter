import React, { Component, Fragment } from 'react';
import { Descriptions, Spin, message, Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import { getGatewayInfo } from '../../../../utils/api';
import QRCode from 'qrcode.react';
import intl from 'react-intl-universal';
class GtwyDetail extends Component {
    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const sn = arr[arr.length - 1];
        this.state = {
            data: {
                key: 0,
                Keyid: 0,
                Devtp: 0,
                Usnam: 0,
                Agentid: 0,
                Locat: '',
                Istl: 0,
                Dirgp: 0,
                Absgp: 0,
                Room: 0,
                Gtwyid: 0,
                Gpnam: '',
                Tmpnam: '',
                ESN: '',
            },
            spinning: false,
            sn: sn,
        }
        this.requestData = this.requestData.bind(this);
    }

    render() {
        return (
            <Fragment>
                <div style={{ margin: 20 }}>
                    <Spin spinning={this.state.spinning}>
                        <Row type="flex" justify="center">
                            <Col span={12}>
                                <Descriptions bordered>
                                    <Descriptions.Item label="采集器名称" span={3}>{this.state.data.Usnam}</Descriptions.Item>
                                    <Descriptions.Item label="设备编号" span={3}>{this.state.data.key}</Descriptions.Item>
                                    <Descriptions.Item label="类型" span={3}>{this.state.data.Devtp}型</Descriptions.Item>
                                    <Descriptions.Item label="经销商ID" span={3}>{this.state.data.AgentidStr}</Descriptions.Item>
                                    <Descriptions.Item label="安装地址" span={3}>{this.state.data.Locat}</Descriptions.Item>
                                    {/* <Descriptions.Item label="是否安装" span={3}></Descriptions.Item> */}
                                    <Descriptions.Item label="二维码" span={3}><QRCode value={`${window.base_url}/${this.state.data.ESN}`} /></Descriptions.Item>

                                </Descriptions>
                            </Col>
                        </Row>
                    </Spin>
                </div>

            </Fragment>
        );
    }

    componentDidMount() {
        this.requestData();
    }

    loading(value) {
        this.setState({
            spinning: value,
        });
    }

    requestData() {
        this.loading(true);
        getGatewayInfo(
            this.state.sn,
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


export default withRouter(GtwyDetail);