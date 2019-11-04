import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import { withRouter } from 'react-router';
import { enquire } from 'enquire-js';

import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import BasicLayoutHoc from './BasicLayoutHoc';
import MainRoutes from './MainRoutes';
import './index.scss';
import util from '../../common/http/util';

import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import injectReducer from '../../utils/injectReducer';
import reducer from '../../redux/Permission/Role/reducer';
import * as RoleAction from '../../redux/Permission/Role/action';

@withRouter
@BasicLayoutHoc
class BasicLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      isScreen: 'isDesktop',
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
    // let token = document.cookie.split(";")[0];
    // console.log(token)
    const { actions } = this.props;
    actions.asideList({
      pid: 20602,
      type: 2,
    });
  }

  /**
   * 注册监听屏幕的变化，可根据不同分辨率做对应的处理
   */
  enquireScreenRegister = () => {
    const isMobile = 'screen and (max-width: 720px)';
    const isTablet = 'screen and (min-width: 721px) and (max-width: 1199px)';
    const isDesktop = 'screen and (min-width: 1200px)';

    enquire.register(isMobile, this.enquireScreenHandle('isMobile'));
    enquire.register(isTablet, this.enquireScreenHandle('isTablet'));
    enquire.register(isDesktop, this.enquireScreenHandle('isDesktop'));
  };

  enquireScreenHandle = (type) => {
    const handler = {
      match: () => {
        this.setState({
          isScreen: type,
        });
      },
    };

    return handler;
  };

  render() {
    const { profile = {}, userLogout } = this.props;
    const isMobile = this.state.isScreen !== 'isDesktop';
    const layoutClassName = 'ice-design-layout-dark ice-design-layout';

    return (
      <div className={layoutClassName}>
        <Layout>
          <Header
            isMobile={isMobile}
            profile={profile}
            handleLogout={userLogout}
          />
          <Layout.Section>
            <Layout.Aside width="auto" type={null}>
              <Aside
                list={this.props.state}
                isMobile={isMobile}
              />
            </Layout.Aside>
            <Layout.Main>
              <MainRoutes />
            </Layout.Main>
          </Layout.Section>

          <Footer />
        </Layout>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return { state: state.Aside.aside };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(RoleAction, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'Aside', reducer });

export default compose(
  withReducer,
  withConnect
)(BasicLayout);
