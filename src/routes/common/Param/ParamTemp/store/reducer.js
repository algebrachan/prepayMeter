import * as constants from "./constants";

const defaultState = {
    paramlist: {
        Tbl: {
            Rtis: [
                { Tim: '00:00', Rate: 1 },

            ]
        },
        //时段费率表
        Rates: [
            "", "", "", ""
        ],//费率
        Step: {
            Sps: [
                { Engy: '', Exp: '' },
            ],//阶梯计价
        },
        Tmctl: {
            Tbls: [
                {
                    Msk: 1,
                    Tis: [
                        { Start: '00:00', End: '00:00' },
                        { Start: '00:00', End: '00:00' },
                        { Start: '00:00', End: '00:00' },
                        { Start: '00:00', End: '00:00' },
                    ]
                },
                {
                    Msk: 1,
                    Tis: [
                        { Start: '00:00', End: '00:00' },
                        { Start: '00:00', End: '00:00' },
                        { Start: '00:00', End: '00:00' },
                        { Start: '00:00', End: '00:00' },
                    ]
                },
            ]
        },//时段控制表
        Ratio: '',//电能系数
        Hu: '',//电压上限
        Lu: '',//电压下限
        Hp: '',//最大功率限定值
        Keep: true,//保电
    },
    disabled: false,
    paramlist2: {
        Tbl: {
            Rtis: [
                { Tim: '00:00', Rate: 1 },

            ]
        },
        //时段费率表
        Rates: [
            "", "", "", ""
        ],//费率
        Step: {
            Sps: [
                { Engy: '', Exp: '' },
            ],//阶梯计价
        },
        Tmctl: {
            Tbls: [
                {
                    Msk: 0,
                    Tis: [
                        { Start: '00:00', End: '00:00' },
                        { Start: '00:00', End: '00:00' },
                        { Start: '00:00', End: '00:00' },
                        { Start: '00:00', End: '00:00' },
                    ]
                },
                {
                    Msk: 0,
                    Tis: [
                        { Start: '00:00', End: '00:00' },
                        { Start: '00:00', End: '00:00' },
                        { Start: '00:00', End: '00:00' },
                        { Start: '00:00', End: '00:00' },
                    ]
                },
            ]
        },
        Ratio: '',
        Hu: '',
        Lu: '',
        Hp: '',
        Keep: true,
    },
}
export default (state = defaultState, action) => {
    if (action.type === constants.PARAM_TEMP_EDIT) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.paramlist = action.list;
        return newState;
    }
    else if (action.type === constants.PARAM_TEMP_EDIT_RATE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.paramlist.Rates[0] = action.rate[0];
        newState.paramlist.Rates[1] = action.rate[1];
        newState.paramlist.Rates[2] = action.rate[2];
        newState.paramlist.Rates[3] = action.rate[3];
        return newState;
    }
    else if (action.type === constants.PARAM_TEMP_EDIT_NORMAL) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.paramlist.Hu = action.normal.Hu;
        newState.paramlist.Lu = action.normal.Lu;
        newState.paramlist.Hp = action.normal.Hp;
        newState.paramlist.Keep = action.normal.Keep;
        return newState;
    }
    else if (action.type === constants.PARAM_TEMP_EDIT_TBL) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.paramlist.Tbl.Rtis = action.tbl;
        return newState;
    }
    else if (action.type === constants.PARAM_TEMP_EDIT_SPS) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.paramlist.Step.Sps = action.sps;
        return newState;
    }
    else if (action.type === constants.PARAM_TEMP_EDIT_RATIO) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.paramlist.Ratio = action.ratio;
        return newState;
    }
    else if (action.type === constants.PARAM_TEMP_EDIT_TMCTL) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.paramlist.Tmctl.Tbls[action.index] = action.tmctl;
        return newState;
    }
    else if (action.type === constants.PARAM_TEMP_DISABLED) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.disabled = action.value;
        return newState;
    }
    else if (action.type === constants.PARAM_TEMP_ADD) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.paramlist = newState.paramlist2;
        return newState;
    }
    return state;
}