
import * as tableCtors from '../ProfeeTable/store/actionCreators';
import { searchBookItems } from '../../../../../utils/api';

export const getDoSearchCinfoAction = (type, value, bookid,expire,pageindex, pagesize) => (
    (dispatch) => {
        searchBookItems(type, value, bookid,expire,pageindex, pagesize,
            (res) => {
                if (res.data && (res.data.Status === 0 || res.data.Status === 1)) {
                    let list = res.data.Status === 0 ? res.data.Data.Objs : [];
                    let total = res.data.Status === 0 ? res.data.Data.Total : 0;
                    //改变数据列表
                    dispatch(tableCtors.getUpdateAction(list, total));
                }
                else {
                    dispatch(tableCtors.getLoadingAction(false));
                }
            },
            () => {
                dispatch(tableCtors.getLoadingAction(false));
            });
    }
);