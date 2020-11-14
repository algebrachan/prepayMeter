import React, { Component } from 'react';
import AdminHeader from './AdminHeader';
import AdminTable from './AdminTable';
import EditAdminModal from './EditAdminModal';

import './style.css';

class AdminList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    render() {
        return (
            <div className="syspre_agentlist_root">
                <div className="syspre_agentlist_header"><AdminHeader /></div>
                <div className="syspre_agentlist_table"><AdminTable /></div>
                <EditAdminModal />
            </div>
        )
    }
}

export default AdminList;