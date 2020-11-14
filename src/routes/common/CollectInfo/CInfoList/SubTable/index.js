import React, { Component } from 'react';
import { Table, Typography, Button, message, Spin } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as session from '../../../../../utils/Session';
import * as cinfoModalCtors from '../EditCInfoModal/store/actionCreators';
import * as headerCtors from '../SubHeader/store/actionCreators';
import { relieveMeterFromGateway } from '../../../../../utils/api';
import { MeterPhase, MeterPayType, RateType, ChargeType, ConnectType } from '../../../../../utils/enum';
import intl from 'react-intl-universal';
const actType = session.getLoginVertificate().Type;
class SubTable extends Component {
  constructor(props) {
    super(props);
    const pathname = this.props.location.pathname;
    const arr = pathname.split('/');
    const sys = arr[1];
    this.state = {
      system: sys,
      loading: false,
    }
    this.onKeyLink = this.onKeyLink.bind(this);
    this.loadingBtn = this.loadingBtn.bind(this);
  }

  render() {
    const columns = this.initColumns();
    return (
      <Spin spinning={this.state.loading}>
        <Table
          loading={this.props.loading}
          columns={columns}
          bordered
          showHeader
          dataSource={this.props.collectinfo}
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
      </Spin>

    )
  }
  loadingBtn(value) {
    this.setState({
      loading: value,
    });
  }

  initColumns() {
    const columns = [{
      title: '电表名称',
      dataIndex: 'Usnam',
      align: 'center',
      key: 'Usnam',
    },
    {
      title: '设备编号',
      dataIndex: 'key',
      align: 'center',
      key: 'key',
      render: key => {
        return (
          <Typography.Text className='meter_table_link' onClick={() => { this.onKeyLink(key) }}>{key}</Typography.Text>
        );
      }
    },
    {
      title: '设备类型',
      dataIndex: 'Devtp',
      align: 'center',
      key: 'Devtp',
      render: Devtp => {
        let str = ""
        switch (Devtp) {
          case MeterPhase.Uniphase: str = "单相表"; break;
          case MeterPhase.Triphase: str = "三相表"; break;
        }
        return str;
      }
    },
    {
      title: '付费类型',
      dataIndex: 'Ptp',
      align: 'center',
      key: 'Ptp',
      render: Ptp => {
        let str = "";
        switch (Ptp) {
          case MeterPayType.PREPAY: str = "预付费"; break;
          case MeterPayType.NETWORK: str = "网络付费"; break;
        }
        return str;
      }
    },
    {
      title: '费率类型',
      dataIndex: 'Rtp',
      align: 'center',
      key: 'Rtp',
      render: Rtp => {
        let str = "";
        switch (Rtp) {
          case RateType.SINGLE: str = "单费率"; break;
          case RateType.MULTIPLE: str = "多费率"; break;
        }
        return str;
      }
    },
    {
      title: '计费方式',
      dataIndex: 'Chgtp',
      align: 'center',
      key: 'Chgtp',
      render: Chgtp => {
        let str = "";
        switch (Chgtp) {
          case ChargeType.ENERGY: str = "按电计费"; break;
          case ChargeType.TIME: str = "按时计费"; break;
        }
        return str;
      }
    },
    {
      title: '远程通讯',
      dataIndex: 'Irmt',
      align: 'center',
      key: 'Irmt',
      render: Irmt => {
        let str = "";
        switch (Irmt) {
          case ConnectType.GTWY: str = "RS485"; break;
          case ConnectType.REMOTE: str = "网络"; break;
        }
        return str;
      }
    },
    {
      title: '经销商ID',
      key: 'AgentidStr',
      align: 'center',
      dataIndex: 'AgentidStr',
    },
    {
      align: 'center',
      title: '操作',
      key: 'action',
      render: (item) =>
        (
          <Button style={{ fontSize: '10px' }} type='primary' onClick={() => this.onUnbind(item.key)}>解绑</Button>
        ),
    }];
    return columns;
  }

  onUnbind(key) {
    // let collectinfo = this.props.collectinfo.find(item => item.key === key);
    this.loadingBtn(true);
    relieveMeterFromGateway(key,
      (res) => {
        this.loadingBtn(false);
        if (res.data.Status == 0 && res.data.Data) {
          message.success(`${intl.get('COMMON_MESSAGE.OPER_SUCS')}`);
        } else {
          message.error(res.data.Message);
        }
      },
      () => {
        this.loadingBtn(false);
        message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
      });
  }

  onKeyLink(key) {
    // let dev = this.props.collectinfo.find(item => item.key === key);
    this.props.history.push(`/${this.state.system}/home/meterinfo/${key}`);
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.collect_info_table.loading,
    collectinfo: state.collect_info_table.collectinfo,
    total: state.collect_info_table.total,
    pageindex: state.collect_info_header.pageindex,
    pagesize: state.collect_info_header.pagesize,
  }
}
const mapDispatchToProps = (dispatch) => {

  return {
    showEditCollect(obj) {
      dispatch(cinfoModalCtors.getEditAction(obj));
    },
    changePagination(pageindex, pagesize) {
      dispatch(headerCtors.getChangePaginationAction(pageindex, pagesize))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubTable));