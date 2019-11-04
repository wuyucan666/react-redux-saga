/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, DatePicker,Button ,ConfigProvider,Input  } from '@alifd/next';
import { FormBinderWrapper,  } from '@icedesign/form-binder';
import moment from 'moment';
import IceContainer from '@icedesign/container';
import {renderAmount,renderTime,renderMakeUpStatus} from '../../../../../common/js/filter'
const { Row, Col } = Grid;
const { RangePicker } = DatePicker;
const onChange = (value) => console.log(value);
const onOk = (value) => console.log('onOK:', value.format('YYYY-MM-DD HH:mm:ss'));
const onRangeOk = (value) => console.log('onOk: [%s, %s]', value[0].format('YYYY-MM-DD HH:mm:ss'), value[1].format('YYYY-MM-DD HH:mm:ss'));

const defaultTimeValue = moment('09:00:00', 'HH:mm:ss', true);
const Sn = window.location.hash.split('=')[1]

export default class Filter extends Component {
  static displayName = 'Filter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
    };
  }

  componentWillMount(){
    // this.props.postDetail()
    let orderSn = window.location.hash.split('=')
    if(orderSn[1]!=undefined){
      let parm = {
        orderSn:orderSn[1]
      }
      this.props.postDetail(parm)
    }else{
      window.history.back(-1)
    }
  }


  
  passOn=()=>{
    // console.log(Sn);
    const Sn = window.location.hash.split('=')[1]
    this.props.passOn(Sn)
  }
  
  turnOff=()=>{
    // console.log(Sn);
    const Sn = window.location.hash.split('=')[1]
    this.props.turnOff(Sn)
  }

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };
  render() {
    // console.log(this.props.detail)
    const {detail} = this.props
    return (
      <div>
      <IceContainer title="用户信息">
      <div style={styles.buttonfr}>
      {/* <Button type="primary" style={styles.fr} onClick={()=>{window.history.go(-1)}} >
          返回
      </Button> */}
      </div>
        <FormBinderWrapper  >
          <div style={styles.ml10}>
          <Row wrap >
          <Col xxs="24" l="12" style={styles.formCol}>
            <span style={styles.label}>手机号：</span>
            <span style={styles.labelRes}>{detail.account}</span>
            {/* <Input value="12580" disabled/> */}
          </Col>
          <Col xxs="24" l="12" style={styles.formCol}>
            <span style={styles.label}>充值金额 ：</span>
            <span style={styles.labelRes} >{renderAmount(detail.amount)}</span>
            {/* <Input value="12580" disabled/> */}
          </Col>
          <Col xxs="24" l="12" style={styles.formCol}>
            <span style={styles.label}>真实姓名： </span>
              <span style={styles.labelRes}>{detail.name}</span>
              {/* <Input value="下一站" disabled/> */}
          </Col>
          <Col xxs="24" l="12" style={styles.formCol}>
            <span style={styles.label}>用户开户行： </span>
              <span style={styles.labelRes}>{detail.nickname}</span>
              {/* <Input value="下一站" disabled/> */}
          </Col>
         
          <Col xxs="24" l="12" style={styles.formCol}>
            <span style={styles.label}>公司对公账户： </span>
              <span style={styles.labelRes}>{detail.toAccount==undefined?'':detail.toAccountWithdrawalApplicationDetails}</span>
              {/* <Input value="下一站" disabled/> */}
          </Col>
          <Col xxs="24" l="12" style={styles.formCol}>
            <span style={styles.label}>充值日期： </span>
              <span style={styles.labelRes}>{renderTime(detail.created)}</span>
              {/* <Input value="下一站" disabled/> */}
          </Col>
          
          <Col xxs="24" l="12" style={styles.formCol}>
            <span style={styles.label}>充值方式: </span>
              <span style={styles.labelRes}>{detail.fromAccount}</span>
              {/* <Input value="17362301056" disabled/> */}
          </Col>
          <Col xxs="24" l="12" style={styles.formCol}>
            <span style={styles.label}>申请备注： </span>
              <span style={styles.labelRes}>{detail.remark}</span>
              {/* <Input.TextArea value="下一站" disabled/> */}
          </Col>
          <Col xxs="24" l="12" style={styles.formCol}>
            <span style={styles.label}>审核备注： </span>
              {/* <span style={styles.labelRes}>{detail.remark}</span> */}
              <Input.TextArea value=""/>
          </Col>
          <Col l="24">
          <ConfigProvider locale={{ Dialog: { ok: 'OK', cancel: 'Cancel' } }}>
            <span>
                <Button  type="primary" style={styles.button} onClick={this.passOn} >通过</Button> &nbsp;
                <Button  type="primary" style={styles.button} onClick={this.turnOff} >驳回</Button> &nbsp;
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
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '20px',
    padding: '0',
  },
  title: {
    margin: '0',
    padding: '20px',
    fonSize: '16px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: 'rgba(0,0,0,.85)',
    fontWeight: '500',
    borderBottom: '1px solid #eee',
  },
  formRow: {
    padding: '10px 20px',
  },
  formItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  formLabel: {
    minWidth: '100px',
  },
  ml10:{
    marginLeft: '10px',
  },
  formCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  label: {
    lineHeight: '28px',
    paddingRight: '3px',
    width:'110px'
  },
  labelRes: {
    lineHeight: '28px',
    paddingRight: '3px',
    width:'150px'
  },
  fr: {
    float: 'right',
  },
  buttonfr:{
    width: '100%',
    height: '40px'
  }
};
