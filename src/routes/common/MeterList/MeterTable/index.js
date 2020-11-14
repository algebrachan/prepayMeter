import React, { Component, Fragment } from 'react';
import { Table, Button, Typography, Tag, message, Modal, Spin, Select } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as meterModalCtors from '../EditMeterModal/store/actionCreators';
import * as headerCtors from '../MeterHeader/store/actionCreators';
import * as tableCtors from '../MeterTable/store/actionCreators';
import * as session from '../../../../utils/Session';
import EditMeterNameModal from '../EditMeterNameModal';
import { searchGroups, searchMeterParamTmp, addMetersToGroup, setTemplateToMeters, searchAdmins, addMetersToAdmin, getMeterInfo } from '../../../../utils/api';
import { MeterPhase, MeterPayType, RateType, ChargeType, ConnectType, AdminType } from '../../../../utils/enum';
import intl from 'react-intl-universal';
import './style.css';

const actType = session.getLoginVertificate().Type;
const { Option } = Select;

class MeterTable extends Component {
  constructor(props) {
    super(props);
    const pathname = this.props.location.pathname;
    const arr = pathname.split('/');
    const sys = arr[1];
    this.state = {
      system: sys,
      grouplist: [],
      paramlist: [],
      adminlist: [],
      showGroupModal: false,
      showParamModal: false,
      showAdminModal: false,
      showMeterNamModal: false,
      gpidval: '',
      pmidval: '',
      amidval: '',
      gpspin: false,
      pmspin: false,
      amspin: false,
      subobjnam: { meter_keyid: '', meter_name: '' },
    }
    this.onEdit = this.onEdit.bind(this);
    this.onKeyLink = this.onKeyLink.bind(this);
    this.batchOperation = this.batchOperation.bind(this);

  }

