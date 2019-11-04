/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';

const { Row, Col } = Grid;

const handlePageSizeChange = size => console.log(size); 
const renderOper = (value, index, record) => {
  return <div>
             <Link   style={styles.link} to="/orderManagement/OrderDetail"   >
            编辑{record.id}
            </Link>
            <Link   style={styles.link} to="/orderManagement/OrderDetail"   >
            分配权限{record.id}
            </Link>
            <Button type="primary" style={styles.button}>
                删除
            </Button>
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

  getData = () => {
    const result = [];
    for (let i = 0; i < 10; i++) {
      result.push({
        id: i + 1,
        name: `${i + 1}`,
        university: '${i + 1}',
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

  render() {
    return (
      <div>
      <IceContainer title="角色列表">
        <Table
          dataSource={this.getData()}
          // rowSelection={{ onChange: this.onChange }}
        >
          <Table.Column title="编号" dataIndex="id" width={100} />
          <Table.Column title="角色名称" dataIndex="name" width={100} />
          <Table.Column title="角色描述" dataIndex="university" width={200} />
          <Table.Column title="创建时间" dataIndex="class" width={100} />
          <Table.Column title="操作" cell={renderOper} width={200} />
        </Table>
        <Pagination
          pageSize={20}
          style={styles.pagination}
          current={this.state.current}
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
    marginLeft: '10px',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'center',
  },
  link:{
    marginLeft: '10px',
  }
};
