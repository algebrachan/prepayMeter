import * as meterTableCtors from '../SwitchTable/store/actionCreators';
import {searchSwitchs} from '../../../../utils/api';
export const getDoSearchMeterAction = (type, value, pageindex, pagesize) =>(
    (dispatch) =>{
        searchSwitchs(type, value, pageindex, pagesize,
        (res)=>{
            if (res.data && (res.data.Status === 0 || res.data.Status === 1)) {
                let list = res.data.Status === 0 ? res.data.Data.Objs : [];
                let total = res.data.Status === 0 ? res.data.Data.Total : 0;
                //改变数据列表
                dispatch(meterTableCtors.getUpdateAction(list, total));
            }
            else{
                dispatch(meterTableCtors.getLoadingAction(false));
            }
        },
        ()=>{
            dispatch(meterTableCtors.getLoadingAction(false));
        });

    }
)