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
import TableFilter from './TableFilter';

let data = {}
class CustomBraftEditor extends Component {
  static displayName = 'CustomBraftEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }



  //页面一进来就执行的方法
componentDidMount(){
  let parmas ={
    page:1,
    pid:20118,
    limit:20,
    uuid:window.location.href.split('&')[2].split('=')[1],
    status: 9
  }
  const {actions} = this.props
  //actions.userCondition这个是引入的actions文件里面的方法
  actions.invitationList(parmas);

}


handleConChange = (values) => {
  data = values
  let parmas ={
    page:1,
    pid:20118,
    limit:20,
    status:values.status,
    uuid:window.location.href.split('&')[2].split('=')[1],
    date:values.date
    
  }
  // console.log(this.props.state.pipe.pages);
  const {actions} = this.props
  actions.invitationList(parmas);

};


handlePage = (content) => {

  if( data ){
    data.status = 9
  }
  data.page = content;
  data.pid = 20118;
  data.limit = 20;
  data.uuid = window.location.href.split('&')[2].split('=')[1];
  let parmas = data
  console.log(parmas)
  // parmas = {
  //   page:content,
  //   pid:20118,
  //   limit:20,
  //   uuid:window.location.href.split('&')[2].split('=')[1]
  // }
  // console.log(this.props.state.pipe.pages);
  const {actions} = this.props
  actions.invitationList(parmas);
  actions.userAuditPage(content);
};
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
    console.log(this.props.state.InviteFriendsList)
    return (
      <div>
    <IceContainer>
        <TableFilter
        handleConChange={(obj)=>this.handleConChange(obj)} />
    </IceContainer>
    <IceContainer>
             <CustomTable 
             list = {this.props.state.InviteFriendsList.lists} 
             pages = {this.props.state.InviteFriendsList.pages} 
             total = {this.props.state.InviteFriendsList.total}
            //  balance = {this.props.state.UserAudit.balance} 
            //  freezeBalance={this.props.state.UserAudit.freezeBalance}
            //  margin={this.props.state.UserAudit.margin}
             handlePage = {(page)=>this.handlePage(page)}
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
const withReducer = injectReducer({ key: 'InviteFriendsList', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);