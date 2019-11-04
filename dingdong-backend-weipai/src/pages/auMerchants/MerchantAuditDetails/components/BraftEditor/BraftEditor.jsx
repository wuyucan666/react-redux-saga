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


class CustomBraftEditor extends Component {
  static displayName = 'CustomBraftEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount(){
    let id = window.location.hash.split('=')[1].split('&')[0]
    let status = Number(window.location.hash.split('&')[1].split('=')[1] ) !== 0
    // console.log(status)
    this.setState({
      status
    })
    const {actions} = this.props
    actions.userResultDetail({
      pid:20402,
      id,
    })
  }

  passOn=()=>{
    let id = window.location.hash.split('=')[1].split('&')[0]
    const {actions} = this.props
    actions.userSnPass({
      pid:20403,
      id,
      type:1,
      reason:''
    })
  }

  turnDown=(val)=>{
    console.log(val)
    if(val==undefined){
      Message.error('请填写理由')
    }else{
      // console.log(val)
      let id = window.location.hash.split('=')[1].split('&')[0]
      const {actions} = this.props
      actions.userSnPass({
        pid:20403,
        id,
        type:2,
        reason:val
      })
    }
    
  }

  render() {
    return (
      <div>
      <IceContainer>
          <TableFilter 
          info = {this.props.state.wpMerchant.auction}
          status = {this.state.status}
          passOn = {(id)=>this.passOn(id)}
          turnDown = {(id)=>this.turnDown(id)}
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