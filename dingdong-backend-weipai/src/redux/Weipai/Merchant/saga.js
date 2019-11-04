import { all, call,fork, put, takeLatest,takeEvery } from 'redux-saga/effects';
// import { Message } from '@alifd/next';
import {changeTimestamp} from '../../../common/js/common'
import {
  WEIPAI_MERCHANT_CONDITION,
  WEIPAI_MERCHANT_RESULT,
  WEIPAI_MERCHANT_DETAIL_SN,
  WEIPAI_MERCHANT_DETAIL_SN_SS,
  WEIPAI_MERCHANT_DETAIL_SN_SI,
  WEIPAI_MERCHANT_DETAIL_SN_IL,
  WEIPAI_MERCHANT_DETAIL_SN_ALL,
  WEIPAI_MERCHANT_DETAIL_CONTENT_ALL,
  WEIPAI_MERCHANT_DETAIL_CONTENT,
  WEIPAI_MERCHANT_DETAIL_CONTENT_SS,
  WEIPAI_MERCHANT_DETAIL_CONTENT_SI,
  WEIPAI_MERCHANT_DETAIL_CONTENT_IL,
  WEIPAI_MERCHANT_DETAIL_PASS,
  WEIPAI_MERCHANT_DETAIL_PASS_RES,
  WEIPAI_MERCHANT_DETAIL_PASS_RES1,
  WEIPAI_MERCHANT_DETAIL_PASS1,
  WEIPAI_MERCHANT_DETAIL_FAIL,
  WEIPAI_MERCHANT_DETAIL_FAIL_RES,
  DELETE_INVITE_USER_CONDITION1,
  DELETE_INVITE_USER_RESULT1,
  UPDATE_INVITE_USER_CONDITION1,
  UPDATE_INVITE_USER_RESULT1,
  ACCOUNT_INVITE_USER_CONDITION1,
  ACCOUNT_INVITE_USER_RESULT1,
  WITHDRAW_AUCTION_LIST_REQ,
  WITHDRAW_AUCTION_DISPLAY_REQ,
  WITHDRAW_AUCTION_SORT_REQ,
  WITHDRAW_AUCTION_LIST_RES,
  WITHDRAW_AUCTION_DISPLAY_RES,
  WITHDRAW_AUCTION_SORT_RES,
  MODIFY_COMMIT_REQ,
  MODIFY_COMMIT_RES,
  MODIFY_RECORD_REQ,
  MODIFY_RECORD_RES,
} from './constants';
import nw from '../../../common/http/post'

//请求
const postUrlData =(param) => {
  return nw.post('/',param,function (res) {
    // console.log(param);
    if(res.pid===20407){
      if(res.data==null) res.data=[]
    }
    // if(res.data.list!==undefined){
    //   if(res.data.list == null) {
    //     res.data.list = []
    //     }
    //   }
  })
}



export function* httpWpMerchant(action) {
  const {parmas} = action
  parmas.limit = 20
  try {
    const response = yield call(postUrlData,parmas);
      yield put({
        type: WEIPAI_MERCHANT_RESULT,
        response
      })
  } 
  catch (err) {
    console.log(err);
  }
}


export function* httpWpMerchantDetailAll(action) {
  const {parmas} = action
  try {
    const response = yield call(postUrlData,{
      pid:20405,
      shopId:parmas.shopId
    });
    // const response1 = yield call(postUrlData,{
    //   pid:20408,
    //   shopId:parmas.shopId
    // });
    const response3 = yield call(postUrlData,{
      pid:20103,
      uuid:parmas.uuid
    });
    // console.log(response,response1,response3);
    yield put({
      type: WEIPAI_MERCHANT_DETAIL_CONTENT_ALL,
      data:{
        baseInfo:response.data || {},
        statistics: {},
        sellerInfo:{},
        inviteList:response3.data || {}
      }
    })
    const response2 = yield call(postUrlData,{
      pid:20409,
      shopId:parmas.shopId
    });
    // console.log(response,response1,response2,response3);
      yield put({
        type: WEIPAI_MERCHANT_DETAIL_CONTENT_ALL,
        data:{
          baseInfo:response.data || {},
          statistics: {},
          sellerInfo:response2.data || {},
          inviteList:response3.data || {}
        }
      })
  } 
  catch (err) {
    console.log(err);
  }
}


export function* httpWpMerchantDetail(action) {
  const {parmas} = action
  let auction =false
  if(parmas.pid ==20301){
    auction =true
  }
  try {
    const response = yield call(postUrlData,parmas);
    // console.log(response);
      yield put({
        type: WEIPAI_MERCHANT_DETAIL_CONTENT,
        response,
        auction
      })
  } 
  catch (err) {
    console.log(err);
  }
}
export function* httpWpMerchantDetailSs(action) {
  const {parmas} = action
  try {
    const response = yield call(postUrlData,parmas);
    // console.log(response);
      yield put({
        type: WEIPAI_MERCHANT_DETAIL_CONTENT_SS,
        response,
      })
  } 
  catch (err) {
    console.log(err);
  }
}
export function* httpWpMerchantDetailSi(action) {
  const {parmas} = action
  try {
    const response = yield call(postUrlData,parmas);
    // console.log(response);
      yield put({
        type: WEIPAI_MERCHANT_DETAIL_CONTENT_SI,
        response,
      })
  } 
  catch (err) {
    console.log(err);
  }
}
export function* httpWpMerchantDetailIl(action) {
  const {parmas} = action
  try {
    const response = yield call(postUrlData,parmas);
    // console.log(response);
      yield put({
        type: WEIPAI_MERCHANT_DETAIL_CONTENT_IL,
        response,
      })
  } 
  catch (err) {
    console.log(err);
  }
}


