import {
    PERMISSION_ROLE_CONDITION,
    PERMISSION_ROLE_PAGE,
    PERMISSION_ROLE_DETAIL_SN,
    PERMISSION_ROLE_ADD_ROLE_PASS,
    PERMISSION_ROLE_GET_PERMISSION,
    PERMISSION_ROLE_LIST_EMPTY,
    PERMISSION_ASIDE_LIST,
    PERMISSION_ROLE_GET_PARENT_ROLE
  } from './constants';


export const userCondition =(parmas) => {
    return {
        type: PERMISSION_ROLE_CONDITION,
        parmas
    }
};

export const userResultPage =(page) => {
    return {
        type: PERMISSION_ROLE_PAGE,
        page
    }
};

export const userResultDetail =(parmas) => {
    return {
        type: PERMISSION_ROLE_DETAIL_SN,
        parmas
    }
};

export const userAddRole =(val) => {
    return {
        type: PERMISSION_ROLE_ADD_ROLE_PASS,
        val
    }
};
export const userDelRole =(val) => {
    return {
        type: PERMISSION_ROLE_ADD_ROLE_PASS,
        val
    }
};
export const userGetPermission =(val) => {
    return {
        type: PERMISSION_ROLE_GET_PERMISSION,
        val
    }
};
export const userListEmpty =(val) => {
    return {
        type: PERMISSION_ROLE_LIST_EMPTY,
        val
    }
};
//侧边栏
export const asideList =(list) => {
    return {
        type: PERMISSION_ASIDE_LIST,
        list
    }
};

//自身角色
export const parentRole =(role) => {
    return {
        type: PERMISSION_ROLE_GET_PARENT_ROLE,
        role
    }
};