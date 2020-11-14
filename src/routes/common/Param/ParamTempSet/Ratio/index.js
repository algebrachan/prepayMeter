import React, { Component } from 'react';
import { Card, Typography, Input } from 'antd';
class Ratio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Ratio: '',
        }
    }
    render() {

        return (
            <div className="syspre_param_info_item_root" id="param_ratio">
                <Card style={{ width: 550 }}>
                    <div className="param_info_item">
                        <Typography.Text className="param_info_item_label">电能系数：</Typography.Text>
                        <Input placeholder=''
                            autoComplete='off'
                            onChange={(e) => this.onChangeRatio(e)}
                            value={this.state.Ratio}
                            className="param_info_item_input"
                        />
                    </div>
                </Card>
            </div>
        );
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    onChangeRatio(e) {
        this.setState({
            Ratio: e.target.value
        })
    }
}

export default Ratio;