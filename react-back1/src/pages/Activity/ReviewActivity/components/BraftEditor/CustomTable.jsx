/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, Grid, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import {ActiveCheckState,renderTime} from '../../../../../common/js/filter'

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


  renderOper = (val,b,all) => {
    // console.log(val);
    return (
      <div style={styles.oper}>
        <Link target="_blank" to={`/Activity/ReviewActivityDetail?id=${val}&status=${all.status}`} >
        查看
        </Link>
      </div>
    );
  };

  render() {
    return (
      <IceContainer title="数据列表">
        <div>
          <span>审核列表</span>
          <span>（活动数：</span>
          <span>{this.props.total}</span>
          <span>)</span>
        </div>
        <Table
          dataSource={this.props.lists}
          // rowSelection={{ onChange: this.onChange }}
        >
          <Table.Column title="提审时间" dataIndex="commitTime" cell={renderTime} width={200} />
          <Table.Column title="活动名称" dataIndex="name"  width={200} />
          <Table.Column title="活动开始时间" dataIndex="startTime" cell={renderTime} width={300} />
          <Table.Column title="活动结束时间" dataIndex="endTime" cell={renderTime} width={300} />
          <Table.Column title="审核状态" dataIndex="status" cell={ActiveCheckState} width={100} />
          <Table.Column title="提审人员" dataIndex="commitNickname"  width={200} />
          <Table.Column title="审核人员" dataIndex="checkAuthorNickname" width={200} />
          <Table.Column title="操作" width={100} dataIndex="activityId" cell={this.renderOper} />
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
