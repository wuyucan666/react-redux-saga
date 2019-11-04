import {
    USER_ACCOUNT_EMPTY,
    USER_INTEGRAL_RESULT,
    USER_INTEGRAL_PAGE,
    USER_ACCOUNT_FREEZE_RECORD_RES,
    USER_ACCOUNT_FREEZE_RECORD_HANDLE_RES,
} from './constants';

import { Message } from '@alifd/next';
  
  // store默认值
  const initialState = {
    lists:[],
    pages:1,
    total:0,
    balance:"0",
    freezeBalance:'0',
    margin:'0',
    recordList:{
      list:[]
    },
    nickname:''
  };
  
  function accountReducer(state = initialState, action) {
    switch (action.type) {
      case USER_ACCOUNT_EMPTY:
        state.lists = []
        state.recordList.list = []
        return Object.assign({},state); 
      case USER_INTEGRAL_RESULT:
      // console.log(state,action)
        if( action.response.data.list != null ){
          state.lists = action.response.data.list
        }else{
          Message.error("暂无数据"); 
          state.lists = []
        }

        state.total = action.response.total
        state.balance = action.response.data.balance
        state.freezeBalance = action.response.data.freezeBalance
        state.margin = action.response.data.margin
        return Object.assign({},state);

      case USER_INTEGRAL_PAGE:
        // console.log(action.page)
        state.pages = action.page
        return Object.assign({},state);
      
      // case USER_ACCOUNT_FREEZE_RECORD_RES:
      //   const {list} = action.response.data
      //   state.nickname = action.nickname.data.nickname
      //   if(list){
      //     state.recordList.list = list
      //   }
      //   return Object.assign({},state);
      
      // case USER_ACCOUNT_FREEZE_RECORD_HANDLE_RES:
      //   if(action.response.errorCode==0){
      //     Message.success('修改成功')
      //     setTimeout(() => {
      //       location.reload() 
      //     }, 1000);
      //   }
      //   return Object.assign({},state);  

      default:
        return state;
    }
  }
  
  export default accountReducer;
  