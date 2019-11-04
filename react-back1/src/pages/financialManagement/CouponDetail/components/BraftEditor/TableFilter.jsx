/* eslint react/no-string-refs:0 */
import React, { useEffect,useRef,useState } from 'react';
import { Grid, Input, Select, DatePicker,Search,Button,Icon ,Radio,Upload,RadioForm, Form,Checkbox } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
const { Row, Col } = Grid;
import {renderCouponsStatus,orderTypeArr,renderAmount,CouponsType,renderAllAmount,renderValidityPeriod,renderTime,CouponsIsAdd} from '../../../../../common/js/filter'


export default function Filter(props)  {
  const [value,setValue] = useState({});

  const ref = useRef('form')

  const onChange =(value)=>{
    setValue(value)
  }

  const passOn = () =>{
    props.passOn({
      couponId:window.location.href.split('goodId=')[1],
      reason:value
    })
  }

  const failIn = () =>{
    props.failIn({
      couponId:window.location.href.split('goodId=')[1],
      reason:value
    })
  }
  
  // console.log(props.status);

  return (
    <div>
        <IceContainer title="优惠券详情:">
          <div style={styles.bont}>{renderCouponsStatus(props.detail.status,'1',props.detail)}</div>
          {/* <Button type="primary" style={styles.fr} onClick={this.goBefore} >
            返回
          </Button> */}
          <IceContainer title="优惠价总金额:">
          {renderAllAmount(1,2,props.detail)} 
          </IceContainer>
          {/* <IceContainer title="商家信息"> */}
          <IceFormBinderWrapper
            value={props.detail}
            onChange={onChange}
            ref={ref}
          >
          <Row wrap gutter="20" style={styles.formRow}>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.titleKey}>优惠券类型：</span>
                <span>{CouponsType(props.detail.type)}</span>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.titleKey}>优惠券名称：</span>
                <span>{props.detail.couponName}</span>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.titleKey}>面值：</span>
                <span>{renderAmount(props.detail.amount)}</span>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.titleKey}>总发行量：</span>
                <span>{props.detail.total}张</span>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.titleKey}>使用限制：</span>
                <span>{orderTypeArr(props.detail.auctionLimit)} </span>
              </div>
            </Col>
            {/* <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.titleKey}>发放对象：</span>
                <span>nananan</span>
              </div>
            </Col> */}
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.titleKey}>是否可叠加：</span>
                <span>{CouponsIsAdd(props.detail.multiCoupons)}</span>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.titleKey}>使用门槛：</span>
                <span>{renderAmount(props.detail.threshold)}</span>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.titleKey}>有效领取时间：</span>
                <span>
                  {`${renderTime(props.detail.startTime)}---
                  ${renderTime(props.detail.endTime)}`}
                </span>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.titleKey}>有效使用时间：</span>
                <span>{renderValidityPeriod(1,2,props.detail)}</span>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.titleKey}>备注：</span>
                <span>{props.detail.remark}</span>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.titleKey}>审核理由：</span>
                <Input onChange={onChange} placeholder="请输入"></Input>
              </div>
            </Col>
            <Col l="24">
            <div style={styles.formItem}>
              <Button type="primary" disabled={props.status!=='2'} onClick={passOn} style={styles.button} >
                通过
              </Button>
              <Button type="primary" disabled={props.status!=='2'} onClick={failIn} style={styles.button} >
                驳回
              </Button>
            </div>
            </Col>
          </Row>
            </IceFormBinderWrapper>
          {/* </IceContainer> */}
        </IceContainer>
    </div>
  );
}

const styles = {
  container: {
    margin: '20px',
    padding: '0',
  },
  bont:{
    fontWeight:'bold',
    fontSize:'18px',
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
    minWidth: '180px',
  },
  fr:{
    float: 'right'
  },
  ml10:{
    marginLeft: '10px',
  },
  titleKey:{
    fontSize:'16px',
    color:'rgb(51, 51, 51)',
    fontWeight:'bold',
    minWidth:'150px'
  },
  button:{
    marginRight:'15px'
  }
};
