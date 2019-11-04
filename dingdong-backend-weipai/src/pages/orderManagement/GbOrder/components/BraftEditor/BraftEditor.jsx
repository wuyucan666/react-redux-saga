import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';
import {timeToObj} from '../../../../../common/js/common'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/orderManagement/Merchant/reducer';
import * as GbOrder from '../../../../../redux/orderManagement/Merchant/action';

var val = {
  pid: 20350,
  limit: '',
  page: 1
}
class CustomBraftEditor extends Component {
  static displayName = 'CustomBraftEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }


  handlePage = (obj) => {
    val.page = obj.page
    // console.log(this.props.state.pipe.pages);
    const {actions} = this.props
    actions.orderCondition(val);
    actions.orderResultPage(val.page);
  };

  componentDidMount(){
    const {actions} = this.props
    actions.userListEmpty();
    if ( window.location.hash.split('status=')[1]){
      // console.log(window.location.hash.split('status=')[1] );
      let obj = {}
      obj.auditStatus = window.location.hash.split('status=')[1];
      obj.pid = 20350
      actions.orderCondition(obj);
    }
  }

  handleChange = (rawContent) => {
    console.log(rawContent);
  };

  //请求
  handleConChange = (values) => {
    val = values;
    values.page = 1;
    values.pid = 20350;
    values.limit = 15;
    const {actions} = this.props
    timeToObj(values,values.date)
    let param = Object.assign({},values)
    delete param['date'];
    actions.userListEmpty();
    actions.orderCondition(param);
    actions.orderResultPage(1);
  };

  modifyCommit = (val) => {
    // console.log(val);
    const {actions} = this.props
    actions.gbModifyCommit(val);
  }
  modifyRecord = (val) => {
    // console.log(val);
    const {actions} = this.props
    actions.gbModifyRecord(val);
  }


  render() {
    // console.log(this.props.state.GbOrder);
    return (
      <div>
      <IceContainer >
      <Link  to="/auMerchants/SiteManagement"  style={styles.nav} >
      微拍审核
      </Link>
      <Link  to="/orderManagement/GbOrder" style={styles.nav1} >
      团购审核
      </Link>
      </IceContainer> 
      <IceContainer>
            <TableFilter  handleConChange={(obj)=>this.handleConChange(obj)}/>
      </IceContainer>
      <IceContainer>
            <CustomTable 
            list = {this.props.state.GbOrder.lists} 
            pages = {this.props.state.GbOrder.pages} 
            total = {this.props.state.GbOrder.total}
            handlePage = {(obj)=>this.handlePage(obj)}
            modification={this.props.state.GbOrder.modification}
            modifyCommit = {(val)=>this.modifyCommit(val)}
            modifyRecord = {(val)=>this.modifyRecord(val)}
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
