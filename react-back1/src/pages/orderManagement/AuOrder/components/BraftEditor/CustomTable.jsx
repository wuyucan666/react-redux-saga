/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination, Balloon } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import { renderAmount, orderpayType, orderType, orderstatus, renderTime } from '../../../../../common/js/filter';


const { Row, Col } = Grid;

const handlePageSizeChange = size => console.log(size);
const renderOper = (value, index, record) => {
  return (<div>
    <Link target="_blank" style={styles.link} to={`/orderManagement/OrderDetail?order=${record.orderSn}&type=${record.type}`} >
            查看订单
    </Link>
  </div>);
};

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
    this.props.handlePage(current);
  };

  // handlePageSizeChange = (size) => {
  //   this.props.handleSize(size)
  // }

  renderNumbering = (value, index, record) => {
    const defaultTrigger = <span style={{ color: '#0066CC', cursor: 'pointer' }}>{record.aid}</span>;
    return (
      <div>
        <Balloon trigger={defaultTrigger} closable={false} align="br">
          <span>专场名称：{record.aName}</span>
        </Balloon>
        {/* <span style={{ color: '#0066CC', cursor: 'pointer' }}>23</span> */}
      </div>
    );
  }

  renderYouHui = (value, index, record) => {
    return `${(record.businessCouponAmount * 1 + record.commonCouponAmount * 1) / 100}元`;
  }
  render() {
    return (
      <IceContainer title={`订单列表(共${this.props.total}人)`}>
        <Table
          dataSource={this.props.lists}
          // rowSelection={{ onChange: this.onChange }}
        >
          <Table.Column title="订单编号" dataIndex="orderSn" width={200} />
          <Table.Column title="手机号码" dataIndex="mobile" width={200} />
          <Table.Column title="用户昵称" dataIndex="buyerName" width={100} />
          <Table.Column title="真实姓名" dataIndex="realname" width={200} />
          <Table.Column title="下单时间" dataIndex="created" width={200} cell={renderTime} />
          <Table.Column title="应付金额" dataIndex="totalAmount" width={200} cell={renderAmount} />
          {/* totalAmount; 订单总价 =>应付金额 */}
          {/* <Table.Column title="实付金额" dataIndex="payAmount" cell={renderAmount} width={200} /> */}
          <Table.Column title="优惠总额" dataIndex="youhui" width={200} cell={this.renderYouHui} />
          <Table.Column title="支付方式" dataIndex="payType" width={100} cell={orderpayType} />
          <Table.Column title="商户昵称" dataIndex="shopName" width={100} />
          <Table.Column title="考场编号" dataIndex="aid" width={100} cell={this.renderNumbering} />
          <Table.Column title="订单状态" dataIndex="status" width={100} cell={orderstatus} />
          <Table.Column title="订单类型" dataIndex="orderType" cell={orderType} width={100} />
          {/* <Table.Column title="服务费" dataIndex="servicePrice" cell={renderAmount} width={200} />
          <Table.Column title="订单来源" dataIndex="source" width={100}  /> */}
          <Table.Column title="操作" width={100} cell={renderOper} />
        </Table>
        <Pagination
          // style={styles.pagination}
          // current={this.props.pages}
          // onChange={this.handlePaginationChange}
          // // onPageSizeChange={handlePageSizeChange}
          // // pageSizeSelector="dropdown" pageSizePosition="end" onPageSizeChange={handlePageSizeChange}
          // total={this.props.total}
          style={styles.pagination}
          current={this.props.pages}
          onChange={this.handlePaginationChange}
          onPageSizeChange={handlePageSizeChange}
          pageSize={20}
          total={this.props.total}
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
