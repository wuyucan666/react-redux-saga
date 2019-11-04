import {
    USER_PIPELINE_CONDITION,
    USER_PIPELINE_PAGE,
    USER_PIPELINE_EXPORT,
    USER_RECHARGE_CONDITION,
    USER_RECHARGE_PAGE,
    USER_RECHARGE_EXPORT,
    USER_CHARGE_DETAIL,
    USER_CHARGE_DETAIL_PASS,
    USER_CHARGE_DETAIL_FAIL,
    USER_OFFLINE_SN,
    USER_OFFLINE_SN_PASS,
    USER_OFFLINE_SN_ARRIVAL // 确认到账
  } from './constants';


export const userCondition =(parmas) => {
    return {
        type: USER_PIPELINE_CONDITION,
        parmas
    }
};

export const userResultPage =(page) => {
    return {
        type: USER_PIPELINE_PAGE,
        page
    }
};

export const userPipeExport =(cond) => {
    return {
        type: USER_PIPELINE_EXPORT,
        cond
    }
};

export const userEncCondition =(parmas) => {
    return {
        type: USER_RECHARGE_CONDITION,
        parmas
    }
};

export const userEncResultPage =(page) => {
    return {
        type: USER_RECHARGE_PAGE,
        page
    }
};

export const userEncExport =(cond) => {
    return {
        type: USER_RECHARGE_EXPORT,
        cond
    }
};

//公用
export const userSnDetail =(val) => {
    return {
        type: USER_CHARGE_DETAIL,
        val
    }
};
export const userSnPass =(val) => {
    return {
        type: USER_CHARGE_DETAIL_PASS,
        val
    }
};
export const userSnFail =(val) => {
    return {
        type: USER_CHARGE_DETAIL_FAIL,
        val
    }
};


//线下充值详情

export const userOfflineSn =(val) => {
    return {
        type: USER_OFFLINE_SN,
        val
    }
};

export const userOfflineSnPass =(val) => {
    return {
        type: USER_OFFLINE_SN_PASS,
        val
    }
};

export const userofflineSnArrival = (val) => {
    return {
        type: USER_OFFLINE_SN_ARRIVAL,
        val
    }
}