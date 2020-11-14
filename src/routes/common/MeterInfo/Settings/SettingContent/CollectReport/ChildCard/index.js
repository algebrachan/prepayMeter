import React, { Component } from 'react';
import { Row, Col, Typography, Input, Switch, Button, Card } from 'antd';

class ChildCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // obj: {
            //     a: props.obj.a,
            //     b: props.obj.b,
            //     c: props.obj.c,
            //     d: props.obj.d,
            //     e: props.obj.e,
            //     f: props.obj.f,
            //     g: props.obj.g,
            // },
            obj: props.obj,

        }
    }

    render() {
        return (
            <Card style={{ width: 400, margin: 10 ,float:'left'}}>
                <Row>
                    <Col>
                        <Typography.Text style={{ fontSize: 15 }}>{`上报数据组${this.props.index + 1}：`}</Typography.Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ display: 'inline-block', margin: 5 }}>
                            <Typography.Text style={{ width: 100, display: 'inline-block', textAlign: 'right' }}>类号：</Typography.Text>
                            <Input placeholder='请输入类号'
                                onChange={(e) => this.onChangeClass(e)}
                                value={this.state.obj.a}
                                style={{ width: 200, display: 'inline-block' }} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ display: 'inline-block', margin: 5 }}>
                            <Typography.Text style={{ width: 100, display: 'inline-block', textAlign: 'right' }}>起始ID：</Typography.Text>
                            <Input placeholder='请输入起始ID'
                                onChange={(e) => this.onChangeId(e)}
                                value={this.state.obj.b}
                                style={{ width: 200, display: 'inline-block' }} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ display: 'inline-block', margin: 5 }}>
                            <Typography.Text style={{ width: 100, display: 'inline-block', textAlign: 'right' }}>总项数：</Typography.Text>
                            <Input placeholder='请输入总项数'
                                onChange={(e) => this.onChangeTotal(e)}
                                value={this.state.obj.c}
                                style={{ width: 200, display: 'inline-block' }} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ display: 'inline-block', margin: 5 }}>
                            <Typography.Text style={{ width: 100, display: 'inline-block', textAlign: 'right' }}>数据长度：</Typography.Text>
                            <Input placeholder='请输入数据长度'
                                onChange={(e) => this.onChangeLength(e)}
                                value={this.state.obj.d}
                                style={{ width: 200, display: 'inline-block' }} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ display: 'inline-block', margin: 5 }}>
                            <Typography.Text style={{ width: 100, display: 'inline-block', textAlign: 'right' }}>上报间隔：</Typography.Text>
                            <Input placeholder='请输入上报间隔'
                                onChange={(e) => this.onChangeRInterval(e)}
                                value={this.state.obj.e}
                                style={{ width: 200, display: 'inline-block' }} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ display: 'inline-block', margin: 5 }}>
                            <Typography.Text style={{ width: 100, display: 'inline-block', textAlign: 'right' }}>存储间隔：</Typography.Text>
                            <Input placeholder='请输入存储间隔'
                                onChange={(e) => this.onChangeSInterval(e)}
                                value={this.state.obj.f}
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
                                checked={this.state.obj.g}
                                onChange={(checked) => this.onChangeValid(checked)} />
                        </div>
                    </Col>
                </Row>
                <div>
                    <Button type='danger' size='small'
                        onClick={this.props.onDelete}
                        style={{ marginLeft: 50, marginTop: 20 }}
                    >删除数据组</Button>
                </div>
            </Card>

        );
    }

    onChangeClass(e) {
        let obj = this.state.obj;
        obj.a = e.target.value;
        this.setState({
            obj: obj,
        });
        this.props.modPropsData(obj);
    }

    onChangeId(e) {
        let obj = this.state.obj;
        obj.b = e.target.value;
        this.setState({
            obj: obj,
        });
        this.props.modPropsData(obj);
    }

    onChangeTotal(e) {
        let obj = this.state.obj;
        obj.c = e.target.value;
        this.setState({
            obj: obj,
        });
        this.props.modPropsData(obj);
    }

    onChangeLength(e) {
        let obj = this.state.obj;
        obj.d = e.target.value;
        this.setState({
            obj: obj,
        });
        this.props.modPropsData(obj);
    }

    onChangeRInterval(e) {
        let obj = this.state.obj;
        obj.e = e.target.value;
        this.setState({
            obj: obj,
        });
        this.props.modPropsData(obj);
    }

    onChangeSInterval(e) {
        let obj = this.state.obj;
        obj.f = e.target.value;
        this.setState({
            obj: obj,
        });
        this.props.modPropsData(obj);
    }

    onChangeValid(checked) {
        let obj = this.state.obj;
        obj.g = checked;
        this.setState({
            obj: obj,
        });
        this.props.modPropsData(obj);
    }

}
export default ChildCard;