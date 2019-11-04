import React, { Component } from 'react';
import UserTable from './components/UserTable';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import * as pipeAction from '../../../redux/FinancialManagement/UserPipelineQuery/action';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../../../redux/FinancialManagement/UserPipelineQuery/reducer';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status:0
    };
  }

  componentDidMount(){
    // let orderSn = orderSn
    const id = window.location.hash.split('=')[1].split('&')[0]
    // console.log(id);
    this.props.actions.userSnDetail({
      pid:20208,
      id,
    })
  }

  passOn=(reason)=>{
    const id = window.location.hash.split('=')[1].split('&')[0]
    let param = {
      pid:30012,
      id,
    }
    // console.log(reason,param);
    const {actions} = this.props
    actions.userSnPass(param);
  }
  
  turnOff=(reason)=>{
    const id = window.location.hash.split('=')[1].split('&')[0]
      let param = {
        pid:30013,
        id,
        reason
      }
      // console.log(param,reason);
      const {actions} = this.props
      actions.userSnFail(param);
  }
  

  render() {
    // console.log(this.props.state.userPipe.detail)
    return (
      <div className="user-detail-page">
       {/* 可筛选过滤的用户类表格 */}
        <UserTable 
        Sn= {this.props.state.userPipe.detail}
        passOn={(obj)=>this.passOn(obj)}
        turnOff={(obj)=>this.turnOff(obj)}
        />
        {/* 基础 Tab 组件 */}
        {/* <BasicTab /> */}
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
  actions: bindActionCreators(pipeAction, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'userPipe', reducer });

export default compose(
  withReducer,
  withConnect
)(UserDetail);
