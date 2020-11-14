import * as constants from './constants';

export const getAddAction = () => ({
    type: constants.COLLECT_MODAL_ADD,
});
export const getEditAction = (obj) => ({
    type: constants.COLLECT_MODAL_EDIT,
    obj: obj,
});
export const getHideAction = () => ({
    type: constants.COLLECT_MODAL_HIDE
});