import * as constants from './constants';

export const getAddAction = () => ({
    type: constants.SWITCH_MODAL_ADD,
});
export const getEditAction = (obj) => ({
    type: constants.SWITCH_MODAL_EDIT,
    obj: obj,
});
export const getHideAction = () => ({
    type: constants.SWITCH_MODAL_HIDE
});