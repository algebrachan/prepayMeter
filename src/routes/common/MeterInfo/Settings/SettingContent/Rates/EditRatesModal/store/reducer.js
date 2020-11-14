import * as constants from './constants';
const defaultState = {
    show: false,
    obj:[],


}
export default (state = defaultState, action) => {
    if (action.type === constants.RATES_MODAL_EDIT) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.show = true;  
        for(let index in action.obj){
            newState.obj[index]=action.obj[index];
        }
        return newState;
    }
    if (action.type === constants.RATES_MODAL_HIDE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.show = false;
        return newState;
    }
    return state;
}