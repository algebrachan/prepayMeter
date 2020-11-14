import * as constants from './constants';
/**
 * 编辑参数模板
 */
export const addParamAction = () => ({
    type: constants.PARAM_TEMP_ADD ,
});
export const editParamAction = (value) => ({
    type: constants.PARAM_TEMP_EDIT,
    list: value,
});
export const editRateAction = (value) => ({
    type: constants.PARAM_TEMP_EDIT_RATE,
    rate: value,
});
export const editNormalAction = (value) => ({
    type: constants.PARAM_TEMP_EDIT_NORMAL,
    normal: value,
});
export const editTblAction = (value) => ({
    type: constants.PARAM_TEMP_EDIT_TBL,
    tbl: value,
});
export const editSpsAction = (value) => ({
    type: constants.PARAM_TEMP_EDIT_SPS,
    sps: value,
});
export const editRatioAction = (value) => ({
    type: constants.PARAM_TEMP_EDIT_RATIO,
    ratio: value,
});
export const editTmctlAction = (value, index) => ({
    type: constants.PARAM_TEMP_EDIT_TMCTL,
    tmctl: value,
    index: index,
});
/**
 * 设置disabled属性
 */
export const setDisabledAction = (value) => ({
    type: constants.PARAM_TEMP_DISABLED,
    value,
});
