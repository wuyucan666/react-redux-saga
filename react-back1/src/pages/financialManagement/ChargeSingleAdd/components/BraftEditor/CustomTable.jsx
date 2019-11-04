/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import {renderAmount,bdStatus,bdType,renderTime} from '../../../../../common/js/filter'

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


  renderOper = (val,i,data) => {
    // console.log(data.id);
    return (
      <div style={styles.oper}>
        <Link target="_blank" to={`/financialManagement/ChargeSingleDetail?id=${data.id}&status=${data.status}`} >
        查看
        </Link>
      </div>
    );
  };

  render() {
    return (
      <IceContainer title="数据列表">
        <Table
          dataSource={this.props.lists}
          // rowSelection={{ onChange: this.onChange }}
        >
          <Table.Column title="用户名" dataIndex="nickname"  width={200} />
          <Table.Column title="用户账号" dataIndex="mobile"  width={200} />
          <Table.Column title="充值单号" dataIndex="orderSn" width={200} />
          <Table.Column title="充值时间" dataIndex="transTime" cell={renderTime} width={200} />
          <Table.Column title="公司对公账户" dataIndex="account" width={200} />
          <Table.Column title="充值金额" dataIndex="amount" cell={renderAmount} width={200} />
          <Table.Column title="充值状态" dataIndex="status" cell={bdStatus} width={200} />
          <Table.Column title="提审人员" dataIndex="applicant" width={200}  />
          <Table.Column title="审核人员" dataIndex="checkAuthor" width={200}  />
          <Table.Column title="操作" width={100} dataIndex="id" cell={this.renderOper} />
        </Table>
        <Pagination
          style={styles.pagination}
          current={this.props.pages}
          onChange={this.handlePaginationChange}
          onPageSizeChange={handlePageSizeChange}
          total={this.props.total}
          pageSize={20}
        />
      </IceContainer>
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
};
