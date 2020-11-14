import React, { Component } from 'react';
import { Layout} from 'antd';
import 'antd/dist/antd.css';
import './style.css'
import HomeMenu from './HomeMenu';
import HomeContent from './HomeContent';
import HomeHeader from './HomeHeader';

const { Sider, Header, Content } = Layout;

class Home extends Component {

    render() {

        return (
            <div className='sysirr_home_root'>
                <Layout >
                    <Sider
                        collapsible
                        className='sysirr_home_menu'
                        trigger={null}>
                        <HomeMenu />
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <HomeHeader />
                        </Header>
                        <Content className='sysirr_home_content'>
                            <HomeContent />
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
export default Home;