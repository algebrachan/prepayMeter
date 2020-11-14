import * as constants from "./constants";

const defaultState = {
    rentlog: [],
    loading: false,
    total: 0,
    pageindex: 1,
    pagesize: 10,
}
export default (state = defaultState, action) => {
    if (action.type === constants.USER_RENTLOG_TABLE_UPDATE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.loading = false;
        newState.total = action.total
        newState.rentlog = [...action.list];
        return newState;
    }
    else if (action.type === constants.USER_RENTLOG_TABLE_LOADING) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.loading = action.value;
        return newState;
    }
    //更新pageindex 和pagesize 的值
    else if (action.type === constants.USER_RENTLOG_CHANGE_PAGINATION) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.pageindex = action.pageindex;
        newState.pagesize = action.pagesize;
        return newState;
    }
    return state;
}