import * as constants from './constants';

export const getAddAction = () => ({
    type: constants.GROUP_MODAL_ADD,
});
export const getEditAction = (obj) => ({
    type: constants.GROUP_MODAL_EDIT,
    obj: obj,
});
export const getHideAction = () => ({
    type: constants.GROUP_MODAL_HIDE
});