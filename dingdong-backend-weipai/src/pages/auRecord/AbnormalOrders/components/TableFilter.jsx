/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select, DatePicker,Search,Button,Icon,Calendar   } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import moment from 'moment';
import IceContainer from '@icedesign/container';
// import { LocaleProvider } from 'antd';
// import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

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
      value: {},
    };
  }

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  render() {
    return (
      <IceContainer title="异常日志">
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户名：</span>
              <IceFormBinder triggerType="onBlur" name="pageName">
                <Input placeholder="请输入用户名" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="pageName" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户uuid：</span>
              <IceFormBinder triggerType="onBlur" name="eventId">
                <Input placeholder="请输入用户uuid" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="eventId" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>操作类型：</span>
              <IceFormBinder triggerType="onBlur" name="eventName">
                <Input placeholder="请输入操作类型" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="eventName" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>时间查询：</span>
              <IceFormBinder triggerType="onBlur" name="type">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="1">全部</Select.Option>
                  <Select.Option value="2">最近一个月</Select.Option>
                  <Select.Option value="2">最近三个月</Select.Option>
                  <Select.Option value="3">最近六个月</Select.Option>
                  <Select.Option value="4">最近一年</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="type" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>设备：</span>
              <IceFormBinder triggerType="onBlur" name="type">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="1">全部</Select.Option>
                  <Select.Option value="2">PC</Select.Option>
                  <Select.Option value="3">IOS</Select.Option>
                  <Select.Option value="4">Android</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="type" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>日期：</span>
              <IceFormBinder triggerType="onBlur" name="date">
              {/* <LocaleProvider locale={zh_CN}> */}
              <RangePicker showTime onChange={onChange} onOk={onRangeOk} />
              {/* </LocaleProvider> */}
                {/* <DatePicker showTime onChange={onChange} onOk={onOk} resetTime /> */}
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="date" />
              </div>
            </div>
          </Col>
          <Col l="24">
            <div style={styles.formItem}>
              <Button type="primary" style={styles.button}>
                查询
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
    minWidth: '70px',
  },
};
