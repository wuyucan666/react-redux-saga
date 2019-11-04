import defaultImgSrc from '../images/avatar_110_110.jpg';

// 截取url参数第N个等号值
export const getQuery = (N) => {
  if (window.location.hash.split('=')[N]) {
    const val = window.location.hash.split('=')[N].split('&')[0];
    return val;
  }
  return null;
};
// 截取订单号
export const orderSn = window.location.hash.split('=')[1];
// render表格过滤器

// 价格
export const renderAmount = (value) => {
  if (value !== undefined && value !== null) {
    const num = Number(value);
    // console.log(num);
    return `${num / 100}元`;
  }
};
// 截取参数
export const GetQueryString = (paraName) => {
  const url = document.location.toString();
  const arrObj = url.split('?');
  if (arrObj.length > 1) {
    const arrPara = arrObj[1].split('&');
    let arr;
    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=');
      if (arr != null && arr[0] == paraName) {
        return arr[1];
      }
    }
    return '';
  }
  return '';

};

// 图片
export const imgUrl = (url) => {
  // console.log(url);
  if (url !== undefined && url !== null && url !== '') {
    switch (url.indexOf('https') >= 0) {
      case true:
        return url;
      case false:
        if (url == '') {
          return defaultImgSrc;
        }
        if (window.location.host == 'customer.ddybw.com' || window.location.host == 'test.customer.ddybw.com') {
          return `https://image.ddybw.com${url}`;
        }
        return `http://192.168.1.5:89/${url}`;

            // return 'https://image.ddybw.com' + url
            // return 'http://192.168.1.5:89/' + url
    }
  } else {
    // return '';
    return defaultImgSrc;
  }
};
// 图片(取消默认图片)
export const imgUrl2 = (url) => {
  // console.log(url);
  if (url !== undefined && url !== null && url !== '') {
    switch (url.indexOf('https') >= 0) {
      case true:
        return url;
      case false:
        if (url == '') {
          return '';
        }
        if (window.location.host == 'customer.ddybw.com' || window.location.host == 'test.customer.ddybw.com') {
          return `https://image.ddybw.com${url}`;
        }
        return `http://192.168.1.5:89/${url}`;

            // return 'https://image.ddybw.com' + url
            // return 'http://192.168.1.5:89/' + url
    }
  } else {
    // return '';
    return '';
  }
};

// 时间戳
export const renderTime = time => {
  if (time !== null && time !== undefined && time != 0) {
    return new Date(parseInt(time) * 1000).toLocaleString('chinese', { hour12: false }).replace(/:d{1,2}$/, ' ');
  }
  return '暂无';


};
// 会员等级
export const renderLevel = level => {
  if (level !== null && level !== undefined && level != 0) {
    return level;
  }
  return '暂无';


};
// 成交率
export const renderRate = rate => {
  if (rate !== null && rate !== undefined && rate != 0) {
    return `${rate / 10000 * 100}%`;
  }
  return '暂无';


};
// 性别
export const renderSex = sex => {
  switch (sex) {
    case '1':
      return '男';
    case '2':
      return '女';
    default:
      return '';
  }
};

// 财务管理
// 充值记录--类型
export const renderType = value => {
  switch (value) {
    case 'C':
      return '余额';
    case 'S':
      return '保证金';
    case 'M':
      return '订单';
    case 'G':
      return '订单';
    case 'M,G':
      return '订单';
    case 'C,S,M,G':
      return '';
        // case '1':
        //     return "微信"
        // case '2':
        //     return "支付宝"
        // case '3':
        //     return "银行卡"
        // case '4':
        //     return "线下汇款"
        // case '5':
        //     return "后台补单"
  }
};

