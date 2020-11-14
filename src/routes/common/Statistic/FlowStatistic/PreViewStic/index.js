import React, { Component, Fragment } from 'react';
import { Modal, Descriptions, Typography } from 'antd';
import intl from 'react-intl-universal';
import './style.css';

class PreViewStic extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Modal
                width={900}
                title={intl.get('COMMON_BTN.PREVIEW')}
                visible={this.props.show}
                onOk={this.handleOk}
                okText={intl.get('COMMON_BTN.PRINT')}
                onCancel={this.props.hide}
                destroyOnClose
                centered
            >
                <div id={'flow_stic_print'}>
                    <Descriptions title="流水账单" bordered>
                        <Descriptions.Item label="流水号" span={3}>{this.props.data.key}</Descriptions.Item>
                        <Descriptions.Item label="商品ID" span={3}>{this.props.data.Target}</Descriptions.Item>
                        <Descriptions.Item label="第三方平台交易单号" span={3}>{this.props.data.Evid}</Descriptions.Item>
                        <Descriptions.Item label="交易时间" span={3}>{this.props.data.UtcStr}</Descriptions.Item>
                        <Descriptions.Item label="交易详情" span={3}>{this.getTradeMode(this.props.data.Fwt, this.props.data.Pwy, this.props.data.Dir)}</Descriptions.Item>
                        <Descriptions.Item label="金额" span={3}><Typography.Text style={{ color: '#d86c14', font: '24' }}>{this.props.data.Cny}元</Typography.Text></Descriptions.Item>
                    </Descriptions>
                </div>
            </Modal>
        );
    }
    handleOk() {
        window.document.body.innerHTML = window.document.getElementById('flow_stic_print').innerHTML;
        window.print();
        window.location.reload();
    }

    getTradeMode(fwt, pwy, dir) {
        let res = "";
        switch (fwt) {
            case 1:
                res += "电表充值-";
                break;
            case 101:
                res += "电费结算-";
                break;
        }
        switch (pwy) {
            case 1:
                res += "微信-";
                break;
            case 2:
                res += "支付宝-";
                break;
            case 3:
                res += "现金-";
                break;
        }
        switch (dir) {
            case "in":
                res += "收入";
                break;
            case "out":
                res += "支出";
                break;
        }
        return (
            <Fragment>
                {res}
            </Fragment>
        );
    }
}

export default PreViewStic;