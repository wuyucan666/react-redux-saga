import React, { Component } from 'react';
import UserTable from './components/UserTable';

export default class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-detail-page">
       {/* 可筛选过滤的用户类表格 */}
        <UserTable />
        {/* 基础 Tab 组件 */}
        {/* 两栏信息展示型表格 */}
        {/* <InfoDisplayTable /> */}
       
      </div>
    );
  }
}
