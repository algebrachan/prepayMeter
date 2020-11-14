import React, { Component, Fragment } from 'react';
import { Table, Button, Typography, Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as userModalCtors from '../EditUserModal/store/actionCreators';
import * as headerCtors from '../UserHeader/store/actionCreators';
import intl from 'react-intl-universal';
import './style.css';



class UserTable extends Component {
  constructor(props) {
    super(props);
    const pathname = this.props.location.pathname;
    const arr = pathname.split('/');
    const sys = arr[1]
    this.state = {
      system: sys,
    }
    this.onKeyLink = this.onKeyLink.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  render() {
    const columns = this.initColumns();
    return (

      <div>
        <Table
          loading={this.props.loading}
          columns={columns}
          dataSource={this.props.userlist}
          bordered
          showHeader
          pagination={{
            onShowSizeChange: this.props.changePagination,
            onChange: this.props.changePagination,
            position: 'bottom',
            current: this.props.pageindex,
            pageSize: this.props.pagesize,
            showTotal: total => `${intl.get('COMMON.TOTAL')} ${total} ${intl.get('COMMON.ITME')}`,
            total: this.props.total,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"]
          }}
        />

      </div>
    )
  }

  initColumns() {
    const columns = [
      {
        title: `${intl.get('USER_LIST.ACCOUNT')}`,
        dataIndex: 'key',
        align: 'center',
        key: 'key',
        render: key => {
          return (
            // <Button type='link' onClick={() => { this.onKeyLink(key) }}>{key}</Button>
            <Typography.Text className='user_table_link' onClick={() => { this.onKeyLink(key) }}>{key}</Typography.Text>
          );
        }
      },
      {
        title: `${intl.get('USER_LIST.NAME')}`,
        dataIndex: 'Usnam',
        align: 'center',
        key: 'Usnam',
      },
      {
        title: `${intl.get('USER_LIST.PHONE')}`,
        key: 'Phone',
        dataIndex: 'Phone',
        align: 'center',
      },
      // {
      //   title: '经销商ID',
      //   key: 'Agentid',
      //   dataIndex: 'Agentid',
      //   align: 'center',
      // },
      {
        align: 'center',
        title:  `${intl.get('COMMON.OPER')}`,
        key: 'action',
        render: (item) =>
          (
            <Fragment>
              <Button style={{ fontSize: '10px' }} type='primary' icon='edit' onClick={() => { this.onEdit(item.key) }}>{intl.get('COMMON_BTN.EDIT')}</Button>
              <Button style={{ fontSize: '10px', marginLeft: '10px' }} type='primary' icon='delete' onClick={() => { this.onDelete(item.key) }}>{intl.get('COMMON_BTN.DELETE')}</Button>
            </Fragment>
          ),
      },

    ];
    return columns;
  }

  onKeyLink(key) {
    // let dev = this.props.userlist.find(item => item.key === key);
    // this.props.history.push('/syspre/home/userinfo/' + key);
    this.props.history.push(`/${this.state.system}/home/userinfo/${key}`);

  }

  onEdit(key) {
    let user = this.props.userlist.find(item => item.key === key);
    let obj = undefined;
    if (user) {
      obj = {
        user_keyid: user.key,
        user_name: user.Usnam,
        user_phone: user.Phone,
        user_agentid: user.Agentid,
      }
    }
    this.props.showEditUser(obj);
  }

  onDelete(key) {
    const title = `${intl.get('USER_LIST.DEL_TITLE')}` + key + '?';
    Modal.confirm({
      title: title,
      content: 'Some descriptions',
      okType: 'danger',
      centered: true,
      onOk() {
      },
      onCancel() {
      },
    });
  }
}

const mapStateToProps = (state) => {

  return {
    loading: state.user_table.loading,
    userlist: state.user_table.userlist,
    total: state.user_table.total,
    pageindex: state.user_header.pageindex,
    pagesize: state.user_header.pagesize,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showEditUser(obj) {
      dispatch(userModalCtors.getEditAction(obj));
    },
    changePagination(pageindex, pagesize) {
      dispatch(headerCtors.getChangePaginationAction(pageindex, pagesize))
    },

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserTable));