/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';
import {bankType} from '../../../../../common/js/filter'

const { Row, Col } = Grid;

const handlePageSizeChange = size => console.log(size); 

export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      current: 1,
    };
  }

  formChange = (value) => {
    console.log('changed value', value);
    this.setState({
      formValue: value,
    });
  };

  onChange = (...args) => {
    console.log(...args);
  };

  handlePaginationChange = (current) => {
    this.props.handlePage(current)
  };
  goBefore =()=>{
    window.history.go(-1);
  }

  render() {
    console.log(this.props.privacy)
    return (
      <div>
        {/* <Button type="primary" style={styles.fr} onClick={this.goBefore} >
          返回
        </Button> */}
      <IceContainer title="地址信息">
      <Table dataSource={this.props.privacy.address}>
        <Table.Column title="收件人" dataIndex="contacts"/>
        <Table.Column title="电话号码" dataIndex="mobile" />
        <Table.Column title="所在地区" dataIndex="province"/>
        <Table.Column title="所在市区" dataIndex="city"/>
        <Table.Column title="所在区域" dataIndex="district"/>
        <Table.Column title="街道" dataIndex="street"/>
        <Table.Column title="详细地址" dataIndex="location"/>
      </Table>
    </IceContainer>
    <IceContainer title="银行卡信息">
      <Table dataSource={this.props.privacy.card}>
        <Table.Column title="银行卡类型" dataIndex="cardFlag" cell={bankType}/>
        <Table.Column title="开户支行" dataIndex="bankName" />
        <Table.Column title="银行卡号" dataIndex="cardNum"/>
        <Table.Column title="绑定手机号" dataIndex="mobile"/>
      </Table>
    </IceContainer>
    </div>
    );
  }
}

const styles = {
  headRow: {
    marginBottom: '10px',
  },
  icon: {
    color: '#2c72ee',
    cursor: 'pointer',
  },
  deleteIcon: {
    marginLeft: '20px',
  },
  center: {
    textAlign: 'right',
  },
  button: {
    borderRadius: '4px',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'center',
  },
  fr:{
    float: 'right'
  }
};
