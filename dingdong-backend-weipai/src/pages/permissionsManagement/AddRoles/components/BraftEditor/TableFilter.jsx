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
      },
    };
  }

  componentDidMount(){
    let data = JSON.parse(sessionStorage.getItem("data"))
    if(data!==null){
      this.setState({
        value: data,
      });
    }
  }

  formChange = (value) => {
    // console.log('value', value);
    // this.setState({
    //   value,
    // });
  };
  goBefore = () => {
    window.history.go(-1);
  }

  condition = ()=> {
    this.props.handleSumbit(this.state.value)
    // console.log(this.props,this.state.value);
  }

  render() {
    let title = sessionStorage.getItem('data')=='null'?"增加角色":'编辑角色'
    return (
      <IceContainer title={title}>
      {/* <Button type="primary" style={styles.fr} onClick={this.goBefore} >
      返回
      </Button> */}
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>父角色:</span>
              <IceFormBinder triggerType="onBlur" name="parentId">
                {/* <span>{this.props.fatherName}</span> */}
                <Input placeholder={this.props.fatherName} value={this.props.fatherName} size="large" disabled />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="parentId" />
              </div>
            </div>
          </Col>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>角色名称：</span>
              <IceFormBinder triggerType="onBlur" name="name">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="name" />
              </div>
            </div>
          </Col>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>角色描述:</span>
              <IceFormBinder triggerType="onBlur" name="description">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="description" />
              </div>
            </div>
          </Col>
          <Col l="24">
            <div style={styles.formItem}>
              <Button type="primary" onClick={this.condition} style={styles.button}>
                保存
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
    minWidth: '100px',
  },
  fr: {
    float: 'right'
  }
};
