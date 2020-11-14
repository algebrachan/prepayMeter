import * as constants from './constants';
const defaultState = {
    collectlist:[],
    loading:false,
    total:0,
}

export default (state = defaultState,action) =>{
    if(action.type === constants.COLLECT_TABLE_UPDATE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.loading = false;
        newState.total = action.total;
        newState.collectlist = [...action.list];
        return newState;
    }
    else if(action.type === constants.COLLECT_TABLE_LOADING){
        const newState = JSON.parse(JSON.stringify(state));
        newState.loading = action.value;
        return newState;
    }
    return state;
}