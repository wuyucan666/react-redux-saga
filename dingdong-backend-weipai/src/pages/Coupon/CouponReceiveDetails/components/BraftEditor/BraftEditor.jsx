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
import {GetQueryString} from '../../../../../common/js/filter'
let beforeExport =''
// let parmas ={
//   page:1
// }
let parmas ={}
export function CustomBraftEditor(props){
    const displayName = 'CustomBraftEditor';
    const [parmas,setParmas] = useState({
      couponId:GetQueryString('id'),
      page:1,
    });
    const [pages,setPage] = useState(1);
    const [total,setTotal] = useState(0);
    useEffect(() => {
      const shopId = GetQueryString('businessLimit')
      const couponId = GetQueryString('id')
      const {actions} = props
      actions.EmptyList()
      actions.getReceiveCouponDetail(parmas)
      actions.getCouponDetail({
        couponId
      })
      actions.getShopInfo({
        shopId
      })
      // console.log(props.state.CouponList.detail.list)
    },[]);

  //分页
    const handlePage = (page) => {
      setPage(page)
      let val = {
        ...parmas,
        page
      }
      const {actions} = props
      actions.getReceiveCouponDetail(val);
      
    }
    
    //提交查询条件
    // const lists = (val) => {
    //   const {actions} = props
    //   setParmas(val)
    //   actions.SPList(val)
    //   // console.log(val);
    // }
    //            for( )
    // if( action.response.data.list.address != '' ){
    //   action.response.data.info.address =JSON.parse(action.response.data.info.address)
    // }

    // useEffect(() => {
    //   props.state.CouponList.receive.forEach((item,index) => {
    //     item.userDetail = JSON.parse(item.userDetail)
    //   });
    // })
    // console.log(props.state.CouponList);

    return(
      <div>
      <IceContainer>
          <CustomTable 
          handlePage = {(val)=>handlePage(val)} 
          pages = {pages} 
          total={total}
          info = {props.state.CouponList.info}
          detail={props.state.CouponList.detail.detail}
          lists = {props.state.CouponList.receive}
          shopId = {GetQueryString('businessLimit')}
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