// 充值记录--状态
export const renderStatus = value => {
  switch (value) {
    case '0':
      return '未付款';
    case '1':
      return '完成';
    case '2':
      return '失效';
    case '3':
      return '待付款';
    case '4':
      return '待入款';
    case '5':
      return '已取消';
    case '6':
      return '审核中';
    case '7':
      return '审核不通过';
  }
};
// 交易订单--确认收货
export const renderReceived = val => {
  if (val == 1) {
    return '是';
  }
  return '否';

};
// 交易订单--支付方式
export const renderPay = value => {
  switch (value) {
    case '1':
      return '微信';
    case '2':
      return '支付宝';
    case '3':
      return '银行卡';
    case '4':
      return '余额';
  }
};
// 拍场管理--审核状态
export const auditStatus = value => {
  switch (value) {
    case '1':
      return '已审核';
    case '2':
      return '审核通过';
    case '3':
      return '审核失败';
    case '0':
      return '未审核';
  }
};
// 资金明细--类型
export const renderMoneyType = value => {
  switch (value) {
    case 'C':
      return '余额充值';
    case 'M':
      return '微拍订单';
    case 'G':
      return '团购订单';
    case 'TS':
      return '转账送拍人';
    case 'S':
      return '保证金';
    case 'R':
      return '退款订单';
    case 'T':
      return '提现';
  }
};

// 用户流水--状态
export const renderPipeStatus = value => {
  switch (value) {
    case '0':
      return '全部';
    case '1':
      return '审核中';
    case '2':
      return '审核未通过';
    case '3':
      return '审核通过等待银行到账';
    case '4':
      return '已到账';
    case '5':
      return '提现失败';
  }
};

// 用户流水--支付方式
export const renderPipeType = value => {
  switch (value) {
    case '1':
      return '微信';
    case '2':
      return '支付宝';
    case '3':
      return '银行卡';
  }
};

// 用户补单状态--支付方式
export const renderMakeUpStatus = value => {
  switch (value) {
    case '0':
      return '未审核';
    case '1':
      return '审核通过';
    case '2':
      return '审核未通过';
  }
};

// 申请详情--状态
export const renderWADStatus = value => {
  switch (value) {
    case '1':
      return '审核中';
    case '2':
      return '审核未通过';
    case '3':
      return '审核通过等待银行到账';
    case '4':
      return '已到账';
    case '5':
      return '提现失败';
  }
};

// 用户
// 用户邀请人修改--状态
export const renderJudge = value => {
  switch (value) {
    case '0':
      return '审核中';
    case '1':
      return '审核通过';
    case '2':
      return '驳回';
  }
};
// 用户邀请人修改--状态
export const renderState = value => {
  switch (value) {
    case '0':
      return '审核中';
    case '1':
      return '审核通过';
    case '2':
      return '驳回';
  }
};

// 微拍
// 账号状态
export const renderAccountStatus = (value) => {
  switch (value) {
    case 1:
      return '正常';
    case 2:
      return '注销';
  }
};
// 用户账号状态
export const renderUserStatus = (value) => {
  switch (value) {
    case 0:
      return '正常';
    default:
      return '禁封';
  }
};
// //用户账号状态
// export const renderUserStatus = (value) => {
//     switch (value) {
//         case 0:
//         return "正常"
//         case 1:
//         return "禁止交易"
//         case 2:
//         return "冻结账户"
//         case 3:
//         return "禁止交易操作和冻结账户"
//       }
// };
// 审核状态
export const renderCheckStatus = (value) => {
  switch (value) {
    case '0':
      return '未审核';
    case '1':
      return '通过';
    case '2':
      return '拒绝';
  }
};

// 银行类项
export const bankType = (value) => {
  switch (value) {
    case '0':
      return '借记卡 储蓄卡 ';
    case '1':
      return '借贷卡 信用卡';
  }
};
// 审核详情-汇款方式
export const remittanceWay = (value) => {
  const val = Number(value);
  switch (val) {
    case 1:
      return '支付宝等app';
    case 2:
      return '网上银行转账';
    case 3:
      return 'ATM';
    case 4:
      return '银行柜台';
  }
};
// 商户审核状态
export const MerchantsAuditStatus = (value) => {
  switch (value) {
    case '0':
      return '未审核 ';
    case '1':
      return '通过';
    case '2':
      return '拒绝';
  }
};
// 商户审核人员
export const MerchantsAuditor = (value) => {
  switch (value) {
    case null:
      return '无';
    default:
      return value;
  }
};

