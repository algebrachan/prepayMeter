import React, { Component } from 'react';
import './style.css';
import GMHeader from './GMHeader';
import GMTable from './GMTable';
import EditGmModal from './EditGmModal';

class GroupManage extends Component {

    render() {
        return (
            <div className="syspre_groupmanager_root">
                <div className="syspre_groupmanager_header">
                    <GMHeader />
                </div>
                <div className="syspre_groupmanager_table">
                    <GMTable />
                </div>
                <EditGmModal />
            </div>

        );

    }
}

export default GroupManage;