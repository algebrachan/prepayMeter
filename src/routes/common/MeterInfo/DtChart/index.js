import React, { Component } from 'react';
import { Spin, Select } from 'antd';
import './style.css';
import Month from './Month';
import Year from './Year';
class DtChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            spinning: false,
            type: 'm'
        }
        this.loading = this.loading.bind(this);

    }

    render() {
        return (
            <div style={{ margin: 20 }}>
                <Spin spinning={this.state.spinning}>
                    <Select className="meter_info_dtchart_header"
                        onChange={(value) => this.changeDataType(value)}
                        value={this.state.type}>
                        <Select.Option value='m'>月统计</Select.Option>
                        <Select.Option value='y'>年统计</Select.Option>
                    </Select>
                    <div style={{ marginTop: 20 }}>
                        {this.getChart()}
                    </div>
                </Spin>
            </div>
        );

    }
    loading(value) {
        this.setState({
            spinning: value,
        })
    }
    changeDataType(value) {
        this.setState({
            type: value,
        })
    }
    getChart() {
        if (this.state.type === 'm') {
            return (<Month />);
        }
        if (this.state.type === 'y') {
            return (<Year />);
        }

    }

}
export default DtChart;