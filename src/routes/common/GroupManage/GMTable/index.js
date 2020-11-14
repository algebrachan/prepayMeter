import React, { Component, Fragment } from 'react';
import { Table, Button } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as groupModalCtors from '../EditGmModal/store/actionCreators';
import * as headerCtors from '../GMHeader/store/actionCreators';
import intl from 'react-intl-universal';
import './style.css';

class GMTable extends Component {

  render() {
    const columns = this.initColumns();
    return (
      <div>
        <Table
          loading={this.props.loading}
          columns={columns}
          bordered
          showHeader
          dataSource={this.props.gplist}
          pagination={{
            onShowSizeChange: this.props.changePagination,
            onChange: this.props.changePagination,
            position: 'bottom',
            current: this.props.pageindex,
            pageSize: this.props.pagesize,
            showTotal: total => `${intl.get('COMMON.TOTAL')} ${total} ${intl.get('COMMON.ITME')}`,
            total: this.props.total,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100']
          }}
        />
      </div>
    )
  }

  initColumns() {
    const columns = [
      {
        title: '名称',
        dataIndex: 'Name',
        align: 'center',
        key: 'Name',
        width: 200
      },
      {
        title: 'ID',
        dataIndex: 'key',
        align: 'center',
        key: 'key',
        width: 200
      },
      {
        title: '描述',
        dataIndex: 'Desc',
        align: 'center',
        key: 'Desc',
        width: 300,
      },
      {
        align: 'center',
        title: '操作',
        key: 'action',
        width: 200,
        render: (item) =>
          (
            <Fragment>
              <Button style={{ fontSize: '10px' }} type='primary' icon='edit' onClick={() => this.onEdit(item.key)}>{intl.get('COMMON_BTN.EDIT')}</Button>
              <Button style={{ fontSize: '10px', marginLeft: '10px' }} type='primary' icon='delete'>{intl.get('COMMON_BTN.DELETE')}</Button>
            </Fragment>
          ),
      }
    ];
    return columns;
  }

  onEdit(key) {
    let group = this.props.gplist.find(item => item.key === key);
    let obj = undefined;
    if (group) {
      obj = {
        group_name: group.Name,
        group_keyid: group.key,
        group_desc: group.Desc,
      }
    }
    this.props.showEditAgent(obj);
  }


}


const mapStateToProps = (state) => {
  return {
    gplist: state.group_table.gplist,
    loading: state.group_table.loading,
    total: state.group_table.total,
    pageindex: state.group_header.pageindex,
    pagesize: state.group_header.pagesize,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showEditAgent(obj) {
      dispatch(groupModalCtors.getEditAction(obj));
    },
    changePagination(pageindex, pagesize) {
      dispatch(headerCtors.getChangePaginationAction(pageindex, pagesize))
    },

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GMTable));