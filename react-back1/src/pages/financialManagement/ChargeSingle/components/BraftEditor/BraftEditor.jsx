import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import * as singleAction from '../../../../../redux/FinancialManagement/ChargeSingle/action';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/FinancialManagement/ChargeSingle/reducer';


class CustomBraftEditor extends Component {
  static displayName = 'CustomBraftEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount(){
  //   let keyWord = window.location.hash.split('=')[1]
  //   // console.log(keyWord);
  //   const {actions} = this.props
  //   actions.userInfoReq({
  //     pid:20102,
  //     keyWord
  //   });
  // }20219
  
  //子组件传递过来的参数
  handleConChange = (values) => {
    const {actions} = this.props
    values.pid = 20214
    // console.log(values)
    //actions.userCondition这个是引入的actions文件里面的方法
    actions.userCondition(values);
  };

  handleSearch = (moblie)  => {
    // console.log(moblie)
        const {actions} = this.props
        actions.userInfoReq({
          pid:20102,
          keyWord:moblie
        });
  }
  handleSearchCard = (type)  => {
    // console.log(param)
        const {actions} = this.props
        actions.userInfoReq({
          pid:20219,
          type //0-全部,1-银行，2-支付宝，3-微信
        });
  }


  render() {
    // console.log(this.props.state.card)
    return (
    <div>
      <IceContainer>
          <TableFilter 
          info = {this.props.state.info}
          card = {this.props.state.card}
          handleConChange={(obj)=>this.handleConChange(obj)}
          handleSearch={(mob) => this.handleSearch(mob)}
          handleSearchCard={(param) => this.handleSearchCard(param)}/>
      </IceContainer>
    </div>
    );
  }
}


const mapStateToProps = (state) => {
  return { state:state.singleOrder};
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(singleAction, dispatch)
});

//链接器连接上面2个方法
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

//将返回的数据命名为singleOrder
const withReducer = injectReducer({ key: 'singleOrder', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);
