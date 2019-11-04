/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select, DatePicker,Search,Button,Icon  } from '@alifd/next';
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
  exportData = () => {
    console.log(this.props,this.state.value)
    this.props.exportData(this.state.value)
  }

  render() {
    return (
      <IceContainer title="订单列表(用户已付款订单)">
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="8">
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
          {/* <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>拍品名称</span>
              <IceFormBinder triggerType="onBlur" name="acName">
                <Input placeholder="请输入拍品名称" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="acName" />
              </div>
            </div>
          </Col> */}
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>支付时间：</span>
              <IceFormBinder triggerType="onBlur" name="date">
              <RangePicker showTime  />
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
              <Button type="primary" onClick={this.exportData} style={styles.button}>
                导出数据
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
  }
};
