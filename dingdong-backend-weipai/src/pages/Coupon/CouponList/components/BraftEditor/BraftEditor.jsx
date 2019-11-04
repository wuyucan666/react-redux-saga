import React, { useEffect,useState } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
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
    const [total,setTotal] = useState(1);
    useEffect(() => {
      const {actions} = props
      actions.EmptyList()
      setTotal(props.state.CouponList.total)
    },[]);

  //分页
    const handlePage = (page) => {
      setPage(page)
      let val = {
        ...parmas,
        page
      }
      const {actions} = props
      // if(val.amount){
      //   val.amount = Number(val.amount)*100
      // }
      actions.getCouponList(val);
    }

    //提交查询条件
    const lists = (val) => {
      const {actions} = props
      setParmas(val)
      // if(val.amount){
      //   val.amount = Number(val.amount)*100
      // }
      
      actions.getCouponList(val)
      // let a = '/Coupon/CouponIssue'
      // window.location.reload()
      // console.log(window.location.hash,a.indexOf('#/'));
      // window.location.hash=`#/Coupon/CouponIssue`
    }

   //删除优惠券
    const fnDelete = (val) => {
      const {actions} = props
      const {goodId:couponId} =val
      actions.delteThisCoupon({
        couponId
      })
    }
  //撤销优惠券
    const fnUndo = (val) => {
      const {actions} = props
      actions.recallThisCoupon({
        couponId:val
      })
    }
    //失效优惠券
    const fnFailure = (val) => {
      const {actions} = props
      const {goodId:couponId} =val
      actions.InvalidThisCoupon({
        couponId,
      })
    }
  //提审优惠券
    const fnSubmit = (val) => {
      const {actions} = props
      actions.checkThisCoupon(val)
    }
  //发出优惠券
  const fnIssue = (val) => {
    const {actions} = props
    actions.sendThisCoupon(val)
  }

    return(
      <div>
      <IceContainer>
        <TableFilter 
        handleLists={(obj)=>lists(obj)} 
        />
      </IceContainer>
      <IceContainer>
          <CustomTable 
          handlePage = {(val)=>handlePage(val)} 
          pages = {pages} 
          total={props.state.CouponList.total}
          lists = {props.state.CouponList.lists}
          fnDelete = {(val)=>fnDelete(val)} 
          fnUndo = {(val)=>fnUndo(val)} 
          fnFailure = {(val)=>fnFailure(val)} 
          fnSubmit = {(val)=>fnSubmit(val)} 
          fnIssue = {(val)=>fnIssue(val)} 
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