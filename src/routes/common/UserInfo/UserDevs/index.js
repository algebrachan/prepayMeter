import React, { Component, Fragment } from 'react';
import { Table, Button, Divider, Typography, Modal, message, Spin } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchMeterOrders, switchMeter, relieveOrder, getAdminPower } from '../../../../utils/api';
import { AdminType } from '../../../../utils/enum';
import * as userdevsCtors from './store/actionCreators';
import * as session from '../../../../utils/Session';
import RechargeModal from '../../MeterInfo/MeterOrder/RechargeModal';
import intl from 'react-intl-universal';
import './style.css'

const actType = session.getLoginVertificate().Type;
const agtid = session.getLoginVertificate().AgtidStr;
class UserDevs extends Component {
    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const cstmid = arr[arr.length - 1];
        this.state = {
            cstmid: cstmid,
            keyid: 0,
            showRechg: false,
            showModal: false,
        }

        this.requestData = this.requestData.bind(this);
        this.requestAuth = this.requestAuth.bind(this);
        this.switchM = this.switchM.bind(this);
    }

    render() {
        const columns = this.initColumns();
        return (

            <div style={{ margin: 20 }}>
                <Spin spinning={this.props.loading}>
                    <Button style={{ marginBottom: 20 }} type='primary' onClick={this.requestData}>{intl.get('COMMON_BTN.REFRESH')}</Button>
                    <Table
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
            const cstmid = this.state.cstmid;
            const pageindex = nextProps.pageindex - 1;
            const pagesize = nextProps.pagesize;
            this.props.setLoading(true);
            this.search(cstmid, pageindex, pagesize);
        }

    }

    requestData() {

        const cstmid = this.state.cstmid;
        const pageindex = this.props.pageindex - 1;
        const pagesize = this.props.pagesize;
        this.props.setLoading(true);
        this.search(cstmid, pageindex, pagesize);
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
    search(cstmid, pageindex, pagesize) {

        const param = {
            Mac: '',
            Cstmid: cstmid,
            Agtid: 0,
            Sys: '',
            PageIndex: pageindex,
            PageSize: pagesize,
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
                title: `${intl.get('COMMON.DEV_NO')}`,
                dataIndex: 'key',
                align: 'center',
                key: 'key',
            },
            {
                title: `${intl.get('USER_INFO.RMK')}`,
                dataIndex: 'Rmk',
                align: 'center',
                key: 'Rmk',
            },
            {
                title: `${intl.get('COMMON.BEGIN_TIME')}`,
                dataIndex: 'SutcStr',
                align: 'center',
                key: 'SutcStr',
            },
            {
                title: `${intl.get('COMMON.BEGIN_E')}`,
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
                title: `${intl.get('COMMON.CURT_E')}`,
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
                title: `${intl.get('COMMON.DT')}`,
                align: 'center',
                key: 'Dt',
                render: (item) => {
                    return (
                        (item.Cdt - item.Sdt) / 1000000
                    );
                }
            },
            {
                title: `${intl.get('COMMON.COST_1')}`,
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
                title: `${intl.get('COMMON.BLAS')}`,
                dataIndex: 'Left',
                align: 'center',
                key: 'Left',
                render: (Left) => {
                    return (
                        <Typography.Text className='user_dev_cost'>{Left / 1000}</Typography.Text>
                    );
                }
            },
            {
                title: `${intl.get('COMMON.OPER')}`,
                align: 'center',
                key: 'Action',
                render: (item) => {
                    return (
                        <Fragment>
                            <Typography.Text underline className='user_devs_link' onClick={() => this.untying(item.CstmidStr, item.key)} >{intl.get('METER.UN_BIND')}</Typography.Text>
                            <Divider type='vertical' />
                            <Typography.Text underline className='user_devs_link' onClick={() => this.close(item.key)}>{intl.get('METER.CLOSE')}</Typography.Text>
                            <Divider type='vertical' />
                            <Typography.Text underline className='user_devs_link' onClick={() => this.open(item.key)}>{intl.get('METER.PULL')}</Typography.Text>
                            {this.state.showRechg ?
                                <div style={{ display: 'inline-block' }}>
                                    <Divider type='vertical' />
                                    <Typography.Text underline className='user_devs_link' onClick={() => this.recharge(item.key)}>{intl.get('METER.RCG')}</Typography.Text>
                                </div> : ''}
                        </Fragment>
                    );
                }
            },
        ];
        return columns;
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
            title: `${intl.get('USER_INFO.MODAL_CF')}` + `${intl.get('METER.UN_BIND')}`,
            content: `${intl.get('USER_INFO.MODAL_CF')}` + `${intl.get('METER.UN_BIND')}`,
            okType: 'danger',
            centered: true,
            onOk: () => {
                this.relieveM(cstmid, key);
            },

        });
    }

    close(key) {
        Modal.confirm({
            title: `${intl.get('USER_INFO.MODAL_CF')}` + `${intl.get('METER.CLOSE')}`,
            content: `${intl.get('USER_INFO.MODAL_CF')}` + `${intl.get('METER.CLOSE')}`,
            okType: 'danger',
            centered: true,
            onOk: () => {
                this.switchM(key, false);
            },
        });
    }

    open(key) {
        Modal.confirm({
            title: `${intl.get('USER_INFO.MODAL_CF')}` + `${intl.get('METER.PULL')}`,
            content: `${intl.get('USER_INFO.MODAL_CF')}` + `${intl.get('METER.PULL')}`,
            okType: 'danger',
            centered: true,
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
        userdevs: state.userinfo_devs.userdevs,
        loading: state.userinfo_devs.loading,
        total: state.userinfo_devs.total,
        pageindex: state.userinfo_devs.pageindex,
        pagesize: state.userinfo_devs.pagesize,
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

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDevs));