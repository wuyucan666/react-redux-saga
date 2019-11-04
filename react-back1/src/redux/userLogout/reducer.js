/*
 *
 * userLogout reducer
 *
 */
import { push } from 'react-router-redux';
import { Message } from '@alifd/next';

import {
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_FAILURE,
  USER_LOGOUT_SUCCESS,
} from './constants';

// The initial state
const initialState = {};

function logoutReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGOUT_REQUEST:
      document.cookie = "dt" + '=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      setTimeout(() => {
        Message.success('已登出');
        // push('/user/login');
        let url = window.location.href.split('#')[0]
        window.location.href=`${url}#/user/login`; 
      }, 800);
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case USER_LOGOUT_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        ...action.payload,
      });
    case USER_LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    default:
      return state;
  }
}

export default logoutReducer;
