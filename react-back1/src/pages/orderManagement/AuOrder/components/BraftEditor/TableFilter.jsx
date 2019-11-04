/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select, DatePicker, Search, Button, Icon } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import moment from 'moment';
import IceContainer from '@icedesign/container';
import { renderTime } from '../../../../../common/js/filter';

const { Row, Col } = Grid;
const { RangePicker } = DatePicker;
const onChange = (value) => console.log(value);
const onOk = (value) => console.log('onOK:', value.format('YYYY-MM-DD HH:mm:ss'));
const onRangeOk = (value) => {
  // const startValue = moment(value[0].format('YYYY-MM-DD HH:mm:ss'));
  // const endValue = moment(value[1].format('YYYY-MM-DD HH:mm:ss'));
};


// let startValue = moment('2019-12-15', 'YYYY-MM-DD', true);
// let endValue = moment('09:00:00', 'HH:mm:ss', true);

const defaultTimeValue = moment('09:00:00', 'HH:mm:ss', true);
export default class Filter extends Component {
  static displayName = 'Filter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        // startTime:'',
        // endTime:''
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  // timeonChange = (val) =>{
  //   this.state.value.startTime = val[0]._d.valueOf()/1000
  //   this.state.value.endTime = val[1]._d.valueOf()/1000
  // }

  condition = () => {
    // console.log(this.state.value)
    this.props.handleConChange(this.state.value);
    // console.log(this.props,this.state.value);
  }

  exportData = () => {
    console.log(this.props, this.state.value);
    this.props.exportData(this.state.value);
  }

  render() {
    // let startValue = moment(renderTime(this.state.value.startTime), 'YYYY-MM-DD HH:mm:ss', true);
    // let endValue = moment(renderTime(this.state.value.endTime), 'YYYY-MM-DD HH:mm:ss', true);
    return (
      <IceContainer title="订单管理">

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
                  <Input placeholder="请输入" size="large" />
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
                  <Input placeholder="请输入" size="large" />
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
                  <Input placeholder="请输入" size="large" />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="realname" />
                </div>
              </div>
            </Col>
            <Col l="12">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>订单状态：</span>
                <IceFormBinder triggerType="onBlur" name="status">
                  <Select size="large" style={{ width: '200px' }}>
                    <Select.Option value="">全部</Select.Option>
                    <Select.Option value="0">待付款</Select.Option>
                    <Select.Option value="1">待发货</Select.Option>
                    <Select.Option value="2">已发货</Select.Option>
                    <Select.Option value="3">确认收货</Select.Option>
                    <Select.Option value="4">已完成</Select.Option>
                    <Select.Option value="-4">退款</Select.Option>
                    <Select.Option value="-3">关闭</Select.Option>
                    <Select.Option value="-2">取消</Select.Option>
                    <Select.Option value="-1">删除</Select.Option>
                  </Select>
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="status" />
                </div>
              </div>
            </Col>
            <Col l="12">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>订单编号：</span>
                <IceFormBinder triggerType="onBlur" name="orderSn">
                  <Input placeholder="请输入订单编号" size="large" />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="orderSn" />
                </div>
              </div>
            </Col>
            <Col l="12">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>下单时间：</span>
                {/* <RangePicker showTime onChange={onChange} onOk={this.timeonChange} /> */}

                <IceFormBinder triggerType="onBlur" name="date">
                  <RangePicker showTime onChange={onChange} onOk={this.timeonChange} />
                  {/* <DatePicker showTime onChange={onChange} onOk={onOk} resetTime /> */}
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="date" />
                </div>
              </div>
            </Col>
            <Col l="12">
              <div style={styles.formItem}>
                <span style={{ marginLeft: '15px' }} />
                <span style={styles.formLabel}>商户昵称：</span>
                <IceFormBinder triggerType="onBlur" name="shopName">
                  <Input placeholder="请输入" size="large" />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="shopName" />
                </div>
              </div>
            </Col>
            <Col l="12">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>专场编号：</span>
                <IceFormBinder triggerType="onBlur" name="aid">
                  <Input placeholder="请输入" size="large" />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="aid" />
                </div>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <Button type="primary" style={styles.button} onClick={this.condition}>
                查询
                </Button>
                <Button type="primary" onClick={this.exportData} style={styles.ml10}>
                导出
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
  ml10: {
    marginLeft: '10px',
  },
};
