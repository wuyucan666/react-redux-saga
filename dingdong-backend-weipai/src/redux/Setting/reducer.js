import {
    SETTING_EMPTY,
    SETTING_RESULT,
    SETTING_PAGE,
    SETTING_FREEZE_RECORD_RES,
    SETTING_FREEZE_RECORD_HANDLE_RES,
    USER_SETTING_LISTS_RES,
    USER_SETTING_DETAILS_RES,
    USER_SETTING_PASS_ON_RES,
    TRADING_ORDER_EXPORT_DATA,
    MONEY_DETAIL_EXPORT_DATA_SUCCESS,
    ADSPOKESMAN_LIST_RES,
    ADSPOKESMAN_PASS_ON_RES,
    ADSPOKESMAN_DETAILS_RES,
    ADFINDACTIVITY_LIST_RES,
    ADFINDACTIVITY_PASS_ON_RES,
    ADFINDACTIVITY_DETAILS_RES,
    NEWSBULLETIN_LIST_RES, // 新闻公告
    NEWSBULLETIN_ADD_RES,
    NEWSBULLETIN_DELETE_RES,
    NEWSBULLETIN_EDIT_RES,
    NEWSBULLETIN_LOWER_RES,
    NEWSBULLETIN_DETAIL_RES,
    NEWSBULLETIN_RELEASE_RES,
    NOVICEGUIDE_LIST_RES, // 新手指引
    NOVICEGUIDE_ADD_RES,
    NOVICEGUIDE_PASS_RES,
    NOVICEGUIDE_DETAIL_RES,
    NOVICEGUIDE_DELETE_RES

} from './constants';

import {timestampToTime} from '../../common/js/common';

