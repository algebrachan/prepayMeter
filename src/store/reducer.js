import { combineReducers } from 'redux';
import agentEditReducer from '../routes/common/AgentList/EditAgentModal/store/reducer';
import agentTableReducer from '../routes/common/AgentList/AgentTable/store/reducer';
import agentHeaderReducer from '../routes/common/AgentList/AgentHeader/store/reducer';
import adminTableReducer from '../routes/common/AdminList/AdminTable/store/reducer';
import adminHeaderReducer from '../routes/common/AdminList/AdminHeader/store/reducer';
import adminEditReducer from '../routes/common/AdminList/EditAdminModal/store/reducer';
import groupEditReducer from '../routes/common/GroupManage/EditGmModal/store/reducer';
import groupHeaderReducer from '../routes/common/GroupManage/GMHeader/store/reducer';
import groupTableReducer from '../routes/common/GroupManage/GMTable/store/reducer';
import userTableReducer from '../routes/common/UserList/UserTable/store/reducer';
import userHeaderReducer from '../routes/common/UserList/UserHeader/store/reducer';
import userEditReducer from '../routes/common/UserList/EditUserModal/store/reducer';
import collectEditReducer from '../routes/common/CollectList/EditCollectModal/store/reducer';
import collectHeaderReducer from '../routes/common/CollectList/CollectHeader/store/reducer';
import collectTableReducer from '../routes/common/CollectList/CollectTable/store/reducer';
import collectImportReducer from '../routes/common/CollectList/ImportCollectsModal/store/reducer';
import rechargeLogReducer from '../routes/common/UserInfo/RechargeLog/store/reducer';
import flowStatisticReducer from '../routes/common/Statistic/FlowStatistic/store/reducer';
import electStatisticReducer from '../routes/common/Statistic/ElectStatistic/store/reducer';
import collectInfoHeaderReducer from '../routes/common/CollectInfo/CInfoList/SubHeader/store/reducer';
import collectInfoTableReducer from '../routes/common/CollectInfo/CInfoList/SubTable/store/reducer';
import collectInfoEditReducer from '../routes/common/CollectInfo/CInfoList/EditCInfoModal/store/reducer';
import meterEditReducer from '../routes/common/MeterList/EditMeterModal/store/reducer';
import meterImportReducer from '../routes/common/MeterList/ImportMetersModal/store/reducer';
import meterHeaderRedcuer from '../routes/common/MeterList/MeterHeader/store/reducer';
import meterTableReducer from '../routes/common/MeterList/MeterTable/store/reducer';
import superAccountTableReducer from '../routes/common/SuperAccount/SuperAccountTable/store/reducer';
import superAccountHeaderReducer from '../routes/common/SuperAccount/SuperAccountHeader/store/reducer';
import superAccountEditReducer from '../routes/common/SuperAccount/EditSAccountModal/store/reducer';
import userDevsReducer from '../routes/common/UserInfo/UserDevs/store/reducer';
import rentLogReducer from '../routes/common/UserInfo/RentLog/store/reducer';
import switchMapReducer from '../routes/sysswh/SwitchMap/store/reducer';
import switchTableReducer from '../routes/sysswh/SwitchList/SwitchTable/store/reducer';
import switchHeaderReducer from '../routes/sysswh/SwitchList/SwitchHeader/store/reducer';
import switchEditReducer from '../routes/sysswh/SwitchList/EditSwitchModal/store/reducer';
import settingRateReducer from '../routes/common/MeterInfo/Settings/SettingContent/Rates/EditRatesModal/store/reducer';
import paramEditReducer from '../routes/common/Param/Template/EditTemModal/store/reducer';
import paramHeaderReducer from '../routes/common/Param/Template/TemHeader/store/reducer';
import paramTableReducer from '../routes/common/Param/Template/TemTable/store/reducer';
import bookProfeeHeaderReducer from '../routes/common/BookKeep/PropertyFee/ProfeeHeader/store/reducer';
import bookProfeeTableReducer from '../routes/common/BookKeep/PropertyFee/ProfeeTable/store/reducer';
import bookProfeeEditReducer from '../routes/common/BookKeep/PropertyFee/EditProfeeModal/store/reducer';
import bookProfeeExpireReducer from '../routes/common/BookKeep/PropertyFee/EditTimeModal/store/reducer';
import paramTempReducer from '../routes/common/Param/ParamTemp/store/reducer';
import meterDevReducer from '../routes/common/Meter/store/reducer';
import abnormalDevReducer from '../routes/common/AbnormalMeter/store/reducer';



export default combineReducers({
    agent_table: agentTableReducer,
    agent_header: agentHeaderReducer,
    agent_edit: agentEditReducer,

    admin_table: adminTableReducer,
    admin_header: adminHeaderReducer,
    admin_edit: adminEditReducer,

    group_table: groupTableReducer,
    group_header: groupHeaderReducer,
    group_edit: groupEditReducer,

    user_table: userTableReducer,
    user_header: userHeaderReducer,
    user_edit: userEditReducer,

    collect_table: collectTableReducer,
    collect_header: collectHeaderReducer,
    collect_edit: collectEditReducer,
    collect_import: collectImportReducer,

    collect_info_header: collectInfoHeaderReducer,
    collect_info_table: collectInfoTableReducer,
    collect_info_edit: collectInfoEditReducer,

    meter_table: meterTableReducer,
    meter_header: meterHeaderRedcuer,
    meter_edit: meterEditReducer,
    meter_import: meterImportReducer,

    meter_devs: meterDevReducer,
    abnormal_devs: abnormalDevReducer,

    userinfo_rechargelog: rechargeLogReducer,
    userinfo_devs: userDevsReducer,
    userinfo_rentlog: rentLogReducer,
    userinfo_flowstatistic: flowStatisticReducer,
    userinfo_electstatistic: electStatisticReducer,

    super_account_table: superAccountTableReducer,
    super_account_header: superAccountHeaderReducer,
    super_account_edit: superAccountEditReducer,

    switch_map: switchMapReducer,
    switch_table: switchTableReducer,
    switch_header: switchHeaderReducer,
    switch_edit: switchEditReducer,

    setting_rate: settingRateReducer,


    param_table: paramTableReducer,
    param_header: paramHeaderReducer,
    param_edit: paramEditReducer,

    book_profee_header: bookProfeeHeaderReducer,
    book_profee_table: bookProfeeTableReducer,
    book_profee_edit: bookProfeeEditReducer,
    book_profee_expire: bookProfeeExpireReducer,

    param_temp: paramTempReducer,

})
