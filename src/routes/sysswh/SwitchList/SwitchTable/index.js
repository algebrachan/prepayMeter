import React, { Component, Fragment } from 'react';
import { Table, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as switchModalCtors from '../EditSwitchModal/store/actionCreators';
import * as headerCtors from '../SwitchHeader/store/actionCreators';
import intl from 'react-intl-universal';
import './style.css';

class SwitchTable extends Component {
  constructor(props) {
    super(props);
    const pathname = this.props.location.pathname;
    const arr = pathname.split('/');
    const sys = arr[1];
    this.state = {
      system: sys,
    }
    this.onEdit = this.onEdit.bind(this);

  }

  render() {
    const columns = this.initColumns();
    return (
      <div>
        <Table
          loading={this.props.loading}
          columns={columns}
          bordered
          showHeader
          dataSource={this.props.switchlist}
          pagination={{
            onShowSizeChange: this.props.changePagination,
            onChange: this.props.changePagination,
            position: 'bottom',
            current: this.props.pageindex,
            pageSize: this.props.pagesize,
            showTotal: total => `${intl.get('COMMON.TOTAL')} ${total} ${intl.get('COMMON.ITME')}`,
            total: this.props.total,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"]
          }}

        />

      </div>

    )
  }

  initColumns() {
    const columns = [
      {
        title: '采集器ID',
        key: 'key',
        dataIndex: 'key',
        align: 'center',

      },
      {
        title: '采集器名称',
        key: 'Usnam',
        dataIndex: 'Usnam',
        align: 'center',

      },
      {
        title: '安装地址',
        key: 'Locat',
        dataIndex: 'Locat',
        align: 'center',

      },
      {
        title: '经销商ID',
        key: 'Agentid',
        dataIndex: 'Agentid',
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
              <Button style={{ fontSize: '10px' }} type='primary' onClick={() => { this.onEdit(item.key) }}>{intl.get('COMMON_BTN.EDIT')}</Button>
            </Fragment>
          ),
      }
    ];

    return columns;
  }


  onEdit(key) {
    let switchlist = this.props.switchlist.find(item => item.key === key);
    let obj = undefined;
    if (switchlist) {
      obj = {
        switch_keyid: switchlist.key,
        switch_name: switchlist.Usnam,
        switch_agent: switchlist.Agentid,
        switch_lng: switchlist.Lng,
        switch_lat: switchlist.Lat,
      }
    }


    this.props.showEditSwitch(obj);
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.switch_table.loading,
    switchlist: state.switch_table.switchlist,
    total: state.switch_table.total,
    pageindex: state.switch_header.pageindex,
    pagesize: state.switch_header.pagesize,

  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    showEditSwitch(obj) {
      dispatch(switchModalCtors.getEditAction(obj));
    },
    changePagination(pageindex, pagesize) {
      dispatch(headerCtors.getChangePaginationAction(pageindex, pagesize))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SwitchTable));