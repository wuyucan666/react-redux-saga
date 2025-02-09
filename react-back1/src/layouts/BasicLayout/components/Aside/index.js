import React, { Component } from 'react';
import cx from 'classnames';
import FoundationSymbol from '@icedesign/foundation-symbol';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Nav } from '@alifd/next';
import { FormattedMessage } from 'react-intl';

import Logo from '../Logo';
import { asideMenuConfig, asideSwitchHover } from '../../../../menuConfig';
import Authorized from '../../../../utils/Authorized';
import './index.scss';


const SubNav = Nav.SubNav;
const NavItem = Nav.Item;

@withRouter
export default class Aside extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    const openKeys = this.getDefaultOpenKeys();
    this.state = {
      collapse: false,
      openDrawer: false,
      openKeys,
    };

    this.openKeysCache = openKeys;
  }

  /**
   * 响应式通过抽屉形式切换菜单
   */
  toggleMenu = () => {
    const { openDrawer } = this.state;
    this.setState({
      openDrawer: !openDrawer,
    });
  };

  /**
   * 折叠搜索切换
   */
  toggleCollapse = () => {
    const { collapse } = this.state;
    this.setState({
      collapse: !collapse,
    });
  };

  /**
   * 左侧菜单收缩切换
   */
  onSelect = () => {
    this.toggleMenu();
  };

  /**
   * 获取默认展开菜单项
   */
  getDefaultOpenKeys = () => {
    const { location = {} } = this.props;
    const { pathname } = location;
    const menus = this.getNavMenuItems(asideMenuConfig);

    let openKeys = [];
    if (Array.isArray(menus)) {
      asideMenuConfig.forEach((item, index) => {
        if (pathname.startsWith(item.path)) {
          openKeys = [`${index}`];
        }
      });
    }

    return openKeys;
  };

  /**
   * 当前展开的菜单项
   */
  onOpenChange = (openKeys) => {
    this.setState({
      openKeys,
      openDrawer: false,
    });
    this.openKeysCache = openKeys;
  };

  /**
   * 获取菜单项数据
   */
  getNavMenuItems = (menusData) => {
    if (!menusData) {
      return [];
    }

    return menusData
      .filter((item) => item.name && !item.hideInMenu)
      .map((item, index) => {
        const ItemDom = this.getSubMenuOrItem(item, index);
        return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter((item) => item);
  };

  /**
   * menuConfig.js 的 name 属性和 locals/menu.js 的 key 进行对应
   * 在这里进行转换 path: '/chart/basic' => 'app.menu.chart.basic'
   */
  getLocaleKey = (item) => {
    // return `app.menu${item.path.replace(/\//g, '.')}`;
    // console.log(item.name,item.url)
    if (item.url !== undefined) {
      return `app.menu${item.url.replace(/\//g, '.')}`;
    }
    return String(Math.random() * 100000);
  };

  /**
   * 二级导航
   */
  getSubMenuOrItem = (item, index) => {
    // if (item.children && item.children.some((child) => child.name)) {
    if (item.child && item.child.some((child) => child.name)) {
      // const childrenItems = this.getNavMenuItems(item.children);
      const childrenItems = this.getNavMenuItems(item.child);
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubNav
            key={index}
            icon={
              item.icon ? (
                <FoundationSymbol size="small" type={item.icon} />
              ) : null
            }
            label={
              <span className="ice-menu-collapse-hide">
                <FormattedMessage id={this.getLocaleKey(item)} />
              </span>
            }
          >
            {childrenItems}
          </SubNav>
        );
      }
      return null;
    }
    return (
      // <NavItem key={item.path}>
      //   <Link target="_blank" to={item.path}>
      <NavItem key={item.url}>
        <Link to={item.url == undefined ? '/dashboard' : item.url}>
          <FormattedMessage id={this.getLocaleKey(item)} />
        </Link>
      </NavItem>
    );
  };

  /**
   * 权限检查
   */
  checkPermissionItem = (authority, ItemDom) => {
    if (Authorized.check) {
      const { check } = Authorized;
      return check(authority, ItemDom);
    }

    return ItemDom;
  };

  /**
   * 导航选中转换
   */
  switchNavHover = (pathName) => {
    for (let index = 0; index < asideSwitchHover.length; index++) {
      const configPath = asideSwitchHover[index];
      if (configPath.path === pathName) {
        // console.log(configPath);
        return [configPath.nav];
      }
    }
    return [pathName];
  }

  render() {
    const {
      location: { pathname },
      isMobile,
    } = this.props;
    const switchPathName = this.switchNavHover(pathname);
    // console.log(switchPathName)
    // console.log(asideMenuConfig);

    const { openDrawer, collapse } = this.state;

    return (
      <div
        className={cx('ice-design-layout-aside', {
          'open-drawer': openDrawer,
        })}
      >
        {isMobile && <Logo />}

        {isMobile && !openDrawer && (
          <a className="menu-btn" onClick={this.toggleMenu}>
            <FoundationSymbol type="menu" size="small" />
          </a>
        )}

        {/* {!isMobile && (
          <a className="collapse-btn" onClick={this.toggleCollapse}>
            <FoundationSymbol
              key={collapse}
              type={collapse ? 'transfer-right' : 'transfer-left'}
              size="large"
            />
          </a>
        )} */}
        {/* 改变侧边栏渲染的地方 */}
        <Nav
          style={{ width: collapse ? 60 : 200 }}
          mode={collapse ? 'popup' : 'inline'}
          iconOnly={collapse}
          hasArrow={!collapse}
          activeDirection={null}
          selectedKeys={switchPathName}
          openKeys={this.state.openKeys}
          defaultSelectedKeys={switchPathName}
          onOpen={this.onOpenChange}
          onSelect={this.onSelect}
        >
          {this.getNavMenuItems(this.props.list)}
          {/* {this.getNavMenuItems(asideMenuConfig)}  */}
        </Nav>
      </div>
    );
  }
}

