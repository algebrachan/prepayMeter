import React,{Component} from 'react';
import SettingsHeader from './SettingsHeader';
import SettingsTable from './SettingsTable';
import './style.css';

class Settings extends Component{

    render(){

        return(
            <div className="syspre_settings_root">
                <div>
                    <SettingsHeader className="syspre_settings_header" />
                </div>
                <div className="syspre_settings_table">
                    <SettingsTable/>
                </div>
            </div>
        )
    }

}

export default Settings;
