import React, { Fragment, Component } from 'react';
import { Avatar, Divider, Typography, Button, Modal } from 'antd';
import { getLoginVertificate } from '../../../../utils/Session';
import './style.css';

const { confirm } = Modal;
class HomeHeader extends Component {

    render() {

        let name = getLoginVertificate().Usnam;

        return (
            <Fragment>

                <div className='sysirr_home_header_avatar_div'>
                    <Avatar className='sysirr_home_header_avatar' size={42} >
                        <Typography.Text className='sysirr_home_header_avatar_text'>{name}</Typography.Text>
                    </Avatar>
                    <Button size="small" style={{ marginLeft: 5 }} onClick={() => this.logout()}>退出登录</Button>

                </div>
                <Divider />
            </Fragment>
        )
    }

    logout() {
        //退出登录 清空session？

        confirm({
            title: '退出登录',
            content: '您确定要退出登录吗？',
            centered: true,
            okText: '确定',
            onOk: () => {
                window.location.replace('/login');
            },
            onCancel: () => {

            },
        });
    }
}

export default HomeHeader;