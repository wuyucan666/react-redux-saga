import {
  USER_LOGIN_REQUEST,
  USER_LOADING_REQUEST,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS
} from '../UserLogin/constants';
// import nw from '../../common/http/post'
// import { push } from 'react-router-redux'
// import { Message } from '@alifd/next';

export const userLogin =(parmas) => {
  return {
    type: USER_LOGIN_REQUEST,
    parmas,
  }
};

export const userLoading =() => {
  return {
    type: USER_LOADING_REQUEST,
    isLoading:true
  }
};
export const userLoadingSuccess =(info) => {
  // console.log(info)
  return {
    type: USER_LOGIN_SUCCESS,
    isLoading:false
  }
};
export const userLoginFail =(info) => {
  return {
    type: USER_LOGIN_FAILURE,
    isLoading:false
  }
};


// export const userLoginRes = (param) => {
//   const {username:mobile,password} = param
//   const params = {
//     pid:1,
//     mobile,
//     password
//   }
//   return async (dispatch) => {
//     dispatch(userLoading());
//       await nw.post('/',params)
//       .then(response => {
//         if (response.errorCode === 0) {
//           console.log(response.data);
//           Message.success('登录成功');
//           dispatch(userLoadingSuccess(response.data));
//           dispatch(push('/dashboard/monitor'));
//         } 
//         return response.data;
//       })
//       .catch(error => {
//         console.log(error);
//         dispatch(userLoginFail(error));
//       })
//   };
// };
