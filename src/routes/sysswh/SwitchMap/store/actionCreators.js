import * as constants from './constants';
import { searchSwitchsNeerBy } from '../../../../utils/api';
/**
 * 地图更新设备列表
 */
export const getUpdateAction = (value) => ({
    type: constants.SWITCH_MAP_UPDATE,
    value
});

/**
 * 地图数据加载中
 */
export const getLoadingAction = (value) => ({
    type: constants.SWITCH_MAP_LOADING,
    value
});

/**
 * 搜索附近设备
 * @param {} param 
 */
export const getDoSearchDevsNearByAction = (param) => (
    (dispatch) => {
        searchSwitchsNeerBy(param,
            (res) => {
                if (res.data && res.data.Status === 0) {
                    //改变数据列表
                    dispatch(getUpdateAction(res.data.Data));
                }
                else {
                    dispatch(getLoadingAction(false));
                }
            },
            () => {
                dispatch(getLoadingAction(false));
            });
    }
);