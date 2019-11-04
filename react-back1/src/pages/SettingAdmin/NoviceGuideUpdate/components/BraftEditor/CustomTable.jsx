import React, {Component} from 'react';
import {Input, Grid, Button, Radio, DatePicker, Checkbox, Message, Upload} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError
} from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
import BraftEditor from 'braft-editor';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import {formatImgUrl, uploadImg, getToken, AppId} from '../../../../../common/js/common';
import nw from '../../../../../common/http/post'
const {Row, Col} = Grid;
const RadioGroup = Radio.Group;

const { RangePicker } = DatePicker;
const onChange = (value) => console.log(value);

const currentDate = moment();
const disabledDate = (date, view) => {
  switch (view) {
    case 'date':
      return date.valueOf() < (currentDate.date()-1).valueOf();
  }
}

function beforeUpload(info) {
  console.log('beforeUpload callback : ', info);
}

function onSuccess(res, file) {
  console.log('onSuccess callback : ', res, file);
}

function onError(file) {
  console.log('onError callback : ', file);
}
export default class CustomTable extends Component {
  static displayName = 'CustomTable';
  static propTypes = {};
  static defaultProps = {};
  
  constructor(props) {
    super(props);
    this.state = {
      value: {
      },
      content: '',
      id: '',
      labelImg: ''
    };
  }

  componentDidMount() {
    if (window.location.href.split('?').length > 1) {
      this.setState({
        id: window.location.href.split('?')[1].split('=')[1]
      })
    };
  };

  handleOnGoback = () => { // 返回
    window.location.href = '/#/setting/NoviceGuide'
  };

  handleOnChangeRadio = () => { // 定时发布

  };

  handleOnSaveNews = () => { // 保存
    let {value} = this.props
    if (!value.title) {
      Message.warning('请输入指引名称')
      return false
    }
    if (!this.state.labelImg) {
      Message.warning('请上传指引标签图')
      return false
    }
    if (!value.content) {
      Message.warning('请编辑指引内容')
      return false
    }
    if (value.platform.length == 0) {
      Message.warning('请选择发布平台')
      return false
    }
    let platform = ''
    value.platform.forEach((el, index) => {
      if (index == 0) {
        platform += el
      } else {
        platform += ',' + el
      }
    })
    this.props.handleOnSaveNews({
      title: value.title,
      content: value.content,
      imgs: this.state.labelImg,
      platform
    })
  };

  handleEditorChange = (content) => {
    this.props.value.content = content
  };

  submitContent = () => {
  };

  handleMyUploadFn = (param) => { // 副文本上传
    const serverURL = uploadImg();
    const xhr = new XMLHttpRequest
    const fd = new FormData()
  
    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      param.success({
        url: formatImgUrl(JSON.parse(xhr.responseText).data.url)
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
    xhr.setRequestHeader("App-Id", AppId());
    xhr.send(fd)
  };

  handleOnFormChange = (value) => {
  };

  bigbeforeUpload = (info) => {
    let _this = this;
    let data = {imageType:"avatar",file:info}
    nw.post(uploadImg(),data,function (res) {
      if(res.errorCode == 0){
        _this.setState({
          labelImg: res.data.url,
        });
      }
    })
  }

  imgOnchangebig = (value) => { // 指引标签图
    if(value == '') {
      this.setState({
        labelImg: '' ,
      });
      this.props.value.imgs = ''
    }
  }

  render() {
    if (this.props.value.imgs != '') this.state.labelImg = this.props.value.imgs
    let bigVal = [];
    if (this.state.labelImg != '') {
      bigVal = [
        {
          name: '',
          state: 'done',
          imgURL: formatImgUrl(this.state.labelImg)
        }
      ];
    }

    const editorProps = {
      height: 500,
      contentFormat: 'html',
      initialContent: this.props.value.content,
      onChange: this.handleEditorChange,
      onRawChange: this.submitContent,
    };
    console.log(this.props)
    return(
      <div>
        <IceContainer title="编辑新手指引">
          <Row wrap>
            <Col l="24" style={{paddingBottom: '20px'}}>
              <Button type="primary" style={styles.backBtn} onClick={this.handleOnGoback}>返回</Button>
            </Col>
          </Row>
          <IceFormBinderWrapper
            value={this.props.value}
            onChange={this.handleOnFormChange}
            ref="form"
          >
            <Row wrap gutter="20">
              <div style={styles.formItem}>
                <span style={styles.formTitle}><span style={{color: '#f00'}}>*</span>指引名称：</span>
                <IceFormBinder triggleType="onBlur" name="title">
                  <Input style={{ width: '400px' }} placeholder="请输入..." size="large" />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="title" />
                </div>
              </div>
            </Row>
            <Row wrap gutter="20">
              <div style={styles.formItem, styles.myFlex}>
                <span style={styles.formTitle}><span style={{color: '#f00'}}>*</span>指引标签图：</span>
                <Upload.Card
                  listType="card"
                  action=""
                  accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                  beforeUpload={this.bigbeforeUpload}
                  onChange={this.imgOnchangebig}
                  onSuccess={onSuccess}
                  onError={onError}
                  value={bigVal}
                  limit={1}
                />
              </div>
            </Row>
            <Row wrap gutter="20">
              <div style={styles.formItem}>
                <span style={styles.formTitle, styles.formRow}><span style={{color: '#f00'}}>*</span>指引内容：（富文本编辑器，可上传图片链接）</span>
                <div style={{paddingRight: '80px'}}>
                  <BraftEditor {...editorProps} media={{uploadFn: this.handleMyUploadFn}} />
                </div>
              </div>
            </Row>
            <Row wrap gutter="20">
              <Col l="24">
                <div style={styles.formItem}>
                  <span style={styles.formTitle}><span style={{color: '#f00'}}>*</span>发布平台：</span>
                  <IceFormBinder triggleType="onBlur" name="platform">
                    <Checkbox.Group itemDirection="hoz">
                      <Checkbox value="1" style={{paddingRight: '20px'}}>安卓</Checkbox>
                      <Checkbox value="2" style={{paddingRight: '20px'}}>ios</Checkbox>
                      <Checkbox value="3" style={{paddingRight: '20px'}}>小程序</Checkbox>
                      <Checkbox value="4" style={{paddingRight: '20px'}}>商户后台</Checkbox>
                      <Checkbox value="5" style={{paddingRight: '20px'}}>h5</Checkbox>
                    </Checkbox.Group>
                  </IceFormBinder>
                  <div style={styles.formError}>
                    <IceFormError name="platform" />
                  </div>
                </div>
              </Col>
            </Row>
            <Row wrap gutter="20">
              <Col l="24">
                <Button type="primary" style={{width: '100px'}} onClick={this.handleOnSaveNews}>保存</Button>
              </Col>
            </Row>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    );
  };
}

const styles = {
  backBtn: {
    float: 'right',
  },
  formItem: {
    padding: '0 0 30px 0',
  },
  formTitle: {
    width: '100px',
    display: 'inline-block',
  },
  formRow: {
    display: 'block',
    padding: '0px 0px 40px 0px'
  },
  formError: {},
  formFlex: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '30px'
  },
  myFlex: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '30px'
  },
};