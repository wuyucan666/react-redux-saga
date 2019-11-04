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
moment.locale('zh-cn');
import {renderTime} from '../../../../../common/js/filter';
import {formDate} from '../../../../../common/js/common';
const {Row, Col} = Grid;
const RadioGroup = Radio.Group;

const { RangePicker } = DatePicker;
const onChange = (value) => console.log(value);
// const onOk = (value) => console.log('onOK:', value.format('YYYY-MM-DD HH:mm:ss'));
// const onRangeOk = (value) => console.log('onOk: [%s, %s]', value[0].format('YYYY-MM-DD HH:mm:ss'), value[1].format('YYYY-MM-DD HH:mm:ss'));

// const defaultTimeValue = moment('09:00:00', 'HH:mm:ss', true);
// const defaultTimeValues = [moment('09:00:00', 'HH:mm:ss', true), moment('23:59:59', 'HH:mm:ss', true)];

const currentDate = moment();
const disabledDate = (date, view) => {
  console.log(currentDate)
  console.log(date)
  switch (view) {
    case 'date':
      return date.valueOf() < (currentDate.date()-1).valueOf();
  }
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
      selectedRadio: '',
      content: '',
      id: '',
      isShowSendTime: false // 是否显示发布时间框
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
    window.location.href = '/#/setting/NewsBulletin'
  };

  handleOnChangeRadio = () => { // 定时发布

  };

  handleOnSaveNews = () => { // 保存
    let {content} = this.props.value
    let {title, isAuto, platform} = this.props.value
    let startTime = formDate(this.props.value.startTime)
    let endTime = formDate(this.props.value.endTime)
    
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
    if (this.props.value.isAuto == 1) {
      let date = {
        startTime,
        endTime,
      }
      saveParmas = {
        ...date,
        content,
        title,
        isAuto,
        id: this.state.id,
        platform: newPlatform
      }
      if (!startTime || !endTime) {
        Message.warning('请选择发布时间');
        return;
      }
      if (this.props.value.status != 1 && startTime < Math.floor(Date.parse(new Date()) / 1000)) {
        Message.warning('开始时间必须大于当前时间');
        return;
      }
      console.log(Math.floor(moment().add(1, 'hour') / 1000))
      if (endTime < startTime || endTime < Math.floor(moment().add(1, 'day') / 1000)) {
        Message.warning('结束时间必须大于开始时间且大于当前时间一天');
        return;
      }
    } else {
      if (this.props.value.status == 1) {
        saveParmas = {
          startTime,
          endTime: 0,
          content,
          title,
          isAuto,
          id: this.state.id,
          platform: newPlatform
        }
      } else {
        saveParmas = {
          content,
          title,
          isAuto,
          id: this.state.id,
          platform: newPlatform
        }
      }
    }
    this.props.handleOnSaveNews(saveParmas)
  };

  handleEditorChange = (content) => {
    this.props.value.content = content
  };

  submitContent = () => {
  };

  handleMyUploadFn = (param) => { // 上传

  };

  handleChangeStartTime = () => { // 选择起始时间

  };

  handleChangeEndTime = () => { // 选择结束时间

  };

  // 渲染发布时间
  renderSendTime = (isAuto) => {
    return this.props.value.isAuto == 1 ?
    (
      <Row wrap gutter="20">
        <Col l="24">
          <div style={styles.formItem, styles.formFlex}>
            <span style={styles.formTitle}><span style={{color: '#f00'}}>&nbsp;</span>发布时间：</span>
            <IceFormBinder triggleType="onBlur" name="startTime">
              <DatePicker showTime onChange={onChange} disabledDate={disabledDate} disabled={this.props.value.status == 1 ? true : false} defaultVisibleMonth={() => moment().add(0, 'months')} placeholder="起始日期" resetTime size="large" style={{marginRight: '20px'}} />
            </IceFormBinder>
            <div style={styles.formError}>
              <IceFormError name="startTime" />
            </div>
            <IceFormBinder triggleType="onBlur" name="endTime">
              <DatePicker showTime onChange={onChange} disabledDate={disabledDate} defaultVisibleMonth={() => moment().add(0, 'months')}  placeholder="结束日期" size="large" resetTime />
            </IceFormBinder>
            <div style={styles.formError}>
              <IceFormError name="endTime" />
            </div>
          </div>
        </Col>
      </Row>
    )
    :
    null
  };

  // 渲染定时发布
  renderTiming = () => {
    return this.props.value.status == 1 ? 
    (
      this.props.value.isAuto == 1 ? 
      (
        <RadioGroup value={this.state.selectedRadio} onChange={this.handleOnChangeRadio} aria-labelledby="groupId">
          <Radio id="apple" value="1">是</Radio>
        </RadioGroup>
      )
      :
      (
        <RadioGroup value={this.state.selectedRadio} onChange={this.handleOnChangeRadio} aria-labelledby="groupId">
          <Radio id="apple" value="0">否</Radio>
        </RadioGroup>
      )
    )
    :
    (
      <RadioGroup value={this.state.selectedRadio} onChange={this.handleOnChangeRadio} aria-labelledby="groupId">
        <Radio id="apple" value="1">是</Radio>
        <Radio id="apple" value="0">否</Radio>
      </RadioGroup>
    )
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
      initialContent: this.props.value.content,
      onChange: this.handleEditorChange,
      onRawChange: this.submitContent,
    };
    console.log(this.props)
    return(
      <div>
        <IceContainer title="编辑新闻公告">
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
            </Row>
            <Row wrap gutter="20">
              <Col l="24">
                <div style={styles.formItem}>
                  <span style={styles.formTitle}><span style={{color: '#f00'}}>*</span>定时发布：</span>
                  <IceFormBinder triggleType="onBlur" name="isAuto">
                    {
                      this.renderTiming()
                    }
                  </IceFormBinder>
                  <div style={styles.formError}>
                    <IceFormError name="isAuto" />
                  </div>
                </div>
              </Col>
            </Row>
            {
              this.renderSendTime()
            }
            <Row wrap gutter="20">
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