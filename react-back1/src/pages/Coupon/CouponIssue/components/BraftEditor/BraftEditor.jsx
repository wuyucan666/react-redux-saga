
import React, { useEffect,useState } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
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
  // const [pages,setPage] = useState(1);
  // const [total,setTotal] = useState(1);
  useEffect(() => {
    let couponId = window.location.hash.split('couponId=')[1]
    if(couponId){
      const {actions} = props
      actions.getCouponDetail({couponId})
    }
  },[]);


  //发送优惠券
  const send = (val) => {
    const {actions} = props
    // setParmas(val)
    console.log(val);
    actions.sendThisCoupon(val)
    // console.log(val);
  }
  const getShopId = (val) => {
    const {actions} = props
    console.log(val)
    actions.getShopInfo(val)
  }
  // console.log(props.state.CouponList.info)
  return(
    <div>
    <IceContainer>
        <TableFilter 
        detail = {props.state.CouponList.detail.detail}
        info = {props.state.CouponList.info}
        send={(obj)=>send(obj)} 
        getShopId={(obj)=>getShopId(obj)}
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