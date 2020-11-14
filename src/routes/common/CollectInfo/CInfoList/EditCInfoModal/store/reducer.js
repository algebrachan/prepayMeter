import * as constants from './constants';
const defaultState = {
    show: false,
    mode: '',
    agent:
    {
        agent_keyid:'',
        agent_name:'',
        agent_company:'',
        agent_owner:'',
        agent_phone:'',
        agent_locat:'',
    }
}
export default (state = defaultState, action) => {
    if (action.type === constants.AGENT_MODAL_ADD) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.show = true;
        newState.mode = 'add';
        newState.agent.agent_keyid = '';
        newState.agent.agent_name = '';
        newState.agent.agent_company = '';
        newState.agent.agent_owner = '';
        newState.agent.agent_phone = '';
        newState.agent.agent_locat = '';
        
        return newState;
    }

    if(action.type === constants.AGENT_MODAL_EDIT){
        const newState = JSON.parse(JSON.stringify(state));
        //更新编辑的设备
        if(action.obj){
            newState.show = true;
            newState.mode = 'edit';
            newState.agent.agent_keyid = action.obj.agent_keyid;
            newState.agent.agent_name = action.obj.agent_name;
            newState.agent.agent_company = action.obj.agent_company;
            newState.agent.agent_owner = action.obj.agent_owner;
            newState.agent.agent_phone = action.obj.agent_phone;
            newState.agent.agent_locat = action.obj.agent_locat;
        }
        
        return newState;
    }

    if (action.type === constants.AGENT_MODAL_HIDE) {

        const newState = JSON.parse(JSON.stringify(state));
        newState.show = false;
        return newState;
    }

    return state;
}