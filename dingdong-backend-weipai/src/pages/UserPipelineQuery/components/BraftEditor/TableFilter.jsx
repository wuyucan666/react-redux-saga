/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select, DatePicker,Search,Button,Icon,Tab  } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import moment from 'moment';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
const { Row, Col } = Grid;
const { RangePicker } = DatePicker;
const onChange = (value) => console.log(value);
const onOk = (value) => console.log('onOK:', value.format('YYYY-MM-DD HH:mm:ss'));
const onRangeOk = (value) => console.log('onOk: [%s, %s]', value[0].format('YYYY-MM-DD HH:mm:ss'), value[1].format('YYYY-MM-DD HH:mm:ss'));

const defaultTimeValue = moment('09:00:00', 'HH:mm:ss', true);
export default class Filter extends Component {
  static displayName = 'Filter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
    };
  }

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  render() {
    return (
      <div>
      <IceContainer>
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户名：</span>
              <IceFormBinder triggerType="onBlur" name="pageName">
                <Input placeholder="请输入用户名" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="pageName" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>提现订单号：</span>
              <IceFormBinder triggerType="onBlur" name="eventId">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="eventId" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>提现金额：</span>
              <IceFormBinder triggerType="onBlur" name="eventName">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="eventName" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>手续费：</span>
              <IceFormBinder triggerType="onBlur" name="eventName">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="eventName" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>提现账户：</span>
              <IceFormBinder triggerType="onBlur" name="eventName">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="eventName" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>提现方式：</span>
              <IceFormBinder triggerType="onBlur" name="type">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="1">全部</Select.Option>
                  <Select.Option value="2">支付宝</Select.Option>
                  <Select.Option value="3">汇付</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="type" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>账户类型：</span>
              <IceFormBinder triggerType="onBlur" name="type">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="1">全部</Select.Option>
                  <Select.Option value="2">支付宝</Select.Option>
                  <Select.Option value="3">汇付</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="type" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>申请时间：</span>
              <IceFormBinder triggerType="onBlur" name="date">
              <RangePicker showTime onChange={onChange} onOk={onRangeOk} />
                {/* <DatePicker showTime onChange={onChange} onOk={onOk} resetTime /> */}
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="date" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>提现状态：</span>
              <IceFormBinder triggerType="onBlur" name="type">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="1">全部状态</Select.Option>
                  <Select.Option value="2">待初审</Select.Option>
                  <Select.Option value="3">待复审</Select.Option>
                  <Select.Option value="4">审核失败</Select.Option>
                  <Select.Option value="5">提现失败</Select.Option>
                  <Select.Option value="6">转账中</Select.Option>
                  <Select.Option value="7">体现中</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="type" />
              </div>
            </div>
          </Col>
          <Col l="24">
            <div style={styles.formItem}>
              <Button type="primary" >
                查询
              </Button>
              <Button type="primary" style={styles.button}>
                导出数据
              </Button>
            </div>
          </Col>
        </Row>
      
      </IceFormBinderWrapper>
      </IceContainer>
      </div>
    );
  }
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
