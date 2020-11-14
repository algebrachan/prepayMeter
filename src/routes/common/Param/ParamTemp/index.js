import React, { Component } from 'react';
import { Row, Col, Anchor } from 'antd';
import { connect } from 'react-redux';
import * as paramTempCtors from '../ParamTemp/store/actionCreators';
import Normal from './Normal';
import Ratio from './Ratio';
import Rates from './Rates';
import Sps from './Sps';
import Tmctl from './Tmctl';
import Tbls from './Tbls';
import './style.css';

const { Link } = Anchor;
class ParamTemp extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            spinning: false,
        }
    }

    render() {

        return (
            <div className="syspre_param_info_root">
                <Row>
                    <Col span={12}>
                        {this.props.authority.Rate ? <Rates disabled={this.props.disabled} /> : ''}
                        {this.props.authority.Rtbl ? <Tbls disabled={this.props.disabled} /> : ''}
                        {this.props.authority.Step ? <Sps disabled={this.props.disabled} /> : ''}
                        {this.props.authority.Tmctl ? <Tmctl index={0} disabled={this.props.disabled} name="时段控制1" /> : ''}
                        {this.props.authority.Tmctl ? <Tmctl index={1} disabled={this.props.disabled} name="时段控制2" /> : ''}
                        {this.props.authority.Ratio ? <Ratio disabled={this.props.disabled} /> : ''}
                        <Normal disabled={this.props.disabled} />
                    </Col>
                    <Col span={6}>
                        <Anchor className="syspre_param_info_anchor">
                            {this.props.authority.Rate ? <Link href="#param_rates" title="费率" /> : ''}
                            {this.props.authority.Rtbl ? <Link href="#param_tbls" title="费率时段表" /> : ''}
                            {this.props.authority.Step ? <Link href="#param_sps" title="阶梯计价" /> : ''}
                            {this.props.authority.Tmctl ? <Link href="#param_tmctl" title="时段控制" /> : ''}
                            {this.props.authority.Ratio ? <Link href="#param_ratio" title="电能系数" /> : ''}
                            <Link href="#param_normal" title="其他" />
                        </Anchor>
                    </Col>
                </Row>
            </div>
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
        editParamAction(value) {
            dispatch(paramTempCtors.editParamAction(value));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ParamTemp);