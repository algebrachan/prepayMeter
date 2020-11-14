import * as constants from './constants';
/**
 * 更新设备列表
 */
export const getUpdateAction = (value, total) => ({
    type: constants.METER_TABLE_UPDATE,
    list: value,
    total: total,
});

/**
 * 表格数据加载中
 */
export const getLoadingAction = (value) => ({
    type: constants.METER_TABLE_LOADING,
    value
});
/**
 * 选择表格的row key
 */
export const selectRowKeys = (value) => ({
    type: constants.METER_TABLE_SELECT_ROWS,
    selectRows: value,
});
/**
 * 批量操作
 */
export const batchOperation = (value) => ({
    type: constants.METER_TABLE_BATCH_OPERATION,
    value
});