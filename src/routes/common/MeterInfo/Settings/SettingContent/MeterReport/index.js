import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Typography, Input, Switch, Button, Modal, Card } from 'antd';
import './style.css';


class MeterReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    a: 1,
                    b: 2,
                    c: 3,
                    d: 4,
                    e: 5,
                    f: 6,
                    g: true,

                },
                {
                    a: 1,
                    b: 2,
                    c: 3,
                    d: 4,
                    e: 5,
                    f: 6,
                    g: true,

                },
            ],
        }

    }


    render() {

        return (
            <Fragment>
                <div style={{ margin: 20 }}>
                    <div >
                        <Button style={{ marginBottom: 20, marginLeft: 10 }} type='primary' onClick={() => this.requestData()}>{intl.get('COMMON_BTN.REFRESH')}</Button>
                        <Button style={{ marginBottom: 20, marginLeft: 10 }} type='primary' onClick={() => this.confirmSet()}>设置</Button>
                        <Button style={{ marginBottom: 20, marginLeft: 10 }} type='primary' onClick={() => this.resetData()}>恢复默认</Button>
                        <Button style={{ marginBottom: 20, marginLeft: 10 }} type='primary' onClick={() => this.addDataList()}>新增数据组</Button>
                    </div>
                    {this.state.data.map((item, index) => {
                        return (
                            <Card style={{ width: 400, margin: 10, float: 'left' }}>
                                <Row>
                                    <Col>
                                        <Typography.Text style={{ fontSize: 15 }}>{`上报数据组${index + 1}：`}</Typography.Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div style={{ display: 'inline-block', margin: 5 }}>
                                            <Typography.Text style={{ width: 100, display: 'inline-block', textAlign: 'right' }}>类号：</Typography.Text>
                                            <Input placeholder='请输入类号'
                                                onChange={(e) => this.onChangeClass(e, index)}
                                                value={item.a}
                                                style={{ width: 200, display: 'inline-block' }} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div style={{ display: 'inline-block', margin: 5 }}>
                                            <Typography.Text style={{ width: 100, display: 'inline-block', textAlign: 'right' }}>起始ID：</Typography.Text>
                                            <Input placeholder='请输入起始ID'
                                                onChange={(e) => this.onChangeId(e, index)}
                                                value={item.b}
                                                style={{ width: 200, display: 'inline-block' }} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div style={{ display: 'inline-block', margin: 5 }}>
                                            <Typography.Text style={{ width: 100, display: 'inline-block', textAlign: 'right' }}>总项数：</Typography.Text>
                                            <Input placeholder='请输入总项数'
                                                onChange={(e) => this.onChangeTotal(e, index)}
                                                value={item.c}
                                                style={{ width: 200, display: 'inline-block' }} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div style={{ display: 'inline-block', margin: 5 }}>
                                            <Typography.Text style={{ width: 100, display: 'inline-block', textAlign: 'right' }}>数据长度：</Typography.Text>
                                            <Input placeholder='请输入数据长度'
                                                onChange={(e) => this.onChangeLength(e, index)}
                                                value={item.d}
                                                style={{ width: 200, display: 'inline-block' }} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div style={{ display: 'inline-block', margin: 5 }}>
                                            <Typography.Text style={{ width: 100, display: 'inline-block', textAlign: 'right' }}>上报间隔：</Typography.Text>
                                            <Input placeholder='请输入上报间隔'
                                                onChange={(e) => this.onChangeRInterval(e, index)}
                                                value={item.e}
                                                style={{ width: 200, display: 'inline-block' }} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div style={{ display: 'inline-block', margin: 5 }}>
                                            <Typography.Text style={{ width: 100, display: 'inline-block', textAlign: 'right' }}>存储间隔：</Typography.Text>
                                            <Input placeholder='请输入存储间隔'
                                                onChange={(e) => this.onChangeSInterval(e, index)}
                                                value={item.f}
                                                style={{ width: 200, display: 'inline-block' }} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div style={{ display: 'inline-block', margin: 5 }}>
                                            <Typography.Text style={{ width: 100, display: 'inline-block', textAlign: 'right' }}>有效标志：</Typography.Text>
                                            <Switch
                                                checkedChildren="有效" unCheckedChildren="无效"
                                                checked={item.g}
                                                onChange={(checked) => this.onChangeValid(checked, index)} />
                                        </div>
                                    </Col>
                                </Row>
                                <div>
                                    <Button type='danger' size='small'
                                        onClick={() => this.deleteDataList(index)}
                                        style={{ marginLeft: 50, marginTop: 20 }}
                                    >删除数据组</Button>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            </Fragment>
        );
    }
    onChangeClass(e, index) {
        let data = this.state.data;
        data[index].a = e.target.value;
        this.setState({
            data: data,
        })
    }
    onChangeId(e, index) {
        let data = this.state.data;
        data[index].b = e.target.value;
        this.setState({
            data: data,
        })
    }
    onChangeTotal(e, index) {
        let data = this.state.data;
        data[index].c = e.target.value;
        this.setState({
            data: data,
        })
    }
    onChangeLength(e, index) {
        let data = this.state.data;
        data[index].d = e.target.value;
        this.setState({
            data: data,
        })
    }
    onChangeRInterval(e, index) {
        let data = this.state.data;
        data[index].e = e.target.value;
        this.setState({
            data: data,
        })
    }
    onChangeSInterval(e, index) {
        let data = this.state.data;
        data[index].f = e.target.value;
        this.setState({
            data: data,
        })
    }
    onChangeValid(checked, index) {
        let data = this.state.data;
        data[index].g = checked;
        this.setState({
            data: data,
        })
    }

    deleteDataList(index) {
        let data = this.state.data;
        let temp = [];
        for (let i = 0; i < data.length; i++) {
            if (i !== index) {
                temp = [...temp, data[i]];
            }
        }
        this.setState({
            data: temp,
        })
    }

    addDataList() {
        let data = this.state.data;
        const temp = {
            a: 0,
            b: 0,
            c: 0,
            d: 0,
            e: 0,
            f: 0,
            g: false,
        };
        data = [...data, temp];
        this.setState({
            data: data,
        });
    }

    requestData() {

    }
    confirmSet() {
        Modal.confirm({
            title: '确认要设置',
            content: '当设备再次上线时系统会将参数设置到设备',
            okText: '确认',
            okType: 'danger',
            centered: true,
            cancelText: '取消',
            onOk: () => this.setData(),
            onCancel() {
            },
        });
    }

    setData() {
    }

    resetData() {
    }

}
export default withRouter(MeterReport);