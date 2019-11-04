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
  passOn=(res)=>{
    this.props.passOn(res)
  }
  turnOff=(res)=> {
    this.props.turnOff(res)
  }
  

  render() {
    return (
      <div>
        <UserSearch 
        status = {this.props.status==1?false:true}
        Sn={this.props.Sn} 
        passOn={(obj)=>this.passOn(obj)}
        turnOff={(obj)=>this.turnOff(obj)}/>
      </div>
    );
  }
}
