import * as constants from './constants';
/**
 * 更新列表
 */
export const getUpdateAction = (value, total) => ({
    type: constants.USER_RENTLOG_TABLE_UPDATE,
    list: value,
    total: total
});

/**
 * 表格数据加载中
 */
export const getLoadingAction = (value) => ({
    type: constants.USER_RENTLOG_TABLE_LOADING,
    value
});
/**
 * 
 * 
 */
export const getChangePaginationAction = (pageindex, pagesize) =>
    ({
        type: constants.USER_RENTLOG_CHANGE_PAGINATION,
        pageindex: pageindex,
        pagesize: pagesize,
    });