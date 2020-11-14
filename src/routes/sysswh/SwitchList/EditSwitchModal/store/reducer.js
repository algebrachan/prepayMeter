import * as constants from './constants';
const defaultState = {
    show: false,
    mode: '',
    switch:
    {
        switch_keyid: '',
        switch_name: '',
        switch_locat: '',
        switch_group: '',
        switch_dirgp: '',
        switch_agent: '',
        switch_lng: '',
        switch_lat: '',

    },
}
export default (state = defaultState, action) => {
    if (action.type === constants.SWITCH_MODAL_ADD) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.show = true;
        newState.mode = 'add';
        newState.switch.switch_keyid = '';
        newState.switch.switch_name = '';
        newState.switch.switch_agent = '';
        newState.switch.switch_lng = '';
        newState.switch.switch_lat = '';
        return newState;
    }

    if (action.type === constants.SWITCH_MODAL_EDIT) {
        const newState = JSON.parse(JSON.stringify(state));
        if (action.obj) {
            newState.show = true;
            newState.mode = 'edit';
            newState.switch.switch_keyid = action.obj.switch_keyid;
            newState.switch.switch_name = action.obj.switch_name;
            newState.switch.switch_agent = action.obj.switch_agent;
            newState.switch.switch_lng = action.obj.switch_lng;
            newState.switch.switch_lat = action.obj.switch_lat;
        }
        return newState;
    }
    if (action.type === constants.SWITCH_MODAL_HIDE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.show = false;
        return newState;
    }

    return state;
}