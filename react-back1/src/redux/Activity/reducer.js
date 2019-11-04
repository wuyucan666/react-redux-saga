import {
    USER_ACCOUNT_EMPTY,
    USER_ACCOUNT_RESULT,
    USER_ACCOUNT_PAGE,

    // ACTIVITYLIST_REQ,
    // RAFFLELIST_REQ,
    // REGISTEREDLIST_REQ,
    // INVITATIONLIST_REQ,
    // SHOOTLIST_REQ,
    // ISSUEDETAILS_REQ,
    // REGISTEREDDETAILS_REQ,
    // INVITATIONDETAILS_REQ,	
    // INVITATIONADDITIONALDETAILS_REQ,
    // SHOOTDETAILS_REQ,
    // LOGISTICS_REQ,
    // REMIND_REQ,
    
    ACTIVITYLIST_RES,
    RAFFLELIST_RES,
    REGISTEREDLIST_RES,
    INVITATIONLIST_RES,
    SHOOTLIST_RES,
    ISSUEDETAILS_RES,
    REGISTEREDDETAILS_RES,
    INVITATIONDETAILS_RES,
    INVITATIONADDITIONALDETAILS_RES,
    SHOOTDETAILS_RES,
    LOGISTICS_RES,
    REMIND_RES,
    ACT_DETAIL_RES,
    ACT_DETAIL_HANDLE_RES
} from './constants';

import { Message } from '@alifd/next';
  
  // store默认值
  const initialState = {
    lists:[],
    countInfo:{},
    detail:{},
    pages:1,
    total:0,
    rewardsSum:0,
    balance:"0",
    freezeBalance:'0',
    margin:'0',
    recordList:{
      list:[]
    },
    nickname:'',
    ShootList:[],
    info:{}
  };
  
  function accountReducer(state = initialState, action) {
    switch (action.type) {
      case USER_ACCOUNT_EMPTY:
        state.lists = []
        state.recordList.list = []
        // state.ShootList = []
        return Object.assign({},state); 
      case USER_ACCOUNT_RESULT:
      // console.log(state,action)
        if( action.response.data.list != null ){
          state.lists = action.response.data.list
        }else{
          state.lists = []
        }

        state.total = action.response.total
        state.balance = action.response.data.balance
        state.freezeBalance = action.response.data.freezeBalance
        state.margin = action.response.data.margin
        return Object.assign({},state);

      case USER_ACCOUNT_PAGE:
        // console.log(action.page)
        state.pages = action.page
        return Object.assign({},state);

      case SHOOTLIST_RES:
          if( action.response.data.list != null ){
            state.lists = action.response.data.list
          }else{
            state.lists = []
            Message.success('暂无数据')
          }
          state.total = action.response.total
          state.rewardsSum = action.response.data.rewardsSum
          return Object.assign({},state);

        case SHOOTDETAILS_RES:
            if( action.response.data.list != null ){
              state.lists = action.response.data.list
            }else{
              state.lists = []
              Message.success('暂无数据')
            }
            state.countInfo = action.response.data.countInfo
            state.total = action.response.total
            state.rewardsSum = action.response.data.rewardsSum
            return Object.assign({},state);

        case REGISTEREDLIST_RES:
          if( action.response.data.list != null ){
            state.lists = action.response.data.list
          }else{
            state.lists = []
            Message.success('暂无数据')
          }
          state.total = action.response.total
          state.rewardsSum = action.response.data.rewardsSum
          return Object.assign({},state);

        case REGISTEREDDETAILS_RES:
            if( action.response.data.rewards != null ){
              state.lists = action.response.data.rewards
            }else{
              state.lists = []
              Message.success('暂无数据')
            }
            state.countInfo = action.response.data
            state.total = action.response.total
            return Object.assign({},state);

          case INVITATIONLIST_RES:
            if( action.response.data.list != null ){
              state.lists = action.response.data.list
            }else{
              state.lists = []
              Message.success('暂无数据')
            }
            state.total = action.response.total
            console.log(action.response.data)
            state.countInfo = action.response.data
            return Object.assign({},state);

            case INVITATIONDETAILS_RES:
              if( action.response.data.list != null ){
                state.lists = action.response.data.list
              }else{
                state.lists = []
                Message.success('暂无数据')
              }
              state.countInfo = action.response.data
              state.total = action.response.total
              return Object.assign({},state);

              case INVITATIONADDITIONALDETAILS_RES:
                if( action.response.data.list != null ){
                  state.lists = action.response.data.list
                }else{
                  state.lists = []
                  Message.success('暂无数据')
                }
                state.countInfo = action.response.data
                state.total = action.response.total
                return Object.assign({},state);

              case RAFFLELIST_RES:
                if( action.response.data.list != null ){
                  state.lists = action.response.data.list
                }else{
                  state.lists = []
                  Message.success('暂无数据')
                }
                state.total = action.response.total
                state.rewardsSum = action.response.data.rewardsSum
                return Object.assign({},state);
    
                case ISSUEDETAILS_RES:
                  if( action.response.data.info.address != '' ){
                    action.response.data.info.address =JSON.parse(action.response.data.info.address)
                  }
                  if( action.response.data.info.logistics != '' ){
                    action.response.data.info.logistics =JSON.parse(action.response.data.info.logistics)
                  }
                  state.countInfo = action.response.data.info
                  return Object.assign({},state);


                case ACTIVITYLIST_RES:
                  if( action.response.data.list != null ){
                    state.total = action.response.total
                    state.lists = action.response.data.list
                  }else{
                    state.lists = []
                    Message.success('暂无数据')
                  }
                  state.total = action.response.total
                  state.rewardsSum = action.response.data.rewardsSum
                  return Object.assign({},state);

                case LOGISTICS_RES:
                  if(action.response.errorCode==0){
                    Message.success('提交成功')
                    setTimeout(() => {
                      location.reload() 
                    }, 1000);
                  }
                  return Object.assign({},state);  

                case REMIND_RES:
                  if(action.response.errorCode==0){
                    Message.success('提醒成功')
                    setTimeout(() => {
                      location.reload() 
                    }, 1000);
                  }
                  return Object.assign({},state);  
                case ACT_DETAIL_HANDLE_RES:
                  if(action.response.errorCode==0){
                    Message.success('操作成功')
                    setTimeout(() => {
                      window.location.hash = `/Activity/ReviewActivity`
                    }, 1000);
                  }
                  return Object.assign({},state);  
                case ACT_DETAIL_RES:
                  if(action.response.errorCode==0){
                    state.detail = action.response.data
                  }
                  return Object.assign({},state);     

      default:
        return state;

        
    }
  }
  
  export default accountReducer;
  