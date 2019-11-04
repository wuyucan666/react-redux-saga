import {
  USER_AUDIT_RESULT,
  USER_AUDIT_PAGE,
  USER_LIST_RESULT,
  USER_LIST_PAGE,
  USER_AUDIT_RESULT_SUCCE,
  USER_DETAIL_RESULT,
  DELETE_INVITE_USER_RESULT,
  UPDATE_INVITE_USER_RESULT,
  ACCOUNT_INVITE_USER_RESULT,
  USER_INFORMATION_1RESULT,
  USER_INFORMATION_2RESULT,
  USER_INFORMATION_3RESULT,
  INVITATION_RESULT,
  PRIVACY_RESULT,
  WEIPAI_MERCHANT_LIST_EMPTY,
  DASHBOARD_RESULT,
  ADDUSER_RESULT,
  CHECKID_RESULT,

} from './constants';
import { Message } from '@alifd/next';

// store默认值
const initialState = {
  lists: [],
  pages: 1,
  total: 1,
  object: {

  },
  userInvite: [],
  userProve: {},
  userStatisInfo: {},
  privacy: {
    address: [],
    card: [],
  },
  dashboardObj: {
    userInviteCheck: 0,
    auctionCheck: 0,
    groupbuyCheck: 0,
    shopCheck: 0,
    offlineRechargeCheck: 0,
    transCheck: 0,
    transExtraCheck: 0,
  },
  addUserData: {},
  checkIdData: {},
};

function accountReducer(state = initialState, action) {
  // console.log(state,)
  switch (action.type) {
    case WEIPAI_MERCHANT_LIST_EMPTY:
      state.object = {

      },
      state.userInvite = [],
      state.userProve = {},
      state.userStatisInfo = {},
      state.privacy = {};

      state.lists = [];
      return Object.assign([], state);

    case USER_AUDIT_RESULT:

      if (action.response.data == undefined) {
        Message.error(action.response.errorMsg);
      } else {
        state.lists = action.response.data.list;
        state.total = action.response.total;
      }
      return Object.assign([], state);


    case USER_AUDIT_PAGE:
      state.pages = action.page;
      return Object.assign(state);

    case USER_AUDIT_RESULT_SUCCE:
      if (action.response.errorCode == 0) {
        Message.success('已处理');
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        Message.error(action.response.errorMsg);
      }
      return Object.assign(state);

    case USER_LIST_RESULT:
      // console.log(action.response)
      if (action.response.data == null) {
        Message.error(action.response.errorMsg);
        state.lists = [];
        state.total = 0;
      } else {
        state.lists = action.response.data.list;
        state.total = action.response.total;
      }
      return Object.assign([], state);


    case USER_LIST_PAGE:
      state.pages = action.page;
      return Object.assign(state);


    case USER_DETAIL_RESULT:
      state.object = action.response.data;
      state.total = action.response.total;
      return Object.assign([], state);

    case DELETE_INVITE_USER_RESULT:
      console.log(action.response.errorCode);
      if (action.response.errorCode == 0) {
        Message.success('删除成功');
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        Message.error(action.response.errorMsg);
      }
      // state.object = action.response.data
      // state.total = action.response.total
      return Object.assign([], state);

    case UPDATE_INVITE_USER_RESULT:
      if (action.response.errorCode == 0) {
        Message.success('修改成功,请前往审核');
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        Message.error(action.response.errorMsg);
      }
      // state.object = action.response.data
      // state.total = action.response.total
      return Object.assign([], state);

    case ACCOUNT_INVITE_USER_RESULT:
      if (action.response.errorCode == 0) {
        Message.success('修改成功');
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        Message.error(action.response.errorMsg);
      }
      // state.object = action.response.data
      // state.total = action.response.total
      return Object.assign([], state);

    case USER_INFORMATION_1RESULT:
      state.userobj = action.response.data;
      return Object.assign([], state);

    case USER_INFORMATION_2RESULT:
      state.userProve = action.response.data;
      return Object.assign([], state);

    case USER_INFORMATION_3RESULT:
      state.userInvite = action.response.data;
      return Object.assign([], state);

    case INVITATION_RESULT:
      // console.log(action.response.data);
      state.lists = action.response.data.list;
      state.total = action.response.total;
      return Object.assign([], state);

    case PRIVACY_RESULT:
      if (action.response.data.list == null) {
        action.response.data.list = [];
      }
      switch (action.response.pid) {
        case 20115:
          state.privacy.address = action.response.data.list;
          break;

        case 20116:
          state.privacy.card = action.response.data.list;
          break;
      }
      // state.total = action.response.total
      return Object.assign([], state);

    case DASHBOARD_RESULT:
      state.dashboardObj = action.response.data;
      return Object.assign([], state);

    case ADDUSER_RESULT:
      state.addUserData = action.response;
      return Object.assign({}, state);
    case CHECKID_RESULT:
      state.checkIdData.id = action.response;
      return Object.assign({}, state);

    default:
      return state;
  }
}

export default accountReducer;

