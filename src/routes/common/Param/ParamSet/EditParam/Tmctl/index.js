import React, { Component } from 'react';
import { Card, Typography, Popover, TimePicker, Icon, Button } from 'antd';
import moment from 'moment';

const timeContent = (
    <div>
        <p>时段开始和结束时间，一天最多支持4个时段</p>
    </div>
);
const timeFormat = 'HH:mm';
class Tmctl extends Component {

    render() {
        let count2 = this.props.data.tmctl.length;
        return (
            <div className="syspre_param_info_item_root" id="param_tmctl">
                <Card style={{ width: 550 }}>
                    {this.props.data.tmctl.map((item, index) => {
                        return (

                            <div className="param_info_item" key={index}>
                                <Popover title='时段控制' content={timeContent}>
                                    <Typography.Text className="param_info_item_label">{`时段${index + 1}：`}</Typography.Text>
                                </Popover>
                                <TimePicker placeholder="请选择开始时间" style={{ width: 145 }}
                                    value={item.start === '' ? 0 : moment(item.start, timeFormat)}
                                    onChange={(time, timeStr) => this.onChangeIntervalST(time, timeStr, index)}
                                    format={timeFormat}
                                />
                                <Typography.Text style={{ width: 10, display: 'inline-block', textAlign: 'center' }}>-</Typography.Text>
                                <TimePicker placeholder="请选择结束时间" style={{ width: 145 }}
                                    value={item.end === '' ? 0 : moment(item.end, timeFormat)}
                                    onChange={(time, timeStr) => this.onChangeIntervalET(time, timeStr, index)}
                                    format={timeFormat}
                                    disabledHours={() => this.getDisabledHours(item.start)}
                                    disabledMinutes={(selectHour) => this.getDisabledMinutes(selectHour, item.start)} />
                                <Icon
                                    className="param_dynamic_delete_button"
                                    type="minus-circle-o"
                                    onClick={() => this.removeInterval(index)}
                                />
                            </div>
                        );
                    })}
                    {count2 < 4 ?
                        <div style={{ margin: 5 }}>
                            <Button type="dashed" onClick={() => this.addInterval()} className="param_item_add_button">
                                <Icon type="plus" /> 新增时段控制时段
                            </Button>
                        </div>
                        : ''}
                </Card>
            </div>
        );
    }

    onChangeIntervalST(time, timeStr, index) {
        let data = this.props.data;
        data.tmctl[index].start = timeStr;
        this.props.fatherData(data);
    }

    onChangeIntervalET(time, timeStr, index) {
        let data = this.props.data;
        data.tmctl[index].end = timeStr;
        this.props.fatherData(data);
    }

    addInterval() {
        let time = { start: '', end: '' };
        let data = this.props.data;
        data.tmctl = [...data.tmctl, time]
        this.props.fatherData(data);
    }

    removeInterval(index) {
        let a = [];
        let data = this.props.data;
        for (let i = 0; i < data.tmctl.length; i++) {
            if (i !== index) {
                a = [...a, data.tmctl[i]];
            }
        }
        data.tmctl = a;
        this.props.fatherData(data);
    }

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
export default Tmctl;