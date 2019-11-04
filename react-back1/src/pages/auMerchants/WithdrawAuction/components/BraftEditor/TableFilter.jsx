/* eslint react/no-string-refs:0 */
// import React, { Component } from 'react';
import { Grid, Input, Select, DatePicker,Search,Button,Icon,Tab  } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
// hooks
import React, { useState,useRef } from 'react';
import { renderAccountStatus } from '../../../../../common/js/filter';
// import { Link } from 'react-router-dom';
const { Row, Col } = Grid;
const { RangePicker } = DatePicker;


export default function Filter(props){
    const [value, setValue] = useState({});
    const [date, setDate] = useState({});
    const ref = useRef('form')
    const condition = () => {
      props.handleLists(value)
      setValue(value)
      // console.log(props,value)
    }

    const onChange = (val)=>{
      setDate(val)
      console.log(date)
    }

    return(
      <div>
        <IceContainer>
        <IceFormBinderWrapper
          value={value}
          ref={ref}
        >
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>商户昵称:</span>
              <IceFormBinder triggerType="onBlur" name="nickname">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="nickname" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>商户ID：</span>
              <IceFormBinder triggerType="onBlur" name="shopId">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="shopId" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>商户账号：</span>
              <IceFormBinder triggerType="onBlur" name="mobile">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="mobile" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>商户姓名：</span>
              <IceFormBinder triggerType="onBlur" name="shopname">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="shopname" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>业务类型：</span>
              <IceFormBinder triggerType="onBlur" name="type">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="0">全部</Select.Option>
                  <Select.Option value="1">钱币</Select.Option>
                  <Select.Option value="2">邮票</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="type" />
              </div>
            </div>
          </Col>
          {/* <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>日期：</span>
              <IceFormBinder triggerType="onBlur" name="date">
              <RangePicker showTime onChange={onChange}  />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="date" />
              </div>
            </div>
          </Col> */}
          <Col l="24">
            <div style={styles.formItem}>
              <Button type="primary" onClick={condition} >
                查询
              </Button>
              {/* <Button type="primary" style={styles.button} onClick={this.exportData}>
                导出数据
              </Button> */}
            </div>
          </Col>
          </Row>
        </IceFormBinderWrapper>
        </IceContainer>
      </div>
    )
}


const styles = {
  container: {
    margin: '20px',
    padding: '0',
  },
  title: {
    margin: '0',
    padding: '20px',
    fonSize: '16px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: 'rgba(0,0,0,.85)',
    fontWeight: '500',
    borderBottom: '1px solid #eee',
  },
  formRow: {
    padding: '10px 20px',
  },
  formItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  formLabel: {
    minWidth: '100px',
  },
  button:{
    marginLeft:'20px'
  },
};
