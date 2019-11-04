import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/Permission/Role/reducer';
import * as RoleAction from '../../../../../redux/Permission/Role/action';

let parmas = {
  pid:20606,
  type:1,
  limit:20,
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
    parmas.page = 1
    actions.userListEmpty();
    actions.userCondition(parmas);
    actions.parentRole({
      pid:20604
    });
  }

  deleteList = (val) => {
    const {actions} = this.props
    actions.userDelRole(val);
  }

  handlePage = (page) => {
    parmas.page = page
    // console.log(this.props.state.pipe.pages);
    const {actions} = this.props
    actions.userCondition(parmas);
    actions.userResultPage(page);
  }

  render() {
    // console.log(this.props.state.Role.parentRole)
    return (
    <div>
    <IceContainer>
          <TableFilter 
          parentRole={this.props.state.Role.parentRole}/>
    </IceContainer>
    <IceContainer>
          <CustomTable 
          lists={this.props.state.Role.childRoleList} 
          pages={this.props.state.Role.pages} 
          total={this.props.state.Role.childRoleList.length}
          handlePage = {(page)=>this.handlePage(page)}
          deleteList={(val)=>this.deleteList(val)}
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