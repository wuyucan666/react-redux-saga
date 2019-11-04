import {
    USER_ACCOUNT_PAGE,
    USER_ACCOUNT_EMPTY,

    RELEASE_REQ,
    HISTORICALRECORDLIST_REQ,
    VERSIONDETAILS_REQ,

    RELEASE_RES,
    HISTORICALRECORDLIST_RES,
    VERSIONDETAILS_RES

  } from './constants';

/* pid:
    20802 发布版本详情
    20800 发布版本
    20801 发布版本历史记录
 */
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


export const HistoricalRecordList =(parmas) => {
    return {
        type: HISTORICALRECORDLIST_REQ,
        parmas:{
            ...parmas,
            pid :20801,
            limit :20,
        }
    }
};

export const Release =(parmas) => {
    return {
        type: RELEASE_REQ,
        parmas:{
            ...parmas,
            pid :20800,
        }
    }
};


export const VersionDetails =(parmas) => {
    return {
        type: VERSIONDETAILS_REQ,
        parmas:{
            ...parmas,
            pid :20802,
        }
    }
};


