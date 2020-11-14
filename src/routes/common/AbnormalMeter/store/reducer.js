import * as constants from "./constants";

const defaultState = {
    userdevs: [],
    loading: false,
    total: 0,
    pageindex: 1,
    pagesize: 10,
    search_type: 2,
    search_value: '',
}
export default (state = defaultState, action) => {
    if (action.type === constants.ABNOR_METER_TABLE_UPDATE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.loading = false;
        newState.total = action.total
        newState.userdevs = [...action.list];
        return newState;
    }
    else if (action.type === constants.ABNOR_METER_TABLE_LOADING) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.loading = action.value;
        return newState;
    }
    //更新pageindex 和pagesize 的值
    else if (action.type === constants.ABNOR_METER_CHANGE_PAGINATION) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.pageindex = action.pageindex;
        newState.pagesize = action.pagesize;
        return newState;
    }
    else if (action.type === constants.ABNOR_METER_CHANGE_TYPE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.search_type = action.value;
        return newState;
    }
    return state;
}