
import React, { useEffect,useState } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import UserSearch from './UserSearch';
import { Message } from '@alifd/next';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/PasswordActivity/reducer';
import * as wpMerchantAction from '../../../../../redux/PasswordActivity/action';
import {GetQueryString} from '../../../../../common/js/filter'

export function UserTable(props){
  const displayName = 'UserTable';
  const [parmas,setParmas] = useState({
    id:GetQueryString('id'),
  });
  const [pages,setPage] = useState(1);
  const [total,setTotal] = useState(0);
  
  useEffect(() => {
    // setTimeout(() => {
    //   console.log(props.state.wpMerchant.withDrawList);
    // }, 300);
    const {actions} = props
    actions.EmptyList();
    if( GetQueryString('id') ){
      actions.DdCreate(parmas);
    }
  },[]);

  const failure = (val) => {
    const {actions} = props
    let NewData = {
      pid:11234345,
      id:GetQueryString('id'),
      ...val
    }
    actions.Tperation(NewData)
  }

  const add = (val) => {
    const data = val
    const {actions} = props
    let NewData = {
      pid:11234345,
      id:GetQueryString('id'),
      data:data

    }
    console.log(NewData)
    // actions.Tperation(NewData)
  }


  const generate = () => {

    const {actions} = props
    let NewData = {
      // pid:10310,
    }
    actions.Generate(NewData)
  }
  
  const GetCoupons = (val) => {
    const {actions} = props
    let NewData = {
      status:0,
      type:2,
      ...val
    }
    actions.GetCoupons(NewData)
  }

  const CreateActivity = (val) => {
    const {actions} = props
    val.startTime = Date.parse(val.startTime)/1000
    val.endTime = Date.parse(val.endTime)/1000
    let NewData = {
      ...val
    }
    actions.CreateActivity(NewData)
  }
  
  
    return (
      <div>
        <UserSearch 
        failure = {(val)=>failure(val)}
        add = {(val)=>add(val)}
        GetCoupons = {(val)=>GetCoupons(val)}
        CreateActivity = {(val)=>CreateActivity(val)}
        
        generate = {(val)=>generate(val)}
        lists={props.state.passwordActivity.lists} 
        details={props.state.passwordActivity.details}
        ddToken={props.state.passwordActivity.ddToken}
        />
      </div>
    );
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

const withReducer = injectReducer({ key: 'passwordActivity', reducer });

export default compose(
withReducer,
withConnect
)(UserTable);