// 微拍专场列表专场类型
export const AuctionListType = (value) => {
  switch (value) {
    case '0':
      return '全部';
    case '1':
      return '钱币 ';
    case '2':
      return '邮票';
  }
};

// 微拍专场列表专场状态
export const AuctionListStatus = (value) => {
  switch (value) {
    case '-2':
      return '审核未通过';
    case '-1':
      return '初始化';
    case '-1':
      return '初始化';
    case '0':
      return '未发布';
    case '1':
      return '预展中';
    case '2':
      return '拍卖中';
    case '3':
      return '已结束(交易中)';
    case '4':
      return '预热';
    case '5':
      return '审核中';
    case '6':
      return '交易结束';
  }
};

// 微拍专场列表专场审核状态
export const AuctionListAuditStatus = (value) => {
  switch (value) {
    case '0':
      return '未审核 ';
    case '1':
      return '已审核';
  }
};
// 品相
export const renderPhase = (value) => {
  switch (value) {
    case '1':
      return '评级';
    case '2':
      return '非评级';
    case '3':
      return '新票';
    case '4':
      return '盖销';
    case '5':
      return '信销';
  }
};

// 消息类型
export const msgType = (value) => {
  switch (value) {
    case '1':
      return '公告消息';
    case '2':
      return '活动消息';
    case '3':
      return '新闻';
    case '4':
      return '任务消息';
    case '5':
      return '系统消息';
  }
};

// 消息状态
export const msgstatus = (value) => {
  switch (value) {
    case '-1':
      return '删除';
    case '0':
      return '未发送';
    case '1':
      return '已发送';
  }
};

// 支付方式:0-未支付,1-微信,2-支付宝,3-银行卡,4-余额
export const orderpayType = (value) => {
  switch (value) {
    case '0':
      return '未支付';
    case '1':
      return '微信';
    case '2':
      return '支付宝';
    case '3':
      return '银行卡';
    case '4':
      return '余额';
    case '5':
      return '保证金';
    case '6':
      return '线下转账';
    case '-1':
      return '后台补单';
  }
};


// 订单状态:-4退款 -3关闭 -2取消 -1删除 0创建(待付款) 1支付(待发货) 2发货(已发货) 3确认收货 4完成
export const orderstatus = (value) => {
  switch (value) {
    case '-4':
      return '退款';
    case '-3':
      return '关闭';
    case '-2':
      return '取消';
    case '-1':
      return '删除';
    case '0':
      return '待付款';
    case '1':
      return '待发货';
    case '2':
      return '已发货';
    case '3':
      return '确认收货';
    case '4':
      return '已完成';
  }
};
// 支付方式--订单详情
export const snPayType = (value) => {
  switch (value) {
    case '0':
      return '未付款';
    case '1':
      return '微信';
    case '2':
      return '支付宝';
    case '3':
      return '银行卡';
    case '4':
      return '余额';
  }
};

// 拍品类型--订单详情
export const snShopType = (value) => {
  switch (value) {
    case 1:
      return '钱币';
    case 2:
      return '邮票';
  }
};

// 订单类型 1-微拍,2-团购
export const orderType = (value) => {
  switch (value) {
    case '0':
      return '无';
    case '1':
      return '微拍';
    case '2':
      return '团购';
    case '3':
      return '社区';
  }
};
// 订单类型数组 1-微拍,2-团购
export const orderTypeArr = (value) => {
  // let val = JSON.parse(value)
  let string = '';
  if (String(value).indexOf('1') != -1) {
    string += '微拍、';
  }
  if (String(value).indexOf('2') != -1) {
    string += '团购、';
  }
  if (String(value).indexOf('3') != -1) {
    string += '社区、';
  }
  string = string.slice(0, -1);
  return string;
};


// 去掉所有的html标记
export const delHtmlTag = (str) => {
  return str.replace(/<[^>]+>/g, '');
};

