import React, { Component } from 'react';
import SubHeader from './SubHeader';
import SubTable from './SubTable';
import EditCInfoModal from './EditCInfoModal';
import './style.css';

class CInfoList extends Component {


    render() {

        return (
            <div className="syspre_cinfolist_root">
                <div className="syspre_cinfolist_header">
                    <SubHeader />

                </div>
                <div className="syspre_cinfolist_table">
                    <SubTable />
                </div>
                <EditCInfoModal />
            </div>
        );
    }
}
export default CInfoList;