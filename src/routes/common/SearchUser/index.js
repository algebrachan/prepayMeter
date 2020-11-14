import React, { Component } from 'react';
import { Input, message, Select, Button } from 'antd';
import { searchCustomers } from '../../../utils/api';
import * as userModalCtors from '../../common/UserList/EditUserModal/store/actionCreators';
import { connect } from 'react-redux';
import EditUserModal from '../../common/UserList/EditUserModal';
import intl from 'react-intl-universal';
import './style.css';

const { Search } = Input;
const { Option } = Select;
class SearchUser extends Component {
    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const sys = arr[1]
        this.state = {
            system: sys,
            searchtype: 2,
            showModal: false,
            mspin: false,
        }
        this.searchUser = this.searchUser.bind(this);
        this.showM = this.showM.bind(this);
    }

    render() {
        return (
            <div className="search_user">
                <div className="search_user_input_wrap">
                    <Select
                        placeholder="搜索类型"
                        className="search_user_input_select"
                        onChange={(value) => this.onChangeSerType(value)}
                        value={this.state.searchtype}
                    >
                        <Option value={2}>用户编号</Option>
                        <Option value={3}>手机号</Option>
                    </Select>
                    <Search className="search_user_input_search" onSearch={value => this.searchUser(value)} enterButton />
                    <Button className="search_user_input_add" icon="edit" type="primary" onClick={() => this.props.showAddUser()}>{intl.get('COMMON_BTN.ADD_USER')}</Button>
                </div>
                <div className="search_user_input_wrap">

                </div>
                <EditUserModal />
            </div>
        );
    }

    showM(value) {
        this.setState({
            showModal: value
        });
    }

    onChangeSerType(value) {
        this.setState({
            searchtype: value,
        })
    }
    searchUser(value) {
        let search_type = this.state.searchtype;
        searchCustomers(search_type, value, 0, 10,
            (res) => {
                if (res.data.Status === 0 && res.data.Data.Total === 1) {
                    let key = res.data.Data.Objs[0].key;
                    this.props.history.push(`/${this.state.system}/home/userinfo/${key}`);
                } else if (res.data.Status === 1) {
                    message.info(res.data.Message)
                } else {

                }
            },
            () => {
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            });

    }


}
const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        showAddUser() {
            dispatch(userModalCtors.getAddAction());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);