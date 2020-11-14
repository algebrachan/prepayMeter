import * as constants from './constants';

export const getAddAction = () => ({
    type: constants.ADMIN_MODAL_ADD,
});
export const getEditAction = (obj) => ({
    type: constants.ADMIN_MODAL_EDIT,
    obj: obj,
});
export const getHideAction = () => ({
    type: constants.ADMIN_MODAL_HIDE
});