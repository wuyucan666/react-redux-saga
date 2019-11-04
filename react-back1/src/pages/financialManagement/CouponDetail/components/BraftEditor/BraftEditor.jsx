import React,{ useEffect,useState } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import * as pipeAction from '../../../../../redux/FinancialManagement/moneyList/action';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/FinancialManagement/moneyList/reducer';

export function CustomBraftEditor(props) {

  const [status,setStatus] = useState('')

  useEffect(()=>{
    let couponId = window.location.href.split('goodId=')[1]
    let url = window.location.href.split('status=')[1]
    setStatus(url.split('&')[0])
    // console.log(couponId,status);
    const {actions} = props
    actions.GetCouponDetail({
      couponId
    })
  },[])

  const passOn= (val)=>{
    console.log(val);
    const {actions} = props
    actions.CouponPassOn(val)
  }

  const failIn= (val)=>{
    const {actions} = props
    actions.CouponFailIn(val)
  }


  // console.log(props.state.userCoupon.detail);
  return (
    <div>
    <IceContainer>
        <TableFilter  
        detail={props.state.userCoupon.detail}
        passOn={(val)=>passOn(val)}
        failIn={(val)=>failIn(val)}
        status={status}
        //  info={this.props.state.EditMessage.detail}
        />
    </IceContainer>
    </div>
  );
}


//redux
const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(pipeAction, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'userCoupon', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);