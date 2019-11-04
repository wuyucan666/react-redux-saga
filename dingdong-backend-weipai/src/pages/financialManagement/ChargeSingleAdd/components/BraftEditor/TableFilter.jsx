/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select, DatePicker,Button  } from '@alifd/next';
import { Message } from '@alifd/next';
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

  hashToAdd = () => {
    let {mobile,nickname} = this.state.value
    if(mobile !==undefined || nickname !==undefined){
      if(mobile==''&& nickname==''){
        Message.error('请填写用户昵称或者手机号')
      }else{
        // console.log(mobile==undefined,nickname==undefined)
        if(mobile!==undefined && mobile.length!==0){
          if(mobile.length==11){
            window.location.hash=`/financialManagement/ChargeSingleAdd?keyword=${mobile}`
          }else{
            Message.error('手机号为11位数')
          };
        }else{
          if(nickname==''){
            Message.error('昵称或手机号不能为空')
          }else{
            window.location.hash=`/financialManagement/ChargeSingleAdd?keyword=${nickname}`
          }
        }
      }
    }else{
      Message.error('请填写用户昵称或者手机号')
    }
    // window.location.hash='/financialManagement/ChargeSingleAdd'
  }

  render() {
    return (
      <IceContainer title="充值补单列表">
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="8">
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
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>手机号：</span>
              <IceFormBinder triggerType="onBlur" name="mobile">
                <Input placeholder="请输入手机号" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="mobile" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>支付方式：</span>
              <IceFormBinder triggerType="onBlur" name="type">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="">全部</Select.Option>
                  <Select.Option value="1">银行</Select.Option>
                  <Select.Option value="2">支付宝</Select.Option>
                  <Select.Option value="3">微信</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="type" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>审核状态：</span>
              <IceFormBinder triggerType="onBlur" name="status">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="">全部</Select.Option>
                  <Select.Option value="1">待审核</Select.Option>
                  <Select.Option value="2">审核通过</Select.Option>
                  <Select.Option value="3">审核拒绝</Select.Option>
                  <Select.Option value="4">已到账</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="status" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>补单时间：</span>
              <IceFormBinder triggerType="onBlur" name="date">
              <RangePicker showTime  style={styles.formDate} />
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
              {/* <Button style={styles.ml20} type="primary" onClick={this.hashToAdd}>
                添加充值补单
              </Button> */}
                {/* <Link target="_blank" to={`/financialManagement/ChargeSingleAdd`} >
                充值补单
                </Link> */}
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
  ml20:{
    marginLeft:'20px'
  },
  formDate:{
    minWidth: '350px',
  }
};
