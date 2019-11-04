/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select, DatePicker, Search, Button, Icon, Message } from '@alifd/next';
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

  componentDidMount() {
    this.setState({
      value: {},
    });
    if (window.location.href.split('?').length <= 1) {
      // console.log(sessionStorage.getItem('info')==null);
      sessionStorage.setItem('info', null);
    } else {
      const info = JSON.parse(sessionStorage.getItem('info'));
      if (info !== null) {
        this.setState({
          value: {
            mobile: info.mobile,
            name: info.name,
            uuid: info.uuid,
          },
        });
      }
    }

    // console.log(info);
    if (window.location.href.split('mobile=')[1] !== undefined) {
      const mobile = window.location.href.split('mobile=')[1].split('&')[0];
      let nickname = '';
      if (decodeURI(window.location.href.split('nickname=')[1].split('&')[0])) {
        nickname = decodeURI(window.location.href.split('nickname=')[1].split('&')[0]);
      }
      let uuid = '';
      if (window.location.href.split('&')[2].split('=')[1]) {
        uuid = decodeURI(window.location.href.split('uuid=')[1].split('&')[0]);
      }
      // console.log(mobile,window.location.href.split('nickname=')[1].split('&'),uuid)
      this.setState({
        value: {
          mobile,
          nickname,
          uuid,
        },
      });
    }
  }

  formChange = (value) => {
    // console.log('value', value);
    // this.setState({
    //   value,
    // });
  };
  goBefore =() => {
    window.history.go(-1);
  }

  condition = () => {
    const { value } = this.state;
    if ((value.date && value.date.length !== 0) && (value.dateStamp && value.dateStamp !== null)) {
      delete value.date;
      delete value.dateStamp;
      this.setState({
        value,
      });
    }
    this.props.handleConChange(value);
    // console.log(this.props,this.state.value);
  }

  exportData = () => {
    console.log(this.props, this.state.value);
    this.props.exportData(this.state.value);
  }

  render() {
    const disInput = window.location.href.split('tel=')[1] !== undefined;
    return (
      <IceContainer>
        {/* <Button type="primary" style={styles.fr} onClick={this.goBefore} >
          返回
        </Button> */}

        <IceContainer title="资金明细">
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <Row wrap gutter="20" style={styles.formRow}>
              <Col l="12">
                <div style={styles.formItem}>
                  <span style={styles.formLabel}>手机号码:</span>
                  <IceFormBinder triggerType="onBlur" name="mobile">
                    <Input placeholder="请输入手机号码" disabled={disInput} size="large" />
                  </IceFormBinder>
                  <div style={styles.formError}>
                    <IceFormError name="mobile" />
                  </div>
                </div>
              </Col>
              <Col l="12">
                <div style={styles.formItem}>
                  <span style={styles.formLabel}>用户昵称: </span>
                  <IceFormBinder triggerType="onBlur" name="nickname">
                    <Input placeholder="请输入用户昵称" disabled={disInput} size="large" />
                  </IceFormBinder>
                  <div style={styles.formError}>
                    <IceFormError name="nickname" />
                  </div>
                </div>
              </Col>
              <Col l="12">
                <div style={styles.formItem}>
                  <span style={styles.formLabel}>真实姓名：</span>
                  <IceFormBinder triggerType="onBlur" name="realname">
                    <Input placeholder="请输入真实姓名" disabled={disInput} size="large" />
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
                  <span style={styles.formLabel}>类型:</span>
                  <IceFormBinder triggerType="onBlur" name="type">
                    <Select size="large" style={{ width: '200px' }}>
                      <Select.Option value="">全部</Select.Option>
                      <Select.Option value="1">余额</Select.Option>
                      <Select.Option value="2">保证金</Select.Option>
                    </Select>
                  </IceFormBinder>
                  <div style={styles.formError}>
                    <IceFormError name="type" />
                  </div>
                </div>
              </Col>
              <Col l="12">
                <div style={styles.formItem}>
                  <span style={styles.formLabel}>交易方式：</span>
                  <IceFormBinder triggerType="onBlur" name="trade">
                    <Select size="large" style={{ width: '200px' }}>
                      <Select.Option value="">全部</Select.Option>
                      <Select.Option value="1">充值</Select.Option>
                      <Select.Option value="2">提现</Select.Option>
                      <Select.Option value="3">微拍订单</Select.Option>
                      <Select.Option value="4">团购订单</Select.Option>
                      <Select.Option value="5">转账送拍人</Select.Option>
                      <Select.Option value="6">后台补单</Select.Option>
                      <Select.Option value="7">退款订单</Select.Option>
                      <Select.Option value="8">违约罚款</Select.Option>
                      <Select.Option value="9">红包支出</Select.Option>
                      <Select.Option value="10">领取红包</Select.Option>
                    </Select>
                  </IceFormBinder>
                  <div style={styles.formError}>
                    <IceFormError name="trade" />
                  </div>
                </div>
              </Col>
              <Col l="12">
                <div style={styles.formItem}>
                  <span style={styles.formLabel}>时间查询：</span>
                  <IceFormBinder triggerType="onBlur" name="date">
                    <RangePicker showTime onChange={onChange} />
                    {/* <DatePicker showTime onChange={onChange} onOk={onOk} resetTime /> */}
                  </IceFormBinder>
                  <div style={styles.formError}>
                    <IceFormError name="date" />
                  </div>
                </div>
              </Col>
              <Col l="24">
                <div style={styles.formItem}>
                  <span style={styles.formLabel}>日期：</span>
                  <IceFormBinder triggerType="onBlur" name="dateStamp">
                    <DatePicker format="YYYY-M-D" />
                  </IceFormBinder>
                  <div style={styles.formError}>
                    <IceFormError name="dateStamp" />
                  </div>
                </div>
              </Col>
              <Col l="24">
                <div style={styles.formItem}>
                  <Button type="primary" onClick={this.condition} style={styles.button}>
                查询
                  </Button>
                  <Button type="primary" onClick={this.exportData} style={styles.ml10}>
                导出数据
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
  formItemD: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0px 0px 15px',
  },
  formLabel: {
    minWidth: '70px',
  },
  fr: {
    float: 'right',
  },
  ml10: {
    marginLeft: '10px',
  },
};
