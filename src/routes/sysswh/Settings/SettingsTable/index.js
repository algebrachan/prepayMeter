import React, { Component, Fragment } from 'react';
import { Table, Button } from 'antd';
import intl from 'react-intl-universal';
import './style.css';

const data = [];
data.push({
  Usnam: '设置'
});
class SettingsTable extends Component {



  initColumns() {


    const columns = [{
      title: '设备名称',
      dataIndex: 'Usnam',
      align: 'center',
      key: 'Usnam',
    },
    {
      title: '时段控制',
      dataIndex: 'Time',
      align: 'center',
      key: 'Time',

    },
    {
      title: '功率控制',
      dataIndex: 'Power',
      align: 'center',
      key: 'Power',

    },

    {
      title: '远程控制',
      key: 'Remote',
      align: 'center',
      dataIndex: 'Remote',


    },
    {
      title: '电费控制',
      key: 'Elec',
      dataIndex: 'Elec',
      align: 'center',


    },
    {
      align: 'center',
      title: '操作',
      key: 'action',
      width: 200,
      render: (item) =>
        (
          <Fragment>
            <Button style={{ fontSize: '10px' }} type='primary' >{intl.get('COMMON_BTN.EDIT')}</Button>
          </Fragment>
        ),
    }
    ];

    return columns;
  }

  render() {
    const columns = this.initColumns();
    return (
      <div>
        <Table
          columns={columns}
          bordered
          showHeader
          dataSource={data}

        />

      </div>

    )
  }
}
export default SettingsTable;