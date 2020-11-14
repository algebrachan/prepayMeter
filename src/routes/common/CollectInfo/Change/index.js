import React, { Component } from 'react';
import { Input, Typography, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
import intl from 'react-intl-universal';
import { transferGtw } from '../../../../utils/api';

import './style.css';
class Change extends Component {
    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const keyid = arr[arr.length - 1];
        this.state = {
            current_dev: '',
            keyid: keyid,
            btnload: false,
        }
    }

    render() {
        return (
            <div className="syspre_cchange_root">
                <div>
                    <Typography.Text className="syspre_info_item_label">目标采集器：</Typography.Text>
                    <Input className="syspre_cchange_input"
                        placeholder="请输入采集器编号"
                        value={this.state.current_dev}
                        onChange={(e) => this.CurrentChange(e)}
                    />
                    <Button className="syspre_cchange_btn_search" type="primary" onClick={() => this.transfer()} loading={this.state.btnload}>迁移</Button>
                </div>
            </div>
        );
    }

    CurrentChange(e) {
        this.setState({
            current_dev: e.target.value,
        });
    }

    transfer() {
        this.btnLoad(true);
        let newgtwkeyid = this.state.current_dev;
        let gtwhexkeyid = this.state.keyid;
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


}

export default withRouter(Change);
