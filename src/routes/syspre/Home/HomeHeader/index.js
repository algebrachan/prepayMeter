import React, { Fragment, Component } from 'react';
import { Avatar, Typography, Menu, Modal, Dropdown, Select } from 'antd';
import { getLoginVertificate } from '../../../../utils/Session';
import intl from 'react-intl-universal';
import './style.css';
const { Option } = Select;
const { confirm } = Modal;
const { localStorage } = window;
class HomeHeader extends Component {
    render() {

        let name = getLoginVertificate().Usnam;
        const menu = (
            <Menu>
                <Menu.Item>
                    <a href="#" onClick={() => this.logout()}> {intl.get('HEADER.LOGOUT.BTN')} </a>
                </Menu.Item>
            </Menu>
        );
        return (
            <Fragment>
                <img src={require('../../../../img/logo.png')} />
                {/* <span style={{ color: '#fff' }}>{intl.get('SIMPLE.LOCATION')}</span> */}
                <div className='syspre_home_header_avatar_div'>
                    <Select className="syspre_home_header_select"
                        size='small'
                        value={localStorage.getItem('locale')} onChange={this.changeLocales.bind(this)}>
                        <Option value="zh_CN">中文</Option>
                        <Option value="en_US">English</Option>
                    </Select>
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <Typography.Text className='syspre_home_header_avatar_text'>{name}</Typography.Text>
                    </Dropdown>
                </div>
            </Fragment>
        )
    }

    changeLocales(value) {
        console.log('value', value);
        localStorage.setItem('locale', value);
        window.location.reload();
    }
    logout() {
        //退出登录 清空session？
        confirm({
            title: `${intl.get('HEADER.LOGOUT.MODAL.TITLE')}`,
            content: `${intl.get('HEADER.LOGOUT.MODAL.CONTENT')}`,
            centered: true,
            onOk: () => {
                window.location.replace('/login');
            },
            onCancel: () => {

            },
        });
    }
}

export default HomeHeader;