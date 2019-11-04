import {
  AU_MESSAGE_RESULT,
  AU_MESSAGE_PAGE,
  AU_MESSAGE_LIMIT,
  EDITMESSAGE_RESULT,
  AU_MESSAGE_LIST_EMPTY,
  EDITMESSAGE_DETAILS_RESULT,
} from './constants';
import { Message } from '@alifd/next';

// store默认值
const initialState = {
  lists: [],
  pages: 1,
  total: 1,
  detail: {
    addUuid: '',
  },
};

function accountReducer(state = initialState, action) {
  switch (action.type) {
    // case AU_MESSAGE_LIST_EMPTY:
    //     state.detail = {
    //   }
    //   state.lists=[]
    //   state.auction={}
    //   return Object.assign([],state);

    case AU_MESSAGE_LIST_EMPTY:
      state.lists = [];
      state.pages = 1;
      state.total = 1;
      state.detail = {};

      return Object.assign([], state);

    case AU_MESSAGE_RESULT:
      // state.lists = []
      // console.log('ggg')
      if (action.response.data.msgList == null) {
        state.lists = [];
      } else {
        state.lists = action.response.data.msgList;
      }
      state.total = action.response.total;
      return Object.assign([], state);

    case AU_MESSAGE_PAGE:
      state.pages = action.page;
      return Object.assign(state);

    case AU_MESSAGE_LIMIT:
      state.limit = action.limit;
      return Object.assign(state);

    case EDITMESSAGE_RESULT:
      if (action.response.errorCode == 0) {
        Message.success('消息添加成功');
        setTimeout(() => {
          window.location.href = '/#/auMessage/auSiteMessage';
        }, 1000);
      } else {
        Message.error(action.response.errorMsg);
      }
      return Object.assign([], state);

    case EDITMESSAGE_DETAILS_RESULT:
      state.detail = action.response.data.messInfo;
      return Object.assign([], state);

    default:
      return state;
  }
}

export default accountReducer;

