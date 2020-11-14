import * as constants from './constants';

export const getChangeTypeAction = (value) =>
    ({
        type: constants.METER_HEADER_CHANGE_TYPE,
        value
    });

export const getChangeValueAction = (value) =>
    ({
        type: constants.METER_HEADER_CHANGE_VALUE,
        value
    });

export const getChangeGroupidAction = (value) =>
    ({
        type: constants.METER_HEADER_CHANGE_GROUPID,
        value
    });

export const getChangeOlsttAction = (value) =>
    ({
        type: constants.METER_HEADER_CHANGE_OLSTT,
        value
    });

export const getChangeAdminAction = (value) =>
    ({
        type: constants.METER_HEADER_CHANGE_ADMID,
        value
    });

export const getChangeStateAction = (value) =>
    ({
        type: constants.METER_HEADER_CHANGE_STATE,
        value
    });
export const getChangeEnableAction = (value) =>
    ({
        type: constants.METER_HEADER_CHANGE_ENABLE,
        value
    });

export const getChangePaginationAction = (pageindex, pagesize) =>
    ({
        type: constants.METER_HEADER_CHANGE_PAGINATION,
        pageindex: pageindex,
        pagesize: pagesize,
    });