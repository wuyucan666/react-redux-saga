import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/Setting/reducer';
import * as settingAction from '../../../../../redux/Setting/action';

class CustomBraftEditor extends Component {
  static displayName = 'CustomBraftEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { actions } = this.props
    actions.userListEmpty();
  }

  // 分页
  handlePage = (parmas) => {
    const { actions } = this.props
    actions.userResultPage(parmas.page);
    actions.AdSpokesmanList(parmas);
  }

  // 查询渲染列表
  handleListChange = (values) => {
    values.page = 1
    values.limit = 20
    values.groupName = ''
    const { actions } = this.props
    actions.AdSpokesmanList(values);
    actions.userResultPage(1);
  };

  modifyCommit = (val) => {
    const { actions } = this.props
    actions.wpModifyCommit(val);
  }
  modifyRecord = (val) => {
    const { actions } = this.props
    actions.wpModifyRecord(val);
  }
  // 展示
  SETTINGShowOn = (val) => {
    const { actions } = this.props
    actions.AdSpokesmanShow(val);
  }
  // 不展示
  SETTINGHiden = (val) => {
    const { actions } = this.props
    actions.AdSpokesmanHide(val);
  }
  // 删除
  SETTINGDelte = (val) => {
    const { actions } = this.props
    actions.AdSpokesmanDelete(val);
  }
  // 添加
  AddAD = (val) => {
    const { actions } = this.props
    actions.AdSpokesmanAdd(val);
  }
  // 编辑
  EditAD = (val) => {
    const { actions } = this.props
    actions.AdSpokesmanEdit(val);
  }

  render() {
    return (
      <div>
        <IceContainer >
          <Link to="/setting/AdBanner" style={styles.nav} >
            app首页
          </Link>
          <Link to="/setting/AdFindActivity" style={styles.nav} >
            app发现活动
          </Link>
          <Link to="/setting/AdSpokesman" style={styles.nav1} >
            代言人宣传页
          </Link>
        </IceContainer>
        <IceContainer>
          <TableFilter
            handleListChange={(obj) => this.handleListChange(obj)}
            AddAD={(obj) => this.AddAD(obj)}
          />
        </IceContainer>
        <IceContainer>
          <CustomTable
            lists={this.props.state.setting.SETTINGList}
            pages={this.props.state.setting.pages}
            total={this.props.state.setting.total}
            modification={this.props.state.setting.modification}
            handlePage={(page) => this.handlePage(page)}
            modifyCommit={(val) => this.modifyCommit(val)}
            modifyRecord={(val) => this.modifyRecord(val)}
            SETTINGShowOn={(val) => this.SETTINGShowOn(val)}
            SETTINGHiden={(val) => this.SETTINGHiden(val)}
            SETTINGDelte={(val) => this.SETTINGDelte(val)}
            EditAD={(obj) => this.EditAD(obj)}
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
  actions: bindActionCreators(settingAction, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'setting', reducer });

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
