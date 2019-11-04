import {
    USER_ACCOUNT_EMPTY,
    USER_ACCOUNT_PAGE,

    RELEASE_REQ,
    HISTORICALRECORDLIST_REQ,
    VERSIONDETAILS_REQ,
    
    RELEASE_RES,
    HISTORICALRECORDLIST_RES,
    VERSIONDETAILS_RES
} from './constants';

import { Message } from '@alifd/next';
  
  // store默认值
  const initialState = {
    lists:[],
    countInfo:{},
    pages:1,
    total:0,
  };
  
  function accountReducer(state = initialState, action) {
    switch (action.type) {
      case USER_ACCOUNT_EMPTY:
        state.lists = []
        // state.ShootList = []
        return Object.assign({},state); 

      case USER_ACCOUNT_PAGE:
        // console.log(action.page)
        state.pages = action.page
        return Object.assign({},state);

      case HISTORICALRECORDLIST_RES:
          if( action.response.data.list != null ){
            state.lists = action.response.data.list
          }else{
            state.lists = []
            Message.success('暂无数据')
          }
          state.total = action.response.total
          return Object.assign({},state);

      case RELEASE_RES:
        if(action.response.errorCode==0){
          Message.success('提交成功')
          setTimeout(() => {
            location.reload() 
          }, 1000);
        }    
        return Object.assign({},state);

      case VERSIONDETAILS_RES:
        if( action.response.data != null ){
          state.countInfo = action.response.data
        }else{
          state.countInfo = {}
          Message.success('暂无数据')
        }
        return Object.assign({},state); 

      default:
        return state;

        
    }
  }
  
  export default accountReducer;
  