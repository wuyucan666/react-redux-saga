import React, { useEffect, useState } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';
import { Message } from '@alifd/next';

import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/PasswordActivity/reducer';
import * as wpMerchantAction from '../../../../../redux/PasswordActivity/action';
import { GetQueryString } from '../../../../../common/js/filter';

export function CustomBraftEditor(props) {
  const displayName = 'CustomBraftEditor';
  const [parmas, setParmas] = useState({});
  const [pages, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [rewardsSum, setRewardsSum] = useState(0);

  useEffect(() => {
    const { actions } = props;
    actions.EmptyList();
    setTotal(props.state.passwordActivity.total);
    // setRewardsSum(props.state.passwordActivity.rewardsSum)
  }, []);

  useEffect(() => {
    setTotal(props.state.passwordActivity.total);
    // setRewardsSum(props.state.passwordActivity.rewardsSum)
  });

  const handlePage = page => {
    setPage(page);
    const val = {
      ...parmas,
      page,
    };
    const { actions } = props;
    actions.EListActivities(val);
  };

  const lists = val => {
    const { actions } = props;
    const Newval = {
      page: 1,
      ...val,
    };
    setPage(1);
    setParmas(Newval);
    actions.EListActivities(Newval);
  };

  const failure = val => {
    const { actions } = props;
    const NewData = {
      pid: 21706,
      ...val,
    };
    actions.Tperation(NewData);
  };

  const freezeRecord = val => {
    const { actions } = props;
    const NewData = {
      ...val,
    };
    actions.IssueRecord(NewData);
  };

  console.log(props.state.passwordActivity);
  return (
    <div>
      <IceContainer>
        <TableFilter handleLists={obj => lists(obj)} />
      </IceContainer>
      <IceContainer>
        <CustomTable
          handlePage={val => handlePage(val)}
          failure={val => failure(val)}
          freezeRecord={val => freezeRecord(val)}
          pages={pages}
          total={total}
          lists={props.state.passwordActivity.lists}
          record={props.state.passwordActivity.record}
          rewardsSum={rewardsSum}
        />
      </IceContainer>
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
)(CustomBraftEditor);
