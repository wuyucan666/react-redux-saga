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
import {AuctionListType,auditStatus,imgUrl,ShootType,ShootCreateType,ShootChannel,renderTime} from '../../../../../common/js/filter'
const { Row, Col } = Grid;

export default function UserTable(props)  {
  // const [info,setInfo] = useState({})

  // const [address,setAddress] = useState({});
  // const [logistics,setLogistics] = useState({})

  const Address = (props) =>{
    console.log(props);
    if (props.address ){
      return <IceContainer title="地址信息">
      <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>收件人：</span>
            {props.address.contacts} 
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>收件人电话：</span>
            {props.address.mobile} 
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>收件地址：</span>
            {props.address.province} {props.address.city} {props.address.district} {props.address.location}
          </div>
        </Col>
        </Row>
      </IceContainer> 
    }
    return null;
  }

  const Logistics = (props) =>{
    console.log(props);
    if (props.logistics ){
      return <IceContainer title="物流信息">
      <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>物流公司：</span>
            {props.logistics.express} 
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>物流单号：</span>
            {props.logistics.trackingNo} 
          </div>
        </Col>
        </Row>
      </IceContainer> 
    }
    return null;
  }

 
  return (
    <div>
      <IceContainer title="抽奖信息">
      {/* <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>抽奖券编号：</span>
            {props.countInfo == null ? '':props.countInfo.id}
          </div>
        </Col>
        </Row> */}
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>抽奖用户：</span>
            {props.countInfo == null ? '':props.countInfo.nickname} 
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>用户账号：</span>
            {props.countInfo == null ? '':props.countInfo.mobile}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>中奖物品：</span>
            {props.countInfo == null ? '':props.countInfo.prizeName}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>中奖时间：</span>
            {renderTime(props.countInfo == null ? '':props.countInfo.created)}
          </div>
        </Col>
        </Row>
      </IceContainer>
      
      <Address
        address = {props.countInfo == null ? '':props.countInfo.address}/>
      <Logistics
      logistics = {props.countInfo == null ? '':props.countInfo.logistics}/>
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
