
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import CustomTable from './CustomTable';
import TableFilter from './TableFilter';
import Detail from './Detail';
import { Message } from '@alifd/next';

import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/PasswordActivity/reducer';
import * as wpMerchantAction from '../../../../../redux/PasswordActivity/action';
import { GetQueryString } from '../../../../../common/js/filter';

let parmas = {
  pid: 21705,
  limit: '',
};

class CustomBraftEditor extends Component {
  static displayName = 'CustomBraftEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      row: {},
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    // actions.EmptyList();
  }

  handleRawChange = (content) => {
    console.log(content);
  };

  handleChange = (rawContent) => {
    console.log(rawContent);
  };

  handleConChange = (values) => {
    // console.log(values)
    parmas = values;
    values.page = 1;
    values.limit = 20;
    values.pid = 21705;
    values.id = GetQueryString('id');
    const { actions } = this.props;
    // actions.EmptyList();
    console.log(values);

    actions.IssueRecord(values);
    actions.userResultPage(1);
  };

  handlePage = (page) => {
    parmas.page = page;
    const { actions } = this.props;
    actions.IssueRecord(parmas);
    actions.userResultPage(page);
  }
  // 去详情
  goToDetail = (row) => {
    this.setState({
      isShow: true,
      row,
    });
  }
  handleBack = () => {
    this.setState({
      isShow: false,
    });
  }
  render() {
    return (
      <div>
        {
          !this.state.isShow ?
          (
            <div>
              <IceContainer>
                <TableFilter handleConChange={(obj) => this.handleConChange(obj)} />
              </IceContainer>
              <IceContainer>
                <CustomTable
                  handlePage={(page) => this.handlePage(page)}
                  lists={this.props.state.passwordActivity.list}
                  pages={this.props.state.passwordActivity.page}
                  total={this.props.state.passwordActivity.total}
                  goToDetail={(o) => this.goToDetail(o)}
                />
              </IceContainer>
            </div>
          ) :
          (
            <Detail detail={this.state.row} handleBack={this.handleBack} />
          )
        }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => ({
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
