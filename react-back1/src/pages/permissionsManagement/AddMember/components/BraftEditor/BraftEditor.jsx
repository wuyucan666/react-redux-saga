import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import * as singleAction from '../../../../../redux/FinancialManagement/ChargeSingle/action';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/FinancialManagement/ChargeSingle/reducer';


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
  
  handleConChange = (values) => {
    const {actions} = this.props
    actions.userCondition(values);
  };


  render() {
    return (
    <div>
      <IceContainer>
             <TableFilter 
             handleConChange={(obj)=>this.handleConChange(obj)}/>
      </IceContainer>
    </div>
    );
  }
}


const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(singleAction, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'singleOrder', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);
