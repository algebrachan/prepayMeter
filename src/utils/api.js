import axios from 'axios';
import * as session from './Session';
import { showSessionOT } from '../routes/components/SessionOutTime';

// export const window.base_url = IPCONFIG;

// axios.default = IPCONFIG;

// const GlobalUrl = localStorage.getItem("GlobalUrl");
// export const host = GlobalUrl + ':8964';
// export const window.base_url = 'https://' + host;

// const ip = 'demo.laydin.com';
// export const host = ip + ':8964';
// export const window.base_url = 'https://' + host;

// const ip = 'lydpay.laydin.com';
// export const host = ip + ':8964';
// export const window.base_url = 'https://' + host;

// const ip = '192.168.43.118';
// export const host = ip + ':8480';
// export const window.base_url = 'http://' + host;


// const ip = 'www.cnhtdz.vip';
// export const host = ip + ':8964';
// export const window.base_url = 'https://' + host;


// const ip = '127.0.0.1';
// export const host = ip + ':8060';
// export const window.base_url = 'http://' + host;

/** 
 * 通用的post请求,参数为Json格式 
 * @param {*} url 请求路径 
 * @param {*} param 请求路径 
 * @param {*} then 接口调用成功的回调 
 * @param {*} error 接口调用失败的回调 
 */

