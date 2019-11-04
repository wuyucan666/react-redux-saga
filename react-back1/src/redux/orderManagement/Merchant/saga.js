import { all, call, put, takeLatest } from 'redux-saga/effects';
import { changeTimestamp } from '../../../common/js/common';
// import { Message } from '@alifd/next';
import {
  WEIPAI_ORDER_CONDITION,
  WEIPAI_ORDER_RESULT,
  WEIPAI_ORDER_DETAILS,
  WEIPAI_ORDER_DETAILS_RESULT,
  WEIPAI_ORDER_INFO,
  WEIPAI_ORDER_INFO_RESULT,
  GROUP_ORDER_DETAIL_PASS,
  GROUP_ORDER_DETAIL_FAIL,
  GROUP_ORDER_DETAIL_PASS_RES,
  GROUP_ORDER_DETAIL_FAIL_RES,
  GROUPBUY_ORDER_DETAILS_RESULT,
  MODIFY_COMMIT_GB_REQ,
  MODIFY_COMMIT_GB_RES,
  MODIFY_RECORD_GB_REQ,
  MODIFY_RECORD_GB_RES,
  ORDER_LIST_EXPORT_DATA,
  EXPORT_DATA_SUCCESS,
} from './constants';
import nw from '../../../common/http/post';

// 请求
const postUrlData = (param) => {
  return nw.post('/', param, (res) => {
    if([22007,22008].includes(res.pid)){
    }else if(res.data.list!==undefined){
      if(res.data.list == null) res.data.list = []
    }
  });
};

export function* httpWpORDER(action) {
  const { parmas } = action;
  let newParmas = Object.assign({}, parmas);
  if (parmas.date !== undefined) {
    if (parmas.date.length !== 0) {
      const startTime = parmas.date[0]._d.valueOf() / 1000;
      const endTime = parmas.date[1]._d.valueOf() / 1000;
      parmas.startTime = startTime;
      parmas.endTime = endTime;
      newParmas = Object.assign({}, parmas);
      delete newParmas.date;
    }else {
      parmas.startTime = 0;
      parmas.endTime = 0;
    }
  }
  try {
    const response = yield call(postUrlData, newParmas);
    yield put({
      type: WEIPAI_ORDER_RESULT,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpWpDetail(action) {
  const { parmas } = action;
  if (parmas.pid == 20351) {
    try {
      const response = yield call(postUrlData, parmas);
      yield put({
        type: GROUPBUY_ORDER_DETAILS_RESULT,
        response,
      });
    }
    catch (err) {
      console.log(err);
    }
  } else {
    try {
      const response = yield call(postUrlData, parmas);
      yield put({
        type: WEIPAI_ORDER_DETAILS_RESULT,
        response,
      });
    }
    catch (err) {
      console.log(err);
    }
  }

}
export function* httpWpInfo(action) {
  const { parmas } = action;
  // console.log(parmas)
  try {
    const response = yield call(postUrlData, parmas);
    yield put({
      type: WEIPAI_ORDER_INFO_RESULT,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}
// 团购通过，pid写于请求action传值
export function* httpPassOrder(action) {
  const { val } = action;
  try {
    const response = yield call(postUrlData, val);
    // console.log(response)
    yield put({
      type: GROUP_ORDER_DETAIL_PASS_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}
// 团购驳回，pid写于请求action传值
export function* httpTrunOffOrder(action) {
  const { val } = action;
  try {
    const response = yield call(postUrlData, val);
    // console.log(response)
    yield put({
      type: GROUP_ORDER_DETAIL_FAIL_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpModifyCommit(action) {
  try {
    const response = yield call(postUrlData, action.parmas);
    yield put({
      type: MODIFY_COMMIT_GB_RES,
      response,
    });
  }
  catch (err) {
    yield put({
      type: MODIFY_COMMIT_GB_RES,
      response: err,
    });
  }
}

export function* httpModifyRecord(action) {
  try {
    const response = yield call(postUrlData, action.parmas);
    yield put({
      type: MODIFY_RECORD_GB_RES,
      response,
    });
  }
  catch (err) {
    yield put({
      type: MODIFY_RECORD_GB_RES,
      response: err,
    });
  }
}

export function* httpOut(action) {
  const { parmas } = action;
  console.log(parmas, 'parmas');
  const newParmas = changeTimestamp(parmas);
  try {
    const response = yield call(postUrlData, newParmas);
    // console.log(response);
    yield put({
      type: EXPORT_DATA_SUCCESS,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}
// export function* httpDELETE_INVITE_USER(action) {
//   try {
//     const response = yield call(postUrlData,action.id);
//       yield put({
//         type: DELETE_INVITE_USER_RESULT,
//         response
//       })
//   }
//   catch (err) {
//     console.log(err);
//   }
// }

// export function* httpUPDATE_INVITE_USER(action) {
//   console.log(action)
//   try {
//     const response = yield call(postUrlData,action.parmas);
//     // console.log(response);
//       yield put({
//         type: UPDATE_INVITE_USER_RESULT,
//         response
//       })
//   }
//   catch (err) {
//     console.log(err);
//   }
// }

// export function* httpACCOUNT_INVITE_USER(action) {
//   try {
//     const response = yield call(postUrlData,action.parmas);
//       yield put({
//         type: ACCOUNT_INVITE_USER_RESULT,
//         response
//       })
//   }
//   catch (err) {
//     console.log(err);
//   }
// }




export default function* root() {
  yield all([
    takeLatest(WEIPAI_ORDER_CONDITION, httpWpORDER),
    takeLatest(WEIPAI_ORDER_DETAILS, httpWpDetail),
    takeLatest(WEIPAI_ORDER_INFO, httpWpInfo),
    takeLatest(GROUP_ORDER_DETAIL_PASS, httpPassOrder),
    takeLatest(GROUP_ORDER_DETAIL_FAIL, httpTrunOffOrder),
    // takeLatest(DELETE_INVITE_USER_CONDITION, httpDELETE_INVITE_USER),
    // takeLatest(UPDATE_INVITE_USER_CONDITION, httpUPDATE_INVITE_USER),
    // takeLatest(ACCOUNT_INVITE_USER_CONDITION, httpACCOUNT_INVITE_USER),
    takeLatest(MODIFY_COMMIT_GB_REQ, httpModifyCommit),
    takeLatest(MODIFY_RECORD_GB_REQ, httpModifyRecord),
    takeLatest(ORDER_LIST_EXPORT_DATA, httpOut),
  ]);
}
