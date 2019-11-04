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
      value: {},
    };
  }

  // formChange = (value) => {
  //   console.log('value', value);
  //   this.setState({
  //     value,
  //   });
  // };
  condition = ()=> {
    this.props.handleSumbit(this.state.value)
    // console.log(this.props,this.state.value);
  }


  render() {
    return (
      <IceContainer title="成员列表">
      <IceFormBinderWrapper
        value={this.state.value}
        // onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>手机号：</span>
              <IceFormBinder triggerType="onBlur" name="mobile">
                <Input placeholder="请输入" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="mobile" />
              </div>
            </div>
          </Col>
         {/* <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>父角色分类：</span>
              <IceFormBinder triggerType="onBlur" name="type">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="1">全部</Select.Option>
                  <Select.Option value="2">运营</Select.Option>
                  <Select.Option value="3">客服</Select.Option>
                  <Select.Option value="4">财务</Select.Option>
                  <Select.Option value="5">管理</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="type" />
              </div>
            </div>
          </Col> */}
          <Col l="24">
            <div style={styles.formItem}>
              <Button type="primary" onClick={this.condition} >
                查询
              </Button>
              {/* <Button type="primary" style={styles.button}>
              <Link   to="/permissionsManagement/AddMember" style={styles.link}>
                添加
              </Link>
              </Button> */}
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
  button:{
    marginLeft:'10px'
  },
  link:{
    color:'#fff'
  }
};
