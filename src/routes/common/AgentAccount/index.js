import React, { Component } from 'react';
import { Input, Form, Button, Row, Col, Card, message, notification } from 'antd';
import { changePassword } from '../../../utils/api';
import { getLoginVertificate } from '../../../utils/Session';
import intl from 'react-intl-universal';
import './style.css';

const openNotification = () => {
  notification.open({
    message: '已重置',
    description: '',
    onClick: () => {
    },
  });
};

class AgentAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
    this.validatorLength = this.validatorLength.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 6 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
    };
    return (
      <div className="syspre_agent_account">
        <Card className="syspre_agent_account_card" title="修改密码" bordered >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="旧密码" {...formItemLayout}>
              {getFieldDecorator('oldp', {
                rules: [{ required: true, message: '请输入旧密码' }, { validator: this.validatorLength }],
              })(
                <Input autoComplete='off' placeholder='旧密码' />
              )}
            </Form.Item>
            <Form.Item label="新密码" {...formItemLayout}>
              {getFieldDecorator('newp1', {
                rules: [{ required: true, message: '请输入新密码' }, { validator: this.validatorLength }],
              })(
                <Input autoComplete='off' placeholder='新密码' />
              )}
            </Form.Item>
            <Form.Item label="确认密码" {...formItemLayout}>
              {getFieldDecorator('newp2', {
                rules: [{ required: true, message: '请输入新密码' }, { validator: this.validatorLength }],
              })(
                <Input autoComplete='off' placeholder='确认密码' />
              )}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
              <Row>
                <Col span={8} offset={4}>
                  <Button type="primary" htmlType="submit" > {intl.get('COMMON_BTN.SUBMIT')} </Button>
                </Col>
                <Col span={8} offset={2}>
                  <Button onClick={this.handleReset}>{intl.get('COMMON_BTN.RESET')}</Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }

  validatorLength(rule, value, callback) {
    if (value && value.length > 20) {
      callback('请输入小于20个字符');
    } else {
      callback();
    }
  }

  setLoadingState(islogin) {
    this.setState({
      loading: islogin,
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.isLoading === true) {
      return;
    }
    const form = this.props.form;
    const oldp = form.getFieldValue('oldp');
    const newp1 = form.getFieldValue('newp1');
    const newp2 = form.getFieldValue('newp2');
    const usnam = getLoginVertificate().Usnam;

    if (!oldp || oldp.length === 0) {
      message.info('请输入旧密码');
      return;
    }
    if (!newp1 || newp1.length === 0 || !newp2 || newp2.length === 0) {
      message.info('请输入新密码');
      return;
    }
    if (!(newp1 === newp2)) {
      message.error('两次新密码输入不一致');
      return;
    }
    this.setLoadingState(true);
    //(usnam, oldp, newp, then, error)
    changePassword(usnam,
      oldp,
      newp1,
      (res) => {
        if (res.data.Status === 0) {
          this.setLoadingState(false);
          message.success(`${intl.get('COMMON_MESSAGE.SAVE_SUCS')}`);
        } else {
          this.setLoadingState(false);
          message.error('' + res.data.Message);
        }
      },
      () => {
        this.setLoadingState(false);
        message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
      });
    //重置
    form.resetFields();
  }
  // 要写成箭头函数形式
  handleReset = () => {
    openNotification();
    this.props.form.resetFields();
  };
}
export default Form.create({})(AgentAccount);