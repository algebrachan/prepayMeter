import React, { Component, Fragment } from 'react';
import { message, Input, Form, Button, Icon, Spin } from 'antd';
import intl from 'react-intl-universal';
import 'antd/dist/antd.css';
// import './login.css';
import './style.css';
import { login } from '../../utils/api';
import * as session from '../../utils/Session';

class NewLogin extends Component {
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
            <Fragment>

                <div className='login_root'>
                    <canvas id="canvas"></canvas>
                    {/* <Spin spinning={this.state.loading}> */}
                    <div className="login_form" >
                        <div>
                            <h3>{intl.get('LOGIN.TITLE')}</h3>
                        </div>
                        <input id="login_account" className="login_input" placeholder={intl.get('LOGIN.IPT_PH_ACT')} aotucomplete="off" />
                        <input type="password" id="login_password" className="login_input" placeholder={intl.get('LOGIN.IPT_PH_PSW')} aotucomplete="off" />
                        <div className="signup">
                            {/* <a className="gv" onClick={() => this.submit()}>登&nbsp;&nbsp;录</a> */}
                            <button className="gv" onClick={() => this.submit()}>{intl.get('LOGIN.SUBMIT')}</button>
                        </div>
                    </div>
                    {/* </Spin> */}
                    <div className="canvaszz"> </div>
                </div>
            </Fragment>
        );
    }
    componentDidMount() {
        var canvas = document.getElementById('canvas'),
            ctx = canvas.getContext('2d'),
            w = canvas.width = window.innerWidth,
            h = canvas.height = window.innerHeight,

            hue = 217,
            stars = [],
            count = 0,
            maxStars = 2500;//星星数量

        var canvas2 = document.createElement('canvas'),
            ctx2 = canvas2.getContext('2d');
        canvas2.width = 100;
        canvas2.height = 100;
        var half = canvas2.width / 2,
            gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
        gradient2.addColorStop(0.025, '#CCC');
        gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
        gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
        gradient2.addColorStop(1, 'transparent');

        ctx2.fillStyle = gradient2;
        ctx2.beginPath();
        ctx2.arc(half, half, half, 0, Math.PI * 2);
        ctx2.fill();

        // End cache

        function random(min, max) {
            if (arguments.length < 2) {
                max = min;
                min = 0;
            }

            if (min > max) {
                var hold = max;
                max = min;
                min = hold;
            }

            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function maxOrbit(x, y) {
            var max = Math.max(x, y),
                diameter = Math.round(Math.sqrt(max * max + max * max));
            return diameter / 2;
            //星星移动范围，值越大范围越小，
        }

        var Star = function () {

            this.orbitRadius = random(maxOrbit(w, h));
            this.radius = random(60, this.orbitRadius) / 18;
            //星星大小
            this.orbitX = w / 2;
            this.orbitY = h / 2;
            this.timePassed = random(0, maxStars);
            this.speed = random(this.orbitRadius) / 500000;
            //星星移动速度
            this.alpha = random(2, 10) / 10;

            count++;
            stars[count] = this;
        }

        Star.prototype.draw = function () {
            var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
                y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
                twinkle = random(10);

            if (twinkle === 1 && this.alpha > 0) {
                this.alpha -= 0.05;
            } else if (twinkle === 2 && this.alpha < 1) {
                this.alpha += 0.05;
            }

            ctx.globalAlpha = this.alpha;
            ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
            this.timePassed += this.speed;
        }

        for (var i = 0; i < maxStars; i++) {
            new Star();
        }

        function animation() {
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 0.5; //尾巴
            ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
            ctx.fillRect(0, 0, w, h)

            ctx.globalCompositeOperation = 'lighter';
            for (var i = 1, l = stars.length; i < l; i++) {
                stars[i].draw();
            };

            window.requestAnimationFrame(animation);
        }
        animation();
    }

    setLoadingState(islogin) {
        this.setState({
            loading: islogin,
        })
    }

    submit() {
        // e.preventDefault();
        if (this.state.isLoading === true) {
            return;
        }
        let usnam = document.getElementById('login_account').value;
        let paswd = document.getElementById('login_password').value;
        const sys = 1;
        //
        if (!usnam || usnam.length === 0 || !paswd || paswd.length === 0) {
            message.error(`${intl.get('LOGIN.MSG_ACCOUNT_ERR')}`);
            return;
        }
        if (!sys || sys.length === 0) {
            message.error(`${intl.get('LOGIN.MSG_SYS_ERR')}`);
            return;
        }
        this.setLoadingState(true);
        login(usnam,
            paswd,
            sys,
            (res) => {
                this.setLoadingState(false);
                if (res.data.Status === 0) {
                    message.success(`${intl.get('LOGIN.MSG_LOGIN_SUC')}`);
                    session.setLoginVertificate(res.data.Data);
                    if (res.data.Data.CurSys === 1) {
                        // this.props.history.push('/dataview');
                        // window.location.replace('/dataview');
                        window.location.replace('/syspre/home');// 用replace的话将当前页面销毁，不会再回退到该页面
                    }
                    if (res.data.Data.CurSys === 2) {
                        this.props.history.push('/sysirr/home');
                    }
                    if (res.data.Data.CurSys === 4) {
                        this.props.history.push('/sysswh/home');
                    }
                }
                else {
                    // 登录异常
                    message.error(res.data.Message);
                }
            },
            () => {
                this.setLoadingState(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            });
    }
}

export default Form.create()(NewLogin);