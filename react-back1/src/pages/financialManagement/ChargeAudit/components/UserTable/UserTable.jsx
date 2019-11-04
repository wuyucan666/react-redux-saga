import React, { Component } from 'react';
import UserSearch from './UserSearch';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import * as pipeAction from '../../../../../redux/FinancialManagement/UserPipelineQuery/action';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/FinancialManagement/UserPipelineQuery/reducer';


class UserTable extends Component {
  static displayName = 'UserTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  postDetail(val){
    // console.log(val);
    const {actions} = this.props
    actions.userOfflineSn(val);
    // console.log(this.props.state.pipe);
  }

  passOn(val){
    let param = {
      pid:212,
      orderSn:val
    }
    const {actions} = this.props
    actions.userSnPass(param);
  }
  turnOff(val){
    let param = {
      pid:213,
      orderSn:val,
      reason:'Waiting for adjustment'
    }
    const {actions} = this.props
    actions.userSnFail(param);
  }

  render() {
    // console.log(this.props.state.userPipe.snDetail);
    return (
      <div>
        <UserSearch 
        snDetail = {this.props.state.userPipe}
        postDetail={(obj)=>this.postDetail(obj)}
        passOn={(obj)=>this.passOn(obj)}
        turnOff={(obj)=>this.turnOff(obj)}
        />
      </div>
    );
  }
}


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
)(UserTable);
