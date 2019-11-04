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
import reducer from '../../../../../redux/Weipai/Merchant/reducer';
import * as wpMerchantAction from '../../../../../redux/Weipai/Merchant/action';
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
      // setTimeout(() => {
      //   console.log(props.state.wpMerchant.withDrawList);
      // }, 300);
      setTotal(props.state.wpMerchant.withDrawListTotal)
    });

    const handlePage = (page) => {
      setPage(page)
      let val = {
        ...parmas,
        page
      }
      // console.log(val);
      const {actions} = props
      actions.SPList(val);
    }

    const lists = (val) => {
      const {actions} = props
      setParmas(val)
      actions.SPList(val)
      // console.log(val);
    }
    const sortList = (val) => {
      const {actions} = props
      actions.SPSort(val)
    }
    const hideList = (val) => {
      const {actions} = props
      actions.SPShowIt(val)
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
          sortList = {(val)=>sortList(val)} 
          hideList = {(val)=>hideList(val)} 
          pages = {pages} 
          total={total}
          lists = {props.state.wpMerchant.withDrawList}
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
  actions: bindActionCreators(wpMerchantAction, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'wpMerchant', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);