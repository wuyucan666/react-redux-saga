/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import {renderAmount,renderReceivedByTime,renderPay,renderTime} from '../../../../../common/js/filter'

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


  renderOper = (val) => {
    // console.log(val);
    return (
      <div style={styles.oper}>
        <Link target="_blank" to={`/financialManagement/OrderDetails?sn=${val}`} >
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
          <Table.Column title="创建时间" dataIndex="created" cell={renderTime} width={200} />
          <Table.Column title="支付时间" dataIndex="payTime" cell={renderTime} width={200} />
          <Table.Column title="订单编号" dataIndex="orderSn" width={200} />
          {/* <Table.Column title="拍品名称" dataIndex="acName" width={200} /> */}
          <Table.Column title="支付方式" dataIndex="payType" cell={renderPay} width={100} />
          <Table.Column title="实付金额" dataIndex="payAmount" cell={renderAmount} width={200} />
          <Table.Column title="买家用户名" dataIndex="buyerName" width={200} />
          <Table.Column title="卖家用户名" dataIndex="shopName" width={200}  />
          <Table.Column title="买家确认收货" dataIndex="confirmTime" cell={renderReceivedByTime} width={100} />
          <Table.Column title="操作" width={100} dataIndex="orderSn" cell={this.renderOper} />
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
