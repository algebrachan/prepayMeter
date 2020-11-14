import * as constants from './constants';
/**
 * 更新
 */
export const getUpdateAction = (list, total) => {
    return({
        type: constants.GROUP_TABLE_UPDATE,
        list: list,
        total: total
    });
}
/**
 * 表格数据加载中
 */
export const getLoadingAction = (value) => ({
    type: constants.GROUP_TABLE_LOADING,
    value
});