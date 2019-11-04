import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import * as activityAction from '../../../../../redux/Activity/action';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/Activity/reducer';

class CustomBraftEditor extends Component {
  static displayName = 'CustomBraftEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      values:{}
    };
  }

  componentDidMount(){
    const {actions} = this.props
    // actions.userListEmpty();
  };

  handlePage = (page) => {
    const {actions} = this.props
    let val = Object.assign({},this.state.values)
    val.page = page
    actions.userResultPage(page);
    actions.ActivityCheckList(val);
  }

  handleConChange = (values) => {
    // console.log(this.props);
    const {actions} = this.props
    this.setState({
      values
    })
    actions.ActivityCheckList(values);
    actions.userResultPage(1);
    // console.log(this.props.state.pipe)
  };

  render() {
    return (
      <div>
      <IceContainer>
        <TableFilter 
        handleConChange={(obj)=>this.handleConChange(obj)}
        />
      </IceContainer>
      <IceContainer>
          <CustomTable 
          lists={this.props.state.activity.lists} 
          pages={this.props.state.activity.pages} 
          total={this.props.state.activity.total}
          handlePage = {(page)=>this.handlePage(page)}/>
      </IceContainer>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(activityAction, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'activity', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);
