
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
import reducer from '../../../../../redux/Activity/reducer';
import * as wpMerchantAction from '../../../../../redux/Activity/action';
import {GetQueryString} from '../../../../../common/js/filter'

let parmas ={}
// class CustomBraftEditor extends Component {
//   static displayName = 'CustomBraftEditor';

//   static propTypes = {};

//   static defaultProps = {};

//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

  export function CustomBraftEditor(props){
    const displayName = 'CustomBraftEditor';
    const [parmas,setParmas] = useState({});
    const [pages,setPage] = useState(1);
    const [total,setTotal] = useState(0);
    const [rewardsSum,setRewardsSum] = useState(0);
    
    useEffect(() => {
      // setTimeout(() => {
      //   console.log(props.state.wpMerchant.withDrawList);
      // }, 300);
      const {actions} = props
      actions.EmptyList()
      setTotal(props.state.activity.total);
      setRewardsSum(props.state.activity.rewardsSum)
    },[]);

    useEffect(() => {
      // setTimeout(() => {
      //   console.log(props.state.wpMerchant.withDrawList);
      // }, 300);
      setTotal(props.state.activity.total)
      setRewardsSum(props.state.activity.rewardsSum)
    });

    const handlePage = (page) => {
      setPage(page)
      let val = {
        ...parmas,
        page
      }
      // console.log(val);
      const {actions} = props
      actions.RegisteredList(val);
    }

    const lists = (val) => {
      const {actions} = props
      const Newval = {
        page:1,
        ...val
      }
      setPage(1)
      setParmas(Newval)
      actions.RegisteredList(Newval)
      // console.log(val);
    }
    // const sortList = (val) => {
    //   const {actions} = props
    //   actions.SPSort(val)
    // }
    // const hideList = (val) => {
    //   const {actions} = props
    //   actions.SPShowIt(val)
    // }
    console.log(props.state.activity)
    console.log(pages)
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
          sortList = {(val)=>sortList(val)} 
          hideList = {(val)=>hideList(val)} 
          pages = {pages} 
          total={total}
          lists = {props.state.activity.lists}
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

const withReducer = injectReducer({ key: 'activity', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);