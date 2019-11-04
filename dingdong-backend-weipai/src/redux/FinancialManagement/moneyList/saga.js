import { all, call, takeEvery, put, takeLatest } from 'redux-saga/effects';
// import { Message } from '@alifd/next';
import { changeTimestamp } from '../../../common/js/common';
import {
  USER_ACCOUNT_CONDITION_MON,
  USER_ACCOUNT_RESULT,
  USER_ACCOUNT_FREEZE_RECORD_REQ,
  USER_ACCOUNT_FREEZE_RECORD_RES,
  USER_ACCOUNT_FREEZE_RECORD_HANDLE_REQ,
  USER_ACCOUNT_FREEZE_RECORD_HANDLE_RES,
  USER_COUPON_LISTS_REQ,
  USER_COUPON_DETAILS_REQ,
  USER_COUPON_PASS_ON_REQ,
  USER_COUPON_LISTS_RES,
  USER_COUPON_DETAILS_RES,
  USER_COUPON_PASS_ON_RES,
  MONEY_DETAIL_EXPORT_DATA,
  MONEY_DETAIL_EXPORT_DATA_SUCCESS,
} from './constants';
import nw from '../../../common/http/post';

// 请求
const postUrlData = (param) => {
  return nw.post('/', param, (res) => {});
};


export function* httpAccount(action) {
  const { parmas } = action;
  const newParmas = changeTimestamp(parmas);
  const obj = Object.assign({}, newParmas);
  console.log(obj, 'obj-1');
  if (obj.dateStamp && obj.dateStamp !== null) {
    const str1 = `${obj.dateStamp.format('YYYY-MM-DD')} 00:00:00`;
    const str2 = `${obj.dateStamp.format('YYYY-MM-DD')} 23:59:59`;
    const start = new Date(str1).getTime() / 1000;
    const end = new Date(str2).getTime() / 1000;
    obj.startTime = start;
    obj.endTime = end;
    delete obj.dateStamp;
  } else {
    delete obj.dateStamp;
  }
  console.log(obj, 'obj-2');
  try {
    const response = yield call(postUrlData, obj);
    yield put({
      type: USER_ACCOUNT_RESULT,
      response,
    });
    // console.log('接口返回response:', response);
    // 20224 冻结资金记录接口
    if (response.data.uuid) {
      const freeze = yield call(postUrlData, {
        pid: 20224,
        uuid: response.data.uuid,
        type: 0,
        moneyType: 1,
        startTime: 0,
        endTime: 0,
      });
      const nickname = yield call(postUrlData, {
        pid: 20100,
        uuid: response.data.uuid,
      });
      yield put({
        type: USER_ACCOUNT_FREEZE_RECORD_RES,
        response: freeze,
        nickname,
      });
    }
  }
  catch (err) {
    console.log('err:', err);
  }
}

export function* httpFreezeRecord(action) {
  const { parmas } = action;
  const newParmas = changeTimestamp(parmas);

  try {
    const response = yield call(postUrlData, newParmas);
    // console.log(response);
    yield put({
      type: USER_ACCOUNT_FREEZE_RECORD_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}
export function* httpFreezeHandle(action) {
  const { parmas } = action;
  // console.log(parmas)
  try {
    const response = yield call(postUrlData, parmas);
    // console.log(response);
    yield put({
      type: USER_ACCOUNT_FREEZE_RECORD_HANDLE_RES,
      response,
    });
  }
  catch (err) {
    yield put({
      type: USER_ACCOUNT_FREEZE_RECORD_HANDLE_RES,
      response: err,
    });
  }
}

export function* httpCouponLists(action) {
  const { parmas } = action;
  try {
    const response = yield call(postUrlData, parmas);
    yield put({
      type: USER_COUPON_LISTS_RES,
      response,
    });
  }
  catch (err) {
    yield put({
      type: USER_COUPON_LISTS_RES,
      response: err,
    });
  }
}
export function* httpCouponDetails(action) {
  const { parmas } = action;
  try {
    const response = yield call(postUrlData, parmas);
    yield put({
      type: USER_COUPON_DETAILS_RES,
      response,
    });
  }
  catch (err) {
    yield put({
      type: USER_COUPON_DETAILS_RES,
      response: err,
    });
  }
}
export function* httpCouponPassOn(action) {
  const { parmas } = action;
  try {
    const response = yield call(postUrlData, parmas);
    yield put({
      type: USER_COUPON_PASS_ON_RES,
      response,
    });
  }
  catch (err) {
    yield put({
      type: USER_COUPON_PASS_ON_RES,
      response: err,
    });
  }
}

export function* httpExport(action) {
  const { parmas } = action;
  console.log(parmas, 'parmas');
  const newParmas = changeTimestamp(parmas);
  try {
    const response = yield call(postUrlData, newParmas);
    // console.log(response);
    yield put({
      type: MONEY_DETAIL_EXPORT_DATA_SUCCESS,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export default function* root() {
  yield all([
    takeEvery(USER_ACCOUNT_CONDITION_MON, httpAccount),
    takeEvery(USER_ACCOUNT_FREEZE_RECORD_REQ, httpFreezeRecord),
    takeEvery(USER_ACCOUNT_FREEZE_RECORD_HANDLE_REQ, httpFreezeHandle),
    takeEvery(USER_COUPON_LISTS_REQ, httpCouponLists),
    takeEvery(USER_COUPON_DETAILS_REQ, httpCouponDetails),
    takeEvery(USER_COUPON_PASS_ON_REQ, httpCouponPassOn),
    takeLatest(MONEY_DETAIL_EXPORT_DATA, httpExport),
  ]);
}
