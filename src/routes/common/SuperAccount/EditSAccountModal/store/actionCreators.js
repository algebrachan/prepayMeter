import * as constants from './constants';

export const getAddAction = () => ({
    type: constants.SUPER_ACCOUNT_MODAL_ADD,
});
export const getEditAction = (obj) => ({
    type: constants.SUPER_ACCOUNT_MODAL_EDIT,
    obj: obj,
});
export const getHideAction = () => ({
    type: constants.SUPER_ACCOUNT_MODAL_HIDE
});