// 充值补单-审核状态
export const bdStatus = (value) => {
  switch (value) {
    case '1':
      return '待审核';
    case '2':
      return '审核通过';
    case '3':
      return '审核拒绝';
    case '4':
      return '已到账';
  }
};
// 充值补单-充值方类型
export const bdType = (value) => {
  const val = Number(value);
  switch (val) {
    case 1:
      return '银行';
    case 2:
      return '支付宝';
    case 3:
      return '微信';
    default:
      return '来源不明';
  }
};
// 线下充值-付款类型
export const oflPayType = (value) => {
  const val = Number(value);
  switch (val) {
    case 1:
      return '微信';
    case 2:
      return '支付宝';
    case 3:
      return '银行卡';
    case 6:
      return '线下转账';
        // case 5:
        // return "后台补单"
        // default:
        // return "来源不明"
  }
};
// 线下充值-汇款方式
export const oflRemittanceWay = (value) => {
  const val = Number(value);
  switch (val) {
    case 1:
      return '支付宝等app';
    case 2:
      return '网上银行转账';
    case 3:
      return 'ATM';
    case 4:
      return '银行柜台';
    default:
      return '来源不明';
  }
};
// 通过收货是否判断是否收货
export const renderReceivedByTime = (value) => {
  const val = Number(value);
  if (val > 0) return '是';
  return '否';
};

// 微拍 团购订单-审核状态
export const renderGborderStatus = value => {
  switch (value) {
    case '1':
      return '待审核';
    case '2':
      return '已通过';
    case '3':
      return '已驳回';
  }
};
// 微拍 订单当前状态
export const orderSituation = value => {
  switch (value) {
    case '-3':
      return '状态异常(关闭)';
    case '-2':
      return '状态异常(取消)';
    case '-1':
      return '状态异常(删除)';
    case '0':
      return '买家拍下藏品';
    case '1':
      return '买家付款到叮咚';
    case '2':
      return '卖家发货';
    case '3':
      return '买家确认收货';
    case '4':
      return '双方评价';
    case '5':
  }
};

// 资金明细原价格
export const renderOriginalAmount = (value, a, all) => {
  const num = Number(all.balance) - Number(all.amount);
  return `${num / 100}元`;
};

// 个人优惠券-审核状态
export const CouponsStatus = value => {
  switch (value) {
    case 0:
      return '未使用';
    case 1:
      return '已使用';
    case -1:
      return '失效';
  }
};

// 送拍有礼活动礼品
export const ShootType = value => {
  switch (value) {
    case 1:
      return '积分';
    case 2:
      return '抽奖券';
    case 3:
      return '优惠券';
  }
};

// 送拍有礼奖品状态
export const ShootCreateType = value => {
  switch (value) {
    case 1:
      return '获得(已发放)';
    case 2:
      return '使用(消耗)';
    case 3:
      return '未发放';
  }
};

// 送拍有礼渠道
export const ShootChannel = value => {
  switch (value) {
    case 1:
      return '签到';
    case 2:
      return '抽奖';
    case 3:
      return '邀请好友';
    case 4:
      return '送拍';
    case 5:
      return '注册';
    case 6:
      return '出价';
    case 7:
      return '确认收货';
    case 8:
      return '商家审核通过';
  }
};

// 大转盘奖品状态
export const RaffleStatus = value => {
  const val = Number(value);
  switch (val) {
    case 0:
      return '未发放';
    case 1:
      return '已发放';
  }
};

// 大转盘奖品类型
export const RaffleType = value => {
  switch (value) {
    case '0':
      return '抽奖券';
    case '1':
      return '优惠券';
    case '2':
      return '积分';
    case '3':
      return '实物';
  }
};

// 大转盘奖品类型
export const RegisteredStatus = value => {
  switch (value) {
    case '1':
      return '已发放';
  }
};


// 优惠券类型
export const CouponsType = value => {
  const val = Number(value);
  switch (val) {
    case 1:
      return '商户';
    case 2:
      return '平台';
  }
};

