import {
  PERMISSION_ROLE_RESULT,
  PERMISSION_ROLE_PAGE,
  PERMISSION_ROLE_DETAIL_CONTENT,
  PERMISSION_ROLE_ADD_ROLE_PASS_RES,
  PERMISSION_ROLE_GET_PERMISSION,
  PERMISSION_ROLE_LIST_EMPTY,
  PERMISSION_ASIDE_LIST_RES,
  PERMISSION_ROLE_GET_PARENT_ROLE_RES,
} from './constants';
import { Message } from '@alifd/next';

// store默认值
const initialState = {
  parentRole: '',
  lists: [],
  childRoleList: [],
  pages: 1,
  total: 1,
  auction: {},
  roleList: [],
  items: [],
  permission: [],
  aside: [],
  fatherName: '',
  listName: [],
  perListCheck: [],
};

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case PERMISSION_ROLE_LIST_EMPTY:
      state.lists = [];
      state.auction = {};
      state.childRoleList = [];
      state.parentRole = '';
      state.listName = [];
      return Object.assign([], state);
    case PERMISSION_ROLE_RESULT:
      if (action.pid == 20606) {
        const { data: list } = action.response;
        state.childRoleList = list;
        const midList = [];
        list.forEach(e => {
          midList.push(e.name);
        });
        // console.log(midList)
        const roleList = [];
        if (JSON.stringify(midList) !== '[]') {
          midList.forEach(e => {
            const obj = {};
            obj.label = e;
            obj.value = e;
            roleList.push(obj);
          });
        }
        // console.log(state.roleList)
        state.roleList = roleList;
      } else if (action.pid == 20602) {
        const { data: list } = action.response;
        // console.log(list);
        const listName = [];
        list.forEach((item, index) => {
          item.index = index;
          if (item.child.length !== 0) {
            item.child.forEach(ele => {
              ele.index = index;
              listName.push(ele.name);
            });
          } else {
            listName.push(item.name);
          }
        });
        // console.log(list,listName);
        // 倘若列表需要独一无二的key时，解放这些注释即可。
        // list.forEach((ele,i) => {
        //   ele.key = `${i}0${Math.round(Math.random()*10000)}`
        //   // console.log(ele,i)
        //   ele.child.forEach((e,index) => {
        //     e.key = `0${index}${Math.round(Math.random()*10000)}`
        //   });
        // });
        // console.log(list)
        const perListCheck = {};
        list.forEach(ele => {
          if (ele.child.length >= 1) {
            for (let index = 0; index < ele.child.length; index++) {
              const element = ele.child[index];
              perListCheck[element.name] = element.pid;
            }
          } else {
            perListCheck[ele.name] = ele.name;
          }
        });
        // console.log(perListCheck)
        state.permission = list;
        state.perListCheck = perListCheck;
        // state.listName = listName
      }
      else if (action.pid == 20609) {
        // console.log(action.response)
        state.fatherName = action.response.data.name;
      }
      else {
        state.lists = action.response.data;
        state.total = action.response.total;
      }
      return Object.assign([], state);

    case PERMISSION_ROLE_PAGE:
      state.pages = action.page;
      return Object.assign(state);

    case PERMISSION_ROLE_DETAIL_CONTENT:
      if (action.auction) {
        state.auction = action.response.data;
      } else {
        state.detail = action.response.data;
      }
      return Object.assign([], state);

    case PERMISSION_ROLE_ADD_ROLE_PASS_RES:
      const { errorCode, errorMsg, pid } = action.response;
      if ([20605, 20607].includes(pid)) {
        if (errorCode == 0) {
          Message.success('删除角色成功');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
      else if ([20601].includes(pid)) {
        Message.success('添加角色成功');
        window.location.hash = 'permissionsManagement/MembersList';
      }
      else if (errorCode == 0) {
        Message.success('添加成功');
        if (window.location.href.split('/')[5] !== 'permissionsList' &&
            window.location.href.split('/')[5] !== 'InterfaceList') {
          setTimeout(() => {
            // window.history.back(-1)
            window.location.hash = 'permissionsManagement/RoleManagement';
          }, 1000);
        }
      } else {
        Message.error(errorMsg);
      }

      return Object.assign(state);

    case PERMISSION_ROLE_GET_PERMISSION:
      state.items = [];
      state.items = action.val;
      return Object.assign([], state);

    case PERMISSION_ASIDE_LIST_RES:
      console.log(action.response.data);
      state.aside = action.response.data;

      return Object.assign([], state);

    case PERMISSION_ROLE_GET_PARENT_ROLE_RES:
      const { pid: rolePid, data } = action.response;
      if ([20610].includes(rolePid)) {
        const listName = [];
        data.forEach((item, index) => {
          item.index = index;
          if (item.child.length !== 0) {
            item.child.forEach(ele => {
              ele.index = index;
              listName.push(ele.name);
            });
          } else {
            listName.push(item.name);
          }
        });
        // console.log(listName)
        state.listName = listName;
      } else if ([20612].includes(rolePid)) {
        state.listName = data;
      }
      else {
        state.parentRole = data;
      }
      return Object.assign({}, state);
    default:
      return state;
  }
}

export default accountReducer;
