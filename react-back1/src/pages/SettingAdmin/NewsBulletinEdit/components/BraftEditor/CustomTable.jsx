import React, {Component} from 'react';
import {Input, Grid, Button, Radio, DatePicker, Checkbox, Message} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError
} from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
import BraftEditor from 'braft-editor';
import {Link} from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {formatImgUrl, uploadImg, getToken, AppId} from '../../../../../common/js/common'
moment.locale('zh-cn');
import {renderTime} from '../../../../../common/js/filter';
const {Row, Col} = Grid;
const RadioGroup = Radio.Group;

const { RangePicker } = DatePicker;
const onChange = (value) => console.log(value);
const onOk = (value) => console.log('onOK:', value.format('YYYY-MM-DD HH:mm:ss'));
const onRangeOk = (value) => console.log('onOk: [%s, %s]', value[0].format('YYYY-MM-DD HH:mm:ss'), value[1].format('YYYY-MM-DD HH:mm:ss'));

const defaultTimeValue = moment('09:00:00', 'HH:mm:ss', true);
const defaultTimeValues = [moment('09:00:00', 'HH:mm:ss', true), moment('23:59:59', 'HH:mm:ss', true)];

// const currentDate = moment();
// const disabledDate = (date, view) => {
//   console.log(currentDate)
//   console.log(date)
//   switch (view) {
//     case 'date':
//       return date.valueOf() < currentDate.valueOf();
//   }
// }

export default class CustomTable extends Component {
  static displayName = 'CustomTable';
  static propTypes = {};
  static defaultProps = {};
  
  constructor(props) {
    super(props);
    this.state = {
      value: {
      },
      selectedRadio: '',
      content: '',
      contentTitle: '添加新闻公告',
      isShowSendTime: false // 是否显示发布时间框
    };
  }

  componentDidMount() {
  };

  handleOnGoback = () => { // 返回
    window.location.href = '/#/setting/NewsBulletin'
  };

  handleOnChangeRadio = () => { // 定时发布

  };

  handleOnSaveNews = () => { // 保存
    let {content} = this.state
    let {title, isAuto, platform, startTime, endTime} = this.state.value
    if (!title) {
      Message.warning('请输入公告标题');
      return;
    } else if (!isAuto) {
      Message.warning('请选择是否定时发布');
      return;
    } else if (!platform) {
      Message.warning('请选择发布平台');
      return;
    } else if (!content) {
      Message.warning('请输入公告内容');
      return;
    }

    let newPlatform = ''
    platform.forEach((el, index) => {
      if (index == 0) {
        newPlatform += el
      } else {
        newPlatform += ',' + el
      }
    })
    let saveParmas = {}
    if (this.state.isShowSendTime) {
      if (!startTime || !endTime) {
        Message.warning('请选择发布时间');
        return;
      }
      if (moment(startTime).valueOf() / 1000 < Math.floor(Date.parse(new Date()) / 1000)) {
        Message.warning('开始时间必须大于当前时间');
        return;
      }
      if (moment(endTime).valueOf() / 1000 < moment(startTime).valueOf() / 1000 || moment(endTime).valueOf() / 1000 < Math.floor(moment().add(1, 'day') / 1000)) {
        Message.warning('结束时间必须大于开始时间且大于当前时间一天');
        return;
      }
      let date = {
        startTime: moment(startTime).valueOf() / 1000,
        endTime: moment(endTime).valueOf() / 1000
      }
      saveParmas = {
        ...date,
        content,
        title,
        isAuto,
        platform: newPlatform
      }
    } else {
      saveParmas = {
        content,
        title,
        isAuto,
        platform: newPlatform
      }
    }

    this.props.handleOnSaveNews(saveParmas)
  };

  handleEditorChange = (content) => {
    this.setState({
      content
    })
  };

  submitContent = () => {
  };

