import * as constants from './constants';
const defaultState = {
    show: false,
    mode: '',
    time:
    {
        time_keyid: '',//条目ID
        time_expire: '',//到期时间

    }
}
export default (state = defaultState, action) => {
    if (action.type === constants.EXPIRE_TIME_MODAL_EDIT) {
        const newState = JSON.parse(JSON.stringify(state));
        //更新时间
        if (action.obj) {
            newState.show = true;
            newState.mode = 'edit';
            newState.time.time_keyid = action.obj.time_keyid;
            newState.time.time_expire = action.obj.time_expire;
        }
        return newState;
    }

    if (action.type === constants.EXPIRE_TIME_MODAL_HIDE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.show = false;
        return newState;
    }

    return state;
}