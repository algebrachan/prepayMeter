import React, { Component } from 'react';
import { Row, Col, Anchor, message } from 'antd';
import Normal from './Normal';
import Ratio from './Ratio';
import Rates from './Rates';
import Sps from './Sps';
import Tmctl from './Tmctl';
import Tbls from './Tbls';
import './style.css';

const { Link } = Anchor;
class ParamTempSet extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="syspre_param_info_root">
                <Row>
                    <Col span={12}>
                        <div className={this.props.authority.Rate ? 'show' : 'hidden'}>
                            <Rates onRef={(ref) => { this.rates = ref }} />
                        </div>
                        <div className={this.props.authority.Rtbl ? 'show' : 'hidden'} >
                            <Tbls onRef={(ref) => { this.tbls = ref }} />
                        </div>
                        <div className={this.props.authority.Step ? 'show' : 'hidden'}>
                            <Sps onRef={(ref) => { this.step = ref }} />
                        </div>
                        <div className={this.props.authority.Tmctl ? 'show' : 'hidden'}>
                            <Tmctl onRef={(ref) => { this.tmctl1 = ref }} name="时段控制1" />
                        </div>
                        <div className={this.props.authority.Tmctl ? 'show' : 'hidden'}>
                            <Tmctl onRef={(ref) => { this.tmctl2 = ref }} name="时段控制2" />
                        </div>
                        <div className={this.props.authority.Ratio ? 'show' : 'hidden'}>
                            <Ratio onRef={(ref) => { this.ratio = ref }} />
                        </div>
                        <Normal onRef={(ref) => { this.normal = ref }} />
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

    componentDidMount() {
        this.props.onRef(this);
    }

    showChildState() {
        let normal = this.normal.state;
        let ratio = this.ratio.state;
        let rates = this.rates.state;
        let tbls = this.tbls.state;
        let step = this.step.state;
        let tmctl1 = this.tmctl1.state;
        let tmctl2 = this.tmctl2.state;
        let param = {
            normal: normal,
            ratio: ratio,
            rates: rates,
            tbls: tbls,
            step: step,
            tmctl1: tmctl1,
            tmctl2: tmctl2,
        }
        return param;
    }


}


export default ParamTempSet;