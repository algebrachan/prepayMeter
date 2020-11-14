import React, { Component } from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import intl from 'react-intl-universal';
import './style.css';

class DataShow extends Component {


    render() {

        return (
            <div className="agent_home_datashow_root">
                <Row gutter={16}>
                    <Col span={8} style={{ padding: 10 }}>
                        <Card title={intl.get('HOMEPAGE.DATASHOW.DATA_TODAY')} headStyle={{ color: '#596e7f', fontSize: 20 }} className="agent_home_card" >
                            <div className="agent_home_item_root">
                                <Statistic title={intl.get('HOMEPAGE.DATASHOW.ELECT')} value={this.props.data.Ddt / 1000000} precision={3}
                                    valueStyle={{ color: '#5f6368', fontWeight: 600, fontSize: 30 }}
                                    className="agent_home_item_data_left" />
                                {/* <Statistic title="收入(元)" value={this.props.data.Dincm / 1000} precision={3}
                                    valueStyle={{ color: '#cf1322', fontWeight: 600, fontSize: 30 }}
                                    className="agent_home_item_data_right" /> */}
                            </div>
                        </Card>
                    </Col>
                    <Col span={8} style={{ padding: 10 }}>
                        <Card title={intl.get('HOMEPAGE.DATASHOW.DATA_MONTH')} headStyle={{ color: '#596e7f', fontSize: 20 }} className="agent_home_card">
                            <div className="agent_home_item_root">
                                <Statistic title={intl.get('HOMEPAGE.DATASHOW.ELECT')} value={this.props.data.Mdt / 1000000} precision={3}
                                    valueStyle={{ color: '#5f6368', fontWeight: 600, fontSize: 30 }}
                                    className="agent_home_item_data_left" />
                                {/* <Statistic title="收入(元)" value={this.props.data.Mincm / 1000} precision={3}
                                    valueStyle={{ color: '#cf1322', fontWeight: 600, fontSize: 30 }}
                                    className="agent_home_item_data_right" /> */}
                            </div>
                        </Card>
                    </Col>
                    <Col span={8} style={{ padding: 10 }}>
                        <Card title={intl.get('HOMEPAGE.DATASHOW.DATA_YEAR')} headStyle={{ color: '#596e7f', fontSize: 20 }} className="agent_home_card">
                            <div className="agent_home_item_root">
                                <Statistic title={intl.get('HOMEPAGE.DATASHOW.ELECT')} value={this.props.data.Ydt / 1000000} precision={3}
                                    valueStyle={{ color: '#5f6368', fontWeight: 600, fontSize: 30 }}
                                    className="agent_home_item_data_left" />
                                {/* <Statistic title="收入(元)" value={this.props.data.Yincm / 1000} precision={3}
                                    valueStyle={{ color: '#cf1322', fontWeight: 600, fontSize: 30 }}
                                    className="agent_home_item_data_right" /> */}
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default DataShow;