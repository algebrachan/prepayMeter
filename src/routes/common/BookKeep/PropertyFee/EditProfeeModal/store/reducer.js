import * as constants from './constants';
const defaultState = {
    show: false,
    mode: '',
    profee:
    {
        profee_keyid: '',//条目ID
        profee_owner: '',//主体
        profee_name: '',//联系人
        profee_phone: '',//联系电话
        profee_prop: '',//关联物业
        profee_enable: false,
    }
}
export default (state = defaultState, action) => {
    if (action.type === constants.BOOK_PROFEE_MODAL_ADD) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.show = true;
        newState.mode = 'add';
        newState.profee.profee_keyid = '';
        newState.profee.profee_owner = '';
        newState.profee.profee_name = '';
        newState.profee.profee_phone = '';
        newState.profee.profee_prop = '';
        newState.profee.profee_enable = false;
        return newState;
    }

    if (action.type === constants.BOOK_PROFEE_MODAL_EDIT) {
        const newState = JSON.parse(JSON.stringify(state));
        //更新编辑的设备
        if (action.obj) {
            newState.show = true;
            newState.mode = 'edit';
            newState.profee.profee_keyid = action.obj.profee_keyid;
            newState.profee.profee_owner = action.obj.profee_owner;
            newState.profee.profee_name = action.obj.profee_name;
            newState.profee.profee_phone = action.obj.profee_phone;
            newState.profee.profee_prop = action.obj.profee_prop;
            newState.profee.profee_enable = action.obj.profee_enable;
        }

        return newState;
    }

    if (action.type === constants.BOOK_PROFEE_MODAL_HIDE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.show = false;
        return newState;
    }

    return state;
}