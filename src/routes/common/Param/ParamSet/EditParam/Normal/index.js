import React, { Component } from 'react';
import { Typography, Input, Card, Switch } from 'antd';



class Normal extends Component {

    render() {
        return (
            <div className="syspre_param_info_item_root" id="param_normal">
                <Card style={{ width: 550 }}>
                    <div className="param_info_item">
                        <Typography.Text className="param_info_item_label">允许透支额度：</Typography.Text>
                        <Input placeholder='元'
                            autoComplete='off'
                            onChange={(e) => this.onChangeOver(e)}
                            value={this.props.data.ovrdt}
                            className="param_info_item_input" />
                    </div>
                    <div className="param_info_item">
                        <Typography.Text className="param_info_item_label">电压上限：</Typography.Text>
                        <Input placeholder='V'
                            autoComplete='off'
                            onChange={(e) => this.onChangeVoltMax(e)}
                            value={this.props.data.hu}
                            className="param_info_item_input" />
                    </div>
                    <div className="param_info_item">
                        <Typography.Text className="param_info_item_label">电压下限：</Typography.Text>
                        <Input placeholder='V'
                            autoComplete='off'
                            onChange={(e) => this.onChangeVoltMin(e)}
                            value={this.props.data.lu}
                            className="param_info_item_input" />
                    </div>
                    <div className="param_info_item">
                        <Typography.Text className="param_info_item_label">功率上限：</Typography.Text>
                        <Input placeholder='kW'
                            autoComplete='off'
                            onChange={(e) => this.onChangePowerMax(e)}
                            value={this.props.data.hp}
                            className="param_info_item_input" />
                    </div>
                    <div className="param_info_item">
                        <Typography.Text className="param_info_item_label">报警额度：</Typography.Text>
                        <Input placeholder='元'
                            autoComplete='off'
                            onChange={(e) => this.onChangeAlarm(e)}
                            value={this.props.data.alm}
                            className="param_info_item_input" />
                    </div>
                    <div className="param_info_item">
                        <Typography.Text className="param_info_item_label">最大功率限定值：</Typography.Text>
                        <Input placeholder='kW'
                            autoComplete='off'
                            onChange={(e) => this.onChangeMaxP(e)}
                            value={this.props.data.mlp}
                            className="param_info_item_input" />
                    </div>
                    <div className="param_info_item">
                        <Typography.Text className="param_info_item_label">保电模式：</Typography.Text>
                        <Switch
                            checkedChildren="开" unCheckedChildren="关"
                            checked={this.props.data.keep}
                            onChange={(checked) => this.onChangePro(checked)} />
                    </div>
                </Card>
            </div>
        );
    }

    onChangeOver(e) {
        let data = this.props.data;
        data.ovrdt = e.target.value;
        this.props.fatherData(data);
    }
    onChangeVoltMax(e) {
        let data = this.props.data;
        data.hu = e.target.value;
        this.props.fatherData(data);
    }
    onChangeVoltMin(e) {
        let data = this.props.data;
        data.lu = e.target.value;
        this.props.fatherData(data);
    }
    onChangePowerMax(e) {
        let data = this.props.data;
        data.hp = e.target.value;
        this.props.fatherData(data);
    }
    onChangeAlarm(e) {
        let data = this.props.data;
        data.alm = e.target.value;
        this.props.fatherData(data);
    }
    onChangeMaxP(e) {
        let data = this.props.data;
        data.mlp = e.target.value;
        this.props.fatherData(data);
    }
    onChangePro(checked) {
        let data = this.props.data;
        data.keep = checked;
        this.props.fatherData(data);
    }

}
export default Normal;