const postJson = (url, param, then, error) => {
    axios({
        method: 'post',
        url: url,
        data: JSON.stringify(param),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((res) => {
            if (res.data.Status === 4) {
                showSessionOT();
            }
            then(res);
        })
        .catch(() => {
            error();
        });
}

/**
 * 通用的post请求,参数未为Json格式
 * @param {*} url 请求路径 
 * @param {*} formData 表单数据 
 * @param {*} then 接口调用成功的回调 
 * @param {*} error 接口调用失败的回调 
 */
const postFormData = (url, formData, then, error) => {
    axios({
        method: 'post',
        url: url,
        data: formData,
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            'Content-Type': 'multipart/form-data;charset=utf-8'
        },
    })
        .then((res) => {
            if (res.data.Status === 4) {
                showSessionOT();
            }
            then(res);
        })
        .catch(() => {
            error();
        });
}

/**
 * 通用get请求
 */
const get = (url, then, error) => {
    // console.log('window.base_url', window.base_url);
    axios.get(url)
        .then((res) => {
            if (res.data.Status === 4) {
                showSessionOT();
            }
            then(res);
        })
        .catch(() => {
            error();
        });
}

export const pay = (param, then, error) => {
    param.Mac = session.getLoginVertificate().Mac;
    param.Sys = session.getLoginVertificate().CurSys;
    const url = window.base_url + `/api/admin/Pay`;
    postJson(url, param, then, error);
}

export const getAgentSmsCtr = (then, error) => {
    let mac = session.getLoginVertificate().Mac;
    let agtid = session.getLoginVertificate().AgtidStr;
    const url = window.base_url + `/api/admin/GetAgentSmsCtr?mac=${mac}&agtid=${agtid}`;
    get(url, then, error);
}

export const modifyAgentSmsAccount = (param, then, error) => {
    param.Mac = session.getLoginVertificate().Mac;
    param.Agtid = session.getLoginVertificate().AgtidStr;
    const url = window.base_url + `/api/admin/ModifyAgentSmsAccount`;
    postJson(url, param, then, error);
}

export const manualRefund = (hexKeyid, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/ManualRefund?mac=${mac}&hexKeyid=${hexKeyid}`;
    get(url, then, error);
}

export const getSysStic = (then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/getSysStic?mac=${mac}`;
    get(url, then, error);
}

export const searchAgents = (type, value, pageindex, pagesize, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/SearchAgents?mac=${mac}&type=${type}&value=${value}&pageindex=${pageindex}&pagesize=${pagesize}`;
    get(url, then, error);
}

export const modifyAgent = (param, then, error) => {
    param.Mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/ModifyAgent`;
    postJson(url, param, then, error);

}

export const searchCustomers = (type, value, pageindex, pagesize, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/SearchCustomers?mac=${mac}&type=${type}&value=${value}&pageindex=${pageindex}&pagesize=${pagesize}`;
    get(url, then, error);
}

export const modifyCustomer = (param, then, error) => {
    param.Mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/ModifyCustomer`;
    postJson(url, param, then, error);
}

export const getCustomerInfo = (keyid, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/GetCustomerInfo?mac=${mac}&keyid=${keyid}`;
    get(url, then, error);
}

export const recharge = (keyid, value, paswd, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/Recharge?mac=${mac}&keyid=${keyid}&value=${value}&paswd=${paswd}`;
    get(url, then, error);
}


export const searchTransactionLogs = (param, then, error) => {
    param.Agtid = session.getLoginVertificate().AgtidStr;
    param.Mac = session.getLoginVertificate().Mac;
    param.Sys = session.getLoginVertificate().Sys;
    const url = window.base_url + `/api/admin/SearchPayLogs`;
    postJson(url, param, then, error);
}

export const searchGateways = (type, value, pageindex, pagesize, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/SearchGateways?mac=${mac}&type=${type}&value=${value}&pageindex=${pageindex}&pagesize=${pagesize}`;
    get(url, then, error);
}

export const modifyGateway = (param, then, error) => {
    param.Mac = session.getLoginVertificate().Mac;
    param.Sys = session.getLoginVertificate().CurSys;
    const url = window.base_url + `/api/admin/ModifyGateway`;
    postJson(url, param, then, error);
}

export const searchSwitchs = (type, value, pageindex, pagesize, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/SearchSwitchs?mac=${mac}&type=${type}&value=${value}&pageindex=${pageindex}&pagesize=${pagesize}`;
    get(url, then, error);
}

export const searchSwitchsNeerBy = (param, then, error) => {
    const url = window.base_url + `/api/admin/SearchSwitchsNearBy`;
    postJson(url, param, then, error);
}

export const modifySwitch = (param, then, error) => {
    const url = window.base_url + `/api/admin/ModifySwitch`;
    postJson(url, param, then, error);
}

// export const searchMeters = (type, value, pageindex, pagesize, then, error) => {
//     let sys = session.getLoginVertificate().CurSys;
//     const url = window.base_url + `/api/admin/SearchMeters?mac=0&sys=${sys}&type=${type}&value=${value}&pageindex=${pageindex}&pagesize=${pagesize}`;
//     get(url, then, error);
// }

export const searchMeters = (type, value, pageindex, pagesize, key, gpid, olstt, admid, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    let sys = session.getLoginVertificate().CurSys;
    let acttype = session.getLoginVertificate().Type;
    if (acttype === 4) {
        admid = session.getLoginVertificate().Usnam;
    }
    const url = window.base_url + `/api/admin/SearchMeters?mac=${mac}&sys=${sys}&type=${type}&value=${value}&pageindex=${pageindex}&pagesize=${pagesize}&gtwHexKeyid=${key}&gpid=${gpid}&olstt=${olstt}&admnam=${admid}`;
    get(url, then, error);
}

export const modifyMeter = (param, then, error) => {
    param.Sys = session.getLoginVertificate().CurSys;
    param.Mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/ModifyMeter`;
    postJson(url, param, then, error);
}

export const modifyMeterName = (param, then, error) => {
    param.Sys = session.getLoginVertificate().CurSys;
    param.Mac = session.getLoginVertificate().Mac;
    param.Agtid = session.getLoginVertificate().AgtidStr;
    const url = window.base_url + `/api/admin/ModifyMeterName`
    postJson(url, param, then, error);
}

export const getMeterInfo = (hexkeyid, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/GetMeterInfo?mac=${mac}&hexKeyid=${hexkeyid}`;
    get(url, then, error);
}

export const getMeterData = (hexkeyid, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/GetMeterData?mac=${mac}&hexKeyid=${hexkeyid}`;
    get(url, then, error);
}

export const readMeterData = (hexkeyid, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/ReadMeterData?mac=${mac}&hexKeyid=${hexkeyid}`;
    get(url, then, error);
}

export const syncMeterData = (hexkeyid, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/SyncMeterData?mac=${mac}&sn=${hexkeyid}`;
    get(url, then, error);
}

export const searchAdmins = (type, value, admtp, pageindex, pagesize, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/SearchAgentAdmins?mac=${mac}&type=${type}&value=${value}&admtp=${admtp}&pageindex=${pageindex}&pagesize=${pagesize}`;
    get(url, then, error);
}

export const searchRentLogs = (cstmid, state, pageindex, pagesize, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/SearchRentLogs?mac=${mac}&cstmid=${cstmid}&state=${state}&pageindex=${pageindex}&pagesize=${pagesize}`;
    get(url, then, error);
}

export const searchOrderLogs = (param, then, error) => {
    param.Mac = session.getLoginVertificate().Mac;
    param.Sys = session.getLoginVertificate().CurSys;
    param.Agtid = session.getLoginVertificate().Agtid;
    const url = window.base_url + `/api/admin/SearchOrderLogs`;
    postJson(url, param, then, error);
}

export const modifyAdmin = (param, then, error) => {
    param.Mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/ModifyAdmin`;
    postJson(url, param, then, error);
}

export const login = (usnam, paswd, sys, then, error) => {
    const url = window.base_url + `/api/admin/login?usnam=${usnam}&paswd=${paswd}&sys=${sys}`;
    get(url, then, error);
}

export const changePassword = (usnam, oldp, newp, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/ChangePassword?mac=${mac}&usnam=${usnam}&oldpaswd=${oldp}&newpaswd=${newp}`;
    get(url, then, error);
}

export const getAgentStic = (then, error) => {
    let mac = session.getLoginVertificate().Mac;
    let sys = session.getLoginVertificate().CurSys;
    let agtid = session.getLoginVertificate().Agtid;
    const url = window.base_url + `/api/admin/getAgentStic?mac=${mac}&agtid=${agtid}&sys=${sys}`;
    get(url, then, error);
}

export const getAgentMeterConnStic = (agtid, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/GetAgentMeterConnStic?mac=${mac}&agtid=${agtid}`;
    get(url, then, error);
}

export const getMeterOrder = (keyid, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/GetMeterOrder?mac=${mac}&hexKeyid=${keyid}`;
    get(url, then, error);
}

export const switchMeter = (key, stat, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/SwitchMeter?mac=${mac}&hexKeyid=${key}&stat=${stat}`;
    get(url, then, error);
}

export const keepPower = (key, stat, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/KeepPower?mac=${mac}&hexKeyid=${key}&stat=${stat}`;
    get(url, then, error);
}

export const createOrder = (idtype, cstmid, key, paswd, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/CreateOrder?mac=${mac}&idtype=${idtype}&cstmid=${cstmid}&hexKeyid=${key}&paswd=${paswd}`;
    get(url, then, error);
}

export const relieveOrder = (cstmid, key, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/RelieveOrder?mac=${mac}&cstmid=${cstmid}&hexKeyid=${key}`;
    get(url, then, error);
}

// export const searchMeterDatas = (key, year, month, day, then, error) => {
//     let mac = session.getLoginVertificate().Mac;
//     const url = window.base_url + `/api/admin/SearchMeterDatas?mac=${mac}&hexKeyid=${key}&year=${year}&month=${month}&day=${day}`;
//     get(url, then, error);
// }

export const rechargeMeter = (moid, key, paswd, cny, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/RechargeMeter?moid=${moid}&mac=${mac}&hexKeyid=${key}&paswd=${paswd}&cny=${cny}`;
    get(url, then, error);
}

export const getCstmOrders = (cstmid, pageindex, pagesize, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    let sys = session.getLoginVertificate().CurSys;
    const url = window.base_url + `/api/admin/GetCstmOrders?mac=${mac}&sys=${sys}&cstmid=${cstmid}&pageIndex=${pageindex}&pageSize=${pagesize}`;
    get(url, then, error);
}

export const searchMeterOrders = (param, then, error) => {
    param.Agtid = session.getLoginVertificate().AgtidStr
    param.Mac = session.getLoginVertificate().Mac;
    param.Sys = session.getLoginVertificate().CurSys;
    const url = window.base_url + `/api/admin/SearchMeterOrders`;
    postJson(url, param, then, error);
}

export const modifyGroup = (param, then, error) => {
    param.Mac = session.getLoginVertificate().Mac;
    param.Sys = session.getLoginVertificate().CurSys;
    param.Agtid = session.getLoginVertificate().AgtidStr;
    const url = window.base_url + `/api/admin/ModifyGroup`;
    postJson(url, param, then, error);
}

export const searchGroups = (value, pageindex, pagesize, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    let sys = session.getLoginVertificate().CurSys;
    const url = window.base_url + `/api/admin/SearchGroups?mac=${mac}&value=${value}&sys=${sys}&pageIndex=${pageindex}&pageSize=${pagesize}`;
    get(url, then, error);
}

export const searchMeterParamTmp = (value, pageindex, pagesize, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    let sys = session.getLoginVertificate().CurSys;
    const url = window.base_url + `/api/admin/SearchMeterParamTmp?mac=${mac}&value=${value}&sys=${sys}&pageindex=${pageindex}&pagesize=${pagesize}`;
    get(url, then, error);
}

export const modifyMeterParamTmpBasic = (param, then, error) => {
    param.Mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/ModifyMeterParamTmpBasic`;
    postJson(url, param, then, error);
}
export const modifyAgentPower = (param, then, error) => {
    param.Mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/ModifyAgentPower`;
    postJson(url, param, then, error);
}

export const getAgentPower = (keyid, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/GetAgentPower?mac=${mac}&keyid=${keyid}`;
    get(url, then, error);
}

export const getAdminPower = (then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/GetAdminPower?mac=${mac}`;
    get(url, then, error);
}

export const addMetersToGroup = (param, then, error) => {
    param.Mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/AddMetersToGroup`;
    postJson(url, param, then, error);
}

export const setTemplateToMeters = (param, then, error) => {
    param.Mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/SetTemplateToMeters`;
    postJson(url, param, then, error);
}

// export const bindTmpToGroup = (tmpid, gpid, then, error) => {
//     let sys = session.getLoginVertificate().CurSys;
//     let mac = session.getLoginVertificate().Mac;
//     const url = window.base_url + `/api/admin/BindTmpToGroup?mac=${mac}&sys=${sys}&tmpid=${tmpid}&gpid=${gpid}`;
//     get(url, then, error);
// }

export const setTemplateToGroup = (tmpid, gpid, then, error) => {
    let sys = session.getLoginVertificate().CurSys;
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/SetTemplateToGroup?mac=${mac}&sys=${sys}&tmpid=${tmpid}&gpid=${gpid}`;
    get(url, then, error);
}

export const searchBookItems = (type, value, bookid, expire, pageindex, pagesize, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/SearchBookItems?mac=${mac}&type=${type}&value=${value}&bookid=${bookid}&expire=${expire}&pageindex=${pageindex}&pagesize=${pagesize}`;
    get(url, then, error);
}

export const getAgentBooks = (then, error) => {
    let mac = session.getLoginVertificate().Mac;
    let agtid = session.getLoginVertificate().AgtidStr;
    const url = window.base_url + `/api/admin/GetAgentBooks?mac=${mac}&agtid=${agtid}`;
    get(url, then, error);
}

export const modifyBookItem = (param, then, error) => {
    param.Mac = session.getLoginVertificate().Mac;
    param.Agtid = session.getLoginVertificate().AgtidStr;
    const url = window.base_url + `/api/admin/ModifyBookItem`;
    postJson(url, param, then, error);
}

export const modifyBookItemExpire = (keyid, expire, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/ModifyBookItemExpire?mac=${mac}&keyid=${keyid}&expire=${expire}`;
    get(url, then, error);
}

export const searchMeterDatas = (param, then, error) => {
    param.Mac = session.getLoginVertificate().Mac;
    const url = window.base_url + '/api/admin/SearchMeterDatas';
    postJson(url, param, then, error);
}

export const modifyOrderMark = (sn, mark, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/ModifyOrderMark?mac=${mac}&sn=${sn}&mark=${mark}`;
    get(url, then, error);
}

export const getAgentFundStic = (then, error) => {
    let mac = session.getLoginVertificate().Mac;
    let agtid = session.getLoginVertificate().Agtid;
    let sys = session.getLoginVertificate().CurSys;
    const url = window.base_url + `/api/admin/GetAgentFundStic?mac=${mac}&agtid=${agtid}&sys=${sys}`;
    get(url, then, error);
}


export const getAgentMeterEnergyStic = (param, then, error) => {
    param.Agtid = session.getLoginVertificate().Agtid;
    param.Mac = session.getLoginVertificate().Mac;
    param.Sys = session.getLoginVertificate().CurSys;
    const url = window.base_url + `/api/admin/GetAgentMeterEnergyStic`;
    postJson(url, param, then, error);
}

export const getMeterEnergyStic = (year, month, hexkeyid, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    let sys = session.getLoginVertificate().CurSys;
    const url = window.base_url + `/api/admin/GetMeterEnergyStic?mac=${mac}&hexkeyid=${hexkeyid}&sys=${sys}&year=${year}&month=${month}`;
    get(url, then, error);
}

export const getGatewayInfo = (hexkeyid, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/GetGatewayInfo?mac=${mac}&hexkeyid=${hexkeyid}`;
    get(url, then, error);
}

export const modifyMeterParamTmp = (param, then, error) => {
    param.Mac = session.getLoginVertificate().Mac;
    param.Sys = session.getLoginVertificate().CurSys;
    const url = window.base_url + `/api/admin/ModifyMeterParamTmp`;
    postJson(url, param, then, error);
}

export const modifyAgentAccount = (param, then, error) => {
    param.Mac = session.getLoginVertificate().Mac;
    param.Agtid = session.getLoginVertificate().Agtid;
    const url = window.base_url + `/api/admin/ModifyAgentAccount`;
    postJson(url, param, then, error);
}

export const GetMeterParamTmp = (keyid, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/GetMeterParamTmp?mac=${mac}&keyid=${keyid}`;
    get(url, then, error);
}

export const getAgentAccount = (type, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    let agtid = session.getLoginVertificate().Agtid;
    const url = window.base_url + `/api/admin/GetAgentAccount?mac=${mac}&agtid=${agtid}&type=${type}`;
    get(url, then, error);
}

export const modifyAgentSubAdmin = (param, then, error) => {
    param.Mac = session.getLoginVertificate().Mac;
    param.Agentid = session.getLoginVertificate().AgtidStr;
    param.Sys = session.getLoginVertificate().CurSys;
    const url = window.base_url + `/api/admin/ModifyAgentSubAdmin`;
    postJson(url, param, then, error);
}

export const addMetersToAdmin = (param, then, error) => {
    param.Mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/AddMetersToAdmin`;
    postJson(url, param, then, error);
}

export const transferGtw = (gtwhexkeyid, newgtwkeyid, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/TransferGtw?mac=${mac}&gtwhexkeyid=${gtwhexkeyid}&newgtwkeyid=${newgtwkeyid}`;
    get(url, then, error);
}

export const importMeters = (formData, then, error) => {
    formData.append("Mac", session.getLoginVertificate().Mac);
    const url = window.base_url + `/api/init/ImportMeters`;
    postFormData(url, formData, then, error);
}

export const importGateways = (formData, then, error) => {
    formData.append("Mac", session.getLoginVertificate().Mac);
    const url = window.base_url + `/api/init/ImportGateways`;
    postFormData(url, formData, then, error);
}

export const syncGatewayParam = (sn, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/SyncGatewayParam?mac=${mac}&sn=${sn}`;
    get(url, then, error);
}

export const relieveMeterFromGateway = (sn, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/RelieveMeterFromGateway?mac=${mac}&sn=${sn}`;
    get(url, then, error);
}

export const getGatewayParam = (keyid, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/GetGatewayParam?mac=${mac}&keyid=${keyid}&all=false`;
    get(url, then, error);
}


export const deleteMeter = (sn, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/maintain/DeleteMeter?mac=${mac}&sn=${sn}`;
    get(url, then, error);
}

export const deleteGateway = (sn, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/maintain/DeleteGateway?mac=${mac}&sn=${sn}`;
    get(url, then, error);
}

export const batchConfigMetersToGateway = (param, then, error) => {
    param.Mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/maintain/BatchConfigMetersToGateway`;
    postJson(url, param, then, error);
}

export const sendVeriCode = (phone, type, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    const url = window.base_url + `/api/admin/SendVeriCode?mac=${mac}&phone=${phone}&type=${type}`;
    get(url, then, error);
}
export const sendEditAccountVeriCode = (then, error) => {
    let mac = session.getLoginVertificate().Mac;
    let agtid = session.getLoginVertificate().AgtidStr;
    const url = window.base_url + `/api/admin/SendEditAccountVeriCode?mac=${mac}&agtid=${agtid}`;
    get(url, then, error);
}

export const searchAbnormalMeters = (errtype, then, error) => {
    let mac = session.getLoginVertificate().Mac;
    let sys = session.getLoginVertificate().CurSys;
    let agtid = session.getLoginVertificate().AgtidStr;
    const url = window.base_url + `/api/admin/SearchAbnormalMeters?mac=${mac}&sys=${sys}&agtid=${agtid}&errtype=${errtype}`;
    get(url, then, error);
}

