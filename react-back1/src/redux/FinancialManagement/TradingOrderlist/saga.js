import { all, call, put, takeLatest } from 'redux-saga/effects';
// import { Message } from '@alifd/next';
import {changeTimestamp} from '../../../common/js/common'
import {
  TRADING_ORDER_CONDITION,
  TRADING_ORDER_RESULT,
  TRADING_ORDER_DETAIL_SN,
  TRADING_ORDER_DETAIL_CONTENT,
  TRADING_ORDER_EXPORT_DATA,
  TRADING_ORDER_EXPORT_DATA_SUCCESS
} from './constants';
import nw from '../../../common/http/post'

//请求
const postUrlData =(param) => {
  return nw.post('/',param)
}

export function* httpTrading(action) {
  const {parmas} = action
  const newParmas = changeTimestamp(parmas)
  // console.log(newParmas)
  try {
    const response = yield call(postUrlData,newParmas);
    // console.log(response);
      yield put({
        type: TRADING_ORDER_RESULT,
        response
      })
  } 
  catch (err) {
    console.log(err);
  }
}

export function* httpTradingDetail(action) {
  const {parmas} = action
  parmas.pid = 20216
  try {
    const response = yield call(postUrlData,parmas);
    // console.log(response);
      yield put({
        type: TRADING_ORDER_DETAIL_CONTENT,
        response
      })
  } 
  catch (err) {
    console.log(err);
  }
}

export function* httpExport(action) {
  const {parmas} = action
  const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData,newParmas);
    // console.log(response);
      yield put({
        type: TRADING_ORDER_EXPORT_DATA_SUCCESS,
        response
      })
  } 
  catch (err) {
    console.log(err);
  }
}


export default function* root() {
  yield all([
    takeLatest(TRADING_ORDER_CONDITION, httpTrading),
    takeLatest(TRADING_ORDER_DETAIL_SN, httpTradingDetail),
    takeLatest(TRADING_ORDER_EXPORT_DATA, httpExport),
  ]);
}