import {
    USER_ACCOUNT_CONDITION,
    USER_ACCOUNT_PAGE,
    USER_ACCOUNT_FREEZE_RECORD_REQ,
    USER_ACCOUNT_FREEZE_RECORD_HANDLE_REQ,
    USER_ACCOUNT_EMPTY,


    ACTIVITYLIST_REQ,
    RAFFLELIST_REQ,
    REGISTEREDLIST_REQ,
    INVITATIONLIST_REQ,
    SHOOTLIST_REQ,
    ISSUEDETAILS_REQ,
    REGISTEREDDETAILS_REQ,
    INVITATIONDETAILS_REQ,	
    INVITATIONADDITIONALDETAILS_REQ,
    SHOOTDETAILS_REQ,
    LOGISTICS_REQ,
    REMIND_REQ,
    
    ACT_DETAIL_REQ,
    ACT_DETAIL_HANDLE_REQ,
    // ACTIVITYLIST_RES,
    // RAFFLELIST_RES,
    // REGISTEREDLIST_RES,
    // INVITATIONLIST_RES,
    // SHOOTLIST_RES,
    // ISSUEDETAILS_RES,
    // REGISTEREDDETAILS_RES,
    // INVITATIONDETAILS_RES,
    // INVITATIONADDITIONALDETAILS_RES,
    // SHOOTDETAILS_RES,
    // LOGISTICS_RES,
    // REMIND_RES

  } from './constants';

/* pid:
幸运大转盘奖品领取列表,接口20910
幸运大转盘填写物流信息,接口20911
幸运大转盘详情接口.pid20912
幸运大转盘提醒接口,pid20913
送拍有礼列表接口,pid20900;
送拍有礼详情接口,pid20902
注册有礼列表pid:20905 
注册有礼详情pid:20906
活动列表pid:20914 
邀请有礼基础奖励pid:20903 
邀请有礼额外奖励pid:20904 
邀请有礼列表pid:20901  
叮咚令活动详情接口 pid:21808
叮咚令审核接口, pid:21804
叮咚令列表接口，pid21700
 */
export const SPList =(parmas) => {
    return {
        type: USER_ACCOUNT_CONDITION,
        parmas:{
            ...parmas,
            pid :20221,
            limit :20,
        }
    }
};

export const userResultPage =(page) => {
    return {
        type: USER_ACCOUNT_PAGE,
        page
    }
};


export const EmptyList = () => {
    return {
        type: USER_ACCOUNT_EMPTY
    }
}


export const ActivityList =(parmas) => {
    return {
        type: ACTIVITYLIST_REQ,
        parmas:{
            ...parmas,
            pid :20914,
            limit :20,
        }
    }
};
export const ActivityCheckList =(parmas) => {
    return {
        type: ACTIVITYLIST_REQ,
        parmas:{
            ...parmas,
            pid :21700,
            limit :20,
        }
    }
};
export const ActivityCheck =(parmas) => {
    return {
        type: ACT_DETAIL_REQ,
        parmas:{
            ...parmas,
            pid :21808,
        }
    }
};
export const ActCheckDetailHandle =(parmas) => {
    return {
        type: ACT_DETAIL_HANDLE_REQ,
        parmas:{
            ...parmas,
            pid :21804,
        }
    }
};

export const RaffleList =(parmas) => {
    return {
        type: RAFFLELIST_REQ,
        parmas:{
            ...parmas,
            pid :20910,
            limit :20,
        }
    }
};

export const RegisteredList =(parmas) => {
    return {
        type: REGISTEREDLIST_REQ,
        parmas:{
            ...parmas,
            pid :20905,
            limit :20,
        }
    }
};

export const InvitationList =(parmas) => {
    return {
        type: INVITATIONLIST_REQ,
        parmas:{
            ...parmas,
            pid :20901,
            limit :20,
        }
    }
};

export const ShootList =(parmas) => {
    return {
        type: SHOOTLIST_REQ,
        parmas:{
            ...parmas,
            pid :20900,
            limit :20,
        }
    }
};

export const IssueDetails =(parmas) => {
    return {
        type: ISSUEDETAILS_REQ,
        parmas:{
            ...parmas,
            pid :20912,
        }
    }
};

export const RegisteredDetails =(parmas) => {
    return {
        type: REGISTEREDDETAILS_REQ,
        parmas:{
            ...parmas,
            pid :20906,
            limit :20,
        }
    }
};

export const InvitationDetails =(parmas) => {
    return {
        type: INVITATIONDETAILS_REQ,
        parmas:{
            ...parmas,
            pid :20903,
            limit :20,
        }
    }
};

export const InvitationAdditionalDetails =(parmas) => {
    return {
        type: INVITATIONADDITIONALDETAILS_REQ,
        parmas:{
            ...parmas,
            pid :20904,
            limit :20,
        }
    }
};

export const ShootDetails =(parmas) => {
    return {
        type: SHOOTDETAILS_REQ,
        parmas:{
            ...parmas,
            pid :20902,
            limit :20,
        }
    }
};

export const logistics =(parmas) => {
    return {
        type: LOGISTICS_REQ,
        parmas:{
            ...parmas,
            pid :20911,
        }
    }
};


export const remind =(parmas) => {
    return {
        type: REMIND_REQ,
        parmas:{
            ...parmas,
            pid :20913,
        }
    }
};

