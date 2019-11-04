import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import TreeTable from './TreeTable';
import { Message } from '@alifd/next';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/Permission/Role/reducer';
import * as RoleAction from '../../../../../redux/Permission/Role/action';

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

  handleSumbit = (values) => {
    if(JSON.stringify(values)!=="{}"){
      values.pid = 20114
      const {actions} = this.props
      actions.userCondition(values);
    }else{
        Message.error("请填写手机号码")
      }
  };

  deleteList = (val) => {
    const {actions} = this.props
    actions.userDelRole(val);
  }
  

  render() {
    return (
      <div>
      <IceContainer>
        <TableFilter
        handleSumbit = {(obj)=>this.handleSumbit(obj)}/>
    </IceContainer>
    <IceContainer>
        <TreeTable 
        lists = {this.props.state.Role.lists}
        deleteList = {(obj)=>this.deleteList(obj)}
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
  actions: bindActionCreators(RoleAction, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'Role', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);
