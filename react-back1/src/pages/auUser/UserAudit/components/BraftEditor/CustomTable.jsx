/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import {Dialog, Table, Switch, Icon, Button, Grid, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';
import {renderJudge,renderTime} from '../../../../../common/js/filter'

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
      size:15
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
    let obj={};
    obj.page = current;
    obj.limit = this.state.size;
    this.props.handlePage(obj)
  };

  handlePageSizeChange = (size) => {
    this.setState({
      size: size,
    });
  };

  agreed =(e,data)=>{
    console.log(data.id)
    
    Dialog.confirm({
      title: '提示',
      content: '确认同意该申请',
      onOk:() => {
        this.props.Agreed(data.id)
      },
    });
  }

  rejected =(e,data)=>{
    console.log(data.id)
    Dialog.confirm({
      title: '提示',
      content: '确认驳回该申请',
      onOk:() => {
        this.props.Rejected(data.id)
      },
    });

  }

  renderOper = (val,o,data) => {
    console.log(data)
    if( data.status == 0 ){
      return (
        <div style={styles.oper}>
         <Button type="normal" onClick={ e=>this.agreed(e,data) } style={styles.button}>
            同意
          </Button>
          <Button type="normal" onClick={e=>this.rejected(e,data)} style={{ ...styles.button, }}>
            驳回
          </Button>
        </div>
      );
    }

    if( data.status == 1 ){
      return ('已审核通过')
    }
    if( data.status == 2 ){
      return ('已驳回')
    }

  };


  render() {
    // console.log(this.props.list)
    return (
      <IceContainer title="用户列表">
        <Table
          dataSource={this.props.list}
          // rowSelection={{ onChange: this.onChange }}
        >
          <Table.Column title="用户名" dataIndex="username" width={100} />
          <Table.Column title="手机号码" dataIndex="usermobile" width={100} />
          <Table.Column title="修改后邀请人" dataIndex="modifyInvitename" width={200} />
          <Table.Column title="修改前邀请人" dataIndex="currentInvitename" width={200} />
          <Table.Column title="申请人" dataIndex="Applyname" width={100} />
          <Table.Column title="申请时间" dataIndex="apply_time" width={200} cell={renderTime}/>
          <Table.Column title="备注" dataIndex="reason" width={200} />
          <Table.Column title="状态" dataIndex="status" cell={renderJudge} width={200} />
          <Table.Column title="审核人" dataIndex="examinename" width={200} />
          <Table.Column title="操作" dataIndex="status" width={300} cell={this.renderOper} />
        </Table>
        <Pagination
          // pageSizeSelector="dropdown"
          // pageSizePosition="end"
          // onPageSizeChange={this.handlePageSizeChange}
          style={styles.pagination}
          current={this.props.pages}
          onChange={this.handlePaginationChange}
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
