import React from 'react';
import { Layout, Typography } from 'antd';
import './style.css';

const Welcome = () => {
    return (
        <Layout>
            <Layout.Content style={{ minHeight: 300, height: 'calc(100vh - 133px)' }}>

                <div className='welcome_title'>
                    <span className='welcome_span'>欢迎使用雷甸科技物联网管理系统</span>
                    {/* <Typography.Title level={2} >欢迎使用雷甸科技预付费管理系统</Typography.Title> */}
                </div>
            </Layout.Content>
            <Layout.Footer style={{ textAlign: 'center' }}>
                <Typography.Text style={{ color: '#789' }}>©雷甸科技 <a href='http://www.laydin.com' style={{
                    color: '#118dfa',
                    cursor: 'pointer',
                    underline: true,
                }}>www.laydin.com</a></Typography.Text>
            </Layout.Footer>
        </Layout>
    )
}

export default Welcome;