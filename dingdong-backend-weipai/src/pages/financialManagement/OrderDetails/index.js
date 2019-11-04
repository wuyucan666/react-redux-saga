import React, { Component } from 'react';
import UserSearch from './components/UserSearch';

export default class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-detail-page">
       {/* 可筛选过滤的用户类表格 */}
        <UserSearch />
        {/* 基础 Tab 组件 */}
      </div>
    );
  }
}
