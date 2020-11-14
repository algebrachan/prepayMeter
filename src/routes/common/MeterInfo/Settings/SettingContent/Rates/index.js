import React, { Component, Fragment } from 'react';
import { Button, Row, Col, Typography, TimePicker, Icon, Timeline } from 'antd';
import { connect } from 'react-redux';
import * as actionCreators from './EditRatesModal/store/actionCreators';
import EditRatesModal from './EditRatesModal';
import moment from 'moment';
import intl from 'react-intl-universal';
import './style.css';


class Rates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: [
        { value: '00:00', type: '1' },
        { value: '01:00', type: '2' },
        { value: '05:00', type: '3' },
        { value: '07:00', type: '1' },
        { value: '09:00', type: '2' },
        { value: '11:00', type: '3' },
        { value: '15:00', type: '1' },
        { value: '23:59', type: '2' },
      ],
      time: [
      ],
    }
    this.onChange = this.onChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  componentDidMount() {
  }
  render() {
    const count = this.state.time.length;
    const timeFormat = 'HH:mm';
    return (
      <div style={{ margin: 20 }} >
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <div className="setting_rates_timeline">
              <Fragment>
                <div className="setting_rates_timeline_title">
                  <h1>时段表</h1>
                </div>
                <Timeline>
                  {this.state.table.map((item, index) => (
                    <Timeline.Item>{item.value} : 费率 {item.type}</Timeline.Item>
                  ))}
                </Timeline>
                <Button className="setting_rates_timeline_btn" type="primary" icon='edit' onClick={() => this.onEdit(this.state.table)}>{intl.get('COMMON_BTN.EDIT')}</Button>
              </Fragment>
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8} className="rate_time_root">
            <Fragment>
              {this.state.time.map((item, index) => (
                <div className="rate_time_pick">
                  <Typography.Text>{`冻结时间${index + 1}：`}</Typography.Text>
                  <TimePicker
                    onChange={(time, timeString) => this.onChange(time, timeString, index)}
                    value={item.value === '' ? 0 : moment(item.value, timeFormat)}
                    format={timeFormat} />
                  <Icon
                    className="rate_time_del_button"
                    type="minus-circle-o"
                    onClick={() => this.removeTime(index)}
                  />
                  <Button type="primary" onClick={() => this.submit()}>{intl.get('COMMON_BTN.SUBMIT')}</Button>
                </div>
              ))}
              {count < 1 ?
                <div className="rate_time_add_button">
                  <Button type="dashed" onClick={() => this.addTime()}>
                    <Icon type="plus" /> 新增冻结时间
                  </Button>
                </div>
                : ''}
            </Fragment>
          </Col>
        </Row>
        <EditRatesModal setPropsData={(obj) => this.setData(obj)} />
      </div>
    );
  }

  setData(obj) {
    this.setState({
      table: obj,
    });
  }

  submit() {
    // const a = this.state.time;
  }
  onChange(time, timeString, index) {
    let t = this.state.time;
    t[index].value = timeString + '';
    this.setState({
      time: t,
    });
  }
  onEdit(obj) {
    let a = undefined;
    a = obj;
    this.props.showEditRates(a);
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



}
const mapStateToProps = (state) => {
  return {
    show: state.setting_rate.show,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    hide() {
      dispatch(actionCreators.getHideAction());
    },
    showEditRates(obj) {
      dispatch(actionCreators.getEditAction(obj));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Rates);