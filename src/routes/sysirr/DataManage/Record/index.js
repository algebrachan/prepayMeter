import React,{Component} from 'react';
import RecordHeader from './RecordHeader';
import RecordTable from './RecordTable';
import './style.css';

class Record extends Component{

    render(){

        return(
            <div className="sysirr_data_record_root">
                <div>
                    <RecordHeader className="sysirr_data_record_header" />
                </div>
                <div className="sysirr_data_record_table">
                    <RecordTable/>
                </div>
            </div>
        )
    }

}

export default Record;
