import React, { Component } from 'react';
import CustomTable from './CustomTable';
import IceContainer from '@icedesign/container';

import {
  Message,
  Dialog,
  Button,
} from '@alifd/next';

import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import * as userAudit from '../../../../../redux/auUser/UserAudit/action';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/auUser/UserAudit/reducer';
import nw from '../../../../../common/http/post';

class CustomBraftEditor extends Component {
  static displayName = 'CustomBraftEditor';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      visible_one: false, // 创建用户弹窗
      isCreatedUserSuccess: false, // 标识是否创建用户成功
      uuid: '',
      password: '',
      isCheckIdCard: false, // 标识是否实名认证成功
      card_realname: '', // 记录实名认证开户名
      isAddCardSuccess: false, // 记录添加银行卡成功
    };
  }

  componentDidMount() {

  }

  handleChange = (val, type) => {
    console.log(val, type);
    const { actions } = this.props;
    if (type === '1') { // 添加用户
      if (val.realname && val.mobile && val.nickname) {
        val.pid = '20121';
        const obj = Object.assign({}, val);
        delete obj.realname;
        console.log(val, obj);
        nw.post('/', obj, (res) => {
          // console.log(res, '-----------------');
          if (res.errorCode == 0) {
            this.setState({
              visible_one: true,
              isCreatedUserSuccess: true,
              password: res.data ? res.data.password : '',
              uuid: res.data ? res.data.uuid : '',
            });
          }
        });
      } else {
        Message.warning('用户信息均为必填项！');
      }
    } else if (type === '2') { // 实名认证
      if (this.state.isCreatedUserSuccess) {
        if (val.name && val.idNum) {
          const q = {};
          q.pid = 20122;
          q.uuid = this.state.uuid || '';
          q.name = val.name;
          q.certId = val.idNum;
          nw.post('/', q, (res) => {
            // console.log(res, '-----------------');
            if (res.errorCode == 0) {
              Message.success('成功实名认证!');
              this.setState({
                isCheckIdCard: true,
                card_realname: val.name,
              });
            }
          });
        } else {
          Message.warning('实名认证信息均为必填项！');
        }
      } else {
        Message.warning('请先添加用户！');
      }
    } else if (type === '3') { // 添加银行卡
      if (this.state.isCheckIdCard) {
        if (val.accountBank && val.cardNum) {
          // actions.addUser(val);
          // setTimeout(() => {
          //   this.setState({
          //     isAddCardSuccess: true,
          //   }, () => {
          //     Message.success('成功添加银行卡!');
          //   });
          // }, 1000);
        } else {
          Message.warning('开户银行和卡号为必填项！');
        }
      } else {
        Message.warning('请先实名认证！');
      }
    }
  }

  onClose = () => {
    this.setState({
      visible_one: false,
    });
  }

  copyPass = () => {
    const input = document.getElementById('input');
    input.value = this.state.password; // 修改文本框的内容
    input.select(); // 选中文本
    document.execCommand('copy'); // 执行浏览器复制命令
    this.setState({
      visible_one: false,
    }, () => {
      Message.success('复制成功!');
    });
  }

  render() {

    return (
      <div>
        <CustomTable
          handleChange={(obj, type) => { this.handleChange(obj, type); }}
          isCreatedUserSuccess={this.state.isCreatedUserSuccess}
          isCheckIdCard={this.state.isCheckIdCard}
          card_realname={this.state.card_realname}
          isAddCardSuccess={this.state.isAddCardSuccess}
         />
        <Dialog
          title="创建成功"
          visible={this.state.visible_one}
          onClose={this.onClose}
          footer={<Button type="primary" onClick={this.copyPass} >复制密码</Button>}
          footerAlign="center"
          // closeable="esc,close,mask"
        >
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: '000' }}>
            <span>您已经成功创建该用户，该用户的登入密码为{this.state.password}，</span> <br />
            <span>用户登入时需要修改秘密。</span>
            <textarea id="input" style={{ position: 'absolute', top: '0', left: '0', opacity: '0', zIndex: '-10' }} />
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(userAudit, dispatch),
});

// 链接器连接上面2个方法
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

// 将返回的数据命名为UserList
const withReducer = injectReducer({ key: 'UserAdd', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);

const styles = {
  nav1: {
    padding: '10px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  nav: {
    padding: '10px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#21242a',
  },
};
