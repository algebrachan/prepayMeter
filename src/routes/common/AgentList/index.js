import React, { Component } from 'react';
import AgentHeader from './AgentHeader';
import AgentTable from './AgentTable';
import EditAgentModal from './EditAgentModal';

import './style.css';

class AgentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    render() {

        return (
            <div className="syspre_agentlist_root">
                <div className="syspre_agentlist_header">
                    <AgentHeader />
                </div>
                <div className="syspre_agentlist_table">
                    <AgentTable />
                </div>
                <EditAgentModal />
            </div>

        )
    }

}

export default AgentList;