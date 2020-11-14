import * as constants from './constants';
/**
 * 更新列表
 */
export const getUpdateAction = (value, total, sticeng) => ({
    type: constants.ELECTSTATISTIC_TABLE_UPDATE,
    list: value,
    total: total,
    sticeng: sticeng,
});

/**
 * 表格数据加载中
 */
export const getLoadingAction = (value) => ({
    type: constants.ELECTSTATISTIC_TABLE_LOADING,
    value
});

export const getChangePaginationAction = (pageindex, pagesize) =>
    ({
        type: constants.ELECTSTATISTIC_CHANGE_PAGINATION,
        pageindex: pageindex,
        pagesize: pagesize,
    });
