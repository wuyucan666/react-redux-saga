/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select, DatePicker,Search,Button,Icon,Tab, Message  } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import moment from 'moment';
import IceContainer from '@icedesign/container';
// import { Link } from 'react-router-dom';
const { Row, Col } = Grid;
const { RangePicker } = DatePicker;


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
    this.setState({
      value,
    });
  };

  condition = ()=> {
    let regNumber = /^[0-9]+$/
    if (!regNumber.test(this.state.value.amount) && this.state.value.amount) {
      Message.warning('提现金额只能输入数字')
      return
    } else if (!regNumber.test(this.state.value.transferFee) && this.state.value.transferFee) {
      Message.warning('手续费只能输入数字')
      return
    } else {
    }
    this.props.handleConChange(this.state.value)
  }
  exportData = () => {
    this.state.value.pid = 20202
    this.props.handleExportData(this.state.value)
    // console.log(this.state.value)
  }

  componentDidMount(){
    console.log(window.location.hash.split('=')[1])
    if ( window.location.hash.split('=')[1]){
      console.log(1243242423)
      this.setState({
        value :{
          status:1,
        }
      });
    }
  }

  render() {
    // console.log(this.props)
    return (
      <div>
      <IceContainer>
      <IceFormBinderWrapper
        value={this.state.value}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>手机号码：</span>
              <IceFormBinder triggerType="onBlur" name="mobile">
                <Input placeholder="请输入手机号码" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="mobile" />
              </div>
            </div>
          </Col>
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
                <Input placeholder="请输入用户真实姓名" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="realname" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>提现订单号：</span>
              <IceFormBinder triggerType="onBlur" name="orderSn">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="orderSn" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>提现金额：</span>
              <IceFormBinder triggerType="onBlur" name="amount">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="amount" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>手续费：</span>
              <IceFormBinder triggerType="onBlur" name="transferFee">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="transferFee" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>提现账户：</span>
              <IceFormBinder triggerType="onBlur" name="account">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="account" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>提现方式：</span>
              <IceFormBinder triggerType="onBlur" name="type">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="0">全部</Select.Option>
                  <Select.Option value="1">微信</Select.Option>
                  <Select.Option value="2">支付宝</Select.Option>
                  <Select.Option value="3">银行卡</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="type" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>提现状态：</span>
              <IceFormBinder triggerType="onBlur" name="status">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="0">全部状态</Select.Option>
                  <Select.Option value="1">审核中</Select.Option>
                  <Select.Option value="2">审核未通过</Select.Option>
                  <Select.Option value="3">审核通过等待银行到账</Select.Option>
                  <Select.Option value="4">已到账</Select.Option>
                  <Select.Option value="5">提现失败</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="status" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>申请时间：</span>
              <IceFormBinder triggerType="onBlur" name="date">
              <RangePicker showTime size="large"  />
                {/* <DatePicker showTime onChange={onChange} onOk={onOk} resetTime /> */}
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="date" />
              </div>
            </div>
          </Col>
          <Col l="24">
            <div style={styles.formItem}>
              <Button type="primary" onClick={this.condition} >
                查询
              </Button>
              <Button type="primary" style={styles.button} onClick={this.exportData}>
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
