import React, { Component } from 'react';
import { Table, Button, Divider, Typography, message, Spin, Modal, Tag, Select } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as devsCtors from './store/actionCreators';
import intl from 'react-intl-universal';
import * as session from '../../../utils/Session';
import { searchAbnormalMeters } from '../../../utils/api';
import { MeterPhase, ConnectType } from '../../../utils/enum';
import './style.css';

// const actType = session.getLoginVertificate().Type;
// const agtid = session.getLoginVertificate().AgtidStr;
const { Option } = Select;

class AbnormalMeter extends Component {
    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const sys = arr[1];
        this.state = {
            system: sys,
        }
        this.search = this.search.bind(this);
    }
    render() {
        const columns = this.initColumns();
        return (
            <div style={{ margin: 20, padding: 20, backgroundColor: '#fff' }}>
                <Spin spinning={this.props.loading}>
                    <Select
                        className="ab_dev_header_state"
                        onChange={this.props.changeSearchType}
                        value={this.props.search_type}
                    >
                        <Option value={1}>可能异常</Option>
                        <Option value={2}>异常</Option>
                    </Select>
                    <Button style={{ margin: 10 }} type='primary' onClick={() => this.requestData()}
                        icon="search"
                        className="ab_dev_header_btn_search">{intl.get('COMMON_BTN.SEARCH')}</Button>
                    <Table
                        style={{ margin: 10 }}
                        columns={columns}
                        dataSource={this.props.userdevs}
                        bordered
                        showHeader
                        pagination={{
                            total: this.props.total,
                            showTotal: total => `${intl.get('COMMON.TOTAL')} ${total} ${intl.get('COMMON.ITME')}`,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50', '100']
                        }}
                    />
                </Spin>
            </div>
        )
    }

    componentDidMount() {
        this.requestData();
    }
    requestData() {
        let errtype = this.props.search_type;
        this.props.setLoading(true);
        this.search(errtype);
    }
    search(errtype) {
        searchAbnormalMeters(errtype,
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
            })
    }
    initColumns() {
        const columns = [
            {
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
                title: '连接方式',
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
                title: '最后通讯时间',
                dataIndex: 'Cmmtp',
                align: 'center',
                key: 'Cmmtp',
                render: Cmmtp => {
                    var unixTimestamp = new Date(Cmmtp * 1000)
                    return unixTimestamp.toLocaleString();
                }
            }
        ];
        return columns;
    }
    onKeyLink(key) {
        this.props.history.push(`/${this.state.system}/home/meterinfo/${key}`);
    }

}
const mapStateToProps = (state) => {
    return {
        userdevs: state.abnormal_devs.userdevs,
        loading: state.abnormal_devs.loading,
        total: state.abnormal_devs.total,
        search_type: state.abnormal_devs.search_type,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoading(show) {
            dispatch(devsCtors.getLoadingAction(show));
        },
        update(list, total) {
            dispatch(devsCtors.getUpdateAction(list, total))
        },
        // changePagination(pageindex, pagesize) {
        //     dispatch(devsCtors.getChangePaginationAction(pageindex, pagesize))
        // },
        changeSearchType(value) {
            dispatch(devsCtors.getChangeTypeAction(value));
        },


    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AbnormalMeter));