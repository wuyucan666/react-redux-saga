import React, { Component } from 'react';
import BasicTab from './components/BasicTab';
// import InfoDisplayTable from './components/InfoDisplayTable';
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
    // console.log(orderSn);
    const orderSn = window.location.hash.split('=')[1].split('&')[0]
    const status = Number(window.location.hash.split('&')[1].split('=')[1])
    // console.log(status);
    this.setState({
      status
    })
    this.props.actions.userSnDetail({
      pid:20205,
      orderSn,
    })
  }

  passOn=(transferFee)=>{
    // console.log(Sn);
    let Sn = window.location.hash.split('=')[1].split('&')[0]
    let param = {
      pid:20206,
      orderSn:Sn,
      transferFee
    }
    const {actions} = this.props
    actions.userSnPass(param);
  }
  
  turnOff=(obj)=>{
    let Sn = window.location.hash.split('=')[1].split('&')[0]
      let param = {
        pid:20207,
        orderSn:Sn,
        reason:obj
      }
      const {actions} = this.props
      actions.userSnPass(param);
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
        status= {this.state.status}
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
