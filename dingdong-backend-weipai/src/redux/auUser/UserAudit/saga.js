import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
// import { Message } from '@alifd/next';
import { Message } from '@alifd/next';
import { changeTimestamp } from '../../../common/js/common';
import {
  USER_AUDIT_CONDITION,
  USER_AUDIT_RESULT,
  USER_AUDIT_AGREEDID,
  USER_LIST_CONDITION,
  USER_LIST_RESULT,
  USER_AUDIT_RESULT_SUCCE,
  USER_DETAIL_CONDITION,
  USER_DETAIL_RESULT,
  DELETE_INVITE_USER_CONDITION,
  DELETE_INVITE_USER_RESULT,
  UPDATE_INVITE_USER_CONDITION,
  UPDATE_INVITE_USER_RESULT,
  ACCOUNT_INVITE_USER_CONDITION,
  ACCOUNT_INVITE_USER_RESULT,
  USER_INFORMATION_1CONDITION,
  USER_INFORMATION_1RESULT,
  USER_INFORMATION_2CONDITION,
  USER_INFORMATION_2RESULT,
  USER_INFORMATION_3CONDITION,
  USER_INFORMATION_3RESULT,
  INVITATION_CONDITION,
  INVITATION_RESULT,
  PRIVACY_CONDITION,
  PRIVACY_RESULT,
  DASHBOARD_CONDITION,
  DASHBOARD_RESULT,
  ADD_USER_CONMIT,
  ADDUSER_RESULT,
  ADD_USER_CONMIT_CHECKID,
  CHECKID_RESULT,
} from './constants';
import nw from '../../../common/http/post';

// 请求
const postUrlData = (param) => {
  return nw.post('/', param, (res) => {
    if ([20110, 20107, 20112, 20109, 20112].includes(res.pid)) {
      if (res.errorCode == 0) {
        Message.error('操作成功');
      }
      if (res.data == null) res.data = [];
    } else {
      if (res.data.list !== undefined || res.data.detail !== undefined) {
        if (res.data.list == null || res.data.list == '') {
          if ([20100, 20105, 20115, 20116, 20111, 20103].includes(res.pid)) {
          } else {
            Message.error('未搜索到数据');
          }
          res.data.list = [];
        }
      }
      if (res.data.detail !== undefined) {
        if (res.data.detail == null || res.data.detail == '') {
          Message.error('未搜索到数据');
          res.data.detail = [];
        }
      }
    }
  });
};

const q = (param) => {
  return nw.post('/', param, (res) => {
    if (res.pid == '20121' || res.pid == '20122') {
      if (res.errorCode == 0) {
        Message.success('操作成功');
      }
      if (res.data == null) res.data = {};
    }
  });
};

