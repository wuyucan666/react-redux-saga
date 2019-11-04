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
import {AuctionListType,auditStatus,imgUrl,ShootType,ShootCreateType,ShootChannel,renderTime,InvitationStatus} from '../../../../../common/js/filter'
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

  // useEffect(() => {
  //   let obj = {}
  //   if(window.location.href.split("?").length<=1){

  //   }else{
  //    obj = {
  //       mobile:window.location.href.split('mobile=')[1].split('&')[0],
  //       nickname:decodeURI(window.location.href.split('nickname=')[1].split('&')[0]),
  //       uuid:window.location.href.split('&')[2].split('=')[1]
  //     }
  //   }
  //   setInfo(obj);
  // },[]);


  console.log(props);
  return (
    <div>
      <IceContainer title="获奖信息">
      <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>用户名称：</span>
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
            <span style={styles.formLabel}>基础奖励：</span>
            {props.countInfo == null ? '':props.countInfo.pointsTotal}积分
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>当前邀请好友总数：</span>
            {props.countInfo == null ? '':props.countInfo.inviteTotal}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>获得奖励总数：</span>
            {props.countInfo == null ? '':props.countInfo.pointsTotal}积分+ {props.countInfo == null ? '':props.countInfo.couponTotal}抽奖券
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
        <Table.Column title="邀请好友名称" dataIndex="nickname"  width={200} />
        <Table.Column title="邀请好友账号" dataIndex="mobile" width={200} />
        <Table.Column title="获得积分" dataIndex="reward"  width={150} />
        <Table.Column title="邀请时间" dataIndex="created"  width={150} cell={renderTime}/>
        <Table.Column title="状态" dataIndex="status" cell={InvitationStatus} width={150} />
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
