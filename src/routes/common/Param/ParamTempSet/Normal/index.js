import React, { Component } from 'react';
import { Typography, Input, Card, Switch } from 'antd';

class Normal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Hu: '',//电压上限
            Lu: '',//电压下限
            Hp: '',//最大功率限定值
            Keep: true,//保电
        }
    }
    render() {

        return (
            <div className="syspre_param_info_item_root" id="param_normal">
                <Card style={{ width: 550 }}>
                    <div className="syspre_param_info_item_title">常规参数</div>

                    <div className="param_info_item">
                        <Typography.Text className="param_info_item_label">电压上限：</Typography.Text>
                        <Input placeholder='V'
                            autoComplete='off'
                            onChange={(e) => this.onChangeVoltMax(e)}
                            value={this.state.Hu}
                            className="param_info_item_input"
                        />
                    </div>
                    <div className="param_info_item">
                        <Typography.Text className="param_info_item_label">电压下限：</Typography.Text>
                        <Input placeholder='V'
                            autoComplete='off'
                            onChange={(e) => this.onChangeVoltMin(e)}
                            value={this.state.Lu}
                            className="param_info_item_input"
                        />
                    </div>
                    <div className="param_info_item">
                        <Typography.Text className="param_info_item_label">最大功率限定值：</Typography.Text>
                        <Input placeholder='kW'
                            autoComplete='off'
                            onChange={(e) => this.onChangePowerMax(e)}
                            value={this.state.Hp}
                            className="param_info_item_input"
                        />
                    </div>

                    <div className="param_info_item">
                        <Typography.Text className="param_info_item_label">保电模式：</Typography.Text>
                        <Switch
                            checkedChildren="开" unCheckedChildren="关"
                            checked={this.state.Keep}
                            onChange={(checked) => this.onChangePro(checked)}
                        />
                    </div>
                </Card>
            </div>
        );
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    onChangeVoltMax(e) {
        this.setState({
            Hu: e.target.value
        });
    }
    onChangeVoltMin(e) {
        this.setState({
            Lu: e.target.value
        });
    }
    onChangePowerMax(e) {
        this.setState({
            Hp: e.target.value
        });
    }
    onChangePro(checked) {
        this.setState({
            Keep: checked
        });
    }

}

export default Normal;