/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';
import {renderAccountStatus,renderTime,CouponsStatus,renderAmount} from '../../../../../common/js/filter'
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
    // console.log(this.props.list)
    return (
      <IceContainer>
        {/* <Button type="primary" style={styles.fr} onClick={this.goBefore} >
          返回
        </Button> */}
      <IceContainer title="用户优惠券">
        <Row wrap style={styles.headRow}>
          {/* <Col l="12">
            <Button type="primary" style={styles.button}>
              <Icon type="add" size="xs" style={{ marginRight: '4px' }} />添加用户
            </Button>
          </Col> */}
          <Col l="12" style={styles.center}>
            {/* <Button type="normal" style={styles.button}>
              删除
            </Button>
            <Button type="normal" style={{ ...styles.button, marginLeft: 10 }}>
              导入
            </Button>
            <Button type="normal" style={{ ...styles.button, marginLeft: 10 }}>
              下载
            </Button> */}
          </Col>
        </Row>
        <Table
          dataSource={this.props.list}
          // rowSelection={{ onChange: this.onChange }}
        >
          {/* <Table.Column title="编号" dataIndex="this.props.list.length+1" width={100} /> */}
          <Table.Column title="领取时间" dataIndex="receiveTime" width={100} cell={renderTime}/>
          <Table.Column title="优惠券名称" dataIndex="couponName" width={200} />
          <Table.Column title="面值" dataIndex="amount" width={200} cell={renderAmount}/>
          <Table.Column title="使用门槛(满多少可用)" dataIndex="threshold" width={200} cell={renderAmount}/>
          <Table.Column title="领取途径" dataIndex="source" width={200} />
          <Table.Column title="过期时间" dataIndex="timeout" width={200} cell={renderTime}/>
          <Table.Column title="状态" dataIndex="status" width={200} cell={CouponsStatus}/>
          <Table.Column title="订单号" dataIndex="orderSn" width={200} />
        </Table>
        <Pagination
           style={styles.pagination}
           current={this.props.pages}
           onChange={this.handlePaginationChange}
           onPageSizeChange={handlePageSizeChange}
           pageSize={20}
           total={this.props.total}
        />
      </IceContainer>
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
  fr:{
    float: 'right'
  }
};
