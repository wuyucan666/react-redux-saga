import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/auMessage/Merchant/reducer';
import * as auMessage from '../../../../../redux/auMessage/Merchant/action';

let parmas ={
  pid:20701,
  limit:'',
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
  }

  handleRawChange = (content) => {
    console.log(content);
  };

  handleChange = (rawContent) => {
    console.log(rawContent);
  };

  handleConChange = (values) => {
    parmas = values
    values.page = 1
    values.limit=20
    values.pid=20701
    const {actions} = this.props
    actions.userCondition(values);
    actions.userResultPage(1);
  };

  handlePage = (page) => {
    parmas.page=page
    const {actions} = this.props
    actions.userCondition(parmas);
    actions.userResultPage(page)
  }

  // handleSize = (limit) => {
  //   parmas.limit=limit
  //   parmas.page=1
  //   const {actions} = this.props
  //   console.log(parmas)
  //   console.log(parmas.limit)
  //   actions.userCondition(parmas);
  //   actions.userResultLimit(limit)
  // }

  render() {
    console.log(this.props)
    return (
      <div>
      <IceContainer>
             <TableFilter handleConChange={(obj)=>this.handleConChange(obj)}/>
    </IceContainer>
    <IceContainer>
             <CustomTable 
             handlePage = {(page)=>this.handlePage(page)}
            //  handleSize = {(limit)=>this.handleSize(limit)}
             lists={this.props.state.auMessage.lists} 
             pages = {this.props.state.auMessage.pages} 
             total={this.props.state.auMessage.total}
            //  limit={this.props.state.auMessage.limit}
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
  actions: bindActionCreators(auMessage, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'auMessage', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);