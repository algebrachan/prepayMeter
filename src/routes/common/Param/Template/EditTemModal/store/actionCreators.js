import * as constants from './constants';

export const getAddAction = () => ({
    type: constants.PARAM_MODAL_ADD,
});
export const getEditAction = (obj) => ({
    type: constants.PARAM_MODAL_EDIT,
    obj: obj,
});
export const getHideAction = () => ({
    type: constants.PARAM_MODAL_HIDE
});