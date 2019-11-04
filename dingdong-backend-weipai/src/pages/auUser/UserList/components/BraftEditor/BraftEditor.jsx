import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';

import { connect } from 'react-redux';
import { compose , bindActionCreators } from 'redux';

import * as userAudit from '../../../../../redux/auUser/UserAudit/action';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/auUser/UserAudit/reducer';

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

  handlePage = (content) => {
    const parmas = {
      page: content,
      pid: 20101,
    };
    // console.log(this.props.state.pipe.pages);
    const { actions } = this.props;
    actions.userList(parmas);
    actions.userListPage(content);
  };

  handleChange = (rawContent) => {
    console.log(rawContent);
  };

  // 子组件传递过来的参数
  handleConChange = (values) => {
    values.page = 1;
    values.pid = 20101;
    const { actions } = this.props;
    // actions.userCondition这个是引入的actions文件里面的方法
    console.log(values);
    actions.userList(values);
    actions.userListPage(1);
  };

  render() {
    console.log(this.props.state);
    return (
      <div>
        <IceContainer>
        <TableFilter handleConChange={(obj) => this.handleConChange(obj)} />
      </IceContainer>
        <IceContainer>
      <CustomTable
               list= {this.props.state.UserList.lists}
               pages= {this.props.state.UserList.pages}
               total= {this.props.state.UserList.total}
               handlePage= {(page) => this.handlePage(page)}
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
  actions: bindActionCreators(userAudit, dispatch),
});

// 链接器连接上面2个方法
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

// 将返回的数据命名为UserList
const withReducer = injectReducer({ key: 'UserList', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);
