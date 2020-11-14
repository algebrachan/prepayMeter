import React, { Component } from 'react';
import { Card, Typography, Input } from 'antd';
import { connect } from 'react-redux';
import * as paramTempCtors from '../store/actionCreators';
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
                            value={this.props.Ratio}
                            className="param_info_item_input"
                            disabled={this.props.disabled} />
                    </div>
                </Card>
            </div>
        );
    }

    onChangeRatio(e) {
        let ratio = e.target.value;
        this.props.editRatioAction(ratio);
    }
}

const mapStateToProps = (state) => {
    return {
        Ratio: state.param_temp.paramlist.Ratio,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        editRatioAction(value) {
            dispatch(paramTempCtors.editRatioAction(value));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Ratio);