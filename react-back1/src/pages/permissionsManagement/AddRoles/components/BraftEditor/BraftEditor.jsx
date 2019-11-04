import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
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
    this.state = {
      info:{}
    };
  }

  componentDidMount(){
    const {actions} = this.props
    actions.userCondition({
      pid:20609
    });
  }

  
  handleSumbit = (values) => {
    let data = JSON.parse(sessionStorage.getItem('data'))
    console.log(data==null);
    if(data==null){
      if(JSON.stringify(values)!=="{}"){
        values.pid = 20600
        values.type = 1
        values.parentId = this.props.state.Role.fatherName
        values.description = values.description == undefined? " ":values.description
        values.name = values.name == undefined? " ":values.name
        // console.log(values.description.length,values.name.length);
        if(values.name.length<=15 && values.description.length<=15){
          const {actions} = this.props
          actions.userAddRole(values);
        }else{
          Message.error('角色名称或角色描述字数不超过十五字')
        }
      }else{
        Message.error("请填写新增权限角色信息")
      }
    }else{
      let parmas = {
        pid:20611,
        role:data.name ,
        newRole :values.name,
        description :values.description,
      }
      // console.log(parmas);
      if(values.name.length<=15 && values.description.length<=15){
        const {actions} = this.props
        actions.userAddRole(parmas);
      }else{
        Message.error('角色名称或角色描述字数不超过十五字')
      }
    }

  };


  render() {
    // console.log(this.props.state.Role.fatherName)
    return (
    <div>
      <IceContainer>
             <TableFilter 
             fatherName = {this.props.state.Role.fatherName}
             handleSumbit={(obj)=>this.handleSumbit(obj)}/>
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
