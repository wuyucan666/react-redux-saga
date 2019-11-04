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
import {AuctionListType,auditStatus,imgUrl,ShootType,ShootCreateType,ShootChannel} from '../../../../../common/js/filter'
const { Row, Col } = Grid;

export default function CustomTable(props)  {

  const [page, setPage] = useState(1);
  const [info,setInfo] = useState({})
  
//页码查询
  const handlePaginationChange = (current) => {
    setPage(current)
    // console.log(props.pages);
    props.handlePage(current)
  };

  useEffect(() => {
    let obj = {}
    if(window.location.href.split("?").length<=1){

    }else{
     obj = {
        mobile:window.location.href.split('mobile=')[1].split('&')[0],
        nickname:decodeURI(window.location.href.split('nickname=')[1].split('&')[0]),
        uuid:window.location.href.split('&')[2].split('=')[1]
      }
    }
    setInfo(obj);
  },[]);


  console.log(props);
  return (
    <div>
      <IceContainer title="获奖信息">
      <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>用户名称：</span>
            {info.nickname} 
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>用户账号：</span>
            {info.mobile} 
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>送拍次数：</span>
            {props.countInfo == null ? '':props.countInfo.orderCount}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>送拍拍品总数：</span>
            {props.countInfo == null ? '':props.countInfo.colCount}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>当前获得抽奖券总数：</span>
            {props.countInfo == null ? '':props.countInfo.giftCount}
          </div>
        </Col>
        </Row>
      </IceContainer>
    <IceContainer title="奖励列表">
      <Table
        dataSource={props.lists}
        // dataSource={[{orderSn:123,name:231,amount:'amount',transferFee:'1',account:'2',author:'2d',auditor:'23'}]}
        // rowSelection={{ onChange: onChange }}
      >
        <Table.Column title="送拍商家名称" dataIndex="shopName"  width={200} />
        <Table.Column title="送拍件数" dataIndex="colCount" width={200} />
        <Table.Column title="奖励总数" dataIndex="giftCount"  width={150} />
        <Table.Column title="额外奖励数" dataIndex="extraCount"  width={150} />
        <Table.Column title="奖品状态" dataIndex="createType" cell={ShootCreateType} width={150} />
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