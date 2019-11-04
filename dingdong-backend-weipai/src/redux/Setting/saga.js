import { all, call, put, takeLatest } from 'redux-saga/effects';
// import { Message } from '@alifd/next';
import {changeTimestamp} from '../../common/js/common';
import {
    USER_SETTING_LISTS_REQ,
    USER_SETTING_DETAILS_REQ,
    USER_SETTING_PASS_ON_REQ,
    USER_SETTING_LISTS_RES,
    USER_SETTING_DETAILS_RES,
    USER_SETTING_PASS_ON_RES,
    ADSPOKESMAN_LIST_REQ, // 代言人宣传页
    ADSPOKESMAN_LIST_RES,
    ADSPOKESMAN_PASS_ON_REQ,
    ADSPOKESMAN_PASS_ON_RES,
    ADSPOKESMAN_DETAILS_REQ,
    ADSPOKESMAN_DETAILS_RES,
    ADFINDACTIVITY_LIST_REQ,
    ADFINDACTIVITY_LIST_RES,
    ADFINDACTIVITY_PASS_ON_REQ,
    ADFINDACTIVITY_PASS_ON_RES,
    ADFINDACTIVITY_DETAILS_REQ,
    ADFINDACTIVITY_DETAILS_RES,
    NEWSBULLETIN_LIST_REQ, // 新闻公告
    NEWSBULLETIN_LIST_RES,
    NEWSBULLETIN_ADD_REQ,
    NEWSBULLETIN_ADD_RES,
    NEWSBULLETIN_DELETE_REQ,
    NEWSBULLETIN_DELETE_RES,
    NEWSBULLETIN_EDIT_REQ,
    NEWSBULLETIN_EDIT_RES,
    NEWSBULLETIN_LOWER_REQ,
    NEWSBULLETIN_LOWER_RES,
    NEWSBULLETIN_DETAIL_REQ,
    NEWSBULLETIN_DETAIL_RES,
    NEWSBULLETIN_RELEASE_REQ,
    NEWSBULLETIN_RELEASE_RES,
    NOVICEGUIDE_LIST_REQ, // 新手指引
    NOVICEGUIDE_LIST_RES,
    NOVICEGUIDE_ADD_REQ,
    NOVICEGUIDE_ADD_RES,
    NOVICEGUIDE_PASS_REQ,
    NOVICEGUIDE_PASS_RES,
    NOVICEGUIDE_DETAIL_REQ,
    NOVICEGUIDE_DETAIL_RES,
    NOVICEGUIDE_DELETE_REQ,
    NOVICEGUIDE_DELETE_RES

} from './constants';
import nw from '../../common/http/post'

//请求
const postUrlData =(param) => {
  return nw.post('/',param,function (res) {})
}


export function* httpSETTINGLists(action) {
  const {parmas} = action
  try {
    const response = yield call(postUrlData,parmas);
    yield put({
      type: USER_SETTING_LISTS_RES,
      response
    })
  } 
  catch (err) {
   console.log(err);
  }
}
export function* httpSETTINGDetails(action) {
  const {parmas} = action
  try {
    const response = yield call(postUrlData,parmas);
    yield put({
      type: USER_SETTING_DETAILS_RES,
      response
    })
  } 
  catch (err) {
    yield put({
      type: USER_SETTING_DETAILS_RES,
      response:err
    })
  }
}
export function* httpSETTINGPassOn(action) {
  const {parmas} = action
  try {
    const response = yield call(postUrlData,parmas);
    yield put({
      type: USER_SETTING_PASS_ON_RES,
      response
    })
  } 
  catch (err) {
    yield put({
      type: USER_SETTING_PASS_ON_RES,
      response:err
    })
  }
}

