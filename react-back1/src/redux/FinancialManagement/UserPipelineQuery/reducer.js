import {
    USER_PIPELINE_RESULT,
    USER_PIPELINE_PAGE,
    USER_PIPELINE_EXPORT_RESULT,
    USER_RECHARGE_RESULT,
    USER_RECHARGE_PAGE,
    USER_RECHARGE_EXPORT_RESULT,
    USER_CHARGE_DETAIL_RES,
    USER_CHARGE_DETAIL_PASS_RES,
    USER_CHARGE_DETAIL_FAIL_RES,
    USER_OFFLINE_SN_RES,
    USER_OFFLINE_SN_PASS_RES,
    USER_OFFLINE_SN_ARRIVAL_RES // 确认到账
} from './constants';
  import { Message } from '@alifd/next';


  // store默认值
  const initialState = {
    lists:[],
    encLists:[],
    pages:1,
    enPages:1,
    pageTotal:1,
    encPageTotal:1,
    exportUrl:'',
    detail:{},
    snDetail:{},
  };
  
  function pipelineReducer(state = initialState, action) {
    switch (action.type) {
      case USER_PIPELINE_RESULT: 
        state.lists = action.response.data.list
        state.pageTotal = action.response.total
        // console.log(state,action.response.total)
        return Object.assign([],state);

      case USER_PIPELINE_PAGE:
        // console.log(action.page)
        state.pages = action.page
        return Object.assign(state);

      case USER_RECHARGE_RESULT:
        state.encLists = action.response.data.list
        state.encPageTotal = action.response.total
        // console.log(state.encLists)
        return Object.assign([],state);

      case USER_RECHARGE_PAGE:
        state.enPages = action.page
        return Object.assign(state);  

      case USER_PIPELINE_EXPORT_RESULT:
        // console.log(action.response.data.file_path);
        state.exportUrl = action.response.data.file_path
        return Object.assign(state);  
      
      case USER_RECHARGE_EXPORT_RESULT:
        state.exportUrl = action.response.data.file_path
        return Object.assign(state);  

      case USER_CHARGE_DETAIL_RES:
        const {transferFee} = action.response.data
        if (transferFee != null || transferFee != '') {
          action.response.data.transferFee = transferFee / 10
        } else {
          action.response.data.transferFee = ''
        }
        state.detail = action.response.data
        return Object.assign({},state);    
      
      case USER_CHARGE_DETAIL_PASS_RES:
          const {errorCode,errorMsg} = action.response 
          if(action.response.errorCode==0){
            Message.success('操作成功')
          }else{
            Message.error(action.response.errorMsg)
          }
          return Object.assign(state);    
      
      case USER_CHARGE_DETAIL_FAIL_RES:
          console.log(action.response)
          // const {errorCode,errorMsg} = action.response 
          if(action.response.errorCode==0){
            Message.success('操作成功')
          }else{
            Message.error(action.response.errorMsg)
          }   

          return Object.assign(state);          
      

      case USER_OFFLINE_SN_RES:
          state.snDetail = action.response.data
          return Object.assign({},state);    
        
      case USER_OFFLINE_SN_PASS_RES:
          if(action.response.errorCode==0){
            Message.success(action.response.errorMsg)
            setTimeout(() => {
              window.history.back(-1)
            }, 1000);
          }else{
            Message.error(action.response.errorMsg)
          } 

          return Object.assign(state);  
          
      case USER_OFFLINE_SN_ARRIVAL_RES:
        if (action.response.errorCode == 0) {
          Message.success('确认到账成功')
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          Message.error(action.response.errorMsg)
        }
        return Object.assign(state); 
      default:
        return state;
    }
  }
  
  export default pipelineReducer;
  