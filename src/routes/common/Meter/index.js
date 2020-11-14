import React, { Component, Fragment } from 'react';
import { Table, Button, Divider, Typography, message, Spin, Modal, Tag, Select } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchMeterOrders, switchMeter, relieveOrder, getAdminPower } from '../../../utils/api';
import { AdminType } from '../../../utils/enum';
import { MeterOrderState } from '../../../utils/enum';
import * as userdevsCtors from './store/actionCreators';
import * as session from '../../../utils/Session';
import RechargeModal from '../MeterInfo/MeterOrder/RechargeModal';
import intl from 'react-intl-universal';
import './style.css'

const actType = session.getLoginVertificate().Type;
const agtid = session.getLoginVertificate().AgtidStr;
const { Option } = Select;

class UserDevs extends Component {
    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const cstmid = arr[arr.length - 1];
        const sys = arr[1];
        this.state = {
            system: sys,
            cstmid: cstmid,
            keyid: 0,
        }
        this.search = this.search.bind(this);
    }

    render() {
        const columns = this.initColumns();
        return (
            <div style={{ margin: 20, padding: 20, backgroundColor: '#fff' }}>
                <Spin spinning={this.props.loading}>
                    <Select
                        className="user_dev_header_state"
                        onChange={this.props.changeSearchType}
                        value={this.props.search_type}
                    >
                        <Option value={0}>全部状态</Option>
                        <Option value={1}>正常状态</Option>
                        <Option value={2}>充值中</Option>
                        <Option value={3}>所有结算</Option>
                        <Option value={4}>人工结算</Option>
                        <Option value={5}>自动结算</Option>
                    </Select>
                    <Button style={{ margin: 10 }} type='primary' onClick={() => this.requestData()}
                        icon="search"
                        className="user_dev_header_btn_search">{intl.get('COMMON_BTN.SEARCH')}</Button>
                    <Table
                        style={{ margin: 10 }}
                        columns={columns}
                        dataSource={this.props.userdevs}
                        bordered
                        showHeader
                        pagination={{
                            onShowSizeChange: this.props.changePagination,
                            onChange: this.props.changePagination,
                            current: this.props.pageindex,
                            pageSize: this.props.pagesize,
                            position: 'bottom',
                            showTotal: total => `${intl.get('COMMON.TOTAL')} ${total} ${intl.get('COMMON.ITME')}`,
                            total: this.props.total,
                            showSizeChanger: true,
                            pageSizeOptions: ["5", "10", "20", "50", "100"]
                        }}
                    />
                    <RechargeModal show={this.state.showModal} hide={() => this.hideModal()} cstmid={this.state.cstmid} sn={this.state.keyid} />
                </Spin>
            </div>
        )
    }

    componentDidMount() {
        this.requestData();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.pageindex !== nextProps.pageindex || this.props.pagesize !== nextProps.pagesize) {
            const pageindex = nextProps.pageindex - 1;
            const pagesize = nextProps.pagesize;
            const type = nextProps.search_type;
            this.props.setLoading(true);
            this.search(pageindex, pagesize, type);
        }

    }

    requestData() {
        const pageindex = this.props.pageindex - 1;
        const pagesize = this.props.pagesize;
        const type = this.props.search_type;
        this.props.setLoading(true);
        this.search(pageindex, pagesize, type);
        this.requestAuth();
    }

    //请求权限
    requestAuth() {
        if (actType === AdminType.SUPER_ADMIN) {
            this.setState({
                showRechg: true,
            });
        } else {
            //请求权限
            getAdminPower(
                (res) => {
                    if (res.data.Data.Rechg) {
                        this.setState({
                            showRechg: true,
                        });
                    } else {
                        this.setState({
                            showRechg: false,
                        });
                    }
                },
                () => {
                    message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
                });
        }
    }

    hideModal(value) {

        this.setState({
            showModal: false,
            keyid: value,
        })
    }
    search(pageindex, pagesize, type) {

        const param = {
            Cstmid: 0,
            Agtid: agtid,
            Sys: '',
            PageIndex: pageindex,
            PageSize: pagesize,
            Type: type
        }

        searchMeterOrders(param,
            (res) => {
                if (res.data.Status === 0) {
                    this.props.update(res.data.Data.Objs, res.data.Data.Total);
                } else if (res.data.Status === 1) {
                    this.props.update([], 0);
                } else {
                    this.props.setLoading(false);
                    message.error(res.data.Message);
                }
            },
            () => {
                this.props.setLoading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            });
    }

    initColumns() {
        const columns = [
            {
                title: '设备编号',
                dataIndex: 'key',
                align: 'center',
                key: 'key',
                render: key => {
                    return (
                        <Typography.Text className='user_devs_link' onClick={() => { this.onKeyLink(key) }}>{key}</Typography.Text>
                    );
                }
            },
            {
                title: '电表名称',
                dataIndex: 'Name',
                align: 'center',
                key: 'Name',
            },
            {
                title: '用户ID',
                dataIndex: 'CstmidStr',
                align: 'center',
                key: 'CstmidStr',
                render: CstmidStr => {
                    return (
                        <Typography.Text className='user_devs_link' onClick={() => { this.onUserLink(CstmidStr) }}>{CstmidStr}</Typography.Text>
                    );
                }
            },
            {
                title: '用户手机号',
                dataIndex: 'Phone',
                align: 'center',
                key: 'Phone',
            },
            {
                title: '开始时间',
                dataIndex: 'SutcStr',
                align: 'center',
                key: 'SutcStr',
            },
            {
                title: '开始度数',
                dataIndex: 'Sdt',
                align: 'center',
                key: 'Sdt',
                render: (Sdt) => {
                    return (
                        Sdt / 1000000
                    );
                }
            },
            {
                title: '当前度数',
                dataIndex: 'Cdt',
                align: 'center',
                key: 'Cdt',
                render: (Cdt) => {
                    return (
                        Cdt / 1000000
                    );
                }
            },
            {
                title: '累计耗电(度)',
                align: 'center',
                key: 'Dt',
                render: (item) => {
                    return (
                        (item.Cdt - item.Sdt) / 1000000
                    );
                }
            },
            {
                title: '订单状态',
                dataIndex: 'Stt',
                align: 'center',
                key: 'Stt',
                render: (Stt) => {
                    let tag = null;
                    switch (Stt) {
                        case MeterOrderState.IDLE: tag = <Tag color="green">正常使用</Tag>; break;
                        case MeterOrderState.RECHARGING: tag = <Tag color="orange">充值中</Tag>; break;
                        case MeterOrderState.RELIEVE: tag = <Tag color="red">结算中</Tag>; break;
                    }
                    return tag;
                }
            },
            {
                title: '扣费(元)',
                dataIndex: 'Cost',
                align: 'center',
                key: 'Cost',
                render: (Cost) => {
                    return (
                        <Typography.Text className='user_dev_cost'>{Cost / 1000}</Typography.Text>
                    );
                }
            },
            {
                title: '余额(元)',
                dataIndex: 'Left',
                align: 'center',
                key: 'Left',
                render: (Left) => {
                    if (Left < 0) {
                        return (
                            <Typography.Text className='user_dev_cost_red'>{Left / 1000}</Typography.Text>
                        );
                    } else if (Left > 10000) {
                        return (
                            <Typography.Text className='user_dev_cost_green'>{Left / 1000}</Typography.Text>
                        );
                    } else {
                        return (
                            <Typography.Text className='user_dev_cost'>{Left / 1000}</Typography.Text>
                        );
                    }
                }
            },
            {
                title: '操作',
                align: 'center',
                key: 'Action',
                render: (item) => {
                    return (
                        <Fragment>
                            <Typography.Text underline className='user_devs_link' onClick={() => this.untying(item.CstmidStr, item.key)} >解绑</Typography.Text>
                            <Divider type='vertical' />
                            <Typography.Text underline className='user_devs_link' onClick={() => this.close(item.key)}>拉闸</Typography.Text>
                            <Divider type='vertical' />
                            <Typography.Text underline className='user_devs_link' onClick={() => this.open(item.key)}>合闸</Typography.Text>
                            {this.state.showRechg ?
                                <div style={{ display: 'inline-block' }}>
                                    <Divider type='vertical' />
                                    <Typography.Text underline className='user_devs_link' onClick={() => this.recharge(item.key)}>充值</Typography.Text>
                                </div> : ''}
                        </Fragment>
                    );
                }
            },
        ];
        return columns;
    }

    onKeyLink(key) {
        this.props.history.push(`/${this.state.system}/home/meterinfo/${key}`);
    }

    onUserLink(cstmid) {
        this.props.history.push(`/${this.state.system}/home/userinfo/${cstmid}`);
    }
    switchM(key, stat) {
        this.props.setLoading(true);
        switchMeter(key, stat,
            (res) => {
                this.props.setLoading(false);
                if (res.data.Status === 0) {
                    message.success(`${intl.get('COMMON_MESSAGE.OPER_SUCS')}`);
                } else {
                    message.error(`${intl.get('COMMON_MESSAGE.OPER_FAIL')}`);
                }
            },
            () => {
                this.props.setLoading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            });
    }
    relieveM(cstmid, key) {
        this.props.setLoading(true);
        relieveOrder(cstmid, key,
            (res) => {
                this.props.setLoading(false);
                if (res.data.Status === 0) {
                    message.success(`${intl.get('COMMON_MESSAGE.OPER_SUCS')}`);
                } else {
                    message.error(`${intl.get('COMMON_MESSAGE.OPER_FAIL')}`);
                }
            },
            () => {
                this.props.setLoading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            });
    }
    untying(cstmid, key) {
        Modal.confirm({
            title: '确认要解绑',
            content: '确认要解绑',
            okText: '确认',
            okType: 'danger',
            centered: true,
            cancelText: '取消',
            onOk: () => {
                this.relieveM(cstmid, key);
            },

        });
    }

    close(key) {
        Modal.confirm({
            title: '确认拉闸',
            content: '确认拉闸',
            okText: '确认',
            okType: 'danger',
            centered: true,
            cancelText: '取消',
            onOk: () => {
                this.switchM(key, false);
            },
        });
    }

    open(key) {
        Modal.confirm({
            title: '确认合闸',
            content: '确认合闸',
            okText: '确认',
            okType: 'danger',
            centered: true,
            cancelText: '取消',
            onOk: () => {
                this.switchM(key, true);
            },
        });
    }

    recharge(key) {
        //点击跳出充值modal
        this.setState({
            showModal: true,
            keyid: key,
        });

    }
}

const mapStateToProps = (state) => {
    return {
        userdevs: state.meter_devs.userdevs,
        loading: state.meter_devs.loading,
        total: state.meter_devs.total,
        pageindex: state.meter_devs.pageindex,
        pagesize: state.meter_devs.pagesize,
        search_type: state.meter_devs.search_type,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoading(show) {
            dispatch(userdevsCtors.getLoadingAction(show));
        },
        update(list, total) {
            dispatch(userdevsCtors.getUpdateAction(list, total))
        },
        changePagination(pageindex, pagesize) {
            dispatch(userdevsCtors.getChangePaginationAction(pageindex, pagesize))
        },
        changeSearchType(value) {
            dispatch(userdevsCtors.getChangeTypeAction(value));
        },


    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDevs));