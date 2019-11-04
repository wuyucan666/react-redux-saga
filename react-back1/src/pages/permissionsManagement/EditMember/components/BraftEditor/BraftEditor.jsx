import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';

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
    actions.userListEmpty()
    actions.userCondition({
      pid : 20606
    });
  }

  handleConChange = (values) => {
    let {uuid} = JSON.parse(sessionStorage.getItem("roleInfo"))
    values.pid = 20601
    values.type = 1
    values.uuid = uuid
    // console.log(values)
    const {actions} = this.props
    actions.userAddRole(values);
  };


  render() {
    const {roleList} = this.props.state.Role
    return (
    <div>
      <IceContainer>
          <TableFilter 
          roleList = {roleList}
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
