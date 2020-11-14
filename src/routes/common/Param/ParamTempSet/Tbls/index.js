import React, { Component } from 'react';
import { Button, Select, TimePicker, Icon, Card, Popover, message } from 'antd';
import moment from 'moment';

const { Option } = Select;
const tblsContent = (
    <div>
        <p>时段表请按时间顺序填写</p>
    </div>
);
class Tbls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Tbl: {
                Rtis: [
                    { Tim: '00:00', Rate: 1 },

                ]
            },
        }
    }

    render() {

        let count = this.state.Tbl.Rtis.length;
        const timeFormat = 'HH:mm';
        return (
            <div className="syspre_param_info_item_root" id="param_tbls">
                <Card style={{ width: 550 }}>
                    <Popover content={tblsContent} title="时段">
                        <div className="syspre_param_info_item_title">时段表</div>
                    </Popover>
                    {this.state.Tbl.Rtis.map((item, index) => (
                        <div className="param_info_item" key={index}>
                            <TimePicker className="param_tbls_modal_input"
                                value={item.Tim === '' ? 0 : moment(item.Tim, timeFormat)}
                                onChange={(time, timeString) => this.onChangeTime(time, timeString, item, index)}
                                format={timeFormat}
                                minuteStep={30}
                                disabledHours={() => this.getDisabledHours(index)}
                                disabledMinutes={(selectHour) => this.getDisabledMinutes(selectHour, index)}
                                disabled={index === 0} />
                            <Select className="param_tbls_modal_select"
                                value={item.Rate}
                                onChange={(val) => this.onChangeType(val, item, index)}
                            >
                                <Option value={1}>费率1</Option>
                                <Option value={2}>费率2</Option>
                                <Option value={3}>费率3</Option>
                                <Option value={4}>费率4</Option>
                            </Select>
                            {index === 0 ? '' :
                                <Icon
                                    className="param_dynamic_delete_button"
                                    type="minus-circle-o"
                                    onClick={() => this.removeStep(index)}
                                />
                            }
                        </div>
                    ))}
                    {count < 8 ?
                        <div style={{ margin: 5 }}>
                            <Button type="dashed" onClick={() => this.addStep()} className="param_item_add_button" >
                                <Icon type="plus" /> 新增时段
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

    addStep() {
        // 判断上一次的时间
        let index = this.state.Tbl.Rtis.length;
        let pretime = this.state.Tbl.Rtis[index - 1].Tim;
        // 切分 
        let prehour = pretime.split(':')[0];
        let premin = pretime.split(':')[1];
        let nowtime = '00:00';
        if (prehour === '23' && premin === '30') {
            message.info('已超过一天最大时间');
            return;
        }
        if (premin === '30') {
            nowtime = (parseInt(prehour) + 1) + ':00';
        }
        if (premin === '00') {
            nowtime = prehour + ':30';
        }
        let step = { Tim: nowtime, Rate: 1 };
        let data = this.state.Tbl.Rtis;
        data = [...data, step]
        let Tbl = this.state.Tbl;
        Tbl.Rtis = data;
        this.setState({
            Tbl: Tbl,
        })
    }

    removeStep(index) {
        let a = [];
        let data = this.state.Tbl.Rtis;
        for (let i = 0; i < data.length; i++) {
            if (i !== index) {
                a = [...a, data[i]];
            }
        }
        data = a;
        let Tbl = this.state.Tbl;
        Tbl.Rtis = data;
        this.setState({
            Tbl: Tbl,
        })
    }

    onChangeType = (val, item, index) => {
        const a = { Tim: item.Tim, Rate: val };
        let data = this.state.Tbl.Rtis;
        data[index] = a;
        let Tbl = this.state.Tbl;
        Tbl.Rtis = data;
        this.setState({
            Tbl: Tbl,
        })
    };

    onChangeTime = (time, timeString, item, index) => {
        const a = { Tim: timeString, Rate: item.Rate };
        let data = this.state.Tbl.Rtis;
        data[index] = a;
        let Tbl = this.state.Tbl;
        Tbl.Rtis = data;
        this.setState({
            Tbl: Tbl,
        })
    };


    getDisabledHours(index) {
        if (index === 0) {
            return;
        }
        let hours = [];
        let time = this.state.Tbl.Rtis[index - 1].Tim;
        let timeArr = time.split(':');
        for (var i = 0; i < parseInt(timeArr[0]); i++) {
            hours.push(i);
        }
        if (parseInt(timeArr[1]) === 30) {
            hours.push(parseInt(timeArr[0]));
        }
        return hours;
    }

    getDisabledMinutes(selectHour, index) {
        if (index === 0) {
            return [];
        }
        let minutes = [];
        let time = this.state.Tbl.Rtis[index - 1].Tim;
        let timeArr = time.split(':');
        if (selectHour === parseInt(timeArr[0])) {
            minutes.push(0);
        }
        return minutes;
    }

}


export default Tbls;