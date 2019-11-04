import {
    TRADING_ORDER_RESULT,
    TRADING_ORDER_PAGE,
    TRADING_ORDER_DETAIL_CONTENT,
    TRADING_ORDER_EXPORT_DATA_SUCCESS,
    WEIPAI_MERCHANT_LIST_EMPTY
} from './constants';
import { Message } from '@alifd/next';
  
  // store默认值
  const initialState = {
    lists:[],
    pages:1,
    total:1,
    detail:{
      auorderDetail:{
        create: '', // 创建时间
        payTime: '', // 支付时间
        payType: '', // 支付类型
        orderSn: '', // 订单编号
        payAmount: '', // 实际支付总金额
        servicePrice: '', // 服务费总额
        cAmount: '', // 藏品总金额
        discountList: [{value:''},{name:''}]
      },
      orderAuco:[{
        name: '', // 拍品名称
        winPrice: '',// 拍品价格
        buyerServFee: '',// 服务费
      }],
      buyerInfo:{
        mobile: '',
        realname: '',
      },
      sellerInfo: {
        mobile: '',
        realname: '',
      }
    }
  };
  
  function accountReducer(state = initialState, action) {
    switch (action.type) {
      case WEIPAI_MERCHANT_LIST_EMPTY:
      state.lists=[]
      state.auction={}
      return Object.assign([],state);

      case TRADING_ORDER_RESULT:
      // console.log(state,action)
        state.lists = action.response.data.list || []
        state.total = action.response.total || ""
        return Object.assign([],state);

      case TRADING_ORDER_PAGE:
        // console.log(action.page)
        state.pages = action.page
        return Object.assign(state);

      case TRADING_ORDER_DETAIL_CONTENT:
        // console.log(action)
        state.detail = action.response.data || {}
        return Object.assign([],state);
      
      case TRADING_ORDER_EXPORT_DATA_SUCCESS:
        console.log(action)
        Message.success("导出成功")
        window.open(action.response.data.file_path);
        return Object.assign([],state);  
        
      default:
        return state;
    }
  }
  
  export default accountReducer;
  