import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PageHeader, Select, Button, Modal, Spin, message, Typography, Input } from 'antd';
import ParamTemp from '../ParamTemp';
import * as paramTempCtors from '../ParamTemp/store/actionCreators';
import { searchGroups, setTemplateToGroup, getAdminPower, GetMeterParamTmp } from '../../../../utils/api';
import { connect } from 'react-redux';
import * as session from '../../../../utils/Session';
import intl from 'react-intl-universal';
import './style.css';

const { Option } = Select;
const { TextArea } = Input;

class LookParamTemp extends Component {
    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        const sys = arr[1];
        const keyid = arr[arr.length - 1];
        this.state = {
            system: sys,
            keyid: keyid,
            grouplist: [],
            showGroupModal: false,
            gpidval: '',
            gpspin: false,
            authority: {
                Right: [],
                Rtbl: false,
                Rate: false,
                Step: false,
                Tmctl: false,
                Ratio: false,
                Swh: false,
            },
            name: '',
            desc: '',
            loading: false,
        }
        this.requestRight = this.requestRight.bind(this);
        this.requestData = this.requestData.bind(this);
        this.changeLoad = this.changeLoad.bind(this);
    }

    render() {
       
        const gpoptions = this.state.grouplist.map(item => <Option key={item.key} value={item.key}>{item.Name}</Option>);
        return (
            <div style={{ backgroundColor: '#fff', margin: 20, minHeight: 'calc(100vh - 104px)' }}>
                <PageHeader onBack={() => window.history.back()} title="查看参数信息" subTitle={this.state.keyid} />
                <Spin spinning={this.state.loading}>
                    <Button className="syspre_param_look_btn" type="primary" icon="edit" onClick={() => this.setGroup()}>使用模板</Button>
                    <div style={{ width: 500, marginTop: 20 }}>
                        <div className="syspre_param_item">
                            <Typography.Text className="syspre_param_item_label">名称：</Typography.Text>
                            <Input 
                                autoComplete='off'
                                className="syspre_param_item_input"
                                value={this.state.name}
                                disabled />
                        </div>
                        <div className="syspre_param_item">
                            <Typography.Text className="syspre_param_item_label">描述：<br></br></Typography.Text>
                            <TextArea 
                                autoComplete='off'
                                className="syspre_param_item_input"
                                value={this.state.desc}
                                disabled />
                        </div>
                    </div>
                    <ParamTemp authority={this.state.authority} />
                </Spin>
                <Modal
                    title='选择分组'
                    visible={this.state.showGroupModal}
                    onOk={() => this.handleGpOk()}
                    onCancel={() => this.showGp(false)}
                    destroyOnClose
                    centered
                    width={400}
                >
                    <Spin spinning={this.state.gpspin}>
                        <div className="syspre_param_info_select">
                            将当前参数模板设置到分组
                    </div>
                        <Select placeholder='请选择分组'
                            onChange={(value) => this.hdChangeGp(value)} style={{ width: 300 }}>
                            {gpoptions}
                        </Select>
                    </Spin>

                </Modal>
            </div>
        );
    }
    componentDidMount() {
        this.requestRight();
        this.requestData();
        //设置disabled属性
        this.props.setDisabled(true);
    }

    requestData() {
        //请求数据
        let keyid = this.state.keyid;
        GetMeterParamTmp(keyid,
            (res) => {
                if (res.data.Status === 0) {
                    this.props.editParamAction(res.data.Data);
                    this.setState({
                        name: res.data.Data.Name,
                        desc: res.data.Data.Desc,
                    });
                } else {
                    this.props.addParamAction();
                }
            },
            () => {
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            })
    }

    //请求权限
    requestRight() {
        let keyid = session.getLoginVertificate().AgtidStr;
        this.changeLoad(true);
        getAdminPower(
            (res) => {
                this.changeLoad(false);
                if (res.data.Status === 0) {
                    this.setState({
                        authority: res.data.Data
                    });
                } else {
                    message.error(res.data.Message);
                }

            },
            () => {
                this.changeLoad(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            });
    }

    changeLoad(value) {
        this.setState({
            loading: value,
        });
    }

    gpload(value) {
        this.setState({
            gpload: value,
        });
    }

    showGp(value) {
        this.setState({
            showGroupModal: value
        });
    }
    setGroup() {
        searchGroups('', 0, 20,
            (res) => {
                if (res.data.Status === 0) {
                    this.setState({
                        grouplist: res.data.Data.Objs,
                    });
                } else {
                    message.error(res.data.Message);
                }
            },
            () => {
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            });
        this.showGp(true);
    }
    hdChangeGp(value) {
        this.setState({
            gpidval: value,
        });
    }
    handleGpOk() {
        let tmpid = this.state.keyid;
        let gpid = this.state.gpidval;
        this.gpload(true);
        setTemplateToGroup(tmpid, gpid,
            (res) => {
                this.gpload(false);
                if (res.data.Status === 0) {
                    message.success(`${intl.get('COMMON_MESSAGE.SET_SUCS')}`);
                    this.showGp(false);
                } else {
                    message.error(res.data.Message);
                }
            },
            () => {
                this.gpload(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            }
        );
    }

}

const mapStateToProps = (state) => {
    return {
        paramlist: state.param_temp.paramlist,
        disabled: state.param_temp.disabled,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //设置disabled属性
        setDisabled(value) {
            dispatch(paramTempCtors.setDisabledAction(value));
        },
        editParamAction(value) {
            dispatch(paramTempCtors.editParamAction(value));
        },
        addParamAction() {
            dispatch(paramTempCtors.addParamAction());
        },

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LookParamTemp));