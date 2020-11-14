import React,{Component} from 'react';
import UserHeader from './UserHeader';
import UserTable from './UserTable';
import EditAgentModal from './EditUserModal';
import './style.css';


class UserList extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false
        }
    }

    render(){
        return(
            <div className="syspre_userlist_root">
                <div  className="syspre_userlist_header">
                    <UserHeader/>
                </div>
                <div className="syspre_userlist_table">
                    <UserTable />
                </div>

                <EditAgentModal/>
            </div>
        )
    }
}

export default UserList;