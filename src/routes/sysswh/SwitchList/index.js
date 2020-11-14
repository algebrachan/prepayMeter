import React,{Component} from 'react';
import SwitchHeader from './SwitchHeader';
import SwitchTable from './SwitchTable';
import EditSwitchModal from './EditSwitchModal';
import './style.css';

class SwitchList extends Component{

    

    render(){

        return(
            <div className="syspre_switchlist_root">
                <div className="syspre_switchlist_header">
                    <SwitchHeader  />
                </div>
                <div className="syspre_switchlist_table">
                    <SwitchTable/>
                </div>

                <EditSwitchModal/>
            </div>
        )
    }

}

export default SwitchList;
