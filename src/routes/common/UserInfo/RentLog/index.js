import React, { Component } from 'react';
import { Table, Button, DatePicker, Spin, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as rentlogCtors from './store/actionCreators';
import { searchOrderLogs } from '../../../../utils/api';
import * as session from '../../../../utils/Session';
import moment from 'moment';
import intl from 'react-intl-universal';
import './style.css'

const { RangePicker } = DatePicker;
// const actType = session.getLoginVertificate().Type;
const actSys = session.getLoginVertificate().CurSys;
// const dateFormat = 'YYYY-MM-DD';

class RentLog extends Component {
    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const keyid = arr[arr.length - 1];
        this.requestData = this.requestData.bind(this);
        this.state = {
            sys: 0,
            keyid: keyid,
            start: 0,
            end: 0,
            startStr: '',
            endStr: '',
        }
        this.setSysType = this.setSysType.bind(this);
    }

    render() {
        const columns = this.initColumns();
        return (

            <div style={{ margin: 20 }}>
                <Spin spinning={this.props.loading}>
                    <RangePicker onChange={(date, dateStr) => this.onChangeTime(date, dateStr)} />
                    <Button style={{ marginLeft: 20 }} type='primary' onClick={this.requestData}>{intl.get('COMMON_BTN.SEARCH')}</Button>
                    <Table
                        style={{ marginTop: 10 }}
                        columns={columns}
                        dataSource={this.props.rentlog}
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
                </Spin>
            </div>
        )
    }

    componentDidMount() {
        // this.setSysType();
        this.requestData();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.pageindex !== nextProps.pageindex || this.props.pagesize !== nextProps.pagesize) {
            let param = {
                Mac: '',
                Sys: 0,
                Cstmid: this.state.keyid,
                PageIndex: nextProps.pageindex - 1,
                PageSize: nextProps.pagesize,
                Start: this.state.start,
                End: this.state.end,
                Desc: true,
            };

            this.search(param);

        }

    }

    setSysType() {
        this.setState({
            sys: actSys,
        });
    }

    requestData() {

        let param = {
            Mac: '',
            Sys: 0,
            Cstmid: this.state.keyid,
            PageIndex: this.props.pageindex - 1,
            PageSize: this.props.pagesize,
            Start: this.state.start,
            End: this.state.end,
            Desc: true,
        };

        this.search(param);
    }

    search(param) {
        this.props.setLoading(true);

        //写一个api接口
        searchOrderLogs(param,
            (res) => {
                if (res.data && (res.data.Status === 0 || res.data.Status === 1)) {
                    let list = res.data.Status === 0 ? res.data.Data.Objs : [];
                    let total = res.data.Status === 0 ? res.data.Data.Total : 0;
                    this.props.update(list, total);
                }
                else {
                    this.props.setLoading(false);
                }
            },
            () => {
                this.props.setLoading(false);
            }
        );

    }

    onChangeTime(date, dateStr) {
        if (dateStr !== null) {
            let timeS = 0;
            let timeE = 0;
            if (dateStr[0] !== '' && dateStr[1] !== '') {
                timeS = moment(dateStr[0]).valueOf();
                timeE = moment(dateStr[1]).valueOf();
            }
            this.setState({
                start: timeS,
                end: timeE,
            });
        }

    }

    initColumns() {
        const columns = [
            {
                title: `${intl.get('COMMON.ORDER_NO')}`,
                dataIndex: 'key',
                align: 'center',
                key: 'key',
            },
            {
                title: `${intl.get('COMMON.DEV_NO')}`,
                dataIndex: 'HexKeyid',
                align: 'center',
                key: 'HexKeyid',
            },
            // {
            //     title: '起始度数',
            //     dataIndex: 'Sdt',
            //     align: 'center',
            //     key: 'Sdt',
            //     render: (Sdt) => {
            //         return (
            //             Sdt / 1000000
            //         );
            //     }
            // },
            // {
            //     title: '结束度数',
            //     dataIndex: 'Edt',
            //     align: 'center',
            //     key: 'Edt',
            //     render: (Edt) => {
            //         return (
            //             Edt / 1000000
            //         );
            //     }
            // },
            {
                title: `${intl.get('COMMON.BEGIN_TIME')}`,
                dataIndex: 'Sutc',
                align: 'center',
                key: 'Sutc',
                render: Sutc => {
                    if (Sutc !== 0) {
                        let dt = new Date(Sutc);

                        let localeStr = dt.toLocaleString();
                        return localeStr;
                    }
                    else {
                        return '-';
                    }
                }
            },
            {
                title: `${intl.get('COMMON.END_TIME')}`,
                dataIndex: 'Eutc',
                align: 'center',
                key: 'Eutc',
                render: Eutc => {
                    if (Eutc !== 0) {
                        let dt = new Date(Eutc);

                        let localeStr = dt.toLocaleString();
                        return localeStr;
                    }
                    else {
                        return '-';
                    }
                }
            },
            {
                title: `${intl.get('USER_INFO.DT')}`,
                align: 'center',
                key: 'Dt',
                render: (item) => {
                    return (
                        (item.Edt - item.Sdt) / 1000000
                    );
                }
            },
            {
                title: `${intl.get('USER_INFO.COST')}`,
                dataIndex: 'Cost',
                align: 'center',
                key: 'Cost',
                render: Cost => {
                    return (<Typography.Text style={{ color: '#d86c14' }}>{Cost / 1000}</Typography.Text>);
                }
            },
            {
                title: `${intl.get('USER_INFO.LEFT')}`,
                align: 'center',
                key: 'Left',
                render: (item) => {
                    return (<Typography.Text style={{ color: '#d86c14' }}>{(item.Rechg - item.Cost) / 1000}</Typography.Text>);
                }
            },

        ];
        return columns;
    }


}

const mapStateToProps = (state) => {
    return {
        rentlog: state.userinfo_rentlog.rentlog,
        loading: state.userinfo_rentlog.loading,
        total: state.userinfo_rentlog.total,
        pageindex: state.userinfo_rentlog.pageindex,
        pagesize: state.userinfo_rentlog.pagesize,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoading(show) {
            dispatch(rentlogCtors.getLoadingAction(show));
        },
        update(list, total) {
            dispatch(rentlogCtors.getUpdateAction(list, total))
        },
        changePagination(pageindex, pagesize) {
            dispatch(rentlogCtors.getChangePaginationAction(pageindex, pagesize))
        },

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RentLog));