export function* httpPassOrder(action) {
  const {val} = action
  try {
    const response = yield call(postUrlData,val);
    // console.log(response)
      yield put({
        type: WEIPAI_MERCHANT_DETAIL_PASS_RES,
        response,
        types:val.type
      })
  } 
  catch (err) {
    console.log(err);
  }
}

export function* httpPassOrder1(action) {
  const {val} = action
  try {
    const response = yield call(postUrlData,val);
    // console.log(response)
      yield put({
        type: WEIPAI_MERCHANT_DETAIL_PASS_RES1,
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
      yield put({
        type: WEIPAI_MERCHANT_DETAIL_FAIL_RES,
        response
      })
  } 
  catch (err) {
    console.log(err);
  }
}

export function* httpDELETE_INVITE_USER(action) {
  try {
    const response = yield call(postUrlData,action.id);
      yield put({
        type: DELETE_INVITE_USER_RESULT1,
        response
      })
  } 
  catch (err) {
    console.log(err);
  }
}

export function* httpUPDATE_INVITE_USER(action) {
  console.log(action)
  try {
    const response = yield call(postUrlData,action.parmas);
    // console.log(response);
      yield put({
        type: UPDATE_INVITE_USER_RESULT1,
        response
      })
  } 
  catch (err) {
    console.log(err);
  }
}

export function* httpACCOUNT_INVITE_USER(action) {
  try {
    const response = yield call(postUrlData,action.parmas);
      yield put({
        type: ACCOUNT_INVITE_USER_RESULT1,
        response
      })
  } 
  catch (err) {
    console.log(err);
  }
}

export function* httpSPlist(action) {
  // console.log(action);
  const newParmas = changeTimestamp(action.parmas)
  try {
    const response = yield call(postUrlData,newParmas);
      yield put({
        type: WITHDRAW_AUCTION_LIST_RES,
        response
      })
  } 
  catch (err) {
    yield put({
      type: WITHDRAW_AUCTION_LIST_RES,
      response:err
    })
  }
}

export function* httpSPDisply(action) {
  try {
    const response = yield call(postUrlData,action.parmas);
    yield put({
      type: WITHDRAW_AUCTION_DISPLAY_RES,
      response
    })
  } 
  catch (err) {
    yield put({
      type: WITHDRAW_AUCTION_DISPLAY_RES,
      response:err
    })
  }
}

export function* httpSPSort(action) {
  try {
    const response = yield call(postUrlData,action.parmas);
      yield put({
        type: WITHDRAW_AUCTION_SORT_RES,
        response
      })
  } 
  catch (err) {
    yield put({
      type: WITHDRAW_AUCTION_SORT_RES,
      response:err
    })
  }
}

export function* httpModifyCommit(action) {
  try {
    const response = yield call(postUrlData,action.parmas);
    // console.log(response)
      yield put({
        type: MODIFY_COMMIT_RES,
        response
      })
  } 
  catch (err) {
    // console.log(err)
    yield put({
      type: MODIFY_COMMIT_RES,
      response:err
    })
  }
}

export function* httpModifyRecord(action) {
  try {
    const response = yield call(postUrlData,action.parmas);
      yield put({
        type: MODIFY_RECORD_RES,
        response
      })
  } 
  catch (err) {
    yield put({
      type: MODIFY_RECORD_RES,
      response:err
    })
  }
}

export default function* root() {
  yield all([
    takeLatest(WEIPAI_MERCHANT_CONDITION, httpWpMerchant),
    takeLatest(WEIPAI_MERCHANT_DETAIL_SN_ALL, httpWpMerchantDetailAll),
    takeLatest(WEIPAI_MERCHANT_DETAIL_SN, httpWpMerchantDetail),
    takeLatest(WEIPAI_MERCHANT_DETAIL_SN_SS, httpWpMerchantDetailSs),
    takeLatest(WEIPAI_MERCHANT_DETAIL_SN_SI, httpWpMerchantDetailSi),
    takeLatest(WEIPAI_MERCHANT_DETAIL_SN_IL, httpWpMerchantDetailIl),
    takeLatest(WEIPAI_MERCHANT_DETAIL_PASS, httpPassOrder),
    takeLatest(WEIPAI_MERCHANT_DETAIL_PASS1, httpPassOrder1),
    takeLatest(WEIPAI_MERCHANT_DETAIL_FAIL, httpTrunOffOrder),
    takeLatest(DELETE_INVITE_USER_CONDITION1, httpDELETE_INVITE_USER),
    takeLatest(UPDATE_INVITE_USER_CONDITION1, httpUPDATE_INVITE_USER),
    takeLatest(ACCOUNT_INVITE_USER_CONDITION1, httpACCOUNT_INVITE_USER),
    takeLatest(WITHDRAW_AUCTION_LIST_REQ, httpSPlist),
    takeLatest(WITHDRAW_AUCTION_DISPLAY_REQ, httpSPDisply),
    takeLatest(WITHDRAW_AUCTION_SORT_REQ, httpSPSort),
    takeLatest(MODIFY_COMMIT_REQ, httpModifyCommit),
    takeLatest(MODIFY_RECORD_REQ, httpModifyRecord),
  ]);
}