import React, { Component, Fragment } from 'react';
import { Button, Spin, message, Modal, Input, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import { deleteGateway, transferGtw } from '../../../../utils/api';
import ImportGtwyMeters from './ImportGtwyMeters';
import intl from 'react-intl-universal';


class GtwyMaintain extends Component {
    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const keyid = arr[arr.length - 1];
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
            current_dev: '',
            keyid: keyid,
            btnload: false,
            showImportModal: false,
        }
        this.clickDeleteBtn = this.clickDeleteBtn.bind(this);
        this.doDelete = this.doDelete.bind(this);
        this.debugReadData = this.debugReadData.bind(this);
        this.showImport = this.showImport.bind(this);
    }

    render() {
        return (
            <Fragment>
                <div style={{ margin: 20 }}>
                    <Spin spinning={this.state.spinning}>
                        <Button type="danger" onClick={this.clickDeleteBtn} >删除采集器</Button>
                        {/* <Button style={{ marginBottom: 20, marginLeft: 20 }} type='default' onClick={this.debugReadData} >调试数据读取</Button> */}
                    </Spin>
                </div>
                <div style={{ margin: 20 }}>
                    <Typography.Text className="syspre_info_item_label">目标采集器：</Typography.Text>
                    <Input className="syspre_cchange_input"
                        placeholder="请输入采集器编号"
                        value={this.state.current_dev}
                        onChange={(e) => this.CurrentChange(e)}
                    />
                    <Button className="syspre_cchange_btn_search" type="primary" onClick={() => this.transfer()} loading={this.state.btnload}>迁移</Button>
                </div>
                <div style={{ margin: 20 }}>
                    <Button className="syspre_cchange_btn_search" type="primary" onClick={() => this.showImport(true)}>{intl.get('COMMON_BTN.BATCH_CFG')}</Button>
                </div>
                <ImportGtwyMeters show={this.state.showImportModal} hide={() => this.showImport(false)} />
            </Fragment>
        );
    }


    componentDidMount() {

    }
    showImport(value) {
        this.setState({
            showImportModal: value
        });
    }

    loading(spinning) {
        this.setState({
            spinning: spinning,
        });
    }

    /**
     * 点击删除按钮
     */
    clickDeleteBtn() {
        var that = this;
        Modal.confirm({
            "centered": true,
            "title": "确定要删除采集器?",
            "content": (
                <Fragment>
                    该操作有可能造成数据丢失，请谨慎操作！
                </Fragment>
            ),
            "onOk": () => {
                that.doDelete();
            }
        });
    }
    CurrentChange(e) {
        this.setState({
            current_dev: e.target.value,
        });
    }

    transfer() {
        let newgtwkeyid = this.state.current_dev;
        if (newgtwkeyid === '' || newgtwkeyid === null) {
            message.info('请输入采集器');
            return;
        }
        let gtwhexkeyid = this.state.keyid;
        this.btnLoad(true);
        transferGtw(gtwhexkeyid, newgtwkeyid,
            (res) => {
                this.btnLoad(false);
                if (res.data.Status == 0 && res.data.Data) {
                    message.success(`${intl.get('COMMON_MESSAGE.RST_SUCS')}`);

                } else {
                    message.error(res.data.Message);
                }
            },
            () => {
                this.btnLoad(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            });
    }
    btnLoad(value) {
        this.setState({
            btnload: value,
        });
    }




    /**
     * 执行删除操作
     */
    doDelete() {
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const hexkeyid = arr[arr.length - 1];
        this.loading(true);

        deleteGateway(
            hexkeyid,
            (res) => {
                this.loading(false);
                if (res.data.Status === 0) {
                    message.success(`${intl.get('COMMON_MESSAGE.OPER_SUCS')}`);
                    this.setState({
                        data: res.data.Data,
                    });
                }
                else {
                    message.error(res.data.Message);
                }
            },
            () => {
                this.loading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            })
    }


    /**
     * 调试远程抄读电表数据
     */
    debugReadData() {
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const hexkeyid = arr[arr.length - 1];
        this.loading(true);

    }
}


export default withRouter(GtwyMaintain);