import React, { Component } from 'react';
import { Menu, Icon } from "antd";
import { Link } from 'react-router-dom'
import intl from 'react-intl-universal';
import * as session from '../../../../../utils/Session';
import { AdminType } from '../../../../../utils/enum';
import 'antd/dist/antd.css';
const type = session.getLoginVertificate().Type;

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
            <Link to='/syspre/home'>
              <Icon type="home" />
              <span>{intl.get('MENU.AGENT_SYS')}</span>
            </Link>
          </Menu.Item>
          {/* <Menu.Item key="2">
              <Link to='/syspre/home/userlist'>
              <Icon type="user" />
                <span>用户管理</span>
              </Link>
          </Menu.Item> */}
          <Menu.Item key="3">
            <Link to='/syspre/home/collectlist'>
              <Icon type="tool" />
              <span>{intl.get('MENU.GTWY_MANAGE')}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4"><Link to='/syspre/home/meterlist'><Icon type="tool" /><span>{intl.get('MENU.METER_MANAGE')}</span></Link></Menu.Item>
          <Menu.Item key="2"><Link to='/syspre/home/abnormaldev'><Icon type="tool" /><span>{intl.get('MENU.AB_DEV')}</span></Link></Menu.Item>
          <Menu.Item key="5">
            <Link to='/syspre/home/group/manage'>
              <Icon type="usergroup-add" />
              <span>{intl.get('MENU.GROUP_MANAGE')}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="6"><Link to='/syspre/home/meter/submeter'><Icon type="tool" /><span>{intl.get('MENU.METER_ORDER')}</span></Link></Menu.Item>

          {/* <Menu.Item key="6">
            <Link to='/syspre/home/agent/income'>
              <Icon type="account-book" />
              <span>进销查询</span>
            </Link>
          </Menu.Item> */}
          <SubMenu key="7" title={<span><Icon type="setting" /><span>{intl.get('MENU.PARAM')}</span></span>}>
            <Menu.Item key="71"><Link to='/syspre/home/param/template'>{intl.get('MENU.PARAM_TEMP')}</Link></Menu.Item>
            {/* <Menu.Item key="72"><Link to='/syspre/home/param/add'>添加模板</Link></Menu.Item> */}
          </SubMenu>
          {type === AdminType.AGENT_ADMIN ?
            <Menu.Item key="8"><Link to='/syspre/home/adminlist'><Icon type="user" /><span>{intl.get('MENU.MANAGER')}</span></Link></Menu.Item>
            : ''
          }
          {/* <SubMenu key="6" title={<span><Icon type="pie-chart" /><span>数据管理</span></span>}>
                <Menu.Item key="61"><Link to='/syspre/home/data/record'>记录查询</Link></Menu.Item>
                <Menu.Item key="63"><Link to='/syspre/home/data/statistics'>统计数据</Link></Menu.Item>
                <Menu.Item key="64"><Link>数据分析</Link></Menu.Item>
            </SubMenu> */}
          <Menu.Item key="9"><Link to='/syspre/home/bookkeep'><Icon type="account-book" /><span>{intl.get('MENU.BOOK')}</span></Link></Menu.Item>
          <Menu.Item key="A"><Link to='/syspre/home/user/search'><Icon type="user" /><span>{intl.get('MENU.USER')}</span></Link></Menu.Item>
          <SubMenu key="B" title={<span><Icon type="bar-chart" /><span>{intl.get('MENU.STIC')}</span></span>}>
            <Menu.Item key="B1"><Link to='/syspre/home/statistic/elect'>{intl.get('MENU.STIC_ELECT')}</Link></Menu.Item>
            <Menu.Item key="B2"><Link to='/syspre/home/statistic/flow'>{intl.get('MENU.STIC_FLOE')}</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="D" title={<span><Icon type="setting" /><span>{intl.get('MENU.SETTING')}</span></span>}>
            <Menu.Item key="D1"><Link to='/syspre/home/agent/account'>{intl.get('MENU.MOD_PSW')}</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="C" title={<span><Icon type="user" /><span>{intl.get('MENU.MY_ACT')}</span></span>}>
            <Menu.Item key="C1"><Link to='/syspre/home/agent/wx'>{intl.get('MENU.WX')}</Link></Menu.Item>
            <Menu.Item key="C2"><Link to='/syspre/home/agent/ali'>{intl.get('MENU.ALI')}</Link></Menu.Item>
            <Menu.Item key="C3"><Link to='/syspre/home/agent/msg'>{intl.get('MENU.MSG')}</Link></Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}
export default AgentAdmin;