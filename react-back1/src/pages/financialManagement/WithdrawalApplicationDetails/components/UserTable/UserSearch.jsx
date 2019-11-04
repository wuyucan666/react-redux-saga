/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Dialog,Input, Select, Grid,Button,Icon,Radio,ConfigProvider  } from '@alifd/next';
import { FormBinderWrapper, FormBinder } from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
import { enquireScreen } from 'enquire-js';
import Img from '@icedesign/img';
import {renderAmount,renderWADStatus} from '../../../../../common/js/filter'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Message } from '@alifd/next';
import { Link } from 'react-router-dom';
const { Group: RadioGroup } = Radio;
const { Row, Col } = Grid;
const defaultValue = {
  keywords: '',
  type: 'post',
  content: '',
};

export default class UserTable extends Component {
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
      transferFee: 0
    };
  }
  passOn=()=>{
    const {transferFee} = this.props.Sn
    if (transferFee == '') {
      Message.error('手续费不能为空')
      return false
    }
    this.props.passOn(transferFee)
  }
  turnOff=()=> {
    
    if( this.state.formValue.reason ){
      let obj = this.state.formValue.reason
      this.props.turnOff(obj)
    }else{
      Message.error('请输入驳回理由')
    }
    
  }


  showDialog = () => {
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
      transferFee: value
    });
  };
  formChange = (value) => {
    this.setState({
      formValue: value,
    });
  };

  render() {
    const {Sn} = this.props
    const { formValue } = this.state;
    const { isMobile } = this.state;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    let display2 = ''
    let display1 = ''
    if( this.props.status ){
      display2 = 'none'
      display1 = 'inline-block'
    }
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }
    return (
      <div>
      {/* <IceContainer title="申请详情">
      </IceContainer> */}
      <IceContainer title="用户申请详情信息">
      <div style={styles.buttonfr}>
      {/* <Button type="primary" style={styles.fr} onClick={()=>{window.history.go(-1)}} >
          返回
      </Button> */}
      </div>
        <FormBinderWrapper value={Sn} onChange={this.formChange}>
          <div style={styles.ml10}>
          <Row wrap >
            <Col  style={styles.formCol}>
              <span style={styles.label}>用户昵称：</span>
             {/* <Input value="12580" disabled/> */}
             <span>{Sn.nickname}</span>
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>手机号码： </span>
                <span>{Sn.mobile}</span>
                {/* <Input value="17362301056" disabled/> */}
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>真实名字： </span>
                <span>{Sn.name}</span>
                {/* <Input value="下一站" disabled/> */}
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>审核状态 ：</span>
                <span>{renderWADStatus(Sn.status)}</span>
                {/* <Input value="女" disabled/> */}
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>银行名称：  </span>
                <span>{Sn.accountType}</span>
                {/* <Input value="2000年8月8日" disabled/> */}
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>银行卡号：  </span>
                <span>{Sn.accountNum}</span>
                {/* <Input value="2000年8月8日" disabled/> */}
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>提现金额：</span>
                <span>{renderAmount(Sn.amount)}</span>
                {/* <Input value="广东 ，广州" disabled/> */}
            </Col>
            <Col style={styles.formCol}>
              <span style={styles.label}>手续费：</span>
              {
                this.props.status ? <span>{Sn.transferFee}</span> : null
              }
                {/* <span>{renderAmount(Sn.transferFee)}</span> */}
              <IceFormBinder name="transferFee" style={{ display: display2 }}>
                <Input value={Sn.transferFee} defaultValue={Sn.transferFee} disabled={this.props.status} style={{ display: display2 }} />
              </IceFormBinder>
                {/* <Input value={this.state.transferFee ? this.state.transferFee : this.renderPrice(Sn.transferFee)} onChange={this.onFormChange} /> */}
            </Col>
            <Col  style={styles.formCol}>
                <span style={styles.label}>订单号:</span>
                <span>{Sn.orderSn}</span>
                {/* <Input value="收藏一，二，三版币" disabled/> */}
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>理由:</span>
                {
                  this.props.status ? <span  style={{ display: display1 }}>{Sn.reason}</span> : null
                }
              <IceFormBinder name="reason" style={{ display: display2 }}>
                <Input.TextArea value={Sn.reason} defaultValue={Sn.reason} disabled={this.props.status} style={{ display: display2 }}/>
              </IceFormBinder>
                
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>备注:</span>
              <span  style={{ display: display1 }}>{Sn.remark}</span>
                
            </Col>
          <Col l="24">
          <ConfigProvider locale={{ Dialog: { ok: 'OK', cancel: 'Cancel' } }}>
            <span>
                <Button  type="primary" disabled={this.props.status} style={styles.button} onClick={this.passOn}>通过</Button> &nbsp;
                <Button  type="primary" disabled={this.props.status} style={styles.button} onClick={this.turnOff}>驳回</Button> &nbsp;
            </span>
            {/* <span>
                <Button  type="primary" style={styles.button} onClick={popupAlert}>驳回</Button> &nbsp;
            </span>
            <span>
                <Button  type="primary" style={styles.button} onClick={popupAlert}>冻结</Button> &nbsp;
            </span>
            <span>
                <Button  type="primary" style={styles.button} onClick={popupAlert}>解冻</Button> &nbsp;
            </span> */}
        </ConfigProvider>
          </Col> 
          </Row>
          </div>
        </FormBinderWrapper>
      </IceContainer>
      <IceContainer title="用户账户信息">
      <Row wrap >
        <Col  style={styles.formCol}>
          <span style={styles.label}>用户余额：</span>
          <span>{renderAmount(Sn.balance)}</span>
          {/* <Input value="12580" disabled/> */}
        </Col>
        <Col  style={styles.formCol}>
          <span style={styles.label}>冻结金额:</span>
            <span>{renderAmount(Sn.freezeBalance)}</span>
            {/* <Input value="17362301056" disabled/> */}
        </Col>
        <Col  style={styles.formCol}>
          <Link target="_blank" to={`/financialManagement/moneyList?mobile=${Sn.mobile}&nickname=${Sn.nickname}&uuid=${Sn.uuid}`}>查看资金明细>></Link>
        </Col>
        </Row>
      </IceContainer>
      </div>
    );
  }
}

const styles = {
  formRow: {
    marginBottom: '18px',
  },
  formCol: {
    marginBottom: '20px',
    float:'left',
    width:'350px',
    flex: 'none',
  },
  label: {
    lineHeight: '28px',
    paddingRight: '10px',
    width:'100px',
    display: 'inline-block'
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
