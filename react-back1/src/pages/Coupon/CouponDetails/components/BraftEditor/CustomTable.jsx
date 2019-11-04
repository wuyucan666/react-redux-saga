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
import {renderCouponsStatus,CouponsIsAdd,orderTypeArr,renderAmount,CouponsType,renderAllAmount,renderValidityPeriod,renderTime} from '../../../../../common/js/filter'
const { Row, Col } = Grid;

export default function CustomTable(props)  {

  const [page, setPage] = useState(1);
  
//页码查询
  const handlePaginationChange = (current) => {
    setPage(current)
    // console.log(props.pages);
    props.handlePage(current)
  };

  // console.log(props.detail.sendList)
  return (
    <div>
      <IceContainer title="优惠券状态:">
      <div style={styles.bont}>
      {renderCouponsStatus(props.detail.detail.status,2,props.detail.detail)}
      </div>
      </IceContainer>
      <IceContainer title="优惠券信息">
      <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>优惠券总金额：</span>
            {renderAllAmount(1,2,props.detail.detail)} 
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>优惠券类型：</span>
            {CouponsType(props.detail.detail.type)}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>优惠券名称：</span>
            {props.detail.detail.couponName}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>面值：</span>
            {renderAmount(props.detail.detail.amount)}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>总发行量：</span>
            {props.detail.detail.total}张
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>使用限制：</span>
            {orderTypeArr(props.detail.detail.auctionLimit)} 
          </div>
        </Col>
        </Row>
        {/* <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>每人发放数量：</span>
            {props.detail.receiveLimit} 
          </div>
        </Col>
        </Row> */}
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>发放总数量：</span>
            {Number(props.detail.detail.total)-Number(props.detail.detail.totalSurplus)}张
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>是否可叠加：</span>
            {CouponsIsAdd(props.detail.detail.multiCoupons)}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>使用门槛：</span>
            {renderAmount(props.detail.detail.threshold)}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>有效领取时间：</span>
            {`${renderTime(props.detail.detail.startTime)}---
            ${renderTime(props.detail.detail.endTime)}`}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>有效使用时间：</span>
            {renderValidityPeriod(1,2,props.detail.detail)}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>备注：</span>
            {props.detail.detail.remark}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>审核理由：</span>
            {props.detail.detail.checkReason}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>创建时间：</span>
            {renderTime(props.detail.detail.created)}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>提审时间：</span>
            {renderTime(props.detail.detail.submitCheckTime)}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>发布时间：</span>
            {renderTime(props.detail.detail.created)}
          </div>
        </Col>
        </Row>
        {/* <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>生效时间：</span>
            2019-12-26 12:26:59
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>过期时间：</span>
            2019-12-26 12:26:59
          </div>
        </Col>
        </Row> */}
      </IceContainer>
     {
      renderCouponsStatus(props.detail.detail.status,2,props.detail.detail)=='库存中'? 
    <IceContainer title="发放对象">
      <Table
        dataSource={props.detail.sendList==null?[]:props.detail.sendList}
        // dataSource={[{orderSn:123,name:231,amount:'amount',transferFee:'1',account:'2',author:'2d',auditor:'23'}]}
        // rowSelection={{ onChange: onChange }}
      >
        <Table.Column title="商家名称" dataIndex="name"  width={200} />
        <Table.Column title="商家手机号" dataIndex="mobile" width={200} />
        <Table.Column title="商家真实姓名" dataIndex="name"  width={150} />
      </Table>
      <Pagination
        style={styles.pagination}
        current={props.pages}
        onChange={handlePaginationChange}
        total={props.total}
        pageSize={20}
      />
    </IceContainer>
    :null
     } 
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
};
