import { all, call,fork, put, takeLatest } from 'redux-saga/effects';
import { Message } from '@alifd/next';
import {changeTimestamp} from '../../../common/js/common'
import {
    USER_PIPELINE_CONDITION,
    USER_PIPELINE_RESULT,
    USER_RECHARGE_CONDITION,
    USER_RECHARGE_RESULT,
    USER_PIPELINE_EXPORT,
    USER_PIPELINE_EXPORT_RESULT,
    USER_RECHARGE_EXPORT,
    USER_RECHARGE_EXPORT_RESULT,
    USER_CHARGE_DETAIL,
    USER_CHARGE_DETAIL_RES,
    USER_CHARGE_DETAIL_PASS,
    USER_CHARGE_DETAIL_PASS_RES,
    USER_CHARGE_DETAIL_FAIL,
    USER_CHARGE_DETAIL_FAIL_RES,
    USER_OFFLINE_SN,
    USER_OFFLINE_SN_RES,
    USER_OFFLINE_SN_PASS,
    USER_OFFLINE_SN_PASS_RES,
    USER_OFFLINE_SN_ARRIVAL_RES, // 确认到账
    USER_OFFLINE_SN_ARRIVAL

} from './constants';
import nw from '../../../common/http/post'
// import { variance } from '_simple-statistics@6.1.1@simple-statistics';

//请求
const postUrlData =(param) => {
  return nw.post('/',param,function (res) {
    // console.log(res);
    if(res!==null){
      if([20206,20207,20212,20213,30012,30013].includes(res.pid)){
        if(res.errorCode==0){
          Message.success(res.errorMsg)
          if (res.pid == 20212 || res.pid == 20213) {
            window.location.hash='financialManagement/OfflineList'
          } else if (res.pid == 30012 || res.pid == 30013){
            window.location.hash='financialManagement/ChargeSingle'
          } else {
            window.location.hash='financialManagement/UserPipelineQuery'
          }
        }
      }else{
        // if(res.data == null ){
        //   let data = {list:[]}
        //   console.log(data)
        //   return  res.data
        // }
        if(res.data.list!==undefined){
          if(res.data.list == null) {
            res.data.list = []
            Message.success('未搜索到数据')
          }
        }
      }
    }
  })
}



export function* httpPipeline(action) {
  const {parmas} = action
  parmas.pid = 20201
  parmas.limit = 20
  const newParmas = changeTimestamp(parmas)
  // console.log(newParmas)
  try {
    const response = yield call(postUrlData,newParmas);
    // Message.success('请求成功');
      yield put({
        type: USER_PIPELINE_RESULT,
        response
      })
  } 
  catch (err) {
    console.log(err);
    
  }
}

export function* httpRechargeline(action) {
  const {parmas} = action
  parmas.pid = 20203
  parmas.limit = 20
  const newParmas = changeTimestamp(parmas)
  try {
    const response = yield call(postUrlData,newParmas);
    // console.log(response);
    // Message.success('请求成功');
      yield put({
        type: USER_RECHARGE_RESULT,
        response
      })
  } 
  catch (err) {
    console.log(err);
  }
}

export function* httpPipeExport(action) {
  const {cond} = action
  // console.log(cond);
  if(cond.date!==undefined){
    let startTime = cond.date[0]._d.valueOf()/1000
    let endTime = cond.date[1]._d.valueOf()/1000
    cond.startTime = startTime
    cond.endTime = endTime
    delete cond['date']
    // console.log(cond)
  }
  try {
    const response = yield call(postUrlData,cond);
    // console.log(response)
      yield put({
        type: USER_PIPELINE_EXPORT_RESULT,
        response
      })
  } 
  catch (err) {
    // console.log(err);
  }
}

export function* httpEncExport(action) {
  const {cond} = action
  if(cond.date!==undefined){
    let startTime = cond.date[0]._d.valueOf()/1000
    let endTime = cond.date[1]._d.valueOf()/1000
    cond.startTime = startTime
    cond.endTime = endTime
    delete cond['date']
    // console.log(cond)
  }
  try {
    const response = yield call(postUrlData,cond);
    // console.log(response)
      yield put({
        type: USER_RECHARGE_EXPORT_RESULT,
        response
      })
  } 
  catch (err) {
    console.log(err);
  }
}



//公用详情列表请求，pid写于请求action传值
export function* httpChaDetail(action) {
  const {val} = action
  // val.pid = 208
  try {
    const response = yield call(postUrlData,val);
    // console.log(response)
      yield put({
        type: USER_CHARGE_DETAIL_RES,
        response
      })
  } 
  catch (err) {
    console.log(err);
  }
}
//公用通过，驳回，pid写于请求action传值
export function* httpPassOrder(action) {
  const {val} = action
  try {
    const response = yield call(postUrlData,val);
    // console.log(response)
      yield put({
        type: USER_CHARGE_DETAIL_PASS_RES,
        response
      })
  } 
  catch (err) {
    console.log(err);
  }
}

export function* httpTrunOffOrder(action) {
  const {val} = action
  try {
    const response = yield call(postUrlData,val);
    // console.log(response)
      yield put({
        type: USER_CHARGE_DETAIL_FAIL_RES,
        response
      })
  } 
  catch (err) {
    console.log(err);
  }
}


export function* httpOfflineSn(action) {
  const {val} = action
  val.pid = 211
  try {
    const response = yield call(postUrlData,val);
    // console.log(response)
      yield put({
        type: USER_OFFLINE_SN_RES,
        response
      })
  } 
  catch (err) {
    console.log(err);
  }
}


export function* httpPassSn(action) {
  const {val} = action
  val.pid = 212
  try {
    const response = yield call(postUrlData,val);
    // console.log(response)
      yield put({
        type: USER_OFFLINE_SN_PASS_RES,
        response
      })
  } 
  catch (err) {
    console.log(err);
  }
}

export function* httpOfflineSnArrival(action) {
  const {val} = action
  val.pid = 20226
  try {
    const response = yield call(postUrlData, val);
    yield put({
      type: USER_OFFLINE_SN_ARRIVAL_RES,
      response
    })
  } catch(err) {
    console.log(err);
  }
}


export default function* root() {
  yield all([
    takeLatest(USER_PIPELINE_CONDITION, httpPipeline),
    takeLatest(USER_RECHARGE_CONDITION, httpRechargeline),
    takeLatest(USER_PIPELINE_EXPORT, httpPipeExport),
    takeLatest(USER_RECHARGE_EXPORT, httpEncExport),
    takeLatest(USER_CHARGE_DETAIL, httpChaDetail),
    takeLatest(USER_CHARGE_DETAIL_PASS, httpPassOrder),
    takeLatest(USER_CHARGE_DETAIL_FAIL, httpTrunOffOrder),
    takeLatest(USER_OFFLINE_SN, httpOfflineSn),
    takeLatest(USER_OFFLINE_SN_PASS, httpPassSn),
    takeLatest(USER_OFFLINE_SN_ARRIVAL, httpOfflineSnArrival) // 
  ]);
}