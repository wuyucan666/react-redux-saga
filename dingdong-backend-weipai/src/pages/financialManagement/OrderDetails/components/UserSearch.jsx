/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Dialog,Input, Select, Grid,Button,Icon,Radio } from '@alifd/next';
import { FormBinderWrapper, FormBinder } from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
import { enquireScreen } from 'enquire-js';
// import Img from '@icedesign/img';
// import {
//   FormBinderWrapper as IceFormBinderWrapper,
//   FormBinder as IceFormBinder,
//   FormError as IceFormError,
// } from '@icedesign/form-binder';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import * as tradingAction from '../../../../redux/FinancialManagement/TradingOrderlist/action';
import injectReducer from '../../../../utils/injectReducer';
import reducer from '../../../../redux/FinancialManagement/TradingOrderlist/reducer';

import {renderAmount,renderPay,renderTime} from '../../../../common/js/filter';


const { Group: RadioGroup } = Radio;
const { Row, Col } = Grid;
const defaultValue = {
  keywords: '',
  type: 'post',
  content: '',
};
class UserTable extends Component {
  static displayName = 'UserTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      visible: false,
      value: defaultValue,
      isMobile: false,
      detail:{
        auorderDetail:{
          create: '', // 创建时间
          payTime: '', // 支付时间
          payType: '', // 支付类型
          orderSn: '', // 订单编号
          payAmount: '', // 实际支付总金额
          servicePrice: '', // 服务费总额
          cAmount: '', // 藏品总金额
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
  }
  componentDidMount() {
    let orderSn = window.location.hash.split('=')
    if(orderSn[1]!=undefined){
      // console.log(orderSn[1])
      const {actions} = this.props
      let parm = {
        orderSn:orderSn[1]
      }
      actions.userResultDetail(parm);
      setTimeout(() => {
      // console.log(this.props.state.detail)
      const {detail} = this.props.state
      this.setState({
        detail,
      });
      }, 300);
    }else{
      window.history.back(-1)
    }
  }
  
  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  showDialog = () => {
    console.log(11)
    this.setState({
      visible: true,
    });
  };

  hideDialog = () => {
    this.setState({
      visible: false,
    });
  };

  onOk = () => {
    this.refForm.validateAll((error) => {
      if (error) {
        // show validate error
        return;
      }
      // deal with value

      this.hideDialog();
    });
  };

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };
  formChange = (value) => {
    console.log('changed value', value);
    this.setState({
      formValue: value,
    });
  };

