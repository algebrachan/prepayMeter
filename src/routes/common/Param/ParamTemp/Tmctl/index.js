import React, { Component } from 'react';
import { Card, Typography, Popover, TimePicker, Select } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import * as paramTempCtors from '../store/actionCreators';

const { Option } = Select;
const timeContent = (
    <div>
        <p>时段开始和结束时间，一天最多支持4个时段</p>
    </div>
);

const timeFormat = 'HH:mm';
class Tmctl extends Component {
    constructor(props) {
        super(props);
        let pindex = this.props.index

        this.state = {
            pindex: pindex,
        }
    }

    render() {
        let pindex = this.props.index;
        let m = this.props.paramlist.Tmctl.Tbls[pindex].Msk;
        let a = [];
        const b = [1, 2, 4, 8, 16, 32, 64];
        for (let i = 0; i < b.length; i++) {
            if ((m & b[i]) === b[i]) {
                a = [...a, b[i]]
            }
        }
        return (
            <div className="syspre_param_info_item_root" id="param_tmctl">
                <Card style={{ width: 550 }}>
                    <div className="syspre_param_info_item_title">{this.props.name}</div>
                    <div className="param_info_item" >
                        <Typography.Text className="param_info_item_label">有效日期：</Typography.Text>
                        <Select
                            mode="multiple"

                            onChange={(value) => this.onChangeWeek(value)}
                            className="param_info_weekday"
                            value={a}
                            disabled={this.props.disabled}
                        >
                            <Option value={1}>日</Option>
                            <Option value={2}>一</Option>
                            <Option value={4}>二</Option>
                            <Option value={8}>三</Option>
                            <Option value={16}>四</Option>
                            <Option value={32}>五</Option>
                            <Option value={64}>六</Option>
                        </Select>
                    </div>
                    {this.props.paramlist.Tmctl.Tbls[pindex].Tis.map((item, index) => {
                        return (
                            <div className="param_info_item" key={index}>
                                <Popover title='时段控制' content={timeContent}>
                                    <Typography.Text className="param_info_item_label">{`时段${index + 1}：`}</Typography.Text>
                                </Popover>
                                <TimePicker placeholder="开始" style={{ width: 145 }}
                                    value={item.Start === '' ? 0 : moment(item.Start, timeFormat)}
                                    onChange={(time, timeStr) => this.onChangeIntervalST(time, timeStr, index, pindex)}
                                    format={timeFormat}
                                    disabled={this.props.disabled}
                                />
                                <Typography.Text style={{ width: 10, display: 'inline-block', textAlign: 'center' }}>-</Typography.Text>
                                <TimePicker placeholder="结束" style={{ width: 145 }}
                                    value={item.End === '' ? 0 : moment(item.End, timeFormat)}
                                    onChange={(time, timeStr) => this.onChangeIntervalET(time, timeStr, index, pindex)}
                                    format={timeFormat}
                                    disabledHours={() => this.getDisabledHours(item.Start)}
                                    disabledMinutes={(selectHour) => this.getDisabledMinutes(selectHour, item.Start)}
                                    disabled={this.props.disabled} />
                                {/* {this.props.disabled ? '' :
                                    <Icon
                                        className="param_dynamic_delete_button"
                                        type="minus-circle-o"
                                        onClick={() => this.removeInterval(index)}
                                    />
                                } */}
                            </div>
                        );
                    })}
                    {/* {count2 < 4 && !this.props.disabled ?
                        <div style={{ margin: 5 }}>
                            <Button type="dashed" onClick={() => this.addInterval()} className="param_item_add_button">
                                <Icon type="plus" /> 新增时段控制时段
                            </Button>
                        </div>
                        : ''} */}
                </Card>
            </div>
        );
    }


    onChangeWeek(value) {

        let pindex = this.state.pindex
        let data = this.props.paramlist.Tmctl.Tbls[pindex];
        let mask = 0;
        for (let i = 0; i < value.length; i++) {
            mask += value[i];
        }
        data.Msk = mask;
        this.props.editTmctlAction(data);
    }

    onChangeIntervalST(time, timeStr, index, pindex) {
        let data = this.props.paramlist.Tmctl.Tbls[pindex];
        data.Tis[index].Start = timeStr;
        this.props.editTmctlAction(data);
    }

    onChangeIntervalET(time, timeStr, index, pindex) {
        let data = this.props.paramlist.Tmctl.Tbls[pindex];
        data.Tis[index].End = timeStr;
        this.props.editTmctlAction(data);
    }

    // addInterval() {
    //     let time = { start: '', end: '' };
    //     let data = this.props.data;
    //     data.tmctl = [...data.tmctl, time]
    //     this.props.fatherData(data);
    // }

    // removeInterval(index) {
    //     let a = [];
    //     let data = this.props.data;
    //     for (let i = 0; i < data.tmctl.length; i++) {
    //         if (i !== index) {
    //             a = [...a, data.tmctl[i]];
    //         }
    //     }
    //     data.tmctl = a;
    //     this.props.fatherData(data);
    // }

    getDisabledHours(time) {
        let hours = [];
        let timeArr = time.split(':');
        for (var i = 0; i < parseInt(timeArr[0]); i++) {
            hours.push(i);
        }
        if (parseInt(timeArr[1]) === 59) {
            hours.push(parseInt(timeArr[0]));
        }
        return hours;
    }

    getDisabledMinutes(selectHour, time) {
        let minutes = [];
        let timeArr = time.split(':');
        if (parseInt(timeArr[1]) === 59) {
            return minutes;
        }
        if (selectHour === parseInt(timeArr[0])) {
            for (var i = 0; i <= parseInt(timeArr[1]); i++) {
                minutes.push(i);
            }
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
        editTmctlAction(value, index) {
            dispatch(paramTempCtors.editTmctlAction(value, index));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tmctl);