import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';
import { Link } from 'react-router-dom';
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
    parmas.pid=20220
    // console.log(this.props.state.pipe.pages);
    const {actions} = this.props
    actions.userCondition(parmas);
    actions.userResultPage(page);
  }

  handleConChange = (values) => {
    values.pid=20220
    values.page = 1
    values.limit = 20
    // console.log(this.props);
    const {actions} = this.props
    actions.userCondition(values);
    actions.userResultPage(1);
    // console.log(this.props.state.pipe)
  };

  render() {
    return (
      <div>
      <IceContainer >
        <Link  to="/financialManagement/OfflineList"  style={styles.nav1} >
        线下汇款审核
        </Link>
        <Link  to="/financialManagement/ChargeSingle" style={styles.nav} >
        补单审核
        </Link>
      </IceContainer>
      <IceContainer>
             <TableFilter 
             handleConChange={(obj)=>this.handleConChange(obj)}/>
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


const styles = {
  nav1:{
    padding:'10px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  nav:{
    padding:'10px',
    fontSize: '20px',
    fontWeight: 'bold',
    color:'#21242a'
  },

};
