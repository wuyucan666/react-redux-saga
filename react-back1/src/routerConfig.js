// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
import React from 'react';
import { getRouterData } from './utils/utils';
import { asideMenuConfig } from './menuConfig';

// 用户文件夹auUser
import UserAudit from './pages/auUser/UserAudit'; // 审核修改邀请人
import UserDetail from './pages/auUser/UserDetail'; // 用户详情
import InviteFriendsList from './pages/auUser/InviteFriendsList'; // 邀请好友  ==找到页面
import UserList from './pages/auUser/UserList'; // 用户列表
import Privacy from './pages/auUser/Privacy'; // 用户隐私
import UserCoupons from './pages/auUser/UserCoupons'; // 用户优惠券
import UserAdd from './pages/auUser/UserAdd'; // 新增用户

// 微拍消息文件夹auMessage
import auSiteMessage from './pages/auMessage/auSiteMessage'; // 站内消息
import EditMessage from './pages/auMessage/EditMessage'; // 编辑消息
import UpdateMessage from './pages/auMessage/UpdateMessage'; // 修改消息


// 财务模块financialManagement文件夹下面
import moneyList from './pages/financialManagement/moneyList'; // 资金明细
import UserPipelineQuery from './pages/financialManagement/UserPipelineQuery'; // 用户流水查询/提现列表
import UserCharge from './pages/financialManagement/UserCharge'; // 用户流水查询/充值列表
import WithdrawalApplicationDetails from './pages/financialManagement/WithdrawalApplicationDetails'; // 提现到银行卡详情
import ChargeAudit from './pages/financialManagement/ChargeAudit'; // 充值审核列表
import ChargeSingle from './pages/financialManagement/ChargeSingle'; // 添加充值补单
import ChargeSingleAdd from './pages/financialManagement/ChargeSingleAdd'; // 充值补单列表
import ChargeSingleDetail from './pages/financialManagement/ChargeSingleDetail'; // 充值补单列表详情
import ChargeSingleAudit from './pages/financialManagement/ChargeSingleAudit'; // 充值审核详情
import TradingOrderlist from './pages/financialManagement/TradingOrderlist'; // 交易订单列表
import OrderDetails from './pages/financialManagement/OrderDetails'; // 交易订单列表/订单详情
import OfflineList from './pages/financialManagement/OfflineList'; // 线下充值列表
import OfflineDetail from './pages/financialManagement/OfflineDetail'; // 线下充值详情
import FinaCouponOperation from './pages/financialManagement/FinaCouponOperation'; // 审核运营优惠券
import CouponDetail from './pages/financialManagement/CouponDetail'; // 审核补发优惠券


// 商户管理文件夹auMerchants
import MerchantsList from './pages/auMerchants/MerchantsList'; // 商户管理/商户列表
import MerchantsAuditList from './pages/auMerchants/MerchantsAuditList'; // 商户管理/商户审核列表
import SiteManagement from './pages/auMerchants/SiteManagement'; // 商户管理/拍场管理
import WithdrawAuction from './pages/auMerchants/WithdrawAuction'; // 商户管理/收拍管理
import MerchantDetails from './pages/auMerchants/MerchantDetails'; // 商户管理/商户详情
import AddMerchants from './pages/auMerchants/AddMerchants'; // 商户管理/添加商户
import MerchantAuditDetails from './pages/auMerchants/MerchantAuditDetails'; // 商户管理/商户审核详情
import AuctionDetails from './pages/auMerchants/AuctionDetails'; // 商户管理/拍品详情

// 订单管理文件夹
import AuOrder from './pages/orderManagement/AuOrder'; // 订单管理/订单列表
import GbOrder from './pages/orderManagement/GbOrder'; // 订单管理/团购订单GbDetails
import DefaultNum from './pages/orderManagement/DefaultNum'; // 订单管理/违约数
import DoveNum from './pages/orderManagement/DoveNum'; // 订单管理/鸽子数
import OrderDetail from './pages/orderManagement/OrderDetail'; // 微拍订单管理/订单详情
import GbDetails from './pages/orderManagement/GbDetails'; // 团购订单管理/订单详情

