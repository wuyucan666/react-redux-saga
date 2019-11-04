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

const dataSource = [
  {label:'option1', value:'option1'},
  {label:'option2', value:'option2'},
  {label:'disabled', disabled:true}
];
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

  formChange = (val) => {
    // let {uuid} = JSON.parse(sessionStorage.getItem("roleInfo"))
    // console.log(val,uuid);
    // this.setState({
    //   value:{
    //     pid:20601,
    //     type:1,
    //     uuid
    //   }
    // })
  };

  condition = ()=> {
    this.props.handleConChange(this.state.value)
    // console.log(this.props,this.state.value);
  }

  render() {
    // console.log(this.props.roleList)
    return (
      <IceContainer>
        {/* <Button type="primary" style={styles.fr} onClick={()=>{window.history.go(-1)}} >
          返回
        </Button> */}
      <IceContainer title="增加角色">
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>增加角色名称：</span>
              <IceFormBinder triggerType="onBlur" name="items">
                <Select size="large" style={{ width: '200px' }} dataSource={this.props.roleList}>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="items" />
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
    float: 'right',
  },
  buttonfr:{
    width: '100%',
    height: '40px'
  }
};
