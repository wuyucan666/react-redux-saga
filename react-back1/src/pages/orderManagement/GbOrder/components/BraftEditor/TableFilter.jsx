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

const defaultTimeValue = moment('09:00:00', 'HH:mm:ss', true);
export default class Filter extends Component {
  static displayName = 'Filter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        shopName:'',
        name:'',
        auditStatus:'',
        type:'',
        date:''
      },
    };
  }

  componentDidMount(){
    if ( window.location.hash.split('status=')[1]){
      this.setState({
        value :{
          auditStatus:window.location.hash.split('status=')[1],
        }
      });
    }
  }

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };


  condition = ()=> {
    //向父组件中的handleConChange方法里面传递参数
    // if( this.state.value.applyTime ||  this.state.value.nickname || this.state.value.realname || this.state.value.status || this.state.value.mobile ){
    // console.log(this.state.value)  
    // this.setState({
    //     value:this.state.value
    //   });  
    this.props.handleConChange(this.state.value);
      // console.log(this.state.value);
    // }else{
    //   Message.error('请输入条件查询 ') 
    // }
    // console.log(this.props,this.state.value);
  }

  render() {
    return (
      <IceContainer title="团购列表">
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>商家昵称:</span>
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
              <span style={styles.formLabel}>专场名称:</span>
              <IceFormBinder triggerType="onBlur" name="name">
                <Input placeholder="请输入" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="name" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>审核状态：</span>
              <IceFormBinder triggerType="onBlur" name="auditStatus">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="0">全部</Select.Option>
                  <Select.Option value="1">待审核</Select.Option>
                  <Select.Option value="2">已通过</Select.Option>
                  <Select.Option value="3">已驳回</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="auditStatus" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>专场类型：</span>
              <IceFormBinder triggerType="onBlur" name="type">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="0">全部</Select.Option>
                  <Select.Option value="1">钱币专场</Select.Option>
                  <Select.Option value="2">邮票专场</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="type" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>时间查询：</span>
              <IceFormBinder triggerType="onBlur" name="date">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="0">全部</Select.Option>
                  <Select.Option value="92">最近三个月</Select.Option>
                  <Select.Option value="183">最近六个月</Select.Option>
                  <Select.Option value="365">最近一年</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="date" />
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
