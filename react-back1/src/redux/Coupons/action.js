import {
    COUPON_LIST_EMPTY,
    COUPON_LIST_REQ,
    COUPON_DETAIL_REQ,
    COUPON_HANDLE_REQ,
    SHOP_DETAIL_REQ,
    RECEIVE_COUPON_DETAIL_REQ
  } from './constants';

/* pid:
    "21000" => "coupons/create-system-coupon", //添加运营优惠券
    "21001" => "coupons/find-all-system-coupon", //查询所有的运营优惠券
    "21002" => "coupons/send-coupon-to-business", //发送优惠券到商户
    "21003" => "coupons/check-success-coupon", //审核通过优惠券
    "21004" => "coupons/check-fail-coupon", //审核失败优惠券
    "21005" => "coupons/find-coupon-detail", //优惠券详情
    "21006" => "coupons/coupon-receive-detail", //领取详情
    "21007" => "coupons/system-delete-coupon", //删除优惠券
    "21008" => "coupons/submit-check-coupon", //提审优惠券
    "21009" => "coupons/submit-recall-coupon", //撤销优惠券
    "21010" => "coupons/submit-recall-coupon", //失效优惠券
    "83" => "查询商户ID"
    "20405" => "查询商户信息"
 */
export const EmptyList = () => {
    return {
        type: COUPON_LIST_EMPTY
    }
}

export const addCoupon =(parmas) => {
    return {
        type: COUPON_HANDLE_REQ,
        parmas:{
            ...parmas,
            pid :21000,
        }
    }
};

export const getCouponList =(parmas) => {
    return {
        type: COUPON_LIST_REQ,
        parmas:{
            ...parmas,
            pid :21001,
            limit :20,
        }
    }
};
export const getReceiveCouponDetail =(parmas) => {
    return {
        type: RECEIVE_COUPON_DETAIL_REQ,
        parmas:{
            ...parmas,
            pid :21006,
            limit :20,
        }
    }
};
export const getCouponDetail =(parmas) => {
    return {
        type: COUPON_DETAIL_REQ,
        parmas:{
            ...parmas,
            pid :21005,
        }
    }
};
export const delteThisCoupon =(parmas) => {
    return {
        type: COUPON_HANDLE_REQ,
        parmas:{
            ...parmas,
            pid :21007,
        }
    }
};
export const recallThisCoupon =(parmas) => {
    return {
        type: COUPON_HANDLE_REQ,
        parmas:{
            ...parmas,
            pid :21009,
        }
    }
};
export const checkThisCoupon =(parmas) => {
    return {
        type: COUPON_HANDLE_REQ,
        parmas:{
            ...parmas,
            pid :21008,
        }
    }
};
export const InvalidThisCoupon =(parmas) => {
    return {
        type: COUPON_HANDLE_REQ,
        parmas:{
            ...parmas,
            pid :21010,
        }
    }
};
export const sendThisCoupon =(parmas) => {
    return {
        type: COUPON_HANDLE_REQ,
        parmas:{
            ...parmas,
            pid :21002,
        }
    }
};
export const getShopInfo =(parmas) => {
    return {
        type: SHOP_DETAIL_REQ,
        parmas:{
            ...parmas,
            pid :20405,
        }
    }
};
