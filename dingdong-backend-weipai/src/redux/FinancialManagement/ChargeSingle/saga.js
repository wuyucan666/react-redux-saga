import { all, call, put, takeLatest } from 'redux-saga/effects';
// import { Message } from '@alifd/next';
import {
  CHARGE_SINGLE_CONDITION,
  CHARGE_SINGLE_RESULT,
  CHARGE_SINGLE_INFO_REQ,
  CHARGE_SINGLE_INFO_RES
} from './constants';
import nw from '../../../common/http/post'

//请求
const postUrlData =(param) => {
  return nw.post('/',param,function (res) {})
}



export function* httpSingle(action) {
  const {parmas} = action
  let newParmas = Object.assign({},parmas)
  if(parmas.transTime!==undefined){
    let transTime = parmas.transTime._d.valueOf()/1000
    newParmas.transTime = transTime
    // console.log(parmas)
  }
  try {
    const response = yield call(postUrlData,newParmas);
    // console.log(response);
      yield put({
        type: CHARGE_SINGLE_RESULT,
        response
      })
  } 
  catch (err) {
    console.log(err);
  }
}

export function* httpInfo(action) {
  const {parmas} = action
  // console.log(parmas);
  try {
    const response = yield call(postUrlData,parmas);
    // console.log(response);
      yield put({
        type: CHARGE_SINGLE_INFO_RES,
        response
      })
  } 
  catch (err) {
    console.log(err);
  }
}


export default function* root() {
  yield all([
    takeLatest(CHARGE_SINGLE_CONDITION, httpSingle),
    takeLatest(CHARGE_SINGLE_INFO_REQ, httpInfo),
  ]);
}