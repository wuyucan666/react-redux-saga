import React, {Component} from 'react';
import {Input, Grid, Button, Radio, DatePicker, Checkbox, Message, Upload} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError
} from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
import BraftEditor from 'braft-editor';
import './news.css';
import {Link} from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import {formatImgUrl} from '../../../../../common/js/common'
import {renderTime} from '../../../../../common/js/filter';
const {Row, Col} = Grid;
const RadioGroup = Radio.Group;

const { RangePicker } = DatePicker;
const onChange = (value) => console.log(value);
const onOk = (value) => console.log('onOK:', value.format('YYYY-MM-DD HH:mm:ss'));
const onRangeOk = (value) => console.log('onOk: [%s, %s]', value[0].format('YYYY-MM-DD HH:mm:ss'), value[1].format('YYYY-MM-DD HH:mm:ss'));

const defaultTimeValue = moment('09:00:00', 'HH:mm:ss', true);
const defaultTimeValues = [moment('09:00:00', 'HH:mm:ss', true), moment('23:59:59', 'HH:mm:ss', true)];

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
  };

  handleOnGoback = () => { // 返回
    window.location.href = '/#/setting/NoviceGuide'
  };

  imgOnchangebig = () => { // 指引标签图
  }

  renderContent = (content) => {
    return (
      <div style={styles.newContent} dangerouslySetInnerHTML={{ __html:content}}></div>
    )
  }

  platformRender = () => { // 发布平台
    let types = [{id: 1, type: '安卓'}, {id: 2, type: 'IOS'}, {id: 3, type: '小程序'}, {id: 4, type: '商户后台'}, {id: 5, type: 'H5'}];
    const {platform} = this.props.value
    if (platform && platform.length > 0) {
      let newArr = []
      types.forEach(el => {
        platform.forEach(list => {
          if (list == el.id) {
            newArr.push(el)
          }
        })
      })
      return(
        newArr.map(el => <span style={{paddingRight: '20px'}} key={el.id}>{el.type}</span>)
      )
    } else {
      return null
    }
  };

  render() {
    let bigVal = []
    if (this.props.value.imgs != '') this.state.labelImg = this.props.value.imgs
    if (this.state.labelImg != '') {
      bigVal = [
        {
          name: '指引标签图',
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
      readOnly: true
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
            value={this.props.value}
            onChange={this.handleOnFormChange}
            ref="form"
          >
            <Row wrap gutter="20">
              <div style={styles.formItem}>
                <span style={styles.formTitle}>指引名称：</span>
                <IceFormBinder triggleType="onBlur" name="title">
                  <Input style={{ width: '400px' }} placeholder="请输入..." size="large" readOnly />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="title" />
                </div>
              </div>
            </Row>
            <Row wrap gutter="20">
              <div style={styles.formItem, styles.myFlex}>
                <span style={styles.formTitle}>指引标签图：</span>
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
                  disabled
                />
              </div>
            </Row>
            <Row wrap gutter="20">
              <div>
                <span style={styles.formTitle, styles.formRow}>指引内容：</span>
                <div style={{paddingRight: '80px', paddingBottom: '30px', paddingLeft: '20px'}}>
                  {/* <BraftEditor {...editorProps} media={{uploadFn: this.handleMyUploadFn}} /> */}
                  {
                    this.renderContent(this.props.value.content)
                  }
                </div>
              </div>
            </Row>
            <Row wrap gutter="20">
              <div style={styles.formItem}>
                <span style={styles.formTitle}>发布平台：</span>
                <div>{this.platformRender(this.props.value.platform)}</div>
              </div>
            </Row>
            {
              this.props.value.status == 2 ?
              <>
                <Row wrap gutter="20">
                  <div style={styles.formItem}>
                    <span style={styles.formTitle}>下架原因：</span>
                    <div>{this.props.value.offReason}</div>
                  </div>
                </Row>
                <Row wrap gutter="20">
                  <div style={styles.formItem}>
                    <span style={styles.formTitle}>下架时间：</span>
                    <div>{renderTime(this.props.value.offTime)}</div>
                  </div>
                </Row>
              </>
              :
              null
            }
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
    display: 'flex',
    padding: '0 0 30px 0',
    alignItems: 'center'
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
  newContent: {
    flex: 1,
    wordBreak: 'normal',
    whiteSpace: 'pre-wrap'
  },
  myFlex: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '30px'
  },
};