  render() {
    const gpoptions = this.state.grouplist.map(item => <Option key={item.key} value={item.key}>{item.Name}</Option>);
    const pmoptions = this.state.paramlist.map(item => <Option key={item.key} value={item.key}>{item.Name}</Option>);
    const amoptions = this.state.adminlist.map(item => <Option key={item.key} value={item.key}>{item.Usnam}</Option>);
    const columns = this.initColumns();
    const { selectedRowKeys } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div>
        <div className="syspre_meter_header_wrap">
          {actType === AdminType.AGENT_ADMIN ?
            <Button className="syspre_meter_header_btn_search" onClick={this.batchOperation}>{this.props.batch ? '取消批量' : '批量操作'}</Button>
            : ''
          }
          {
            actType === AdminType.AGENT_ADMIN && this.props.batch ?
              <span className="syspre_meter_header_span">当前选中<em>{this.props.selectedRowKeys.length}</em>条</span>
              : ''
          }
          {actType === AdminType.AGENT_ADMIN && this.props.batch ?
            <Button className="syspre_meter_header_btn_search" type="primary" icon="edit" onClick={() => this.setGroup()}>设置分组</Button>
            : ''
          }
          {actType === AdminType.AGENT_ADMIN && this.props.batch ?
            <Button className="syspre_meter_header_btn_search" type="primary" icon="edit" onClick={() => this.setParam()}>设置参数模板</Button>
            : ''
          }
          {actType === AdminType.AGENT_ADMIN && this.props.batch ?
            <Button className="syspre_meter_header_btn_search" type="primary" icon="edit" onClick={() => this.setAdmin()}>分配电表</Button>
            : ''
          }
        </div>
        <Table
          rowSelection={this.props.batch ? rowSelection : undefined}
          loading={this.props.loading}
          columns={columns}
          bordered
          showHeader
          dataSource={this.props.meterlist}
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
        <Modal
          title='选择分组'
          visible={this.state.showGroupModal}
          onOk={() => this.handleGpOk()}
          onCancel={() => this.showGp(false)}
          destroyOnClose
          centered
          width={400}
        >
          <Spin spinning={this.state.gpspin}>
            <div className="syspre_meter_header_select">
              当前选中的设备添加到分组
                    </div>
            <Select placeholder='请选择分组'
              onChange={(value) => this.hdChangeGp(value)} style={{ width: 300 }}>
              {gpoptions}
            </Select>
          </Spin>

        </Modal>
        <Modal
          title='选择参数模板'
          visible={this.state.showParamModal}
          onOk={() => this.handlePmOk()}
          onCancel={() => this.showPm(false)}
          destroyOnClose
          centered
          width={400}
        >
          <Spin spinning={this.state.pmspin}>
            <div className="syspre_meter_header_select">
              当前搜索条件下的所有设备添加到模板
                    </div>
            <Select placeholder='请选择模板'
              onChange={(value) => this.hdChangePm(value)} style={{ width: 300 }}>
              {pmoptions}
            </Select>
          </Spin>
        </Modal>
        <Modal
          title='选择分配管理员'
          visible={this.state.showAdminModal}
          onOk={() => this.handleAmOk()}
          onCancel={() => this.showAm(false)}
          destroyOnClose
          centered
          width={400}
        >
          <Spin spinning={this.state.amspin}>
            <div className="syspre_meter_header_select">
              当前搜索条件下的所有设备添加到该管理员
                    </div>
            <Select placeholder='请选择管理员'
              onChange={(value) => this.hdChangeAm(value)} style={{ width: 300 }}>
              {amoptions}
            </Select>
          </Spin>
        </Modal>
        <EditMeterNameModal data={this.state.subobjnam} show={this.state.showMeterNamModal} hide={() => this.showNm(false)} requestData={() => this.requestData()} />
      </div>

    )
  }

  batchOperation() {
    //批量操作需要
    let batch = this.props.batch;
    if (batch) {
      //清空

      this.props.selectRow([]);
    }
    this.props.batchOp(!batch);
  }

  onSelectChange = selectedRowKeys => {
    //如果超过100条，提示限制
    if (selectedRowKeys.length > 100) {
      message.error('选中条数不得多于100');
      return;
    }
    this.props.selectRow(selectedRowKeys);
  };

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
      render: (item) =>
        (
          <Fragment>
            {actType === AdminType.SUPER_ADMIN ? '' : <Button style={{ fontSize: '10px' }} type='primary' onClick={() => { this.onEditNam(item.key) }}>{intl.get('COMMON_BTN.EDIT')}</Button>}
          </Fragment>
        ),
    }];
    return columns;
  }
  gpload(value) {
    this.setState({
      gpspin: value,
    });
  }
  pmload(value) {
    this.setState({
      pmspin: value,
    });
  }
  amload(value) {
    this.setState({
      amspin: value,
    });
  }
  showGp(value) {
    this.setState({
      showGroupModal: value
    });
  }
  showPm(value) {
    this.setState({
      showParamModal: value
    });
  }
  showAm(value) {
    this.setState({
      showAdminModal: value
    });
  }
  showNm(value) {
    this.setState({
      showMeterNamModal: value
    });
  }
  setGroup() {
    searchGroups('', 0, 20,
      (res) => {
        if (res.data.Status === 0) {
          this.setState({
            grouplist: res.data.Data.Objs,
          });
        } else {

        }
      },
      () => {

      });
    this.showGp(true);
  }
  setParam() {
    searchMeterParamTmp('', 0, 20,
      (res) => {
        if (res.data.Status === 0) {
          this.setState({
            paramlist: res.data.Data.Objs,
          });
        } else {

        }
      },
      () => {

      });
    this.showPm(true);
  }
  setAdmin() {
    searchAdmins(1, '', 4, 0, 20,
      (res) => {
        if (res.data.Status === 0) {
          this.setState({
            adminlist: res.data.Data.Objs,
          });
        } else {

        }
      },
      () => {

      });
    this.showAm(true);
  }

  hdChangeGp(value) {
    this.setState({
      gpidval: value,
    });
  }
  hdChangePm(value) {
    this.setState({
      pmidval: value,
    });
  }
  hdChangeAm(value) {
    this.setState({
      amidval: value,
    });
  }
  handleGpOk() {
    let groupid = this.state.gpidval;
    let devs = this.props.selectedRowKeys;
    const param = {
      Mac: '',
      Keyid: groupid,
      Devs: devs,
    }
    this.gpload(true);
    addMetersToGroup(param,
      (res) => {
        this.gpload(false);
        if (res.data.Status === 0) {
          message.success(`${intl.get('COMMON_MESSAGE.SET_SUCS')}`);
          this.showGp(false);
        } else {
          message.error(res.data.Message);
        }
      },
      () => {
        this.gpload(false);
        message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
      }
    );
  }
  handlePmOk() {
    let tmpid = this.state.pmidval;
    let devs = this.props.selectedRowKeys;
    const param = {
      Mac: '',
      Keyid: tmpid,
      Devs: devs,
    }
    this.pmload(true);
    setTemplateToMeters(param,
      (res) => {
        this.pmload(false);
        if (res.data.Status === 0) {
          message.success(`${intl.get('COMMON_MESSAGE.SET_SUCS')}`);
          this.showPm(false);
        } else {
          message.error(res.data.Message);
        }
      },
      () => {
        this.pmload(false);
        message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
      }
    );
  }
  handleAmOk() {
    let usnam = this.state.amidval;
    let devs = this.props.selectedRowKeys;
    const param = {
      Mac: '',
      Usnam: usnam,
      Devs: devs,
    }
    this.amload(true);
    addMetersToAdmin(param,
      (res) => {
        this.amload(false);
        if (res.data.Status === 0) {
          message.success(`${intl.get('COMMON_MESSAGE.SET_SUCS')}`);
          this.showAm(false);
        } else {
          message.error(res.data.Message);
        }
      },
      () => {
        this.amload(false);
        message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
      })
  }

  onKeyLink(key) {
    // let dev = this.props.meterlist.find(item => item.key === key);
    this.props.history.push(`/${this.state.system}/home/meterinfo/${key}`);
  }

  onEdit(key) {
    let meter = this.props.meterlist.find(item => item.key === key);
    let obj = undefined;
    let chk = "";
    let dbit = "";
    let brate = ""

    if (meter.Irmt === 0) {
      let cncfg = meter.CncfgStrs;
      chk = Number(cncfg[0]);
      dbit = Number(cncfg[1]);
      brate = Number(cncfg[2]);
    }
    if (meter) {
      obj = {
        meter_keyid: meter.key,
        meter_name: meter.Usnam,
        meter_agent: meter.Agentid,
        meter_devtp: meter.Devtp,
        meter_ptp: meter.Ptp,
        meter_rtp: meter.Rtp,
        meter_chgtp: meter.Chgtp,
        meter_irmt: meter.Irmt,
        meter_prtl: meter.Prtl,
        meter_psw: '',
        meter_wmd: meter.Wmd,
        meter_ctrt: '',
        meter_chk: chk,//奇偶校验
        meter_dbit: dbit,//数据位
        meter_brate: brate,//波特率
      }
    }
    this.props.showEditMeter(obj);
  }

  meterInfo(key) {

  }

  onEditNam(key) {
    let meter = this.props.meterlist.find(item => item.key === key);
    let obj = undefined;
    if (meter) {
      obj = {
        meter_keyid: meter.key,
        meter_name: meter.Usnam,
      }
      this.setState({
        subobjnam: obj,
      });
    }
    this.showNm(true);
  }

}

const mapStateToProps = (state) => {
  return {
    loading: state.meter_table.loading,
    meterlist: state.meter_table.meterlist,
    total: state.meter_table.total,
    selectedRowKeys: state.meter_table.selectedRowKeys,
    batch: state.meter_table.batch,
    search_type: state.meter_header.search_type,
    search_value: state.meter_header.search_value,
    search_groupid: state.meter_header.search_groupid,
    search_olstt: state.meter_header.search_olstt,
    pageindex: state.meter_header.pageindex,
    pagesize: state.meter_header.pagesize,

  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    showEditMeter(obj) {
      dispatch(meterModalCtors.getEditAction(obj));
    },
    changePagination(pageindex, pagesize) {
      dispatch(headerCtors.getChangePaginationAction(pageindex, pagesize))
    },
    selectRow(selectedRowKeys) {
      dispatch(tableCtors.selectRowKeys(selectedRowKeys));
    },
    batchOp(value) {
      dispatch(tableCtors.batchOperation(value));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MeterTable));