import { Grid, Input, Select, DatePicker,Search,Button,Icon ,Radio,Upload,RadioForm, Form,Checkbox } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
// hooks
import React, { useState,useRef } from 'react';
import { changeTimestamp,timestamp,addCouponCheck } from '../../../../../common/js/common';
// import { Link } from 'react-router-dom';
const { Row, Col } = Grid;
const { RangePicker } = DatePicker;
const { Group: RadioGroup } = Radio;
const { Group: CheckboxGroup } = Checkbox;



export default function Filter(props){
  const ref = useRef('form')
  const [value, setValue] = useState({
    auctionLimit:[],
    isThreshold:'0',
    isAuctionLimit:'0',
    isMultiCoupons:'2'
  });
  const [date, setDate] = useState({});
  
  const [display1, display1Fn] = useState('none');
  const [display2, display2Fn] = useState('none');
  const [display3, display3Fn] = useState('none');
  const [display4, display4Fn] = useState('none');
  // const [display5, display5Fn] = useState('none');
  const [display6, display6Fn] = useState('none');
  const [display7, display7Fn] = useState('none');


  const condition = () => {
    setValue(value);
    // console.log(value)
    let obj = {}
    //使用门槛
    if(value.isThreshold=='1'){
      obj.threshold = value.threshold || 0
    }else{
      obj.threshold = 0
    }
    //使用限制
    if(value.isAuctionLimit=='1'){
      // obj.auctionLimit = JSON.stringify(value.auctionLimit)
      obj.auctionLimit = `[${value.auctionLimit}]`
    }else{
      obj.auctionLimit = `[1,2,3]`
    }
    //是否可叠加
    if(value.isMultiCoupons=='1'){
      obj.multiCoupons = value.multiCoupons
    }else{
      obj.multiCoupons = ''
    }
    //日期范围
    let obj2 = {}
    if(value.isTargetDate=='1'){
      obj.effectiveTime = value.effectiveTime
      obj2 = timestamp(obj,'effectiveTime','receiveTime','timeout')
      obj2.timeout = Number(obj2.timeout)-Number(obj2.receiveTime) 
    }else{
      obj2 = Object.assign({},obj)
      obj2.timeout = Number(value.fixDate)*60 * 60 * 24 || 0
      obj2.receiveTime = 0
    }
    //日期领取
    obj2.date = value.date
    let obj3 =changeTimestamp(obj2)
    obj3.type = value.type || ''
    obj3.couponName = value.couponName || ''
    obj3.amount = value.amount || ''
    obj3.total = value.total || ''
    obj3.remark = value.remark || ''
    
    console.log(obj3);
    //检查必填选项
    const checkResult = addCouponCheck(obj3)

    if(checkResult){
      props.commit(obj3)
    }
  }

  const onChange = (val)=>{
    setDate(val)
    console.log(date)
  }
  // const onChangeCheckBox = (val)=>{
  //   console.log(value);
  // }

  const onChange1 = (val) =>{
    if( val == 4 ){
      display1Fn('block')
    }else{
      display1Fn('none')
    }
  }

  
  const onChange2 = (val) =>{
    if( val == 1 ){
      display2Fn('block')
    }else{
      display2Fn('none')
    }

  }

  const onChange3 = (val) =>{
    if( val == 1 ){
      display3Fn('block')
    }else{
      display3Fn('none')
    }

  }

  const onChange4 = (val) =>{
    console.log(val)
    if( val == 1 ){
      display4Fn('block')
    }else{
      display4Fn('none')
    }

  }

  // const onChange5 = (val) =>{
  //   if( val == 1 ){
  //     display5Fn('block')
  //   }else{
  //     display5Fn('none')
  //   }

  // }

  const onChange6 = (val) =>{
    if( val == 1 ){
      display6Fn('block');
      display7Fn('none');
    }else{
      display6Fn('none');
      display7Fn('block');
    }

  }

  const onOk =(val)=>{
    if((new Date(val)).valueOf()<(new Date()).valueOf()){
      Message.error('定时发送时间不能小于当前时间,请重新选择定时发送时间');
      this.state.value.sendTime= ''
      this.setState({
        display_Name: 'block',
      })
    }
  }

    return (
      <IceContainer >
        {/* <Button type="primary" style={styles.fr} onClick={this.goBefore} >
          返回
        </Button> */}
      <IceContainer title="编辑生成优惠券">
      <IceFormBinderWrapper
        value={value}
        ref={ref}
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>优惠券类型：</span>
              <IceFormBinder triggerType="onBlur" name="type">
                <Select size="large" style={{ width: '200px' }} >
                  <Select.Option value="1">商家券</Select.Option>
                  <Select.Option value="2">平台券</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="type" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>优惠券名称：</span>
              <IceFormBinder triggerType="onBlur" name="couponName">
                <Input placeholder="请输入优惠券名称" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="couponName" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>面值：</span>
              <IceFormBinder triggerType="onBlur" name="amount">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <span style={styles.ml10}>元</span>
              <div style={styles.formError}>
                <IceFormError name="amount" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>总发行量：</span>
              <IceFormBinder triggerType="onBlur" name="total">
                <Input placeholder="请输入优惠券数量" size="large" />
              </IceFormBinder>
              <span style={styles.ml10}>只能输入正整数</span>
              <div style={styles.formError}>
                <IceFormError name="total" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>使用门槛：</span>
              <IceFormBinder triggerType="onBlur" name="isThreshold" >
                  <RadioGroup name="gender" onChange={onChange2.bind(this)}>
                  <Radio value="1">有门槛</Radio>
                  <Radio defaultChecked value="0">无门槛</Radio>
                </RadioGroup>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="isThreshold" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24" >
            <div style={{ display: display2 }}>
            <div style={styles.formItem} >
            <span style={styles.formLabel}>满多少元可用：</span>
              <IceFormBinder triggerType="onBlur" name="threshold" >
                <Input placeholder="请输入限制金额" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="threshold" />
              </div>
            </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>使用限制：</span>
              <IceFormBinder triggerType="onBlur" name="isAuctionLimit" >
                  <RadioGroup name="gender2" onChange={onChange3.bind(this)}>
                  <Radio value="1">有限制</Radio>
                  <Radio value="0">无限制</Radio>
                </RadioGroup>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="isAuctionLimit" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
          <div style={{ display: display3 }}>
            <div style={styles.formItem} >
                <span style={styles.formLabel}>选择使用区域：</span>
                {/* <FormItem label="Agreement:"> */}
                <IceFormBinder triggerType="onBlur" name="auctionLimit" >
                  {/* <CheckboxGroup value={value.auctionLimit} onChange={onChangeCheckBox}> */}
                  <CheckboxGroup value={value.auctionLimit}>
                    <Checkbox name="agreement" value='1' defaultChecked>微拍专场</Checkbox>
                    <Checkbox name="agreement1" value='2' defaultChecked>团购专场</Checkbox>
                    <Checkbox name="agreement2" value='3' defaultChecked>社区</Checkbox>
                  </CheckboxGroup>
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="auctionLimit" />
                </div>
                  {/* </FormItem> */}
                <div style={styles.formError}>
                  <IceFormError name="target" />
                </div>
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>是否可叠加：</span>
              <IceFormBinder name="isMultiCoupons" >
                  <RadioGroup name="gender" onChange={onChange4}>
                  <Radio value="1">是</Radio>
                  <Radio value="2">否</Radio>
                </RadioGroup>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="isMultiCoupons" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24" >
            <div style={{ display: display4 }}>
            <div style={styles.formItem} >
              <span style={styles.formLabel}>选择优惠券类型：</span>
              <IceFormBinder triggerType="onBlur" name="multiCoupons" >
                  <RadioGroup name="gender" >
                  <Radio value="2">平台券</Radio>
                  <Radio value="1">商家券</Radio>
                </RadioGroup>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="multiCoupons" />
              </div>
            </div>
            </div>
          </Col>
          </Row>
          {/* <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24" >
            <div style={{ display: display5 }}>
            <div style={styles.formItem} >
              <span style={styles.formLabel}>选择叠加优惠券名称：</span>
                  <Checkbox name="agreement" defaultChecked>优惠券1</Checkbox>
                  <Checkbox name="agreement1" defaultChecked>优惠券2</Checkbox>
                  <Checkbox name="agreement2" defaultChecked>优惠券3</Checkbox>
              <div style={styles.formError}>
                <IceFormError name="target" />
              </div>
            </div>
            </div>
          </Col>
          </Row> */}
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>有效领取时间：</span>
              <IceFormBinder triggerType="onBlur" name="date">
              <RangePicker showTime onChange={onChange}  />
                {/* <DatePicker showTime onChange={onChange} onOk={onOk} resetTime /> */}
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="date" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>有效使用时间：</span>
              <IceFormBinder triggerType="onBlur" name="isTargetDate" >
                  <RadioGroup name="gender" onChange={onChange6}>
                  <Radio value="1">日期范围</Radio>
                  <Radio value="2">固定天数</Radio>
                </RadioGroup>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="isTargetDate" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24" >
            <div style={{ display: display6 }}>
            <div style={styles.formItem} >
            <span style={styles.formLabel}>日期范围：</span>
            <IceFormBinder triggerType="onBlur" name="effectiveTime">
              <RangePicker showTime onChange={onChange} />
                {/* <DatePicker showTime onChange={onChange} onOk={onOk} resetTime /> */}
              </IceFormBinder>
            </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24" >
            <div style={{ display: display7 }}>
            <div style={styles.formItem} >
            <span style={styles.formLabel}>固定天数：</span>
              <IceFormBinder triggerType="onBlur" name="fixDate" >
                <Input placeholder="领取后到期天数" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="fixDate" />
              </div>
            </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24" >
            <div style={styles.formItem} >
            <span style={styles.formLabel}>备注：</span>
              <IceFormBinder triggerType="onBlur" name="remark" >
              <Input.TextArea
                      style={styles.input}
                      placeholder="请输入备注"
                      rows={4}
                      required
                      name="reason"
                      maxLength={200}
                    />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="remark" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <Button type="primary" onClick={condition} style={styles.button}>
                生成优惠券
              </Button>
            </div>
          </Col>
        </Row>
        
      </IceFormBinderWrapper>
      </IceContainer>
      </IceContainer>
    );
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
  // formRow: {
  //   padding: '10px 20px',
  // },
  formItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  formLabel: {
    minWidth: '180px',
  },
  fr:{
    float: 'right'
  },
  ml10:{
    marginLeft: '10px',
  }
};
