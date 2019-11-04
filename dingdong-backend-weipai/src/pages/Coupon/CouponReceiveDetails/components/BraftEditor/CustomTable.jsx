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
import { renderAllAmount,CouponsType,renderValidityPeriod,renderTime,renderAmount,CouponsStatus } from '../../../../../common/js/filter';
const { Row, Col } = Grid;

export default function CustomTable(props)  {

  const [page, setPage] = useState(1);
  
//页码查询
  const handlePaginationChange = (current) => {
    setPage(current)
    // console.log(props.pages);
    props.handlePage(current)
  };

  // console.log(props.shopId);
  return (
    <div>
      <IceContainer title="优惠券信息">
      <Row wrap gutter="20" style={styles.formRow}>
      <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>优惠券类型：</span>
            {props.detail?CouponsType(props.detail.type):''} 
          </div>
        </Col>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>优惠券名称：</span>
            {props.detail?props.detail.couponName:''} 
          </div>
        </Col>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>面值：</span>
            {props.detail?renderAmount(props.detail.amount):''}
          </div>
        </Col>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>使用门槛：</span>
            {props.detail?renderAmount(props.detail.threshold):''}
          </div>
        </Col>
        </Row>
      </IceContainer>
      {
        props.shopId!='0'?
        <IceContainer title="店铺信息">
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>商户名称：</span>
              {props.info?props.info.nickname:''} 
            </div>
          </Col>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>商户姓名：</span>
              {props.info?props.info.realname:''} 
            </div>
          </Col>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>商户账号：</span>
              {props.info?props.info.mobile:''} 
            </div>
          </Col>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>商户uuid：</span>
              {props.info?props.info.uuid:''} 
            </div>
          </Col>
          </Row>
        </IceContainer>
        :null
      }
    <IceContainer title="领取信息">
      <Table
        dataSource={props.lists}
        // dataSource={[{orderSn:123,name:231,amount:'amount',transferFee:'1',account:'2',author:'2d',auditor:'23'}]}
        // rowSelection={{ onChange: onChange }}
      >
        <Table.Column title="优惠券编码" dataIndex="couponId"  width={200} />
        {/* <Table.Column title="领取账号" dataIndex="" width={200} /> */}
        <Table.Column title="领取用户" dataIndex="userDetail.nickname"  width={150} />
        {/* <Table.Column title="领取姓名" dataIndex=""  width={160} />   */}
        {/* <Table.Column title="领取数量" dataIndex="level" width={200} /> */}
        <Table.Column title="领取途径" dataIndex="source"  width={200} />
        <Table.Column title="领取时间" dataIndex="created" width={120} cell={renderTime}/>
        <Table.Column title="是否使用" dataIndex="status" width={120} cell={CouponsStatus}/>
        <Table.Column title="订单号" dataIndex="useDetail.orderSn" width={120} />
      </Table>
      <Pagination
        style={styles.pagination}
        current={props.pages}
        onChange={handlePaginationChange}
        total={props.total}
        pageSize={20}
      />
    </IceContainer>
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
