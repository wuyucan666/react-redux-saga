import {
    WEIPAI_MERCHANT_CONDITION,
    WEIPAI_MERCHANT_PAGE,
    WEIPAI_MERCHANT_DETAIL_SN,
    WEIPAI_MERCHANT_DETAIL_SN_SS,
    WEIPAI_MERCHANT_DETAIL_SN_SI,
    WEIPAI_MERCHANT_DETAIL_SN_IL,
    WEIPAI_MERCHANT_DETAIL_SN_ALL,
    DELETE_INVITE_USER_CONDITION1,
    UPDATE_INVITE_USER_CONDITION1,
    ACCOUNT_INVITE_USER_CONDITION1,
    WEIPAI_MERCHANT_DETAIL_PASS,
    WEIPAI_MERCHANT_DETAIL_FAIL,
    WEIPAI_MERCHANT_LIST_EMPTY,
    WEIPAI_MERCHANT_DETAIL_PASS1,
    WITHDRAW_AUCTION_LIST_REQ,
    WITHDRAW_AUCTION_DISPLAY_REQ,
    WITHDRAW_AUCTION_SORT_REQ,
    MODIFY_COMMIT_REQ,
    MODIFY_RECORD_REQ
  } from './constants';
/*
pid:
20410  收拍列表
20411  隐藏/显示
20412  排序 
20300  修改 -- 接口增加changeStartTimeFlag字段标识符
20302  新增 -- 修改拍场开始时间
20305  新增 -- 修改拍场开始时间列表
*/

export const userCondition =(parmas) => {
    return {
        type: WEIPAI_MERCHANT_CONDITION,
        parmas
    }
};

export const userResultPage =(page) => {
    return {
        type: WEIPAI_MERCHANT_PAGE,
        page
    }
};

export const userResultDetailAll =(parmas) => {
    return {
        type: WEIPAI_MERCHANT_DETAIL_SN_ALL,
        parmas
    }
};
export const userResultDetail =(parmas) => {
    return {
        type: WEIPAI_MERCHANT_DETAIL_SN,
        parmas
    }
};
export const userSellerStatistics =(parmas) => {
    return {
        type: WEIPAI_MERCHANT_DETAIL_SN_SS,
        parmas
    }
};
export const userSellerInfo =(parmas) => {
    return {
        type: WEIPAI_MERCHANT_DETAIL_SN_SI,
        parmas
    }
};
export const userInviteList =(parmas) => {
    return {
        type: WEIPAI_MERCHANT_DETAIL_SN_IL,
        parmas
    }
};
export const userSnPass =(val) => {
    return {
        type: WEIPAI_MERCHANT_DETAIL_PASS,
        val
    }
};
export const userSnPass1 =(val) => {
    return {
        type: WEIPAI_MERCHANT_DETAIL_PASS1,
        val
    }
};

export const userSnFail =(val) => {
    return {
        type: WEIPAI_MERCHANT_DETAIL_FAIL,
        val
    }
};


export const deleteInviteUser =(id) => {
    return {
        type: DELETE_INVITE_USER_CONDITION1,
        id
    }
};

export const updateInviteUser =(parmas) => {
    return {
        type: UPDATE_INVITE_USER_CONDITION1,
        parmas
    }
};

export const accountInviteUser =(parmas) => {
    return {
        type: ACCOUNT_INVITE_USER_CONDITION1,
        parmas
    }
};   
export const userListEmpty =(val) => {
    return {
        type: WEIPAI_MERCHANT_LIST_EMPTY,
        val
    }
};

export const SPList =(parmas) => {
    return {
        type: WITHDRAW_AUCTION_LIST_REQ,
        parmas:{
            ...parmas,
            pid :20410,
            limit :20,
        }
    }
};

export const SPShowIt =(parmas) => {
    return {
        type: WITHDRAW_AUCTION_DISPLAY_REQ,
        parmas:{
            ...parmas,
            pid :20411,
        }
    }
};

export const SPSort =(parmas) => {
    return {
        type: WITHDRAW_AUCTION_SORT_REQ,
        parmas:{
            ...parmas,
            pid :20412,
        }
    }
};

export const wpModifyCommit =(parmas) => {
    return {
        type: MODIFY_COMMIT_REQ,
        parmas:{
            ...parmas,
            pid :20302,
        }
    }
};

export const wpModifyRecord =(parmas) => {
    return {
        type: MODIFY_RECORD_REQ,
        parmas:{
            ...parmas,
            pid :20305,
        }
    }
};

