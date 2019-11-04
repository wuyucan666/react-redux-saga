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
// import {timeForMat} from '../../../../../common/js/common'
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

  // formChange = (value) => {
  //   this.setState({
  //     value,
  //   });
  //   let times = timeForMat(value.time)
  //   value.time = times
  //   console.log(value);
  //   console.log(this.state.value);
  // };

  componentDidMount(){
    if ( window.location.hash.split('=')[1]){
      this.setState({
        value :{
          status:window.location.hash.split('=')[1],
        }
      });
    }
  }

  condition = ()=> {
    this.props.handleListChange(this.state.value)
    // console.log(this.props,this.state.value);
  }

  render() {
    return (
      <IceContainer title="专场列表">
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>商家昵称：</span>
              <IceFormBinder triggerType="onBlur" name="shopName">
                <Input placeholder="请输入" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="shopName" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>专场名称：</span>
              <IceFormBinder triggerType="onBlur" name="name">
                <Input placeholder="请输入" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="name" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>审核状态：</span>
              <IceFormBinder triggerType="onBlur" name="status">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="0">全部</Select.Option>
                  <Select.Option value="5">未审核</Select.Option>
                  {/* <Select.Option value="8">已审核</Select.Option> */}
                  <Select.Option value="7">审核失败</Select.Option>
                  <Select.Option value="8">审核通过</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="status" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>专场类型：</span>
              <IceFormBinder triggerType="onBlur" name="type">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="0">全部</Select.Option>
                  <Select.Option value="1">钱币</Select.Option>
                  <Select.Option value="2">邮票</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="type" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>时间查询：</span>
              <IceFormBinder triggerType="onBlur" name="date">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="0">全部</Select.Option>
                  <Select.Option value="92">最近三个月</Select.Option>
                  <Select.Option value="183">最近六个月</Select.Option>
                  <Select.Option value="365">最近一年</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="date" />
              </div>
            </div>
          </Col>
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