// 代言人宣传页
export function* httpAdSpokesmanList(action) { // 代言人宣传页列表
  const {parmas} = action
  try {
    const response = yield call(postUrlData, parmas)
    yield put({
      type: ADSPOKESMAN_LIST_RES,
      response
    })
  } catch(err) {
    yield put({
      type: ADSPOKESMAN_LIST_RES,
      response: err
    })
  }
}
export function* httpAdSpokesmanDetail(action) { // 详情
  const {parmas} = action
  try {
    const response = yield call(postUrlData, parmas)
    yield put({
      type: ADSPOKESMAN_DETAILS_RES,
      response
    })
  } catch(err) {
    yield put({
      type: ADSPOKESMAN_DETAILS_RES,
      response: err
    })
  }
}
export function* httpAdSpokesmanPassOn(action) { // 代言人宣传页操作
  const {parmas} = action
  try {
    const response = yield call(postUrlData, parmas)
    yield put({
      type: ADSPOKESMAN_PASS_ON_RES,
      response
    })
  } catch(err) {
    yield put({
      type: ADSPOKESMAN_PASS_ON_RES,
      response: err
    })
  }
}

// APP发现页
export function* httpAdFindActivityList(action) { // 发现页广告列表
  const {parmas} = action
  try {
    const response = yield call(postUrlData, parmas)
    yield put({
      type: ADFINDACTIVITY_LIST_RES,
      response
    })
  } catch(err) {
    yield put({
      type: ADFINDACTIVITY_LIST_RES,
      response: err
    })
  }
}
export function* httpAdFindActivityDetail(action) { // 发现页广告列表详情
  const {parmas} = action
  try {
    const response = yield call(postUrlData, parmas)
    yield put({
      type: ADFINDACTIVITY_PASS_ON_RES,
      response
    })
  } catch(err) {
    yield put({
      type: ADFINDACTIVITY_PASS_ON_RES,
      response: err
    })
  }
}
export function* httpAdFindActivityPassOn(action) { // 发现页操作
  const {parmas} = action
  try {
    const response = yield call(postUrlData, parmas)
    yield put({
      type: ADFINDACTIVITY_DETAILS_RES,
      response
    })
  } catch(err) {
    yield put({
      type: ADFINDACTIVITY_DETAILS_RES,
      response: err
    })
  }
}

// 新闻公告
export function* httpNewsBulletinList(action) { // 列表
  const {parmas} = action
  try {
    const response = yield call(postUrlData, parmas)
    yield put({
      type: NEWSBULLETIN_LIST_RES,
      response
    })
  } catch(err) {
    yield put({
      type: NEWSBULLETIN_LIST_RES,
      response: err
    })
  }
}
export function* httpNewsBulletinDetail(action) { // 详情
  const {parmas} = action
  try {
    const response = yield call(postUrlData, parmas)
    yield put({
      type: NEWSBULLETIN_DETAIL_RES,
      response
    })
  } catch(err) {
    yield put({
      type: NEWSBULLETIN_DETAIL_RES,
      response: err
    })
  }
}
export function* httpNewsBulletinAdd(action) { // 添加
  // const newParmas = changeTimestamp(action.parmas)
  const {parmas} = action
  try {
    const response = yield call(postUrlData, parmas)
    yield put({
      type: NEWSBULLETIN_ADD_RES,
      response
    })
  } catch(err) {
    yield put({
      type: NEWSBULLETIN_ADD_RES,
      response: err
    })
  }
}
export function* httpNewsBulletinDelete(action) { // 删除
  const {parmas} = action
  try {
    const response = yield call(postUrlData, parmas)
    yield put({
      type: NEWSBULLETIN_DELETE_RES,
      response
    })
  } catch(err) {
    yield put({
      type: NEWSBULLETIN_DELETE_RES,
      response: err
    })
  }
}
export function* httpNewsBulletinEdit(action) { // 编辑
  const {parmas} = action
  try {
    const response = yield call(postUrlData, parmas)
    yield put({
      type: NEWSBULLETIN_EDIT_RES,
      response
    })
  } catch(err) {
    yield put({
      type: NEWSBULLETIN_EDIT_RES,
      response: err
    })
  }
}
export function* httpNewsBulletinLower(action) { // 下架
  const {parmas} = action
  try {
    const response = yield call(postUrlData, parmas)
    yield put({
      type: NEWSBULLETIN_LOWER_RES,
      response
    })
  } catch(err) {
    yield put({
      type: NEWSBULLETIN_LOWER_RES,
      response: err
    })
  }
}
export function* httpNewsBulletinRelease(action) { // 发布
  const {parmas} = action
  try {
    const response = yield call(postUrlData, parmas)
    yield put({
      type: NEWSBULLETIN_RELEASE_RES,
      response
    })
  } catch(err) {
    yield put({
      type: NEWSBULLETIN_RELEASE_RES,
      response: err
    })
  }
}

