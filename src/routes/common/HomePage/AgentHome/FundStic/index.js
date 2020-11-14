import React, { Component } from 'react';
import { Card, message, Icon, Typography, Spin } from 'antd';
import { getAgentFundStic } from '../../../../../utils/api';
import intl from 'react-intl-universal';
import { AlipayCircleOutlined, WechatOutlined, AccountBookOutlined, TransactionOutlined } from '@ant-design/icons';


class FundStic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Dcnls: [
                { Imctr: 0, Imcnl: 0, Pyctr: 0, Pycnl: 0 },
                { Imctr: 0, Imcnl: 0, Pyctr: 0, Pycnl: 0 },
                { Imctr: 0, Imcnl: 0, Pyctr: 0, Pycnl: 0 },
                { Imctr: 0, Imcnl: 0, Pyctr: 0, Pycnl: 0 },
                { Imctr: 0, Imcnl: 0, Pyctr: 0, Pycnl: 0 },
            ],
            Mcnls: [
                { Imctr: 0, Imcnl: 0, Pyctr: 0, Pycnl: 0 },
                { Imctr: 0, Imcnl: 0, Pyctr: 0, Pycnl: 0 },
                { Imctr: 0, Imcnl: 0, Pyctr: 0, Pycnl: 0 },
                { Imctr: 0, Imcnl: 0, Pyctr: 0, Pycnl: 0 },
                { Imctr: 0, Imcnl: 0, Pyctr: 0, Pycnl: 0 },
            ],
            Ycnls: [
                { Imctr: 0, Imcnl: 0, Pyctr: 0, Pycnl: 0 },
                { Imctr: 0, Imcnl: 0, Pyctr: 0, Pycnl: 0 },
                { Imctr: 0, Imcnl: 0, Pyctr: 0, Pycnl: 0 },
                { Imctr: 0, Imcnl: 0, Pyctr: 0, Pycnl: 0 },
                { Imctr: 0, Imcnl: 0, Pyctr: 0, Pycnl: 0 },
            ],
            spinning: false,

        }
        this.requestData = this.requestData.bind(this);
        this.loading = this.loading.bind(this);
    }

    render() {

        return (
            <div className="agent_fund_stic_root">
                <Spin spinning={this.state.spinning}>
                    <Card title={intl.get('HOMEPAGE.FUND_STIC.DATE_STIC')} bordered={false} className="agent_fund_stic_card">
                        <div className="agent_fund_stic_item">
                            <AccountBookOutlined style={{ fontsize: '20px', }} />
                            <label className="agent_fund_stic_item_label">{intl.get('HOMEPAGE.FUND_STIC.TOTAL_ORDER')}</label>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Dcnls[0].Imctr}</span>{intl.get('COMMON.UNIT_COUNT')}</Typography.Text>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Dcnls[0].Imcnl / 1000}</span>{intl.get('COMMON.UNIT_MONEY')}</Typography.Text>
                        </div>
                        <div className="agent_fund_stic_item">
                            <WechatOutlined style={{ fontsize: '20px', }} />
                            <label className="agent_fund_stic_item_label">{intl.get('HOMEPAGE.FUND_STIC.WX_ORDER')}</label>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Dcnls[1].Imctr}</span>{intl.get('COMMON.UNIT_COUNT')}</Typography.Text>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Dcnls[1].Imcnl / 1000}</span>{intl.get('COMMON.UNIT_MONEY')}</Typography.Text>
                        </div>
                        <div className="agent_fund_stic_item">
                            <AlipayCircleOutlined style={{ fontsize: '20px', }} />
                            <label className="agent_fund_stic_item_label">{intl.get('HOMEPAGE.FUND_STIC.ALI_ORDER')}</label>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Dcnls[2].Imctr}</span>{intl.get('COMMON.UNIT_COUNT')}</Typography.Text>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Dcnls[2].Imcnl / 1000}</span>{intl.get('COMMON.UNIT_MONEY')}</Typography.Text>
                        </div>
                        <div className="agent_fund_stic_item">
                            <TransactionOutlined style={{ fontsize: '20px', }} />
                            <label className="agent_fund_stic_item_label">{intl.get('HOMEPAGE.FUND_STIC.CASH_ORDER')}</label>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Dcnls[3].Imctr}</span>{intl.get('COMMON.UNIT_COUNT')}</Typography.Text>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Dcnls[3].Imcnl / 1000}</span>{intl.get('COMMON.UNIT_MONEY')}</Typography.Text>
                        </div>
                    </Card>
                    <Card title={intl.get('HOMEPAGE.FUND_STIC.MONTH_STIC')} bordered={false} className="agent_fund_stic_card">
                        <div className="agent_fund_stic_item">
                            <AccountBookOutlined style={{ fontsize: '20px', }} />
                            <label className="agent_fund_stic_item_label">{intl.get('HOMEPAGE.FUND_STIC.TOTAL_ORDER')}</label>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Mcnls[0].Imctr}</span>{intl.get('COMMON.UNIT_COUNT')}</Typography.Text>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Mcnls[0].Imcnl / 1000}</span>{intl.get('COMMON.UNIT_MONEY')}</Typography.Text>
                        </div>
                        <div className="agent_fund_stic_item">
                            <WechatOutlined style={{ fontsize: '20px', }} />
                            <label className="agent_fund_stic_item_label">{intl.get('HOMEPAGE.FUND_STIC.WX_ORDER')}</label>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Mcnls[1].Imctr}</span>{intl.get('COMMON.UNIT_COUNT')}</Typography.Text>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Mcnls[1].Imcnl / 1000}</span>{intl.get('COMMON.UNIT_MONEY')}</Typography.Text>
                        </div>
                        <div className="agent_fund_stic_item">
                            <AlipayCircleOutlined style={{ fontsize: '20px', }} />
                            <label className="agent_fund_stic_item_label">{intl.get('HOMEPAGE.FUND_STIC.ALI_ORDER')}</label>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Mcnls[2].Imctr}</span>{intl.get('COMMON.UNIT_COUNT')}</Typography.Text>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Mcnls[2].Imcnl / 1000}</span>{intl.get('COMMON.UNIT_MONEY')}</Typography.Text>
                        </div>
                        <div className="agent_fund_stic_item">
                            <TransactionOutlined style={{ fontsize: '20px', }} />
                            <label className="agent_fund_stic_item_label">{intl.get('HOMEPAGE.FUND_STIC.CASH_ORDER')}</label>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Mcnls[3].Imctr}</span>{intl.get('COMMON.UNIT_COUNT')}</Typography.Text>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Mcnls[3].Imcnl / 1000}</span>{intl.get('COMMON.UNIT_MONEY')}</Typography.Text>
                        </div>
                    </Card>
                    <Card title={intl.get('HOMEPAGE.FUND_STIC.YEAR_STIC')} bordered={false} className="agent_fund_stic_card">
                        <div className="agent_fund_stic_item">
                            <AccountBookOutlined style={{ fontsize: '20px', }} />
                            <label className="agent_fund_stic_item_label">{intl.get('HOMEPAGE.FUND_STIC.TOTAL_ORDER')}</label>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Ycnls[0].Imctr}</span>{intl.get('COMMON.UNIT_COUNT')}</Typography.Text>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Ycnls[0].Imcnl / 1000}</span>{intl.get('COMMON.UNIT_MONEY')}</Typography.Text>
                        </div>
                        <div className="agent_fund_stic_item">
                            <WechatOutlined style={{ fontsize: '20px', }} />
                            <label className="agent_fund_stic_item_label">{intl.get('HOMEPAGE.FUND_STIC.WX_ORDER')}</label>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Ycnls[1].Imctr}</span>{intl.get('COMMON.UNIT_COUNT')}</Typography.Text>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Ycnls[1].Imcnl / 1000}</span>{intl.get('COMMON.UNIT_MONEY')}</Typography.Text>
                        </div>
                        <div className="agent_fund_stic_item">
                            <AlipayCircleOutlined style={{ fontsize: '20px', }} />
                            <label className="agent_fund_stic_item_label">{intl.get('HOMEPAGE.FUND_STIC.ALI_ORDER')}</label>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Ycnls[2].Imctr}</span>{intl.get('COMMON.UNIT_COUNT')}</Typography.Text>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Ycnls[2].Imcnl / 1000}</span>{intl.get('COMMON.UNIT_MONEY')}</Typography.Text>
                        </div>
                        <div className="agent_fund_stic_item">
                            <TransactionOutlined style={{ fontsize: '20px', }} />
                            <label className="agent_fund_stic_item_label">{intl.get('HOMEPAGE.FUND_STIC.CASH_ORDER')}</label>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Ycnls[3].Imctr}</span>{intl.get('COMMON.UNIT_COUNT')}</Typography.Text>
                            <Typography.Text className="agent_fund_stic_item_value"><span>{this.state.Ycnls[3].Imcnl / 1000}</span>{intl.get('COMMON.UNIT_MONEY')}</Typography.Text>
                        </div>
                    </Card>
                </Spin>
            </div>
        );
    }

    componentDidMount() {
        this.requestData();
    }

    requestData() {
        this.loading(true);
        getAgentFundStic(
            (res) => {
                this.loading(false);
                if (res.data.Status === 0) {
                    this.setState({
                        Dcnls: res.data.Data.Dcnls,
                        Mcnls: res.data.Data.Mcnls,
                        Ycnls: res.data.Data.Ycnls,
                    });
                } else {
                    message.error(res.data.Message);
                }
            },
            () => {
                this.loading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            }
        )
    }

    loading(value) {
        this.setState({
            spinning: value
        })
    }

}
export default FundStic;