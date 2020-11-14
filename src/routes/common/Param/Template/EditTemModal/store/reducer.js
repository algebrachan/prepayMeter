import * as constants from './constants';
const defaultState = {
    show: false,
    mode: '',
    param:
    {
        param_keyid:'',
        param_name:'',
        param_desc:'',
    }
}
export default (state = defaultState, action) => {
    if (action.type === constants.PARAM_MODAL_ADD) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.show = true;
        newState.mode = 'add';
        newState.param.param_keyid = '';
        newState.param.param_name = '';
        newState.param.param_desc = '';
        return newState;
    }

    if(action.type === constants.PARAM_MODAL_EDIT){
        const newState = JSON.parse(JSON.stringify(state));
        //更新编辑的设备
        if(action.obj){
            newState.show = true;
            newState.mode = 'edit';
            newState.param.param_keyid = action.obj.param_keyid;
            newState.param.param_name = action.obj.param_name;
            newState.param.param_desc = action.obj.param_desc;
        }        
        return newState;
    }

    if (action.type === constants.PARAM_MODAL_HIDE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.show = false;
        return newState;
    }

    return state;
}