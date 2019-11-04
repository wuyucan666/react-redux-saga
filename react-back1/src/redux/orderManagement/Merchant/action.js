import {
  WEIPAI_ORDER_CONDITION,
  WEIPAI_ORDER_PAGE,
  WEIPAI_ORDER_LIMIT,
  WEIPAI_ORDER_DETAILS,
  WEIPAI_ORDER_INFO,
  WEIPAI_ORDER_LIST_EMPTY,
  GROUP_ORDER_DETAIL_PASS,
  GROUP_ORDER_DETAIL_FAIL,
  MODIFY_COMMIT_GB_REQ,
  MODIFY_RECORD_GB_REQ,
  ORDER_LIST_EXPORT_DATA,
} from './constants';

/*
20350  修改 -- 新增changeStartFlag 字段标识符
20352  新增 --  团购拍场修改开始时间
20353  新增 --  团购拍场修改开始时间记录
*/
export const orderCondition = (parmas) => {
  return {
    type: WEIPAI_ORDER_CONDITION,
    parmas,
  };
};

export const orderResultPage = (page) => {
  return {
    type: WEIPAI_ORDER_PAGE,
    page,
  };
};

export const orderResultLimit = (limit) => {
  return {
    type: WEIPAI_ORDER_LIMIT,
    limit,
  };
};

export const orderDetailList = (parmas) => {
  return {
    type: WEIPAI_ORDER_DETAILS,
    parmas,
  };
};

export const orderDetailInfo = (parmas) => {
  return {
    type: WEIPAI_ORDER_INFO,
    parmas,
  };
};

export const userListEmpty = (val) => {
  return {
    type: WEIPAI_ORDER_LIST_EMPTY,
    val,
  };
};

export const userSnPass = (val) => {
  return {
    type: GROUP_ORDER_DETAIL_PASS,
    val,
  };
};

export const userSnFail = (val) => {
  return {
    type: GROUP_ORDER_DETAIL_FAIL,
    val,
  };
};

export const gbModifyCommit = (parmas) => {
  return {
    type: MODIFY_COMMIT_GB_REQ,
    parmas: {
      ...parmas,
      pid: 20352,
    },
  };
};

export const gbModifyRecord = (parmas) => {
  return {
    type: MODIFY_RECORD_GB_REQ,
    parmas: {
      ...parmas,
      pid: 20353,
    },
  };
};
// 打印
export const ExportData = (parmas) => {
  return {
    type: ORDER_LIST_EXPORT_DATA,
    parmas: {
      ...parmas,
      pid: 20502,
    },
  };
};
