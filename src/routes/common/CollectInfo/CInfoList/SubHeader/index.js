import React, { Component } from 'react';
import { Select, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import * as cinfoModalCtors from '../EditCInfoModal/store/actionCreators';
import * as tableCtors from '../SubTable/store/actionCreators';
import * as headerCtors from '../SubHeader/store/actionCreators';
import * as cinfoCtors from '../store/actionCreators';
import { syncGatewayParam } from '../../../../../utils/api';
import { withRouter } from 'react-router-dom';
import intl from 'react-intl-universal';
import './style.css';


const { Option } = Select;
class SubHeader extends Component {
    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const keyid = arr[arr.length - 1];
        this.state = {
            keyid: keyid,
            btnSync: false,
        }
        this.searchClick = this.searchClick.bind(this);
        this.loadingBtn = this.loadingBtn.bind(this);
    }

    render() {
        return (
            <div className="syspre_collectinfo_header_root">
                <Select
                    defaultValue='1'
                    className="syspre_collectinfo_header_state"
                    onChange={this.props.changeSearchType}
                    value={this.props.search_type}
                >
                    <Option value="1">名称</Option>
                    <Option value="2">编号</Option>
                </Select>
                <Input className="syspre_collectinfo_header_input_search"
                    placeholder={intl.get('COMMON_IPT.SEARCH_IPT')}
                    value={this.props.search_value}
                    onChange={this.props.changeSearchValue}
                />
                <Button className="syspre_collectinfo_header_btn_search" type="primary" icon="search" onClick={this.searchClick}>{intl.get('COMMON_BTN.SEARCH')}</Button>
                <Button className="syspre_collectinfo_header_btn_search" type="primary" onClick={() => this.syncGtw()} loading={this.state.btnSync}>同步参数</Button>
                {/* <Button className="syspre_collectinfo_header_btn_search" type="primary" icon="edit" onClick={() => { this.props.showAddCinfo() }}>添加</Button> */}
            </div>
        );

    }
    showImport() {

    }
    loadingBtn(value) {
        this.setState({
            btnSync: value,
        });
    }

    syncGtw() {
        let keyid = this.state.keyid;
        this.loadingBtn(true);
        syncGatewayParam(keyid,
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

    componentDidMount() {
        this.searchClick();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.pageindex !== nextProps.pageindex || this.props.pagesize !== nextProps.pagesize) {
            const type = this.props.search_type;
            const value = this.props.search_value;
            const pageindex = nextProps.pageindex - 1;
            const pagesize = nextProps.pagesize;
            const key = this.state.keyid;
            this.props.updateCinfos(type, value, pageindex, pagesize, key);
        }
    }
    searchClick() {
        const type = this.props.search_type;
        const value = this.props.search_value;
        const pageindex = this.props.pageindex - 1;
        const pagesize = this.props.pagesize;
        const key = this.state.keyid;
        this.props.updateCinfos(type, value, pageindex, pagesize, key);
    }
}
const mapStateToProps = (state) => {
    return {
        search_type: state.collect_info_header.search_type,
        search_value: state.collect_info_header.search_value,
        pageindex: state.collect_info_header.pageindex,
        pagesize: state.collect_info_header.pagesize,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateCinfos(type, value, pageindex, pagesize, key) {
            dispatch(tableCtors.getLoadingAction(true));
            dispatch(cinfoCtors.getDoSearchCinfoAction(type, value, pageindex, pagesize, key));
        },
        showAddCinfo() {
            dispatch(cinfoModalCtors.getAddAction());
        },
        changeSearchType(value) {
            dispatch(headerCtors.getChangeTypeAction(value));
        },
        // input框的参数,event.target.value
        changeSearchValue(e) {
            dispatch(headerCtors.getChangeValueAction(e.target.value));
        },
        changePagination(pageindex, pagesize) {
            dispatch(headerCtors.getChangePaginationAction(pageindex, pagesize));
        }
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubHeader));