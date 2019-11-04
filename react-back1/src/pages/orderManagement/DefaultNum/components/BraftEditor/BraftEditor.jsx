import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import CustomTable from './CustomTable';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/orderManagement/Merchant/reducer';
import * as AuOrder from '../../../../../redux/orderManagement/Merchant/action';

let parmas ={
  pid:503,
  limit:'',
  uuid:window.location.hash.split('=')[1],
  
}
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

    //页面一进来就执行的方法
    componentDidMount(){
      this.props.actions.orderCondition({
        pid:503,
        page:1,
        limit:20,
        uuid:window.location.hash.split('=')[1],
      });
    }

    // handleConChange = (values) => {
    //   timeToObj(values,values.date)
    //   parmas = values
    //   values.page = 1
    //   values.limit=20
    //   values.pid=503
    //   values.uuid=window.location.hash.split('=')[1];
    //   const {actions} = this.props
    //   actions.orderCondition(values);
    //   actions.orderResultPage(1);
    // };
  
    handlePage = (page) => {
      parmas.page=page
      const {actions} = this.props
      actions.orderCondition(parmas);
      actions.orderResultPage(page)
    }
  render() {
    return (
      <div>
    <IceContainer>
             <CustomTable
             handlePage = {(page)=>this.handlePage(page)}
             lists={this.props.state.AuOrder.lists} 
             pages = {this.props.state.AuOrder.pages} 
             total={this.props.state.AuOrder.total}
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
  actions: bindActionCreators(AuOrder, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'AuOrder', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);