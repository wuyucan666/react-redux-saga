import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import * as tradingAction from '../../../../../redux/FinancialManagement/TradingOrderlist/action';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/FinancialManagement/TradingOrderlist/reducer';

let parmas = {}
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
  };

  handlePage = (page) => {
    parmas.page=page
    parmas.pid=20215
    parmas.limit = 20
    const {actions} = this.props
    actions.userCondition(parmas);
    actions.userResultPage(page);
  }

  handleConChange = (values) => {
    values.page = 1
    values.pid=20215
    parmas.limit = 20
    // console.log(this.props);
    const {actions} = this.props
    actions.userCondition(values);
    actions.userResultPage(1);
    // console.log(this.props.state.pipe)
  };

  exportData=(val)=>{
    delete val.page
    val.pid = 20217
    console.log(val)
    const {actions} = this.props
    actions.userExportData(val)
  }

  render() {
    return (
      <div>
      <IceContainer>
          <TableFilter 
          handleConChange={(obj)=>this.handleConChange(obj)}
          exportData={(obj)=>this.exportData(obj)}/>
    </IceContainer>
    <IceContainer>
          <CustomTable 
          lists={this.props.state.tradingOrder.lists} 
          pages={this.props.state.tradingOrder.pages} 
          total={this.props.state.tradingOrder.total}
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
  actions: bindActionCreators(tradingAction, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'tradingOrder', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);
