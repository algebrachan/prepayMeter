import * as collectTableCtors from '../CollectTable/store/actionCreators';
import {searchGateways} from '../../../../utils/api';
export const getDoSearchCollectAction = (type, value, pageindex, pagesize) =>(
    (dispatch) =>{
        searchGateways(type, value, pageindex, pagesize,
        (res)=>{
            if (res.data && (res.data.Status === 0 || res.data.Status === 1)) {
                let list = res.data.Status === 0 ? res.data.Data.Objs : [];
                let total = res.data.Status === 0 ? res.data.Data.Total : 0;
                //改变数据列表
                dispatch(collectTableCtors.getUpdateAction(list, total));
            }
            else{
                dispatch(collectTableCtors.getLoadingAction(false));
            }
        },
        ()=>{
            dispatch(collectTableCtors.getLoadingAction(false));
        });

    }
)