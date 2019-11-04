import React, { Component } from 'react';
import UserTable from './components/UserTable';

export default class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page1-page">
        {/* 基于 draft-js 开发的美观易用的 React 富文本编辑器 */}
        <UserTable />
      </div>
    );
  }
}