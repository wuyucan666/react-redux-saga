/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select, DatePicker, Search, Button, Icon, Tab } from '@alifd/next';
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


const defaultTimeValue = moment('09:00:00', 'HH:mm:ss', true);
export default class Filter extends Component {
  static displayName = 'Filter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        // cashType: 'C',
      },
      disable: false,
    };
  }

  formChange = (value) => {
    // console.log('value', value);
    // this.setState({
    //   value,
    // });
  };

  condition= () => {
    this.props.handleConChange(this.state.value);
    // console.log(this.state.value);
  }

  onChange= (val) => {
    // console.log(val);
    if (val == 'C') {
      this.setState({
        disable: false,
      });
    } else {
      this.setState({
        disable: true,
      });
    }
  }

  exportData = () => {
    this.state.value.pid = 20204;
    this.props.handleExportData(this.state.value);
    // console.log(this.state.value)
  }

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
                  <span style={styles.formLabel}>手机号码：</span>
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
                  <span style={styles.formLabel}>用户昵称：</span>
                  <IceFormBinder triggerType="onBlur" name="nickname">
                    <Input placeholder="请输入用户名" size="large" />
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
                    <Input placeholder="" size="large" />
                  </IceFormBinder>
                  <div style={styles.formError}>
                    <IceFormError name="realname" />
                  </div>
                </div>
              </Col>
              <Col l="12">
                <div style={styles.formItem}>
                  <span style={styles.formLabel}>充值时间：</span>
                  <IceFormBinder triggerType="onBlur" name="date">
                    <RangePicker showTime />
                    {/* <DatePicker showTime onChange={onChange} onOk={onOk} resetTime /> */}
                  </IceFormBinder>
                  <div style={styles.formError}>
                    <IceFormError name="date" />
                  </div>
                </div>
              </Col>
              <Col l="12">
                <div style={styles.formItem}>
                  <span style={styles.formLabel}>充值单号：</span>
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
                  <span style={styles.formLabel}>充值金额：</span>
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
                  <span style={styles.formLabel}>充值类型：</span>
                  <IceFormBinder triggerType="onBlur" name="cashType">
                    <Select size="large" onChange={this.onChange} style={{ width: '200px' }}>
                      <Select.Option value="C,S,M,G">全部</Select.Option>
                      <Select.Option value="C">余额</Select.Option>
                      <Select.Option value="S">保证金</Select.Option>
                      <Select.Option value="M,G">订单</Select.Option>
                    </Select>
                  </IceFormBinder>
                  <div style={styles.formError}>
                    <IceFormError name="cashType" />
                  </div>
                </div>
              </Col>
              <Col l="12">
                <div style={styles.formItem}>
                  <span style={styles.formLabel}>充值方式：</span>
                  <IceFormBinder triggerType="onBlur" name="payType">
                    <Select size="large" style={{ width: '200px' }}>
                      <Select.Option value="0">全部方式</Select.Option>
                      <Select.Option value="1">微信</Select.Option>
                      <Select.Option value="2">支付宝</Select.Option>
                      <Select.Option value="3">银行卡</Select.Option>
                      <Select.Option disabled={this.state.disable} value="-1">后台补单</Select.Option>
                      <Select.Option disabled={this.state.disable} value="6">线下付款</Select.Option>
                    </Select>
                  </IceFormBinder>
                  <div style={styles.formError}>
                    <IceFormError name="payType" />
                  </div>
                </div>
              </Col>

              <Col l="24">
                <div style={styles.formItem}>
                  <Button type="primary" onClick={this.condition} >
                查询
                  </Button>
                  <Button type="primary" style={styles.button} onClick={this.exportData} >
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
  button: {
    marginLeft: '20px',
  },
};

