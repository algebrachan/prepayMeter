import React, { Component, Fragment } from 'react';
import { Table, Button, Tag } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as agentModalCtors from '../EditAdminModal/store/actionCreators';
import * as headerCtors from '../AdminHeader/store/actionCreators';
import intl from 'react-intl-universal';
import './style.css';

class AdminTable extends Component {
  constructor(props) {
    super(props);
    const pathname = this.props.location.pathname;
    const arr = pathname.split('/');
    const sys = arr[1];
    this.state = {
      system: sys,
    }
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
          dataSource={this.props.agentlist}
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
          }} />
      </div>
    )
  }

  initColumns() {
    const columns = [
      {
        title: '管理员名称',
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
      // {
      //   title: '所支持的系统',
      //   dataIndex: 'Sys',
      //   align: 'center',
      //   key: 'Sys',
      //   render: Sys =>
      //     (
      //       <Fragment>
      //         {(Sys & 1) === 1 ? <Tag color="cyan">预</Tag> : ""}
      //         {(Sys & 2) === 2 ? <Tag color="volcano">农</Tag> : ""}
      //         {(Sys & 4) === 4 ? <Tag color="geekblue">开关</Tag> : ""}
      //       </Fragment >
      //     )
      // },
      // {
      //   title: '经销商名称',
      //   dataIndex: 'Agtnam',
      //   align: 'center',
      //   key: 'Agtnam',
      // },
      {
        title: '账号状态',
        dataIndex: 'Stat',
        align: 'center',
        key: 'Stat',
        render: Stat => {
          if (Stat === 0) {
            return (<Tag color="green">可用</Tag>);
          } else {
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
    let agent = this.props.agentlist.find(item => item.key === key);
    let obj = undefined;
    if (agent) {
      obj = {
        admin_stat: agent.Stat,
        admin_name: agent.Usnam,
        admin_owner: agent.Owner,
      }
    }
    this.props.showEditAdmin(obj);
  }
  onKeyLink(key) {
    // this.props.history.push(`/${this.state.system}/home/agentlist/${key}`);
  }

}


const mapStateToProps = (state) => {
  return {
    agentlist: state.admin_table.agentlist,
    loading: state.admin_table.loading,
    total: state.admin_table.total,
    pageindex: state.admin_header.pageindex,
    pagesize: state.admin_header.pagesize,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showEditAdmin(obj) {
      dispatch(agentModalCtors.getEditAction(obj));
    },
    changePagination(pageindex, pagesize) {
      dispatch(headerCtors.getChangePaginationAction(pageindex, pagesize))
    },

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminTable));