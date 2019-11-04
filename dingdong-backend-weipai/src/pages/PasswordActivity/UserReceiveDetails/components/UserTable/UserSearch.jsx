/* eslint-disable react/no-unused-state, no-plusplus */
import React, { useState,useRef,useEffect } from 'react';
import { Table, Switch, Balloon, Button, Grid, Pagination,Input } from '@alifd/next';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Link } from 'react-router-dom';
import {AuctionListType,auditStatus,imgUrl,ShootType,RaffleStatus,renderAmount,renderTime,CouponsStatus} from '../../../../../common/js/filter'
const { Row, Col } = Grid;

export default function UserTable(props)  {
  // const [info,setInfo] = useState({})

  // const [address,setAddress] = useState({});
  // const [logistics,setLogistics] = useState({})
 const [logistics,setLogistics] = useState({})
  const Coupons = (props) =>{
    if ( props.address && props.address.couponId){
      const arr = []
      arr.push(props.address)
      return <IceContainer title="优惠券">
        <Table dataSource={arr}>
          <Table.Column title="优惠券编号" dataIndex="couponId" width={100} />
          <Table.Column title="优惠券名称" dataIndex="prizeName" width={200}  />
          <Table.Column title="使用门槛" dataIndex="threshold" width={200}  cell={renderAmount}/>
          <Table.Column title="领取时间 " dataIndex="created" width={100} cell={renderTime}/>
          <Table.Column title="是否使用" dataIndex="status" width={200} cell={CouponsStatus}/>
          <Table.Column title="订单号 " dataIndex="orderSn" width={200} />
        </Table>
      </IceContainer> 
    }
    return null;
  }

  const Raffle = (props) =>{
    if (props.address && props.address.created ){
      const arr = []
      arr.push(props.address)
      return <IceContainer title="抽奖券">
        <Table dataSource={arr}>
          <Table.Column title="领取时间 " dataIndex="created" width={100} cell={renderTime}/>
          <Table.Column title="领取数量" dataIndex="amount" width={200}/>
        </Table>
      </IceContainer> 
    }
    return null;
  }

  const Integral = (props) =>{
    if (props.address && props.address.created ){
      const arr = []
      arr.push(props.address)
      return <IceContainer title="积分">
        <Table dataSource={arr}>
          <Table.Column title="领取时间" dataIndex="created" width={100} cell={renderTime}/>
          <Table.Column title="领取积分值" dataIndex="extension" width={200}  />
          <Table.Column title="领取数量" dataIndex="amount" width={200}  />
        </Table>
      </IceContainer> 
    }
    return null;
  }

  const Physical = (props) =>{
    if ( props.address ){
      console.log(props.address)
      if( props.address.address != '' && props.address.address ){
        props.address.address =JSON.parse(props.address.address)
      }
      if( props.address.logistics != '' && props.address.logistics ){
        props.address.logistics =JSON.parse(props.address.logistics)
      }
      return <IceContainer title="实体奖励"> 
         <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>礼品名称：</span>
            {props.address.prizeName} 
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>礼品状态：</span>
            {RaffleStatus(props.address.status)} 
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>收件人：</span>
            {props.address.address?props.address.address.contacts:''} 
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>收件人电话：</span>
            {props.address.address?props.address.address.mobile:''} 
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>收件地址：</span>
            {props.address.address?props.address.address.province:''} {props.address.address?props.address.address.city:''} 
            {props.address.address?props.address.address.district:''} {props.address.address?props.address.address.location:''}
          </div>
        </Col>
        </Row>
      <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>物流公司：</span>
            {props.address.logistics?props.address.logistics.express:''} 
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>物流单号：</span>
            {props.address.logistics?props.address.logistics.expressNumber:''} 
          </div>
        </Col>
        </Row>
      </IceContainer> 
    }
    return null;
  }

  return (
    <div>
      <IceContainer title="用户信息">
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>用户ID：</span>
            {props.details == null ? '':props.details.uuid} 
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>用户昵称：</span>
            {props.details == null ? '':props.details.nickname}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>用户账号：</span>
            {props.details == null ? '':props.details.mobile}
          </div>
        </Col>
        </Row>
      </IceContainer>
      
      <Coupons
        address = {props.details == null ? '':props.details.giftsCoupon}/>
      <Raffle
        address = {props.details == null ? '':props.details.giftsRolls}/>
      <Integral
        address = {props.details == null ? '':props.details.giftsIntegral}/>
      <Physical
        address = {props.details == null ? '':props.details.giftsEntity}/>
      {/* <IceContainer title="地址信息">
      <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>收件人：</span>
            {address.contacts} 
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>收件人电话：</span>
            {props.countInfo.address} 
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>收件地址：</span>
            {props.countInfo.address}
          </div>
        </Col>
        </Row>
      </IceContainer> */}
      {/* <IceContainer title="物流信息">
      <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>物流公司：</span>
            {info.nickname} 
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>物流单号：</span>
            {info.mobile} 
          </div>
        </Col>
        </Row>
      </IceContainer> */}
    </div>
  );
  }


const styles = {
  link:{
    marginRight:'10px'
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
};
