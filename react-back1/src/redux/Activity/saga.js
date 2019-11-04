import { all, call,takeEvery, put, takeLatest } from 'redux-saga/effects';
// import { Message } from '@alifd/next';
import {changeTimestamp} from '../../common/js/common'
import {
    USER_ACCOUNT_CONDITION,
    USER_ACCOUNT_RESULT,
    USER_ACCOUNT_FREEZE_RECORD_REQ,
    USER_ACCOUNT_FREEZE_RECORD_RES,
    USER_ACCOUNT_FREEZE_RECORD_HANDLE_REQ,
    USER_ACCOUNT_FREEZE_RECORD_HANDLE_RES,
    

    ACTIVITYLIST_REQ,
    RAFFLELIST_REQ,
    REGISTEREDLIST_REQ,
    INVITATIONLIST_REQ,
    SHOOTLIST_REQ,
    ISSUEDETAILS_REQ,
    REGISTEREDDETAILS_REQ,
    INVITATIONDETAILS_REQ,	
    INVITATIONADDITIONALDETAILS_REQ,
    SHOOTDETAILS_REQ,
    LOGISTICS_REQ,
    REMIND_REQ,
    ACT_DETAIL_REQ,
    ACT_DETAIL_HANDLE_REQ,

    ACT_DETAIL_HANDLE_RES,
    ACT_DETAIL_RES,
    ACTIVITYLIST_RES,
    RAFFLELIST_RES,
    REGISTEREDLIST_RES,
    INVITATIONLIST_RES,
    SHOOTLIST_RES,
    ISSUEDETAILS_RES,
    REGISTEREDDETAILS_RES,
    INVITATIONDETAILS_RES,
    INVITATIONADDITIONALDETAILS_RES,
    SHOOTDETAILS_RES,
    LOGISTICS_RES,
    REMIND_RES
} from './constants';
import nw from '../../common/http/post'

//请求
const postUrlData =(param) => {
  return nw.post('/',param,function (res) {})
}



export function* httpAccount(action) {
  const {parmas} = action
  const newParmas = changeTimestamp(parmas)
  // console.log(newParmas);
  
  try {
    const response = yield call(postUrlData,newParmas);
    yield put({
      type: USER_ACCOUNT_RESULT,
      response
    })
  } 
  catch (err) {
    console.log(err);
  }
}


export function* httpSHOOTLIST_REQ(action) {
  const {parmas} = action
  const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData,newParmas);
    yield put({
      type: SHOOTLIST_RES,
      response
    })
  } 
  catch (err) {
    console.log(err);
  }
}

export function* httpSHOOTDETAILS_REQ(action) {
  const {parmas} = action
  // const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData,parmas);
    yield put({
      type: SHOOTDETAILS_RES,
      response
    })
  } 
  catch (err) {
    console.log(err);
  }
}

export function* httpREGISTEREDLIST_REQ(action) {
  const {parmas} = action
  const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData,newParmas);
    yield put({
      type: REGISTEREDLIST_RES,
      response
    })
  } 
  catch (err) {
    console.log(err);
  }
}

export function* httpREGISTEREDDETAILS_REQ(action) {
  const {parmas} = action
  // const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData,parmas);
    yield put({
      type: REGISTEREDDETAILS_RES,
      response
    })
  } 
  catch (err) {
    console.log(err);
  }
}
export function* httpACT_DETAIL(action) {
  const {parmas} = action
  try {
    const response = yield call(postUrlData,parmas);
    yield put({
      type: ACT_DETAIL_RES,
      response
    })
  } 
  catch (err) {
    console.log(err);
  }
}

export function* httpINVITATIONLIST_REQ(action) {
  const {parmas} = action
  const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData,newParmas);
    yield put({
      type: INVITATIONLIST_RES,
      response
    })
  } 
  catch (err) {
    console.log(err);
  }
}

export function* httpINVITATIONDETAILS_REQ(action) {
  const {parmas} = action
  // const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData,parmas);
    yield put({
      type: INVITATIONDETAILS_RES,
      response
    })
  } 
  catch (err) {
    console.log(err);
  }
}

export function* httpINVITATIONADDITIONALDETAILS_REQ(action) {
  const {parmas} = action
  // const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData,parmas);
    yield put({
      type: INVITATIONADDITIONALDETAILS_RES,
      response
    })
  } 
  catch (err) {
    console.log(err);
  }
}


export function* httpRAFFLELIST_REQ(action) {
  const {parmas} = action
  const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData,newParmas);
    yield put({
      type: RAFFLELIST_RES,
      response
    })
  } 
  catch (err) {
    console.log(err);
  }
}

export function* httpISSUEDETAILS_REQ(action) {
  const {parmas} = action
  // const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData,parmas);
    yield put({
      type: ISSUEDETAILS_RES,
      response
    })
  } 
  catch (err) {
    console.log(err);
  }
}


export function* httpACTIVITYLIST_REQ(action) {
  const {parmas} = action
  const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData,newParmas);
    yield put({
      type: ACTIVITYLIST_RES,
      response
    })
  } 
  catch (err) {
    console.log(err);
  }
}


export function* httpLOGISTICS_REQ(action) {
  const {parmas} = action
  // const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData,parmas);
    yield put({
      type: LOGISTICS_RES,
      response
    })
  } 
  catch (err) {
    console.log(err);
  }
}


export function* httpREMIND_REQ(action) {
  const {parmas} = action
  // const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData,parmas);
    yield put({
      type: REMIND_RES,
      response
    })
  } 
  catch (err) {
    console.log(err);
  }
}

export function* httpACT_DETAIL_HANDLE(action) {
  const {parmas} = action
  // const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData,parmas);
    yield put({
      type: ACT_DETAIL_HANDLE_RES,
      response
    })
  } 
  catch (err) {
    console.log(err);
  }
}


export default function* root() {
  yield all([
    takeEvery(USER_ACCOUNT_CONDITION, httpAccount),

    takeEvery(SHOOTLIST_REQ, httpSHOOTLIST_REQ),//送拍有礼
    takeEvery(SHOOTDETAILS_REQ, httpSHOOTDETAILS_REQ),//详情

    takeEvery(REGISTEREDLIST_REQ, httpREGISTEREDLIST_REQ),//注册有礼
    takeEvery(REGISTEREDDETAILS_REQ, httpREGISTEREDDETAILS_REQ),//详情

    takeEvery(INVITATIONLIST_REQ, httpINVITATIONLIST_REQ),//邀请有礼
    takeEvery(INVITATIONDETAILS_REQ, httpINVITATIONDETAILS_REQ),//邀请有礼基础
    takeEvery(INVITATIONADDITIONALDETAILS_REQ, httpINVITATIONADDITIONALDETAILS_REQ),//邀请有礼额外

    takeEvery(RAFFLELIST_REQ, httpRAFFLELIST_REQ),//大转盘
    takeEvery(ISSUEDETAILS_REQ, httpISSUEDETAILS_REQ),//详情

    takeEvery(ACTIVITYLIST_REQ, httpACTIVITYLIST_REQ),//活动列表

    takeEvery(LOGISTICS_REQ, httpLOGISTICS_REQ),//填写物流

    takeEvery(REMIND_REQ, httpREMIND_REQ),//填写物流
    
    takeEvery(ACT_DETAIL_REQ, httpACT_DETAIL),//审核详情
    takeEvery(ACT_DETAIL_HANDLE_REQ, httpACT_DETAIL_HANDLE),//审核详情操作
  ]);
}