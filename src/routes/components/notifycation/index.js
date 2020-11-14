import React, { Fragment } from 'react';
import { notification, Table, Button } from 'antd';
import { exportExcel } from '../../../utils/excelUtils';
import { getUtcString } from '../../../utils/string';
import './style.css';

export const openErrorsNotification = (list, success) => {
    if (!Array.isArray(list) || list.length === 0) {
        return;
    }
    let columns = [
        {
            title: "设备编号",
            dataIndex: 'Addr',
            align: 'center',
            key: 'Addr',
        },
        {
            title: "错误信息",
            dataIndex: 'Message',
            align: 'center',
            key: 'Message',
        },
    ];
    // let content = <div style={{ overflow: 'auto' }}>{list.map((error) => (<p key={error.Addr}>{error.Addr}:{error.Message}</p>))}</div>;
    let table = <Fragment>
        <div className="notify_header">
            <span>Success： {success} </span>
            <Button className="btn" type="primary" size="small" onClick={() => exportExcel(columns, list, getUtcString() + ".xlsx")}>导出</Button>
        </div >
        <Table
            className="notify_table"
            columns={columns}
            bordered
            showHeader
            dataSource={list}
            scroll={{ y: 600 }}
            pagination={{
                position: 'bottom',
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50', '100']
            }}
        />
    </Fragment>



    const args = {
        message: '返回结果',
        description: table,
        duration: 0,
    };
    notification.info(args);
};