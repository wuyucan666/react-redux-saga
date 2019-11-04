import React, {Component} from 'react';
import CustomTable from './CustomTable';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import {connect} from 'react-redux';
import {compose, bindActionCreators} from 'redux';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/Setting/reducer';
import * as settingAction from '../../../../../redux/Setting/action';

class CustomBraftEditor extends Component {
  static displayName = 'CustomBraftEditor';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {}
    };
  }

  componentDidMount() {
    let id = '';
    const {actions} = this.props;
    if (window.location.href.split('?').length > 1) {
      id = window.location.href.split('?')[1].split('=')[1];
      actions.NewsBulletinDetail({id})
    };
  };

  handleOnSaveNews = (val) => { // 保存
    const {actions} = this.props
    if (val.id) {
      actions.NewsBulletinEdit(val)
    } else {
      actions.NewsBulletinAdd(val)
    }
  };

  render() {
    return(
      <div>
        <IceContainer>
          <CustomTable
            handleOnSaveNews={this.handleOnSaveNews}
            value={this.props.state.setting.detail}
          />
        </IceContainer>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {state};
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(settingAction, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({
  key: 'setting',
  reducer
});

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);

const styles = {
  nav1: {
    padding: '10px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  nav: {
    padding: '10px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#21242a'
  },

};