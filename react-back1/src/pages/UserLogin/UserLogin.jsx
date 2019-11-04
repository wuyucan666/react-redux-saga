/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FoundationSymbol from '@icedesign/foundation-symbol';
import { Input, Loading, Grid, Form } from '@alifd/next';

import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import * as loginAction from '../../redux/UserLogin/action';
import injectReducer from '../../utils/injectReducer';
import reducer from '../../redux/UserLogin/reducer';

const Icon = FoundationSymbol;
const { Row } = Grid;
const FormItem = Form.Item;

class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        password: '',
        checkbox: false,
      },
      visable: false,
    };
  }
  componentDidMount() {
    // console.log(window)
    // window.onkeydown=function(event){
    //   e = event ? event : (window.event ? window.event : null);
    //   if(e.keyCode==13){//点击回车触发
    //   console.log(123)
    //   }
    //   return false;
    //   }

    localStorage.setItem('name', '');
    localStorage.setItem('avatar', '');
  }
  formChange = (value) => {
    this.setState({
      value,
    });
  };
  handleEnterKey = (e) => {
    // console.log(this.state.value);
    const { username, password } = this.state.value;
    if (e.nativeEvent.keyCode === 13) { // e.nativeEvent获取原生的事件对像
      const { actions } = this.props;
      actions.userLogin({
        username,
        password,
      });
      this.setState({
        visable: true,
      });
    }
  }
  handleSubmit = (values, errors) => {
    if (errors) {
      console.log('errors', errors);
      return;
    }
    // console.log(this.props);
    const { actions } = this.props;
    actions.userLoading();
    actions.userLogin(values);
    // actions.userLoginRes(values);
  };

  render() {
    const { isLoading } = this.props.loginResult;
    // console.log(this.props);
    return (
      <div className="user-login">
        <div className="formContainer">
          <Form value={this.state.value} onChange={this.formChange}>
            <FormItem required requiredMessage="必填" className="formItem">
              <Input
                innerBefore={
                  <Icon type="person" size="small" className="inputIcon" />
                }
                name="username"
                maxLength={20}
                placeholder="用户名"
              />
            </FormItem>
            <FormItem required requiredMessage="必填" className="formItem">
              <Input
                innerBefore={
                  <Icon type="lock" size="small" className="inputIcon" />
                }
                onKeyPress={this.handleEnterKey}
                name="password"
                htmlType="password"
                placeholder="密码"
              />
            </FormItem>
            {/* <FormItem>
              <Checkbox name="checkbox" className="checkbox">
                记住账号
              </Checkbox>
            </FormItem> */}
            <Row className="formItem">
              <Form.Submit
                type="primary"
                validate
                onClick={this.handleSubmit}
                className="submitBtn"
              >
                登 录
              </Form.Submit>
              {/* <p className="account">
                <span className="tips-text" style={{ marginRight: '20px' }}>
                  管理员登录：admin/admin
                </span>
                <span className="tips-text">用户登录：user/user</span>
              </p> */}
            </Row>

            {/* <Row className="tips">
              <Link target="_blank" to="/user/register" className="tips-text">
                立即注册
              </Link>
            </Row> */}
          </Form>
        </div>
        <Loading
          visible={isLoading}
          fullScreen
          tip="加载中..."
          shape="fusion-reactor"
         />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return { loginResult: state.login };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(loginAction, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'login', reducer });

export default compose(
  withReducer,
  withConnect
)(UserLogin);

