import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';

import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/orderManagement/Merchant/reducer';
import * as AuOrder from '../../../../../redux/orderManagement/Merchant/action';
import { Message } from '@alifd/next';


let parmas = {
  pid: 20500,
  limit: '',
};

class CustomBraftEditor extends Component {
  static displayName = 'CustomBraftEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.userListEmpty();
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
    values.pid = 20500;
    const { actions } = this.props;
    actions.userListEmpty();
    console.log(values);
    if (values.orderSn && values.aid) {
      delete values.orderSn;
      delete values.aid;
      Message.error('订单编号与专场编号二者选其一！');
      return false;
    }

    console.log(values);
    actions.orderCondition(values);
    actions.orderResultPage(1);
  };

  handlePage = (page) => {
    parmas.page = page;
    const { actions } = this.props;
    actions.orderCondition(parmas);
    actions.orderResultPage(page);
  }

  exportData=(val) => {
    delete val.page;
    const { actions } = this.props;
    actions.ExportData(val);
  }

  render() {
    return (
      <div>
        <IceContainer>
          <TableFilter handleConChange={(obj) => this.handleConChange(obj)} exportData={(obj) => this.exportData(obj)} />
        </IceContainer>
        <IceContainer>
          <CustomTable
            handlePage={(page) => this.handlePage(page)}
            lists={this.props.state.AuOrder.lists}
            pages={this.props.state.AuOrder.pages}
            total={this.props.state.AuOrder.total}
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
  actions: bindActionCreators(AuOrder, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'AuOrder', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);
