import React, { Component, Fragment } from 'react';
import { Table, Button, Typography } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as agentModalCtors from '../EditAgentModal/store/actionCreators';
import * as headerCtors from '../AgentHeader/store/actionCreators';
import { AgentType } from '../../../../utils/enum';
import intl from 'react-intl-universal';
import './style.css';

class AgentTable extends Component {
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
        title: `${intl.get('AGENT_LIST.HEADER.NUMBER')}`,
        dataIndex: 'key',
        align: 'center',
        key: 'key',
        render: key => {
          return (
            <Typography.Text className="account_table_link" onClick={() => this.onKeyLink(key)}>{key}</Typography.Text>
          );
        }
      },
      {
        title: `${intl.get('AGENT_LIST.HEADER.NAME')}`,
        dataIndex: 'Usnam',
        align: 'center',
        key: 'Usnam',
      },
      {
        title: `${intl.get('AGENT_LIST.TABLE.TYPE')}`,
        dataIndex: 'Devtp',
        align: 'center',
        key: 'Devtp',
        render: Devtp => {
          let str = "";
          switch (Devtp) {
            case AgentType.Company: str = `${intl.get('AGENT_LIST.TABLE.TYPE_COMP')}`; break;
            case AgentType.Personal: str = `${intl.get('AGENT_LIST.TABLE.TYPE_P')}`; break;
          }
          return str;
        }
      },
      {
        title: `${intl.get('AGENT_LIST.TABLE.OWNER')}`,
        dataIndex: 'Owner',
        align: 'center',
        key: 'Owner',
      },
      {
        title: `${intl.get('AGENT_LIST.HEADER.PHONE')}`,
        dataIndex: 'Phone',
        align: 'center',
        key: 'Phone',
      },
      {
        title: `${intl.get('AGENT_LIST.TABLE.ADDR')}`,
        dataIndex: 'Locat',
        align: 'center',
        key: 'Locat',
      },
      {
        align: 'center',
        title: `${intl.get('COMMON.OPER')}`,
        key: 'action',
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
    let agent = this.props.agentlist.find(item => item.key === key);
    let obj = undefined;
    if (agent) {
      obj = {
        agent_keyid: agent.key,
        agent_name: agent.Usnam,
        agent_company: agent.Cmpy,
        agent_owner: agent.Owner,
        agent_phone: agent.Phone,
        agent_locat: agent.Locat,
        agent_type: agent.Devtp,
      }
    }
    this.props.showEditAgent(obj);
  }
  onKeyLink(key) {
    this.props.history.push(`/${this.state.system}/home/agentlist/${key}`);
  }

}


const mapStateToProps = (state) => {
  return {
    agentlist: state.agent_table.agentlist,
    loading: state.agent_table.loading,
    total: state.agent_table.total,
    pageindex: state.agent_header.pageindex,
    pagesize: state.agent_header.pagesize,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showEditAgent(obj) {
      dispatch(agentModalCtors.getEditAction(obj));
    },
    changePagination(pageindex, pagesize) {
      dispatch(headerCtors.getChangePaginationAction(pageindex, pagesize))
    },

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AgentTable));