// 日志文件夹auRecord
//  import AbnormalOrders from './pages/auRecord/AbnormalOrders'; // 异常日志

// 权限文件夹permissionsManagement
import RoleManagement from './pages/permissionsManagement/RoleManagement'; // 角色管理
import AddRoles from './pages/permissionsManagement/AddRoles'; // 添加角色
import ChildRoleList from './pages/permissionsManagement/ChildRoleList'; // 子角色列表
import MembersList from './pages/permissionsManagement/MembersList'; // 成员列表
import EditMember from './pages/permissionsManagement/EditMember'; // 编辑成员
import AddMember from './pages/permissionsManagement/AddMember'; // 添加成员
import InterfaceList from './pages/permissionsManagement/InterfaceList'; // 界面权限列表
import permissionsList from './pages/permissionsManagement/permissionsList'; // 接口权限列表

import integraList from './pages/integraList'; // 积分列表

// 8-28优惠券列表
import CouponList from './pages/Coupon/CouponList'; // 优惠券列表
import CouponReceiveDetails from './pages/Coupon/CouponReceiveDetails'; // 优惠券列表
import CouponDetails from './pages/Coupon/CouponDetails'; // 优惠券详情页
import CouponEdit from './pages/Coupon/CouponEdit'; // 编辑优惠券
import CouponIssue from './pages/Coupon/CouponIssue'; // 发放优惠券


// 活动文件夹coupons/activity
import ActivityList from './pages/Activity/ActivityList'; // 活动列表*/
import RaffleList from './pages/Activity/RaffleList'; // 大转盘活动列表*/
import IssueDetails from './pages/Activity/IssueDetails'; // 发放详情/
import RegisteredList from './pages/Activity/RegisteredList'; // 注册有礼列表*/
import RegisteredDetails from './pages/Activity/RegisteredDetails'; // 注册有礼详情页*/
import InvitationList from './pages/Activity/InvitationList'; // 邀请有礼列表*
import InvitationDetails from './pages/Activity/InvitationDetails'; // 邀请有礼基础奖励详情/
import InvitationAdditionalDetails from './pages/Activity/InvitationAdditionalDetails'; // 邀请额外奖励详情/
import ShootList from './pages/Activity/ShootList'; // 送拍有礼列表*/
import ShootDetails from './pages/Activity/ShootDetails'; // 送拍有礼详情/
import ReviewActivity from './pages/Activity/ReviewActivity'; // 送拍有礼详情/
import ReviewActivityDetail from './pages/Activity/ReviewActivityDetails'; // 送拍有礼详情/

// //版本发布Version
import Release from './pages/Version/Release';// 版本发布
import HistoricalRecordList from './pages/Version/HistoricalRecordList';// 版本历史记录
import VersionDetails from './pages/Version/VersionDetails';// 版本详情
import EditVersion from './pages/Version/EditVersion';// 版本详情

// 日志Record
// import RecordList from './pages/Record/RecordList';//登陆日志

// 叮咚令PasswordActivity
import DdListActivities from './pages/PasswordActivity/DdListActivities';// 叮咚令活动列表
import UserReceiveDetails from './pages/PasswordActivity/UserReceiveDetails';// 用户领取详情
import UserReceive from './pages/PasswordActivity/UserReceive';// 用户领取列表
import EListActivities from './pages/PasswordActivity/EListActivities';// 代言令活动列表
import ReviewDetails from './pages/PasswordActivity/ReviewDetails';// 代言令活动审核详情
import DistributionGift from './pages/PasswordActivity/DistributionGift';// 代言令发放礼品
import CreateActivity from './pages/PasswordActivity/CreateActivity';// 创建叮咚令
import DdEventDetails from './pages/PasswordActivity/DdEventDetails';// 叮咚令活动详情
import IssueRecord from './pages/PasswordActivity/IssueRecord';// 发放记录
import Cooperative from './pages/PasswordActivity/Cooperative';// 合作记录

// 管理设置

