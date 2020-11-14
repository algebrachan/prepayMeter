import React, { Component } from 'react';
import { Card, Typography, Input } from 'antd';

class Ratio extends Component {
 
    render() {
        return (
            <div className="syspre_param_info_item_root" id="param_ratio">
                <Card style={{ width: 550 }}>
                    <div className="param_info_item">
                        <Typography.Text className="param_info_item_label">电能系数：</Typography.Text>
                        <Input placeholder=''
                            autoComplete='off'
                            onChange={(e) => this.onChangeRatio(e)}
                            value={this.props.data.ratio}
                            className="param_info_item_input" />
                    </div>
                </Card>
            </div>
        );
    }

    onChangeRatio(e) {
        let data = this.props.data;
        data.ratio = e.target.value;
        this.props.fatherData(data);
    }
}
export default Ratio;