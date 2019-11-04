import { all, call, put, takeLatest } from 'redux-saga/effects';
// import { Message } from '@alifd/next';
import {
  PERMISSION_ROLE_CONDITION,
  PERMISSION_ROLE_RESULT,
  PERMISSION_ROLE_DETAIL_SN,
  PERMISSION_ROLE_DETAIL_CONTENT,
  PERMISSION_ROLE_ADD_ROLE_PASS,
  PERMISSION_ROLE_ADD_ROLE_PASS_RES,
  PERMISSION_ASIDE_LIST,
  PERMISSION_ASIDE_LIST_RES,
  PERMISSION_ROLE_GET_PARENT_ROLE,
  PERMISSION_ROLE_GET_PARENT_ROLE_RES,
} from './constants';
import nw from '../../../common/http/post';

// 请求
const postUrlData = (param) => {
  if (param.pid == 20602) {
    return nw.post('/', param, (res) => {
      return res
    });
  }
  return nw.post('/', param, (res) => {
      return res
    });

};


export function* httpWpMerchant(action) {
  const { parmas } = action;
  const { pid } = action.parmas;
  try {
    const response = yield call(postUrlData, parmas);
    // console.log(response);
    yield put({
      type: PERMISSION_ROLE_RESULT,
      response,
      pid,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpWpMerchantDetail(action) {
  const { parmas } = action;
  const auction = false;
  try {
    const response = yield call(postUrlData, parmas);
    // console.log(response);
    yield put({
      type: PERMISSION_ROLE_DETAIL_CONTENT,
      response,
      auction,
    });
  }
  catch (err) {
    console.log(err);
  }
}


export function* httpPassOrder(action) {
  const { val } = action;
  try {
    const response = yield call(postUrlData, val);
    // console.log(response)
    yield put({
      type: PERMISSION_ROLE_ADD_ROLE_PASS_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpAsideList(action) {
  const { list } = action;
  try {
    const response = yield call(postUrlData, list);
    // console.log(response);
    yield put({
      type: PERMISSION_ASIDE_LIST_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpGetRole(action) {
  const { role } = action;
  try {
    const response = yield call(postUrlData, role);
    // console.log(response);
    yield put({
      type: PERMISSION_ROLE_GET_PARENT_ROLE_RES,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}


export default function* root() {
  yield all([
    takeLatest(PERMISSION_ROLE_CONDITION, httpWpMerchant),
    takeLatest(PERMISSION_ROLE_DETAIL_SN, httpWpMerchantDetail),
    takeLatest(PERMISSION_ROLE_ADD_ROLE_PASS, httpPassOrder),
    takeLatest(PERMISSION_ASIDE_LIST, httpAsideList),
    takeLatest(PERMISSION_ROLE_GET_PARENT_ROLE, httpGetRole),
  ]);
}
