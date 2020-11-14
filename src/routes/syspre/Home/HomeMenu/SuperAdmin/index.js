import React, { Component } from 'react';
import { Menu, Icon } from "antd";
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css';


const { SubMenu } = Menu;


class SuperAdmin extends Component {
  render() {

    return (
      <div className='menuwrapper'>

        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
        >

          <Menu.Item key="1">
            <Link to='/syspre/home'>
              <Icon type="home" />
              <span>{intl.get('MENU.SYSPRE_SUPER_ADMIN')}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to='/syspre/home/agentlist'>
              <Icon type="user" />
              <span>{intl.get('MENU.AGENT_MANAGE')}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to='/syspre/home/userlist'>
              <Icon type="user" />
              <span>{intl.get('MENU.USER_MANAGE')}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to='/syspre/home/collectlist'>
              <Icon type="tool" />
              <span>{intl.get('MENU.GTWY_MANAGE')}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to='/syspre/home/meterlist'>
              <Icon type="tool" />
              <span>{intl.get('MENU.METER_MANAGE')}</span>
            </Link>
          </Menu.Item>
          {/* <Menu.Item key="6">
            <Link to='/syspre/home/agent/income'>
              <Icon type="account-book" />
              <span>进销查询</span>
            </Link>
          </Menu.Item> */}
          {/* <SubMenu key="7" title={<span><Icon type="pie-chart" /><span>数据管理</span></span>}>
                <Menu.Item key="71"><Link to='/syspre/home/data/record'>记录查询</Link></Menu.Item>
                <Menu.Item key="73"><Link to='/syspre/home/data/statistics'>统计数据</Link></Menu.Item>
                <Menu.Item key="74"><Link>数据分析</Link></Menu.Item>
            </SubMenu> */}
          {/* <SubMenu key="8" title={<span><Icon type="setting"/><span>参数和控制</span></span>}>
                <Menu.Item key="81"><Link to='/syspre/home/settings'>参数和设置</Link></Menu.Item> 
                <Menu.Item key="82"><Link>控制</Link></Menu.Item>    
            </SubMenu>  */}
          <SubMenu key="9" title={<span><Icon type="user" /><span>{intl.get('MENU.ACCOUNT_MANAGE')}</span></span>}>
            <Menu.Item key="91"><Link to='/syspre/home/super/account'>{intl.get('MENU.AGENT_ACCOUNT')}</Link></Menu.Item>
            <Menu.Item key="92"><Link to='/syspre/home/agent/account'>{intl.get('MENU.MOD_PSW')}</Link></Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

export default SuperAdmin;