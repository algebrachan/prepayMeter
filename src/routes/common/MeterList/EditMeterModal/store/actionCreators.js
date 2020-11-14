import * as constants from './constants';

export const getAddAction = () => ({
    type: constants.METER_MODAL_ADD,
});
export const getEditAction = (obj) => ({
    type: constants.METER_MODAL_EDIT,
    obj: obj,
});
export const getHideAction = () => ({
    type: constants.METER_MODAL_HIDE
});