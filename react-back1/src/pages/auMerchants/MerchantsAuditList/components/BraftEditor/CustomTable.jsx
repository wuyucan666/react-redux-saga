/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import {MerchantsAuditStatus,MerchantsAuditor} from '../../../../../common/js/filter'
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


  renderOper = (id,index,data) => {
    return (
      <div style={styles.oper}>
        <Link target="_blank" style={styles.link} to={`/auMerchants/MerchantAuditDetails?id=${id}&status=${data.status}`}   >
        查看
        </Link>
      </div>
    );
  };

  render() {
    return (
      <IceContainer title="商户列表">
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
          dataSource={this.props.lists}
          // rowSelection={{ onChange: this.onChange }}
        >
          <Table.Column title="记录ID" dataIndex="id" width={100} />
          <Table.Column title="申请人ID" dataIndex="uuid" width={100} />
          <Table.Column title="申请人账号" dataIndex="account" width={100} />
          <Table.Column title="申请人姓名" dataIndex="nickname" width={200} />
          <Table.Column title="店铺负责人手机号" dataIndex="companyTel" width={200} />
          <Table.Column title="联系邮箱" dataIndex="email" width={100} />
          <Table.Column title="审核状态" dataIndex="status" width={200}  cell={MerchantsAuditStatus}/>
          <Table.Column title="审核人员" dataIndex="auditor" cell={MerchantsAuditor} width={200} />
          <Table.Column title="操作" width={100} dataIndex="id" cell={this.renderOper} />
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
};