  render() {
    const { formValue } = this.state;
    const { isMobile } = this.state;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }
    console.log(this.props.state.detail)
    let detail = this.props.state.detail
    return (
      <div>
      <IceContainer title="订单信息">
        {/* <div style={styles.buttonfr}>
          <Button type="primary" style={styles.fr} onClick={()=>{window.history.go(-1)}} >
            返回
          </Button>
        </div> */}
        <FormBinderWrapper value={detail} onChange={this.formChange}>
          <div style={styles.ml10}>
          <Row wrap >
            <Col xxs="24" l="8" style={styles.formCol}>
              <span style={styles.label}>创建时间：</span>
              <span style={styles.label}>{renderTime(detail.auorderDetail.created)}</span>
            </Col>
            <Col xxs="24" l="8" style={styles.formCol}>
              <span style={styles.label}>支付时间：</span>
              <span style={styles.label}>{renderTime(detail.auorderDetail.payTime)}</span>
            </Col>
            <Col xxs="24" l="8" style={styles.formCol}>
            </Col>
            <Col xxs="24" l="8" style={styles.formCol}>
              <span style={styles.label}>订单编号：</span>
              <span style={styles.label}>{detail.auorderDetail.orderSn}</span>
            </Col>
            <Col xxs="24" l="8" style={styles.formCol}>
              <span style={styles.label}>支付方式：</span>
              <span style={styles.label}>{renderPay(detail.auorderDetail.payType)}</span>
            </Col>
            <Col xxs="24" l="8" style={styles.formCol}>
            </Col>
            <Col xxs="24" l="8" style={styles.formCol}>
            </Col>
          </Row>
          {
            detail.orderAuco && detail.orderAuco.map((items,index) => (
              <Row wrap key={index}>
                <Col xxs="24" l="8" style={styles.formCol}>
                  <span style={styles.label}>拍品名称：</span>
                  <span style={styles.label}>{items.name}</span>
                </Col>
                <Col xxs="24" l="8" style={styles.formCol}>
                  <span style={styles.label}>拍品价格：</span>
                  <span style={styles.label}>{renderAmount(items.winPrice)}</span>
                </Col>
                <Col xxs="24" l="8" style={styles.formCol}>
                  <span style={styles.label}>服务费：</span>
                  <span style={styles.label}>{renderAmount(items.buyerServFee)}</span>
                </Col>
              </Row>
            ))
          }
          <Row wrap >
            <Col xxs="24" l="8" style={styles.formCol}>
              <span style={styles.label}>藏品总金额：</span>
              <span style={styles.label}>{renderAmount(detail.auorderDetail.cAmount)}</span>
            </Col>
            <Col xxs="24" l="8" style={styles.formCol}>
              <span style={styles.label}>服务费总额：</span>
              <span style={styles.label}>{renderAmount(detail.auorderDetail.servicePrice)}</span>
            </Col>
          </Row>
          {
            detail.auorderDetail.discountList && detail.auorderDetail.discountList.map((items,index) => (
              <Row wrap key={index}>
                <Col xxs="24" l="8" style={styles.formCol}>
                  {
                    index == 0 ? <span style={styles.label}>优惠金额：</span> : <span style={styles.label}></span>
                  }
                  <span style={styles.label}>{renderAmount(items.value)}</span>
                </Col>
                <Col xxs="24" l="8" style={styles.formCol}>
                  {
                    index == 0 ? <span style={styles.label}>优惠方式：</span> : <span style={styles.label}></span>
                  }
                  <span style={styles.label}>{items.name}</span>
                </Col>
                <Col xxs="24" l="8" style={styles.formCol}>
                  <span style={styles.label}></span>
                  <span style={styles.label}></span> 
                </Col>
              </Row>
           ))
          }
          <Row wrap >
            <Col xxs="23" l="8" style={styles.formCol}>
              <span style={styles.labelLong}>实际支付总金额：</span>
              <span style={styles.label}>{renderAmount(detail.auorderDetail.payAmount)}</span>
            </Col>
          </Row>
          </div>
        </FormBinderWrapper>
      </IceContainer>
    <IceContainer title="支付用户信息">
      <FormBinderWrapper value={formValue} onChange={this.formChange}>
        <div style={styles.ml10}>
        <Row wrap >
          <Col xxs="24" l="8" style={styles.formCol}>
            <span style={styles.label}>买家真实姓名：</span>
            <span style={styles.label}>{detail.buyerInfo.realname}</span>
          </Col>
          <Col xxs="24" l="8" style={styles.formCol}>
            <span style={styles.label}>绑定电话：</span>
            <span style={styles.label}>{detail.buyerInfo.mobile}</span>
          </Col>
          <Col xxs="24" l="8" style={styles.formCol}>
          </Col>
          <Col xxs="24" l="8" style={styles.formCol}>
            <span style={styles.label}>卖家真实姓名：</span>
            <span style={styles.label}>{detail.sellerInfo.realname}</span>
          </Col>
          <Col xxs="24" l="8" style={styles.formCol}>
            <span style={styles.label}>绑定电话：</span>
            <span style={styles.label}>{detail.sellerInfo.mobile}</span>
          </Col>
          <Col xxs="24" l="8" style={styles.formCol}>
          </Col>
        </Row>
        </div>
      </FormBinderWrapper>
    </IceContainer>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { state:state.tradingOrder };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(tradingAction, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'tradingOrder', reducer });

export default compose(
  withReducer,
  withConnect
)(UserTable);



const styles = {
  formRow: {
    marginBottom: '18px',
  },
  formCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  label: {
    lineHeight: '28px',
    paddingRight: '10px',
    width:'120px'
  },
  labelLong: {
    lineHeight: '28px',
    paddingRight: '10px',
    width:'140px'
  },
  img:{
    width:'180px',
    height:'180px'
  },
  flex:{
    display: 'flex',
    justifyContent:'spaceBetween'
  },
  ml10:{
    marginLeft: '10px',
  },
  w400:{
    width:'400px',
  },
  prel:{
    position: 'relative',
    display:'flex'
  },
  Icon:{
    position: 'absolute',
    right: '10px',
    top: '5px',
    // display:'none'
  },
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px',width:'200px' },
  fr: {
    float: 'right',
  },
  buttonfr:{
    width: '100%',
    height: '40px'
  }
};
