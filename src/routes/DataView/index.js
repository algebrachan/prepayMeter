import React, { Component } from 'react';
import TotalElect from './TotalElect';
import OrderCount from './OrderCount';
import './dataview.css';
import OrderMoneySticY from './OrderMoneySticY';
import OrderMoneySticM from './OrderMoneySticM';
import OrderMoneySticD from './OrderMoneySticD';
class DataView extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="dataview_home_root">
                <div className="dataview_home_header">
                    <a href="/syspre/home" className="button" onClick={() => this.navigateToHome()}>
                        <img src={require("../../img/home1.svg")} />
                    </a>
                </div>
                <div className="dataview_home_header_blank"></div>
                <div className="dataview_home_content">
                    <div className="dataview_home_content_item"><OrderMoneySticY /></div>
                    <div className="dataview_home_content_item">
                        <div className="dataview_home_content_title">电表数据分析</div>
                    </div>
                    <div className="dataview_home_content_item"><TotalElect /></div>
                    <div className="dataview_home_content_item"><OrderMoneySticM /></div>
                    <div className="dataview_home_content_item"></div>
                    <div className="dataview_home_content_item"></div>
                    <div className="dataview_home_content_item"><OrderMoneySticD /></div>
                </div>
            </div>
        );
    }

}
export default DataView;