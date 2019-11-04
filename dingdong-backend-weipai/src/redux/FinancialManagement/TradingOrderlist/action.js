import {
    TRADING_ORDER_CONDITION,
    TRADING_ORDER_PAGE,
    TRADING_ORDER_DETAIL_SN,
    TRADING_ORDER_EXPORT_DATA,
    WEIPAI_MERCHANT_LIST_EMPTY
  } from './constants';

  
export const userListEmpty =(val) => {
    return {
        type: WEIPAI_MERCHANT_LIST_EMPTY,
        val
    }
};

export const userCondition =(parmas) => {
    return {
        type: TRADING_ORDER_CONDITION,
        parmas
    }
};

export const userResultPage =(page) => {
    return {
        type: TRADING_ORDER_PAGE,
        page
    }
};

export const userResultDetail =(parmas) => {
    return {
        type: TRADING_ORDER_DETAIL_SN,
        parmas
    }
};

export const userExportData =(parmas) => {
    return {
        type: TRADING_ORDER_EXPORT_DATA,
        parmas
    }
};
