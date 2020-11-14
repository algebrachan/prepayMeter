import React, { Component } from 'react';
import { Button, Select, TimePicker, Icon, Card, Popover, message } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import * as paramTempCtors from '../store/actionCreators';

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
            show: false,
        }
    }

    render() {
        let count = this.props.paramlist.Tbl.Rtis.length;
        const timeFormat = 'HH:mm';
        return (
            <div className="syspre_param_info_item_root" id="param_tbls">
                <Card style={{ width: 550 }}>
                    <Popover content={tblsContent} title="时段">
                        <div className="syspre_param_info_item_title">时段表</div>
                    </Popover>
                    {this.props.paramlist.Tbl.Rtis.map((item, index) => (
                        <div className="param_info_item" key={index}>
                            <TimePicker className="param_tbls_modal_input"
                                value={item.Tim === '' ? 0 : moment(item.Tim, timeFormat)}
                                onChange={(time, timeString) => this.onChangeTime(time, timeString, item, index)}
                                format={timeFormat}
                                minuteStep={30}
                                disabledHours={() => this.getDisabledHours(index)}
                                disabledMinutes={(selectHour) => this.getDisabledMinutes(selectHour, index)}
                                disabled={index === 0 || this.props.disabled} />
                            <Select className="param_tbls_modal_select"
                                value={item.Rate}
                                onChange={(val) => this.onChangeType(val, item, index)}
                                disabled={this.props.disabled}>
                                <Option value={1}>费率1</Option>
                                <Option value={2}>费率2</Option>
                                <Option value={3}>费率3</Option>
                                <Option value={4}>费率4</Option>
                            </Select>
                            {index === 0 || this.props.disabled ? '' :
                                <Icon
                                    className="param_dynamic_delete_button"
                                    type="minus-circle-o"
                                    onClick={() => this.removeStep(index)}
                                />
                            }
                        </div>
                    ))}
                    {count < 8 && !this.props.disabled ?
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

    addStep() {
        // 判断上一次的时间
        let index = this.props.paramlist.Tbl.Rtis.length;
        let pretime = this.props.paramlist.Tbl.Rtis[index - 1].Tim;
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
        let data = this.props.paramlist.Tbl.Rtis;
        data = [...data, step]
        this.props.editTblAction(data);
    }

    removeStep(index) {
        let a = [];
        let data = this.props.paramlist.Tbl.Rtis;
        for (let i = 0; i < data.length; i++) {
            if (i !== index) {
                a = [...a, data[i]];
            }
        }
        data = a;
        this.props.editTblAction(data);
    }

    onChangeType = (val, item, index) => {
        const a = { Tim: item.Tim, Rate: val };
        let data = this.props.paramlist.Tbl.Rtis;
        data[index] = a;
        this.props.editTblAction(data);
    };

    onChangeTime = (time, timeString, item, index) => {
        const a = { Tim: timeString, Rate: item.Rate };
        let data = this.props.paramlist.Tbl.Rtis;
        data[index] = a;
        this.props.editTblAction(data);
    };


    getDisabledHours(index) {
        if (index === 0) {
            return;
        }
        let hours = [];
        let time = this.props.paramlist.Tbl.Rtis[index - 1].Tim;
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
        let time = this.props.paramlist.Tbl.Rtis[index - 1].Tim;
        let timeArr = time.split(':');
        if (selectHour === parseInt(timeArr[0])) {
            minutes.push(0);
        }
        return minutes;
    }

}

const mapStateToProps = (state) => {
    return {
        paramlist: state.param_temp.paramlist,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        editTblAction(value) {
            dispatch(paramTempCtors.editTblAction(value));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tbls);