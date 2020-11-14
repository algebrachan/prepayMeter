import * as constants from './constants';

export const getEditAction = (obj) => ({
    type: constants.EXPIRE_TIME_MODAL_EDIT,
    obj: obj,
});
export const getHideAction = () => ({
    type: constants.EXPIRE_TIME_MODAL_HIDE
});