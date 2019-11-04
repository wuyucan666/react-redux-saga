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
import reducer from '../../../../../redux/Weipai/Merchant/reducer';
import * as wpMerchantAction from '../../../../../redux/Weipai/Merchant/action';

let parmas = {
  pid:20300
}
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
      obj.pid = 20300
      actions.userCondition(obj);
    }
  }

  handlePage = (page) => {
    parmas.page=page
    // console.log(this.props.state.pipe.pages);
    const {actions} = this.props
    actions.userCondition(parmas);
    actions.userResultPage(page);
  }
  Shut = (aid) => {
    let data={}
    data.aid=aid
    data.pid=20301
    // console.log(this.props.state.pipe.pages);
    const {actions} = this.props
    actions.userSnFail(data);
  }
  closeAuco = (aid) => {
    let data = {
      pid:20304,
      aid
    }
    // console.log(data)
    const {actions} = this.props
    actions.userSnPass(data);
    setTimeout(() => {
      location.reload() 
    }, 1000);
  }
  handleListChange = (values) => {
    timeToObj(values,values.date)
    parmas = values
    values.page = 1
    values.pid = 20300
    const {actions} = this.props
    actions.userCondition(values);
    actions.userResultPage(1);
  };

  modifyCommit = (val) => {
    // console.log(val);
    const {actions} = this.props
    actions.wpModifyCommit(val);
  }
  modifyRecord = (val) => {
    // console.log(val);
    const {actions} = this.props
    actions.wpModifyRecord(val);
  }

  render() {
    return (
      <div>
      <IceContainer >
      <Link  to="/auMerchants/SiteManagement"  style={styles.nav1} >
      微拍审核
      </Link>
      <Link  to="/orderManagement/GbOrder" style={styles.nav} >
      团购审核
      </Link>
      </IceContainer> 
      <IceContainer>
            <TableFilter 
            handleListChange={(obj)=>this.handleListChange(obj)}/>
      </IceContainer>
      <IceContainer>
            <CustomTable 
            lists={this.props.state.wpMerchant.lists} 
            pages={this.props.state.wpMerchant.pages} 
            total={this.props.state.wpMerchant.total}
            modification={this.props.state.wpMerchant.modification}
            handlePage = {(page)=>this.handlePage(page)}
            closeAuco = {(aid)=>this.closeAuco(aid)}
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
