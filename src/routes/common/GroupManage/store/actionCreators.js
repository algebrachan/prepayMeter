import * as groupTableCtors from '../GMTable/store/actionCreators';
import {searchGroups} from '../../../../utils/api';

export const getDoSearchGroupAction = (value, pageindex, pagesize) =>(
    (dispatch) => {
        searchGroups(value, pageindex, pagesize,
            (res)=>{
                if (res.data && (res.data.Status === 0 || res.data.Status === 1)) {
                    let list = res.data.Status === 0 ? res.data.Data.Objs : [];
                    let total = res.data.Status === 0 ? res.data.Data.Total : 0;
                    //改变数据列表
                    dispatch(groupTableCtors.getUpdateAction(list, total));
                }
                else{
                    dispatch(groupTableCtors.getLoadingAction(false));
                }
            },
            ()=>{
                dispatch(groupTableCtors.getLoadingAction(false));
            });
    }

);