import React, { Component } from 'react';
import TreeTable from './components/TreeTable';
import SimpleFormDialog from './components/SimpleFormDialog';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../../../redux/Permission/Role/reducer';
import * as RoleAction from '../../../redux/Permission/Role/action';

class Page28 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    const {actions} = this.props
    let uuid = window.location.hash.split('uuid=')[1]
    let role = window.location.hash.split('isrole')[1]!==undefined
    // console.log(role);
    actions.userListEmpty()
    if(uuid !== undefined){
      actions.parentRole({
        pid:20610,
        type:3,
        uuid
      })
    }else if(role){
      let roleName = JSON.parse(sessionStorage.getItem('data'))
      // console.log(role,roleName.name);
      actions.parentRole({
        pid:20612,
        type:3,
        role:roleName.name
      })
    }
    actions.userCondition({
      pid:20602,
      type:3
    })
  }

  handleSumbit = (val) =>{
    const {actions} = this.props
    actions.userAddRole(val);
  }
  getPermission = (val) => {
    const {actions} = this.props
    actions.userGetPermission(val);
  }

  addrolepermission = () =>{
    let {items} = this.props.state.Role
    const uuid = window.location.hash.split('=')[1]
    let params = {
      type:3,
      items:JSON.stringify(items)
    }
    // console.log(uuid,params);
    if(uuid!==undefined){
      params.pid=20601
      params.uuid=uuid
    }else{
      let role = JSON.parse(sessionStorage.getItem("data"))
      params.pid=20608
      params.role=role.name
    }
    const {actions} = this.props
    actions.userAddRole(params);
  }

  render() {
    // console.log(this.props.state.Role.listName)
    return (
      <div className="page28-page">
        {/* tree和选择混合表格 */}
        <SimpleFormDialog 
        perListCheck = {this.props.state.Role.perListCheck}
        // handlesumbit={(obj)=>this.handleSumbit(obj)}
        // addrolepermission={()=>this.addrolepermission}
        />
        <TreeTable 
        permission = {this.props.state.Role.permission} 
        getPermission={(obj)=>this.getPermission(obj)}
        listName={this.props.state.Role.listName}
        />
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
)(Page28);