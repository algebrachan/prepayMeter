import React, { Component } from 'react';
import { Typography, Input, Card, Switch } from 'antd';
import { connect } from 'react-redux';
import * as paramTempCtors from '../store/actionCreators';


class Normal extends Component {

    render() {
        return (
            <div className="syspre_param_info_item_root" id="param_normal">
                <Card style={{ width: 550 }}>   
                    <div className="syspre_param_info_item_title">常规参数</div>
                    {/* <div className="param_info_item">
                        <Typography.Text className="param_info_item_label">允许透支额度：</Typography.Text>
                        <Input placeholder='元'
                            autoComplete='off'
                            onChange={(e) => this.onChangeOver(e)}
                            value={this.props.data.ovrdt}
                            className="param_info_item_input"
                            disabled={this.props.disabled} />
                    </div> */}
                    <div className="param_info_item">
                        <Typography.Text className="param_info_item_label">电压上限：</Typography.Text>
                        <Input placeholder='V'
                            autoComplete='off'
                            onChange={(e) => this.onChangeVoltMax(e)}
                            value={this.props.Hu}
                            className="param_info_item_input"
                            disabled={this.props.disabled} />
                    </div>
                    <div className="param_info_item">
                        <Typography.Text className="param_info_item_label">电压下限：</Typography.Text>
                        <Input placeholder='V'
                            autoComplete='off'
                            onChange={(e) => this.onChangeVoltMin(e)}
                            value={this.props.Lu}
                            className="param_info_item_input"
                            disabled={this.props.disabled} />
                    </div>
                    <div className="param_info_item">
                        <Typography.Text className="param_info_item_label">最大功率限定值：</Typography.Text>
                        <Input placeholder='kW'
                            autoComplete='off'
                            onChange={(e) => this.onChangePowerMax(e)}
                            value={this.props.Hp}
                            className="param_info_item_input"
                            disabled={this.props.disabled} />
                    </div>
                    {/* <div className="param_info_item">
                        <Typography.Text className="param_info_item_label">报警额度：</Typography.Text>
                        <Input placeholder='元'
                            autoComplete='off'
                            onChange={(e) => this.onChangeAlarm(e)}
                            value={this.props.data.alm}
                            className="param_info_item_input"
                            disabled={this.props.disabled} />
                    </div> */}
                    {/* <div className="param_info_item">
                        <Typography.Text className="param_info_item_label">最大功率限定值：</Typography.Text>
                        <Input placeholder='kW'
                            autoComplete='off'
                            onChange={(e) => this.onChangeMaxP(e)}
                            value={this.props.data.mlp}
                            className="param_info_item_input"
                            disabled={this.props.disabled} />
                    </div> */}
                    <div className="param_info_item">
                        <Typography.Text className="param_info_item_label">保电模式：</Typography.Text>
                        <Switch
                            checkedChildren="开" unCheckedChildren="关"
                            checked={this.props.Keep}
                            onChange={(checked) => this.onChangePro(checked)}
                            disabled={this.props.disabled} />
                    </div>
                </Card>
            </div>
        );
    }

    // onChangeOver(e) {
    //     let data = this.props.data;
    //     data.ovrdt = e.target.value;
    //     this.props.fatherData(data);
    // }
    onChangeVoltMax(e) {
        let data = {
            Hu: this.props.Hu,
            Lu: this.props.Lu,
            Hp: this.props.Hp,
            Keep: this.props.Keep,
        }
        data.Hu = e.target.value;
        this.props.editNormalAction(data);
    }
    onChangeVoltMin(e) {
        let data = {
            Hu: this.props.Hu,
            Lu: this.props.Lu,
            Hp: this.props.Hp,
            Keep: this.props.Keep,
        }
        data.Lu = e.target.value;
        this.props.editNormalAction(data);
    }
    onChangePowerMax(e) {
        let data = {
            Hu: this.props.Hu,
            Lu: this.props.Lu,
            Hp: this.props.Hp,
            Keep: this.props.Keep,
        }
        data.Hp = e.target.value;
        this.props.editNormalAction(data);
    }
    // onChangeAlarm(e) {
    //     let data = this.props.data;
    //     data.alm = e.target.value;
    //     this.props.fatherData(data);
    // }
    // onChangeMaxP(e) {
    //     let data = this.props.data;
    //     data.mlp = e.target.value;
    //     this.props.fatherData(data);
    // }
    onChangePro(checked) {
        let data = {
            Hu: this.props.Hu,
            Lu: this.props.Lu,
            Hp: this.props.Hp,
            Keep: this.props.Keep,
        }
        data.Keep = checked;
        this.props.editNormalAction(data);
    }

}
const mapStateToProps = (state) => {
    return {
        Hu: state.param_temp.paramlist.Hu,
        Lu: state.param_temp.paramlist.Lu,
        Hp: state.param_temp.paramlist.Hp,
        Keep: state.param_temp.paramlist.Keep,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        editNormalAction(value) {
            dispatch(paramTempCtors.editNormalAction(value));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Normal);