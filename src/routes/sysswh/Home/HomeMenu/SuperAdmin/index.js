import React ,{Component} from 'react';
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
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1">
            <Link to='/sysswh/home'>
            <Icon type="home" />
            <span>户外开关超级管理员</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
              <Link to='/sysswh/home/agentlist'>
              <Icon type="user" />
                <span>经销商管理</span>
              </Link>
          </Menu.Item>
            <Menu.Item key="3">
                <Link to='/sysswh/home/userlist'>
                <Icon type="user" />
                <span>用户管理</span>
                </Link>
            </Menu.Item>
            <SubMenu key="4" title={<span><Icon type="tool"/><span>开关管理</span></span>}>
                <Menu.Item key="41"><Link to='/sysswh/home/switch/list'>开关列表</Link></Menu.Item> 
                <Menu.Item key="42"><Link to='/sysswh/home/switch/map'>开关分布</Link></Menu.Item>    
            </SubMenu>
            {/* <SubMenu key="5" title={<span><Icon type="setting"/><span>参数和控制</span></span>}>
                <Menu.Item key="51"><Link to='/sysswh/home/settings'>参数和设置</Link></Menu.Item> 
                <Menu.Item key="52"><Link>控制</Link></Menu.Item>    
            </SubMenu>   */}
            <SubMenu key="8" title={<span><Icon type="user"/><span>账号管理</span></span>}>
            <Menu.Item key="81"><Link to='/sysswh/home/super/account'>经销商账号</Link></Menu.Item>
            <Menu.Item key="82"><Link to='/sysswh/home/agent/account'>修改密码</Link></Menu.Item>
            </SubMenu>       
        </Menu>
      </div>
    )
  }
}

export default SuperAdmin;