import * as constants from './constants';
/**
 * 更新设备列表
 */
export const getUpdateAction = (value, total) => ({
    type: constants.USER_DEVS_TABLE_UPDATE,
    list: value,
    total: total
});

/**
 * 表格数据加载中
 */
export const getLoadingAction = (value) => ({
    type: constants.USER_DEVS_TABLE_LOADING,
    value
});
/**
 * 
 * 
 */
export const getChangePaginationAction = (pageindex, pagesize) =>
    ({
        type: constants.USER_DEVS_CHANGE_PAGINATION,
        pageindex: pageindex,
        pagesize: pagesize,
    });

export const getChangeTypeAction = (value) =>
    ({
        type: constants.USER_DEVS_CHANGE_TYPE,
        value
    });