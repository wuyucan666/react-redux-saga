import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import * as userAudit from '../../../../../redux/auUser/UserAudit/action';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/auUser/UserAudit/reducer';

var val = {}
class CustomBraftEditor extends Component {
  static displayName = 'CustomBraftEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }


  handlePage = (obj) => {
    val.page = obj.page
    obj = val
    obj.pid = 20108
    // console.log(this.props.state.pipe.pages);
    const {actions} = this.props
    actions.userAudit(obj);
    actions.userAuditPage(obj.page);
  };

  componentDidMount(){
    const {actions} = this.props
    if ( window.location.hash.split('=')[1]){
      let obj = {}
      obj.status = 0;
      obj.pid = 20108
      actions.userAudit(obj);
    }else{
      actions.userListEmpty();
    }

  }

  handleChange = (rawContent) => {
    console.log(rawContent);
  };

  //子组件传递过来的参数
  handleConChange = (values) => {
    val = values;
    values.page = 1;
    values.pid = 20108;
    values.limit = 15;
    const {actions} = this.props
    //actions.userCondition这个是引入的actions文件里面的方法
    actions.userAudit(values);
    actions.userAuditPage(1);
  };

  Agreed=(id)=>{
    const {actions} = this.props
    //actions.userAuditId这个是引入的actions文件里面的方法
    let data = {
      id,
      pid:20109,
      status:1
    }
    actions.userAuditId(data);
  }

  Rejected = (id) =>{
    const {actions} = this.props
    //actions.userAuditId这个是引入的actions文件里面的方法
    let data = {
      id,
      pid:20109,
      status:2
    }
    actions.userAuditId(data);
  }

  render() {
    return (
      <div>
      <IceContainer>
             <TableFilter  handleConChange={(obj)=>this.handleConChange(obj)}/>
    </IceContainer>
    <IceContainer>
             <CustomTable 
             list = {this.props.state.UserAudit.lists} 
             pages = {this.props.state.UserAudit.pages} 
             total = {this.props.state.UserAudit.total}
             balance = {this.props.state.UserAudit.balance} 
             freezeBalance={this.props.state.UserAudit.freezeBalance}
             margin={this.props.state.UserAudit.margin}
             handlePage = {(obj)=>this.handlePage(obj)}
             Agreed = {(page)=>this.Agreed(page)}
             Rejected = {(page)=>this.Rejected(page)}
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
const withReducer = injectReducer({ key: 'UserAudit', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);