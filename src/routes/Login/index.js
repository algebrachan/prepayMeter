import React, { Component } from 'react';
import { Input, Button, Icon, Form, message, Radio, Typography } from 'antd';
import 'antd/dist/antd.css';
import './style.css';
import { login } from '../../utils/api';
import * as session from '../../utils/Session';

class Login extends Component {
    //构造器，初始化
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
        this.submit = this.submit.bind(this);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login_root'>
                <div style={{ height: 200 }}></div>
                <div className="login_form">
                    <div>
                        <h3>智慧能源管理平台</h3>
                    </div>
                    <Form
                        onSubmit={this.submit}>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{
                                    required: false, message: '',
                                }],
                            })(
                                <Input
                                    className='login_input'
                                    allowClear
                                    placeholder="请输入账号"
                                    prefix={<Icon type="user" />}
                                    autoComplete='off' />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: false, message: '',
                                }],
                            })(
                                <Input.Password
                                    className='login_input'
                                    allowClear
                                    placeholder="请输入密码"
                                    prefix={<Icon type="lock" />}
                                    autoComplete='off' />
                            )}
                        </Form.Item>
                        {/* <Form.Item>
                            {getFieldDecorator('system', {})(
                                <Radio.Group >
                                    <Radio value={1}><Typography.Text style={{ color: '#ffffff' }}>预付费系统</Typography.Text></Radio>
                                    <Radio value={2}><Typography.Text style={{ color: '#ffffff' }}>农灌表系统</Typography.Text></Radio>
                                    <Radio value={4}><Typography.Text style={{ color: '#ffffff' }}>户外开关系统</Typography.Text></Radio>
                                </Radio.Group>
                            )}

                        </Form.Item> */}
                        <Form.Item>
                            {getFieldDecorator('submit', {})(
                                <Button loading={this.state.loading}
                                    htmlType='submit' className='submit'
                                    type='primary'>登录</Button>
                            )}
                        </Form.Item>

                    </Form>
                </div>
            </div>
        )
    }

    setLoadingState(islogin) {
        this.setState({
            loading: islogin,
        })
    }

    submit(e) {
        e.preventDefault();
        if (this.state.isLoading === true) {
            return;
        }

        const form = this.props.form;
        const usnam = form.getFieldValue('username');
        const paswd = form.getFieldValue('password');
        // const sys = form.getFieldValue('system');
        const sys = 1;
        //
        if (!usnam || usnam.length === 0 || !paswd || paswd.length === 0) {
            message.error('请输入账号和密码');
            return;
        }
        if (!sys || sys.length === 0) {
            message.error('请选择系统');
            return;
        }
        this.setLoadingState(true);
        login(usnam,
            paswd,
            sys,
            (res) => {
                //状态等于0 登录成功
                if (res.data.Status === 0) {
                  
                    session.setLoginVertificate(res.data.Data);
                    if (res.data.Data.CurSys === 1) {
                        window.location.replace('/syspre/home');
                        // this.props.history.push('/syspre/home');
                    }
                    if (res.data.Data.CurSys === 2) {
                        this.props.history.push('/sysirr/home');
                    }
                    if (res.data.Data.CurSys === 4) {
                        this.props.history.push('/sysswh/home');
                    }
                }
                else {
                    this.setLoadingState(false);
                    message.error(res.data.Message);
                }
            },
            () => {
                this.setLoadingState(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            });

    }
}

export default Form.create()(Login);