  handleMyUploadFn = (param) => { // 上传
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

  handleChangeStartTime = () => { // 选择起始时间

  };

  handleChangeEndTime = () => { // 选择结束时间

  };

  handleOnFormChange = (value) => {
    if (value.isAuto == 1) {
      this.setState({
        isShowSendTime: true
      })
    } else if (value.isAuto == 0) {
      this.setState({
        isShowSendTime: false
      })
    }
  };

  render() {
    const editorProps = {
      height: 500,
      contentFormat: 'html',
      initialContent: '',
      onChange: this.handleEditorChange,
      onRawChange: this.submitContent,
    };
    return(
      <div>
        <IceContainer title={this.state.contentTitle}>
          <Row wrap>
            <Col l="24" style={{paddingBottom: '20px'}}>
              <Button type="primary" style={styles.backBtn} onClick={this.handleOnGoback}>返回</Button>
            </Col>
          </Row>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.handleOnFormChange}
            ref="form"
          >
            <Row wrap gutter="20">
              <Col l="24">
                <div style={styles.formItem}>
                  <span style={styles.formTitle}><span style={{color: '#f00'}}>*</span>公告标题：</span>
                  <IceFormBinder triggleType="onBlur" name="title">
                    <Input style={{ width: '400px' }} placeholder="请输入..." size="large" />
                  </IceFormBinder>
                  <div style={styles.formError}>
                    <IceFormError name="title" />
                  </div>
                </div>
              </Col>
              <Col l="24">
                <div style={styles.formItem}>
                  <span style={styles.formTitle}><span style={{color: '#f00'}}>*</span>定时发布：</span>
                  <IceFormBinder triggleType="onBlur" name="isAuto">
                    <RadioGroup value={this.state.selectedRadio} onChange={this.handleOnChangeRadio} aria-labelledby="groupId">
                      <Radio id="apple" value="1">是</Radio>
                      <Radio id="watermelon" value="0">否</Radio>
                    </RadioGroup>
                  </IceFormBinder>
                  <div style={styles.formError}>
                    <IceFormError name="isAuto" />
                  </div>
                </div>
                {
                  this.state.isShowSendTime ?
                  (
                    <div style={styles.formItem, styles.formFlex}>
                      <span style={styles.formTitle}><span style={{color: '#f00'}}>&nbsp;</span>发布时间：</span>
                      <IceFormBinder triggleType="onBlur" name="startTime">
                        <DatePicker showTime onChange={onChange} onOk={onOk} placeholder="起始日期" defaultVisibleMonth={() => moment().add(0, 'months')} resetTime size="large" style={{marginRight: '20px'}} />
                      </IceFormBinder>
                      <div style={styles.formError}>
                        <IceFormError name="startTime" />
                      </div>
                      <IceFormBinder triggleType="onBlur" name="endTime">
                        <DatePicker showTime onChange={onChange} onOk={onOk} placeholder="结束日期" defaultVisibleMonth={() => moment().add(0, 'months')} size="large" resetTime />
                      </IceFormBinder>
                      <div style={styles.formError}>
                        <IceFormError name="endTime" />
                      </div>
                    </div>
                  )
                  :
                  null
                }
              </Col>
              <Col l="24">
                <div style={styles.formItem}>
                  <span style={styles.formTitle}><span style={{color: '#f00'}}>*</span>发布平台：</span>
                  <IceFormBinder triggleType="onBlur" name="platform">
                    <Checkbox.Group itemDirection="hoz">
                      <Checkbox value="1" style={{paddingRight: '20px'}}>ios</Checkbox>
                      <Checkbox value="2" style={{paddingRight: '20px'}}>安卓</Checkbox>
                      <Checkbox value="3" style={{paddingRight: '20px'}}>商户后台</Checkbox>
                      <Checkbox value="4" style={{paddingRight: '20px'}}>h5</Checkbox>
                      <Checkbox value="5" style={{paddingRight: '20px'}}>小程序</Checkbox>
                    </Checkbox.Group>
                  </IceFormBinder>
                  <div style={styles.formError}>
                    <IceFormError name="platform" />
                  </div>
                </div>
              </Col>
            </Row>
            <Row wrap gutter="20">
              <div style={styles.formItem}>
                <span style={styles.formTitle, styles.formRow}><span style={{color: '#f00'}}>*</span>公告内容：（富文本编辑器，可上传图片链接）</span>
                <div style={{paddingRight: '80px'}}>
                  <BraftEditor {...editorProps} media={{uploadFn: this.handleMyUploadFn}} />
                </div>
              </div>
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
  }
};