/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination,Input } from '@alifd/next';
import IceContainer from '@icedesign/container';

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

  getData = () => {
    const result = [];
    for (let i = 0; i < 10; i++) {
      result.push({
        id: i + 1,
        name: `李晓红${i + 1}`,
        university: '浙江大学',
        college: '计算机',
        class: i + 1,
        phone: `187666206123${i}`,
        role: '管理员',
      });
    }
    return result;
  };

  onChange = (...args) => {
    console.log(...args);
  };

  handlePaginationChange = (current) => {
    this.setState({
      current,
    });
  };


  renderOper = () => {
    return (
      <div style={styles.oper}>
        <a style={styles.link} onClick={this.handleMore}>
          查看
        </a>
        <a style={styles.link} onClick={this.handleMore}>
          审核
        </a>
      </div>
    );
  };

  render() {
    return (
      <div>
      <IceContainer title="数据列表(共233条)">
        <Table
          dataSource={this.getData()}
          // rowSelection={{ onChange: this.onChange }}
        >
          <Table.Column title="用户名" dataIndex="id" width={100} />
          <Table.Column title="用户账号" dataIndex="name" width={100} />
          <Table.Column title="充值单号" dataIndex="university" width={200} />
          <Table.Column title="真实姓名" dataIndex="college" width={200} />
          <Table.Column title="充值时间" dataIndex="class" width={100} />
          <Table.Column title="充值方式" dataIndex="phone" width={200} />
          <Table.Column title="充值金额" dataIndex="phone" width={200} />
          <Table.Column title="关联订单号" dataIndex="phone" width={200} />
          <Table.Column title="充值状态" dataIndex="phone" width={200} />
          <Table.Column title="操作" dataIndex="phone" width={200}  cell={this.renderOper}/>
        </Table>
        <Pagination
          style={styles.pagination}
          current={this.state.current}
          pageSize={20}
          onChange={this.handlePaginationChange}
          pageSizeSelector="dropdown" pageSizePosition="end" onPageSizeChange={handlePageSizeChange}
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
    textAlign: 'right',
  },
};
