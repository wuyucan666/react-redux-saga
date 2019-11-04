/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select, DatePicker,Search,Button,Icon ,Upload,Radio } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import BraftEditor from 'braft-editor';
import moment from 'moment';
import IceContainer from '@icedesign/container';
const { Group: RadioGroup } = Radio;
const { Row, Col } = Grid;
const { RangePicker } = DatePicker;
const currentDate = moment();
import { Message } from '@alifd/next';
const onChange = (value) => console.log(value);
// const onOk = (value) => console.log('onOK:', value.format('YYYY-MM-DD HH:mm:ss'));
import {formatImgUrl,uploadImg,getToken} from '../../../../../common/js/common'
import {renderTime,delHtmlTag} from "../../../../../common/js/filter"
import nw from '../../../../../common/http/post'

function beforeUpload(info) {
  console.log('beforeUpload callback : ', info);
}

function onSuccess(res, file) {
  console.log('onSuccess callback : ', res, file);
}

function onError(file) {
  console.log('onError callback : ', file);
}

const disabledDate = function (date, view) {
  switch (view) {
      case 'date':
          return date.valueOf() <= (currentDate.date()-1).valueOf();
      case 'year':
          return date.year() < currentDate.year();
      case 'month':
          return date.year() * 100 + date.month() < currentDate.year() * 100 + currentDate.month();
      default: return false;
  }
};
const defaultTimeValue = moment('09:00:00', 'HH:mm:ss', true);
export default class Filter extends Component {
  static displayName = 'Filter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
         msgType:'',//消息类型:1公告消息;2活动消息;3新闻;4任务消息;5系统消息
         channel: '', //发送渠道:0全部;1PC;2IOS;3Android;4微信推送
         title: '', //标题
         sendType: '', //发送类型:0立即发送;1定时发送
         sendTime: '',//发送时间
         targetType: '', //推送对象类型:0全站;1认证会员;2非认证会员;3群组;4指定用户
         target: '', //推送对象
        // thumb: '', //图片
        // url: '', //活动链接
        // content: '',//内容
      },
      content:'',
      bigImg:'',
      smallImg:'',
      display_name: 'none',
      display_Name:'none'
    };
  }

  myUploadFn = (param) => {
    const serverURL = uploadImg();
    const xhr = new XMLHttpRequest
    const fd = new FormData()
  
    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      param.success({
        url: formatImgUrl(JSON.parse(xhr.responseText).data.url),
      })
    }
    const progressFn = (event) => {
      // 上传进度发生变化时调用param.progress
      param.progress(event.loaded / event.total * 100)
    }
  
    const errorFn = (response) => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.'
      })
    }
  
    xhr.upload.addEventListener("progress", progressFn, false)
    xhr.addEventListener("load", successFn, false)
    xhr.addEventListener("error", errorFn, false)
    xhr.addEventListener("abort", errorFn, false)
  
    fd.append('file', param.file)
    xhr.open('POST', serverURL, true)
    xhr.setRequestHeader("Token", getToken());
    xhr.send(fd)
  
  }

 //大图：
bigbeforeUpload = (info)=> {
  let thiz = this;
  let data = {imageType:"avatar",file:info}
  nw.post(uploadImg(),data,function (res) {
    if(res.errorCode == 0){
      thiz.setState({
        bigImg:res.data.url,
      });
    }
  })

}

