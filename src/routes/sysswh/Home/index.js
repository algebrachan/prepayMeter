import React, { Component } from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './style.css'
import HomeMenu from './HomeMenu';
import HomeContent from './HomeContent';
import HomeHeader from './HomeHeader';

const { Sider, Header, Content } = Layout;

class Home extends Component {

    render() {

        return (
            <div className='sysswh_home_root'>
                <Layout >
                    <Sider
                        collapsible
                        className='sysswh_home_menu'
                        trigger={null}>
                        <HomeMenu />
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <HomeHeader />
                        </Header>
                        <Content className='sysswh_home_content'>
                            <HomeContent />
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
export default Home;