import React, { Component } from 'react';

import DataOverview from './components/DataOverview';
import Notifications from './components/Notifications';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import * as userAudit from '../../redux/auUser/UserAudit/action';
import injectReducer from '../../utils/injectReducer';
import reducer from '../../redux/auUser/UserAudit/reducer';


class Dashboard extends Component {
  static displayName = 'Dashboard';

  static propTypes = {};

  static defaultProps = {};

  componentDidMount(){
    const {actions} = this.props
    let obj = {
      pid:20000
    }
    actions.userdashBoard(obj);
  }


  render() {
    return (
      <div className="dashboard-page">
        {/* <DataOverview /> */}
        <Notifications dashboardObj={this.props.state.UserAudit.dashboardObj} />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(userAudit, dispatch)
});

//链接器连接上面2个方法
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

//将返回的数据命名为UserAudit
const withReducer = injectReducer({ key: 'UserAudit', reducer });

export default compose(
  withReducer,
  withConnect
)(Dashboard);
