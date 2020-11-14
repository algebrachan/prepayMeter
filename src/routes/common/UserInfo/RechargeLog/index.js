import React, { Component } from 'react';
import { Table, Button, Spin, Tag, Typography, message } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as rechargeCtors from './store/actionCreators';
import { searchTransactionLogs } from '../../../../utils/api';
import * as session from '../../../../utils/Session'; 
import intl from 'react-intl-universal';
import './style.css'

class RechargeLog extends Component {
    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const keyid = arr[arr.length - 1];
        this.requestData = this.requestData.bind(this);
        this.state = {
            keyid: keyid,
        }

    }

    render() {
        const columns = this.initColumns();
        return (
            <div style={{ margin: 20 }}>
                <Spin spinning={this.props.loading}>
                    <Button style={{ marginLeft: 20 }} type='primary' onClick={this.requestData}>{intl.get('COMMON_BTN.SEARCH')}</Button>
                    <Table
                        style={{ marginTop: 10 }}
                        columns={columns}
                        dataSource={this.props.rechargelog}
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

    componentWillReceiveProps(nextProps) {
        if (this.props.pageindex !== nextProps.pageindex || this.props.pagesize !== nextProps.pagesize) {
            
            const start = 0;
            const end = 0;;
            const pageIndex = nextProps.pageindex - 1;
            const pageSize = nextProps.pagesize;
            const param = this.getRequestParam(start, end, pageIndex, pageSize);

            this.search(param);

        }

    }

    componentDidMount() {

        this.requestData();
    }

    requestData() {

        const start = 0;
        const end = 0;
        const pageIndex = this.props.pageindex - 1;
        const pageSize = this.props.pagesize;
        const param = this.getRequestParam(start, end, pageIndex, pageSize);
        this.search(param);
    }

    /**
     * 
     * @param {组装请求参数} keyid 
     * @param {*} start 
     * @param {*} end 
     * @param {*} pageIndex 
     * @param {*} pageSize 
     */
    getRequestParam(start, end, pageIndex, pageSize)
    {
        const keyid = this.state.keyid;
        
        const param = {
            Mac:'',
            Agtid: '',
            Sys: 0,
            Keyid: keyid,
            Start: start,
            End: end,
            PageIndex: pageIndex,
            PageSize: pageSize,
            Desc: true,
            Dir:'in',
        }
        return param;
    }

    search(param) {
        this.props.setLoading(true);
        searchTransactionLogs(param,
            (res) => {
                this.props.setLoading(false);
                if (res.data && (res.data.Status === 0 || res.data.Status === 1)) 
                {
                    let list = res.data.Status === 0 ? res.data.Data.Objs : [];
                    let total = res.data.Status === 0 ? res.data.Data.Total : 0;
                    this.props.update(list, total);
                }
                else
                {
                    message.error(`${intl.get('COMMON_MESSAGE.RST_FAIL')}[${res.data.Message}]`);
                }

            },
            () => {
                this.props.setLoading(false);
            }
        );
    }

    initColumns() {
        const columns = [
            {
                title: `${intl.get('USER_INFO.FLOW')}`,
                dataIndex: 'key',
                align: 'center',
                key: 'key',
                width: 200,
            },
            {
                title: `${intl.get('USER_INFO.RCG_TIME')}`,
                dataIndex: 'UtcStr',
                align: 'center',
                key: 'UtcStr',
                width: 200,
            },
            {
                title: `${intl.get('USER_INFO.PAY_AMT')}`,
                dataIndex: 'Cny',
                align: 'right',
                key: 'Cny',
                width: 120,
                render: Cny =>{
                    return(<Typography.Text style={{ color: '#d86c14' }}>{Cny}</Typography.Text>);
                }
            },
            {
                title: `${intl.get('USER_INFO.PAY_NAME')}`,
                dataIndex: 'Fwt',
                align: 'center',
                key: 'Fwt',
                width: 200,
                render: Fwt => {
                    switch(Fwt)
                    {
                        case 1:
                            return `${intl.get('USER_INFO.METER_RCG')}`;
                    }
                }
            },
            {
                title:  `${intl.get('USER_INFO.PAY_TARGET')}`,
                dataIndex: 'Target',
                align: 'center',
                key: 'Target',
                width: 200,
                
            },
            {
                title:  `${intl.get('USER_INFO.PAY_WAY')}`,
                dataIndex: 'Pwy',
                align: 'center',
                key: 'Pwy',
                width: 120,
                render: Pwy => {
                    switch (Pwy) {
                        case 1:
                    return (<Tag color="green">{intl.get('COMMON.WX')}</Tag>);
                        case 2:
                            return (<Tag color="blue">{intl.get('COMMON.ALI')}</Tag>);
                        case 3:
                            return (<Tag color="orange">{intl.get('COMMON.CASE')}</Tag>);
                    }
                }
            },
            {
                title: `${intl.get('USER_INFO.EVID')}`,
                dataIndex: 'Evid',
                align: 'center',
                key: 'Evid',
            },
            


        ];
        return columns;
    }




}
const mapStateToProps = (state) => {
    return {
        rechargelog: state.userinfo_rechargelog.rechargelog,
        loading: state.userinfo_rechargelog.loading,
        total: state.userinfo_rechargelog.total,
        pageindex: state.userinfo_rechargelog.pageindex,
        pagesize: state.userinfo_rechargelog.pagesize,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setLoading(show) {
            dispatch(rechargeCtors.getLoadingAction(show));
        },
        update(list, total) {
            dispatch(rechargeCtors.getUpdateAction(list, total))
        },
        changePagination(pageindex, pagesize) {
            dispatch(rechargeCtors.getChangePaginationAction(pageindex, pagesize))
        },
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RechargeLog));