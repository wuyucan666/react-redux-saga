/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import {renderUserStatus,renderTime,renderAmount,renderSex} from '../../../../../common/js/filter'

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
  
  renderOper = (val,o,data) => {
      return (
        <Link target="_blank" style={styles.link} to={`/auUser/UserDetail?uuid=${data.uuid}`} >查看</Link>
      );
  };

  render() {
    // console.log(this.props)
    return (
      <IceContainer title="用户列表">
        <Table
          dataSource={this.props.list}
          // rowSelection={{ onChange: this.onChange }}
        >
          {/* <Table.Column title="编号" dataIndex="id" width={100} /> */}
          <Table.Column title="用户名" dataIndex="nickname" width={200} />
          <Table.Column title="用户账号" dataIndex="mobile" width={220} />
          <Table.Column title="性别" dataIndex="sex" width={80} cell={renderSex}/>
          <Table.Column title="年龄" dataIndex="age" width={80} />
          <Table.Column title="城市" dataIndex="city" width={120} />
          <Table.Column title="注册时间" dataIndex="created" width={200} cell={renderTime}/>
          <Table.Column title="最后登入时间" dataIndex="loginTime" width={200} cell={renderTime}/>
          <Table.Column title="消费金额" dataIndex="transMoney" width={200} cell={renderAmount}/>
          <Table.Column title="邀请码" dataIndex="inviteCode" width={200}  />
          <Table.Column title="邀请人" dataIndex="invitor" width={200}  />
          <Table.Column title="账号状态"dataIndex="status" width={100} cell={renderUserStatus}/>
          <Table.Column title="操作"  width={100} cell={this.renderOper}/>
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
