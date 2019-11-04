/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select, DatePicker,Search,Button  } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import moment from 'moment';
import IceContainer from '@icedesign/container';
const { Row, Col } = Grid;
const { RangePicker } = DatePicker;
const onChange = (value) => console.log(value);


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
  componentDidMount(){
    const status = window.location.hash.split('=')[1]
    if (status) {
      this.setState({
        value :{
          status: status
        }
      })
      this.props.handleConChange({status: status})
    }
  }

  formChange = (value) => {
    // console.log('value', value);
    // this.setState({
    //   value,
    // });
  };

  condition = ()=> {
    this.props.handleConChange(this.state.value)
    // console.log(this.props,this.state.value);
  }

  render() {
    return (
      <IceContainer title="线下充值列表">
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户昵称：</span>
              <IceFormBinder triggerType="onBlur" name="nickname">
                <Input placeholder="请输入用户昵称" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="nickname" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>真实姓名：</span>
              <IceFormBinder triggerType="onBlur" name="realname">
                <Input placeholder="请输入真实姓名" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="realname" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户账户：</span>
              <IceFormBinder triggerType="onBlur" name="mobile">
                <Input placeholder="请输入账户" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="mobile" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>订单号：</span>
              <IceFormBinder triggerType="onBlur" name="orderSn">
                <Input placeholder="请输入订单号" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="orderSn" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>金额：</span>
              <IceFormBinder triggerType="onBlur" name="amount">
                <Input placeholder="请输入金额" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="amount" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>状态：</span>
              <IceFormBinder triggerType="onBlur" name="status">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="">全部</Select.Option>
                  <Select.Option value="1">完成</Select.Option>
                  <Select.Option value="2">失效</Select.Option>
                  <Select.Option value="3">待付款</Select.Option>
                  <Select.Option value="4">待入款</Select.Option>
                  <Select.Option value="5">已取消</Select.Option>
                  <Select.Option value="6">审核中</Select.Option>
                  <Select.Option value="7">审核不通过</Select.Option>
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
              <RangePicker showTime onChange={onChange} style={styles.formDate} />
                {/* <DatePicker showTime onChange={onChange} onOk={onOk} resetTime /> */}
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="date" />
              </div>
            </div>
          </Col>
          <Col l="24">
            <div style={styles.formItem}>
              <Button type="primary" onClick={this.condition}>
                查询
              </Button>
            </div>
          </Col>
        </Row>
        
      </IceFormBinderWrapper>
      </IceContainer>
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
    minWidth: '70px',
  },
  button:{
    marginLeft: '20px',
  },
  formDate:{
    minWidth: '350px',
  }
};
