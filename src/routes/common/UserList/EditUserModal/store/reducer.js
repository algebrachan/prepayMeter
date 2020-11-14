import * as constants from './constants';
const defaultState ={
    show: false,
    mode: '',
    user:
    {
        user_keyid:'',
        user_name:'',
        user_phone:'',
        user_agentid:'',
    },
}
export default (state = defaultState,action) =>{
    if(action.type === constants.USER_MODAL_ADD){
        const newState = JSON.parse(JSON.stringify(state));
        newState.show = true;
        newState.mode = 'add';
        newState.user.user_keyid = '';
        newState.user.user_name = '';
        newState.user.user_phone = '';
        newState.user.user_agentid = '';

        return newState;
    }

    if(action.type === constants.USER_MODAL_EDIT){
        const newState =JSON.parse(JSON.stringify(state));

        if(action.obj){
        newState.show = true;
        newState.mode = 'edit';
        newState.user.user_keyid = action.obj.user_keyid;
        newState.user.user_name = action.obj.user_name;
        newState.user.user_phone = action.obj.user_phone;
        newState.user.user_agentid = action.obj.user_agentid;
        }

        return newState;
    }
    if(action.type === constants.USER_MODAL_HIDE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.show = false;
        return newState;
    }

    return state;
}