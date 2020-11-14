import * as constants from './constants';

export const getAddAction = () => ({
    type: constants.BOOK_PROFEE_MODAL_ADD,
});
export const getEditAction = (obj) => ({
    type: constants.BOOK_PROFEE_MODAL_EDIT,
    obj: obj,
});
export const getHideAction = () => ({
    type: constants.BOOK_PROFEE_MODAL_HIDE
});