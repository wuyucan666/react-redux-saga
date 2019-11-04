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
import * as CouponAction from '../../../../../redux/FinancialManagement/moneyList/action';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/FinancialManagement/moneyList/reducer';

let beforeExport =''
// let parmas ={
//   page:1
// }

export function CustomBraftEditor(props){
    const displayName = 'CustomBraftEditor';
    const [parmas,setParmas] = useState({page:1});
    const [value,setValue] = useState({});
    // useEffect(() => {
    //   console.log(123)
    // });

    const handleConChange = (values) => {
      // parmas = values
      values.limit = 20
      values.page = 1
      setValue(values)
      const {actions} = props;
      actions.GetCouponList(values)
      // console.log(values);
    };

    const handlePage = (page) => {
      parmas.page=page
      const {actions} = props
      actions.GetCouponList({
        ...value,
        page
      })
    }

    return(
      <div>
      <IceContainer>
        <TableFilter 
        handleConChange={(obj)=>handleConChange(obj)} 
        />
      </IceContainer>
      <IceContainer>
          <CustomTable 
          couponList={props.state.userCoupon.couponList}
          handlePage = {(page)=>handlePage(page)} 
          parmas = {parmas} 
          total = {props.state.userCoupon.total}
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

const withReducer = injectReducer({ key: 'userCoupon', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);



const styles = {
  nav1:{
    padding:'10px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  nav:{
    padding:'10px',
    fontSize: '20px',
    fontWeight: 'bold',
    color:'#21242a'
  },

};
