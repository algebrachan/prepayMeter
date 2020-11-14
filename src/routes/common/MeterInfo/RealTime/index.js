import React, { Component, Fragment } from 'react';
import { Button, Spin, message, Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import Triphase from './Triphase';
import Uniphase from './Uniphase';
import intl from 'react-intl-universal';
import { getMeterData, readMeterData } from '../../../../utils/api';

class RealTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                Devtp: 1, Index: 0, Keyid: 0,
                Dt: 0, D1: 0, D2: 0, D3: 0, D4: 0, 
                Left: 0, Stat: 0,
                Fa: 0, Fb: 0, Fc: 0, Ft: 0,
                Ia: 0, Ib: 0, Ic: 0,
                Va: 0, Vb: 0, Vc: 0,
                Ies: 0, Ses: 0, Ues: 0, Pes: 0,
                Pa: 0, Pb: 0, Pc: 0, Pt: 0,
                Logtp: 0, Tag: 0, Rowid: 0, Rpttp: 0, Seq: 0,
                Rtp: 1,// 1单费率 2多费率
                Sig: 1,
                ReadUtcStr: '',
                RpttpStr: '',
                key: '',
            },
            spinning: false,
        }
        this.requestData = this.requestData.bind(this);
        this.readData = this.readData.bind(this);
    }

    render() {
        return (
            <Fragment>
                <div style={{ margin: 20 }}>
                    <Spin spinning={this.state.spinning}>
                        <Button style={{ marginBottom: 20 }} type='primary' onClick={this.requestData} >{intl.get('COMMON_BTN.REFRESH')}</Button>
                        <Button style={{ marginBottom: 20, marginLeft: 20 }} type='default' onClick={this.readData} >读取实时数据</Button>
                        {
                            this.state.data.Devtp === 1 ? <Uniphase data={this.state.data} /> : <Triphase data={this.state.data} />
                        }
                    </Spin>
                </div>
            </Fragment>
        );
    }


    componentDidMount() {
        this.requestData();
    }

    loading(spinning) {
        this.setState({
            spinning: spinning,
        });
    }

    /**
     * 远程抄读电表数据
     */
    readData() {
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const hexkeyid = arr[arr.length - 1];
        this.loading(true);

        readMeterData(
            hexkeyid,
            (res) => {
                this.loading(false);
                if (res.data.Status === 0) {
                    this.setState({
                        data: res.data.Data,
                    });
                }
                else {
                    message.error(`${intl.get('COMMON_MESSAGE.RST_FAIL')}`);
                }
            },
            () => {
                this.loading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            })
    }


    requestData() {
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const hexkeyid = arr[arr.length - 1];
        this.loading(true);

        getMeterData(
            hexkeyid,
            (res) => {
                this.loading(false);
                if (res.data.Status === 0) {
                    this.setState({
                        data: res.data.Data,
                    });
                }
                else {
                    message.error(`${intl.get('COMMON_MESSAGE.RST_FAIL')}`);
                }
            },
            () => {
                this.loading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            })
    }

}


export default withRouter(RealTime);