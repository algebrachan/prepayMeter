import React, { Component } from 'react';
import { Card, Typography, Input, Popover, Icon, Button } from 'antd';


const rateContent = (
    <div>
        <p>超过该阶梯度数额外价格</p>
    </div>
);
class Sps extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Step: {
                Sps: [
                    { Engy: '', Exp: '' },
                ],//阶梯计价
            },
        }
    }
    render() {
        let count1 = this.state.Step.Sps.length;
        return (
            <div className="syspre_param_info_item_root" id="param_sps">
                <Card style={{ width: 550 }}>
                    <div className="syspre_param_info_item_title">阶梯计价</div>
                    {this.state.Step.Sps.map((item, index) => {
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
                                />
                                <div style={{ width: 10, display: 'inline-block' }}></div>
                                <Input placeholder='每度电额外价格(元/kWh)'
                                    autoComplete='off'
                                    onChange={(e) => this.onChangeSPrice(e, index)}
                                    value={item.Exp}
                                    style={{ width: 190, display: 'inline-block' }}
                                />
                                {this.props.disabled ? '' :
                                    <Icon
                                        className="param_dynamic_delete_button"
                                        type="minus-circle-o"
                                        onClick={() => this.removeStep(index)}
                                    />}
                            </div>
                        );
                    })}
                    {count1 < 5 ?

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
    componentDidMount() {
        this.props.onRef(this);
    }
    onChangeSDegree(e, index) {
        let data = this.state.Step.Sps;
        data[index].Engy = e.target.value;
        let Step = this.state.Step;
        Step.Sps = data;
        this.setState({
            Step: Step
        });
    }

    onChangeSPrice(e, index) {
        let data = this.state.Step.Sps;
        data[index].Exp = e.target.value;
        let Step = this.state.Step;
        Step.Sps = data;
        this.setState({
            Step: Step
        });
    }

    removeStep(index) {
        let a = [];
        let data = this.state.Step.Sps;
        for (let i = 0; i < data.length; i++) {
            if (i !== index) {
                a = [...a, data[i]];
            }
        }
        data = a;
        let Step = this.state.Step;
        Step.Sps = data;
        this.setState({
            Step: Step
        });
    }

    addStep() {
        let step = { Engy: '', Exp: '' };
        let data = this.state.Step.Sps;
        data = [...data, step]
        let Step = this.state.Step;
        Step.Sps = data;
        this.setState({
            Step: Step
        });
    }
}

export default Sps;
