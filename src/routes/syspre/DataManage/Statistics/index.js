import React,{Component} from 'react';
import StatisticsHeader from './StatisticsHeader';
import StatisticsChart from './StatisticsChart';
import SubHeader from './SubHeader';
import './style.css';

class Statistics extends Component{

    render(){

        return(
            <div className="syspre_data_statistics_root">
                <div>
                    <StatisticsHeader className="syspre_data_statistics_header" />
                </div>
                <div>
                    <SubHeader className="syspre_data_statistics_sub"/>

                </div>
                <div className="syspre_data_statistics_chart">
                    <StatisticsChart/>
                </div>
                
            </div>
        )
    }

}

export default Statistics;
