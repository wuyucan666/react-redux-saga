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
      value :{
        status:9
      }
    })
    if(window.location.href.split("?").length<=1){
      // console.log(sessionStorage.getItem('info')==null);
      sessionStorage.setItem('info',null)
    }else{
      let info = JSON.parse(sessionStorage.getItem('info'))
      if(info !== null){
        this.setState({
          value :{
            mobile:info.mobile,
            name:info.name,
            uuid:info.uuid,
            status:9
          }
        })
      }
    }
    
    // console.log(info);
    if(window.location.href.split('mobile=')[1]!==undefined){
    let mobile = window.location.href.split('mobile=')[1].split('&')[0]
    let nickname = decodeURI(window.location.href.split('nickname=')[1].split('&')[0])
    let uuid = window.location.href.split('&')[2].split('=')[1]
    // console.log(mobile,window.location.href.split('nickname=')[1].split('&'),uuid)
    this.setState({
      value :{
        mobile,
        nickname,
        uuid,
        status:9
      }
    })
    }
  }

  formChange = (value) => {
    // console.log('value', value);
    this.setState({
      value,
    });
  };
  goBefore =()=>{
    window.history.go(-1);
  }

  condition = ()=> {
    console.log(this.state.value)
    this.props.handleConChange(this.state.value)
    // console.log(this.props,this.state.value);
  }

  render() {
    // let nickname = decodeURI(window.location.href.split('nickname=')[1].split('&')[0]);
    const disInput = window.location.href.split('tel=')[1]!==undefined?true:false;
    return (
      <IceContainer>
        {/* <Button type="primary" style={styles.fr} onClick={this.goBefore} >
          返回
        </Button> */}

      {/* <IceContainer title={`${nickname}的优惠券`}> */}
      <IceContainer title="优惠券">
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>状态：</span>
              <IceFormBinder triggerType="onBlur" name="status">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="9">全部</Select.Option>
                  <Select.Option value="1">已使用</Select.Option>
                  <Select.Option value="0">未使用</Select.Option>
                  <Select.Option value="-1">已过期</Select.Option>
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