//小图：
smallbeforeUpload = (info)=> {
  let thiz = this;
  let data = {imageType:"avatar",file:info}
  nw.post(uploadImg(),data,function (res) {
    if(res.errorCode == 0){
      thiz.setState({
        smallImg:res.data.url,
      });
    }
  })
}

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };
 
  handleRawChange = (content) => {
    // this.setState({
    //   content,
    // });
  };

  handleChange = (rawContent) => {
    this.setState({
      content:rawContent,
    });
  };

  condition = ()=> {
    this.state.value.content = this.state.content
    this.state.value.bigImg = this.state.bigImg
    this.state.value.smallImg = this.state.smallImg
    console.log(this.state.value.sendTime)
    if((new Date(this.state.value.sendTime)).valueOf()<(new Date()).valueOf()){
      Message.error('定时发送时间不能小于当前时间,请重新选择定时发送时间');
      this.state.value.sendTime= ''
      this.setState({
        display_Name: 'block',
      })
      return false
    }
    if(  this.state.value.msgType && this.state.value.channel && this.state.value.title && this.state.value.sendType && this.state.value.targetType && delHtmlTag(this.state.value.content)){
      this.props.handleConChange(this.state.value)
    }else{
      Message.error('请填写完整的信息后再提交 ') 
    } 

    // console.log(this.props,this.state.value);
  }

  onChange(value) {
    if( value == 4 ){
      this.setState({
        display_name: 'block',
      })
    }else{
      this.setState({
        display_name: 'none',
      })
    }
  }

  imgOnchangebig(value){  
    if(value == ''){
      this.setState({
        bigImg:'' ,
      });
    }

  }

  imgOnchangesmall(value){
    // console.log(value);
    if(value == ''){
      this.setState({
        smallImg:'' ,
      });
    }
  }
  onSelect(type, value) {
    // console.log(value)
    //不是定时发送==0
    if(value == 0){
      this.setState({
        display_Name: 'none',
      })
    }else{
      this.setState({
        display_Name: 'block',
      })

    }
  }
  goBefore =()=>{
    window.history.go(-1);
  }
  onOk =(val)=>{
    if((new Date(val)).valueOf()<(new Date()).valueOf()){
      Message.error('定时发送时间不能小于当前时间,请重新选择定时发送时间');
      this.state.value.sendTime= ''
      this.setState({
        display_Name: 'block',
      })
    }
  }
  render() {
    let smallVal = [];
    let bigVal = [];
    if( this.state.smallImg != ''){
      smallVal = [
        {
          name: '小图',
          state: 'done',
          imgURL:formatImgUrl(this.state.smallImg)
        }
      ];
    }
    if(this.state.bigImg != ''){
      bigVal = [
        {
          name: '大图',
          state: 'done',
          imgURL:formatImgUrl(this.state.bigImg)
        }
      ];
    }
    const editorProps = {
      height: 500,
      contentFormat: 'html',
      initialContent: '',
      onChange: this.handleChange,
      onRawChange: this.handleRawChange,
    };
    return (
      <IceContainer >
        {/* <Button type="primary" style={styles.fr} onClick={this.goBefore} >
          返回
        </Button> */}
      <IceContainer title="站内消息">
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col >
            <div style={styles.formItem}>
              <span style={styles.formLabel}>消息类型：</span>
              <IceFormBinder triggerType="onBlur" name="msgType">
                <Select size="large" style={{ width: '200px' }} >
                  <Select.Option value="1">公告消息</Select.Option>
                  <Select.Option value="2">活动消息</Select.Option>
                  <Select.Option value="3">新闻</Select.Option>
                  <Select.Option value="4">任务消息</Select.Option>
                  <Select.Option value="5">系统消息</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="msgType" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col>
            <div style={styles.formItem}>
              <span style={styles.formLabel}>消息标题：</span>
              <IceFormBinder triggerType="onBlur" name="title">
                <Input placeholder="" size="large" maxLength={20}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="title" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>

          <Col >
            <div style={styles.formItem}>
              <span style={styles.formLabel}>发布位置：</span>
              <IceFormBinder triggerType="onBlur" name="channel">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="0">全部</Select.Option>
                  {/* <Select.Option value="1">PC</Select.Option> */}
                  <Select.Option value="2">ios</Select.Option>
                  <Select.Option value="3">Android</Select.Option>
                  <Select.Option value="4">微信推送</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="channel" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col >
            <div style={styles.formItem}>
              <span style={styles.formLabel}>定时发送：</span>
              <IceFormBinder triggerType="onBlur" name="sendType">
                <Select size="large" style={{ width: '200px' }} onChange={this.onSelect.bind(this, "hasArrow")}>
                  <Select.Option value="1">是</Select.Option>
                  <Select.Option value="0">否</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="sendType" />
              </div> 
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col >
          <div style={{ display: this.state.display_Name }}>
            <div style={styles.formItem}>
              <span style={styles.formLabel}>发送时间：</span>
              <IceFormBinder triggerType="onBlur" name="sendTime">
              <DatePicker  showTime onChange={onChange} disabledDate={disabledDate} onOk={this.onOk}/>
                {/* <DatePicker showTime onChange={onChange} onOk={onOk} resetTime /> */}
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="sendTime" />
              </div>
            </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col >
            <div style={styles.formItem}>
              <span style={styles.formLabel}>推送对象：</span>
              <IceFormBinder triggerType="onBlur" name="targetType" >
                  <RadioGroup name="gender" onChange={this.onChange.bind(this)}>
                  <Radio value="0">全部用户</Radio>
                  <Radio value="1">认证会员</Radio>
                  <Radio value="2">非认证会员</Radio>
                  <Radio value="3">群组</Radio>
                  <Radio value="4">指定用户</Radio>
                  <Radio value="5">商户类型</Radio>
                </RadioGroup>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="targetType" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col >
            <div style={{ display: this.state.display_name }}>
            <div style={styles.formItem} >
              <span style={styles.formLabel}>推送对象：</span>
              <IceFormBinder triggerType="onBlur" name="target" >
                <Input.TextArea
                placeholder="TextArea"
                rows={4}
                hasLimitHint  />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="target" />
              </div>
            </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col>
            <div style={styles.formItem}>
              <span style={styles.formLabel}>封面图片(大图)：</span>
              <Upload.Card
                  listType="card"
                  action=""
                  accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                  beforeUpload={this.bigbeforeUpload}
                  onChange={this.imgOnchangebig.bind(this)}
                  onSuccess={onSuccess}
                  onError={onError}
                  value={bigVal}
                  limit={1}
                />
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          {/* <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>封面图片(小图)：</span>
              <Upload.Card
                  listType="card"
                  action=""
                  accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                  beforeUpload={this.smallbeforeUpload}
                  onChange={this.imgOnchangesmall.bind(this)}
                  onSuccess={onSuccess} 
                  onError={onError}
                  value={smallVal}
                  limit={1}
                />
            </div>
          </Col> */}
          <Col >
            <div style={styles.formItem}>
              <span style={styles.formLabel}>活动链接：</span>
              <IceFormBinder triggerType="onBlur" name="url">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="url" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <BraftEditor {...editorProps} media={{uploadFn: this.myUploadFn}}/>
          <Col >
            <div style={styles.formItem}>
              <Button type="primary" onClick={this.condition} style={styles.button}>
                确认添加
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
    minWidth: '180px',
  },
  fr:{
    float: 'right'
  }
};