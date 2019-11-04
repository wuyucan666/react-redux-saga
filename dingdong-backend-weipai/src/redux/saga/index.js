import { all, fork } from 'redux-saga/effects';
import userLogin from '../UserLogin/saga.js';
import userPipe from '../FinancialManagement/UserPipelineQuery/saga.js';
import userAccount from '../FinancialManagement/moneyList/saga.js';
import tradingOrder from '../FinancialManagement/TradingOrderlist/saga.js';
import chargeSingleAudit from '../FinancialManagement/ChargeSingle/saga.js';
import wpMerchant from '../Weipai/Merchant/saga.js';
import UserAudit from '../auUser/UserAudit/saga.js';
import Permission from '../Permission/Role/saga';
import auMessage from '../auMessage/Merchant/saga';
import orderManagement from '../orderManagement/Merchant/saga';
import integraList from '../integraList/saga';
import Coupons from '../Coupons/saga';
import ActivityList from '../Activity/saga';
import Version from '../Version/saga';
// import Record from '../Record/saga';//日志模块
import PasswordActivity from '../PasswordActivity/saga';// 叮咚令,代言令
import Setting from '../Setting/saga';// 设置管理

export default function* root() {
  yield all([
    fork(userLogin),
    fork(userPipe),
    fork(userAccount),
    fork(tradingOrder),
    fork(chargeSingleAudit),
    fork(wpMerchant),
    fork(UserAudit),
    fork(Permission),
    fork(auMessage),
    fork(orderManagement),
    fork(integraList),
    fork(Coupons),
    fork(ActivityList),
    fork(Version),
    // fork(Record),
    fork(PasswordActivity),
    fork(Setting),
  ]);
}
