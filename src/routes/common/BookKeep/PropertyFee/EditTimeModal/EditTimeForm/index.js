import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';
class EditTimeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tkey: props.tkey,
            expire: props.expire,
            mode: props.mode,
        }
    }

    render() {

        return (
            <div>
                <div style={{ display: 'inline-block' }}>
                    <div style={{ display: 'inline-block' }}>到期时间：</div>
                    <div style={{ display: 'inline-block' }}>
                        <DatePicker
                            value={moment(this.state.expire, dateFormat)}
                            format={dateFormat}
                            onChange={(date, dateStr) => this.onChangeTime(date, dateStr)}
                        />
                    </div>
                </div>
            </div>
        );
    }

    onChangeTime(date, dateStr) {
        let time = moment(dateStr).valueOf();
        this.setState({
            expire: dateStr
        });
        this.props.SetData(time, this.state.tkey);
    }
}

export default EditTimeForm;