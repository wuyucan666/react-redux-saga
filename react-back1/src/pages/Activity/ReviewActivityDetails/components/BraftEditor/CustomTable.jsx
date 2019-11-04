/* eslint-disable react/no-unused-state, no-plusplus */
import React, { useState } from 'react';
import { Table, Switch, Balloon, Button, Grid, Pagination,Input } from '@alifd/next';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Link } from 'react-router-dom';
import {getQuery,renderTime, renderAmount} from '../../../../../common/js/filter'
const { Row, Col } = Grid;

export default function CustomTable(props)  {

  const [page, setPage] = useState(1);
  const [text, setText] = useState('');
  
//页码查询
  const handlePaginationChange = (current) => {
    setPage(current)
    // console.log(props.pages);
    props.handlePage(current)
  };

  const backup = (val) =>{
    setText(val)
  }

  const onOK = () =>{
    props.onOK(text)
  }

  const onFail = () =>{
    props.onFail(text)
  }

  const coupon =  (val) =>{
    if(val){
      if(val.length!==0){
        return(
          val.map((items,index) => (
              <Row key={index}>
                <Col style={styles.colMargin} l="8">
                  <span>优惠券名称:</span>
                  <span>{items.prizeName}</span>
                </Col>
                <Col style={styles.colMargin} l="8">
                  <span>优惠券数量:</span>
                  <span>{items.total}</span>
                </Col>
                <Col style={styles.colMargin} l="8">
                  <span>优惠券门槛:</span>
                  <span>{renderAmount(items.threshold)}</span>
                </Col>
              </Row>
         ))
        )
      }else{
        return (<div style={styles.colMargin}>暂无数据</div>)
      }
    }
    return null;
  }

  const rolls =  (val) =>{
    if(val){
      if(val.length!==0){
        return(
          val.map((items,index) => (
            <Row key={index}>
              <Col style={styles.colMargin} l="8">
                <span>抽奖券数量:</span>
                <span>{items.total}</span>
              </Col>
            </Row>
         ))
        )
      }else{
        return (<div style={styles.colMargin}>暂无数据</div>)
      }
    }
    return null;
  }

  const integral =  (val) =>{
    if(val){
      if(val.length!==0){
        return(
          val.map((items,index) => (
              <Row key={index}>
                <Col style={styles.colMargin} l="8">
                  <span>积分数值:</span>
                  <span>{items.extension}</span>
                </Col>
                <Col style={styles.colMargin} l="8">
                  <span>积分发行量:</span>
                  <span>{items.total}</span>
                </Col>
                <Col style={styles.colMargin} l="8">
                  <span>积分总数值:</span>
                  <span>{items.totals}</span>
                </Col>
              </Row>
         ))
        )
      }else{
        return (<div style={styles.colMargin}>暂无数据</div>)
      }
    }
    return null;
  }
  const entity =  (val) =>{
    if(val){
      if(val.length!==0){
        return(
          val.map((items,index) => (
              <Row key={index}>
                <Col style={styles.colMargin} l="8">
                  <span>实物名称:</span>
                  <span>{items.prizeName}</span>
                </Col>
                <Col style={styles.colMargin} l="8">
                  <span>实物数量:</span>
                  <span>{items.total}</span>
                </Col>
              </Row>
         ))
        )
      }else{
        return (<div style={styles.colMargin}>暂无数据</div>);
      }
    }
    return (<div style={styles.colMargin}>暂无数据</div>);
  }

  // console.log(props.detail);
  const {base,detail,giftsCoupon,giftsRolls,giftsEntity,giftsIntegral} = props.detail
  const remarkDetail =detail? JSON.parse(detail.detail):''
  return (
    <div>
      <IceContainer title="审核活动">
      <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>活动类型：</span>
            <span>{base?base.type: ''}</span>
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>活动名称：</span>
            <span>{base?base.name: ''}</span>
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>口令密码：</span>
            <span>{base?base.ddToken: ''}</span>
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>活动时间：</span>
            <span>{base?renderTime(base.startTime): ''}----</span>
            <span>{base?renderTime(base.endTime): ''}</span>
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>活动礼品：</span>
          </div>
        </Col>
        <Col l="24">
          <div style={styles.mlnav}>优惠券：</div>
          <div style={styles.mlnav2}>
            {coupon(giftsCoupon)}
          </div>
        </Col>
        <Col l="24">
          <div style={styles.mlnav}>抽奖券：</div>
          <div style={styles.mlnav2}>
            {rolls(giftsRolls)}
          </div>
        </Col>
        <Col l="24">
          <div style={styles.mlnav}>积分券：</div>
          <div style={styles.mlnav2}>
            {integral(giftsIntegral)}
          </div>
        </Col>
        <Col l="24">
          <div style={styles.mlnav}>实物奖品：</div>
          <div style={styles.mlnav2}>
            {entity(giftsEntity)}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>活动规则说明：</span>
            <span>{remarkDetail.rules}</span>
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>提审备注：</span>
            <span>{remarkDetail.bringRemark}</span>
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>审核备注：</span>
            <Input style={styles.placeholder} onChange={backup} placeholder="请输入审核备注" size="large" />
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="2">
          <Button type="primary" disabled={getQuery(2)==='1'?false:true} onClick={onOK}>同意</Button>
        </Col>
        <Col l="2">
          <Button type="primary" disabled={getQuery(2)==='1'?false:true} onClick={onFail}>驳回</Button>
        </Col>
        </Row>
      </IceContainer>
    </div>
  );
  }


const styles = {
  link:{
    marginRight:'10px'
  },
  bont:{
    fontWeight:'bold',
    fontSize:'16px'
  },
  headRow: {
    marginBottom: '10px',
  },
  icon: {
    color: '#2c72ee',
    cursor: 'pointer',
  },
  deleteIcon: {
    marginLeft: '20px',
  },
  center: {
    textAlign: 'right',
  },
  button: {
    borderRadius: '4px',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'center',
  },
  buttonRow: {
    marginTop: '10px',
    float:'right'
  },
  link:{
    display:'block'
  },
  formItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  mlnav:{
    fontWeight:'bold',
    marginLeft:'40px'
  },
  mlnav2:{
    marginLeft:'40px'
  },
  colMargin:{
    margin:'8px 0 8px 0'
  },
  placeholder:{
    width:'400px',
    height:'100px'
  }
};
