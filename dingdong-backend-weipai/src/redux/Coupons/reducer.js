import {
  COUPON_LIST_EMPTY,
  COUPON_LIST_RES,
  COUPON_DETAIL_RES,
  COUPON_HANDLE_RES,
  SHOP_DETAIL_RES,
  RECEIVE_COUPON_DETAIL_RES,
} from './constants';

import { Message } from '@alifd/next';
  
  // store默认值
  const initialState = {
    lists:[],
    pages:1,
    total:1,
    detail:{
      detail:{},
      sendList:[]
    },
    receive:[],
    info:{
      id:''
    },
    detailList:[]
  };
  
  function accountReducer(state = initialState, action) {
    switch (action.type) {
        case COUPON_LIST_EMPTY:
        state.lists = []
        return Object.assign({},state);
         
        case COUPON_LIST_RES:
          if(action.response.data.list){
            state.lists = action.response.data.list
          }else{
            Message.success('没有找到该数据')
            state.lists=[]
          }
          state.total = action.response.total
          return Object.assign([],state); 

        case COUPON_DETAIL_RES:
          if(action.response.data){
            state.detail = action.response.data
          }
          state.total = action.response.total
          return Object.assign([],state); 
        case RECEIVE_COUPON_DETAIL_RES:
          // console.log(action.response)
            if(action.response.data.list){
              state.detailList = action.response.data.list
            }
            if(state.detailList.length>0){
              state.detailList.forEach((item,index) => {
                item.userDetail = JSON.parse(state.detailList[index].userDetail)
                if(item.useDetail.length!==0){
                  item.useDetail = JSON.parse(state.detailList[index].useDetail)
                }
              });
            }
            if(action.response.data){
              state.receive = state.detailList
            }
            return Object.assign([],state);   
        
        case SHOP_DETAIL_RES:
          if(action.response.data){
            // console.log(action)
            state.info = {
              ...action.response.data,
              id:action.id
            }
          }else{
            state.info = {
              name:'查无此店'
            }
          }
          return Object.assign([],state);   

        case COUPON_HANDLE_RES:
            console.log(action.response.pid)
            if(action.response.errorCode == 0 ){
              Message.success('操作成功')
              if([21000,21002].includes(action.response.pid)){
                setTimeout(() => {
                  window.location.hash='Coupon/CouponList'
                }, 1000);
              }else{
                setTimeout(() => {
                  location.reload() 
                }, 1000);
              }
            }else{
              Message.error(action.response.errorMsg)
            }
        return Object.assign([],state);


      default:
        return state;
    }
  }
  
  export default accountReducer;
  