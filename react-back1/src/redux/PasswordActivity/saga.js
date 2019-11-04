import { all, call, takeEvery, put, takeLatest } from 'redux-saga/effects';
// import { Message } from '@alifd/next';
import { changeTimestamp } from '../../common/js/common';
import {
  RELEASE_REQ,
  HISTORICALRECORDLIST_REQ,
  VERSIONDETAILS_REQ,

  RELEASE_RES,
  HISTORICALRECORDLIST_RES,
  VERSIONDETAILS_RES,


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

} from './constants';
import nw from '../../common/http/post';

// 请求
const postUrlData = (param) => {
  return nw.post('/', param, (res) => {});
};

// export function* httpHISTORICALRECORDLIST_REQ(action) {
//   const {parmas} = action
//   const newParmas = changeTimestamp(parmas)
//   try {
//     const response = yield call(postUrlData,newParmas);
//     yield put({
//       type: HISTORICALRECORDLIST_RES,
//       response
//     })
//   }
//   catch (err) {
//     console.log(err);
//   }
// }

// export function* httpVERSIONDETAILS_REQ(action) {
//   const {parmas} = action
//   try {
//     const response = yield call(postUrlData,parmas);
//     yield put({
//       type: VERSIONDETAILS_RES,
//       response
//     })
//   }
//   catch (err) {
//     console.log(err);
//   }
// }
export function* httpTPERATION_REQ(action) {
  const { parmas } = action;
  // const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData, parmas);
    yield put({
      type: TPERATION_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}
// 用户弹窗操作


export function* httpUSERRECEIVE_REQ(action) {
  const { parmas } = action;
  const newParmas = changeTimestamp(parmas);
  try {
    const response = yield call(postUrlData, newParmas);
    yield put({
      type: USERRECEIVE_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpUSERRECEIVEDETAILS_REQ(action) {
  const { parmas } = action;
  // const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData, parmas);
    yield put({
      type: USERRECEIVEDETAILS_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpDDEVENTDETAILS_REQ(action) {
  const { parmas } = action;
  // const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData, parmas);
    yield put({
      type: DDEVENTDETAILS_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpSHARE_REQ(action) {
  const { parmas } = action;
  const newParmas = changeTimestamp(parmas);
  try {
    const response = yield call(postUrlData, newParmas);
    yield put({
      type: SHARE_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpDDLAUNCHEVENT_REQ(action) {
  const { parmas } = action;
  // const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData, parmas);
    yield put({
      type: DDLAUNCHEVENT_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpDDLISTACTIVITIES_REQ(action) {
  const { parmas } = action;
  const newParmas = changeTimestamp(parmas);
  try {
    const response = yield call(postUrlData, newParmas);
    yield put({
      type: DDLISTACTIVITIES_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpGENERATE_REQ(action) {
  const { parmas } = action;
  // const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData, parmas);
    yield put({
      type: GENERATE_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}


export function* httpDDCREATE_REQ(action) {
  const { parmas } = action;
  // const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData, parmas);
    yield put({
      type: DDCREATE_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpSHELVES_REQ(action) {
  const { parmas } = action;
  const newParmas = changeTimestamp(parmas);
  try {
    const response = yield call(postUrlData, newParmas);
    yield put({
      type: SHELVES_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpGETCOUPONS_REQ(action) {
  const { parmas } = action;
  // const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData, parmas);
    yield put({
      type: GETCOUPONS_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpELISTACTIVITIES_REQ(action) {
  const { parmas } = action;
  const newParmas = changeTimestamp(parmas);
  try {
    const response = yield call(postUrlData, newParmas);
    yield put({
      type: ELISTACTIVITIES_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpREVIEWDETAILS_REQ(action) {
  const { parmas } = action;
  // const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData, parmas);
    yield put({
      type: REVIEWDETAILS_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}


export function* httpDISTRIBUTIONGIFT_REQ(action) {
  const { parmas } = action;
  const newParmas = changeTimestamp(parmas);
  try {
    const response = yield call(postUrlData, newParmas);
    yield put({
      type: DISTRIBUTIONGIFT_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpISSUERECORD_REQ(action) {
  const { parmas } = action;
  const newParmas = changeTimestamp(parmas);
  try {
    const response = yield call(postUrlData, newParmas);
    yield put({
      type: ISSUERECORD_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpTERMINATION_REQ(action) {
  const { parmas } = action;
  const newParmas = changeTimestamp(parmas);
  try {
    const response = yield call(postUrlData, newParmas);
    yield put({
      type: TERMINATION_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpCREATEACTIVITY_REQ(action) {
  const { parmas } = action;
  // const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData, parmas);
    yield put({
      type: CREATEACTIVITY_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export default function* root() {
  yield all([
    takeEvery(TPERATION_REQ, httpTPERATION_REQ), // 用户弹窗操作
    takeEvery(USERRECEIVE_REQ, httpUSERRECEIVE_REQ), // 用户领取列表
    takeEvery(USERRECEIVEDETAILS_REQ, httpUSERRECEIVEDETAILS_REQ), // 用户领取详情
    takeEvery(DDEVENTDETAILS_REQ, httpDDEVENTDETAILS_REQ), // 活动详情
    takeEvery(SHARE_REQ, httpSHARE_REQ), // 分享
    takeEvery(DDLAUNCHEVENT_REQ, httpDDLAUNCHEVENT_REQ), // 发布口令活动
    takeEvery(DDLISTACTIVITIES_REQ, httpDDLISTACTIVITIES_REQ), // 叮咚令活动列表
    takeEvery(GENERATE_REQ, httpGENERATE_REQ), // 生成口令
    takeEvery(DDCREATE_REQ, httpDDCREATE_REQ), // 保存创建叮咚令
    takeEvery(SHELVES_REQ, httpSHELVES_REQ), // 活动下架
    takeEvery(GETCOUPONS_REQ, httpGETCOUPONS_REQ), // 进入创建获取优惠券
    takeEvery(ELISTACTIVITIES_REQ, httpELISTACTIVITIES_REQ), // 代言令活动列表
    takeEvery(REVIEWDETAILS_REQ, httpREVIEWDETAILS_REQ), // 审核详情
    takeEvery(DISTRIBUTIONGIFT_REQ, httpDISTRIBUTIONGIFT_REQ), // 发放礼品
    takeEvery(ISSUERECORD_REQ, httpISSUERECORD_REQ), // 发放记录
    takeEvery(TERMINATION_REQ, httpTERMINATION_REQ), // 解约确认
    takeEvery(CREATEACTIVITY_REQ, httpCREATEACTIVITY_REQ), // 创建活动
  ]);
}
