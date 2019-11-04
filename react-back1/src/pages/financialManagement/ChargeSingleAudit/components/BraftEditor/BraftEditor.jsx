import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import * as pipeAction from '../../../../../redux/FinancialManagement/UserPipelineQuery/action';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/FinancialManagement/UserPipelineQuery/reducer';

class CustomBraftEditor extends Component {
  static displayName = 'CustomBraftEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  postDetail(val){
    val.pid = 208
    // console.log(val);
    const {actions} = this.props
    actions.userSnDetail(val);
    // console.log(this.props.state.pipe);
  }
  passOn(val){
    let param = {
      pid:209,
      orderSn:val
    }
    const {actions} = this.props
    actions.userSnPass(param);
  }
  turnOff(val){
    let param = {
      pid:210,
      orderSn:val,
      reason:'Waiting for adjustment'
    }
    const {actions} = this.props
    actions.userSnFail(param);
  }

  render() {
    return (
      <div>
      <IceContainer>
          <TableFilter 
          detail = {this.props.state.pipe.detail}
          postDetail={(obj)=>this.postDetail(obj)}
          passOn={(obj)=>this.passOn(obj)}
          turnOff={(obj)=>this.turnOff(obj)}
          />
    </IceContainer>
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
)(CustomBraftEditor);
