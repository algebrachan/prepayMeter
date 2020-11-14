import React, { Component } from 'react';
import TemTable from './TemTable';
import TemHeader from './TemHeader';
import EditTemModal from './EditTemModal';
import './style.css';

class Template extends Component {

    render() {

        return (
            <div className="syspre_param_template_root">
                <div className="syspre_param_template_header">
                    <TemHeader />
                </div>
                <div className="syspre_param_template_table">
                    <TemTable />
                </div>
                <EditTemModal />
            </div>
        );
    }

}
export default Template;