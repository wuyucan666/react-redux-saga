import React, { Component } from 'react';
import BasicTab from './components/BasicTab';
import TableFilter from './components/TableFilter';

export default class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-detail-page">
       {/* 可筛选过滤的用户类表格 */}
        <TableFilter />
        {/* 基础 Tab 组件 */}
        <BasicTab />
        {/* 两栏信息展示型表格 */}
        {/* <InfoDisplayTable /> */}
       
      </div>
    );
  }
}
