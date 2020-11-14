import * as constants from './constants';
const defaultState = {
    show: false,
    mode: '',
    agent:
    {
        admin_name: '',
        admin_owner: '',
        admin_stat: 0,
    }
}
export default (state = defaultState, action) => {
    if (action.type === constants.ADMIN_MODAL_ADD) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.show = true;
        newState.mode = 'add';
        newState.agent.admin_name = '';
        newState.agent.admin_owner = '';
        newState.agent.admin_stat = 0;
        return newState;
    }

    if (action.type === constants.ADMIN_MODAL_EDIT) {
        const newState = JSON.parse(JSON.stringify(state));
        //更新编辑的设备
        if (action.obj) {
            newState.show = true;
            newState.mode = 'edit';
            newState.agent.admin_name = action.obj.admin_name;
            newState.agent.admin_owner = action.obj.admin_owner;
            newState.agent.admin_stat = action.obj.admin_stat;
        }
        return newState;
    }

    if (action.type === constants.ADMIN_MODAL_HIDE) {

        const newState = JSON.parse(JSON.stringify(state));
        newState.show = false;
        return newState;
    }

    return state;
}