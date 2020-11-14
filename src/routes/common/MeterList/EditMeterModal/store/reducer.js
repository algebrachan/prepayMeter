import * as constants from './constants';
const defaultState = {
    show: false,
    mode: '',
    meter:
    {
        meter_keyid: '',
        meter_name: '',
        meter_agent: '',
        meter_devtp: '',
        meter_ptp: '',
        meter_rtp: '',
        meter_chgtp: '',
        meter_irmt: '',
        meter_chk: '',//奇偶校验
        meter_dbit: '',//数据位
        meter_brate: '',//波特率
        meter_prtl: '',// 1. laydin 2. 645
        meter_psw: '',// 645有 密码
        meter_wmd: '',//接线方式 int 1直接式 2互感式
        meter_ctrt: '',// 互感式有 互感系数 int
    },
}
export default (state = defaultState, action) => {
    if (action.type === constants.METER_MODAL_ADD) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.show = true;
        newState.mode = 'add';
        newState.meter.meter_keyid = '';
        newState.meter.meter_name = '';
        newState.meter.meter_agent = '';
        newState.meter.meter_devtp = '';
        newState.meter.meter_ptp = '';
        newState.meter.meter_rtp = '';
        newState.meter.meter_chgtp = '';
        newState.meter.meter_irmt = '';
        newState.meter.meter_chk = '';
        newState.meter.meter_dbit = '';
        newState.meter.meter_brate = '';
        newState.meter.meter_prtl = '';
        newState.meter.meter_psw = '';
        newState.meter.meter_wmd = '';
        newState.meter.meter_ctrt = '';
        return newState;
    }

    if (action.type === constants.METER_MODAL_EDIT) {
        const newState = JSON.parse(JSON.stringify(state));
        if (action.obj) {
            newState.show = true;
            newState.mode = 'edit';
            newState.meter.meter_keyid = action.obj.meter_keyid;
            newState.meter.meter_name = action.obj.meter_name;
            newState.meter.meter_agent = action.obj.meter_agent;
            newState.meter.meter_devtp = action.obj.meter_devtp;
            newState.meter.meter_ptp = action.obj.meter_ptp;
            newState.meter.meter_rtp = action.obj.meter_rtp;
            newState.meter.meter_chgtp = action.obj.meter_chgtp;
            newState.meter.meter_irmt = action.obj.meter_irmt;
            newState.meter.meter_chk = action.obj.meter_chk;
            newState.meter.meter_dbit = action.obj.meter_dbit;
            newState.meter.meter_brate = action.obj.meter_brate;
            newState.meter.meter_prtl = action.obj.meter_prtl;
            newState.meter.meter_psw = action.obj.meter_psw;
            newState.meter.meter_wmd = action.obj.meter_wmd;
            newState.meter.meter_ctrt = action.obj.meter_ctrt;
        }
        return newState;
    }
    if (action.type === constants.METER_MODAL_HIDE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.show = false;
        return newState;
    }

    return state;
}