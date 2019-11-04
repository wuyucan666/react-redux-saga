import {
  USER_ACCOUNT_PAGE,
  USER_ACCOUNT_EMPTY,


  USERRECEIVE_REQ,
  USERRECEIVEDETAILS_REQ,
  DDEVENTDETAILS_REQ,
  SHARE_REQ,
  DDLAUNCHEVENT_REQ,
  DDLISTACTIVITIES_REQ,
  GENERATE_REQ,
  DDCREATE_REQ,
  SHELVES_REQ,
  GETCOUPONS_REQ,
  ELISTACTIVITIES_REQ,
  REVIEWDETAILS_REQ,
  DISTRIBUTIONGIFT_REQ,
  ISSUERECORD_REQ,
  TERMINATION_REQ,
  CREATEACTIVITY_REQ,
  TPERATION_REQ,

  USERRECEIVE_RES,
  USERRECEIVEDETAILS_RES,
  DDEVENTDETAILS_RES,
  SHARE_RES,
  DDLAUNCHEVENT_RES,
  DDLISTACTIVITIES_RES,
  GENERATE_RES,
  DDCREATE_RES,
  SHELVES_RES,
  GETCOUPONS_RES,
  ELISTACTIVITIES_RES,
  REVIEWDETAILS_RES,
  DISTRIBUTIONGIFT_RES,
  ISSUERECORD_RES,
  TERMINATION_RES,
  CREATEACTIVITY_RES,
  TPERATION_RES,


  RELEASE_REQ,
  HISTORICALRECORDLIST_REQ,
  VERSIONDETAILS_REQ,

  RELEASE_RES,
  HISTORICALRECORDLIST_RES,
  VERSIONDETAILS_RES,


} from './constants';

/* pid:
    20802 发布版本详情
    20800 发布版本
    20801 发布版本历史记录
 */
export const userResultPage = (page) => {
  return {
    type: USER_ACCOUNT_PAGE,
    page,
  };
};

export const EmptyList = () => {
  return {
    type: USER_ACCOUNT_EMPTY,
  };
};
/* 模板通用上面2个方法*/
export const Tperation = (parmas) => {
  return {
    type: TPERATION_REQ,
    parmas: {
      ...parmas,
    },
  };
};
// 用户弹窗操作


export const UserReceive = (parmas) => {
  return {
    type: USERRECEIVE_REQ,
    parmas: {
      ...parmas,
      pid: 21809,
      limit: 20,
    },
  };
};

export const UserReceiveDetails = (parmas) => {
  return {
    type: USERRECEIVEDETAILS_REQ,
    parmas: {
      ...parmas,
      pid: 21810,
    },
  };
};


export const DdEventDetails = (parmas) => {
  return {
    type: DDEVENTDETAILS_REQ,
    parmas: {
      ...parmas,
      pid: 21808,
    },
  };
};

// export const Share =(parmas) => {
//     return {
//         type: SHARE_REQ,
//         parmas:{
//             ...parmas,
//             pid :123,
//         }
//     }
// };

export const DdLaunchEvent = (parmas) => {
  return {
    type: DDLAUNCHEVENT_REQ,
    parmas: {
      ...parmas,
      pid: 21805,
    },
  };
};

export const DdListActivities = (parmas) => {
  return {
    type: DDLISTACTIVITIES_REQ,
    parmas: {
      ...parmas,
      pid: 21811,
    },
  };
};

export const Generate = (parmas) => {
  return {
    type: GENERATE_REQ,
    parmas: {
      ...parmas,
      pid: 21802,
    },
  };
};

export const DdCreate = (parmas) => {
  return {
    type: DDCREATE_REQ,
    parmas: {
      ...parmas,
      pid: 21808,
    },
  };
};

// export const Shelves =(parmas) => {
//     return {
//         type: SHELVES_REQ,
//         parmas:{
//             ...parmas,
//             pid :123,
//         }
//     }
// };

export const GetCoupons = (parmas) => {
  return {
    type: GETCOUPONS_REQ,
    parmas: {
      ...parmas,
      pid: 21001,
    },
  };
};

export const EListActivities = (parmas) => {
  return {
    type: ELISTACTIVITIES_REQ,
    parmas: {
      ...parmas,
      pid: 21701,
    },
  };
};

export const ReviewDetails = (parmas) => {
  return {
    type: REVIEWDETAILS_REQ,
    parmas: {
      ...parmas,
      pid: 21702,
    },
  };
};

// export const DistributionGift =(parmas) => {
//     return {
//         type: DISTRIBUTIONGIFT_REQ,
//         parmas:{
//             ...parmas,
//             pid :123,
//         }
//     }
// };

// 发放记录接口
export const IssueRecord = (parmas) => {
  return {
    type: ISSUERECORD_REQ,
    parmas: {
      ...parmas,
      // pid :21705,
    },
  };
};

// export const Termination =(parmas) => {
//     return {
//         type: TERMINATION_REQ,
//         parmas:{
//             ...parmas,
//             pid :123,
//         }
//     }
// };

export const CreateActivity = (parmas) => {
  return {
    type: CREATEACTIVITY_REQ,
    parmas: {
      ...parmas,
      pid: 21801,
    },
  };
};