import { Message } from '@alifd/next';
import { fromJS } from 'immutable';
  
  // store默认值
  const initialState = {
    pages:1,
    total:0,
    SETTINGList:[],
    detail:{}
  };
  
  function accountReducer(state = initialState, action) {
    switch (action.type) {
      case SETTING_EMPTY:
        state.SETTINGList = []
        state.total = 0
        return Object.assign({},state); 

      case SETTING_PAGE:
        // console.log(action.page)
        state.pages = action.page
        return Object.assign({},state);

      case USER_SETTING_PASS_ON_RES:
        // console.log(action.response)
        if(action.response.errorCode==0){
          Message.success('修改成功')
          if([21003,21004].includes(action.response.pid)){
            setTimeout(() => {
              window.location.hash=`/financialManagement/FinaSETTINGOperation`
            }, 1000);
          }else{
            setTimeout(() => {
              location.reload() 
            }, 1000);
          }
        }
        return Object.assign({},state);
        
      
      case USER_SETTING_LISTS_RES:
        // console.log(action)
        state.total = action.response.total
        if( action.response.data.adList!= null ){
          state.SETTINGList = action.response.data.adList
        }else{
          state.SETTINGList = []
          Message.success('暂无数据')
        }
        return Object.assign({},state);  
      
      case USER_SETTING_DETAILS_RES:
        // console.log(action.response.data)
        if( action.response.data.detail != null ){
          state.detail = action.response.data.detail
        }else{
          state.detail = {}
        }
        return Object.assign({},state);
          
      case ADSPOKESMAN_LIST_RES: // 代言人宣传页列表
      state.total = action.response.total
        if (action.response.data.list != null) {
          state.SETTINGList = action.response.data.list
        } else {
          state.SETTINGList = []
          Message.success('暂无数据')
        }
        return Object.assign({}, state)

      case ADSPOKESMAN_PASS_ON_RES: // 代言人列表操作
        if (action.response.errorCode == 0) {
          Message.success('操作成功')
          setTimeout(() => {
            location.reload() 
          }, 1000);
        }
        return Object.assign({}, state)

      case ADSPOKESMAN_DETAILS_RES: // 代言人详情
        if (action.response.data != null) {

        } else {

        }
        return Object.assign({}, state)
      
      case ADFINDACTIVITY_LIST_RES: // APP发现页列表
        state.total = action.response.total
        if (action.response.data.adList != null) {
          state.SETTINGList = action.response.data.adList
        } else {
          state.SETTINGList = []
          Message.success('暂无数据')
        }
        return Object.assign({}, state)

      case ADFINDACTIVITY_PASS_ON_RES: // APP发现页操作
        if (action.response.errorCode == 0) {
          Message.success('操作成功')
          setTimeout(() => {
            location.reload() 
          }, 1000);
        }
        return Object.assign({}, state)

      case ADFINDACTIVITY_DETAILS_RES: // APP发现页详情
        if (action.response.data != null) {

        }
        return Object.assign({}, state)

      case NEWSBULLETIN_LIST_RES: // 新闻公告列表
        state.total = action.response.total
        if (action.response.data.list != null) {
          state.SETTINGList = action.response.data.list
        } else {
          state.SETTINGList = []
          Message.success('暂无数据')
        }
        return Object.assign({}, state)

      case NEWSBULLETIN_DETAIL_RES: // 新闻公告详情
        if (action.response.data.detail != null) {
          action.response.data.detail.startTime = timestampToTime(action.response.data.detail.startTime)
          action.response.data.detail.endTime = timestampToTime(action.response.data.detail.endTime)
          action.response.data.detail.platform = action.response.data.detail.platform.split(',')
          state.detail = action.response.data.detail
        }
        return Object.assign({}, state)

      case NEWSBULLETIN_ADD_RES: // 新闻公告添加
        if (action.response.errorCode == 0) {
          Message.success('添加成功')
          setTimeout(() => {
            window.location.href = '/#/setting/NewsBulletin'
          }, 1000);
        }
        return Object.assign({}, state)

      case NEWSBULLETIN_DELETE_RES: // 新闻公告删除
        if (action.response.errorCode == 0) {
          Message.success('删除成功')
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }
        return Object.assign({}, state)

      case NEWSBULLETIN_EDIT_RES: // 新闻公告编辑
        if (action.response.errorCode == 0) {
          Message.success('编辑成功')
          setTimeout(() => {
            window.location.href = '/#/setting/NewsBulletin'
          }, 1000);
        }
        return Object.assign({}, state)

      case NEWSBULLETIN_LOWER_RES: // 新闻公告下架
        if (action.response.errorCode == 0) {
          Message.success('下架成功')
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }
        return Object.assign({}, state)

      case NEWSBULLETIN_RELEASE_RES: // 新闻公告发布
        if (action.response.errorCode == 0) {
          Message.success('发布成功')
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }
        return Object.assign({}, state)

      case NOVICEGUIDE_LIST_RES: // 新手指引
        state.total = action.response.total
        if (action.response.data) {
          state.SETTINGList = action.response.data.NewUserPointList
        } else {
          state.SETTINGList = []
          Message.success('暂无数据')
        }
        return Object.assign({}, state)

      case NOVICEGUIDE_ADD_RES: // 添加新手指引
        if (action.response.errorCode == 0) {
          Message.success('新增编辑成功')
          setTimeout(() => {
            window.location.href = '/#/setting/NoviceGuide'
          }, 1000);
        }
        return Object.assign({}, state)

      case NOVICEGUIDE_PASS_RES: // 操作
        if (action.response.errorCode == 0) {
          Message.success('操作成功')
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }
        return Object.assign({}, state)

      case NOVICEGUIDE_DETAIL_RES: // 详情
        if (action.response.data.info != null) {
          state.detail = {}
          action.response.data.info.platform = action.response.data.info.platform.split(',')
          state.detail = action.response.data.info
        }
        return Object.assign({}, state)

      case NOVICEGUIDE_DELETE_RES: // 删除
        if (action.response.errorCode == 0) {
          Message.success('删除成功')
            setTimeout(() => {
              window.location.reload()
            }, 1000);
        }
        return Object.assign({}, state)

      default:
        return state;
    }
  }
  
  export default accountReducer;
  