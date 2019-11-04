/* eslint react/no-string-refs:0 */
// import React, { Component } from 'react';
import { Grid, Input, Select, DatePicker,Search,Button,Icon,Tab  } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
import { Message } from '@alifd/next';
// hooks
import React, { useState,useRef } from 'react';
import { renderAccountStatus } from '../../../../../common/js/filter';
// import { Link } from 'react-router-dom';
const { Row, Col } = Grid;
const { RangePicker } = DatePicker;


export default function Filter(props){
    const [value, setValue] = useState({
      status:9
    });
    const [date, setDate] = useState({});
    const ref = useRef('form')
    const condition = () => {
      // value.pid = 21001
      if(value.amount){
        if(!/^[0-9]+$/.test(Number(value.amount))){
          Message.error('面额为纯数字')
          return false;
        }
      }
      props.handleConChange(value)
      setValue(value)
      console.log(props,value)
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
              <span style={styles.formLabel}>优惠券名称：</span>
              <IceFormBinder triggerType="onBlur" name="couponName">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="couponName" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>优惠券类型：</span>
              <IceFormBinder triggerType="onBlur" name="type">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="0">全部</Select.Option>
                  <Select.Option value="1">商户</Select.Option>
                  <Select.Option value="2">平台</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="type" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>优惠券面额：</span>
              <IceFormBinder triggerType="onBlur" name="amount">
                <Input placeholder="输入面额，单位为元" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="amount" />
              </div>
            </div>
          </Col>
          <Col l="12">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>审核状态：</span>
                <IceFormBinder triggerType="onBlur" name="status">
                  <Select size="large" style={{ width: '200px' }}>
                    <Select.Option value="9">全部</Select.Option>
                    <Select.Option value="2">待审核</Select.Option>
                    <Select.Option value="0">审核成功</Select.Option>
                    <Select.Option value="3">审核失败</Select.Option>
                  </Select>
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="status" />
                </div>
              </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>日期：</span>
              <IceFormBinder triggerType="onBlur" name="date">
              <RangePicker showTime onChange={onChange}  />
                {/* <DatePicker showTime onChange={onChange} onOk={onOk} resetTime /> */}
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="date" />
              </div>
            </div>
          </Col>
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
