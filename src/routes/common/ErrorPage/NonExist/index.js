import React from 'react';
import { Layout, Typography } from 'antd';

const NonExist = () => {
    return (
        <Layout>
            <Layout.Content style={{ minHeight: 650 }}>

                <div >
                    <Typography.Title>404</Typography.Title>
                    <span className='welcome_span'>很遗憾，您访问的页面不存在！</span>
                </div>
            </Layout.Content>

        </Layout>
    )
}

export default NonExist;