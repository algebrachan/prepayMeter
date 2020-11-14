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
            <div className='syspre_home_root'>
                <Layout >
                    <Header className='syspre_home_header'>
                        <HomeHeader />
                    </Header>
                    <Layout>
                        <Sider
                            collapsible
                            className='syspre_home_menu'
                            width='220'
                            trigger={null}>
                            <HomeMenu />
                        </Sider>
                        <Content className='syspre_home_content'>
                            <HomeContent />
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}
export default Home;