
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
      id:GetQueryString('id'),
    });
    const [pages,setPage] = useState(1);
    const [total,setTotal] = useState(0);
    const [rewardsSum,setRewardsSum] = useState(0);
    
    useEffect(() => {
      const {actions} = props
      actions.EmptyList()
      setTotal(props.state.passwordActivity.total);
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
      actions.DdListActivities(val);
    }

    const lists = (val) => {
      const {actions} = props
      const Newval = {
        page:1,
        ...val
      }
      setPage(1)
      setParmas(Newval)
      actions.DdListActivities(Newval)
    }

    // const release = (val) => {
    //   const {actions} = props
    //   let NewData = {
    //     pid:11234345,
    //     ...val
    //   }
    //   actions.Tperation(NewData)
    // }

    const Delete = (val) => {
      const {actions} = props
      let NewData = {
        pid:21807,
        ...val
      }
      actions.Tperation(NewData)
    }

    const audit = (val) => {
      const {actions} = props
      let NewData = {
        pid:21803,
        id:GetQueryString('id'),
        ...val
      }
      actions.Tperation(NewData)
    }
    
    const failure = (val) => {
      console.log(val)
      const {actions} = props
      let NewData = {
        pid:21806,
        ...val
      }
      actions.Tperation(NewData)
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
          // release = {(val)=>release(val)} 
          Delete = {(val)=>Delete(val)} 
          audit = {(val)=>audit(val)}
          failure = {(val)=>failure(val)}
          
          
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