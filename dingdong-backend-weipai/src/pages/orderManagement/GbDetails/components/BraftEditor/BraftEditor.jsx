import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import { Message } from '@alifd/next';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/orderManagement/Merchant/reducer';
import * as GbOrder from '../../../../../redux/orderManagement/Merchant/action';

let reason = ''

class CustomBraftEditor extends Component {
  static displayName = 'CustomBraftEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    const gid = window.location.hash.split('=')[1].split('&')[0]
    const {actions} = this.props
    actions.orderDetailList({
      pid:20351,
      gid
    })
  }
  // 22007/22008请求参字段是aid实参取的是gid
  passOn=()=>{
    let data = window.location.hash.split('=')[1]
    let aid = data.split('&')[0]
    const {actions} = this.props
    // console.log(reason)
    actions.userSnPass({
      pid:22007,
      type:2,
      aid,
      reason
    })
  }

  turnDown=()=>{
    if(reason == ''){
      Message.error('请填写理由')
    }else{
      let data = window.location.hash.split('=')[1]
      let aid = data.split('&')[0]
      const {actions} = this.props
      actions.userSnFail({
        pid:22008,
        type:2,
        aid,
        reason
      })
    }
  }

  setVal=(val)=>{
    reason = val
    // console.log(reason)
  }

  render() {
    return (
      <div>
      <IceContainer>
          <TableFilter 
          info = {this.props.state.GbOrder.info}
          passOn = {()=>this.passOn()}
          turnDown = {()=>this.turnDown()}
          setVal= {(val)=>this.setVal(val)}/>
      </IceContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(GbOrder, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'GbOrder', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);