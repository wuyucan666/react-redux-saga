// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: 'feedback',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: 'help',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const asideMenuConfig = [
  // {
  //   name: 'Dashboard',
  //   path: '/dashboard',
  //   icon: 'home2',
  //   children: [
  //     {
  //       name: 'monitor',
  //       path: '/dashboard/monitor',
  //     },
  //   ],
  // },
  // {
  //   name: 'chart',
  //   path: '/chart',
  //   icon: 'chart1',
  //   children: [
  //     {
  //       name: 'basic',
  //       path: '/chart/basic',
  //     },
  //     {
  //       name: 'general',
  //       path: '/chart/general',
  //     },
  //   ],
  // },
  // {
  //   name: '表格页',
  //   path: '/table',
  //   icon: 'table',
  //   children: [
  //     {
  //       name: 'basic',
  //       path: '/table/basic',
  //       // authority: 'admin',
  //     },
  //     {
  //       name: 'general',
  //       path: '/table/general',
  //       // authority: 'user',
  //     },
  //   ],
  // },
  // {
  //   name: '列表页',
  //   path: '/list',
  //   icon: 'copy',
  //   children: [
  //     {
  //       name: 'basic',
  //       path: '/list/basic',
  //     },
  //     {
  //       name: 'general',
  //       path: '/list/general',
  //     },
  //   ],
  // },
  // {
  //   name: 'profile',
  //   path: '/profile',
  //   icon: 'cascades',
  //   children: [
  //     {
  //       name: 'basic',
  //       path: '/profile/basic',
  //     },
  //     {
  //       name: 'terms',
  //       path: '/profile/general',
  //     },
  //   ],
  // },
  // {
  //   name: 'result',
  //   path: '/result',
  //   icon: 'edit2',
  //   children: [
  //     {
  //       name: 'success',
  //       path: '/result/success',
  //     },
  //     {
  //       name: 'fail',
  //       path: '/result/fail',
  //     },
  //   ],
  // },
  // {
  //   name: 'account',
  //   path: '/account',
  //   icon: 'person',
  //   children: [
  //     {
  //       name: 'setting',
  //       path: '/account/setting',
  //     },
  //   ],
  // },
  // {
  //   name: 'exception',
  //   path: '/exception',
  //   icon: 'gaojingxinxi',
  //   children: [
  //     {
  //       name: '204',
  //       path: '/exception/204',
  //     },
  //     {
  //       name: '403',
  //       path: '/exception/403',
  //     },
  //     {
  //       name: '404',
  //       path: '/exception/404',
  //     },
  //     {
  //       name: '500',
  //       path: '/exception/500',
  //     },
  //   ],
  // },
  // {
  //   name: '首页',
  //   path: '/dashboard/monitor',
  // },
  {
    name: 'auUser',
    path: '/auUser',
    // icon: 'gaojingxinxi',
    children: [
      {
        name: '用户列表',
        path: '/auUser/UserList',
      },
      {
        name: '审核修改邀请人',
        path: '/auUser/UserAudit',
      },
    ],
  },
  {
    name: 'auMessage',
    path: '/auMessage',
    // icon: 'gaojingxinxi',
    children: [
      {
        name: '站内消息',
        path: '/auMessage/auSiteMessage',
      },
    ],
  },
  {
    name: 'integralManagement',
    path: '/integralManagement',
    // icon: 'gaojingxinxi',
    children: [
      {
        name: '积分列表',
        path: '/integralManagement/integraList',
      },
    ],
  },
  {
    name: 'auMerchants',
    path: '/auMerchants',
    // icon: 'gaojingxinxi',
    children: [
      {
        name: '商户列表',
        path: '/auMerchants/MerchantsList',
      },
      {
        name: '商户审核列表',
        path: '/auMerchants/MerchantsAuditList',
      },
      {
        name: '拍场管理',
        path: '/auMerchants/SiteManagement',
      },
    ],
  },
  {
    name: 'orderManagement',
    path: '/orderManagement',
    // icon: 'gaojingxinxi',
    children: [
      {
        name: '订单列表',
        path: '/orderManagement/AuOrder',
      },
    ],
  },
  {
    name: 'auRecord',
    path: '/auRecord',
    // icon: 'gaojingxinxi',
    children: [
      {
        name: '异常日志',
        path: '/auRecord/AbnormalOrders',
      },
    ],
  },
  {
    name: 'financialManagement',
    path: '/financialManagement',
    // icon: 'gaojingxinxi',
    children: [
      {
        name: '资金明细',
        path: '/financialManagement/moneyList',
      },
      {
        name: '用户流水查询',
        path: '/financialManagement/UserPipelineQuery',
      },
      {
        name: '充值补单',
        path: '/financialManagement/ChargeSingle',
      },
      {
        name: '交易订单列表',
        path: '/financialManagement/TradingOrderlist',
      },
    ],
  },
  {
    name: 'permissionsManagement',
    path: '/permissionsManagement',
    // icon: 'gaojingxinxi',
    children: [
      {
        name: '角色管理',
        path: '/permissionsManagement/RoleManagement',
      },
      {
        name: '成员列表',
        path: '/permissionsManagement/MembersList',
      },
      {
        name: '界面权限列表',
        path: '/permissionsManagement/InterfaceList',
      },
      {
        name: '接口权限列表',
        path: '/permissionsManagement/permissionsList',
      },
    ],
  },
  {
    name: 'activity',
    path: '/activity',
    // icon: 'gaojingxinxi',
    children: [
      {
        name: '活动列表',
        path: '/Activity/ActivityList',
      },
      {
        name: '叮咚令',
        path: '/PasswordActivity/DdListActivities',
      },
      {
        name: '代言令',
        path: '/PasswordActivity/EListActivities',
      },
    ],
  },
];

