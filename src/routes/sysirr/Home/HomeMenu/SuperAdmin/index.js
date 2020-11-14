import React, { Component } from 'react';
import { Menu, Icon } from "antd";
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
            <Link to='/sysirr/home'>
              <Icon type="home" />
              <span>农灌表超级管理员</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to='/sysirr/home/agentlist'>
              <Icon type="user" />
              <span>经销商管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to='/sysirr/home/userlist'>
              <Icon type="user" />
              <span>用户管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
                <Link to='/sysirr/home/collectlist'>
                <Icon type="tool" />
                    <span>采集器管理</span>
                </Link>    
            </Menu.Item>
          <Menu.Item key="5">
            <Link to='/sysirr/home/meterlist'>
              <Icon type="tool" />
              <span>电表管理</span>
            </Link>
          </Menu.Item>
          {/* <Menu.Item key="6">
            <Link to='/sysirr/home/agent/income'>
              <Icon type="account-book" />
              <span>进销查询</span>
            </Link>
          </Menu.Item> */}
          {/* <SubMenu key="6" title={<span><Icon type="pie-chart" /><span>数据管理</span></span>}>
                <Menu.Item key="61"><Link to='/sysirr/home/data/record'>记录查询</Link></Menu.Item>
                <Menu.Item key="62"><Link to='/sysirr/home/data/realtime'>实时数据</Link></Menu.Item>
                <Menu.Item key="63"><Link>统计数据</Link></Menu.Item>
                <Menu.Item key="64"><Link>数据分析</Link></Menu.Item>
            </SubMenu> */}
          {/* <SubMenu key="7" title={<span><Icon type="setting"/><span>参数和控制</span></span>}>
                <Menu.Item key="71"><Link to='/sysirr/home/settings'>参数和设置</Link></Menu.Item> 
                <Menu.Item key="72"><Link>控制</Link></Menu.Item>    
            </SubMenu>   */}
          <SubMenu key="8" title={<span><Icon type="user" /><span>账号管理</span></span>}>
            <Menu.Item key="81"><Link to='/sysirr/home/super/account'>经销商账号</Link></Menu.Item>
            <Menu.Item key="82"><Link to='/sysirr/home/agent/account'>修改密码</Link></Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

export default SuperAdmin;