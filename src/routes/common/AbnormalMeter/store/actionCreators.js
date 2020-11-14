import * as constants from './constants';
/**
 * 更新设备列表
 */
export const getUpdateAction = (value, total) => ({
    type: constants.ABNOR_METER_TABLE_UPDATE,
    list: value,
    total: total
});

/**
 * 表格数据加载中
 */
export const getLoadingAction = (value) => ({
    type: constants.ABNOR_METER_TABLE_LOADING,
    value
});
/**
 * 
 * 
 */
export const getChangePaginationAction = (pageindex, pagesize) =>
    ({
        type: constants.ABNOR_METER_CHANGE_PAGINATION,
        pageindex: pageindex,
        pagesize: pagesize,
    });

export const getChangeTypeAction = (value) =>
    ({
        type: constants.ABNOR_METER_CHANGE_TYPE,
        value
    });