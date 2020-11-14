// js自定义枚举类 冻结一个对象

// 验证码
export const VeriCodeType = Object.freeze({
    "REGISTER": 1,// 注册
    "EDIT_INCM_ACCOUNT": 2,// 编辑收款账号
    "MANUAL_CREATE_ORDER": 3,// 平台创建订单
});

// 管理员类型
export const AdminType = Object.freeze({
    "SUPER_ADMIN": 1,//超级管理员
    "AGENT_ADMIN": 2,//经销商管理员
    "AGENT_SUB_ADMIN": 4,//经销商子管理员
});

export const MeterPhase = Object.freeze({
    "Uniphase": 1,//单相
    "Triphase": 2,//三相
});

export const MeterPayType = Object.freeze({
    "PREPAY": 1,//预付费
    "NETWORK": 2,//网络付费
});

export const RateType = Object.freeze({
    "SINGLE": 1,//单费率
    "MULTIPLE": 2,//多费率
});

export const ChargeType = Object.freeze({
    "ENERGY": 1,// 按电收费
    "TIME": 2,// 按时间收费
});

export const ConnectType = Object.freeze({
    "GTWY": 0,// 连接采集器
    "REMOTE": 1,// 远程
});

export const AgentType = Object.freeze({
    "Company": 0,// 企业
    "Personal": 1,// 个人
});

//订单状态
export const MeterOrderState = Object.freeze({
    "IDLE": 0,//空闲
    "RECHARGING": 1,//充值中
    "RELIEVE": 2,// 结算中
});
