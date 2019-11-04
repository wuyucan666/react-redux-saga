import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';
import {Link} from 'react-router-dom';
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

    };
  };

  componentDidMount() {
    const { actions } = this.props
    actions.userListEmpty();
  };

  handleListChange = (parmas) => { // 查询
    parmas.page = 1;
    parmas.limit = 20;
    parmas.platform = '';
    const {actions} = this.props;
    actions.NewsBulletinList(parmas);
    actions.userResultPage(1);
  };

  handleOnEdit = (id) => { // 編輯
    window.location.href = `/#/setting/EditNewsBulletin?id=${id}`
  };

  handleOnRelease = (parmas) => { // 发布
    const {actions} = this.props;
    actions.NewsBulletinRelease(parmas)
  };

  handleOnLowerShelf = (parmas) => { // 下架
    const {actions} = this.props;
    actions.NewsBulletinLower(parmas)
  };

  handleOnDelete = (parmas) => { // 删除
    const {actions} = this.props;
    actions.NewsBulletinDelete(parmas)
  };

  render() {
    return(
      <div>
        <IceContainer>
          <Link to="/setting/AdBanner" style={styles.nav} >
            新闻公告
          </Link>
        </IceContainer>
        <IceContainer>
          <TableFilter
            handleListChange={(obj) => this.handleListChange(obj)}
          />
        </IceContainer>
        <IceContainer>
          <CustomTable
            lists={this.props.state.setting.SETTINGList}
            pages={this.props.state.setting.pages}
            total={this.props.state.setting.total}
            modification={this.props.state.setting.modification}
            handlePage={(page) => this.handlePage(page)}
            handleOnEdit={(obj) => this.handleOnEdit(obj)}
            handleOnRelease={(obj) => this.handleOnRelease(obj)}
            handleOnLowerShelf={(obj) => this.handleOnLowerShelf(obj)}
            handleOnDelete={(obj) => this.handleOnDelete(obj)}
          />
        </IceContainer>
      </div>
    );
  };
};

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