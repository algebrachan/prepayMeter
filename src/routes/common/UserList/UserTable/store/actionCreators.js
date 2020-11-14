import * as constants from './constants';
/**
 * 更新设备列表
 */
export const getUpdateAction = (value,total) =>({
    type: constants.USER_TABLE_UPDATE,
    list: value,
    total: total,
});

/**
 * 表格数据加载中
 */
export const getLoadingAction = (value) =>({
    type: constants.USER_TABLE_LOADING,
    value
});