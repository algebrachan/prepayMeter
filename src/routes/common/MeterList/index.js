import React, { Component } from 'react';
import MeterHeader from './MeterHeader';
import MeterTable from './MeterTable';
import EditMeterModal from './EditMeterModal';
import './style.css';
import ImportMetersModal from './ImportMetersModal';

class MeterList extends Component {
    render() {

        return (
            <div className="syspre_meterlist_root">
                <div className="syspre_meterlist_header">
                    <MeterHeader />
                </div>
                <div className="syspre_meterlist_table">
                    <MeterTable />
                </div>
                <EditMeterModal />
                <ImportMetersModal />
            </div>
        )
    }
}

export default MeterList;
