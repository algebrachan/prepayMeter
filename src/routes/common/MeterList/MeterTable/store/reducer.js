import * as constants from './constants';
const defaultState = {
    meterlist: [],
    loading: false,
    total: 0,
    selectedRowKeys: [],
    batch: false,
}

export default (state = defaultState, action) => {
    if (action.type === constants.METER_TABLE_UPDATE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.loading = false;
        newState.total = action.total;
        newState.meterlist = [...action.list];

        return newState;
    }
    else if (action.type === constants.METER_TABLE_LOADING) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.loading = action.value;
        return newState;
    }
    else if (action.type === constants.METER_TABLE_SELECT_ROWS) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.selectedRowKeys = [...action.selectRows];
        return newState;
    }
    else if (action.type === constants.METER_TABLE_BATCH_OPERATION) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.batch = action.value;
        return newState;
    }
    return state;
}