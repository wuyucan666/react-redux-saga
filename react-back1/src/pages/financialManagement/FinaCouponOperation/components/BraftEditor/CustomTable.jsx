/* eslint-disable react/no-unused-state, no-plusplus */
import React, { useState } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination,Input } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import {renderAmount,renderAllAmount,CouponsType,renderTime,renderValidityPeriod,renderCouponsStatus} from '../../../../../common/js/filter'
const { Row, Col } = Grid;

export default function CustomTable(props)  {

  const [formValue, setformValue] = useState({});
  const [page, setPage] = useState(1);
  

  

  const formChange = (value) => {
    console.log('changed value', value);
    setformValue(value)
  };


  const onChange = (...args) => {
    console.log(...args);
  };

  const handlePaginationChange = (current) => {
    setPage(current)
    // console.log(props.pages);
    props.handlePage(current)
  };


  const renderOper = (v,o,list) => {
    return (
      <div style={styles.oper}>
        {/* <a style={styles.link} onClick={handleMore}>
          查看
        </a> */}
        <Link target="_blank" style={styles.link} to={`/financialManagement/CouponDetail?status=${list.status}&goodId=${list.goodId}`} >
        查看
        </Link>
      </div>
    );
  };
    // console.log(props);
  return (
    <div>
    <IceContainer title="数据列表">
      <Table
        dataSource={props.couponList}
        // rowSelection={{ onChange: onChange }}
      >
        <Table.Column title="创建时间" dataIndex="created" cell={renderTime}  width={200} />
        <Table.Column title="优惠券类型" dataIndex="type" cell={CouponsType}  width={80} />
        <Table.Column title="优惠券名称" dataIndex="couponName"  width={150} />
        <Table.Column title="优惠券总金额" dataIndex="amount" cell={renderAllAmount}  width={100} />  
        <Table.Column title="面额" dataIndex="amount" cell={renderAmount} width={100} />
        <Table.Column title="数量（张）" dataIndex="total"  width={100} />
        <Table.Column title="剩余张数" dataIndex="totalSurplus"  width={100} />
        <Table.Column title="有效期" dataIndex="timeout" cell={renderValidityPeriod} width={300} />
        <Table.Column title="使用门槛" dataIndex="threshold" cell={renderAmount} width={120} />
        <Table.Column title="优惠券状态" dataIndex="status" cell={renderCouponsStatus} width={100} />
        <Table.Column title="创建人员" dataIndex="createNickname" width={100} />
        <Table.Column title="发布人员" dataIndex="createNickname" width={100} />
        <Table.Column title="操作" dataIndex="phone" width={150}  cell={renderOper}/>
      </Table>
      <Pagination
        style={styles.pagination}
        current={props.parmas.page}
        onChange={handlePaginationChange}
        total={Number(props.total)}
        pageSize={20}
      />
    </IceContainer>
    </div>
  );
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
