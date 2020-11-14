import React, { Component } from 'react';
import { Card, Typography, Input } from 'antd';
import { connect } from 'react-redux';
import * as paramTempCtors from '../store/actionCreators';

class Rates extends Component {
    render() {

        return (
            <div className="syspre_param_info_item_root" id="param_rates">

                <Card style={{ width: 550 }}>
                    <div className="syspre_param_info_item_title">费率</div>
                    <div className="syspre_param_info_item_note">(单费率表仅费率1生效)</div>
                    {this.props.Rates.map((item, index) => {
                        return (
                            <div className="param_info_item" key={index}>
                                <Typography.Text className="param_info_item_label">{`费率${index + 1}(元/kWh)：`}</Typography.Text>
                                <Input placeholder='元/kWh'
                                    autoComplete='off'
                                    onChange={(e) => this.onChangeRate(e, index)}
                                    value={item / 1000}
                                    className="param_info_item_input"
                                    disabled={this.props.disabled}
                                />
                            </div>
                        );
                    })}
                </Card>
            </div>
        );
    }

    onChangeRate(e, index) {
        let data = this.props.Rates;
        data[index] = e.target.value;
        this.props.editRateAction(data);
    }
}

const mapStateToProps = (state) => {
    return {
        Rates: state.param_temp.paramlist.Rates,
        // paramlist: state.param_temp.paramlist,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        editRateAction(value) {
            dispatch(paramTempCtors.editRateAction(value));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Rates);