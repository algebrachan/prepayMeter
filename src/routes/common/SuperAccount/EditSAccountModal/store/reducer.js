import * as constants from './constants';
const defaultState = {
    show: false,
    mode: '',
    admin:
    {
        admin_name: '',
        admin_owner: '',
        admin_system: [],
        admin_agentid: '',
        admin_stat: '',
    }
}
export default (state = defaultState, action) => {
    if (action.type === constants.SUPER_ACCOUNT_MODAL_ADD) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.show = true;
        newState.mode = 'add';
        newState.admin.admin_name = '';
        newState.admin.admin_owner = '';
        newState.admin.admin_system = [];
        newState.admin.admin_agentid = '';
        newState.admin.admin_stat = '';
        return newState;
    }

    if (action.type === constants.SUPER_ACCOUNT_MODAL_EDIT) {
        const newState = JSON.parse(JSON.stringify(state));
        //更新编辑的设备
        if (action.obj) {
            newState.show = true;
            newState.mode = 'edit';
            newState.admin.admin_name = action.obj.admin_name;
            newState.admin.admin_owner = action.obj.admin_owner;
            newState.admin.admin_system = action.obj.admin_system;
            newState.admin.admin_agentid = action.obj.admin_agentid;
            newState.admin.admin_stat = action.obj.admin_stat;

        }

        return newState;
    }

    if (action.type === constants.SUPER_ACCOUNT_MODAL_HIDE) {

        const newState = JSON.parse(JSON.stringify(state));
        newState.show = false;
        return newState;
    }

    return state;
}