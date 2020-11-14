import * as constants from './constants';
/**
 * 更新设备列表
 */
export const getUpdateAction = (value,total) =>({
    type: constants.SWITCH_TABLE_UPDATE,
    list: value,
    total: total,
});

/**
 * 表格数据加载中
 */
export const getLoadingAction = (value) =>({
    type: constants.SWITCH_TABLE_LOADING,
    value
});