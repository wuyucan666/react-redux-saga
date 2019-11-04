import {
  USER_ACCOUNT_CONDITION_MON,
  USER_ACCOUNT_PAGE,
  USER_ACCOUNT_FREEZE_RECORD_REQ,
  USER_ACCOUNT_FREEZE_RECORD_HANDLE_REQ,
  USER_ACCOUNT_EMPTY,
  USER_COUPON_LISTS_REQ,
  USER_COUPON_DETAILS_REQ,
  USER_COUPON_PASS_ON_REQ,
  MONEY_DETAIL_EXPORT_DATA,
  MONEY_DETAIL_EXPORT_DATA_SUCCESS,
} from './constants';

/* pid:
    20221 用户资金明细
    20222 冻结资金
    20223 解冻资金
    20224 冻结资金记录
    "21001" => "coupons/find-all-system-coupon", //查询所有的运营优惠券
    "21003" => "coupons/check-success-coupon", //审核通过优惠券
    "21004" => "coupons/check-fail-coupon", //审核失败优惠券
    "21005" => "coupons/find-coupon-detail", //优惠券详情
 */
export const userCondition = (parmas) => {
  return {
    type: USER_ACCOUNT_CONDITION_MON,
    parmas: {
      ...parmas,
      pid: 20221,
      limit: 20,
    },
  };
};

export const userResultPage = (page) => {
  return {
    type: USER_ACCOUNT_PAGE,
    page,
  };
};

export const Freeze = (parmas) => {
  return {
    type: USER_ACCOUNT_FREEZE_RECORD_HANDLE_REQ,
    parmas: {
      ...parmas,
      pid: 20222,
    },
  };
};

export const UnFreeze = (parmas) => {
  return {
    type: USER_ACCOUNT_FREEZE_RECORD_HANDLE_REQ,
    parmas: {
      ...parmas,
      pid: 20223,
    },
  };
};

export const FreezeRecord = (parmas) => {
  return {
    type: USER_ACCOUNT_FREEZE_RECORD_REQ,
    parmas: {
      ...parmas,
      pid: 20224,
    },
  };
};

export const EmptyList = () => {
  return {
    type: USER_ACCOUNT_EMPTY,
  };
};

// 审核优惠券
export const GetCouponList = (parmas) => {
  return {
    type: USER_COUPON_LISTS_REQ,
    parmas: {
      ...parmas,
      pid: 21001,
    },
  };
};

export const GetCouponDetail = (parmas) => {
  return {
    type: USER_COUPON_DETAILS_REQ,
    parmas: {
      ...parmas,
      pid: 21005,
    },
  };
};

export const CouponPassOn = (parmas) => {
  return {
    type: USER_COUPON_PASS_ON_REQ,
    parmas: {
      ...parmas,
      pid: 21003,
    },
  };
};

export const CouponFailIn = (parmas) => {
  return {
    type: USER_COUPON_PASS_ON_REQ,
    parmas: {
      ...parmas,
      pid: 21004,
    },
  };
};

export const userExportData = (parmas) => {
  return {
    type: MONEY_DETAIL_EXPORT_DATA,
    parmas: {
      ...parmas,
      pid: 20225,
    },
  };
};
