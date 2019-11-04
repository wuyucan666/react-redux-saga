import {
    CHARGE_SINGLE_CONDITION,
    CHARGE_SINGLE_INFO_REQ
  } from './constants';


export const userCondition =(parmas) => {
    return {
        type: CHARGE_SINGLE_CONDITION,
        parmas
    }
};

export const userInfoReq =(parmas) => {
    return {
        type: CHARGE_SINGLE_INFO_REQ,
        parmas
    }
};