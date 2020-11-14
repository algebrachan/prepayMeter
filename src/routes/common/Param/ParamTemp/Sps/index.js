import React, { Component } from 'react';
import { Card, Typography, Input, Popover, Icon, Button } from 'antd';
import { connect } from 'react-redux';
import * as paramTempCtors from '../store/actionCreators';

const rateContent = (
    <div>
        <p>超过该阶梯度数额外价格</p>
    </div>
);
class Sps extends Component {

    render() {
        let count1 = this.props.Step.Sps.length;
        return (
            <div className="syspre_param_info_item_root" id="param_sps">
                <Card style={{ width: 550 }}>
                    <div className="syspre_param_info_item_title">阶梯计价</div>
                    {this.props.Step.Sps.map((item, index) => {
                        return (
                            <div className="param_info_item" key={index}>
                                <Popover content={rateContent} title={`阶梯${index + 1}`}>
                                    <Typography.Text className="param_info_item_label">{`阶梯${index + 1}：`}</Typography.Text>
                                </Popover>
                                <Input placeholder='kWh'
                                    autoComplete='off'
                                    onChange={(e) => this.onChangeSDegree(e, index)}
                                    value={item.Engy}
                                    style={{ width: 100, display: 'inline-block' }}
                                    disabled={this.props.disabled} />
                                <div style={{ width: 10, display: 'inline-block' }}></div>
                                <Input placeholder='每度电额外价格(元/kWh)'
                                    autoComplete='off'
                                    onChange={(e) => this.onChangeSPrice(e, index)}
                                    value={item.Exp}
                                    style={{ width: 190, display: 'inline-block' }}
                                    disabled={this.props.disabled} />
                                {this.props.disabled ? '' :
                                    <Icon
                                        className="param_dynamic_delete_button"
                                        type="minus-circle-o"
                                        onClick={() => this.removeStep(index)}
                                    />}
                            </div>
                        );
                    })}
                    {count1 < 5 && !this.props.disabled ?

                        <div style={{ margin: 5 }}>
                            <Button type="dashed" onClick={() => this.addStep()} className="param_item_add_button" >
                                <Icon type="plus" /> 新增阶梯
                                         </Button>
                        </div>

                        : ''}
                </Card>
            </div>
        );
    }

    onChangeSDegree(e, index) {
        let data = this.props.Step.Sps;
        data[index].Engy = e.target.value;
        this.props.editSpsAction(data);
    }

    onChangeSPrice(e, index) {
        let data = this.props.Step.Sps;
        data[index].Exp = e.target.value;
        this.props.editSpsAction(data);
    }

    removeStep(index) {
        let a = [];
        let data = this.props.Step.Sps;
        for (let i = 0; i < data.length; i++) {
            if (i !== index) {
                a = [...a, data[i]];
            }
        }
        data = a;
        this.props.editSpsAction(data);
    }

    addStep() {
        let step = { Engy: '', Exp: '' };
        let data = this.props.Step.Sps;
        data = [...data, step]
        this.props.editSpsAction(data);
    }


}
const mapStateToProps = (state) => {
    return {
        // paramlist: state.param_temp.paramlist,
        Step: state.param_temp.paramlist.Step,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        editSpsAction(value) {
            dispatch(paramTempCtors.editSpsAction(value));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sps);
