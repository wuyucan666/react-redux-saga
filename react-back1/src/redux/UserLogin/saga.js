import { all, call,fork, put, takeLatest } from 'redux-saga/effects';
import { Message } from '@alifd/next';
import { push } from 'react-router-redux'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
} from '../UserLogin/constants';
import nw from '../../common/http/post'

//请求位置
const postLogin = (param) => {
  return nw.post('/',param)
}

export function* httpLogin(action) {
  const {username,password} = action.parmas
  let info ={
    pid:1,
    mobile:username,
    password
  }
  let avator = {
    pid:160
  }
  try {
    const response = yield call(postLogin,info);
    console.log(response);
      Message.success('登录成功');
      yield put(push('/dashboard/monitor'));
      const response2 = yield call(postLogin,avator)
      // console.log(response2)
      yield put({
        type: USER_LOGIN_SUCCESS,
        response: response.data,
        info:response2.data.info,
        isLoading:action.isLoading
      })
  } 
  catch (err) {
    console.log(err);
    yield put({
      type: USER_LOGIN_FAILURE,
      response:err,
      isLoading:false
    })
  }
}
  
export default function* root() {
  yield all([
    takeLatest(USER_LOGIN_REQUEST, httpLogin),
  ]);
}