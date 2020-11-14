import React, { Component, Fragment } from 'react';
import { Table, Button, Typography, Tag } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as collectModalCtors from '../EditCollectModal/store/actionCreators';
import * as headerCtors from '../CollectHeader/store/actionCreators';
import intl from 'react-intl-universal';
import './style.css';


class CollectTable extends Component {

  constructor(props) {
    super(props);
    const pathname = this.props.location.pathname;
    const arr = pathname.split('/');
    const sys = arr[1];
    this.state = {
      system: sys,
    }
    this.onEdit = this.onEdit.bind(this);
    this.onKeyLink = this.onKeyLink.bind(this);
  }

  render() {
    const columns = this.initColumns();
    return (
      <div>
        <Table
          loading={this.props.loading}
          columns={columns}
          dataSource={this.props.collectlist}
          bordered
          showHeader
          pagination={{
            onShowSizeChange: this.props.changePagination,
            onChange: this.props.changePagination,
            position: 'bottom',
            current: this.props.pageindex,
            pageSize: this.props.pagesize,
            showTotal: total =>`${intl.get('COMMON.TOTAL')} ${total} ${intl.get('COMMON.ITME')}`,
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
        render: key => {
          return (
            <Typography.Text className='collect_table_link' onClick={() => { this.onKeyLink(key) }}>{key}</Typography.Text>
          );
        }
      },
      {
        title: '采集器名称',
        key: 'Usnam',
        dataIndex: 'Usnam',
        align: 'center',

      },
      {
        title: '采集器类型',
        key: 'Devtp',
        dataIndex: 'Devtp',
        align: 'center',
        render: Devtp => {
          if (Devtp === 32) {
            return ('32型');
          }
          if (Devtp === 64) {
            return ('64型');
          }
          if (Devtp === 96) {
            return ('96型');
          }
          if (Devtp === 512) {
            return ('512型');
          }
        }
      },
      // {
      //   title: '安装地址',
      //   key: 'Locat',
      //   dataIndex: 'Locat',
      //   align: 'center',

      // },
      // {
      //   title: '分组路径',
      //   key: 'Group',
      //   dataIndex: 'Group',
      //   align: 'center',
      // },
      // {
      //   title: '直接分组',
      //   key: 'Dirgp',
      //   dataIndex: 'Dirgp',
      //   align: 'center',
      // },
      {
        title: '经销商ID',
        key: 'AgentidStr',
        dataIndex: 'AgentidStr',
        align: 'center',
      },
      {
        title: '状态',
        key: 'Online',
        align: 'center',
        dataIndex: 'Online',
        render: Online => {
          if (Online === true) {
            return (<Tag color="green">在线</Tag>);
          }
          else {
            return (<Tag color="red">离线</Tag>);
          }
        }
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

  onKeyLink(key) {
    // let dev = this.props.collectlist.find(item => item.key === key);
    this.props.history.push(`/${this.state.system}/home/collectinfo/${key}`);
  }

  onEdit(key) {
    let collect = this.props.collectlist.find(item => item.key === key);
    let obj = undefined;
    if (collect) {
      obj = {
        collect_keyid: collect.key,
        collect_name: collect.Usnam,
        collect_agent: collect.Agentid,
        collect_devtp: collect.Devtp,
      }
    }
    this.props.showEditCollect(obj);
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.collect_table.loading,
    collectlist: state.collect_table.collectlist,
    total: state.collect_table.total,
    pageindex: state.collect_header.pageindex,
    pagesize: state.collect_header.pagesize,

  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    showEditCollect(obj) {
      dispatch(collectModalCtors.getEditAction(obj));
    },
    changePagination(pageindex, pagesize) {
      dispatch(headerCtors.getChangePaginationAction(pageindex, pagesize))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CollectTable));