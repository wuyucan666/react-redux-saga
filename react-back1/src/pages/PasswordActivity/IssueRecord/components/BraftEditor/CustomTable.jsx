/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination, Balloon } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import { renderAmount, orderpayType, orderType, orderstatus, renderTime } from '../../../../../common/js/filter';


const { Row, Col } = Grid;

const handlePageSizeChange = size => console.log(size);


const renderStatus = (status) => {
  switch (status) {
    case '0':
      return '待领取';
    case '1':
      return '已领取';
    case '2':
      return '已发货';
  }
};
export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  handlePaginationChange = (current) => {
    this.props.handlePage(current);
  };


  renderOper = (value, index, record) => {
    return (
      <div style={styles.link} onClick={() => { this.props.goToDetail(record); }}>
              查看
      </div>
    );
  };
  render() {
    return (
      <IceContainer title={`数据列表(共${this.props.total}条)`}>

        <Table
          dataSource={this.props.lists}
        >
          <Table.Column title="创建时间" dataIndex="created" width={200} cell={renderTime} />
          <Table.Column title="礼品名称" dataIndex="name" width={200} />
          <Table.Column title="礼品数量" dataIndex="total" width={100} />
          <Table.Column title="礼品图片" dataIndex="thumb" width={200} />
          <Table.Column title="截止领取时间" dataIndex="expireTime" width={200} cell={renderTime} />
          <Table.Column title="礼品状态" dataIndex="status" width={200} cell={renderStatus} />
          <Table.Column title="操作人" dataIndex="applyUuid" width={200} />
          <Table.Column title="操作" width={100} cell={this.renderOper} />
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
  link: {
    color: '#2c72ee',
    cursor: 'pointer',
  },
};
