import * as constants from './constants'

const defaultState = {
    search_type: '1',
    search_value: '',
    search_online_state: undefined,
    search_enable: undefined,
    pageindex: 1,
    pagesize: 10,
}

export default (state = defaultState, action) => {
    //更新search_type的值
    if(action.type === constants.COLLECT_INFO_HEADER_CHANGE_TYPE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.search_type = action.value;
        return newState;
    }
    //更新search_value的值
    else if(action.type === constants.COLLECT_INFO_HEADER_CHANGE_VALUE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.search_value = action.value;
        return newState;
    }
    else if(action.type === constants.COLLECT_INFO_HEADER_CHANGE_STATE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.search_online_state = action.value;
        return newState;
    }
    else if(action.type === constants.COLLECT_INFO_HEADER_CHANGE_ENABLE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.search_enable = action.value;
        return newState;
    }
    //更新pageindex 和pagesize 的值
    else if (action.type === constants.COLLECT_INFO_HEADER_CHANGE_PAGINATION) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.pageindex = action.pageindex;
        newState.pagesize = action.pagesize;
        return newState;
    }
    return state
}