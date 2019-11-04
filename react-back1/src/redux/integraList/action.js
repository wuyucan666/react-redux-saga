import {
    USER_INTEGRAL_CONDITION,
    USER_INTEGRAL_PAGE,
    USER_ACCOUNT_FREEZE_RECORD_HANDLE_REQ,
    USER_ACCOUNT_EMPTY
  } from './constants';

/* pid:
    20221 用户资金明细
    20222 冻结资金
    20223 解冻资金
    20224 冻结资金记录
 */
export const userCondition =(parmas) => {
    console.log(parmas)
    return {
        type: USER_INTEGRAL_CONDITION,
        parmas:{
            ...parmas,
            pid :20119,
            limit :20,
        }
    }
};

export const userResultPage =(page) => {
    return {
        type: USER_INTEGRAL_PAGE,
        page
    }
};

// export const Freeze =(parmas) => {
//     return {
//         type: USER_ACCOUNT_FREEZE_RECORD_HANDLE_REQ,
//         parmas:{
//             ...parmas,
//             pid:20222
//         }
//     }
// };

// export const UnFreeze =(parmas) => {
//     return {
//         type: USER_ACCOUNT_FREEZE_RECORD_HANDLE_REQ,
//         parmas:{
//             ...parmas,
//             pid:20223
//         }
//     }
// };

// export const FreezeRecord =(parmas) => {
//     return {
//         type: USER_ACCOUNT_FREEZE_RECORD_REQ,
//         parmas:{
//             ...parmas,
//             pid:20224
//         }
//     }
// };

export const EmptyList = () => {
    return {
        type: USER_ACCOUNT_EMPTY
    }
}