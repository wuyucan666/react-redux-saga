import React, { Component } from 'react';
import UserSearch from './UserSearch';

export default class UserTable extends Component {
  static displayName = 'UserTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
    };
  }
  passOn=(transferFee)=>{
    this.props.passOn(transferFee)
  }
  turnOff=(obj)=> {
    this.props.turnOff(obj)
  }
  

  render() {
    // console.log(this.props.status);
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
