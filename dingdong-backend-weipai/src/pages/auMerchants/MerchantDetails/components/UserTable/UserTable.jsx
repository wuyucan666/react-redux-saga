import React, { Component } from 'react';
import UserSearch from './UserSearch';


export default class UserTable extends Component {
  static displayName = 'UserTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  passOn=()=>{
    this.props.passOn()
  }
  
  fndelete =(uuid)=>{
  this.props.fndelete(uuid)
}

fnupdate=(obj)=>{
  this.props.fnupdate(obj)
}

fnaccount=(obj)=>{
  this.props.fnaccount(obj)
}

  render() {
    // console.log(this.props.sn)
    return (
      <div>
        <UserSearch sn={this.props.sn}
        fndelete = {(uuid)=>this.fndelete(uuid)}
        fnupdate = {(obj)=>this.fnupdate(obj)}
        fnaccount = {(obj)=>this.fnaccount(obj)}
        />
      </div>
    );
  }
}
