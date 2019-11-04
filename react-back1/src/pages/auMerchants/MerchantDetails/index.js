import React, { Component } from 'react';
import BasicTab from './components/BasicTab';
import UserTable from './components/UserTable';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../../../redux/Weipai/Merchant/reducer';
import * as wpMerchantAction from '../../../redux/Weipai/Merchant/action';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount(){
    const {actions} = this.props
    // actions.userListEmpty();
    // console.log(this.props.state.wpMerchant.detail)
    // const shopId = window.location.hash.split('=')[1].split('&')[0]
    // const uuid = window.location.hash.split('uuid=')[1]
    // const {actions} = this.props

    actions.userResultDetailAll({
      shopId: window.location.hash.split('=')[1].split('&')[0],
      uuid:window.location.hash.split('uuid=')[1]
    }) 


    // actions.userResultDetail({
    //   pid:20405,
    //   shopId: window.location.hash.split('=')[1].split('&')[0]
    // })
    // actions.userSellerStatistics({
    //   pid:20408,
    //   shopId: window.location.hash.split('=')[1].split('&')[0]
    // })
    // actions.userSellerInfo({
    //   pid:20409,
    //   shopId: window.location.hash.split('=')[1].split('&')[0]
    // })
    // actions.userInviteList({
    //   pid:20103,
    //   uuid:window.location.hash.split('uuid=')[1]
    // })
  }
  // shouldComponentUpdate(nextProps,nextState){
  //   console.log(nextProps.state,nextState)
  // }

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
    obj.pid = 20112
    let {actions} = this.props
    actions.accountInviteUser(obj);
  }

  render() {
    return (
      <div className="user-detail-page">
       {/* 可筛选过滤的用户类表格 */}
        <UserTable sn = {this.props.state.baseInfo} 
        fndelete = {(uuid)=>this.fndelete(uuid)}
        fnupdate = {(obj)=>this.fnupdate(obj)}
        fnaccount = {(obj)=>this.fnaccount(obj)}
        />
        {/* 基础 Tab 组件 */}
        <BasicTab data = {this.props.state} 
        // au = {this.props.state.au}
        // common = {this.props.state.common}
        // gb = {this.props.state.gb}
        // inviteList = {this.props.state.inviteList}
        // sellerInfo =  {this.props.state.sellerInfo}
        />
        {/* 两栏信息展示型表格 */}
        {/* <InfoDisplayTable /> */}
       
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return { state:state.wpMerchant.detail };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(wpMerchantAction, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'wpMerchant', reducer });

export default compose(
  withReducer,
  withConnect
)(UserDetail);