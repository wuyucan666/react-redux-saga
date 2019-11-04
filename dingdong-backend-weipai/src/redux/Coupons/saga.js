import { all, call,takeEvery, put, takeLatest } from 'redux-saga/effects';
// import { Message } from '@alifd/next';
import {changeTimestamp} from '../../common/js/common'
import {
  COUPON_LIST_REQ,
  COUPON_DETAIL_REQ,
  COUPON_HANDLE_REQ,
  RECEIVE_COUPON_DETAIL_REQ,
  RECEIVE_COUPON_DETAIL_RES,
  COUPON_LIST_RES,
  COUPON_DETAIL_RES,
  COUPON_HANDLE_RES,
  SHOP_DETAIL_REQ,
  SHOP_DETAIL_RES
} from './constants';
import nw from '../../common/http/post'

//请求
const postUrlData =(param) => {
  return nw.post('/',param,function (res) {})
}


export function* httpCouponList(action) {
  // console.log(action);
  const newParmas = changeTimestamp(action.parmas)
  try {
    const response = yield call(postUrlData,newParmas);
      yield put({
        type: COUPON_LIST_RES,
        response
      })
  } 
  catch (err) {
    yield put({
      type: COUPON_LIST_RES,
      response:err
    })
  }
}


export function* httpCouponDetail(action) {
  try {
    const response = yield call(postUrlData,action.parmas);
      yield put({
        type: COUPON_DETAIL_RES,
        response
      })
  } 
  catch (err) {
    yield put({
      type: COUPON_DETAIL_RES,
      response:err
    })
  }
}
export function* httpRCouponDetail(action) {
  try {
    const response = yield call(postUrlData,action.parmas);
      yield put({
        type: RECEIVE_COUPON_DETAIL_RES,
        response
      })
  } 
  catch (err) {
    yield put({
      type: RECEIVE_COUPON_DETAIL_RES,
      response:err
    })
  }
}

export function* httpCouponHandle(action) {
  try {
    const response = yield call(postUrlData,action.parmas);
      yield put({
        type: COUPON_HANDLE_RES,
        response
      })
  } 
  catch (err) {
    yield put({
      type: COUPON_HANDLE_RES,
      response:err
    })
  }
}

export function* httpShopInfo(action) {
  try {
    const response = yield call(postUrlData,action.parmas);
      yield put({
        type: SHOP_DETAIL_RES,
        response,
        id:action.parmas.shopId
      })
  } 
  catch (err) {
    yield put({
      type: SHOP_DETAIL_RES,
      response:err
    })
  }
}

export default function* root() {
  yield all([
    takeLatest(COUPON_LIST_REQ, httpCouponList),
    takeLatest(COUPON_DETAIL_REQ, httpCouponDetail),
    takeLatest(RECEIVE_COUPON_DETAIL_REQ, httpRCouponDetail),
    takeLatest(COUPON_HANDLE_REQ, httpCouponHandle),
    takeLatest(SHOP_DETAIL_REQ, httpShopInfo),
  ]);
}