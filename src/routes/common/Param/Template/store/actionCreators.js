import * as paramTableCtors from '../TemTable/store/actionCreators';
import { searchMeterParamTmp } from '../../../../../utils/api';
export const getDoSearchParamAction = (value, pageindex, pagesize) => (
    (dispatch) => {
        searchMeterParamTmp(value, pageindex, pagesize,
            (res) => {
                if (res.data && (res.data.Status === 0 || res.data.Status === 1)) {
                    let list = res.data.Status === 0 ? res.data.Data.Objs : [];
                    let total = res.data.Status === 0 ? res.data.Data.Total : 0;
                    //改变数据列表
                    dispatch(paramTableCtors.getUpdateAction(list, total));
                }
                else {
                    dispatch(paramTableCtors.getLoadingAction(false));
                }
            },
            () => {
                dispatch(paramTableCtors.getLoadingAction(false));
            });
    }
);