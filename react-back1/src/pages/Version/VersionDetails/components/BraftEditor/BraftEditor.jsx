
import React, { useEffect,useState } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import CustomTable from './CustomTable';
import { Message } from '@alifd/next';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/Version/reducer';
import * as wpMerchantAction from '../../../../../redux/Version/action';
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
      id:GetQueryString('id'),
    });
    useEffect(() => {
      const {actions} = props
      actions.EmptyList()
      actions.VersionDetails(parmas);
    },[]);

    console.log(props.state.Version);

    return (
      <div>
      <IceContainer>
          <CustomTable 
          countInfo = {props.state.Version.countInfo}
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