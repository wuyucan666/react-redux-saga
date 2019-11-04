import React, { useEffect,useState } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import CustomTable from './CustomTable';
import { Link } from 'react-router-dom';
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
    const displayName = 'CustomBraftEditor';
    const [parmas,setParmas] = useState({});
    const [pages,setPage] = useState(1);
    const [total,setTotal] = useState(0);
    useEffect(() => {
      const couponId = window.location.href.split('id=')[1]
      const {actions} = props
      actions.getCouponDetail({
        couponId
      })
      setTotal(props.state.CouponList.total);
    },[]);

    // //提交查询条件
    // const lists = (val) => {
    //   const {actions} = props
    //   setParmas(val)
    //   actions.SPList(val)
    //   // console.log(val);
    // }

    const handlePage = (page) => {
      setPage(page)
      let val = {
        ...parmas,
        page
      }
      // console.log(val);
      const {actions} = props
      // actions.ActivityList(val);
    }

    // console.log(props.state.CouponList.detail);
    return(
      <div>
      <IceContainer>
          <CustomTable 
          detail = {props.state.CouponList.detail}
          handlePage = {(val)=>handlePage(val)} 
          total={total}
          pages = {pages} 
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