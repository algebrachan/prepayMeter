import React,{Component} from 'react';
import RecordHeader from './RecordHeader';
import RecordTable from './RecordTable';
import SubHeader from './SubHeader';
import './style.css';

class Record extends Component{

    render(){

        return(
            <div className="syspre_data_record_root">
                <div>
                    <RecordHeader className="syspre_data_record_header" />
                </div>
                <div>
                    <SubHeader className="syspre_data_record_sub"/>

                </div>
                <div className="syspre_data_record_table">
                    <RecordTable/>
                </div>
            </div>
        )
    }

}

export default Record;
