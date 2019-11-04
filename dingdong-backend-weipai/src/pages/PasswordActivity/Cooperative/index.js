import React, { Component } from 'react';
import Record from './components/Record';

export default class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page1-page">
        <Record />
      </div>
    );
  }
}
