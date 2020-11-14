import React, { Component } from 'react';
import CollectHeader from './CollectHeader';
import CollectTable from './CollectTable';
import EditCollectModal from './EditCollectModal';
import ImportCollectsModal from './ImportCollectsModal';
import './style.css';

class CollectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div className="syspre_collectlist_root">
                <div className="syspre_collectlist_header" >
                    <CollectHeader />
                </div>
                <div className="syspre_collectlist_table">
                    <CollectTable />
                </div>
                <EditCollectModal />
                <ImportCollectsModal/>
            </div>
        )
    }

}

export default CollectList;
