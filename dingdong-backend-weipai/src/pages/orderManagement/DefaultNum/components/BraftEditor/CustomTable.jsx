/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';
import {renderAmount,renderTime,orderType} from '../../../../../common/js/filter'
const { Row, Col } = Grid;
import { Link } from 'react-router-dom';


const handlePageSizeChange = size => console.log(size); 
const renderOper = (value, index, record) => {
  return <div>
             <Link target="_blank" style={styles.link} to={`/orderManagement/OrderDetail?order=${record.orderSn}`}    >
             {record.orderSn}
            </Link>
          </div>
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
    this.setState({
      current,
    });
  };

  goBefore =()=>{
    window.history.go(-1);
  }

  render() {
    
    return (
      <div>
      {/* <Button type="primary" style={styles.fr} onClick={this.goBefore} >
          返回
        </Button> */}
      <IceContainer title="违约数">
        <Table
          dataSource={this.props.lists}
          // rowSelection={{ onChange: this.onChange }}
        >
          <Table.Column title="违约用户名" dataIndex="nickname" width={200} />
          <Table.Column title="真实名字" dataIndex="name" width={200} />
          <Table.Column title="订单创建时间" dataIndex="created" cell={renderTime}width={200} />
          <Table.Column title="订单编号" dataIndex="orderSn" width={300} cell={renderOper} />
          <Table.Column title="订单类型" dataIndex="orderType" width={200} cell={orderType}/>
          <Table.Column title="藏品名称" dataIndex="cname" width={200} />
          <Table.Column title="订单金额" dataIndex="amount"   cell={renderAmount} width={200} />
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
