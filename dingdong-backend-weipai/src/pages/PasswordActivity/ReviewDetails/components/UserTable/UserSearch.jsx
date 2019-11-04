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

export default function UserTable(props) {
  const [value, setValue] = useState({});
  const ref = useRef('form');
  // const [info,setInfo] = useState({})

  // const [address,setAddress] = useState({});
  // const [logistics,setLogistics] = useState({})
  //审核信息
  const Audit = () => {
    return (
      <IceContainer title="审核信息">
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>名字：</span>
              {props.details ? props.details.name : ''}
            </div>
          </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>电话：</span>
              {props.details ? props.details.mobile : ''}
            </div>
          </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>微信：</span>
              {props.details ? props.details.wxAccount : ''}
            </div>
          </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>QQ号：</span>
              {props.details ? props.details.qq : ''}
            </div>
          </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>资源简要说明：</span>
              {props.details ? props.details.description : ''}
            </div>
          </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>微信群截图：</span>
              <ul>
                {props.details.thumb
                  ? props.details.thumb.map(item => (
                    <Zmage
                      src={imgUrl(item.url)}
                      className="media-side"
                      width={200}
                      height={200}
                      style={styles.ml10}
                    />
                    ))
                  : ''}
              </ul>
            </div>
          </Col>
        </Row>
      </IceContainer>
    );
  };

  const condition = (e, val) => {
    console.log(val, value);

    const NewVal = {
      reason: '',
      ...value,
      status: val,
    };
    setValue(NewVal);
    if (NewVal.reason == '' && val == -1) {
      Message.error('请输入驳回原因');
    } else {

      if(NewVal.cycle){
        if(!(/(^[1-9]\d*$)/.test(NewVal.cycle))){
          Message.warning('代言周期必须是正整数！'); 
          delete NewVal.cycle
  　　　　 return false;
        }
        props.failure(NewVal);
      }else{
        Message.error('代言周期必填项！');
      }
      // props.failure(NewVal);
    }

    // props.handleLists(value)
    // setValue(value)
    
  };

  const Termination = () => {
    if (GetQueryString('status') == -2) {
      return (
        <IceContainer title="解约详情">
          <Row wrap gutter="20" style={styles.formRow}>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>操作人员：</span>
                {props.details ? props.details.terminateNickname : ''}
              </div>
            </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>解约时间：</span>
                {renderTime(props.details ? props.details.terminateTime : '')}
                {/* {renderTime(props.details == null ? '':props.details.created)} */}
              </div>
            </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>解约理由：</span>
                {props.details ? props.details.terminateReason : ''}
              </div>
            </Col>
          </Row>
        </IceContainer>
      );
    } else if (GetQueryString('status') == 0) {//0
      return (
        <IceContainer title="审核信息">
          <Row wrap gutter="20" style={styles.formRow}>
            <Col l="24">
              <div style={styles.formItem}>
                <IceFormBinderWrapper value={value} ref={ref}>
                  <Row wrap gutter="20" style={styles.formRow}>
                    <div style={styles.formItem}>
                      <span style={styles.formLabel}>代言周期：</span>
                      <IceFormBinder triggerType="onBlur" name="cycle">
                        <Input placeholder="请输入" size="large" />
                      </IceFormBinder>
                      <span style={{marginLeft:'15px'}}>月</span>
                      <div style={styles.formError}>
                        <IceFormError name="cycle" />
                      </div>
                    </div>
                  </Row>
                </IceFormBinderWrapper>
              </div>
            </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
            <Col l="24">
              <div style={styles.formItem}>
                <IceFormBinderWrapper value={value} ref={ref}>
                  <Row wrap gutter="20" style={styles.formRow}>
                    <div style={styles.formItem}>
                      <span style={styles.formLabel}>审核原因：</span>
                      <IceFormBinder triggerType="onBlur" name="reason">
                        <Input placeholder="请输入审核原因" size="large" />
                      </IceFormBinder>
                      <div style={styles.formError}>
                        <IceFormError name="reason" />
                      </div>
                    </div>
                  </Row>
                </IceFormBinderWrapper>
              </div>
            </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
            <Button
              type="primary"
              onClick={e => condition(e, 1)}
              style={styles.button}
            >
              通过
            </Button>
            <Button
              type="primary"
              onClick={e => condition(e, -1)}
              style={styles.ml10}
            >
              驳回
            </Button>
          </Row>
        </IceContainer>
      );
    } else if (GetQueryString('status') == -1 || GetQueryString('status') == 1 ) {
      return (
        <IceContainer title="审核详情">
          <Row wrap gutter="20" style={styles.formRow}>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>操作人员：</span>
                {props.details ? props.details.checkAuthorName : ''}
              </div>
            </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>审核时间：</span>
                {renderTime(props.details ? props.details.checkTime : '')}
                {/* {renderTime(props.details == null ? '':props.details.created)} */}
              </div>
            </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>审核理由：</span>
                {props.details ? props.details.reason : ''}
              </div>
            </Col>
          </Row>
        </IceContainer>
      );
    }
    return null;
  };

  return (
    <div>
      <IceContainer title="用户信息">
        {/* <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户ID：</span>
              {props.details == null ? '' : props.details.uuid}
            </div>
          </Col>
        </Row> */}
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户昵称：</span>
              {props.details == null ? '' : props.details.nickname}
            </div>
          </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>真实姓名：</span>
              {props.details == null ? '' : props.details.realname}
            </div>
          </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户账号：</span>
              {props.details == null ? '' : props.details.user_mobile}
            </div>
          </Col>
        </Row>
      </IceContainer>
      <Audit />
      <Termination />
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
