import { all, call,takeEvery, put, takeLatest } from 'redux-saga/effects';
// import { Message } from '@alifd/next';
import {changeTimestamp} from '../../common/js/common'
import {
    USER_INTEGRAL_CONDITION,
    USER_INTEGRAL_RESULT,
    USER_ACCOUNT_FREEZE_RECORD_REQ,
    USER_ACCOUNT_FREEZE_RECORD_RES,
    USER_ACCOUNT_FREEZE_RECORD_HANDLE_REQ,
    USER_ACCOUNT_FREEZE_RECORD_HANDLE_RES,
} from './constants';
import nw from '../../common/http/post'

//请求
const postUrlData =(param) => {
  console.log(param)
  return nw.post('/',param,function (res) {})
}



export function* httpAccount(action) {
  console.log(action)
  const {parmas} = action
  const newParmas = changeTimestamp(parmas)
  // console.log(newParmas);
  
  try {
    const response = yield call(postUrlData,newParmas);
    yield put({
      type: USER_INTEGRAL_RESULT,
      response
    })
    
  } 
  catch (err) {
    console.log(err);
  }
}

// export function* httpFreezeRecord(action) {
//   const {parmas} = action
//   const newParmas = changeTimestamp(parmas)
  
//   try {
//     const response = yield call(postUrlData,newParmas);
//     // console.log(response);
//       yield put({
//         type: USER_ACCOUNT_FREEZE_RECORD_RES,
//         response
//       })
//   } 
//   catch (err) {
//     console.log(err);
//   }
// }
// export function* httpFreezeHandle(action) {
//   const {parmas} = action
//   // console.log(parmas)
//   try {
//     const response = yield call(postUrlData,parmas);
//     // console.log(response);
//     yield put({
//       type: USER_ACCOUNT_FREEZE_RECORD_HANDLE_RES,
//       response
//     })
//   } 
//   catch (err) {
//     yield put({
//       type: USER_ACCOUNT_FREEZE_RECORD_HANDLE_RES,
//       response:err
//     })
//   }
// }

export default function* root() {
  yield all([
    takeLatest(USER_INTEGRAL_CONDITION, httpAccount),
    // takeEvery(USER_ACCOUNT_FREEZE_RECORD_REQ, httpFreezeRecord),
    // takeEvery(USER_ACCOUNT_FREEZE_RECORD_HANDLE_REQ, httpFreezeHandle),
  ]);
}