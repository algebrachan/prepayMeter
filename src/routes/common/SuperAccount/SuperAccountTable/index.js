import React, { Component, Fragment } from 'react';
import { Table, Button, Tag } from 'antd';
import { connect } from 'react-redux';
import * as adminModalCtors from '../EditSAccountModal/store/actionCreators';
import * as headerCtors from '../SuperAccountHeader/store/actionCreators';
import { withRouter } from 'react-router-dom';
import intl from 'react-intl-universal';
import './style.css';
class SuperAccountTable extends Component {

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
          dataSource={this.props.adminlist}
          pagination={{
            onShowSizeChange: this.props.changePagination,
            onChange: this.props.changePagination,
            position: 'bottom',
            current: this.props.pageindex,
            pageSize: this.props.pagesize,
            showTotal: total =>`${intl.get('COMMON.TOTAL')} ${total} ${intl.get('COMMON.ITME')}`,
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
        title: '用户名',
        dataIndex: 'Usnam',
        align: 'center',
        key: 'Usnam',
        
      },
      {
        title: '使用人',
        dataIndex: 'Owner',
        align: 'center',
        key: 'Owner',
      },
      {
        title: '所支持的系统',
        dataIndex: 'Sys',
        align: 'center',
        key: 'Sys',
        render: Sys =>
          (
            <Fragment>
              {(Sys & 1) === 1 ? <Tag color="cyan">预</Tag> : ""}
              {(Sys & 2) === 2 ? <Tag color="volcano">农</Tag> : ""}
              {(Sys & 4) === 4 ? <Tag color="geekblue">开关</Tag> : ""}
            </Fragment >
          )
      },
      {
        title: '经销商名称',
        dataIndex: 'Agtnam',
        align: 'center',
        key: 'Agtnam',
      },
      {
        title: '账号状态',
        dataIndex: 'Stat',
        align: 'center',
        key: 'Stat',
        render: Stat => {
          if (Stat === 0) {
            return (<Tag color="green">可用</Tag>);
          }
          else {
            return (<Tag color="red">不可用</Tag>);
          }
        }
      },
      {
        align: 'center',
        title: '操作',
        key: 'action',
        render: (item) =>
          (
            <Fragment>

              <Button style={{ fontSize: '10px' }} type='primary' icon='edit' onClick={() => this.onEdit(item.key)}>修改</Button>
              <Button style={{ fontSize: '10px', marginLeft: '10px' }} type='primary' icon='delete'>删除账号</Button>

            </Fragment>
          ),
      }
    ];

    return columns;
  }


  onEdit(key) {
    let admin = this.props.adminlist.find(item => item.key === key);
    let obj = undefined;
    let sys = [];
    if ((admin.Sys & 1) === 1) {
      sys = [...sys, 1];
    }
    if ((admin.Sys & 2) === 2) {
      sys = [...sys, 2];
    }
    if ((admin.Sys & 4) === 4) {
      sys = [...sys, 4];
    }
    if (admin) {
      obj = {
        admin_name: admin.Usnam,
        admin_owner: admin.Owner,
        admin_system: sys,
        admin_agentid: admin.Agtid,
        admin_stat: admin.stat,

      }
    }
    this.props.showEditAgent(obj);
  }


}


const mapStateToProps = (state) => {
  return {
    adminlist: state.super_account_table.adminlist,
    loading: state.super_account_table.loading,
    total: state.super_account_table.total,
    pageindex: state.super_account_header.pageindex,
    pagesize: state.super_account_header.pagesize,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showEditAgent(obj) {
      dispatch(adminModalCtors.getEditAction(obj));
    },
    changePagination(pageindex, pagesize) {
      dispatch(headerCtors.getChangePaginationAction(pageindex, pagesize))
    },

  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SuperAccountTable));