import React, { useEffect,useState } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import CustomTable from './CustomTable';
// import { Message } from '@alifd/next';
//redux
import {getQuery} from '../../../../../common/js/filter'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/Activity/reducer';
import * as ActAction from '../../../../../redux/Activity/action';
let beforeExport =''
// let parmas ={
//   page:1
// }

export function CustomBraftEditor(props){
    const displayName = 'CustomBraftEditor';
    useEffect(() => {
      const id = getQuery(1)
      const {ActivityCheck} = props.actions
      console.log(id);
      ActivityCheck({id})
      // actions.getCouponDetail({
      //   couponId
      // })
    },[]);


    const onOK = (val) => {
      let info = {
        checkRemark:val,
        status:4,
        id:getQuery(1)
      }
      const {actions} = props
      actions.ActCheckDetailHandle(info);
    }

    const onFail = (val) => {
      let info = {
        checkRemark:val,
        id:getQuery(1),
        status:-4
      }
      const {actions} = props
      actions.ActCheckDetailHandle(info);
    }


    // console.log(props.state.Activity.lists);
    return(
      <div>
      <IceContainer>
          <CustomTable 
          detail = {props.state.Activity.detail}
          onOK = {(val)=>onOK(val)} 
          onFail = {(val)=>onFail(val)}
          />
      </IceContainer>
      </div>
    )
}

//redux
const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActAction, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'Activity', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);