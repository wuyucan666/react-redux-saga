
import React, { useEffect,useState } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import { Message } from '@alifd/next';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/Version/reducer';
import * as wpMerchantAction from '../../../../../redux/Version/action';
import {GetQueryString} from '../../../../../common/js/filter'


let parmas ={}


  export function CustomBraftEditor(props){
    const displayName = 'CustomBraftEditor';
    const [parmas,setParmas] = useState({});
    const [pages,setPage] = useState(1);
    const [total,setTotal] = useState(0);
    
    useEffect(() => {
      const {actions} = props
      actions.EmptyList()
    },[]);


    const lists = (val) => {
      const {actions} = props
      const Newval = {
        ...val
      }
      actions.Release(Newval)
    }

    console.log(props.state.Version)
    return (
      <div>
      <IceContainer >
      <Link  to="/Version/Release"  style={styles.nav1} >
        版本发布
      </Link>
      <Link  to="/Version/HistoricalRecordList" style={styles.nav} >
        版本历史记录
      </Link>
    </IceContainer> 
      <IceContainer>
          <TableFilter 
            handleLists={(obj)=>lists(obj)} 
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

const withReducer = injectReducer({ key: 'Version', reducer });

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