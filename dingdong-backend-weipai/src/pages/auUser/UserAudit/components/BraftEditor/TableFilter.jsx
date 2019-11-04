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

const defaultTimeValue = moment('09:00:00', 'HH:mm:ss', true);
export default class Filter extends Component {
  static displayName = 'Filter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        applyTime:'',
        nickname:'',
        realname:'',
        status:'',
        mobile:''
      },
    };
  }

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  componentDidMount(){
    if ( window.location.hash.split('=')[1]){
      this.setState({
        value :{
          status:0,
        }
      });
    }
  }

  condition = ()=> {
    //向父组件中的handleConChange方法里面传递参数
    if( this.state.value.applyTime ||  this.state.value.nickname || this.state.value.realname || this.state.value.mobile ||  this.state.value.status>= 0 ){
      this.props.handleConChange(this.state.value);
    }else{
      // if(this.state.value.status !== 0){
        Message.error('请输入条件查询 ') 
      // }

    }
    // console.log(this.props,this.state.value);
  }

  render() {
    return (
      <IceContainer title="用户列表">
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户名：</span>
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
              <span style={styles.formLabel}>审核状态：</span>
              <IceFormBinder triggerType="onBlur" name="status">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="">全部</Select.Option>
                  <Select.Option value="1">已审核</Select.Option>
                  <Select.Option value="0">审核中</Select.Option>
                  <Select.Option value="2">驳回</Select.Option>
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
              <IceFormBinder triggerType="onBlur" name="applyTime">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="0">全部</Select.Option>
                  <Select.Option value="1">最近三个月</Select.Option>
                  <Select.Option value="2">最近六个月</Select.Option>
                  <Select.Option value="3">最近一年</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="applyTime" />
              </div>
            </div>
          </Col>
          <Col l="24">
            <div style={styles.formItem}>
              <Button type="primary"  onClick={this.condition} style={styles.button}>
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
};
