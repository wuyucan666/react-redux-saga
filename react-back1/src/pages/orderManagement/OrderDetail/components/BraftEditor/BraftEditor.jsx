import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/orderManagement/Merchant/reducer';
import * as WPOrderAction from '../../../../../redux/orderManagement/Merchant/action';

class CustomBraftEditor extends Component {
  static displayName = 'CustomBraftEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    const orderSn = window.location.hash.split('=')[1].split('&')[0]
    const type = window.location.hash.split('=')[2]
    const {actions} = this.props
    actions.orderDetailList({
      pid:20501,
      orderSn
    })
    // actions.orderDetailInfo({
    //   pid:20506,
    //   orderSn
    // })
  }

  handleRawChange = (content) => {
    console.log(content);
  };

  handleChange = (rawContent) => {
    console.log(rawContent);
  };

  render() {
    // console.log(this.props.state);
    const {info,order} = this.props.state
    return (
      <div>
      <IceContainer>
          <TableFilter
          info = {info}
          order = {order}
          />
    </IceContainer>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { state:state.WPOrder };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(WPOrderAction, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'WPOrder', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);
