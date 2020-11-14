import * as constants from './constants';
const defaultState = {
    switchlist: [],
    loading: false,
}

export default (state = defaultState, action) => {
    if (action.type === constants.SWITCH_MAP_UPDATE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.loading = false;
        newState.switchlist = [...action.value];
        return newState;
    }
    else if (action.type === constants.SWITCH_MAP_LOADING) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.loading = action.value;
        return newState;
    }
    return state;
}