/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination,Input, Dialog, Message } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import {renderAmount,renderPipeType,renderPipeStatus,renderTime} from '../../../../../common/js/filter'
const { Row, Col } = Grid;

export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      list:[],
      settingVisible: false,
      orderSn: '',
      remark: ''
    };
  }
  

  formChange = (value) => {
    console.log('changed value', value);
    this.setState({
      formValue: value,
    });
  };

  handleClickConfirmation = (orderSn) => { // 确认到账
    this.setState({
      settingVisible: true,
      orderSn
    })
  };

  handleOnCloseDialog = () => { // 关闭弹框
    this.setState({
      settingVisible: false
    })
  };

  handleOnConfirmDialog = () => { // 确认保存
    if (!this.state.remark) {
      Message.warning('请输入备注')
      return false
    }
    let val = {
      orderSn: this.state.orderSn,
      remark: this.state.remark
    }
    this.props.handleOnConfirmDialog(val)
    this.setState({
      settingVisible: false
    })
  };

  handleChangeReason = (remark) => { // 文本框可控
    this.setState({
      remark
    })
  };

  onChange = (...args) => {
    console.log(...args);
  };

  handlePaginationChange = (current) => {
    this.props.handlePage(current)
  };


  renderOper = (v,o,list) => {
    return (
      <div style={styles.oper}>
        {/* <a style={styles.link} onClick={this.handleMore}>
          查看
        </a> */}
        {
          list.status == 3 ?
          (
            <div>
              <Link style={styles.link} onClick={() => this.handleClickConfirmation(list.orderSn)}  to={'#'} >
                确认到账
              </Link>
            </div>
          )
          :
          null
        }
        <Link target="_blank" style={styles.link}  to={`/financialManagement/WithdrawalApplicationDetails?sn=${list.orderSn}&status=${list.status}`} >
        查看
        </Link>
      </div>
    );
  };
  render() {
    
    return (
      <div>
      <IceContainer title="数据列表">
        <Table
          dataSource={this.props.lists}
          // rowSelection={{ onChange: this.onChange }}
        >
          <Table.Column title="提现订单号" dataIndex="orderSn" width={200} />
          <Table.Column title="手机号码" dataIndex="mobile" width={150} />
          <Table.Column title="用户昵称" dataIndex="nickname" width={150} />
          <Table.Column title="真实姓名" dataIndex="realname" width={100} />
          <Table.Column title="提现金额" dataIndex="amount" cell={renderAmount}  width={110} />
          <Table.Column title="手续费" dataIndex="transferFee" cell={renderAmount} width={100} />  
          <Table.Column title="提现账号" dataIndex="account" width={200} />
          <Table.Column title="申请时间" dataIndex="created" cell={renderTime} width={180} />
          <Table.Column title="提现状态" dataIndex="status" cell={renderPipeStatus} width={80} />
          {/* <Table.Column title="审核状态" dataIndex="author" width={100} /> */}
          <Table.Column title="审核人" dataIndex="auditor" width={100} />
          <Table.Column title="提现方式" dataIndex="type" cell={renderPipeType} width={100} />
          <Table.Column title="操作" dataIndex="phone" width={80}  cell={this.renderOper}/>
        </Table>
        <Pagination
          style={styles.pagination}
          current={this.props.pages}
          onChange={this.handlePaginationChange}
          total={this.props.total}
          pageSize={20}
        />
        <Dialog 
          title="确认到账提示"
          visible={this.state.settingVisible}
          onCancel={this.handleOnCloseDialog}
          onClose={this.handleOnCloseDialog}
          onOk={this.handleOnConfirmDialog}
          okProps={{children: '确认'}}
        >
          <div style={styles.widFixed}>
            <div style={styles.tips}>你正在操作确认转账，请填写转账备注。</div>
            <div style={styles.reasonWrapper}>
              <span style={styles.formLabel}>备注：</span>
              {/* <Input placeholder="请输入备注" onChange={this.handleChangeReason} style={{width: '320px'}} size="medium" /> */}
              <Input.TextArea placeholder="请输入备注" onChange={this.handleChangeReason} style={{width: '320px'}} />
            </div>
          </div>
        </Dialog>
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
  widFixed: {
    minWidth: '330px',
  },
  tips: {
    textAlign: 'center',
    width: '370px',
    margin: '0 auto',
    fontWeight: '600',
    lineHeight: '30px',
  },
  reasonWrapper: {
    padding: '40px 0 40px 15px',
    boxSizing: 'border-box',
    width: '400px',
    margin: '0 auto'
  },
  formLabel: {
    minWidth: '70px',
  },
};