import AdBanner from './pages/SettingAdmin/AdBanner'; // 广告位
import AdFindActivity from './pages/SettingAdmin/AdFindActivity'; // App 发现活动
import AdSpokesman from './pages/SettingAdmin/AdSpokesman'; // App 发现活动
import NewsBulletin from './pages/SettingAdmin/NewsBulletin'; // 新闻公告
import NewsBulletinEdit from './pages/SettingAdmin/NewsBulletinEdit'; // 添加新闻公告
import NewsBulletinDetail from './pages/SettingAdmin/NewsBulletinDetail'; // 详情
import NewsBulletinUpdate from './pages/SettingAdmin/NewsBulletinUpdate'; // 详情
import NoviceGuide from './pages/SettingAdmin/NoviceGuide'; // 新手指引
import NoviceGuideEdit from './pages/SettingAdmin/NoviceGuideEdit'; // 添加新手指引
import NoviceGuideDetail from './pages/SettingAdmin/NoviceGuideDetail'; // 详情
import NoviceGuideUpdate from './pages/SettingAdmin/NoviceGuideUpdate'; // 详情

const UserLogin = React.lazy(() => import('./pages/UserLogin'));
const UserRegister = React.lazy(() => import('./pages/UserRegister'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Charts = React.lazy(() => import('./pages/Charts'));
const BasicCharts = React.lazy(() => import('./pages/BasicCharts'));
const Terms = React.lazy(() => import('./pages/Terms'));
const Result = React.lazy(() => import('./pages/Result'));
const BasicList = React.lazy(() => import('./pages/BasicList'));
const ProjectList = React.lazy(() => import('./pages/ProjectList'));
const BasicTable = React.lazy(() => import('./pages/BasicTable'));
const GeneralTable = React.lazy(() => import('./pages/GeneralTable'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Setting = React.lazy(() => import('./pages/Setting'));
const Fail = React.lazy(() => import('./pages/Fail'));
const Empty = React.lazy(() => import('./pages/Exception/Empty'));
const Forbidden = React.lazy(() => import('./pages/Exception/Forbidden'));
const NotFound = React.lazy(() => import('./pages/Exception/NotFound'));
const ServerError = React.lazy(() => import('./pages/Exception/ServerError'));

const routerConfig = [
  {
    path: '/financialManagement/ChargeSingleAudit',
    component: ChargeSingleAudit,
  },
  {
    path: '/financialManagement/ChargeSingleDetail',
    component: ChargeSingleDetail,
  },
  {
    path: '/financialManagement/UserPipelineQuery',
    component: UserPipelineQuery,
  },
  {
    path: '/financialManagement/OfflineList',
    component: OfflineList,
  },
  {
    path: '/financialManagement/OfflineDetail',
    component: OfflineDetail,
  },
  {
    path: '/financialManagement/FinaCouponOperation',
    component: FinaCouponOperation,
  },
  {
    path: '/financialManagement/CouponDetail',
    component: CouponDetail,
  },
  {
    path: '/chart/basic',
    component: BasicCharts,
  },
  {
    path: '/list/basic',
    component: BasicList,
  },
  {
    path: '/list/general',
    component: ProjectList,
  },
  {
    path: '/result/success',
    component: Result,
  },
  {
    path: '/result/fail',
    component: Fail,
  },
  {
    path: '/table/basic',
    component: BasicTable,
  },
  {
    path: '/profile/basic',
    component: Profile,
  },
  {
    path: '/chart/general',
    component: Charts,
  },
  {
    path: '/table/general',
    component: GeneralTable,
  },
  {
    path: '/dashboard/monitor',
    component: Dashboard,
  },
  {
    path: '/profile/general',
    component: Terms,
  },
  {
    path: '/account/setting',
    component: Setting,
  },
  {
    path: '/exception/204',
    component: Empty,
  },
  {
    path: '/exception/403',
    component: Forbidden,
  },
  {
    path: '/user/login',
    component: UserLogin,
  },
  {
    path: '/user/register',
    component: UserRegister,
  },
  {
    path: '/auUser/UserList',
    component: UserList,
  },
  {
    path: '/auUser/UserAdd',
    component: UserAdd,
  },
  {
    path: '/auUser/UserAudit',
    component: UserAudit,
  },
  {
    path: '/auUser/UserDetail',
    component: UserDetail,
  },
  {
    path: '/auUser/InviteFriendsList',
    component: InviteFriendsList,
  },
  {
    path: '/auUser/UserCoupons',
    component: UserCoupons,
  },
  {
    path: '/auUser/Privacy',
    component: Privacy,
  },
  {
    path: '/exception/404',
    component: NotFound,
  },
  {
    path: '/auMessage/EditMessage',
    component: EditMessage,
  },
  {
    path: '/auMessage/UpdateMessage',
    component: UpdateMessage,
  },
  {
    path: '/financialManagement/moneyList',
    component: moneyList,
  },
  {
    path: '/exception/500',
    component: ServerError,
  },
  {
    path: '/financialManagement/UserCharge',
    component: UserCharge,
  },
  {
    path: '/financialManagement/ChargeSingle',
    component: ChargeSingleAdd,
  },
  {
    path: '/financialManagement/ChargeSingleAdd',
    component: ChargeSingle,
  },
  {
    path: '/auMessage/auSiteMessage',
    component: auSiteMessage,
  },
  {
    path: '/financialManagement/WithdrawalApplicationDetails',
    component: WithdrawalApplicationDetails,
  },
  {
    path: '/financialManagement/ChargeAudit',
    component: ChargeAudit,
  },
  {
    path: '/financialManagement/TradingOrderlist',
    component: TradingOrderlist,
  },
  {
    path: '/financialManagement/OrderDetails',
    component: OrderDetails,
  },
  {
    path: '/integralManagement/integraList',
    component: integraList,
  },
  {
    path: '/auMerchants/MerchantsList',
    component: MerchantsList,
  },
  {
    path: '/auMerchants/MerchantsAuditList',
    component: MerchantsAuditList,
  },
  {
    path: '/auMerchants/SiteManagement',
    component: SiteManagement,
  },
  {
    path: '/auMerchants/WithdrawAuction',
    component: WithdrawAuction,
  },
  {
    path: '/auMerchants/MerchantDetails',
    component: MerchantDetails,
  },
  {
    path: '/auMerchants/AddMerchants',
    component: AddMerchants,
  },
  {
    path: '/auMerchants/MerchantAuditDetails',
    component: MerchantAuditDetails,
  },
  {
    path: '/auMerchants/AuctionDetails',
    component: AuctionDetails,
  },
  // {
  //   path: '/auRecord/AbnormalOrders',
  //   component: AbnormalOrders,
  // },
  {
    path: '/orderManagement/AuOrder',
    component: AuOrder,
  },
  {
    // path:'/auMerchants/GbOrder',
    path: '/orderManagement/GbOrder',
    component: GbOrder,
  },
  {
    path: '/orderManagement/DefaultNum',
    component: DefaultNum,
  },
  {
    path: '/orderManagement/DoveNum',
    component: DoveNum,
  },
  {
    path: '/orderManagement/OrderDetail',
    component: OrderDetail,
  },
  {
    path: '/orderManagement/GbDetails',
    component: GbDetails,
  },
  {
    path: '/permissionsManagement/RoleManagement',
    component: RoleManagement,
  },
  {
    path: '/permissionsManagement/MembersList',
    component: MembersList,
  },
  {
    path: '/permissionsManagement/ChildRoleList',
    component: ChildRoleList,
  },
  {
    path: '/permissionsManagement/AddRoles',
    component: AddRoles,
  },
  {
    path: '/permissionsManagement/EditMember',
    component: EditMember,
  },
  {
    path: '/permissionsManagement/AddMember',
    component: AddMember,
  },
  {
    path: '/permissionsManagement/InterfaceList',
    component: InterfaceList,
  },
  {
    path: '/permissionsManagement/permissionsList',
    component: permissionsList,
  },
  {
    path: '/Coupon/CouponList',
    component: CouponList,
  },
  {
    path: '/Coupon/CouponReceiveDetails',
    component: CouponReceiveDetails,
  },
  {
    path: '/Coupon/CouponDetails',
    component: CouponDetails,
  },
  {
    path: '/Coupon/CouponEdit',
    component: CouponEdit,
  },
  {
    path: '/Coupon/CouponIssue',
    component: CouponIssue,
  },
  {
    path: '/Activity/ActivityList',
    component: ActivityList,
  },
  {
    path: '/Activity/RaffleList',
    component: RaffleList,
  },
  {
    path: '/Activity/IssueDetails',
    component: IssueDetails,
  },
  {
    path: '/Activity/RegisteredList',
    component: RegisteredList,
  },
  {
    path: '/Activity/RegisteredDetails',
    component: RegisteredDetails,
  },
  {
    path: '/Activity/InvitationList',
    component: InvitationList,
  },
  {
    path: '/Activity/InvitationDetails',
    component: InvitationDetails,
  },
  {
    path: '/Activity/InvitationAdditionalDetails',
    component: InvitationAdditionalDetails,
  },
  {
    path: '/Activity/ShootList',
    component: ShootList,
  },
  {
    path: '/Activity/ShootDetails',
    component: ShootDetails,
  },
  {
    path: '/Activity/ReviewActivity',
    component: ReviewActivity,
  },
  {
    path: '/Activity/ReviewActivityDetail',
    component: ReviewActivityDetail,
  },
  {
    path: '/Version/VersionDetails',
    component: VersionDetails,
  },
  {
    path: '/Version/EditVersion',
    component: EditVersion,
  },
  {
    path: '/Version/HistoricalRecordList',
    component: HistoricalRecordList,
  },
  {
    path: '/Version/Release',
    component: Release,
  },
  // {
  //   path: '/Record/RecordList',
  //   component: RecordList,
  // },
  {
    path: '/PasswordActivity/DdListActivities',
    component: DdListActivities,
  },
  {
    path: '/PasswordActivity/UserReceiveDetails',
    component: UserReceiveDetails,
  },
  {
    path: '/PasswordActivity/UserReceive',
    component: UserReceive,
  },
  {
    path: '/PasswordActivity/EListActivities',
    component: EListActivities,
  },
  {
    path: '/PasswordActivity/ReviewDetails',
    component: ReviewDetails,
  },
  {
    path: '/PasswordActivity/DistributionGift',
    component: DistributionGift,
  },
  {
    path: '/PasswordActivity/CreateActivity',
    component: CreateActivity,
  },
  {
    path: '/PasswordActivity/DdEventDetails',
    component: DdEventDetails,
  },
  {
    path: '/PasswordActivity/Cooperative',
    component: Cooperative,
  },
  {
    path: '/PasswordActivity/IssueRecord',
    component: IssueRecord,
  },
  {
    path: '/setting/AdBanner',
    component: AdBanner,
  },
  {
    path: '/setting/AdFindActivity',
    component: AdFindActivity,
  },
  {
    path: '/setting/AdSpokesman',
    component: AdSpokesman,
  },
  {
    path: '/setting/NewsBulletin',
    component: NewsBulletin, // 新闻公告
  },
  {
    path: '/setting/NewsBulletinEdit',
    component: NewsBulletinEdit, // 添加新闻公告
  },
  {
    path: '/setting/NewsBulletinDetail',
    component: NewsBulletinDetail, // 新闻公告详情
  },
  {
    path: '/setting/NewsBulletinUpdate',
    component: NewsBulletinUpdate, // 编辑
  },
  {
    path: '/setting/NoviceGuide',
    component: NoviceGuide, // 新手指引
  },
  {
    path: '/setting/NoviceGuideEdit',
    component: NoviceGuideEdit, // 添加新手指引
  },
  {
    path: '/setting/NoviceGuideDetail',
    component: NoviceGuideDetail, // 新手指引详情
  },
  {
    path: '/setting/NoviceGuideUpdate',
    component: NoviceGuideUpdate, // 编辑
  },
];


const routerData = getRouterData(routerConfig, asideMenuConfig);

export { routerData };
