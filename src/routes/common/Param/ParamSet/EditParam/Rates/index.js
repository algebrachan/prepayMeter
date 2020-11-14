import React, { Component } from 'react';
import { Card, Typography, Input } from 'antd';

class Rates extends Component {

    render() {
        return (
            <div className="syspre_param_info_item_root" id="param_rates">
                <Card style={{ width: 550 }}>
                    {this.props.data.rates.map((item, index) => {
                        return (
                            <div className="param_info_item" key={index}>
                                <Typography.Text className="param_info_item_label">{`费率${index + 1}：`}</Typography.Text>
                                <Input placeholder='元/kWh'
                                    autoComplete='off'
                                    onChange={(e) => this.onChangeRate(e, index)}
                                    value={item.value}
                                    className="param_info_item_input"
                                />
                            </div>
                        );
                    })}
                </Card>
            </div>
        );
    }

    onChangeRate(e, index) {
        let data = this.props.data;
        data.rates[index].value = e.target.value;
        this.props.fatherData(data);
    }
}
export default Rates;