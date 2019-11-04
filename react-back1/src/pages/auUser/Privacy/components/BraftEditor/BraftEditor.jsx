import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import CustomTable from './CustomTable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
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

  handlePage = (content) => {
    console.log(content);
    let parmas ={
      page:content,
      pid:104,
      limit:20,
      uuid:window.location.hash.split('=')[1]
    }
    // console.log(this.props.state.pipe.pages);
    const {actions} = this.props
    actions.invitationList(parmas);
    // actions.userAuditPage(page);
  };

  //页面一进来就执行的方法
componentDidMount(){
  let parmas ={
    pid:20115,
    uuid:window.location.hash.split('uuid=')[1]
  }
  let parmas1 ={
    pid:20116,
    uuid:window.location.hash.split('uuid=')[1]
  }
  const {actions} = this.props
  //actions.userCondition这个是引入的actions文件里面的方法
  actions.privacyList(parmas);
  actions.privacyList(parmas1);

}
    // //子组件传递过来的参数
    // handleConChange = (values) => {
    //   values.page = 1;
    //   values.pid = 104;
    //   values.limit =20;
    //   values.uuid = window.location.hash.split('=')[1];
    //   const {actions} = this.props
    //   //actions.userCondition这个是引入的actions文件里面的方法
    //   actions.invitationList(values);
    //   // actions.userAuditPage(1);
    // };

  handleRawChange = (content) => {
    console.log(content);
  };

  handleChange = (rawContent) => {
    console.log(rawContent);
  };



  render() {
    // console.log(this.props.state.PrivacyList.privacy)
    return (
      <div>
    <IceContainer>
             <CustomTable 
             privacy = {this.props.state.PrivacyList.privacy} 
            //  pages = {this.props.state.UserAudit.pages} 
            //  total = {this.props.state.InviteFriendsList.total}
            //  balance = {this.props.state.UserAudit.balance} 
            //  freezeBalance={this.props.state.UserAudit.freezeBalance}
            //  margin={this.props.state.UserAudit.margin}
            //  handlePage = {(page)=>this.handlePage(page)}
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
  actions: bindActionCreators(userAudit, dispatch)
});

//链接器连接上面2个方法
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

//将返回的数据命名为UserAudit
const withReducer = injectReducer({ key: 'PrivacyList', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);