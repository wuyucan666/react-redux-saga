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
import { Message } from '@alifd/next';
const { Row, Col } = Grid;
const { RangePicker } = DatePicker;
const onChange = (value) => console.log(value);
const onOk = (value) => console.log('onOK:', value.format('YYYY-MM-DD HH:mm:ss'));
const onRangeOk = (value) => console.log('onOk: [%s, %s]', value[0].format('YYYY-MM-DD HH:mm:ss'), value[1].format('YYYY-MM-DD HH:mm:ss'));
import { Link } from 'react-router-dom';

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

  condition = ()=> {
    // console.log(this.state.value);
    this.props.handleListChange(this.state.value)
    // if( this.state.value.mobile ||  this.state.value.nickname  || this.state.value.uuid ){
    //   this.props.handleListChange(this.state.value)
    // }else{
    //   Message.error('请输入条件查询 ') 
    // }
    
  }

  render() {
    return (
      <IceContainer title="基本信息">
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户账号：</span>
              <IceFormBinder triggerType="onBlur" name="mobile">
                <Input placeholder="请输入账号" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="mobile" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户名称：</span>
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
              <span style={styles.formLabel}>用户uuid：</span>
              <IceFormBinder triggerType="onBlur" name="uuid">
                <Input placeholder="请输入" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="uuid" />
              </div>
            </div>
          </Col>
          <Col l="24">
            <div style={styles.formItem}>
              <Button type="primary" style={styles.button} onClick={this.condition}>
                查询
              </Button>
              <Button type="primary" style={styles.button}>
              <Link target="_blank" to="/auMerchants/AddMerchants" style={styles.LINK}>
              添加商户
              </Link>  
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
    margin:'0 10px 0 0px',
  },
  LINK:{
    margin:'0px',
    color:'#fff'
  }
};
