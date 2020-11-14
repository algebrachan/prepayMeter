import React, { Component, Fragment } from 'react';
import { Button, Table, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { getGatewayParam } from '../../../../utils/api';
import intl from 'react-intl-universal';
class GtwyParam extends Component {
    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const keyid = arr[arr.length - 1];
        this.state = {
            keyid: keyid,
            loading: false,
            devs: [],
        }
        this.loading = this.loading.bind(this);
        this.requestData = this.requestData.bind(this);
    }

    render() {
        const columns = this.initColumns();
        return (
            <div style={{ padding: 10, backgroundColor: '#fff' }}>
                <Button style={{ margin: 10 }} type='primary' onClick={() => this.requestData()}>{intl.get('COMMON_BTN.REFRESH')}</Button>
                <Table
                    loading={this.state.loading}
                    style={{ margin: 10 }}
                    columns={columns}
                    dataSource={this.state.devs}
                    bordered
                    showHeader
                    pagination={{
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '50', '100']
                    }}
                />
            </div >
        );
    }
    componentDidMount() {
        this.requestData();
    }

    requestData() {
        let keyid = this.state.keyid;
        this.loading(true);
        getGatewayParam(keyid,
            (res) => {
                let list = [];
                if (res.data && res.data.Status === 0) {
                    list = res.data.Data;
                    this.setState({
                        devs: list,
                        loading: false
                    })
                } else {
                    this.loading(false);
                }
            },
            () => {
                this.loading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            })
    }
    loading(value) {
        this.setState({
            loading: value,
        });
    }

    initColumns() {
        const columns = [
            {
                title: '索引',
                dataIndex: 'Idx',
                align: 'center',
                key: 'Idx',
            },
            {
                title: '设备编号',
                dataIndex: 'key',
                align: 'center',
                key: 'key',
            },
            {
                title: '设备大类',
                dataIndex: 'Ltp',
                align: 'center',
                key: 'Ltp',
                render: Ltp => {
                    let str = "";
                    switch (Ltp) {
                        case 0: str = "设置无效"; break;
                        case 1: str = "漏保"; break;
                        case 2: str = "电表"; break;
                    }
                    return str;
                }
            },
            {
                title: '设备小类',
                dataIndex: 'Stp',
                align: 'center',
                key: 'Stp',
                render: Stp => {
                    let str = "";
                    switch (Stp) {
                        case 0: str = "单相645表"; break;
                        case 1: str = "单相laydin表"; break;
                        case 2: str = "单相modbus表"; break;
                        case 3: str = "三相645表"; break;
                        case 4: str = "三相laydin表"; break;
                        case 5: str = "三相modbus表"; break;
                    }
                    return str;
                }
            },
            {
                title: '厂商编号',
                dataIndex: 'Manu',
                align: 'center',
                key: 'Manu',
            },
            {
                title: '通讯端口',
                dataIndex: 'Cmpt',
                align: 'center',
                key: 'Cmpt',
                render: Cmpt => {
                    let str = "";
                    switch (Cmpt) {
                        case 0: str = "RS485-1"; break;
                        case 1: str = "RS485-2"; break;
                        case 2: str = "RS485-3"; break;
                        case 3: str = "Lora"; break;
                        case 4: str = "以太网"; break;
                        case 5: str = "WIFI"; break;
                        case 6: str = "载波"; break;
                    }
                    return str;
                }
            },
            {
                title: '通讯配置',
                dataIndex: 'CmcfgStr',
                align: 'center',
                key: 'CmcfgStr',
            },
        ];
        return columns;
    }
}
export default withRouter(GtwyParam);