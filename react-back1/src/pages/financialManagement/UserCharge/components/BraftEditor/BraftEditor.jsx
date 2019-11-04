import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';
import { Link } from 'react-router-dom';
// import { Message } from '@alifd/next';
// redux
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import * as pipeAction from '../../../../../redux/FinancialManagement/UserPipelineQuery/action';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/FinancialManagement/UserPipelineQuery/reducer';

let parmas = {};
let beforeExport = '';
const obj = {};
class CustomBraftEditor extends Component {
  static displayName = 'CustomBraftEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }


  componentDidMount() {
    const val = {
      page: 1,
      // cashType: 'C'
    };
    const { actions } = this.props;
    actions.userEncCondition(val);
  }

  handleRawChange = (content) => {
    console.log(content);
  };

  handleChange = (rawContent) => {
    console.log(rawContent);
  };

  handleConChange = (values) => {
    parmas = values;
    values.page = 1;
    const { actions } = this.props;
    if (!values.hasOwnProperty('cashType')) {
      values.cashType = 'C,S,M,G';
    }
    if (!values.hasOwnProperty('payType')) {
      values.payType = '0';
    }
    actions.userEncCondition(values);
    actions.userEncResultPage(1);
    // console.log(this.props.state.pipe)
  };

  handleExportData = (val) => {
    const { actions } = this.props;
    actions.userEncExport(val);
    setTimeout(() => {
      const { exportUrl } = this.props.state.pipe;
      if (beforeExport !== exportUrl) {
        window.location.href = exportUrl;
        // console.log(exportUrl,beforeExport)
        beforeExport = exportUrl;
      }
    }, 1000);
  }

  // 页面跳转
  handlePage = (page) => {
    parmas.page = page;
    parmas.cashType ? parmas.cashType : parmas.cashType = 'C';
    // console.log(this.props.state.pipe);
    const { actions } = this.props;
    actions.userEncCondition(parmas);
    actions.userEncResultPage(page);
  }

  render() {
    // console.log(this.props.state.pipe)

    return (
      <div>
        <IceContainer >
          <Link to="/financialManagement/UserPipelineQuery" style={styles.nav} >
        提现记录
          </Link>
          <Link to="/financialManagement/UserCharge" style={styles.nav1} >
        充值记录
          </Link>
        </IceContainer>
        <IceContainer>
          <TableFilter
            handleConChange={(obj) => this.handleConChange(obj)}
            handleExportData={(obj) => this.handleExportData(obj)}
          />
        </IceContainer>
        <IceContainer>
          <CustomTable
            lists={this.props.state.pipe.encLists}
            enPages={this.props.state.pipe.enPages}
            total={this.props.state.pipe.encPageTotal}
            handlePage={(page) => this.handlePage(page)}
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
  actions: bindActionCreators(pipeAction, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'userPipe', reducer });

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
    color: '#21242a',
  },

};
