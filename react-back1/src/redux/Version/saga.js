import { all, call,takeEvery, put, takeLatest } from 'redux-saga/effects';
// import { Message } from '@alifd/next';
import {changeTimestamp} from '../../common/js/common'
import {
    RELEASE_REQ,
    HISTORICALRECORDLIST_REQ,
    VERSIONDETAILS_REQ,

    RELEASE_RES,
    HISTORICALRECORDLIST_RES,
    VERSIONDETAILS_RES

} from './constants';
import nw from '../../common/http/post'

//请求
const postUrlData =(param) => {
  return nw.post('/',param,function (res) {})
}


export function* httpHISTORICALRECORDLIST_REQ(action) {
  const {parmas} = action
  const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData,newParmas);
    yield put({
      type: HISTORICALRECORDLIST_RES,
      response
    })
  } 
  catch (err) {
    console.log(err);
  }
}


export function* httpRELEASE_REQ(action) {
  const {parmas} = action
  // const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData,parmas);
    yield put({
      type: RELEASE_RES,
      response
    })
  } 
  catch (err) {
    console.log(err);
  }
}

export function* httpVERSIONDETAILS_REQ(action) {
  const {parmas} = action
  // const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData,parmas);
    yield put({
      type: VERSIONDETAILS_RES,
      response
    })
  } 
  catch (err) {
    console.log(err);
  }
}




export default function* root() {
  yield all([
   
    takeEvery(HISTORICALRECORDLIST_REQ, httpHISTORICALRECORDLIST_REQ),//版本历史记录
    takeEvery(RELEASE_REQ, httpRELEASE_REQ),//版本发布
    takeEvery(VERSIONDETAILS_REQ, httpVERSIONDETAILS_REQ),//版本详情
  ]);
}