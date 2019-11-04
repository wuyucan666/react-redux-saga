import {
    USER_ACCOUNT_EMPTY,
    USER_ACCOUNT_PAGE,

    USERRECEIVE_REQ,
    USERRECEIVEDETAILS_REQ,
    DDEVENTDETAILS_REQ,
    SHARE_REQ,
    DDLAUNCHEVENT_REQ,
    DDLISTACTIVITIES_REQ,
    GENERATE_REQ,
    DDCREATE_REQ,
    SHELVES_REQ,
    GETCOUPONS_REQ,
    ELISTACTIVITIES_REQ,
    REVIEWDETAILS_REQ,
    DISTRIBUTIONGIFT_REQ,
    ISSUERECORD_REQ,
    TERMINATION_REQ,
    CREATEACTIVITY_REQ,
    TPERATION_REQ,

    USERRECEIVE_RES,
    USERRECEIVEDETAILS_RES,
    DDEVENTDETAILS_RES,
    SHARE_RES,
    DDLAUNCHEVENT_RES,
    DDLISTACTIVITIES_RES,
    GENERATE_RES,
    DDCREATE_RES,
    SHELVES_RES,
    GETCOUPONS_RES,
    ELISTACTIVITIES_RES,
    REVIEWDETAILS_RES,
    DISTRIBUTIONGIFT_RES,
    ISSUERECORD_RES,
    TERMINATION_RES,
    CREATEACTIVITY_RES,
    TPERATION_RES,


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
    details:{},
    pages:1,
    total:0,
    record:[],
    ddToken:''
  };

  function accountReducer(state = initialState, action) {
    switch (action.type) {
      case USER_ACCOUNT_EMPTY:
        state.lists = [],
        state.details = {},
        state.total = 0,
        state.ddToken = ''
        // state.ShootList = []
        return Object.assign({},state);

      case USER_ACCOUNT_PAGE:
        // console.log(action.page)
        state.pages = action.page
      return Object.assign({},state);
      /*模板通用上面2个方法*/
      // 用户点击弹窗公用方法
      case TPERATION_RES:

        if(action.response.errorCode==0){
          if( action.response.pid == 21704){
            Message.success('操作成功')
            setTimeout(() => {
              window.location.href = '/#/PasswordActivity/EListActivities'
            }, 1000);
          }else if(action.response.pid == 21703){
            Message.success('操作成功')
            setTimeout(() => {
              window.location.href = '/#/PasswordActivity/EListActivities'
            }, 1000);
          }else{
            Message.success('操作成功')
            setTimeout(() => {
              // location.reload()
            }, 1000);
          }

        }
      return Object.assign({},state);


      case USERRECEIVE_RES:
          if( action.response.data.cashingList != null ){
            state.lists = action.response.data.cashingList
          }else{
            state.lists = []
            Message.success('暂无数据')
          }
          state.total = action.response.total
      return Object.assign({},state);

      case USERRECEIVEDETAILS_RES:
          if(action.response.errorCode==0){
            state.details = action.response.data
          }
        // if( action.response.data.info.address != '' ){
        //   action.response.data.info.address =JSON.parse(action.response.data.info.address)
        // }
        // if( action.response.data.info.logistics != '' ){
        //   action.response.data.info.logistics =JSON.parse(action.response.data.info.logistics)
        // }
        // state.countInfo = action.response.data.info
      return Object.assign({},state);

      case DDEVENTDETAILS_RES:
        if(action.response.errorCode==0){
          state.details = action.response.data
        }
      return Object.assign({},state);

      case SHARE_RES:
        if( action.response.data.list != null ){
          state.lists = action.response.data.list
        }else{
          state.lists = []
          Message.success('暂无数据')
        }
        state.total = action.response.total
      return Object.assign({},state);

      case DDLAUNCHEVENT_RES:
        if(action.response.errorCode==0){
          Message.success('发布成功')
          setTimeout(() => {
            location.reload()
          }, 1000);
        }
      return Object.assign({},state);

      case DDLISTACTIVITIES_RES:
        if( action.response.data.list != null ){
          state.lists = action.response.data.list
        }else{
          state.lists = []
          Message.success('暂无数据')
        }
        state.total = action.response.total
      return Object.assign({},state);

      case GENERATE_RES:
        if(action.response.errorCode==0){
          state.ddToken = action.response.data.ddToken
        }
        // if( action.response.data.list != null ){
        //   state.lists = action.response.data.list
        // }else{
        //   state.lists = []
        //   Message.success('暂无数据')
        // }
        // state.total = action.response.total
      return Object.assign({},state);

      case DDCREATE_RES:
        if(action.response.errorCode==0){
          state.details = action.response.data
        }
        // if( action.response.data.list != null ){
        //   state.lists = action.response.data.list
        // }else{
        //   state.lists = []
        //   Message.success('暂无数据')
        // }
      return Object.assign({},state);

      case SHELVES_RES:
        if( action.response.data.list != null ){
          state.lists = action.response.data.list
        }else{
          state.lists = []
          Message.success('暂无数据')
        }
        state.total = action.response.total
      return Object.assign({},state);

      case GETCOUPONS_RES:
        if( action.response.data.list != null ){
          state.lists = action.response.data.list
        }else{
          state.lists = []
          Message.success('暂无数据')
        }
        state.total = action.response.total
      return Object.assign({},state);

      case ELISTACTIVITIES_RES:
        if( action.response.data.list != null ){
          state.lists = action.response.data.list
        }else{
          state.lists = []
          Message.success('暂无数据')
        }
        state.total = action.response.total
      return Object.assign({},state);

      case REVIEWDETAILS_RES:
        if( action.response.data.thumb != '' ){
          action.response.data.thumb =JSON.parse(action.response.data.thumb)
        }
        state.details = action.response.data
      return Object.assign({},state);


      case DISTRIBUTIONGIFT_RES:
        if( action.response.data.list != null ){
          state.lists = action.response.data.list
        }else{
          state.lists = []
          Message.success('暂无数据')
        }
        state.total = action.response.total
      return Object.assign({},state);

      case ISSUERECORD_RES:
        if( action.response.data.list != null ){
          state.list = action.response.data.list
        }else{
          state.list = []
          Message.success('暂无数据')
        }
        state.total = action.response.total
      return Object.assign({},state);

      case CREATEACTIVITY_RES:
        if(action.response.errorCode==0){
          Message.success('保存成功')
          setTimeout(() => {
            window.location.href = '/#/PasswordActivity/DdListActivities'
          }, 1000);
        }
      return Object.assign({},state);

      case TERMINATION_RES:
        if(action.response.errorCode==0){
          Message.success('解约成功')
          setTimeout(() => {
            location.reload()
          }, 1000);
        }
      return Object.assign({},state);

      default:
        return state;


    }
  }

  export default accountReducer;
