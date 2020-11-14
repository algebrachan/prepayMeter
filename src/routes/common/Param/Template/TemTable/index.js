import React, { Component, Fragment } from 'react';
import { Table, Button, Typography } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as paramModalCtors from '../EditTemModal/store/actionCreators';
import * as headerCtors from '../TemHeader/store/actionCreators';
import intl from 'react-intl-universal';
import './style.css';

class TemTable extends Component {
    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const sys = arr[1];
        this.state = {
            system: sys,
        }
        this.onEdit = this.onEdit.bind(this);
        // this.onKeyLink = this.onKeyLink.bind(this);

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
                    dataSource={this.props.paramlist}
                    pagination={{
                        onShowSizeChange: this.props.changePagination,
                        onChange: this.props.changePagination,
                        position: 'bottom',
                        current: this.props.pageindex,
                        pageSize: this.props.pagesize,
                        showTotal: total => `${intl.get('COMMON.TOTAL')} ${total} ${intl.get('COMMON.ITME')}`,
                        total: this.props.total,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20']
                    }}
                />
            </div>
        );
    }

    initColumns() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'key',
                align: 'center',
                key: 'key',
                // render: key => {
                //     return (
                //         <Typography.Text className='table_link' onClick={() => this.onKeyLink(key)}>{key}</Typography.Text>
                //     );
                // }
            },
            {
                title: '模板名称',
                dataIndex: 'Name',
                align: 'center',
                key: 'Name',
            },
            {
                title: '描述',
                dataIndex: 'Desc',
                align: 'center',
                key: 'Desc',
            },
            {
                align: 'center',
                title: '操作',
                key: 'action',
                render: (item) =>
                    (
                        <Fragment>
                            <Button type='primary' icon='edit' onClick={() => this.onEdit(item.key)}>{intl.get('COMMON_BTN.EDIT')}</Button>
                            <Button type='primary' icon='file-search' onClick={() => this.onLook(item.key)} style={{ marginLeft: 10 }}>{intl.get('COMMON_BTN.LOOK')}</Button>
                        </Fragment>
                    ),
            }



        ];
        return columns;
    }

    onEdit(key) {
        let param = this.props.paramlist.find(item => item.key === key);
        let obj = undefined;
        if (param) {
            obj = {
                param_keyid: param.key,
                param_name: param.Name,
                param_desc: param.Desc,
            }
        }
        this.props.showEditParam(obj);
    }
    onLook(key) {
        this.props.history.push(`/${this.state.system}/home/param/look/${key}`);
    }

    // onKeyLink(key) {
    //     // let dev = this.props.meterlist.find(item => item.key === key);
    //     this.props.history.push(`/${this.state.system}/home/param/template/${key}`);
    // }

}
const mapStateToProps = (state) => {
    return {
        paramlist: state.param_table.paramlist,
        loading: state.param_table.loading,
        total: state.param_table.total,
        pageindex: state.param_header.pageindex,
        pagesize: state.param_header.pagesize,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showEditParam(obj) {
            dispatch(paramModalCtors.getEditAction(obj));
        },
        changePagination(pageindex, pagesize) {
            dispatch(headerCtors.getChangePaginationAction(pageindex, pagesize))
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TemTable));