// 高亮位置状态 nav表示要高亮的二级导航栏，path代表真实路径
const asideSwitchHover = [
  {
    nav: '/financialManagement/FinaCouponOperation',
    path: '/financialManagement/FinaCouponOperation',
  },
  {
    nav: '/financialManagement/FinaCouponOperation',
    path: '/financialManagement/FinaCouponSupply',
  },
  {
    nav: '/financialManagement/UserPipelineQuery',
    path: '/financialManagement/UserPipelineQuery',
  },
  {
    nav: '/financialManagement/UserPipelineQuery',
    path: '/financialManagement/UserCharge',
  },

  {
    nav: '/financialManagement/OfflineList',
    path: '/financialManagement/OfflineDetail',
  },
  {
    nav: '/Activity/ActivityList',
    path: '/Activity/RaffleList',
  },
  {
    nav: '/Activity/ActivityList',
    path: '/Activity/IssueDetails',
  },
  {
    nav: '/Activity/ActivityList',
    path: '/Activity/RegisteredList',
  },
  {
    nav: '/Activity/ActivityList',
    path: '/Activity/RegisteredDetails',
  },
  {
    nav: '/Activity/ActivityList',
    path: '/Activity/InvitationList',
  },
  {
    nav: '/Activity/ActivityList',
    path: '/Activity/InvitationDetails',
  },
  {
    nav: '/Activity/ActivityList',
    path: '/Activity/InvitationAdditionalDetails',
  },
  {
    nav: '/Activity/ActivityList',
    path: '/Activity/ShootList',
  },
  {
    nav: '/Activity/ActivityList',
    path: '/Activity/ShootDetails',
  },
  {
    nav: '/financialManagement/UserPipelineQuery',
    path: '/financialManagement/WithdrawalApplicationDetails',
  },
  {
    nav: '/financialManagement/OfflineList',
    path: '/financialManagement/OfflineDetail',
  },
  {
    nav: '/financialManagement/OfflineList',
    path: '/financialManagement/ChargeSingle',
  },
  {
    nav: '/financialManagement/OfflineList',
    path: '/financialManagement/ChargeSingleDetail',
  },
  {
    nav: '/financialManagement/UserPipelineQuery',
    path: '/financialManagement/WithdrawalApplicationDetails',
  },
  {
    nav: '/auMerchants/SiteManagement',
    path: '/orderManagement/GbOrder',
  },
  {
    nav: '/setting/AdBanner',
    path: '/setting/AdFindActivity',
  },
  {
    nav: '/setting/AdBanner',
    path: '/setting/AdSpokesman',
  },
  {
    nav: '/PasswordActivity/DdListActivities',
    path: '/PasswordActivity/CreateActivity',
  },
  {
    nav: '/setting/NewsBulletin',
    path: '/setting/NewsBulletinEdit',
  },
  {
    nav: '/setting/NewsBulletin',
    path: '/setting/NewsBulletinDetail',
  },
  {
    nav: '/setting/NewsBulletin',
    path: '/setting/NewsBulletinUpdate',
  },
  {
    nav: '/setting/NoviceGuide',
    path: '/setting/NoviceGuideDetail',
  },
  {
    nav: '/setting/NoviceGuide',
    path: '/setting/NoviceGuideEdit',
  },
  {
    nav: '/setting/NoviceGuide',
    path: '/setting/NoviceGuideUpdate',
  },
];

export { headerMenuConfig, asideMenuConfig, asideSwitchHover };
