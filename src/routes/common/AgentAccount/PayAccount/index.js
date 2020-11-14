import React, { Component } from 'react';
import Wx from './Wx';
import './style.css';

class PayAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="syspre_agent_account_pay_root">
                <Wx />
            </div>
        );

    }

}
export default PayAccount;