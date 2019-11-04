/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import {renderAmount,renderAccountStatus,renderTime,renderLevel,renderRate} from '../../../../../common/js/filter'

const { Row, Col } = Grid;

const handlePageSizeChange = size => console.log(size); 

const render = (value, index, record) => {
  return <div>
            {/* <Link target="_blank" onClick={()=>{
              window.location.hash = `/auMerchants/MerchantDetails?shopId=${record.shopId}&uuid=${record.uuid}` 
              setTimeout(() => {
                location.reload();
              }, 300); //待更改
              }} to={`/auMerchants/MerchantDetails?shopId=${record.shopId}&uuid=${record.uuid}`} >
            查看
            </Link> */}
            <Link target="_blank"  to={`/auMerchants/MerchantDetails?shopId=${record.shopId}&uuid=${record.uuid}`} >
            查看
            </Link>
            {/* <Link target="_blank" to="/auMerchants/MerchantDetails" >
            编辑{record.id}
            </Link> */}
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
    this.props.handlePage(current)
  };


  render() {
    const{lists}=this.props==null?[]:this.props
    // console.log(lists)
    return (
      <IceContainer title="用户列表">
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
          dataSource={lists}
          // rowSelection={{ onChange: this.onChange }}
        >
          {/* <Table.Column title="编号" dataIndex="uuid" width={100} /> */}
          <Table.Column title="用户账号" dataIndex="mobile" width={100} />
          <Table.Column title="用户名" dataIndex="nickname" width={200} />
          <Table.Column title="真实姓名" dataIndex="realname" width={200} />
          <Table.Column title="会员等级" dataIndex="level" cell={renderLevel} width={100} />
          <Table.Column title="注册时间" dataIndex="created" cell={renderTime} width={200} />
          <Table.Column title="最后登陆时间" dataIndex="loginTime" cell={renderTime} width={200} />
          <Table.Column title="成交余额" dataIndex="amount" cell={renderAmount} width={100}  />
          <Table.Column title="成交件数" dataIndex="quantity" width={100}  />
          <Table.Column title="成交率" dataIndex="rate" cell={renderRate} width={100}  />
          <Table.Column title="账号状态" dataIndex="status" cell={renderAccountStatus} width={100}  />
          <Table.Column title="操作" width={300}   cell={render}/>
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
