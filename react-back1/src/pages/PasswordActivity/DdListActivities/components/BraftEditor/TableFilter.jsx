/* eslint react/no-string-refs:0 */
import React, { useState,useRef } from 'react';
import { Grid, Input, Select, DatePicker,Search,Button,Icon  } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import moment from 'moment';
import IceContainer from '@icedesign/container';
// import {timeForMat} from '../../../../../common/js/common'
const { Row, Col } = Grid;
const { RangePicker } = DatePicker;

export default function Filter(props){
  const [value, setValue] = useState({});
  const [date, setDate] = useState({});
  const ref = useRef('form')
  const condition = () => {
    props.handleLists(value)
    setValue(value)
  }

  const onChange = (val)=>{
    setDate(val)
  }

  const AddActivity = ()=>{
    let url = '/#/PasswordActivity/CreateActivity'
    window.location.href=url
  }
    return (
      <IceContainer title="">
      <IceFormBinderWrapper
         value={value}
         ref={ref}
      >
      <Row wrap gutter="20" style={styles.formRow}>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>活动状态：</span>
              <IceFormBinder triggerType="onBlur" name="status">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="">全部</Select.Option>
                  <Select.Option value="2">待提审</Select.Option>
                  <Select.Option value="3">审核中</Select.Option>
                  <Select.Option value="-4">审核失败</Select.Option>
                  <Select.Option value="4">待发出</Select.Option>
                  <Select.Option value="1">已发出</Select.Option>
                  <Select.Option value="0">已下架</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="status" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>创建时间查询：</span>
              <IceFormBinder triggerType="onBlur" name="date">
              <RangePicker showTime onChange={onChange}  />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="date" />
              </div>
            </div>
          </Col>
          <Col l="24">
            <div style={styles.formItem}>
              <Button type="primary" onClick={condition} style={styles.button}>
                查询
              </Button>
              <Button type="primary" onClick={AddActivity} style={styles.ml10}>
                添加口令活动
              </Button>
            </div>
          </Col>
        </Row>
        
        
      </IceFormBinderWrapper>
      </IceContainer>
    );
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
    minWidth: '70px',
  },
  ml10:{
    marginLeft:'10px'
  }
};

