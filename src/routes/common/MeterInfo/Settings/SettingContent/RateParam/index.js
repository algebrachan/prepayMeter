import React, { Component, Fragment } from 'react';
import { Button, Form, Input, Col, Row, Modal, Spin, Icon, Switch, Popover, TimePicker, Card, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import './style.css';
import moment from 'moment';
const rateContent = (
    <div>
        <p>超过该阶梯度数额外价格</p>
    </div>
);
const timeContent = (
    <div>
        <p>时段开始和结束时间，一天最多支持4个时段</p>
    </div>
);
const timeFormat = 'HH:mm';
class RateParam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                a: [
                    { value: '' },
                    { value: '' },
                    { value: '' },
                    { value: '' },
                    { value: '' },
                    { value: '' },
                ],
                b: [
                    { degree: '', price: '' }
                ],
                c: '',
                d: '',
                e: true,
                f: '',
                g: { st: '', et: '' },
                h: [
                    { st: '', et: '' },
                ],
            },
            spinning: false,
        }

    }
    render() {
        let count1 = this.state.data.b.length;
        let count2 = this.state.data.h.length;

        return (
            <Fragment>
                <div style={{ margin: 20 }}>
                    <Button style={{ marginBottom: 20, marginLeft: 10 }} type='primary' onClick={() => this.requestData()}>{intl.get('COMMON_BTN.REFRESH')}</Button>
                    <Button style={{ marginBottom: 20, marginLeft: 10 }} type='primary' onClick={() => this.confirmSet()}>设置</Button>
                    <Button style={{ marginBottom: 20, marginLeft: 10 }} type='primary' onClick={() => this.resetData()}>恢复默认</Button>
                    <Spin spinning={this.state.spinning}>
                        <Card style={{ width: 700 ,borderRadius:10}}>

                            {this.state.data.a.map((item, index) => {
                                return (
                                    <Row>
                                        <Col>
                                            <div style={{ display: 'inline-block', margin: 5 }}>
                                                <Typography.Text style={{ width: 120, display: 'inline-block', textAlign: 'right' }}>{`费率${index + 1}：`}</Typography.Text>
                                                <Input placeholder='元/kWh'
                                                    onChange={(e) => this.onChangeRate(e, index)}
                                                    value={item.value}
                                                    style={{ width: 400, display: 'inline-block' }} />
                                            </div>
                                        </Col>
                                    </Row>
                                );
                            })}
                            {this.state.data.b.map((item, index) => {
                                return (
                                    <Row>
                                        <Col>
                                            <div style={{ display: 'inline-block', margin: 5 }}>
                                                <Popover content={rateContent} title={`阶梯${index + 1}`}>
                                                    <Typography.Text style={{ width: 120, display: 'inline-block', textAlign: 'right' }}>{`阶梯${index + 1}：`}</Typography.Text>
                                                </Popover>
                                                <Input placeholder='kWh'
                                                    onChange={(e) => this.onChangeSDegree(e, index)}
                                                    value={item.degree}
                                                    style={{ width: 200, display: 'inline-block' }} />
                                                <Input placeholder='每度电额外价格(元/kWh)'
                                                    onChange={(e) => this.onChangeSPrice(e, index)}
                                                    value={item.price}
                                                    style={{ width: 200, display: 'inline-block' }} />
                                                <Icon
                                                    className="dynamic_delete_button"
                                                    type="minus-circle-o"
                                                    onClick={() => this.removeStep(index)}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                );
                            })}
                            {count1 < 5 ?
                                <Row>
                                    <Col  >
                                        <div style={{ margin: 5 }}>
                                            <Button type="dashed" onClick={() => this.addStep()} className="rate_add_button" >
                                                <Icon type="plus" /> 新增阶梯
                                         </Button>
                                        </div>
                                    </Col>
                                </Row>
                                : ''}
                            <Row>
                                <Col>
                                    <div style={{ display: 'inline-block', margin: 5 }}>
                                        <Typography.Text style={{ width: 120, display: 'inline-block', textAlign: 'right' }}>允许透支额度：</Typography.Text>
                                        <Input placeholder='元'
                                            onChange={(e) => this.onChangeOver(e)}
                                            value={this.state.data.c}
                                            style={{ width: 400, display: 'inline-block' }} />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div style={{ display: 'inline-block', margin: 5 }}>
                                        <Typography.Text style={{ width: 120, display: 'inline-block', textAlign: 'right' }}>报警额度：</Typography.Text>
                                        <Input placeholder='元'
                                            onChange={(e) => this.onChangeAlarm(e)}
                                            value={this.state.data.d}
                                            style={{ width: 400, display: 'inline-block' }} />
                                            
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div style={{ display: 'inline-block', margin: 5 }}>
                                        <Typography.Text style={{ width: 120, display: 'inline-block', textAlign: 'right' }}>保电模式：</Typography.Text>
                                        <Switch
                                            checkedChildren="开" unCheckedChildren="关"
                                            checked={this.state.data.e}
                                            onChange={(checked) => this.onChangePro(checked)} />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div style={{ display: 'inline-block', margin: 5 }}>
                                        <Typography.Text style={{ width: 120, display: 'inline-block', textAlign: 'right' }}>最大功率限定值：</Typography.Text>
                                        <Input placeholder='kW'
                                            onChange={(e) => this.onChangeMaxP(e)}
                                            value={this.state.data.f}
                                            style={{ width: 400, display: 'inline-block' }} />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col >
                                    <div style={{ display: 'inline-block', margin: 5 }}>
                                        <Typography.Text style={{ width: 120, display: 'inline-block', textAlign: 'right' }}>友好时段：</Typography.Text>
                                        <TimePicker placeholder="请选择开始时间" style={{ width: 170 }}
                                            value={this.state.data.g.st === '' ? 0 : moment(this.state.data.g.st, timeFormat)}
                                            onChange={(time, timeStr) => this.onChangeFriendST(time, timeStr)}
                                            format={timeFormat} />
                                        <Typography.Text style={{ width: 60, display: 'inline-block', textAlign: 'center' }}>-</Typography.Text>
                                        <TimePicker placeholder="请选择结束时间" style={{ width: 170 }}
                                            value={this.state.data.g.et === '' ? 0 : moment(this.state.data.g.et, timeFormat)}
                                            onChange={(time, timeStr) => this.onChangeFriendEt(time, timeStr)}
                                            format={timeFormat} />
                                    </div>
                                </Col>
                            </Row>
                            {this.state.data.h.map((item, index) => {
                                return (
                                    <Row>
                                        <Col >
                                            <div style={{ display: 'inline-block', margin: 5 }}>
                                                <Popover title='时段控制' content={timeContent}>
                                                    <Typography.Text style={{ width: 120, display: 'inline-block', textAlign: 'right' }}>{`时段${index + 1}：`}</Typography.Text>
                                                </Popover>
                                                <TimePicker placeholder="请选择开始时间" style={{ width: 170 }}
                                                    value={item.st === '' ? 0 : moment(item.st, timeFormat)}
                                                    onChange={(time, timeStr) => this.onChangeIntervalST(time, timeStr, index)}
                                                    format={timeFormat} />
                                                <Typography.Text style={{ width: 60, display: 'inline-block', textAlign: 'center' }}>-</Typography.Text>
                                                <TimePicker placeholder="请选择结束时间" style={{ width: 170 }}
                                                    value={item.et === '' ? 0 : moment(item.et, timeFormat)}
                                                    onChange={(time, timeStr) => this.onChangeIntervalET(time, timeStr, index)}
                                                    format={timeFormat} />
                                                <Icon
                                                    className="dynamic_delete_button"
                                                    type="minus-circle-o"
                                                    onClick={() => this.removeInterval(index)}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                );
                            })}
                            {count2 < 4 ?
                                <Row>
                                    <Col >
                                        <div style={{ margin: 5 }}>
                                            <Button type="dashed" onClick={() => this.addInterval()} className="rate_add_button">
                                                <Icon type="plus" /> 新增时段控制时段
                                         </Button>
                                        </div>
                                    </Col>
                                </Row>
                                : ''}
                        </Card>
                    </Spin>
                </div>
            </Fragment>
        );
    }

    onChangeRate(e, index) {
        let data = this.state.data;
        // data.a[index] = {value:e.target.value};
        data.a[index].value = e.target.value;
        this.setState({
            data: data,
        });
    }
    onChangeSDegree(e, index) {
        let data = this.state.data;
        data.b[index].degree = e.target.value;
        this.setState({
            data: data,
        });
    }
    onChangeSPrice(e, index) {
        let data = this.state.data;
        data.b[index].price = e.target.value;
        this.setState({
            data: data,
        });
    }

    addStep() {

        let step = { degree: '', price: '' };
        let data = this.state.data;
        data.b = [...data.b, step]
        this.setState({
            data: data,
        });

    }

    removeStep(index) {
        let a = [];
        let data = this.state.data;
        for (let i = 0; i < data.b.length; i++) {
            if (i !== index) {
                a = [...a, data.b[i]];
            }
        }
        data.b = a;
        this.setState({
            data: data,
        });
    }

    onChangeOver(e) {
        let data = this.state.data;
        data.c = e.target.value;
        this.setState({
            data: data,
        });
    }
    onChangeAlarm(e) {
        let data = this.state.data;
        data.d = e.target.value;
        this.setState({
            data: data,
        });
    }

    onChangePro(checked) {
        let data = this.state.data;
        data.e = checked;
        this.setState({
            data: data,
        });
    }

    onChangeMaxP(e) {
        let data = this.state.data;
        data.f = e.target.value;
        this.setState({
            data: data,
        });
    }

    onChangeFriendST(time, timeStr) {
        let data = this.state.data;
        data.g.st = timeStr;
        this.setState({
            data: data,
        });
    }

    onChangeFriendEt(time, timeStr) {
        let data = this.state.data;
        data.g.et = timeStr;
        this.setState({
            data: data,
        });
    }

    onChangeIntervalST(time, timeStr, index) {
        let data = this.state.data;
        data.h[index].st = timeStr;
        this.setState({
            data: data,
        });
    }

    onChangeIntervalET(time, timeStr, index) {
        let data = this.state.data;
        data.h[index].et = timeStr;
        this.setState({
            data: data,
        });
    }

    addInterval() {
        let time = { st: '', et: '' };
        let data = this.state.data;
        data.h = [...data.h, time]
        this.setState({
            data: data,
        });
    }

    removeInterval(index) {
        let a = [];
        let data = this.state.data;
        for (let i = 0; i < data.h.length; i++) {
            if (i !== index) {
                a = [...a, data.h[i]];
            }
        }
        data.h = a;
        this.setState({
            data: data,
        });
    }


    componentDidMount() {
        this.requestData();
    }

    loading(spinning) {
        this.setState({
            spinning: spinning,
        });
    }

    requestData() {
    }

    resetData() {
    }
    confirmSet() {
        Modal.confirm({
            title: '确认要设置',
            content: '1111',
            okText: '确认',
            centered: true,
            cancelText: '取消',
            onOk: () => this.setData(),
            onCancel() {
            }
        });
    }
    setData() {
    }

}
export default withRouter(Form.create({})(RateParam));