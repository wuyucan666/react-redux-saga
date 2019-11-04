import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';

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

  handleRawChange = (content) => {
    console.log(content);
  };

  handleChange = (rawContent) => {
    console.log(rawContent);
  };

  query = (key) => {
    let data = {}
    data.pid=20102
    data.keyWord = key
    const {actions} = this.props
    actions.userCondition(data);
  }

  submit = (obj) => {
    console.log(obj)
    obj.pid=20400
    const {actions} = this.props
    actions.userSnPass1(obj);
  }

  render() {
    // console.log(this.props.state.addMerchant.lists[0]);
    return (
      <div>
      <IceContainer>
             <TableFilter 
             query = {(key)=>this.query(key)}
             submit = {(obj)=>this.submit(obj)}
             user = {this.props.state.addMerchant.lists[0]}
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

const withReducer = injectReducer({ key: 'addMerchant', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);