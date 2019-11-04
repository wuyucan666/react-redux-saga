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

// import nw from '../../../../../js/post.js';//公共post请求方法
// import fn from '../../../../../js/util.js';//外部公用文件

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
    this.setState({
      value :{}
    })
    if(window.location.href.split("?").length<=1){
      // console.log(sessionStorage.getItem('info')==null);
      sessionStorage.setItem('info',null)
    }else{
      let info = JSON.parse(sessionStorage.getItem('info'))
      console.log(info)
      if(info !== null){
        this.setState({
          value :{
            mobile:info.mobile,
            name:info.name,
            uuid:info.uuid
          }
        })
      }
    }
    
    // console.log(info);
    if(window.location.href.split('mobile=')[1]!==undefined){
    
    let mobile = window.location.href.split('mobile=')[1].split('&')[0];
    let nickname = decodeURI(window.location.href.split('nickname=')[1].split('&')[0]);
    let uuid = window.location.href.split('&')[2].split('=')[1];
    console.log(mobile,nickname,uuid)
    // console.log(mobile,window.location.href.split('nickname=')[1].split('&'),uuid)
    this.setState({
      value :{
        mobile,
        nickname,
        uuid
      }
    })
    }
  }

  formChange = (value) => {
    // console.log('value', value);
    // this.setState({
    //   value,
    // });
  };
  goBefore =()=>{
    window.history.go(-1);
  }

  condition = ()=> {
    this.props.handleConChange(this.state.value)
    // console.log(this.props,this.state.value);
  }

  render() {
    const disInput = window.location.href.split('tel=')[1]!==undefined?true:false;
    return (
      <IceContainer>
        {/* <Button type="primary" style={styles.fr} onClick={this.goBefore} >
          返回
        </Button> */}

      <IceContainer title="积分列表">
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户账号:</span>
              <IceFormBinder triggerType="onBlur" name="mobile">
                <Input placeholder="请输入账号" disabled={disInput} size="large" />
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
                <Input placeholder="请输入用户名" disabled={disInput} size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="nickname" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户姓名：</span>
              <IceFormBinder triggerType="onBlur" name="realname">
                <Input placeholder="请输入用户姓名" disabled={disInput} size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="realname" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户uuid：</span>
              <IceFormBinder triggerType="onBlur" name="uuid">
                <Input placeholder="请输入用户uuid" disabled={disInput} size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="uuid" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>时间查询：</span>
              <IceFormBinder triggerType="onBlur" name="date">
              <RangePicker showTime onChange={onChange}  />
                {/* <DatePicker showTime onChange={onChange} onOk={onOk} resetTime /> */}
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="date" />
              </div>
            </div>
          </Col>
          <Col l="24">
            <div style={styles.formItem}>
              <Button type="primary" onClick={this.condition}  style={styles.button}>
                查询
              </Button>
            </div>
          </Col>
        </Row>
      
      </IceFormBinderWrapper>
      </IceContainer>
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
  fr:{
    float: 'right'
  }
};
