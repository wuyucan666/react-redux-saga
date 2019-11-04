import React, { Component } from 'react';
import {
  Input,
  Grid,
  Button,
  Radio,
  DatePicker,
  Checkbox,
  Message,
  Select,
  CascaderSelect,
} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
import BraftEditor from 'braft-editor';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {
  formatImgUrl,
  uploadImg,
  getToken,
  AppId,
} from '../../../../../common/js/common';
import { renderTime } from '../../../../../common/js/filter';

moment.locale('zh-cn');

const { Row, Col } = Grid;
const RadioGroup = Radio.Group;

export default class CustomTable extends Component {
  static displayName = 'CustomTable';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value1: {},
      value2: {},
      value3: {},
      city: [],
      sex: '',
    };
  }

  componentDidMount() {
    fetch('https://os.alipayobjects.com/rmsportal/ODDwqcDFTLAguOvWEolX.json')
      .then(response => response.json())
      .then(city => {
        this.setState({ city });
      })
      .catch(e => console.log(e));
  }

  componentWillReceiveProps(next) {
    console.log('nextprops', next.card_realname);
    if (next.card_realname !== this.props.card_realname) {
      console.log('实名认证成功', this.props.card_realname);
      const obj = {};
      obj.accountName = next.card_realname;
      this.setState({
        value3: obj,
      });
    }
  }

  handleChangeCity(value, data, extra) {
    console.log(value, data, extra);
  }

  formChange1 = value1 => {
    this.setState({
      value1,
    });
  };

  formChange2 = value2 => {
    this.setState({
      value2,
    });
  };

  formChange3 = value3 => {
    this.setState({
      value3,
    });
  };

  handleConmit1 = () => {
    const { value1 } = this.state;
    // console.log(value1, 'value1');
    this.props.handleChange(value1, '1');
    // if (value1.realname && value1.mobile && value1.nickname) {

    // } else {
    //   Message.warning('用户信息均为必填项！');
    // }
  }

  handleConmit2 = () => {
    const { value2 } = this.state;
    // console.log(value2, 'value2');
    this.props.handleChange(value2, '2');
  }

  handleConmit3 = () => {
    const { value3 } = this.state;
    // console.log(value3, 'value3');
    this.props.handleChange(value3, '3');
  }
  // 封装
  getSexForCard = (str) => {
     /**
         * 通过身份证号码得到性别
         *  身份证号码 return 1/2 男/女
*/
    var inputStr = str.toString();
    var sex;
    if (inputStr.length == 18) {
        sex = inputStr.charAt(16);
        if (sex % 2 == 0) {
            return 2;
        } else {
            return 1;
        }
    } 
        sex = inputStr.charAt(14);
        if (sex % 2 == 0) {
            return 2;
        } else {
            return 1;
        }
    
  }

  handle = (v) => {
    const sex = this.getSexForCard(v);
    if (sex == 1) {
      this.setState({
        sex: '男',
      });
    }else {
      this.setState({
        sex: '女',
      });
    }
  }

  render() {
    console.log(this.state.value3);
    return (
      <div>
        <IceContainer title="添加用户">
          <IceFormBinderWrapper
            value={this.state.value1}
            onChange={this.formChange1}
            ref="form1"
          >
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formTitle}>
                  <span style={{ color: '#f00' }}>*</span>用户姓名：
                </span>
                <IceFormBinder triggleType="onBlur" name="realname">
                  <Input placeholder="请输入..." size="large" disabled={this.props.isCreatedUserSuccess} />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="realname" />
                </div>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formTitle}>
                  <span style={{ color: '#f00' }}>*</span>手机号码：
                </span>
                <IceFormBinder triggleType="onBlur" name="mobile">
                  <Input placeholder="请输入..." size="large" disabled={this.props.isCreatedUserSuccess} />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="mobile" />
                </div>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formTitle}>
                  <span style={{ color: '#f00' }}>*</span>用户昵称：
                </span>
                <IceFormBinder triggleType="onBlur" name="nickname">
                  <Input placeholder="请输入..." size="large" disabled={this.props.isCreatedUserSuccess} />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="nickname" />
                </div>
              </div>
            </Col>
            <Row wrap>
              <Col l="24" style={{ paddingBottom: '20px' }}>
                <Button
                  type="primary"
                  style={styles.backBtn}
                  onClick={this.handleConmit1}
                  disabled={this.props.isCreatedUserSuccess}
                >
                  提交
                </Button>
              </Col>
            </Row>
          </IceFormBinderWrapper>
        </IceContainer>

        <IceContainer title="实名认证信息">
          <IceFormBinderWrapper
            value={this.state.value2}
            onChange={this.formChange2}
            ref="form2"
          >
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formTitle}>
                  <span style={{ color: '#f00' }}>*</span>真实姓名：
                </span>
                <IceFormBinder triggleType="onBlur" name="name">
                  <Input placeholder="请输入..." size="large" disabled={this.props.isCheckIdCard} />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="name" />
                </div>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formTitle}>
                  <span style={{ color: '#f00' }}>*</span>身份证：
                </span>
                <IceFormBinder triggleType="onBlur" name="idNum">
                  <Input placeholder="请输入..." size="large" disabled={this.props.isCheckIdCard} onChange={(v) => { this.handle(v); }} />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="idNum" />
                </div>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formTitle}>
                  <span style={{ color: '#f00', marginLeft: '6px' }} />
                  性别：
                </span>
                <span style={{ marginLeft: '12px' }}>{this.state.sex}</span>
                <span style={{ color: '#ccc', marginLeft: '10px' }}>
                  注:(根据身份证尾数自动读取)
                </span>
              </div>
            </Col>
            <Row wrap>
              <Col l="24" style={{ paddingBottom: '20px' }}>
                <Button
                  type="primary"
                  style={styles.backBtn}
                  onClick={this.handleConmit2}
                  disabled={this.props.isCheckIdCard}
                >
                  提交
                </Button>
              </Col>
            </Row>
          </IceFormBinderWrapper>
        </IceContainer>

        {/* <IceContainer title="添加银行卡信息">
          <IceFormBinderWrapper
            value={this.state.value3}
            onChange={this.formChange3}
            ref="form3"
          >
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formTitle}>
                  <span style={{ color: '#f00', marginLeft: '6px' }} />
                  开户名：
                </span>
                <IceFormBinder triggleType="onBlur" name="accountName">
                  <Input placeholder="请输入..." size="large" disabled />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="accountName" />
                </div>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formTitle}>
                  <span style={{ color: '#f00' }}>*</span>开户银行：
                </span>
                <IceFormBinder triggleType="onBlur" name="accountBank">
                  <Select size="large" style={{ width: '200px' }} disabled={this.props.isAddCardSuccess}>
                    <Select.Option value="1">工商银行</Select.Option>
                    <Select.Option value="2">建设银行</Select.Option>
                    <Select.Option value="3">招商银行</Select.Option>
                    <Select.Option value="4">光大银行</Select.Option>
                    <Select.Option value="5">广发银行</Select.Option>
                  </Select>
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="accountBank" />
                </div>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formTitle}>
                  <span style={{ color: '#f00', marginLeft: '6px' }} />
                  开户城市：
                </span>
                <IceFormBinder triggleType="onBlur" name="accountCity">
                  <CascaderSelect
                    style={{ width: '302px' }}
                    dataSource={this.state.city}
                    onChange={this.handleChangeCity}
                    disabled={this.props.isAddCardSuccess}
                  />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="accountCity" />
                </div>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formTitle}>
                  <span style={{ color: '#f00', marginLeft: '6px' }} />
                  开户支行名称：
                </span>
                <IceFormBinder triggleType="onBlur" name="bankName">
                  <Input placeholder="请输入..." size="large" disabled={this.props.isAddCardSuccess} />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="bankName" />
                </div>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formTitle}>
                  <span style={{ color: '#f00' }}>*</span>卡号：
                </span>
                <IceFormBinder triggleType="onBlur" name="cardNum">
                  <Input placeholder="请输入..." size="large" disabled={this.props.isAddCardSuccess} />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="cardNum" />
                </div>
              </div>
            </Col>
            <Row wrap>
              <Col l="24" style={{ paddingBottom: '20px' }}>
                <Button
                  type="primary"
                  style={styles.backBtn}
                  onClick={this.handleConmit3}
                  disabled={this.props.isAddCardSuccess}
                >
                  提交
                </Button>
              </Col>
            </Row>
          </IceFormBinderWrapper>
        </IceContainer> */}
      </div>
    );
  }
}

const styles = {
  backBtn: {
    float: 'right',
  },
  formItem: {
    padding: '0 0 10px 0',
  },
  formTitle: {
    width: '110px',
    display: 'inline-block',
  },
  formRow: {
    display: 'block',
    padding: '0px 0px 40px 0px',
  },
  formError: {},
  formFlex: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '30px',
  },
};
