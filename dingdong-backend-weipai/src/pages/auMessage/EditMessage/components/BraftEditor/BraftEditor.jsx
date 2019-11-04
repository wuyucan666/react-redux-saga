import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/auMessage/Merchant/reducer';
import * as auMessage from '../../../../../redux/auMessage/Merchant/action';

class CustomBraftEditor extends Component {
  static displayName = 'CustomBraftEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleRawChange = (content) => {
    console.log(content);
  };

  handleChange = (rawContent) => {
    console.log(rawContent);
  };

  handleConChange = (values) => {
    values.pid=20700
    if(values.sendTime){
      values.sendTime = Date.parse(values.sendTime)/1000
    }else{
      values.sendTime = 0;
    }
    const {actions} = this.props
    actions.editMessage(values);
  };

  //页面一进来就执行的方法
  // componentDidMount(){
  //   this.props.actions.editdetailsMessage({
  //     pid:702,
  //     id:window.location.hash.split('=')[1],
  //   });
  // }


  render() {
    return (
      <div>
      <IceContainer>
             <TableFilter  
             handleConChange={(obj)=>this.handleConChange(obj)}
            //  info={this.props.state.EditMessage.detail}
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
  actions: bindActionCreators(auMessage, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'EditMessage', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);