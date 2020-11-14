import React, { Component } from 'react';
import { Row, Col, Select, TimePicker, Modal } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import './style.css';


const { Option } = Select;
class EditRatesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: [],
    };
    this.onOk = this.onOk.bind(this);

  }


  onChangeType = (val, item, index) => {
    const a = { value: item.value, type: val };
    let b = this.state.obj;
    b[index] = a;
    this.setState(({ obj: b }));
  };

  onChangeTime = (time, timeString, item, index) => {
    let c = timeString + '';
    const a = { value: c, type: item.type };
    let b = this.state.obj;
    b[index] = a;
    this.setState(({ obj: b }))
  }

  handleOk() {
    //这里是要改变
    // const obj = this.state.table[0].obj;
  }
  //props发生变化的时候更新state
  componentWillReceiveProps(nextProps) {
    if (this.props.obj !== nextProps.obj) {
      this.setState({
        obj: nextProps.obj,
      });
    }
  }

  render() {
    return (
      <Modal
        title={'时段表'}
        visible={this.props.show}
        onOk={this.onOk}
        onCancel={this.props.hide}
        destroyOnClose
        centered
      >
        <div style={{ margin: 20 }} >
          <Row >
            <Col  >
              {this.state.obj.map((item, index) => (
                <div className="rates_root" key={index}>
                  <TimePicker className="rates_input" value={moment(item.value, "HH:mm")} onChange={(time, timeString) => this.onChangeTime(time, timeString, item, index)} format="HH:mm" />
                  <Select className="rates_select" defaultValue='1' value={item.type} onChange={(val) => { this.onChangeType(val, item, index) }}>
                    <Option value="1">费率1</Option>
                    <Option value="2">费率2</Option>
                    <Option value="3">费率3</Option>
                    <Option value="4">费率4</Option>
                    <Option value="5">费率5</Option>
                    <Option value="6">费率6</Option>
                  </Select>
                </div>
              ))}

            </Col>
          </Row>
        </div>
      </Modal>
    );
  }
  onOk(){
    const obj = this.state.obj;
    this.props.setPropsData(obj);
    this.props.hide();
  }

}
const mapStateToProps = (state) => {
  return {
    show: state.setting_rate.show,
    obj: state.setting_rate.obj,

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    hide() {
      dispatch(actionCreators.getHideAction());
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditRatesModal);