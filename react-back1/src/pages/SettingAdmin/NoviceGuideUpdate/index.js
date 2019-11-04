import React, {Component} from 'react';
import BraftEditor from './components/BraftEditor';

export default class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return(
      <div className="page1-page">
        <BraftEditor />
      </div>
    );
  }
}
