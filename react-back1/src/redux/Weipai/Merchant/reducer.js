import {
    WEIPAI_MERCHANT_RESULT,
    WEIPAI_MERCHANT_PAGE,
    WEIPAI_MERCHANT_DETAIL_CONTENT,
    WEIPAI_MERCHANT_DETAIL_CONTENT_SS,
    WEIPAI_MERCHANT_DETAIL_CONTENT_SI,
    WEIPAI_MERCHANT_DETAIL_CONTENT_IL,
    WEIPAI_MERCHANT_DETAIL_CONTENT_ALL,
    WEIPAI_MERCHANT_DETAIL_PASS_RES,
    WEIPAI_MERCHANT_DETAIL_PASS_RES1,
    WEIPAI_MERCHANT_DETAIL_FAIL_RES,
    WEIPAI_MERCHANT_LIST_EMPTY,
    DELETE_INVITE_USER_RESULT1,
    UPDATE_INVITE_USER_RESULT1,
    ACCOUNT_INVITE_USER_RESULT1,
    WITHDRAW_AUCTION_LIST_RES,
    WITHDRAW_AUCTION_DISPLAY_RES,
    WITHDRAW_AUCTION_SORT_RES,
    MODIFY_COMMIT_RES,
    MODIFY_RECORD_RES
} from './constants';
import { Message } from '@alifd/next';
  
  // store默认值
  const initialState = {
    lists:[],
    pages:1,
    total:1,
    detail:{
      baseInfo:[],
      inviteList:[],
      sellerInfo:[],
      au:[],
      common:[],
      gb:[],
      // statistical:{}
      statistical:{
        au:[],
        common:[],
        gb:[]
      }
    },
    auction:{
    },
    withDrawList:[],
    withDrawListTotal:1,
    modification:[]
  };
  
  function accountReducer(state = initialState, action) {
    switch (action.type) {
      case WEIPAI_MERCHANT_LIST_EMPTY:
          state.detail = {
          // baseInfo:{},
          // inviteList:[],
          // sellerInfo:[],
          // au:[],
          // common:[],
          // gb:[],
          // statistical:{}
          // sellerStatistics:{
          //   au:[],
          //   common:[],
          //   gb:[]
          // },
        }
        state.lists=[]
        state.auction={}
        state.total=1
        return Object.assign([],state);

      case WEIPAI_MERCHANT_RESULT:
        if( action.response.data.list != undefined){
          if(action.response.data.list!=null && action.response.total != 0){
            if(action.response.data.list[0].is_seller == 1){
              Message.error('该用户已添加商户')
            }else{
              state.lists = action.response.data.list
              state.total = action.response.total
            }
          }else{
            Message.error('未搜到任何相关用户')
            state.lists=[]
          }
        }else{
          Message.error('未搜到任何相关用户')
          state.lists=[]
        }

        // console.log(action.response.data.list);
        return Object.assign([],state);

      case WEIPAI_MERCHANT_PAGE:
        state.pages = action.page
        return Object.assign(state);

      case WEIPAI_MERCHANT_DETAIL_CONTENT_ALL:
          // console.log(action.data)
          state.detail = action.data
          return Object.assign([],state); 

      case WEIPAI_MERCHANT_DETAIL_CONTENT:
        if([20402,20301].includes(action.response.pid)){
          state.auction = action.response.data
        }else{
          // console.log(action.response.data);
          state.detail.baseInfo = action.response.data
        }
        return Object.assign([],state);

      case WEIPAI_MERCHANT_DETAIL_CONTENT_SS:
        // console.log(action.response.data)
        state.detail.statistical = action.response.data
        return Object.assign([],state); 
      
      case WEIPAI_MERCHANT_DETAIL_CONTENT_SI:
        state.detail.sellerInfo = action.response.data
        return Object.assign([],state);   
      
      case WEIPAI_MERCHANT_DETAIL_CONTENT_IL:
        state.detail.inviteList = action.response.data.list
        return Object.assign([],state);    

      case WEIPAI_MERCHANT_DETAIL_PASS_RES:
        const {errorCode,errorMsg,pid} = action.response 
        const {types} = action
        if([20403,22007].includes(pid)){
          // console.log(types)
          if(errorCode==0){ 
            switch (types) {
              case 1:
                Message.success('通过成功')
                break;
              case 2:
                Message.success('驳回成功')
                break;
            }
            if (pid === 22007) {
              setTimeout(() => {
                window.location.hash='auMerchants/SiteManagement'
              }, 1000);
            }
            if (pid === 20403) {
              setTimeout(() => {
                window.location.hash='auMerchants/MerchantsAuditList'
              }, 1000);
            }
          }else{
            Message.error(errorMsg)
          } 
        }else{
          if(errorCode==0){ 
            Message.success(errorMsg)
            setTimeout(() => {
              window.history.go(-1); 
            }, 1000);
          }else{
            Message.error(errorMsg)
          } 

        }

        return Object.assign(state);   
      
        case WEIPAI_MERCHANT_DETAIL_PASS_RES1:
          if(action.response.errorCode==0){ 
            Message.success('提交成功,待审核')
            setTimeout(() => {
              window.location.href = '/#/auMerchants/MerchantsList';
            }, 1000);
          }else{
            Message.error(errorMsg)
          } 
  
          return Object.assign(state); 
      
      case WEIPAI_MERCHANT_DETAIL_FAIL_RES:
        // console.log(action.response.errorCode)
          if(action.response.errorCode==0){
            Message.success("驳回成功")
            setTimeout(() => {
              window.location.hash='auMerchants/MerchantsAuditList'
            }, 1000);
          }else{
            Message.error(action.response.errorMsg)
          }   

          return Object.assign(state);      
      
          case DELETE_INVITE_USER_RESULT1:
            // console.log(action.response.errorCode)
              if(action.response.errorCode == 0 ){
                Message.success('删除成功')
                setTimeout(() => {
                  location.reload() 
                }, 1000);
              }else{
                Message.error(action.response.errorMsg)
              }
              // state.object = action.response.data
              // state.total = action.response.total
              return Object.assign([],state);
    
          case UPDATE_INVITE_USER_RESULT1:
          if(action.response.errorCode == 0 ){
            Message.success('修改成功,请前往审核')
            setTimeout(() => {
              location.reload() 
            }, 1000);
          }else{
            Message.error(action.response.errorMsg)
          }
          // state.object = action.response.data
          // state.total = action.response.total
          return Object.assign([],state);
    
          case ACCOUNT_INVITE_USER_RESULT1:
              if(action.response.errorCode == 0 ){
                Message.success('修改成功')
                setTimeout(() => {
                  location.reload() 
                }, 1000);
              }else{
                Message.error(action.response.errorMsg)
              }
              // console.log(state.action)
          // state.object = action.response.data
          // state.total = action.response.total
          return Object.assign([],state);
          
          case WITHDRAW_AUCTION_LIST_RES:
            // console.log(action.response.total)
            if(action.response.data.list){
              state.withDrawList = action.response.data.list
            }else{
              Message.success('没有找到该数据')
              state.withDrawList=[]
            }
            state.withDrawListTotal = action.response.total
            return Object.assign([],state); 

          case WITHDRAW_AUCTION_DISPLAY_RES:
            console.log(action)
            if(action.response.errorCode == 0 ){
                Message.success('修改成功')
                setTimeout(() => {
                  location.reload() 
                }, 1000);
              }else{
                Message.error(action.response.errorMsg)
              }
          return Object.assign([],state);
          
          case WITHDRAW_AUCTION_SORT_RES:
              if(action.response.errorCode == 0 ){
                Message.success('修改成功')
                setTimeout(() => {
                  location.reload() 
                }, 1000);
              }else{
                Message.error(action.response.errorMsg)
              }
          return Object.assign([],state);

          case MODIFY_COMMIT_RES:
              if(action.response.errorCode == 0 ){
                Message.success('修改成功')
                setTimeout(() => {
                  // location.reload() 
                }, 1000);
              }else{
                Message.error(action.response.errorMsg)
              }
          return Object.assign([],state);

          case MODIFY_RECORD_RES:
            if(action.response.data.coList){
              state.modification = action.response.data.coList
            }else{
              Message.success('没有找到该记录')
              state.modification=[]
            }
            return Object.assign([],state);     
      default:
        return state;
    }
  }
  
  export default accountReducer;
  