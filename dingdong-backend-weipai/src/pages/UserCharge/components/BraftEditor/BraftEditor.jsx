import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';
import { Link } from 'react-router-dom';

export default class CustomBraftEditor extends Component {
  static displayName = 'CustomBraftEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleRawChange = (content) => {
    console.log(content);
  };

  handleChange = (rawContent) => {
    console.log(rawContent);
  };

  render() {
    return (
      <div>
        <IceContainer >
        <Link  to="/financialManagement/UserPipelineQuery"  style={styles.nav} >
        提现记录
        </Link>
        <Link  to="/financialManagement/UserCharge" style={styles.nav1} >
        充值记录
        </Link>
      </IceContainer>
      <IceContainer>
             <TableFilter />
    </IceContainer>
    <IceContainer>
             <CustomTable />
    </IceContainer>
    </div>
    );
  }
}

const styles = {
  nav1:{
    padding:'10px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  nav:{
    padding:'10px',
    fontSize: '20px',
    fontWeight: 'bold',
    color:'#21242a'
  },

};
