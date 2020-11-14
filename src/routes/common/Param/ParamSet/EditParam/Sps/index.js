import React, { Component } from 'react';
import { Card, Typography, Input, Popover, Icon, Button } from 'antd';

const rateContent = (
    <div>
        <p>超过该阶梯度数额外价格</p>
    </div>
);
class Sps extends Component {

    render() {
        let count1 = this.props.data.sps.length;
        return (
            <div className="syspre_param_info_item_root" id="param_sps">
                <Card style={{ width: 550 }}>
                    {this.props.data.sps.map((item, index) => {
                        return (
                            <div className="param_info_item" key={index}>
                                <Popover content={rateContent} title={`阶梯${index + 1}`}>
                                    <Typography.Text className="param_info_item_label">{`阶梯${index + 1}：`}</Typography.Text>
                                </Popover>
                                <Input placeholder='kWh'
                                    autoComplete='off'
                                    onChange={(e) => this.onChangeSDegree(e, index)}
                                    value={item.engy}
                                    style={{ width: 100, display: 'inline-block' }} />
                                <div style={{ width: 10, display: 'inline-block' }}></div>
                                <Input placeholder='每度电额外价格(元/kWh)'
                                    autoComplete='off'
                                    onChange={(e) => this.onChangeSPrice(e, index)}
                                    value={item.exp}
                                    style={{ width: 190, display: 'inline-block' }} />
                                <Icon
                                    className="param_dynamic_delete_button"
                                    type="minus-circle-o"
                                    onClick={() => this.removeStep(index)}
                                />
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

    onChangeSDegree(e, index) {
        let data = this.props.data;
        data.sps[index].engy = e.target.value;
        this.props.fatherData(data);
    }

    onChangeSPrice(e, index) {
        let data = this.props.data;
        data.sps[index].exp = e.target.value;
        this.props.fatherData(data);
    }

    removeStep(index) {
        let a = [];
        let data = this.props.data;
        for (let i = 0; i < data.sps.length; i++) {
            if (i !== index) {
                a = [...a, data.sps[i]];
            }
        }
        data.sps = a;
        this.props.fatherData(data);
    }
    addStep() {
        let step = { engy: '', exp: '' };
        let data = this.props.data;
        data.sps = [...data.sps, step]
        this.props.fatherData(data);
    }


}
export default Sps;
