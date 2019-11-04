import {
    WEIPAI_ORDER_RESULT,
    WEIPAI_ORDER_PAGE,
    WEIPAI_ORDER_LIMIT,
    WEIPAI_ORDER_DETAILS_RESULT,
    WEIPAI_ORDER_INFO_RESULT,
    WEIPAI_ORDER_LIST_EMPTY,
    GROUPBUY_ORDER_DETAILS_RESULT,
    GROUP_ORDER_DETAIL_PASS_RES,
    GROUP_ORDER_DETAIL_FAIL_RES,
    MODIFY_COMMIT_GB_RES,
    MODIFY_RECORD_GB_RES,
    EXPORT_DATA_SUCCESS
    // DELETE_INVITE_USER_RESULT,
    // UPDATE_INVITE_USER_RESULT,
    // ACCOUNT_INVITE_USER_RESULT,
} from './constants';
import { Message } from '@alifd/next';

  // store默认值
  const initialState = {
    lists:[],
    pages:1,
    total:0,
    detail:{
      addUuid:''
    },
    order:{
      auorderDetail: {
      },
      orderAuco: [],
      address: {
      }
    },
    info:{
      groupBuy : {

      },
      col : []
    },
    modification:[]
  };

  function accountReducer(state = initialState, action) {
    switch (action.type) {
      case WEIPAI_ORDER_LIST_EMPTY:
          state.detail = {
        }
        state.lists=[]
        state.auction={}
        return Object.assign([],state);

      case WEIPAI_ORDER_RESULT:
          // console.log(action.response.pid)
          if(action.response.pid==20350){ // 团购列表
            if( action.response.data.list != undefined){
              if(action.response.data.list!=null && action.response.total != 0){
                state.lists = action.response.data.list
                state.total = action.response.total
              }else{
                Message.error('未搜到任何相关用户')
                state.lists=[]
              }
            }
          }else{
            if( action.response.data.orderList != undefined){ // 微拍列表
              if(action.response.data.orderList!=null && action.response.total != 0){
                state.lists = action.response.data.orderList
                state.total = action.response.total
              }else{
                Message.error('未搜到任何相关用户')
                state.lists=[]
              }
            }
          }

        // state.lists = action.response.data.list
        // state.total = action.response.total
        // console.log(state,action.response.data)
        return Object.assign([],state);

      case WEIPAI_ORDER_PAGE:
        state.pages = action.page
        return Object.assign(state);

      case WEIPAI_ORDER_LIMIT:
        state.limit = action.limit
        return Object.assign(state);

      case WEIPAI_ORDER_DETAILS_RESULT:
        // console.log(action.response.data)
        action.response.data.orderAuco = action.response.data.orderAuco || []
        let len = action.response.data.orderAuco.length || 0
        for (let i = 0;i < len; i++){
          action.response.data.orderAuco[i].tags = JSON.parse(action.response.data.orderAuco[i].tags)
          action.response.data.orderAuco[i].type = action.response.data.orderAuco[i].tags.type
          action.response.data.orderAuco[i].quality = action.response.data.orderAuco[i].tags.quality
          action.response.data.orderAuco[i].aName = action.response.data.auorderDetail.aName
        }
        action.response.data.auorderDetail.discountList = action.response.data.auorderDetail.discountList || []
        let len2 = action.response.data.auorderDetail.discountList.length || 0
        action.response.data.auorderDetail.discountValue = 0
        for (let i = 0;i < len2; i++){
          action.response.data.auorderDetail.discountValue += Number(action.response.data.auorderDetail.discountList[i].value)
        }
        action.response.data.auorderDetail.express = action.response.data.logistics.express
        action.response.data.auorderDetail.trackingNo = action.response.data.logistics.trackingNo
        state.order = action.response.data
        return Object.assign([],state);
      case GROUPBUY_ORDER_DETAILS_RESULT:
        let len3 = action.response.data.col.length || 0
        for (let i = 0;i < len3; i++){
          action.response.data.col[i].tags = JSON.parse(action.response.data.col[i].tags)
          action.response.data.col[i].quality = action.response.data.col[i].tags.quality
          action.response.data.col[i].variety = action.response.data.col[i].tags.variety
        }
        state.info = action.response.data;
        return Object.assign([],state);
      case GROUP_ORDER_DETAIL_PASS_RES:
        if(action.response.errorCode==0){
          Message.success('操作成功')
          setTimeout(() => {
            window.location.hash='orderManagement/GbOrder'
          }, 1000);
        }else{
          Message.error(action.response.errorMsg)
        }
        return Object.assign(state);
      case GROUP_ORDER_DETAIL_FAIL_RES:
        // const {errorCode,errorMsg} = action.response
        if(action.response.errorCode==0){
          Message.success('操作成功')
          setTimeout(() => {
            window.location.hash='orderManagement/GbOrder'
          }, 1000);
        }else{
          Message.error(action.response.errorMsg)
        }
        return Object.assign(state);
      case WEIPAI_ORDER_INFO_RESULT:
        state.info = action.response.data
        return Object.assign([],state);

        // case DELETE_INVITE_USER_RESULT:
        //     console.log(action.response.errorCode)
        //       if(action.response.errorCode == 0 ){
        //         Message.success('删除成功')
        //         setTimeout(() => {
        //           location.reload()
        //         }, 1000);
        //       }else{
        //         Message.error(action.response.errorMsg)
        //       }
        //       // state.object = action.response.data
        //       // state.total = action.response.total
        //       return Object.assign([],state);

        //   case UPDATE_INVITE_USER_RESULT:
        //   if(action.response.errorCode == 0 ){
        //     Message.success('修改成功')
        //     setTimeout(() => {
        //       location.reload()
        //     }, 1000);
        //   }else{
        //     Message.error(action.response.errorMsg)
        //   }
        //   // state.object = action.response.data
        //   // state.total = action.response.total
        //   return Object.assign([],state);

        //   case ACCOUNT_INVITE_USER_RESULT:
        //       if(action.response.errorCode == 0 ){
        //         Message.success('修改成功')
        //         setTimeout(() => {
        //           location.reload()
        //         }, 1000);
        //       }else{
        //         Message.error(action.response.errorMsg)
        //       }
        //       console.log(state.action)
        //   // state.object = action.response.data
        //   // state.total = action.response.total
        //   return Object.assign([],state);
      case MODIFY_COMMIT_GB_RES:
        if(action.response.errorCode == 0 ){
          Message.success('修改成功')
          setTimeout(() => {
            location.reload()
          }, 1000);
        }else{
          Message.error(action.response.errorMsg)
        }
      return Object.assign([],state);

      case MODIFY_RECORD_GB_RES:
        if(action.response.data){
          state.modification = action.response.data.coList
        }else{
          Message.success('没有找到该记录')
          state.modification=[]
        }
        return Object.assign([],state);
      case EXPORT_DATA_SUCCESS:
        console.log(action);
        Message.success('导出成功');
        window.open(action.response.data.file_path);
        return Object.assign([], state);
      default:
        return state;
    }
  }

  export default accountReducer;
