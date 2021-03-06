import * as constants from './constants';

export const getChangeTypeAction = (value) =>
    ({
        type: constants.SWITCH_HEADER_CHANGE_TYPE,
        value
    });

export const getChangeValueAction = (value) =>
    ({
        type: constants.SWITCH_HEADER_CHANGE_VALUE,
        value
    });

export const getChangeStateAction = (value) =>
    ({
        type: constants.SWITCH_HEADER_CHANGE_STATE,
        value
    });
export const getChangeEnableAction = (value) =>
    ({
        type: constants.SWITCH_HEADER_CHANGE_ENABLE,
        value
    });

export const getChangePaginationAction = (pageindex, pagesize) =>
    ({
        type: constants.SWITCH_HEADER_CHANGE_PAGINATION,
        pageindex: pageindex,
        pagesize: pagesize,
    });