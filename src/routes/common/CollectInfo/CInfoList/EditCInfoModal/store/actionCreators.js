import * as constants from './constants';

export const getAddAction = () => ({
    type: constants.AGENT_MODAL_ADD,
});
export const getEditAction = (obj) => ({
    type: constants.AGENT_MODAL_EDIT,
    obj: obj,
});
export const getHideAction = () => ({
    type: constants.AGENT_MODAL_HIDE
});