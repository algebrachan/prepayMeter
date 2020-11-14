import React, { Component } from 'react';
import { PageHeader } from 'antd';
import { withRouter } from 'react-router-dom';
import ProfeeHeader from './ProfeeHeader';
import ProfeeTable from './ProfeeTable';
import EditProfeeModal from './EditProfeeModal';
import './style.css';
import EditTimeModal from './EditTimeModal';

class PropertyFee extends Component {
    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const string = arr[arr.length - 1];
        const arr2 = string.split('&');
        const keyid = arr2[0];
        const name = arr2[1];
        this.state = {
            keyid: keyid,
            name: name,
        }

    }
    render() {
        let decodeName = window.decodeURIComponent(window.atob(this.state.name))//解码。
        return (
            <div className="book_property_root">
                <PageHeader onBack={() => window.history.back()} title={decodeName} subTitle={this.state.keyid} />
                <div className="book_property_content">
                    <div className="book_property_header">
                        <ProfeeHeader />
                    </div>
                    <div className="book_property_table">
                        <ProfeeTable />
                    </div>
                    <EditProfeeModal />
                    <EditTimeModal />
                </div>
            </div>
        );
    }
}
export default withRouter(PropertyFee);