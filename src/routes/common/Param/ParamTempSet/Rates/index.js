import React, { Component } from 'react';
import { Card, Typography, Input } from 'antd';


class Rates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Rates: [
                "", "", "", ""
            ],//费率
        }
    }
    render() {

        return (
            <div className="syspre_param_info_item_root" id="param_rates">

                <Card style={{ width: 550 }}>
                    <div className="syspre_param_info_item_title">费率</div>
                    <div className="syspre_param_info_item_note">(单费率表仅费率1生效,最多保留三位小数)</div>
                    {this.state.Rates.map((item, index) => {
                        return (
                            <div className="param_info_item" key={index}>
                                <Typography.Text className="param_info_item_label">{`费率${index + 1}(元/kWh)：`}</Typography.Text>
                                <Input placeholder='元/kWh'
                                    autoComplete='off'
                                    onChange={(e) => this.onChangeRate(e, index)}
                                    value={item}
                                    className="param_info_item_input"
                                />
                            </div>
                        );
                    })}
                </Card>
            </div>
        );
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    onChangeRate(e, index) {
        let Rates = this.state.Rates;
        Rates[index] = e.target.value;
        this.setState({
            Rates: Rates,
        });
    }
}


export default Rates;