import React, { Component, Fragment } from 'react';
import { Table, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as headerCtors from '../ProfeeHeader/store/actionCreators';
import * as modalCtros from '../EditProfeeModal/store/actionCreators';
import * as modalTimeCtros from '../EditTimeModal/store/actionCreators';
import intl from 'react-intl-universal';
class ProfeeTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
          dataSource={this.props.profeelist}
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
    const columns = [{
      title: '条目ID',
      dataIndex: 'key',
      align: 'center',
      key: 'key',
    },
    {
      title: '主体',
      dataIndex: 'Owner',
      align: 'center',
      key: 'Owner',
    },
    {
      title: '联系人',
      dataIndex: 'Usnam',
      align: 'center',
      key: 'Usnam',
    },
    {
      title: '电话',
      dataIndex: 'Phone',
      align: 'center',
      key: 'Phone',
    },
    {
      title: '关联物业',
      dataIndex: 'Prop',
      align: 'center',
      key: 'Prop',
    },
    {
      title: '到期时间',
      dataIndex: 'ExpireDate',
      align: 'center',
      key: 'ExpireDate',
    },
    // {
    //   title: '状态',
    //   key: 'Enable',
    //   align: 'center',
    //   dataIndex: 'Enable',
    //   width: 100,
    //   render: Enable => {
    //     if (Enable === true) {
    //       return (<Tag color="green">可用</Tag>);
    //     }
    //     else {
    //       return (<Tag color="red">不可用</Tag>);
    //     }
    //   }
    // },
    {
      align: 'center',
      title: '操作',
      key: 'action',
      render: (item) =>
        (
          <Fragment>
            <Button style={{ fontSize: '10px' }} type='primary' icon='edit' onClick={() => this.onEdit(item.key)}>{intl.get('COMMON_BTN.EDIT')}</Button>
            <Button style={{ fontSize: '10px', marginLeft: 10 }} type='primary' icon='edit' onClick={() => this.onEditTime(item.key)}>修改到期时间</Button>
          </Fragment>
        ),
    }
    ];
    return columns;
  }

  onEdit(key) {
    let profeelist = this.props.profeelist.find(item => item.key === key);
    let obj = undefined;
    if (profeelist) {
      obj = {
        profee_keyid: profeelist.key,
        profee_owner: profeelist.Owner,
        profee_name: profeelist.Usnam,
        profee_phone: profeelist.Phone,
        profee_prop: profeelist.Prop,
        profee_enable: profeelist.Enable,

      }
    }

    this.props.showEdit(obj);
  }

  onEditTime(key) {
    let profeelist = this.props.profeelist.find(item => item.key === key);
    let obj = undefined;
    if (profeelist) {
      obj = {
        time_keyid: profeelist.key,
        time_expire: profeelist.ExpireDate,
      }
    }
    this.props.showEditTime(obj);
  }

}
const mapStateToProps = (state) => {
  return {
    loading: state.book_profee_table.loading,
    profeelist: state.book_profee_table.profeelist,
    total: state.book_profee_table.total,
    pageindex: state.book_profee_header.pageindex,
    pagesize: state.book_profee_header.pagesize,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    showEdit(obj) {
      dispatch(modalCtros.getEditAction(obj));
    },
    showEditTime(obj) {
      dispatch(modalTimeCtros.getEditAction(obj));
    },
    changePagination(pageindex, pagesize) {
      dispatch(headerCtors.getChangePaginationAction(pageindex, pagesize))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfeeTable));