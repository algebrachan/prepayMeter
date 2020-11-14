import * as adminTableCtors from '../SuperAccountTable/store/actionCreators';
import { searchAdmins } from '../../../../utils/api';

export const getDoSearchAgentAction = (type, value, admtp, pageindex, pagesize) => (
    (dispatch) => {
        searchAdmins(type, value, admtp, pageindex, pagesize,
            (res) => {
                if (res.data && (res.data.Status === 0 || res.data.Status === 1)) {
                    let list = res.data.Status === 0 ? res.data.Data.Objs : [];
                    let total = res.data.Status === 0 ? res.data.Data.Total : 0;
                    //改变数据列表
                    dispatch(adminTableCtors.getUpdateAction(list, total));
                }
                else {
                    dispatch(adminTableCtors.getLoadingAction(false));
                }
            },
            () => {
                dispatch(adminTableCtors.getLoadingAction(false));
            });

    }

);