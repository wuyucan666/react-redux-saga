import {
  USER_ACCOUNT_EMPTY,
  USER_ACCOUNT_RESULT,
  USER_ACCOUNT_PAGE,
  USER_ACCOUNT_FREEZE_RECORD_RES,
  USER_ACCOUNT_FREEZE_RECORD_HANDLE_RES,
  USER_COUPON_LISTS_RES,
  USER_COUPON_DETAILS_RES,
  USER_COUPON_PASS_ON_RES,
  TRADING_ORDER_EXPORT_DATA,
  MONEY_DETAIL_EXPORT_DATA_SUCCESS,
} from './constants';

import { Message } from '@alifd/next';

// store默认值
const initialState = {
  lists: [],
  pages: 1,
  total: 0,
  balance: '0',
  freezeBalance: '0',
  freezeMargin: '0',
  margin: '0',
  recordList: {
    list: [],
  },
  nickname: '',
  couponList: [],
  detail: {},
};

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case USER_ACCOUNT_EMPTY:
      state.lists = [];
      state.recordList.list = [];
      return Object.assign({}, state);
    case USER_ACCOUNT_RESULT:
      // console.log('reducer:', action.response.data);
      if (action.response.data.list != null) {
        state.lists = action.response.data.list;
      } else {
        state.lists = [];
      }

      state.total = action.response.total;
      state.balance = action.response.data.balance;
      state.freezeBalance = action.response.data.freezeBalance;
      state.freezeMargin = action.response.data.freezeMargin;
      state.margin = action.response.data.margin;
      return Object.assign({}, state);

    case USER_ACCOUNT_PAGE:
      // console.log(action.page)
      state.pages = action.page;
      return Object.assign({}, state);

    case USER_ACCOUNT_FREEZE_RECORD_RES:
      const { list } = action.response.data;
      state.nickname = action.nickname.data.nickname;
      if (list) {
        state.recordList.list = list;
      }
      return Object.assign({}, state);

    case USER_ACCOUNT_FREEZE_RECORD_HANDLE_RES:
      if (action.response.errorCode == 0) {
        Message.success('修改成功');
        setTimeout(() => {
          location.reload();
        }, 0);
      }
      return Object.assign({}, state);

    case MONEY_DETAIL_EXPORT_DATA_SUCCESS:
      console.log(action);
      Message.success('导出成功');
      window.open(action.response.data.file_path);
      return Object.assign([], state);

    case USER_COUPON_PASS_ON_RES:
      console.log(action.response);
      if (action.response.errorCode == 0) {
        Message.success('修改成功');
        if ([21003, 21004].includes(action.response.pid)) {
          setTimeout(() => {
            window.location.hash = '/financialManagement/FinaCouponOperation';
          }, 1000);
        } else {
          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      }
      return Object.assign({}, state);


    case USER_COUPON_LISTS_RES:
      // console.log(state,action)
      state.total = action.response.total;
      if (action.response.data.list != null) {
        state.couponList = action.response.data.list;
      } else {
        state.couponList = [];
        Message.success('暂无数据');
      }
      return Object.assign({}, state);

    case USER_COUPON_DETAILS_RES:
      // console.log(action.response.data)
      if (action.response.data.detail != null) {
        state.detail = action.response.data.detail;
      } else {
        state.detail = {};
      }
      return Object.assign({}, state);

    default:
      return state;
  }
}

export default accountReducer;

