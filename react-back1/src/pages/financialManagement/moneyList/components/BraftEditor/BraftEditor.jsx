import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';
import { Message } from '@alifd/next';


import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import * as accountAction from '../../../../../redux/FinancialManagement/moneyList/action';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/FinancialManagement/moneyList/reducer';
import { GetQueryString } from '../../../../../common/js/filter';


let parmas = {};
class CustomBraftEditor extends Component {
  static displayName = 'CustomBraftEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
    };
  }

  componentDidMount() {
    if (window.location.hash.split('=')[1] !== undefined) {
      const values = {};
      values.page = 1;
      values.uuid = GetQueryString('uuid');
      // console.log(this.props);
      const { actions } = this.props;
      actions.userCondition(values);
    }
  }


  handlePage = (page) => {
    parmas.page = page;
    const { actions } = this.props;
    actions.userCondition(parmas);
    actions.userResultPage(page);
  }
  Freeze=(val) => {
    // console.log(val)
    const { actions } = this.props;
    actions.Freeze(val);
  }
  unFreeze=(val) => {
    const { actions } = this.props;
    actions.UnFreeze(val);
  }

  handleConChange = (values) => {
    console.log(values);
    // if(values.mobile || values.nickname || values.realname){
    //   parmas = values
    //   values.page = 1
    //   const {actions} = this.props
    //   actions.EmptyList();
    //   actions.userCondition(values);
    //   actions.userResultPage(1);
    //   this.setState({
    //     mobile:values.mobile
    //   })
    // }else{
    //   Message.error('请输入用户手机、昵称、姓名其中之一')
    // }
    if ((values.date && values.date.length !== 0) || (values.dateStamp && values.dateStamp !== null)) {
      parmas = values;
      values.page = 1;
      const { actions } = this.props;
      actions.EmptyList();
      if (!values.hasOwnProperty('type')) {
        values.type = '';
      }
      if (!values.hasOwnProperty('trade')) {
        values.trade = '';
      }
      actions.userCondition(values);
      actions.userResultPage(1);
      this.setState({
        mobile: values.mobile || '',
      });
    } else {
      Message.error('请输入时间区间或者日期条件进行查询！');
    }
  };

  exportData=(val) => {
    delete val.page;
    const { actions } = this.props;
    actions.userExportData(val);
  }

  render() {
    return (
      <div>
        <IceContainer>
          <TableFilter
            handleConChange={(obj) => this.handleConChange(obj)}
            exportData={(obj) => this.exportData(obj)}
          />
        </IceContainer>
        <IceContainer>
          <CustomTable
            mobile={this.state.mobile}
            lists={this.props.state.userAccount.lists}
            recordList={this.props.state.userAccount.recordList}
            nickname={this.props.state.userAccount.nickname}
            pages={this.props.state.userAccount.pages}
            total={this.props.state.userAccount.total}
            balance={this.props.state.userAccount.balance}
            freezeBalance={this.props.state.userAccount.freezeBalance}
            freezeMargin={this.props.state.userAccount.freezeMargin}
            margin={this.props.state.userAccount.margin}
            handlePage={(page) => this.handlePage(page)}
            freeze={(val) => this.Freeze(val)}
            unfreeze={(val) => this.unFreeze(val)}
          />
        </IceContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(accountAction, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'userAccount', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);
