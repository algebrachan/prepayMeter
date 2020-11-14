import React,{Component} from 'react';
// import { connect} from 'react-redux';
import SuperAccountHeader from './SuperAccountHeader';
import SuperAccountTable from './SuperAccountTable';
import EditSAccountModal from './EditSAccountModal';

import './style.css';

class SuperAccount extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false
        }
    }

    render(){

        return(
            <div className="syspre_superaccount_root">
                <div className="syspre_superaccount_header">
                    <SuperAccountHeader />
                </div>
                <div className="syspre_superaccount_table">
                    <SuperAccountTable />
                </div>
                <EditSAccountModal/>
            </div>

        )
    }

}

export default SuperAccount;