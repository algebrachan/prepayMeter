import React, { Component } from 'react';
import './style.css';
// import {  message, Row, Col, Spin } from 'antd';
// import { getSysStic } from '../../../../utils/api';
// import DataShow from './DataShow';
// import HomeChart from './HomeChart';

class SuperHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                Incm: {
                    Dincm: 0,
                    Mincm: 0,
                    Yincm: 0,
                    Tincm: 0,
                },
            },
            spinning: false,
        }
        // this.requestData = this.requestData.bind(this);
    }

    render() {

        return (
            <div className="super_home_root">
                {/* <Spin spinning={this.state.spinning}>
                    <Row gutter={16}>
                        <Col >
                            <DataShow data={this.state.data}/>
                        </Col>     

                    </Row>
                    <Row gutter={16}>                
                    </Row>
                </Spin> */}
            </div>
        );
    }
    componentDidMount() {
        // this.requestData();
    }
    // loading(spinning) {
    //     this.setState({
    //         spinning: spinning,
    //     });
    // }
    // requestData() {
    //     this.loading(true);
    //     getSysStic(
    //         (res) => {
    //             this.loading(false);
    //             if (res.data.Status === 0) {
    //                 this.setState({
    //                     data: res.data.Data,
    //                 });
    //             }
    //             else {
    //                 message.error(res.data.Message);
    //             }
    //         },
    //         () => {
    //             message.error('网络异常');
    //             this.loading(false);
    //         }
    //     )
    // }

}
export default SuperHome;