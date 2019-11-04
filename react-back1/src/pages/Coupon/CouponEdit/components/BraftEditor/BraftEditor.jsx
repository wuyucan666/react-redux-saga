
import React, { useEffect } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
// import { Link } from 'react-router-dom';
// import { Message } from '@alifd/next';
//redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/Coupons/reducer';
import * as CouponAction from '../../../../../redux/Coupons/action';
let beforeExport =''
// let parmas ={
//   page:1
// }

export function CustomBraftEditor(props){

  useEffect(() => {
  });


  //提交查询条件
  const commit = (val) => {
    const {actions} = props
    actions.addCoupon(val)
  }

  return(
    <div>
    <IceContainer>
          <TableFilter 
          commit={(obj)=>commit(obj)} 
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
  actions: bindActionCreators(CouponAction, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'CouponList', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);