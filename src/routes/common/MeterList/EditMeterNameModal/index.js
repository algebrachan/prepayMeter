import React, { Component } from 'react';
import { Modal, Spin, message, Form, Input } from 'antd';
import { isNull } from 'util';
import { connect } from 'react-redux';
import { modifyMeterName } from '../../../../utils/api';
import * as tableCtors from '../MeterTable/store/actionCreators';
import * as metertors from '../store/actionCreators';
import intl from 'react-intl-universal';
class EditMeterNameModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            spinning: false,
        }
        this.handleOk = this.handleOk.bind(this);
        this.Loading = this.Loading.bind(this);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        return (
            <Modal
                title={'修改电表名称'}
                visible={this.props.show}
                onOk={this.handleOk}
                onCancel={this.props.hide}
                destroyOnClose
                centered
            >
                <Spin spinning={this.state.spinning}>
                    <Form>
                        <Form.Item label="电表名称" {...formItemLayout}>
                            {getFieldDecorator('meter_name', {
                                rules: [{
                                    required: true,
                                    message: '电表名称',
                                }, {
                                    validator: this.validatorLength,
                                }],
                                initialValue: this.props.data.meter_name
                            })(
                                <Input autoComplete='off' placeholder='请输入电表名称' />
                            )}
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>

        );
    }

    changeLoading(loading) {
        this.setState({
            spinning: loading
        })
    }

    handleOk = () => {
        const form = this.props.form;
        let isValid = false;

        form.validateFields(['meter_name'], { force: true }, (err, value) => {
            isValid = isNull(err);
        });

        //校验失败直接返回
        if (!isValid) {
            return;
        }

        const name = form.getFieldValue('meter_name');
        const keyid = this.props.data.meter_keyid;
        const param = {
            Mac: '',
            Action: 2,
            HexKeyid: keyid,
            Usnam: name,
            Sys: 0,
            Agtid: '',
        }
        this.Loading(true);
        modifyMeterName(param,
            (res) => {
                this.Loading(false);
                if (res.data && res.data.Status === 0 && res.data.Data) {
                    message.success(`${intl.get('COMMON_MESSAGE.SAVE_SUCS')}`);
                    this.props.hide();
                    this.autoSearch();
                } else {
                    message.error(res.data.Message);
                }
            },
            () => {
                this.Loading(false);
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            });
    }

    Loading(value) {
        this.setState({
            spinning: value,
        });
    }

    autoSearch() {
        const type = this.props.search_type;
        const value = this.props.search_value;
        const pageindex = this.props.pageindex - 1;
        const pagesize = this.props.pagesize;
        const gpid = 0;
        const key = '';
        const olstt = this.props.search_olstt;
        const admid = this.props.search_admid;
        this.props.updateMeters(type, value, pageindex, pagesize, key, gpid, olstt, admid);
    }

}

const mapStateToProps = (state) => {
    return {
        search_admid: state.meter_header.search_admid,
        search_type: state.meter_header.search_type,
        search_value: state.meter_header.search_value,
        search_olstt: state.meter_header.search_olstt,
        pageindex: state.meter_header.pageindex,
        pagesize: state.meter_header.pagesize,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        updateMeters(type, value, pageindex, pagesize, key, gpid, olstt, admid) {
            //显示加载
            dispatch(tableCtors.getLoadingAction(true));
            //触发搜索
            dispatch(metertors.getDoSearchMeterAction(type, value, pageindex, pagesize, key, gpid, olstt, admid));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({})(EditMeterNameModal));
