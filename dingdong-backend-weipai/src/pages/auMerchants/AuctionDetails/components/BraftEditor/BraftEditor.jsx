import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import { Message } from '@alifd/next';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/Weipai/Merchant/reducer';
import * as wpMerchantAction from '../../../../../redux/Weipai/Merchant/action';

let reason = ''

class CustomBraftEditor extends Component {
  static displayName = 'CustomBraftEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount(){
    let data = window.location.hash.split('=')[1]
    let aid = data.split('&')[0]
    // console.log(aid);
    const {actions} = this.props
    actions.userResultDetail({
      pid:20301,
      aid,
    })
  }

  passOn=()=>{
    let data = window.location.hash.split('=')[1]
    let aid = data.split('&')[0]
    const {actions} = this.props
    // console.log(reason)
    actions.userSnPass({
      pid:22007,
      type:1,
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
        type:1,
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
          info = {this.props.state.wpMerchant.auction}
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
)(CustomBraftEditor);