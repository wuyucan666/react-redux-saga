import React, { Component } from 'react';
import BasicTab from './components/BasicTab';
import UserTable from './components/UserTable';


import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import * as userAudit from '../../../redux/auUser/UserAudit/action';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../../../redux/auUser/UserAudit/reducer';
import {orderSn} from '../../../common/js/filter.js'

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
//页面一进来就执行的方法
  componentDidMount(){
    this.props.actions.userDetail({
      pid:20100,
      uuid:window.location.hash.split('=')[1],
    });

    this.props.actions.userInformation1({
      pid:20105,
      uuid:window.location.hash.split('=')[1],
    });

    this.props.actions.userInformation2({
      pid:20111,
      uuid:window.location.hash.split('=')[1],
    });

    this.props.actions.userInformation3({
      pid:20103,
      uuid:window.location.hash.split('=')[1],
    });
  }

  fndelete =(uuid)=>{
    const {actions} = this.props
    //actions.userAuditId这个是引入的actions文件里面的方法
    let data = {
      pid:20110,
      uuid:uuid
    }
    actions.deleteInviteUser(data);
  }

  fnupdate=(obj)=>{
    obj.pid = 20107 
    const {actions} = this.props
    actions.updateInviteUser(obj);
  }

  fnaccount=(obj)=>{
    obj.pid = 20117
    const {actions} = this.props
    actions.accountInviteUser(obj);
  }

  render() {
    // console.log(this.props.state.userDetail.object);
    return (<div className="user-detail-page">
        <UserTable  
        sn= {this.props.state.userDetail.object}
        fndelete = {(uuid)=>this.fndelete(uuid)}
        fnupdate = {(obj)=>this.fnupdate(obj)}
        fnaccount = {(obj)=>this.fnaccount(obj)}
        />
        {/* 基础 Tab 组件 */}
        <BasicTab 
        information={this.props.state.userDetail.userobj}
        userInvite ={this.props.state.userDetail.userInvite}
        userProve={this.props.state.userDetail.userProve}
        info = {this.props.state.userDetail.object}
        />
        {/* 两栏信息展示型表格 */}
        {/* <InfoDisplayTable /> */}
      </div>
    );
  }
}

//redux
const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(userAudit, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'userDetail', reducer });

export default compose(
  withReducer,
  withConnect
)(UserDetail);

