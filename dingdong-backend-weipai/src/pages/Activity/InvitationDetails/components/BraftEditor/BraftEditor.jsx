
import React, { useEffect,useState } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import CustomTable from './CustomTable';
import { Message } from '@alifd/next';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/Activity/reducer';
import * as wpMerchantAction from '../../../../../redux/Activity/action';
import {GetQueryString} from '../../../../../common/js/filter'
import { Link } from 'react-router-dom';

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
    const [parmas,setParmas] = useState({
      uuid:GetQueryString('uuid'),
      page:1,
    });
    const [pages,setPage] = useState(1);
    const [total,setTotal] = useState(0);
    
    useEffect(() => {
      // setTimeout(() => {
      //   console.log(props.state.wpMerchant.withDrawList);
      // }, 300);
      const {actions} = props
      actions.EmptyList()
      actions.InvitationDetails(parmas);
      setTotal(props.state.activity.total);
    },[]);

    useEffect(() => {
      // setTimeout(() => {
      //   console.log(props.state.wpMerchant.withDrawList);
      // }, 300);
      setTotal(props.state.activity.total)
    });

    const handlePage = (page) => {
      setPage(page)
      let val = {
        ...parmas,
        page
      }
      // console.log(val);
      const {actions} = props
      actions.InvitationDetails(val);
    }

    console.log(props.state.activity)
    return (
      <div>
        <IceContainer >
        <Link target="_blank" to={`/Activity/InvitationDetails?uuid=${parmas.uuid}`}  style={styles.nav1} >
        基础奖励
        </Link>
        <Link target="_blank" to={`/Activity/InvitationAdditionalDetails?uuid=${parmas.uuid}`} style={styles.nav} >
        额外奖励
        </Link>
      </IceContainer>
      <IceContainer>
          <CustomTable 
          handlePage = {(val)=>handlePage(val)} 
          pages = {pages} 
          total={total}
          lists = {props.state.activity.lists}
          countInfo = {props.state.activity.countInfo}
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