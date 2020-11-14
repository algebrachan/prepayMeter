import * as constants from './constants';
/**
 * 更新列表
 */
export const getUpdateAction = (value, total) => ({
    type: constants.FLOWSTATISTIC_TABLE_UPDATE,
    list: value,
    total: total
});

/**
 * 表格数据加载中
 */
export const getLoadingAction = (value) => ({
    type: constants.FLOWSTATISTIC_TABLE_LOADING,
    value
});

export const getChangePaginationAction = (pageindex, pagesize) =>
    ({
        type: constants.FLOWSTATISTIC_CHANGE_PAGINATION,
        pageindex: pageindex,
        pagesize: pagesize,
    });

export const getChangeTimeAction = (start, end) => ({
    type: constants.FLOWSTATISTIC_CHANGE_TIME,
    start: start,
    end: end,
});
export const getChangePwyAction = (pwy) => ({
    type: constants.FLOWSTATISTIC_CHANGE_PWY,
    pwy: pwy
});

export const getChangeDirAction = (dir) => ({
    type: constants.FLOWSTATISTIC_CHANGE_DIR,
    dir: dir
});

export const getChangeTypeAction = (value) => ({
    type: constants.FLOWSTATISTIC_CHANGE_TYPE,
    value
});

export const getChangeValueAction = (value) => ({
    type: constants.FLOWSTATISTIC_CHANGE_VALUE,
    value
});