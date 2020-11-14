import React, { Component } from 'react';
import { Button, Select, TimePicker, Modal, Timeline, Card } from 'antd';
import moment from 'moment';
import intl from 'react-intl-universal';

const { Option } = Select;
class Tbls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
        this.onChange = this.onChange.bind(this);
        this.onEdit = this.onEdit.bind(this);

    }
    render() {
        const timeFormat = 'HH:mm';
        return (
            <div className="syspre_param_info_item_root" id="param_tbls">
                <Card style={{ width: 550 }}>
                    <div className="param_tbls_root">
                        <div className="param_tbls_title">
                            <h1>时段表</h1>
                        </div>
                        <Timeline style={{ marginLeft: 40 }}>
                            {this.props.data.tbls.map((item, index) => (
                                <Timeline.Item key={index}>{item.Tim} : 费率 {item.Rate}</Timeline.Item>
                            ))}
                        </Timeline>
                        <Button className="param_tbls_btn" type="primary" icon='edit' onClick={() => this.onEdit(this.props.data.tbls)}>{intl.get('COMMON_BTN.EDIT')}</Button>
                    </div>
                </Card>
                <Modal
                    title={'时段表'}
                    visible={this.state.show}
                    onOk={() => this.showModal(false)}
                    onCancel={() => this.showModal(false)}
                    cancelButtonProps={{ disabled: true }}
                    destroyOnClose
                    centered
                >
                    <div style={{ margin: 20 }} >
                        {this.props.data.tbls.map((item, index) => (
                            <div className="param_tbls_modal_root" key={index}>
                                <TimePicker className="param_tbls_modal_input"
                                    value={item.Tim === '' ? 0 : moment(item.Tim, timeFormat)}
                                    onChange={(time, timeString) => this.onChangeTime(time, timeString, item, index)}
                                    format={timeFormat}
                                    minuteStep={30}
                                    disabledHours={() => this.getDisabledHours(index)}
                                    disabledMinutes={(selectHour) => this.getDisabledMinutes(selectHour, index)} />
                                <Select className="param_tbls_modal_select" defaultValue='1' value={item.Rate} onChange={(val) => this.onChangeType(val, item, index)}>
                                    <Option value="1">费率1</Option>
                                    <Option value="2">费率2</Option>
                                    <Option value="3">费率3</Option>
                                    <Option value="4">费率4</Option>
                                </Select>
                            </div>
                        ))}
                    </div>
                </Modal>
            </div>
        );
    }

    showModal(value) {
        this.setState({
            show: value,
        });
    }
    onChange(time, timeString, index) {
        let t = this.state.time;
        t[index].value = timeString + '';
        this.setState({
            time: t,
        });
    }
    onEdit(obj) {

        this.showModal(true);
    }
    addTime() {
        let time = { value: '00:00' };
        let t = this.state.time;
        t = [...t, time];
        this.setState({
            time: t,
        });

    }
    removeTime(index) {
        let a = [];
        let t = this.state.time;
        for (let i = 0; i < t.length; i++) {
            if (i !== index) {
                a = [...a, t[i]];
            }
        }
        this.setState(({
            time: a,
        }));
    }

    onChangeType = (val, item, index) => {
        const a = { Tim: item.Tim, Rate: val };
        let data = this.props.data;
        data.tbls[index] = a;
        this.props.fatherData(data);
    };

    onChangeTime = (time, timeString, item, index) => {
        const a = { Tim: timeString, Rate: item.Rate };
        let data = this.props.data;
        data.tbls[index] = a;
        this.props.fatherData(data);
    };


    onOk() {
        this.showModal(false);
    }

    getDisabledHours(index) {
        if (index === 0) {
            return;
        }
        let hours = [];
        let time = this.props.data.tbls[index - 1].Tim;
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
        let time = this.props.data.tbls[index - 1].Tim;
        let timeArr = time.split(':');
        if (selectHour === parseInt(timeArr[0])) {
            minutes.push(0);
        }
        return minutes;
    }

}
export default Tbls;