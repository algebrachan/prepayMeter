import React, { Component } from 'react';
import './style.css';
import { Icon, Row, Col, } from 'antd';

class DataShow extends Component {

    render() {

        return (
            <div>
                <Row justify='center' type='flex' gutter={16}>
                    <Col span={6}>
                        <div className="super_home_datapre_item " >
                            <div className="super_home_datapre_item_title">
                                总计
                            </div>
                            <div className="super_home_datapre_item_content">
                                <Icon className="super_home_datapre_item_icon icon_red" type="money-collect"  />
                                <div className="super_home_datapre_item_data" >
                                    <div className="super_home_datapre_item_label">
                                        {'收入：' + this.props.data.Incm.Tincm / 1000 + '元'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>

                        <div className="super_home_datapre_item ">
                            <div className="super_home_datapre_item_title">
                                日统计
                                        </div>
                            <div className="super_home_datapre_item_content">
                                <Icon className="super_home_datapre_item_icon icon_green" type="money-collect" />
                                <div className="super_home_datapre_item_data">
                                    <div className="super_home_datapre_item_label">
                                        {'收入：' + this.props.data.Incm.Dincm / 1000 + '元'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="super_home_datapre_item " >
                            <div className="super_home_datapre_item_title">
                                月统计
                                        </div>
                            <div className="super_home_datapre_item_content">
                                <Icon className="super_home_datapre_item_icon icon_blue" type="money-collect" />
                                <div className="super_home_datapre_item_data">
                                    <div className="super_home_datapre_item_label">
                                        {'收入：' + this.props.data.Incm.Mincm / 1000 + '元'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="super_home_datapre_item ">
                            <div className="super_home_datapre_item_title">
                                年统计
                                        </div>
                            <div className="super_home_datapre_item_content">
                                <Icon className="super_home_datapre_item_icon icon_yellow" type="money-collect" />
                                <div className="super_home_datapre_item_data">
                                    <div className="super_home_datapre_item_label">
                                        {'收入：' + this.props.data.Incm.Yincm / 1000 + '元'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default DataShow;