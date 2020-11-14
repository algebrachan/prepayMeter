import React, { Component, Fragment } from 'react';
import { Descriptions, Typography, Tag } from 'antd';
import { withRouter } from 'react-router-dom';


class Triphase extends Component {


    render() {
        return (
            // 三相表
            <Fragment>
                <Descriptions bordered>
                    <Descriptions.Item label="设备ID" >{this.props.data.key}</Descriptions.Item>
                    <Descriptions.Item label="更新时间" >{this.props.data.RpttpStr}</Descriptions.Item>
                    <Descriptions.Item label="抄表时间" >{this.props.data.ReadUtcStr}</Descriptions.Item>
                    <Descriptions.Item label="余额" ><Typography.Text style={{ color: '#d86c14' }}>{this.props.data.Left / 1000}元</Typography.Text></Descriptions.Item>
                    <Descriptions.Item label="充值序号" >{this.props.data.Seq}</Descriptions.Item>
                    <Descriptions.Item label="信号质量" >{this.props.data.Sig}</Descriptions.Item>
                    <Descriptions.Item label="总电能" span={3} ><Typography.Text style={{ color: '#d86c14' }}>{this.props.data.Dt / 1000000}kWh</Typography.Text></Descriptions.Item>
                    {this.props.data.Rtp == 1 ?
                        ''
                        : <Fragment>
                            <Descriptions.Item label="费率1电能" ><Typography.Text >{this.props.data.D1 / 1000000}kWh</Typography.Text></Descriptions.Item>
                            <Descriptions.Item label="费率2电能" span={2}><Typography.Text>{this.props.data.D2 / 1000000}kWh</Typography.Text></Descriptions.Item>
                            <Descriptions.Item label="费率3电能" ><Typography.Text >{this.props.data.D3 / 1000000}kWh</Typography.Text></Descriptions.Item>
                            <Descriptions.Item label="费率4电能" span={2}><Typography.Text>{this.props.data.D4 / 1000000}kWh</Typography.Text></Descriptions.Item>
                        </Fragment>
                    }
                    <Descriptions.Item span={3} label="总功率" >{this.props.data.Pt / 10}W</Descriptions.Item>
                    <Descriptions.Item label="A相功率" >{this.props.data.Pa / 10}W</Descriptions.Item>
                    <Descriptions.Item label="B相功率" >{this.props.data.Pb / 10}W</Descriptions.Item>
                    <Descriptions.Item label="C相功率" >{this.props.data.Pc / 10}W</Descriptions.Item>
                    <Descriptions.Item label="A相电压">{this.props.data.Va / 100}V</Descriptions.Item>
                    <Descriptions.Item label="B相电压">{this.props.data.Vb / 100}V</Descriptions.Item>
                    <Descriptions.Item label="C相电压">{this.props.data.Vc / 100}V</Descriptions.Item>
                    <Descriptions.Item label="A相电流">{this.props.data.Ia / 1000}A</Descriptions.Item>
                    <Descriptions.Item label="B相电流">{this.props.data.Ib / 1000}A</Descriptions.Item>
                    <Descriptions.Item label="C相电流">{this.props.data.Ic / 1000}A</Descriptions.Item>
                    <Descriptions.Item span={3} label="总功率因数" >{this.props.data.Ft / 1000}</Descriptions.Item>
                    <Descriptions.Item label="A相功率因数">{this.props.data.Fa / 1000}</Descriptions.Item>
                    <Descriptions.Item label="B相功率因数">{this.props.data.Fb / 1000}</Descriptions.Item>
                    <Descriptions.Item label="C相功率因数">{this.props.data.Fc / 1000}</Descriptions.Item>
                    {/* <Descriptions.Item label="状态字" >{this.props.data.Stat}</Descriptions.Item>
                    <Descriptions.Item label="电压事件状态字" >{this.props.data.Ues}</Descriptions.Item>
                    <Descriptions.Item label="电流事件状态字" >{this.props.data.Ies}</Descriptions.Item>
                    <Descriptions.Item label="功率事件状态字" >{this.props.data.Pes}</Descriptions.Item>
                    <Descriptions.Item label="信号事件状态字" >{this.props.data.Ses}</Descriptions.Item> */}
                    <Descriptions.Item span={3} label="拉合闸状态" >{this.getSwitchState()}</Descriptions.Item>
                    <Descriptions.Item span={3} label="保电状态" >{this.getKeepState()}</Descriptions.Item>
                    <Descriptions.Item span={3} label="事件" >{this.getState()}</Descriptions.Item>
                </Descriptions>

            </Fragment>
        );
    }

    getState() {
        return (
            <Fragment>
                <Tag color={(this.props.data.Stat & 0x20000) === 0x20000 ? "#CC3333" : "#339933"}>过容</Tag>
                <Tag color={(this.props.data.Pes & 0x0001) === 0x0001 ? "#CC3333" : "#339933"}>过载</Tag>
                <Tag color={(this.props.data.Ues & 0x0007) === 0x0007 ? "#CC3333" : "#339933"}>过压</Tag>
                <Tag color={(this.props.data.Ues & 0x0038) > 0 ? "#CC3333" : "#339933"}>欠压</Tag>
            </Fragment>
        );
    }

    getSwitchState() {
        const stat = this.props.data.Ses;
        return (
            <Fragment>
                {(stat & 452) === 0 ? <Tag color="#339933">合闸</Tag> : ""}
                {(stat & 4) === 4 ? <Tag color="#CC3333">手动拉闸</Tag> : ""}
                {(stat & 64) === 64 ? <Tag color="#CC3333">功率过大拉闸</Tag> : ""}
                {(stat & 128) === 128 ? <Tag color="#CC3333">透支拉闸</Tag> : ""}
                {(stat & 256) === 256 ? <Tag color="#CC3333">时段控制拉闸</Tag> : ""}
            </Fragment>
        );
    }

    getKeepState() {
        const stat = this.props.data.Stat;
        return (
            <Fragment>
                {(stat & 0x8000) === 0x8000 ? <Tag color="#339933">保电</Tag> : <Tag color="#CC3333">不保电</Tag>}
            </Fragment>
        )
    }

}
export default withRouter(Triphase);