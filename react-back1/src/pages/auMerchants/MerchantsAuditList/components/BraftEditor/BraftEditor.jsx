import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';

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
  componentDidMount(){
    const {actions} = this.props
    actions.userListEmpty();
    if ( window.location.hash.split('=')[1]){
      let obj = {}
      obj.status = window.location.hash.split('=')[1];
      obj.pid = 20401
      actions.userCondition(obj);
    }
  }

  handlePage = (page) => {
    let parmas = {
      pid:20401
    }
    parmas.page=page
    // console.log(this.props.state.pipe.pages);
    const {actions} = this.props
    actions.userCondition(parmas);
    actions.userResultPage(page);
  }

  handleListChange = (values) => {
    values.page = 1
    values.pid = 20401
    // console.log(values);
    const {actions} = this.props
    actions.userCondition(values);
    actions.userResultPage(1);
    // console.log(this.props.state.pipe)
  };

  render() {
    return (
      <div>
      <IceContainer>
             <TableFilter 
             handleListChange={(obj)=>this.handleListChange(obj)}/>
    </IceContainer>
    <IceContainer>
             <CustomTable
             lists={this.props.state.wpMerchant.lists} 
             pages={this.props.state.wpMerchant.pages} 
             total={this.props.state.wpMerchant.total}
             handlePage = {(page)=>this.handlePage(page)}/>
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
