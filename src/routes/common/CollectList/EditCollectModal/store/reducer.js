import * as constants from './constants';
const defaultState ={
    show: false,
    mode: '',
    collect:
    {
        collect_keyid:'',
        collect_name:'',
        collect_locat:'',
        collect_group:'',
        collect_dirgp:'',
        collect_agent:'',
        collect_devtp:'',

    },
}
export default (state = defaultState,action) =>{
    if(action.type === constants.COLLECT_MODAL_ADD){
        const newState = JSON.parse(JSON.stringify(state));
        newState.show = true;
        newState.mode = 'add';
        newState.collect.collect_keyid='';
        newState.collect.collect_name='';
        newState.collect.collect_agent='';
        newState.collect.collect_devtp='';

        return newState;
    }

    if(action.type === constants.COLLECT_MODAL_EDIT){
        const newState =JSON.parse(JSON.stringify(state));

        if(action.obj){
        newState.show = true;
        newState.mode = 'edit';
        newState.collect.collect_keyid=action.obj.collect_keyid;
        newState.collect.collect_name=action.obj.collect_name;
        newState.collect.collect_agent=action.obj.collect_agent;
        newState.collect.collect_devtp=action.obj.collect_devtp;
        }

        return newState;
    }
    if(action.type === constants.COLLECT_MODAL_HIDE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.show = false;
        return newState;
    }

    return state;
}