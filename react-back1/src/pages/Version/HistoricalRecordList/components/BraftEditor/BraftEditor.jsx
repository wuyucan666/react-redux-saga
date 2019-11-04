
import React, { useEffect,useState } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';
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
    const [parmas,setParmas] = useState();
    const [pages,setPage] = useState(1);
    const [total,setTotal] = useState(0);
    
    useEffect(() => {
      // setTimeout(() => {
      //   console.log(props.state.wpMerchant.withDrawList);
      // }, 300);
      const {actions} = props
      const NewVal = {
        source:2,
        page:1
      }
      actions.EmptyList();
      actions.HistoricalRecordList(NewVal)
      setTotal(props.state.Version.total);
    },[]);

    useEffect(() => {
      // setTimeout(() => {
      //   console.log(props.state.wpMerchant.withDrawList);
      // }, 300);
      setTotal(props.state.Version.total)
    });

    const handlePage = (page) => {
      setPage(page)
      let val = {
        ...parmas,
        page
      }
      // console.log(val);
      const {actions} = props
      actions.HistoricalRecordList(val);
    }

    const lists = (val) => {
      const {actions} = props
      const Newval = {
        page:1,
        ...val
      }
      setPage(1)
      setParmas(Newval)
      actions.HistoricalRecordList(Newval)
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
    console.log(props.state.Version)
    return (
      <div>
      <IceContainer >
      <Link  to="/Version/Release"  style={styles.nav} >
      版本发布
      </Link>
      <Link  to="/Version/HistoricalRecordList" style={styles.nav1} >
      版本历史记录
      </Link>
    </IceContainer> 
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
          lists = {props.state.Version.lists}
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