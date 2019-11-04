import React, {Component} from 'react';
import {Input, Grid, Button, Radio, DatePicker, Checkbox, Message} from '@alifd/next';
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
import {renderTime} from '../../../../../common/js/filter';
const {Row, Col} = Grid;
const RadioGroup = Radio.Group;

const { RangePicker } = DatePicker;
const onChange = (value) => console.log(value);
const onOk = (value) => console.log('onOK:', value.format('YYYY-MM-DD HH:mm:ss'));
const onRangeOk = (value) => console.log('onOk: [%s, %s]', value[0].format('YYYY-MM-DD HH:mm:ss'), value[1].format('YYYY-MM-DD HH:mm:ss'));

const defaultTimeValue = moment('09:00:00', 'HH:mm:ss', true);
const defaultTimeValues = [moment('09:00:00', 'HH:mm:ss', true), moment('23:59:59', 'HH:mm:ss', true)];

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
      id: ''
    };
  }

  componentDidMount() {
  };

  handleOnGoback = () => { // 返回
    window.location.href = '/#/setting/NewsBulletin'
  };

  platformRender = () => { // 发布平台
    let types = [{id: 1, type: 'IOS'}, {id: 2, type: '安卓'}, {id: 3, type: '商户后台'}, {id: 4, type: 'H5'}, {id: 5, type: '小程序'}];
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

  renderContent = (content) => {
    return (
      <div style={styles.newContent} dangerouslySetInnerHTML={{ __html:content}}></div>
    )
  }

  render() {
    const {value} = this.props

    return(
      <div>
        <IceContainer title="公告详情">
          <Row wrap>
            <Col l="24" style={{paddingBottom: '20px'}}>
              <Button type="primary" style={styles.backBtn} onClick={this.handleOnGoback}>返回</Button>
            </Col>
          </Row>
          <Row wrap gutter="20">
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formTitle}>状态：</span>
                <div style={{color: 'rgb(253, 163, 27)', fontWeight: '600'}}>
                  {
                    value ? value.status == 0 ? '待发布' : value.status == 1 ? '已发布' : value.status == 2 ? '已下架' : '已删除' : ''
                  }
                </div>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formTitle}>公告标题：</span>
                <div>{value && value.title != '' ? value.title : ''}</div>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formTitle}>定时发布：</span>
                <div>{value && value.isAuto == 0 ? '否' : '是'}</div>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formTitle}>发布平台：</span>
                <div>
                  {
                    this.platformRender()
                  }
                </div>
              </div>
            </Col>
          </Row>
          <Row wrap gutter="20">
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formTitle}>公告内容：</span>
                {
                  this.renderContent(value.content)
                }
              </div>
            </Col>
          </Row>
          {
            value.status == 2 ? (
              <Row wrap gutter="20">
                <Col l="24">
                  <div style={styles.formItem}>
                    <span style={styles.formTitle}>下架原因：</span>
                    <div>{value.reason}</div>
                  </div>
                </Col>
              </Row>
            ) : ''
          }
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
  }
};