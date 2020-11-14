import * as constants from './constants';
const defaultState = {
    show: false
}
export default (state = defaultState, action) => {
    
    if (action.type === constants.METER_IMPORT_VISIBLE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.show = action.visible;
        return newState;
    }

    return state;
}