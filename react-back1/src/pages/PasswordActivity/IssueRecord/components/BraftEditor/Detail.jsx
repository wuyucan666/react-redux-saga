/* eslint-disable react/no-unused-state, no-plusplus */
import React, { useState, useRef, useEffect } from 'react';
import {
  Table,
  Switch,
  Balloon,
  Button,
  Grid,
  Pagination,
  Input,
  Message,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import Zmage from 'react-zmage';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Link } from 'react-router-dom';
import {
  AuctionListType,
  GetQueryString,
  imgUrl,
  ShootType,
  ShootCreateType,
  ShootChannel,
  renderTime,
} from '../../../../../common/js/filter';

const { Row, Col } = Grid;
const renderStatus = (status) => {
  switch (status) {
    case '0':
      return '待领取';
    case '1':
      return '已领取';
    case '2':
      return '已发货';
  }
};
export default function UserTable(props) {
  const [value, setValue] = useState({});
  const ref = useRef('form');

  const Termination = (type) => {

    if (type.status == '2') {
      return (
        <div>
          <Row wrap gutter="20" style={styles.formRow}>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={{ fontWeight: 'bold', color: '000' }}>物流信息：</span>
              </div>
            </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>物流号：</span>
                {props.detail ? props.detail.logistics : ''}
              </div>
            </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>物流公司：</span>
                {props.detail ? props.detail.company : ''}
              </div>
            </Col>
          </Row>
        </div>
      );
    }
    return null;
  };
  console.log(props.detail, 'props');

  return (
    <div>
      <IceContainer title="状态">
        <Button
          type="primary"
          onClick={() => { props.handleBack(); }}
          style={styles.buttonRow}
        >
          返回
        </Button>
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={{ color: 'orange', fontWeight: 'bold' }}>{renderStatus(props.detail.status)}</span>
            </div>
          </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={{ fontWeight: 'bold', color: '000' }}>用户信息：</span>
            </div>
          </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户姓名：</span>
              {props.detail == null ? '' : props.detail.realname}
            </div>
          </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户昵称：</span>
              {props.detail == null ? '' : props.detail.nickname}
            </div>
          </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户账号：</span>
              {props.detail == null ? '' : props.detail.mobile}
            </div>
          </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>收件人：</span>
              {props.detail == null ? '' : props.detail.nickname}
            </div>
          </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>收件人账号：</span>
              {props.detail == null ? '' : props.detail.mobile}
            </div>
          </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>收件地址：</span>
              {props.detail == null ? '' : props.detail.address}
            </div>
          </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={{ fontWeight: 'bold', color: '000' }}>活动礼品：</span>
            </div>
          </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="6">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>礼品名称：</span>
              {props.detail == null ? '' : props.detail.name}
            </div>
          </Col>
          <Col l="6">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>礼品总数量：</span>
              {props.detail == null ? '' : props.detail.total}张
            </div>
          </Col>
          <Col>
            <div style={styles.formItem}>
              <span style={styles.formLabel}>奖品图片：</span>
              {props.detail == null ? '' : props.detail.thumb}
            </div>
          </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>领取截止时间：</span>
              {props.detail == null ? '' : renderTime(props.detail.expireTime)}
            </div>
          </Col>
        </Row>
        <Termination status={props.detail.status} />
      </IceContainer>
    </div>
  );
}

const styles = {
  link: {
    marginRight: '10px',
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
    float: 'right',
  },
  link: {
    display: 'block',
  },
  formItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  ml10: {
    marginLeft: '10px',
  },
};
