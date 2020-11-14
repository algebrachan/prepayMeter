import * as constants from './constants';
const defaultState = {
    show: false,
    mode: '',
    group:
    {
        group_keyid:'',
        group_name:'',
        group_desc:'',
    }
}
export default (state = defaultState, action) => {
    if (action.type === constants.GROUP_MODAL_ADD) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.show = true;
        newState.mode = 'add';
        newState.group.group_keyid = '';
        newState.group.group_name = '';
        newState.group.group_desc = '';
        return newState;
    }

    if(action.type === constants.GROUP_MODAL_EDIT){
        const newState = JSON.parse(JSON.stringify(state));
        //更新编辑的设备
        if(action.obj){
            newState.show = true;
            newState.mode = 'edit';
            newState.group.group_keyid = action.obj.group_keyid;
            newState.group.group_name = action.obj.group_name;
            newState.group.group_desc = action.obj.group_desc;
        }
        
        return newState;
    }

    if (action.type === constants.GROUP_MODAL_HIDE) {

        const newState = JSON.parse(JSON.stringify(state));
        newState.show = false;
        return newState;
    }

    return state;
}