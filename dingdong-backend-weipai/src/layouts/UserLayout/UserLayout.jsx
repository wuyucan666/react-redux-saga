import React, { Component, Suspense } from 'react';
import Layout from '@icedesign/layout';
import { Switch, Route, Redirect } from 'react-router-dom';
import PageLoading from '../../components/PageLoading';
import Footer from './Footer';
import { routerData } from '../../routerConfig';
import './UserLayout.scss';

export default class UserLayout extends Component {
  static displayName = 'UserLayout';

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout className="user-layout">
        <div className="header">
          <a href="#" className="meta">
            <span className="title">叮咚收藏</span>
          </a>
          <p className="desc">运营后台管理系统</p>
        </div>
        <Suspense fallback={<PageLoading />}>
          <Switch>
            {routerData.map((item, index) => {
              // console.log(item.component)
              return item.component ? (
                <Route
                  key={index}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ) : null;
            })}

            <Redirect exact from="/user" to="/user/login" />
          </Switch>
        </Suspense>
        <Footer />
      </Layout>
    );
  }
}
