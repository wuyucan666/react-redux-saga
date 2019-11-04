import {
    SETTING_PAGE,
    SETTING_EMPTY,
    USER_SETTING_LISTS_REQ,
    USER_SETTING_DETAILS_REQ,
    USER_SETTING_PASS_ON_REQ,
    MONEY_DETAIL_EXPORT_DATA,
    ADSPOKESMAN_LIST_REQ,
    ADSPOKESMAN_PASS_ON_REQ,
    ADSPOKESMAN_DETAILS_REQ,
    ADFINDACTIVITY_LIST_REQ,
    ADFINDACTIVITY_PASS_ON_REQ,
    ADFINDACTIVITY_DETAILS_REQ,
    NEWSBULLETIN_LIST_REQ, // 新闻公告
    NEWSBULLETIN_ADD_REQ,
    NEWSBULLETIN_DELETE_REQ,
    NEWSBULLETIN_EDIT_REQ,
    NEWSBULLETIN_LOWER_REQ,
    NEWSBULLETIN_DETAIL_REQ,
    NEWSBULLETIN_RELEASE_REQ,
    NOVICEGUIDE_LIST_REQ, // 新手指引
    NOVICEGUIDE_ADD_REQ,
    NOVICEGUIDE_PASS_REQ,
    NOVICEGUIDE_DETAIL_REQ,
    NOVICEGUIDE_DELETE_REQ

  } from './constants';

/*  1.广告位创建(编辑)接口,pid21900
    2.广告位列表,pid21901
    3.广告位详情,pid21902
    4.广告位的展示,不显示,删除操作,pid21903
 */
// export const userCondition =(parmas) => {
//     return {
//         type: SETTING_CONDITION,
//         parmas:{
//             ...parmas,
//             pid :20221,
//             limit :20,
//         }
//     }
// };

export const userListEmpty =() => {
    return {
        type: SETTING_EMPTY
    }
};
export const userResultPage =(page) => {
    return {
        type: SETTING_PAGE,
        page
    }
};

export const EmptyList = () => {
    return {
        type: SETTING_EMPTY
    }
}

//广告位
export const GetSETTINGList =(parmas) => {
    return {
        type: USER_SETTING_LISTS_REQ,
        parmas:{
            ...parmas,
            pid:21901,
            positionId: 1,
        }
    }
};

export const GetSETTINGDetail =(parmas) => {
    return {
        type: USER_SETTING_DETAILS_REQ,
        parmas:{
            ...parmas,
            pid:21902,
            positionId: 1,
        }
    }
};

export const SETTINGShowOn =(parmas) => {
    return {
        type: USER_SETTING_PASS_ON_REQ,
        parmas:{
            ...parmas,
            status:1,
            pid:21903,
            positionId: 1,
        }
    }
};

export const SETTINGHiden =(parmas) => {
    return {
        type: USER_SETTING_PASS_ON_REQ,
        parmas:{
            ...parmas,
            status:0,
            pid:21903,
            positionId: 1,
        }
    }
};
export const SETTINGDelte =(parmas) => {
    return {
        type: USER_SETTING_PASS_ON_REQ,
        parmas:{
            ...parmas,
            status:-1,
            pid:21903,
            positionId: 1,
        }
    }
};
export const AddAD =(parmas) => {
    return {
        type: USER_SETTING_PASS_ON_REQ,
        parmas:{
            ...parmas,
            pid:21900,
            positionId: 1,
        }
    }
};
export const EditAD =(parmas) => {
    return {
        type: USER_SETTING_PASS_ON_REQ,
        parmas:{
            ...parmas,
            pid:21900,
            positionId: 1,
        }
    }
};

export const userExportData =(parmas) => {
    return {
        type: MONEY_DETAIL_EXPORT_DATA,
        parmas:{
            ...parmas,
            pid:20225
        }
    }
};

// 代言人宣传页
export const AdSpokesmanList = (parmas) => { // 列表
    return {
        type: ADSPOKESMAN_LIST_REQ,
        parmas: {
            ...parmas,
            pid: 21707
        }
    }
}
export const AdSpokesmanDetail = (parmas) => { // 列表详情
    return {
        type: ADSPOKESMAN_DETAILS_REQ,
        parmas: {
            ...parmas,
            pid: ''
        }
    }
}
export const AdSpokesmanAdd = (parmas) => { // 添加
    return {
        type: ADSPOKESMAN_PASS_ON_REQ,
        parmas: {
            ...parmas,
            pid: 21708
        }
    }
}
export const AdSpokesmanEdit = (parmas) => { // 编辑
    return {
        type: ADSPOKESMAN_PASS_ON_REQ,
        parmas: {
            ...parmas,
            pid: 21708
        }
    }
}
export const AdSpokesmanDelete = (parmas) => { // 删除
    return {
        type: ADSPOKESMAN_PASS_ON_REQ,
        parmas: {
            ...parmas,
            pid: 21708
        }
    }
}
export const AdSpokesmanHide = (parmas) => { // 不展示
    return {
        type: ADSPOKESMAN_PASS_ON_REQ,
        parmas: {
            ...parmas,
            status: 0,
            pid: 21708
        }
    }
}
export const AdSpokesmanShow = (parmas) => { // 展示
    return {
        type: ADSPOKESMAN_PASS_ON_REQ,
        parmas: {
            ...parmas,
            status: 1,
            pid: 21708
        }
    }
}

