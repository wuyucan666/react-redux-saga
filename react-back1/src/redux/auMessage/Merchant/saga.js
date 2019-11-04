import { all, call, put, takeLatest } from 'redux-saga/effects';
// import { Message } from '@alifd/next';
import {
  AU_MESSAGE_CONDITION,
  AU_MESSAGE_RESULT,
  EDITMESSAGE,
  EDITMESSAGE_RESULT,
  EDITMESSAGE_DETAILS,
  EDITMESSAGE_DETAILS_RESULT,
} from './constants';
import nw from '../../../common/http/post';

// 请求
const postUrlData = (param) => {
  return nw.post('/', param, (res) => {});
};


export function* httpAuMerchant(action) {
  const { parmas } = action;
  console.log(123);
  // parmas.limit = 20
  try {
    const response = yield call(postUrlData, parmas);
    yield put({
      type: AU_MESSAGE_RESULT,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpEDITMESSAGE(action) {
  // console.log(action)
  const { parmas } = action;
  console.log(parmas);
  try {
    const response = yield call(postUrlData, parmas);
    yield put({
      type: EDITMESSAGE_RESULT,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpEDITMESSAGE_DETAILS(action) {
  const { id } = action;
  try {
    const response = yield call(postUrlData, id);
    yield put({
      type: EDITMESSAGE_DETAILS_RESULT,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}




export default function* root() {
  yield all([
    takeLatest(AU_MESSAGE_CONDITION, httpAuMerchant),
    takeLatest(EDITMESSAGE, httpEDITMESSAGE),
    takeLatest(EDITMESSAGE_DETAILS, httpEDITMESSAGE_DETAILS),
  ]);
}
