import React,{Component} from 'react';
import StatisticsHeader from './StatisticsHeader';
import StatisticsChart from './StatisticsChart';
import './style.css';

class Statistics extends Component{

    render(){

        return(
            <div className="meterinfo_statistics_root">
                <div>
                    <StatisticsHeader className="meterinfo_statistics_header" />
                </div>
                <div className="meterinfo_statistics_chart">
                    <StatisticsChart/>
                </div>               
            </div>
        )
    }

}

export default Statistics;
