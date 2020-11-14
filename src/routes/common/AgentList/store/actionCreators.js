import * as agentTableCtors from '../AgentTable/store/actionCreators';
import { searchAgents } from '../../../../utils/api';

export const getDoSearchAgentAction = (type, value, pageindex, pagesize) => (
    (dispatch) => {
        searchAgents(type, value, pageindex, pagesize,
            (res) => {
                if (res.data && (res.data.Status === 0 || res.data.Status === 1)) {
                    let list = res.data.Status === 0 ? res.data.Data.Objs : [];
                    let total = res.data.Status === 0 ? res.data.Data.Total : 0;
                    //改变数据列表
                    dispatch(agentTableCtors.getUpdateAction(list, total));
                }
                else {
                    dispatch(agentTableCtors.getLoadingAction(false));
                }
            },
            () => {
                dispatch(agentTableCtors.getLoadingAction(false));
            });

    }

);