import React, { Component } from 'react';
import { Button, Tag, Typography, Card, Switch, message, Spin } from 'antd';
import { withRouter } from 'react-router-dom';
import { switchMeter, keepPower } from '../../../../utils/api';
import intl from 'react-intl-universal';
import './style.css';


class Control extends Component {
  constructor(props) {
    super(props);
    const pathname = this.props.location.pathname;
    const arr = pathname.split('/');
    const keyid = arr[arr.length - 1];
    this.state = {
      keyid: keyid,
      protect: false,
      in: false,
      spinning: false,
    }
    this.loading = this.loading.bind(this);
  }


  render() {
    return (
      <div className="syspre_meterinfo_control">

        <Spin spinning={this.state.spinning}>
          <Card bordered className="meterinfo_control_card">
            <div className="meterinfo_control_item">
              <Typography.Text style={{ marginRight: '10px', fontSize: '15px' }}>合闸状态:</Typography.Text>
              {this.state.in ? <Tag color="green">合闸</Tag> : <Tag color="red">拉闸</Tag>}
              <Switch className="meterinfo_control_swh"
                checked={this.state.in} onChange={(checked) => this.onChangeIn(checked)} />
              <Button className="meterinfo_control_btn"
                type="primary" onClick={() => this.submitSwitch()}>{intl.get('COMMON_BTN.SUBMIT')}</Button>
            </div>
            <div className="meterinfo_control_item">
              <Typography.Text style={{ marginRight: '10px', fontSize: '15px' }}>保电状态:</Typography.Text>
              {this.state.protect ? <Tag color="green">保电</Tag> : <Tag color="red">不保电</Tag>}
              <Switch className="meterinfo_control_swh"
                checked={this.state.protect} onChange={(checked) => this.onChangePro(checked)} />
              <Button className="meterinfo_control_btn"
                type="primary" onClick={() => this.submitPower()}>{intl.get('COMMON_BTN.SUBMIT')}</Button>
            </div>
          </Card>
        </Spin>
      </div>
    )
  }
  componentDidMount() {
    this.requestData();
  }

  requestData() {
  }

  onChangeIn(checked) {
    this.setState({
      in: checked,
    })
  }
  onChangePro(checked) {
    this.setState({
      protect: checked,
    });
  }
  loading(spinning) {
    this.setState({
      spinning: spinning,
    });
  }
  submitSwitch() {
    const key = this.state.keyid;
    const stat = this.state.in;
    this.loading(true);
    switchMeter(key, stat,
      (res) => {
        this.loading(false);
        if (res.data.Status === 0) {
          message.success(`${intl.get('COMMON_MESSAGE.SET_SUCS')}`);
        }
        else {
          message.error(res.data.Message);
        }
      },
      () => {
        this.loading(false);
        message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
      }
    )
  }
  submitPower() {
    const key = this.state.keyid;
    const stat = this.state.protect;
    this.loading(true);
    keepPower(key, stat,
      (res) => {
        this.loading(false);
        if (res.data.Status === 0) {
          message.success(`${intl.get('COMMON_MESSAGE.SET_SUCS')}`);
        } else {
          message.error(res.data.Message);
        }
      },
      () => {
        this.loading(false);
        message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
      });
  }
}
export default withRouter(Control);