// APP 发现页活动
export const AdFindActivityList = (parmas) => { // 列表
    return {
        type: ADFINDACTIVITY_LIST_REQ,
        parmas: {
            ...parmas,
            positionId: 2,
            pid: 21901
        }
    }
}
export const AdFindActivityDetail = (parmas) => { // 详情
    return {
        type: ADFINDACTIVITY_DETAILS_REQ,
        parmas: {
            ...parmas,
            positionId: 2,
            pid: ''
        }
    }
}
export const AdFindActivityAdd = (parmas) => { // 添加
    return {
        type: ADFINDACTIVITY_PASS_ON_REQ,
        parmas: {
            ...parmas,
            positionId: 2,
            pid: 21900
        }
    }
}
export const AdFindActivityEdit = (parmas) => { // 编辑
    return {
        type: ADFINDACTIVITY_PASS_ON_REQ,
        parmas: {
            ...parmas,
            positionId: 2,
            pid: 21900
        }
    }
}
export const AdFindActivityDelete = (parmas) => { // 删除
    return {
        type: ADFINDACTIVITY_PASS_ON_REQ,
        parmas: {
            ...parmas,
            positionId: 2,
            status: -1,
            pid: 21903
        }
    }
}
export const AdFindActivityHide = (parmas) => { // 不展示
    return {
        type: ADFINDACTIVITY_PASS_ON_REQ,
        parmas: {
            ...parmas,
            positionId: 2,
            status: 0,
            pid: 21903
        }
    }
}
export const AdFindActivityShow = (parmas) => { // 展示
    return {
        type: ADFINDACTIVITY_PASS_ON_REQ,
        parmas: {
            ...parmas,
            positionId: 2,
            status: 1,
            pid: 21903
        }
    }
}

// 新闻公告
export const NewsBulletinList = (parmas) => { // 列表
    return {
        type: NEWSBULLETIN_LIST_REQ,
        parmas: {
            ...parmas,
            pid: 22000
        }
    }
}
export const NewsBulletinDetail = (parmas) => { // 详情
    return {
        type: NEWSBULLETIN_DETAIL_REQ,
        parmas: {
            ...parmas,
            pid: 22001
        }
    }
}
export const NewsBulletinAdd = (parmas) => { // 添加
    return {
        type: NEWSBULLETIN_ADD_REQ,
        parmas: {
            ...parmas,
            pid: 22002
        }
    }
}
export const NewsBulletinDelete = (parmas) => { // 删除
    return {
        type: NEWSBULLETIN_DELETE_REQ,
        parmas: {
            ...parmas,
            pid: 22006
        }
    }
}
export const NewsBulletinEdit = (parmas) => { // 编辑
    return {
        type: NEWSBULLETIN_EDIT_REQ,
        parmas: {
            ...parmas,
            pid: 22004
        }
    }
}
export const NewsBulletinLower = (parmas) => { // 下架
    return {
        type: NEWSBULLETIN_LOWER_REQ,
        parmas: {
            ...parmas,
            pid: 22005
        }
    }
}
export const NewsBulletinRelease = (parmas) => { // 发布
    return {
        type: NEWSBULLETIN_RELEASE_REQ,
        parmas: {
            ...parmas,
            pid: 22003
        }
    }
}

// 新手指引
export const NoviceGuideList = (parmas) => { // 列表
    return {
        type: NOVICEGUIDE_LIST_REQ,
        parmas: {
            ...parmas,
            pid: 22101
        }
    }
}
export const NoviceGuideAdd = (parmas) => { // 添加编辑
    return {
        type: NOVICEGUIDE_ADD_REQ,
        parmas: {
            ...parmas,
            pid: 22100
        }
    }
}
export const NoviceGuidePass = (parmas) => { // 操作
    return {
        type: NOVICEGUIDE_PASS_REQ,
        parmas: {
            ...parmas,
            pid: 22102
        }
    }
}
export const NoviceGuideDelete = (parmas) => { // 删除
    return {
        type: NOVICEGUIDE_DELETE_REQ,
        parmas: {
            ...parmas,
            isDel: 1,
            pid: 22103
        }
    }
}
export const NoviceGuideDetail = (parmas) => { // 详情
    return {
        type: NOVICEGUIDE_DETAIL_REQ,
        parmas: {
            ...parmas,
            pid: 22104
        }
    }
}