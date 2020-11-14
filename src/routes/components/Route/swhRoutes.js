import AgentList from '../../common/AgentList';
import UserList from '../../common/UserList';
import UserInfo from '../../common/UserInfo';
import Settings from '../../sysswh/Settings';
import SuperAccount from '../../common/SuperAccount';
import AgentAccount from '../../common/AgentAccount';
import SwitchMap from '../../sysswh/SwitchMap';
import SwitchList from '../../sysswh/SwitchList';
import SuperAccountInfo from '../../common/SuperAccountInfo';
import Welcome from '../../common/HomePage/Welcome';

const swhRoutes = [
    {
        path: '/sysswh/home',
        component: Welcome,
    },
    {
        path: '/sysswh/home/agentlist',
        component: AgentList,
    },
    {
        path: '/sysswh/home/userlist',
        component: UserList,
    },
    {
        path: '/sysswh/home/userinfo/:id',
        component: UserInfo,
    },
    {
        path: '/sysswh/home/settings',
        component: Settings,
    },
    {
        path: '/sysswh/home/super/account',
        component: SuperAccount,
    },
    {
        path: '/sysswh/home/super/account/:id',
        component: SuperAccountInfo,
    },
    {
        path: '/sysswh/home/agent/account',
        component: AgentAccount,
    },
    {
        path: '/sysswh/home/switch/map',
        component: SwitchMap,
    },
    {
        path: '/sysswh/home/switch/list',
        component: SwitchList,
    },
];
export default swhRoutes;