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
    console.log(value)
    // console.log(props,value)
  }

  const onChange = (val)=>{
    setDate(val)
    console.log(date)
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
              <span style={styles.formLabel}>送拍用户：</span>
              <IceFormBinder triggerType="onBlur" name="nickname">
                <Input placeholder="请输入送拍用户名" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="nickname" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>抽奖礼品：</span>
              <IceFormBinder triggerType="onBlur" name="type">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="">全部</Select.Option>
                  <Select.Option value="0">抽奖券</Select.Option>
                  <Select.Option value="1">优惠券</Select.Option>
                  <Select.Option value="2">积分</Select.Option>
                  <Select.Option value="3">实物(叮咚70周年纪念币)</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="type" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>礼品状态：</span>
              <IceFormBinder triggerType="onBlur" name="status">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="">全部</Select.Option>
                  <Select.Option value="1">已发放</Select.Option>
                  <Select.Option value="0">未发放</Select.Option>
                  {/* <Select.Option value="3">领取未填写地址</Select.Option>
                  <Select.Option value="2">领取已填写地址</Select.Option> */}
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="status" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>时间查询：</span>
              <IceFormBinder triggerType="onBlur" name="time">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="0">全部</Select.Option>
                  <Select.Option value="1">最近三个月</Select.Option>
                  <Select.Option value="2">最近六个月</Select.Option>
                  <Select.Option value="3">最近一年</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="time" />
              </div>
            </div>
          </Col>
          {/* <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>时间查询：</span>
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
              <Button type="primary" onClick={condition} style={styles.button}>
                查询
              </Button>
              {/* <Button type="primary" onClick={this.condition} style={styles.ml10}>
                导出数据
              </Button> */}
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
};