export function* httpSingle(action) {
  const { parmas } = action;
  // console.log(parmas);
  // parmas.pid = 108
  if (parmas.created !== undefined) {
    const created = parmas.created._d.valueOf() / 1000;
    parmas.created = created;
    console.log(parmas);
  }
  try {
    const response = yield call(postUrlData, parmas);
    // console.log(response);
    yield put({
      type: USER_AUDIT_RESULT,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}


export function* httpAGREEDID(action) {
  console.log(action);
  try {
    const response = yield call(postUrlData, action.id);
    // console.log(response);
    yield put({
      type: USER_AUDIT_RESULT_SUCCE,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}


export function* httpUSERLIST(action) {
  const { parmas } = action;
  const newParmas = changeTimestamp(parmas);
  // console.log(parmas);
  // parmas.pid = 108
  if (parmas.created !== undefined) {
    const created = parmas.created._d.valueOf() / 1000;
    parmas.created = created;
    console.log(parmas);
  }
  try {
    const response = yield call(postUrlData, newParmas);
    console.log(response);
    yield put({
      type: USER_LIST_RESULT,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}


export function* httpUSERDETAIL(action) {
  const { parmas } = action;
  // console.log(parmas);
  // parmas.pid = 108
  if (parmas.created !== undefined) {
    const created = parmas.created._d.valueOf() / 1000;
    parmas.created = created;
    console.log(parmas);
  }
  try {
    const response = yield call(postUrlData, parmas);
    yield put({
      type: USER_DETAIL_RESULT,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}


export function* httpDELETE_INVITE_USER(action) {
  try {
    const response = yield call(postUrlData, action.id);
    yield put({
      type: DELETE_INVITE_USER_RESULT,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpUPDATE_INVITE_USER(action) {
  console.log(action);
  try {
    const response = yield call(postUrlData, action.parmas);
    // console.log(response);
    yield put({
      type: UPDATE_INVITE_USER_RESULT,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpACCOUNT_INVITE_USER(action) {
  try {
    const response = yield call(postUrlData, action.parmas);
    yield put({
      type: ACCOUNT_INVITE_USER_RESULT,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpUSER_INFORMATION1(action) {
  console.log(action);
  try {
    const response = yield call(postUrlData, action.parmas);
    yield put({
      type: USER_INFORMATION_1RESULT,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpUSER_INFORMATION2(action) {
  console.log(action);
  try {
    const response = yield call(postUrlData, action.parmas);
    yield put({
      type: USER_INFORMATION_2RESULT,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpUSER_INFORMATION3(action) {
  console.log(action);
  try {
    const response = yield call(postUrlData, action.parmas);
    yield put({
      type: USER_INFORMATION_3RESULT,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpINVITATION(action) {
  const { parmas } = action;
  const newParmas = changeTimestamp(parmas);
  console.log(action);
  console.log(newParmas);
  // console.log(parmas);
  // parmas.pid = 108
  if (parmas.created !== undefined) {
    const created = parmas.created._d.valueOf() / 1000;
    parmas.created = created;
  }
  try {
    const response = yield call(postUrlData, newParmas);
    // console.log(response);
    yield put({
      type: INVITATION_RESULT,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}


export function* httpPRIVACY(action) {
  const { parmas } = action;
  // console.log(parmas);
  // parmas.pid = 108
  if (parmas.created !== undefined) {
    const created = parmas.created._d.valueOf() / 1000;
    parmas.created = created;
    // console.log(parmas)
  }
  try {
    const response = yield call(postUrlData, parmas);
    // console.log(response);
    yield put({
      type: PRIVACY_RESULT,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpDASHBOARD(action) {
  try {
    const response = yield call(postUrlData, action.val);
    // console.log(response);
    yield put({
      type: DASHBOARD_RESULT,
      response,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpAddUser(action) {
  try {
    const response = yield call(q, action.parmas);
    // console.log('response', response);
    yield put({
      type: ADDUSER_RESULT,
      response: response.data,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export function* httpCheckId(action) {
  try {
    const response = yield call(q, action.parmas);
    // console.log('response', response);
    yield put({
      type: CHECKID_RESULT,
      response: response.data,
    });
  }
  catch (err) {
    console.log(err);
  }
}

export default function* root() {
  yield all([
    takeLatest(USER_AUDIT_CONDITION, httpSingle),
    takeLatest(USER_AUDIT_AGREEDID, httpAGREEDID),
    takeLatest(USER_LIST_CONDITION, httpUSERLIST),
    takeLatest(USER_DETAIL_CONDITION, httpUSERDETAIL),
    takeLatest(DELETE_INVITE_USER_CONDITION, httpDELETE_INVITE_USER),
    takeLatest(UPDATE_INVITE_USER_CONDITION, httpUPDATE_INVITE_USER),
    takeLatest(ACCOUNT_INVITE_USER_CONDITION, httpACCOUNT_INVITE_USER),
    takeLatest(USER_INFORMATION_1CONDITION, httpUSER_INFORMATION1),
    takeLatest(USER_INFORMATION_2CONDITION, httpUSER_INFORMATION2),
    takeLatest(USER_INFORMATION_3CONDITION, httpUSER_INFORMATION3),
    takeLatest(INVITATION_CONDITION, httpINVITATION),
    takeEvery(PRIVACY_CONDITION, httpPRIVACY),
    takeEvery(DASHBOARD_CONDITION, httpDASHBOARD),
    takeLatest(ADD_USER_CONMIT, httpAddUser),
    takeLatest(ADD_USER_CONMIT_CHECKID, httpCheckId),
  ]);
}
