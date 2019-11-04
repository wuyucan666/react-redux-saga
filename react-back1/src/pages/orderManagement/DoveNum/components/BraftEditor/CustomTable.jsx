/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';
import {renderAmount} from '../../../../../common/js/filter'

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


  renderOper = () => {
    return (
      <div style={styles.oper}>
        <Icon
          type="edit"
          size="small"
          style={{ ...styles.icon, ...styles.editIcon }}
        />
        <Icon
          type="ashbin"
          size="small"
          style={{ ...styles.icon, ...styles.deleteIcon }}
        />
      </div>
    );
  };

  render() {
    
    return (
      <IceContainer title="鸽子列表">
        <Table
          dataSource={this.props.lists}
          // rowSelection={{ onChange: this.onChange }}
        >
          {/* <Table.Column title="商家用户名" dataIndex="shopName" width={100} />
          <Table.Column title="订单编号" dataIndex="orderSn" width={200} /> */}
          {/* <Table.Column title="拍品类型" dataIndex="college" width={200} /> */}
          <Table.Column title="拍品名称" dataIndex="sellerName" width={100} />
          <Table.Column title="成交价" dataIndex="amount" cell={renderAmount} width={200} />
          <Table.Column title="扣除保证金" dataIndex="margin" cell={renderAmount} width={200} />
          <Table.Column title="鸽子金额" dataIndex="amount" cell={renderAmount} width={100} />
        </Table>
        <Pagination
         style={styles.pagination}
         current={this.props.pages}
         onChange={this.handlePaginationChange}
         onPageSizeChange={handlePageSizeChange}
         // pageSizeSelector="dropdown" pageSizePosition="end" onPageSizeChange={handlePageSizeChange}
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
