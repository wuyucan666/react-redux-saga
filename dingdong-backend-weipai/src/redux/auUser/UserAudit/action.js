import {
  USER_AUDIT_CONDITION,
  USER_AUDIT_PAGE,
  USER_AUDIT_AGREEDID,
  USER_LIST_CONDITION,
  USER_LIST_PAGE,
  USER_DETAIL_CONDITION,
  DELETE_INVITE_USER_CONDITION,
  UPDATE_INVITE_USER_CONDITION,
  ACCOUNT_INVITE_USER_CONDITION,
  USER_INFORMATION_1CONDITION,
  USER_INFORMATION_2CONDITION,
  USER_INFORMATION_3CONDITION,
  INVITATION_CONDITION,
  PRIVACY_CONDITION,
  WEIPAI_MERCHANT_LIST_EMPTY,
  DASHBOARD_CONDITION,
  ADD_USER_CONMIT,
  ADD_USER_CONMIT_CHECKID,
} from './constants';


export const userAudit = (parmas) => {
  return {
    type: USER_AUDIT_CONDITION,
    parmas,
  };
};

export const userAuditPage = (page) => {
  return {
    type: USER_AUDIT_PAGE,
    page,
  };
};

export const userAuditId = (id) => {
  return {
    type: USER_AUDIT_AGREEDID,
    id,
  };
};

export const userList = (parmas) => {
  return {
    type: USER_LIST_CONDITION,
    parmas,
  };
};

export const userListPage = (page) => {
  return {
    type: USER_LIST_PAGE,
    page,
  };
};

export const userDetail = (parmas) => {
  return {
    type: USER_DETAIL_CONDITION,
    parmas,
  };
};

export const deleteInviteUser = (id) => {
  return {
    type: DELETE_INVITE_USER_CONDITION,
    id,
  };
};

export const updateInviteUser = (parmas) => {
  console.log(parmas);
  return {
    type: UPDATE_INVITE_USER_CONDITION,
    parmas,
  };
};

export const accountInviteUser = (parmas) => {
  return {
    type: ACCOUNT_INVITE_USER_CONDITION,
    parmas,
  };
};

export const userInformation1 = (parmas) => {
  return {
    type: USER_INFORMATION_1CONDITION,
    parmas,
  };
};

export const userInformation2 = (parmas) => {
  return {
    type: USER_INFORMATION_2CONDITION,
    parmas,
  };
};

export const userInformation3 = (parmas) => {
  return {
    type: USER_INFORMATION_3CONDITION,
    parmas,
  };
};

export const invitationList = (parmas) => {
  return {
    type: INVITATION_CONDITION,
    parmas,
  };
};

export const privacyList = (parmas) => {
  return {
    type: PRIVACY_CONDITION,
    parmas,
  };
};

export const userListEmpty = (val) => {
  return {
    type: WEIPAI_MERCHANT_LIST_EMPTY,
    val,
  };
};

export const userdashBoard = (val) => {
  return {
    type: DASHBOARD_CONDITION,
    val,
  };
};

export const addUser = (parmas) => {
  return {
    type: ADD_USER_CONMIT,
    parmas,
  };
};

export const checkID = (parmas) => {
  return {
    type: ADD_USER_CONMIT_CHECKID,
    parmas,
  };
};