// 新手指引
export function* httpNoviceGuideList(action) { // 列表
  const {parmas} = action
  try {
    const response = yield call(postUrlData, parmas)
    yield put({
      type: NOVICEGUIDE_LIST_RES,
      response
    })
  } catch(err) {
    yield put({
      type: NOVICEGUIDE_LIST_RES,
      response: err
    })
  }
}
export function* httpNoviceGuideAdd(action) { // 添加
  const {parmas} = action
  try {
    const response = yield call(postUrlData, parmas)
    yield put({
      type: NOVICEGUIDE_ADD_RES,
      response
    })
  } catch(err) {
    yield put({
      type: NOVICEGUIDE_ADD_RES,
      response: err
    })
  }
}
export function* httpNoviceGuidePass(action) { // 操作
  const {parmas} = action
  try {
    const response = yield call(postUrlData, parmas)
    yield put({
      type: NOVICEGUIDE_PASS_RES,
      response
    })
  } catch(err) {
    yield put({
      type: NOVICEGUIDE_PASS_RES,
      response: err
    })
  }
}
export function* httpNoviceGuideDetail(action) { // 详情
  const {parmas} = action
  try {
    const response = yield call(postUrlData, parmas)
    yield put({
      type: NOVICEGUIDE_DETAIL_RES,
      response
    })
  } catch(err) {
    yield put({
      type: NOVICEGUIDE_DETAIL_RES,
      response: err
    })
  }
}
export function* httpNoviceGuideDelete(action) { // 删除
  const {parmas} = action
  try {
    const response = yield call(postUrlData, parmas)
    yield put({
      type: NOVICEGUIDE_DELETE_RES,
      response
    })
  } catch(err) {
    yield put({
      type: NOVICEGUIDE_DELETE_RES,
      response: err
    })
  }
}

export default function* root() {
  yield all([
    takeLatest(USER_SETTING_LISTS_REQ, httpSETTINGLists),
    takeLatest(USER_SETTING_DETAILS_REQ, httpSETTINGDetails),
    takeLatest(USER_SETTING_PASS_ON_REQ, httpSETTINGPassOn),
    takeLatest(ADSPOKESMAN_LIST_REQ, httpAdSpokesmanList),
    takeLatest(ADSPOKESMAN_DETAILS_REQ, httpAdSpokesmanDetail),
    takeLatest(ADSPOKESMAN_PASS_ON_REQ, httpAdSpokesmanPassOn),
    takeLatest(ADFINDACTIVITY_LIST_REQ, httpAdFindActivityList),
    takeLatest(ADFINDACTIVITY_PASS_ON_REQ, httpAdFindActivityDetail),
    takeLatest(ADFINDACTIVITY_DETAILS_REQ, httpAdFindActivityPassOn),
    takeLatest(NEWSBULLETIN_LIST_REQ, httpNewsBulletinList), // 新闻公告列表
    takeLatest(NEWSBULLETIN_DETAIL_REQ, httpNewsBulletinDetail),
    takeLatest(NEWSBULLETIN_ADD_REQ, httpNewsBulletinAdd),
    takeLatest(NEWSBULLETIN_DELETE_REQ, httpNewsBulletinDelete),
    takeLatest(NEWSBULLETIN_EDIT_REQ, httpNewsBulletinEdit),
    takeLatest(NEWSBULLETIN_LOWER_REQ, httpNewsBulletinLower),
    takeLatest(NEWSBULLETIN_RELEASE_REQ, httpNewsBulletinRelease),
    takeLatest(NOVICEGUIDE_LIST_REQ, httpNoviceGuideList), // 新手指引
    takeLatest(NOVICEGUIDE_ADD_REQ, httpNoviceGuideAdd),
    takeLatest(NOVICEGUIDE_PASS_REQ, httpNoviceGuidePass),
    takeLatest(NOVICEGUIDE_DETAIL_REQ, httpNoviceGuideDetail),
    takeLatest(NOVICEGUIDE_DELETE_REQ, httpNoviceGuideDelete),
  ]);
}