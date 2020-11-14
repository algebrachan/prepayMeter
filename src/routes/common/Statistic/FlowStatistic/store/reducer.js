import * as constants from "./constants";

const defaultState = {
    flowstatistic: [],
    loading: false,
    total: 0,
    start: 0,
    end: 0,
    pwy: 0,
    dir: "",
    pageindex: 1,
    pagesize: 10,
    type: 4,
    value: '',
}
export default (state = defaultState, action) => {
    if (action.type === constants.FLOWSTATISTIC_TABLE_UPDATE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.loading = false;
        newState.total = action.total
        newState.flowstatistic = [...action.list];
        return newState;
    }
    else if (action.type === constants.FLOWSTATISTIC_TABLE_LOADING) {

        const newState = JSON.parse(JSON.stringify(state));
        newState.loading = action.value;
        return newState;
    }
    //更新pageindex 和pagesize 的值
    else if (action.type === constants.FLOWSTATISTIC_CHANGE_PAGINATION) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.pageindex = action.pageindex;
        newState.pagesize = action.pagesize;
        return newState;
    }

    else if (action.type === constants.FLOWSTATISTIC_CHANGE_TIME) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.start = action.start;
        newState.end = action.end;
        return newState;
    }
    else if (action.type === constants.FLOWSTATISTIC_CHANGE_PWY) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.pwy = action.pwy;
        return newState;
    }
    else if (action.type === constants.FLOWSTATISTIC_CHANGE_DIR) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.dir = action.dir;
        return newState;
    }
    else if (action.type === constants.FLOWSTATISTIC_CHANGE_TYPE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.type = action.value;
        return newState;
    }
    else if (action.type === constants.FLOWSTATISTIC_CHANGE_VALUE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.value = action.value;
        return newState;
    }
    return state;
}