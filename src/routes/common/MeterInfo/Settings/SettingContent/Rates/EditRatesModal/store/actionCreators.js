import * as constants from './constants';


export const getEditAction = (obj) => ({
    type: constants.RATES_MODAL_EDIT,
    obj,
});

export const getHideAction = () => ({
    type: constants.RATES_MODAL_HIDE
});