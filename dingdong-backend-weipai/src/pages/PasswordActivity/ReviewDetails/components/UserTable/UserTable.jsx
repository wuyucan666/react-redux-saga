import React, { useEffect, useState } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import UserSearch from './UserSearch';
import { Message } from '@alifd/next';

import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/PasswordActivity/reducer';
import * as wpMerchantAction from '../../../../../redux/PasswordActivity/action';
import { GetQueryString } from '../../../../../common/js/filter';

export function UserTable(props) {
  const displayName = 'UserTable';
  const [parmas, setParmas] = useState({
    id: GetQueryString('id'),
  });
  const [pages, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // setTimeout(() => {
    //   console.log(props.state.wpMerchant.withDrawList);
    // }, 300);
    const { actions } = props;
    actions.EmptyList();
    actions.ReviewDetails(parmas);
  }, []);

  const failure = val => {
    const { actions } = props;
    const NewData = {
      pid: 21703,
      id: GetQueryString('id'),
      ...val,
    };
    actions.Tperation(NewData);
  };

  // console.log(this.props.status);
  return (
    <div>
      <UserSearch
        details={props.state.passwordActivity.details}
        failure={val => failure(val)}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(wpMerchantAction, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'passwordActivity', reducer });

export default compose(
  withReducer,
  withConnect
)(UserTable);
