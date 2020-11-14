import React, { Component } from 'react';
import { Input, Button, Table } from 'antd';
import intl from 'react-intl-universal';
import './style.css';

const data = [
    { key: 1, Usnam: 'a' },
    { key: 2, Usnam: 'b' },
]

class AgentIncome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchval: '',
            pageindex: 1,
            pagesize: 10,
            total: 0,
            list: [],
            spinning: false,
        }
        this.requestData = this.requestData.bind(this);
        this.changePagination = this.changePagination.bind(this);
    }

    render() {
        const columns = this.initColumns();
        return (
            <div className="agent_income_root">
                <div className="income_list_header_root">
                    <Input
                        className="income_list_header_input"
                        placeholder={intl.get('COMMON_IPT.SEARCH_IPT')}
                        value={this.state.searchval}
                        onChange={(e) => this.changeSearchValue(e)}
                    />
                    <Button type='primary' className="income_list_header_btn"
                        onClick={() => this.clickSearch()}>{intl.get('COMMON_BTN.SEARCH')}</Button>
                </div>
                <div className="income_list_table_root">
                    <Table
                        loading={this.state.spinning}
                        columns={columns}
                        bordered
                        showHeader
                        dataSource={data}
                        pagination={{
                            onShowSizeChange: this.changePagination,
                            onChange: this.changePagination,
                            position: 'bottom',
                            current: this.state.pageindex,
                            pageSize: this.state.pagesize,
                            total: this.state.total,
                            showTotal: total => `${intl.get('COMMON.TOTAL')} ${total} ${intl.get('COMMON.ITME')}`,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50', '100'],
                        }}
                    />
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.requestData();
    }

    //
    componentDidUpdate(preProps, preState) {

        if (preState.pageindex !== this.state.pageindex || preState.pagesize !== this.state.pagesize) {
            this.requestData();
        }
    }
    requestData() {
        //请求数据


    }

    changeSearchValue(e) {

        this.setState({
            searchval: e.target.value,
        });
    }

    clickSearch() {
        this.requestData();
    }

    initColumns() {
        const columns = [
            {
                title: '经销商ID',
                dataIndex: 'key',
                align: 'center',
                key: 'key',
            },
            {
                title: '经销商名称',
                dataIndex: 'Usnam',
                align: 'center',
                key: 'Usnam',
            },
        ]
        return columns;
    }

    changePagination(pageindex, pagesize) {
        this.setState({
            pageindex: pageindex,
            pagesize: pagesize,
        })
    }

}

export default AgentIncome;