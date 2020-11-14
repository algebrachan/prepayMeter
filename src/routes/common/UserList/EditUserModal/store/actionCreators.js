import * as constants from './constants';

export const getAddAction = () => ({
    type: constants.USER_MODAL_ADD,
});
export const getEditAction = (obj) => ({
    type: constants.USER_MODAL_EDIT,
    obj: obj,
});
export const getHideAction = () => ({
    type: constants.USER_MODAL_HIDE
});