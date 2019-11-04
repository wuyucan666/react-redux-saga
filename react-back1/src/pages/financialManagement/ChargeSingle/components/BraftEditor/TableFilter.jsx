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
        mobile:'',
        realname:'',
        uuid:'',
        account:'',
        applyType:'',
      },
      applyTypeDisable:true
    };
  }

  // componentDidUpdate(){
  //   setTimeout(() => {
  //     if(this.props.info[0]!==undefined){
  //       // console.log(this.props.info[0])
  //       const{uuid,mobile,realname} = this.props.info[0]
  //       this.setState({
  //         value: {
  //           mobile,
  //           uuid,
  //           realname
  //         }
  //       })
  //     }
  //   }, 800);
  // }

  formChange = (value) => {
    // console.log('value', value,this.props.info);
    this.setState({
      value,
    });
  };

  handleEnterKey = (e) => {
    if(e.nativeEvent.keyCode === 13){ //e.nativeEvent获取原生的事件对像
        this.props.handleSearch(this.state.value.mobile)
    }
    setTimeout(() => {
      if(this.props.info!==null){
        this.setState({
          value:{
            ...this.state.value,
            realname:this.props.info[0].realname,
            mobile:this.props.info[0].mobile,
            uuid:this.props.info[0].uuid,
            }
        })
      }
    }, 300);
  }

  onBlur = (e) => {
    this.props.handleSearch(this.state.value.mobile)
    setTimeout(() => {
      if(this.props.info!==null){
        this.setState({
          value:{
          ...this.state.value,
          realname:this.props.info[0].realname,
          mobile:this.props.info[0].mobile,
          uuid:this.props.info[0].uuid,
          }
        })
      }
      console.log(this.props.info);
    }, 300);
  }
  onBlurType = (val) => {
      if(val=='1'){
        this.setState({
          applyTypeDisable:false
        })
      }else{
        this.setState({
          applyTypeDisable:true
        })
      }
  }
  onBlurOption = () => {
    console.log(this.props.card)
    let {type} = this.state.value
    this.props.handleSearchCard(type)
    
    setTimeout(() => {
      if(this.props.card!==null){
      this.setState({
          value:{
            ...this.state.value,
            account:this.props.card
          }
        })
      }
    }, 300);
  }

  condition = ()=> {
    //向父组件中的handleConChange方法里面传递参数
    this.props.handleConChange(this.state.value)
    // console.log(this.props,this.state.value);
  }

  render() {
    let {info} = this.props
    // console.log(info)
    return (
      <IceContainer title="充值补单">
      <div style={styles.buttonfr}>
      {/* <Button type="primary" style={styles.fr} onClick={()=>{window.history.go(-1)}} >
          返回
      </Button> */}
      </div>
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>手机号:</span>
              <IceFormBinder  name="mobile">
                <Input placeholder="" value={info==null?'':info[0].mobile}  size="large" 
                onKeyPress={this.handleEnterKey} onBlur={this.onBlur}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="mobile" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>uuid:</span>
              <IceFormBinder  name="uuid">
                <Input placeholder="" value={info==null?'':info[0].uuid}  size="large"/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="uuid" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>真实姓名:</span>
              <IceFormBinder  name="realname">
                <Input placeholder="" value={info==null?'':info[0].realname}   size="large"/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="realname" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>金额：</span>
              <IceFormBinder triggerType="onBlur" name="amount">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="amount" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>补单类型：</span>
              <IceFormBinder name="applyType">
                <Select size="large" onChange={this.onBlurType} style={{ width: '200px' }}>
                  <Select.Option value="1">退补</Select.Option>
                  <Select.Option value="2">支取</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="applyType" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>支付方式：</span>
              <IceFormBinder name="type">
                <Select size="large" disabled={this.state.applyTypeDisable} onBlur={this.onBlurOption} style={{ width: '200px' }}>
                  <Select.Option value="1">银行</Select.Option>
                  <Select.Option disabled value="2">支付宝（暂未开放）</Select.Option>
                  <Select.Option disabled value="3">微信（暂未开放）</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="type" />
              </div>
            </div>
          </Col>
          {/* <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>收款方银行名称:</span>
              <IceFormBinder triggerType="onBlur" name="accountName">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="accountName" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户汇款账户:</span>
              <IceFormBinder triggerType="onBlur" name="account">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="account" />
              </div>
            </div>
          </Col> */}
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>公司对公账户:</span>
              <IceFormBinder triggerType="onBlur" name="account">
                <Input disabled placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="account" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>充值时间:</span>
              <IceFormBinder triggerType="onBlur" name="transTime">
              {/* <RangePicker showTime onChange={onChange} onOk={onRangeOk} /> */}
                <DatePicker showTime onChange={onChange} onOk={onOk} resetTime />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="transTime" />
              </div>
            </div>
          </Col>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>备注：</span>
              <IceFormBinder triggerType="onBlur" name="remark">
              <Input.TextArea placeholder="备注说明" name="remark" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="remark" />
              </div>
            </div>
          </Col>
          <Col l="24">
            <div style={styles.formItem}>
              <Button type="primary" onClick={this.condition} style={styles.button}>
                提交
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
    minWidth: '100px',
  },
  fr: {
    float: 'right',
  },
  buttonfr:{
    width: '100%',
    height: '40px'
  }
};
