import React, { Component } from 'react';
import { Modal, Typography, InputNumber, Radio, Row, Col, message } from 'antd';


class RechargeSmsModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cny: 100,
            pwy: 1,
        }
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    render() {

        return (
            <Modal
                title='短信充值'
                visible={this.props.show}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                destroyOnClose
                centered >

                <Row type='flex' align='middle' style={{ marginTop: 10 }}>
                    <Col span={4} >短信单价</Col>
                    <Col span={8} >

                        <Typography.Text style={{ color: 'orange', fontSize: 20, fontWeight: 'bold' }}>0.1元/条</Typography.Text>
                    </Col>
                </Row>
                <Row type='flex' align='middle' style={{ marginTop: 10 }}>
                    <Col span={4} >短信数量</Col>
                    <Col span={8} >
                        <Typography.Text style={{ color: 'green', fontSize: 20, fontWeight: 'bold' }}>{this.state.cny * 10}</Typography.Text>
                    </Col>
                </Row>

                <Row type='flex' align='middle' style={{ marginTop: 10 }}>
                    <Col span={4} >充值金额</Col>
                    <Col span={8} >
                        <InputNumber
                            autoComplete='off'
                            value={this.state.cny}
                            onChange={(e) => this.changeCny(e)}
                            min={10}
                            max={10000}
                            precision={0}
                            step={10} />
                    </Col>

                </Row>

                <Row type='flex' align='middle' style={{ marginTop: 10 }}>
                    <Col span={4}>支付方式</Col>
                    <Col span={8}>
                        <Radio.Group onChange={(e) => { this.setState({ pwy: e.target.value }) }} value={this.state.pwy}>
                            <Radio value={1}>微信</Radio>
                            {/* <Radio value={2}>支付宝</Radio> */}
                        </Radio.Group>
                    </Col>
                </Row>

            </Modal>

        );
    }

    changeCny(val) {
        this.setState({
            cny: val
        });
    }

    handleOk = () => {
        if (!(this.state.cny >= 10 && this.state.cny <= 10000)) {
            message.error('请输入正确的充值金额')
            return;
        }
        this.props.onOk(this.state.cny, this.state.pwy);
    }

    handleCancel = () => {
        this.props.onCancel();
    }
}

export default RechargeSmsModal;
