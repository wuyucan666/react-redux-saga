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
import {AuctionListType,auditStatus,imgUrl,ShootType,ShootCreateType,versionDownload,myString,forceUpdate,reinstall} from '../../../../../common/js/filter'
import nw from '../../../../../common/http/post'
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

  const handleEdit = () => {
    window.location.href = `/#/Version/EditVersion?id=${props.countInfo.id}`
  }

  const goBefore = ()=>{
    // let url = '/#/Version/HistoricalRecordList'
    // window.location.href=url
    window.history.go(-1)
  }
  return (
    <div>
       <Button type="primary" style={styles.fr} onClick={goBefore} >
          返回
      </Button> 
      <IceContainer title="版本详情">
      <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>发布版本号：</span>
            {!props.countInfo.version ? '':props.countInfo.version}(上一版本号:{!props.countInfo.old_version ? '':props.countInfo.old_version})
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>发布人：</span>
            {!props.countInfo.admin_name ? '':props.countInfo.admin_name}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>发布时间：</span>
            {props.countInfo == null ? '':props.countInfo.create_time}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>是否强制更新：</span>
            {!props.countInfo.force_update ? '':forceUpdate(props.countInfo.force_update)}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>是否需要重新下载安装包：</span>
            {!props.countInfo.is_reinstall ? '':reinstall(props.countInfo.is_reinstall)}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>更新包地址：</span>
            {props.countInfo.update_package_url ? props.countInfo.update_package_url : '无'}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>更新提示：</span>
            {props.countInfo.tips == '' || props.countInfo.tips == null ? '':props.countInfo.tips}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>更新内容：</span>
            <pre>
            {props.countInfo.contents == '' || props.countInfo.contents == null ? '':myString(props.countInfo.contents)}
          </pre>
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>版本更新包：</span>
            {props.countInfo.app_url == '' || props.countInfo == null ?'无': <a href={`${nw.ddurl().substring(0,nw.ddurl().length-3)+(props.countInfo == null ? '':props.countInfo.app_url)}`} download={`${props.countInfo == null ? '':props.countInfo.version}`}>
            {props.countInfo == null ? '':props.countInfo.version}
            </a>}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <Button type="primary" style={styles.link} onClick={handleEdit} >
              编辑
            </Button>
          </div>
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
  fr: {
    float: 'right'
  },
};
