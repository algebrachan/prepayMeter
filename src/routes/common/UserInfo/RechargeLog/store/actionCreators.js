import * as constants from './constants';
/**
 * 更新列表
 */
export const getUpdateAction = (value, total) => ({
    type: constants.RECHARGELOG_TABLE_UPDATE,
    list: value,
    total: total
});

/**
 * 表格数据加载中
 */
export const getLoadingAction = (value) => ({
    type: constants.RECHARGELOG_TABLE_LOADING,
    value
});

export const getChangePaginationAction = (pageindex, pagesize) =>
    ({
        type: constants.RECHARGELOG_CHANGE_PAGINATION,
        pageindex: pageindex,
        pagesize: pagesize,
});