import React, { Component } from 'react';
import { Menu, Icon } from "antd";
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css';

const { SubMenu } = Menu;
class AgentAdmin extends Component {
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
              <span>经销商管理系统</span>
            </Link>
          </Menu.Item>
          {/* <Menu.Item key="2">
              <Link>
              <Icon type="user" />
                <span>用户管理</span>
              </Link>
          </Menu.Item> */}
          <Menu.Item key="3">
            <Link to='/sysirr/home/collectlist'>
              <Icon type="tool" />
              <span>采集器管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to='/sysirr/home/meterlist'>
              <Icon type="tool" />
              <span>电表管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to='/sysirr/home/group/manage'>
              <Icon type="usergroup-add" />
              <span>分组管理</span>
            </Link>
          </Menu.Item>
          {/* <Menu.Item key="6">
            <Link to='/sysirr/home/agent/income'>
              <Icon type="account-book" />
              <span>进销查询</span>
            </Link>
          </Menu.Item> */}
          <SubMenu key="7" title={<span><Icon type="setting" /><span>参数</span></span>}>
            <Menu.Item key="71"><Link to='/sysirr/home/param/template'>模板列表</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="8" title={<span><Icon type="user" /><span>账号管理</span></span>}>
            <Menu.Item key="81"><Link to='/sysirr/home/agent/account'>修改密码</Link></Menu.Item>
          </SubMenu>
          <Menu.Item key="9"><Link to='/sysirr/home/bookkeep'><Icon type="account-book" /><span>记账本</span></Link></Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default AgentAdmin;