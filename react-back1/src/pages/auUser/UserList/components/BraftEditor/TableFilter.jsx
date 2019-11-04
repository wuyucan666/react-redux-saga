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
import { Link } from 'react-router-dom';

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
      value: {
        uuid: '',
        mobile: '',
        nickname: '',
        limit: 15,
      },
    };
  }

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  condition = () => {
    // 向父组件中的handleConChange方法里面传递参数
    this.props.handleConChange(this.state.value);
    // if( this.state.value.uuid || this.state.value.mobile || this.state.value.nickname ){
    //   this.props.handleConChange(this.state.value)
    // }else{
    //   Message.error('请输入条件查询 ')
    // }
  }

  render() {
    return (
      <IceContainer title="用户列表">
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <Row wrap gutter="20" style={styles.formRow}>
            <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户账号：</span>
              <IceFormBinder triggerType="onBlur" name="mobile">
                <Input placeholder="请输入用户账号" size="large" />
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
                <Input placeholder="请输入用户名称" size="large" />
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
                <Input placeholder="请输入用户姓名" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="realname" />
              </div>
            </div>
          </Col>
            <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>邀请人：</span>
              <IceFormBinder triggerType="onBlur" name="invite">
                <Input placeholder="请输入邀请人" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="invite" />
              </div>
            </div>
          </Col>
            <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户uuid：</span>
              <IceFormBinder triggerType="onBlur" name="uuid">
                <Input placeholder="请输入" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="uuid" />
              </div>
            </div>
          </Col>
            <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>时间筛选：</span>
              <IceFormBinder triggerType="onBlur" name="date">
                <RangePicker showTime onChange={onChange} />
                {/* <DatePicker showTime onChange={onChange} onOk={onOk} resetTime /> */}
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="date" />
              </div>
            </div>
          </Col>
            {/* <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>设备：</span>
              <IceFormBinder triggerType="onBlur" name="type">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="PC">PC</Select.Option>
                  <Select.Option value="IOS">IOS</Select.Option>
                  <Select.Option value="new">Android</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="type" />
              </div>
            </div>
          </Col> */}
            <Col l="24">
            <div style={styles.formItem}>
              <Button type="primary" onClick={this.condition} style={styles.button}>
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
