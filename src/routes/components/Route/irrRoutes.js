import AgentList from '../../common/AgentList';
import UserList from '../../common/UserList';
import UserInfo from '../../common/UserInfo';
import CollectList from '../../common/CollectList';
import MeterList from '../../common/MeterList';
import Record from '../../syspre/DataManage/Record';
import Statistics from '../../syspre/DataManage/Statistics';
import MeterInfo from '../../common/MeterInfo';
import CollectInfo from '../../common/CollectInfo';
import SuperAccount from '../../common/SuperAccount';
import AgentAccount from '../../common/AgentAccount';
import GroupManage from '../../common/GroupManage';
import AgentIncome from '../../common/IncomeList/AgentIncome';
import SuperIncome from '../../common/IncomeList/SuperIncome';
import SuperAccountInfo from '../../common/SuperAccountInfo';
import HomePage from '../../common/HomePage';
import ParamTemplate from '../../common/Param/Template';
import ParamSet from '../../common/Param/ParamSet';
import BookKeep from '../../common/BookKeep';
import PropertyFee from '../../common/BookKeep/PropertyFee';


const irrRoutes = [
    {
        path: '/sysirr/home',
        component: HomePage,
    },
    {
        path: '/sysirr/home/agentlist',
        component: AgentList,
    },

    {
        path: '/sysirr/home/userlist',
        component: UserList,
    },
    {
        path: '/sysirr/home/userinfo/:id',
        component: UserInfo,
    },
    {
        path: '/sysirr/home/collectinfo/:id',
        component: CollectInfo,
    },
    {
        path: '/sysirr/home/collectlist',
        component: CollectList,
    },
    {
        path: '/sysirr/home/agent/income',
        component: AgentIncome,
    },
    {
        path: '/sysirr/home/super/income',
        component: SuperIncome,
    },
    {
        path: '/sysirr/home/meterlist',
        component: MeterList,
    },
    {
        path: '/sysirr/home/meterinfo/:id',
        component: MeterInfo,
    },
    {
        path: '/sysirr/home/data/record',
        component: Record,
    },
    {
        path: '/sysirr/home/data/statistics',
        component: Statistics,
    },
    {
        path: '/sysirr/home/super/account',
        component: SuperAccount,
    },
    {
        path: '/sysirr/home/agentlist/:id',
        component: SuperAccountInfo,
    },
    {
        path: '/sysirr/home/agent/account',
        component: AgentAccount,
    },
    {
        path: '/sysirr/home/group/manage',
        component: GroupManage,
    },
    {
        path: '/sysirr/home/param/template',
        component: ParamTemplate,
    },
    {
        path: '/sysirr/home/param/template/:id',
        component: ParamSet,
    },
    {
        path: '/sysirr/home/bookkeep',
        component: BookKeep,
    },
    {
        path: '/sysirr/home/bookkeep/:id',
        component: PropertyFee,
    }
];
export default irrRoutes;