// 优惠券是否可叠加
export const CouponsIsAdd = value => {
  switch (value) {
    case null:
      return '不可叠加';
    case '':
      return '不可叠加';
    case '1':
      return '商家券';
    case '2':
      return '平台券';
  }
};

// 优惠券总金额
export const renderAllAmount = (v, o, all) => {
  const val = renderAmount(all.amount * all.total);
  return val;
};

// 优惠券有效期
export const renderValidityPeriod = (v, o, all) => {
  if (Number(all.receiveTime) === 0) {
    const val = `${Number(all.timeout) / 24 / 60 / 60}天有效`;
    return val;
  }
  const val = `${renderTime(Number(all.receiveTime))} —
        ${renderTime(Number(all.receiveTime) + Number(all.timeout))}`;
  return val;

};
// 优惠券有效领取时间
export const renderGetCouponTime = (v, o, all) => {
  const val = `${renderTime(Number(all.startTime))} —
        ${renderTime(Number(all.endTime))}`;
  return val;
};

// 优惠券有效天数
export const renderWorkingDay = (v) => {
  const val = `${Number(v) / 24 / 60 / 60}天有效`;
  return val;
};

// 优惠券状态
export const renderCouponsStatus = (value, b, all) => {
  // 0 库存中 1 已发放 2 审核中 3 审核失败  4:待提审 5已失效 -1 被删除
  const val = Number(value);
  switch (val) {
    case 0:
      if (Number(all.businessLimit) == 0) {
        return '库存中';
      }
      return '已发放';

      // return "已发放"
    case 1:
      return '已发放';
    case 2:
      return '审核中';
    case 3:
      return '审核失败';
    case 4:
      return '待提审';
    case 5:
      return '已失效';
    case -1:
      return '被删除';
  }
};


// 大转盘奖品状态
export const InvitationStatus = value => {
  switch (value) {
    case '1':
      return '已发放';
    case '2':
      return '未发放';
  }
};

// 活动对象
export const userType = value => {
  switch (value) {
    case '1':
      return '注册用户';
    case '2':
      return '新用户';
    case '3':
      return '送拍人员';
  }
};


// 版本发布
// 是否重新下载
export const reinstall = value => {
  value = Number(value);
  switch (value) {
    case 0:
      return '否';
    case 1:
      return '是';
  }
};

// 是否强制更新
export const forceUpdate = value => {
  value = Number(value);
  switch (value) {
    case 0:
      return '否';
    case 1:
      return '是';
  }
};


// html中“↵”换行符号处理
export const myString = value => {
  value = String(value);
  value.replace(/(\r\n|\n|\r)/gm, '<br/>');
  return value;

};

// 版本下载
export const versionDownload = value => {
  value = `${'http://192.168.1.5:90' + '/'}${value}`;
  return value;

};
// 活动状态
export const ActiveState = value => {
  value = Number(value);
  switch (value) {
    case 0:
      return '已下架';
    case 1:
      return '已发出';
    case -4:
      return '审核失败';
    case 3:
      return '审核中';
    case 4:
      return '待发出';
    case 2:
      return '待提审';
    case -5:
      return '已删除';
  }
};

// 活动状态
export const ActiveType = value => {
  value = Number(value);
  switch (value) {
    case 1:
      return '红包活动';
    case 2:
      return '转盘活动';
    case 3:
      return '积分抽奖活动';
    case 4:
      return '口令活动';
  }
};

// 代言人状态
export const Spokesman = value => {
  value = Number(value);
  switch (value) {
    case -2:
      return '已解约';
    case -1:
      return '审核失败';
    case 0:
      return '待审核';
    case 1:
      // return '审核通过';
      return '合作中';
  }
};

// 审核活动状态
export const ActiveCheckState = value => {
  value = Number(value);
  switch (value) {
    case 0:
      return '待提审';
    case -1:
      return '审核失败';
    case 1:
      return '提审中';
    case 2:
      return '审核通过';
  }
};

// 订单详情评价等级
export const evaluationLevel = value => {
  value = Number(value);
  switch (value) {
    case 0:
      return '中评';
    case -1:
      return '差评';
    case 1:
      return '好评';
  }
};
