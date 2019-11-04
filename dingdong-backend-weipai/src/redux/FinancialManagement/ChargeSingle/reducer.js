import {
  CHARGE_SINGLE_RESULT,
  CHARGE_SINGLE_INFO_RES,
} from './constants';
import { Message } from '@alifd/next';  

  // store默认值
  const initialState = {
    lists:[],
    info:null,
    card:null,
    pages:1,
    total:1,
  };
  
  function accountReducer(state = initialState, action) {
    // console.log(state,)
    switch (action.type) {
      case CHARGE_SINGLE_RESULT:
      // console.log(state,action.response.errorCode==0)
      if(action.response.errorCode==0){
        Message.success(action.response.errorMsg || '提交成功')
        setTimeout(() => {
          window.history.go(-1);
        }, 1000);
      }else{
        Message.error(action.response.errorMsg || '提交失败')
        setTimeout(() => {
          window.history.go(-1);
        }, 1000);
      }
        return Object.assign({});
      case CHARGE_SINGLE_INFO_RES:
          if (!action.response.data.list) {
            Message.success('查无此人')
            return;
          }
          if(action.response.pid==20219){
            // console.log(action.response.data.list[0].account);
            state.card = action.response.data.list[0].account
          }else if(action.response.pid==20102){
            state.info = action.response.data.list
          }
          return Object.assign([],state);
      default:
        return state;
    }
  }
  
  export default accountReducer;
  