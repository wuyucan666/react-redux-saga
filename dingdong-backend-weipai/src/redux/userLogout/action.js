/*
 *
 * userLogout actions
 *
 */

// import { push } from 'react-router-redux';
// import { Message } from '@alifd/next';
// import { postUserLogout } from '../../api/user';
// import { setAuthority } from '../../utils/authority';
// import { reloadAuthorized } from '../../utils/Authorized';
import {
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_FAILURE,
  USER_LOGOUT_SUCCESS,
} from './constants';

export const userLogout = () => {
  return {
    type: USER_LOGOUT_REQUEST,
    isLoading: true,
  };
};

// const userLogoutSuccess = (payload) => {
//   return {
//     type: USER_LOGOUT_FAILURE,
//     isLoading: false,
//     payload,
//   };
// };

// const userLogoutFailure = (payload) => {
//   return {
//     type: USER_LOGOUT_SUCCESS,
//     isLoading: false,
//     payload,
//   };
// };

// export const userLogout = () => {
//   return async (dispatch) => {
//     dispatch(userLogoutRequest());
//     try {
//         Message.success('已登出');
//         document.cookie = "dt" + '=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;'
//         dispatch(push('/user/login'));
//     } catch (error) {
//       dispatch(userLogoutFailure(error));
//     }
//   };
// };
