import * as userTableCtors from '../UserTable/store/actionCreators';
import {searchCustomers} from '../../../../utils/api';

export const getDoSearchUserAction = (type, value, pageindex, pagesize) =>(

    (dispatch) =>{
        searchCustomers(type, value, pageindex, pagesize,
            (res)=>{
                if (res.data && (res.data.Status === 0 || res.data.Status === 1)) {
                    let list = res.data.Status === 0 ? res.data.Data.Objs : [];
                    let total = res.data.Status === 0 ? res.data.Data.Total : 0;
                    //改变数据列表
                    dispatch(userTableCtors.getUpdateAction(list, total));
                }
                else{
                    dispatch(userTableCtors.getLoadingAction(false));
                }
            },
            ()=>{
                dispatch(userTableCtors.getLoadingAction(false));
            });
    }
)