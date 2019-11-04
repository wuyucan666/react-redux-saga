/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination,Message } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import {renderTime} from '../../../../../common/js/filter'

const { Row, Col } = Grid;
const handlePageSizeChange = size => console.log(size); 



const renderChild = (value, index, record) =>{
  return <Link   style={styles.link} to="/permissionsManagement/ChildRoleList"   >
  {value}
  </Link>
}

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

  deleteRole = (info) => {
    // console.log(info.uuid,info.nickname);
    // console.log(info)
    const{name} = info
    let val = {
      pid:20605,
      name
    }
    console.log(val.name=='');
    if(val.name==''){
      Message.error('该成员没有角色')
    }else{
      this.props.deleteList(val)
    }
  };
  
  onChange = (...args) => {
    console.log(...args);
  };



  handlePaginationChange = (current) => {
    this.props.handlePage(current)
  };

  render() {
    const renderOper = (value, index, record) => {
      return <div>
          <Link   style={styles.link} 
          onClick={()=>sessionStorage.setItem("data",JSON.stringify(record))} 
          to="/permissionsManagement/AddRoles"   >
        编辑
        </Link>
        <Link   style={styles.link}
        onClick={()=>sessionStorage.setItem("data",JSON.stringify(record))}
        to="/permissionsManagement/InterfaceList?isrole"   >
        分配页面权限
        </Link>
        <Link   style={styles.link} 
          onClick={()=>sessionStorage.setItem("data",JSON.stringify(record))} 
          to={`/permissionsManagement/permissionsList?isrole`}   >
          分配接口权限
        </Link>
        <Button type="primary" onClick={()=>this.deleteRole(record)} style={styles.button}>
            删除
        </Button>
        {/* <Link   style={styles.link} 
        onClick={()=>sessionStorage.setItem("data",JSON.stringify(record))} 
        to="/permissionsManagement/AddRoles"   >
        添加子角色
        </Link> */}
      </div>
    };
    // console.log(this.props.lists);
    return (
      <div>
      <IceContainer title="角色列表">
        <Table
          dataSource={this.props.lists}
          // rowSelection={{ onChange: this.onChange }}
        >
          {/* <Table.Column title="编号" dataIndex="pid" width={100} /> */}
          <Table.Column title="角色名称" dataIndex="name"  width={100} />
          {/* <Table.Column title="子角色数" dataIndex="childCount" cell={renderChild} width={200} /> */}
          <Table.Column title="角色描述" dataIndex="description" width={200} />
          <Table.Column title="创建时间" dataIndex="created" cell={renderTime} width={100} />
          <Table.Column title="操作" cell={renderOper} width={200} />
          {/* <Table.Column title="设备" dataIndex="role" width={200} /> */}
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
