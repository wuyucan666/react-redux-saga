
import React, { useEffect, useState } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import CustomTable from './CustomTable';
import { Message } from '@alifd/next';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import nw from '../../../../../common/http/post'
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/Version/reducer';
import * as wpMerchantAction from '../../../../../redux/Version/action';
import {GetQueryString} from '../../../../../common/js/filter'


let parmas = {}

export function CustomBraftEditor(props) {
  const [parmas,setParmas] = useState({
    id:GetQueryString('id'),
  });
  useEffect(() => {
    const {actions} = props
    actions.EmptyList()
    actions.VersionDetails(parmas);
  },[]);

  // 确认保存
  const lists = (val) => {
    const par = {
      pid: 20804,
      id: val.id,
      force_update: val.force_update,
      is_reinstall: val.is_reinstall
    }
    nw.post('/', par, function(res) {
      if (res.errorCode == 0) {
        Message.success('编辑成功')
        setTimeout(() => {
          window.location.href = '/#/Version/HistoricalRecordList'
        }, 1000)
      }
    })
  }

  return (
    <div>
      <IceContainer>
        <CustomTable
          handleLists={(obj) => lists(obj)}
          countInfo={props.state.Version.countInfo}
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
  nav1: {
    padding: '10px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  nav: {
    padding: '10px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#21242a'
  },

};