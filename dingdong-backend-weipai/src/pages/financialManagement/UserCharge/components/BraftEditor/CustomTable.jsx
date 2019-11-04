/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination, Input } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import { renderAmount, renderType, renderStatus, renderTime, orderpayType } from '../../../../../common/js/filter';


const { Row, Col } = Grid;


export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
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
    this.props.handlePage(current);
  };


  renderOper = (val, o, record) => {
    // console.log(val,o,record);
    if (record.payType == '4') {
      return (
        <div style={styles.oper}>
          <Link target="_blank" style={styles.link} to={`/financialManagement/ChargeAudit?sn=${record.orderSn}`} >
          查看审核
          </Link>
        </div>
      );
    }
  };

  render() {
    // console.log(this.props.lists);
    return (
      <div>
        <IceContainer title="数据列表">
          <Table
          dataSource={this.props.lists}
          // rowSelection={{ onChange: this.onChange }}
        >
          <Table.Column title="用户昵称" dataIndex="nickname" width={100} />
          <Table.Column title="手机号码" dataIndex="mobile" width={150} />
          <Table.Column title="充值单号" dataIndex="orderSn" width={150} />
          <Table.Column title="真实姓名" dataIndex="realname" width={100} />
          <Table.Column title="充值时间" dataIndex="created" cell={renderTime} width={200} />
          <Table.Column title="充值类型" dataIndex="cashType" cell={renderType} width={100} />
          <Table.Column title="充值方式" dataIndex="payType" width={200} cell={orderpayType} />
          <Table.Column title="充值金额" dataIndex="amount" cell={renderAmount} width={100} />
          {/* <Table.Column title="关联订单号" dataIndex="tradeSn" width={200} /> */}
          <Table.Column title="商户订单号" dataIndex="tradeSn" width={200} />
          {/* <Table.Column title="充值状态" dataIndex="status" cell={renderStatus} width={100} /> */}
          {/* <Table.Column title="操作"  width={200}  cell={this.renderOper}/>
          {/* <Table.Column title="操作"  width={200}  cell={this.renderOper}/> */}
        </Table>
          <Pagination
          style={styles.pagination}
          current={this.props.enPages}
          onChange={this.handlePaginationChange}
          total={this.props.total}
          pageSize={20}
        />
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
};
