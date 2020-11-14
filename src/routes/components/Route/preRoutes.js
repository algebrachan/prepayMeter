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
import SearchUser from '../../common/SearchUser';
import AddParamTemp from '../../common/Param/AddParamTemp';
import LookParamTemp from '../../common/Param/LookParamTemp';
import ElecStatistic from '../../common/Statistic/ElectStatistic';
import FlowStatistic from '../../common/Statistic/FlowStatistic';
import Wx from '../../common/AgentAccount/PayAccount/Wx';
import Ali from '../../common/AgentAccount/PayAccount/Ali';
import Msg from '../../common/AgentAccount/PayAccount/Msg';
import Sms from '../../common/AgentAccount/PayAccount/Sms';
import Meter from '../../common/Meter';
import AdminList from '../../common/AdminList';
import AbnormalMeter from '../../common/AbnormalMeter';

const preRoutes = [
  {
    path: '/syspre/home',
    component: HomePage,
  },
  {
    path: '/syspre/home/agentlist',
    component: AgentList,
  },

  {
    path: '/syspre/home/userlist',
    component: UserList,
  },
  {
    path: '/syspre/home/userinfo/:id',
    component: UserInfo,
  },
  {
    path: '/syspre/home/collectinfo/:id',
    component: CollectInfo,
  },
  {
    path: '/syspre/home/collectlist',
    component: CollectList,
  },
  {
    path: '/syspre/home/agent/income',
    component: AgentIncome,
  },
  {
    path: '/syspre/home/super/income',
    component: SuperIncome,
  },
  {
    path: '/syspre/home/meterlist',
    component: MeterList,
  },
  {
    path: '/syspre/home/meterinfo/:id',
    component: MeterInfo,
  },
  {
    path: '/syspre/home/abnormaldev',
    component: AbnormalMeter,
  },
  {
    path: '/syspre/home/data/record',
    component: Record,
  },
  {
    path: '/syspre/home/data/statistics',
    component: Statistics,
  },
  {
    path: '/syspre/home/super/account',
    component: SuperAccount,
  },
  {
    path: '/syspre/home/agentlist/:id',
    component: SuperAccountInfo,
  },
  {
    path: '/syspre/home/agent/account',
    component: AgentAccount,
  },
  {
    path: '/syspre/home/group/manage',
    component: GroupManage,
  },
  {
    path: '/syspre/home/param/template',
    component: ParamTemplate,
  },
  {
    path: '/syspre/home/param/template/:id',
    component: ParamSet,
  },
  {
    path: '/syspre/home/param/add',
    component: AddParamTemp
  },
  {
    path: '/syspre/home/param/look/:id',
    component: LookParamTemp
  },
  {
    path: '/syspre/home/bookkeep',
    component: BookKeep,
  },
  {
    path: '/syspre/home/bookkeep/:id',
    component: PropertyFee,
  },
  {
    path: '/syspre/home/user/search',
    component: SearchUser,
  },
  {
    path: '/syspre/home/statistic/elect',
    component: ElecStatistic,
  },
  {
    path: '/syspre/home/statistic/flow',
    component: FlowStatistic,
  },
  {
    path: '/syspre/home/agent/wx',
    component: Wx,
  },
  {
    path: '/syspre/home/agent/ali',
    component: Ali,
  },
  {
    path: '/syspre/home/agent/msg',
    component: Sms,
  },
  {
    path: '/syspre/home/meter/submeter',
    component: Meter,
  },
  {
    path: '/syspre/home/adminlist',
    component: AdminList,
  },
];
export default preRoutes;