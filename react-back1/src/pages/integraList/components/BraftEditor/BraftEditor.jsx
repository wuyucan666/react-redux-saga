import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';
import { Message } from '@alifd/next';


import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import * as accountAction from '../../../../redux/integraList/action';
import injectReducer from '../../../../utils/injectReducer';
import reducer from '../../../../redux/integraList/reducer';
import {GetQueryString} from '../../../../common/js/filter'



let parmas ={}
class CustomBraftEditor extends Component {
  static displayName = 'CustomBraftEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      mobile:''
    };
  }

  componentDidMount(){
    if( window.location.hash.split('=')[1]!==undefined){
    let values = {}
    values.page = 1
    values.uuid =  GetQueryString('uuid');
    // console.log(this.props);
    this.handleConChange(values)
    }
  }

  
  handlePage = (page) => {
    parmas.page=page
    const {actions} = this.props
    actions.userCondition(parmas);
    actions.userResultPage(page);
  }

  handleConChange = (values) => {
    console.log(values)
    if(values.mobile || values.nickname || values.realname || values.uuid){
      parmas = values
      values.page = 1
      // console.log(values);
      const {actions} = this.props
      actions.EmptyList();
      actions.userCondition(values);
      actions.userResultPage(1);
      // actions.FreezeRecord({
      //   mobile:values.mobile,
      //   type:0,
      //   moneyType:1,
      //   startTime:0,
      //   endTime:0
      // });
      this.setState({
        mobile:values.mobile
      })
      // console.log(this.props.state.pipe)
    }else{
      Message.error('请输入用户手机、昵称、姓名、uuid其中之一')
    }
  };

  render() {
    console.log(this.props.state.integraList);
    return (
    <div>
      <IceContainer>
          <TableFilter
          handleConChange={(obj)=>this.handleConChange(obj)} />
      </IceContainer>
      <IceContainer>
          <CustomTable
          mobile= {this.state.mobile}
          lists={this.props.state.integraList.lists} 
          recordList={this.props.state.integraList.recordList}
          nickname={this.props.state.integraList.nickname}
          pages={this.props.state.integraList.pages} 
          total={this.props.state.integraList.total}
          balance={this.props.state.integraList.balance}
          freezeBalance={this.props.state.integraList.freezeBalance}
          margin={this.props.state.integraList.margin}
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
  actions: bindActionCreators(accountAction, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'integraList', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);
