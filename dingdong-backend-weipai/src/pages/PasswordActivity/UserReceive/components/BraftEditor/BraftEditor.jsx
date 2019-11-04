
import React, { useEffect,useState } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';
import { Message } from '@alifd/next';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/PasswordActivity/reducer';
import * as wpMerchantAction from '../../../../../redux/PasswordActivity/action';
import {GetQueryString} from '../../../../../common/js/filter'

  export function CustomBraftEditor(props){
    const displayName = 'CustomBraftEditor';
    const [parmas,setParmas] = useState({
      lotteryId:GetQueryString('id'),
    });
    const [pages,setPage] = useState(1);
    const [total,setTotal] = useState(0);
    const [rewardsSum,setRewardsSum] = useState(0);
    
    useEffect(() => {
      const {actions} = props
      actions.EmptyList()
      setTotal(props.state.passwordActivity.total);
      const Newval = {
        status:1,
        page:1,
        lotteryId:GetQueryString('id'),
      }
      actions.UserReceive(Newval)
      // setRewardsSum(props.state.passwordActivity.rewardsSum)
    },[]);

    useEffect(() => {
      setTotal(props.state.passwordActivity.total)
      // setRewardsSum(props.state.passwordActivity.rewardsSum)
    });

    const handlePage = (page) => {
      setPage(page)
      let val = {
        ...parmas,
        page
      }
      const {actions} = props
      actions.UserReceive(val);
    }

    const lists = (val) => {
      const {actions} = props
      const Newval = {
        page:1,
        lotteryId:GetQueryString('id'),
        ...val
      }
      setPage(1)
      setParmas(Newval)
      actions.UserReceive(Newval)
    }

    

    
    return (
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
          total={total}
          lists = {props.state.passwordActivity.lists}
          rewardsSum = {rewardsSum}
          />
      </IceContainer>
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
)(CustomBraftEditor);