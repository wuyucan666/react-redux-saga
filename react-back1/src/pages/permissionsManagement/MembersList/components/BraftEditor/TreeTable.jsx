import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Dialog,Button,Message } from '@alifd/next';
import { Link } from 'react-router-dom';
import IceContainer from '@icedesign/container';
import {renderSex,renderTime} from '../../../../../common/js/filter'


export default class TreeTable extends Component {
  static displayName = 'TreeTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      textCustomizedVisible:false
    };
  }

  handleChange = (current) => {
    this.setState({
      current,
    });
  };

  onClose = () => {
    this.setState({
      textCustomizedVisible: false
    });
  };  

  onOK = () => {
    // console.log(this.state.val)
    const {val} = this.state
    this.props.deleteList(val)
    this.setState({
        textCustomizedVisible: false
      });
  }; 

  deleteRole = (info) => {
    // console.log(info.uuid,info.nickname);
    const{uuid,itemName:name} = info
    let val = {
      pid:20607,
      uuid,
      name
    }
    // console.log(val.name=='');
    if(name==''){
      Message.error('该成员没有角色')
    }else{
      // this.props.deleteList(val)
      this.setState({
        ...this.state,
        textCustomizedVisible: true,
        val
      });
    }
  };

  render() {
    const renderOper = (value, index, record) => {
      if(value!==undefined){
        return <div>
                 <Link   style={styles.link} 
                 onClick={()=>sessionStorage.setItem("roleInfo",JSON.stringify(record))} 
                 to="/permissionsManagement/EditMember"   >
                分配角色
                </Link>
                <Link   style={styles.link} 
                onClick={()=>sessionStorage.setItem("roleInfo",JSON.stringify(record))} 
                to={`/permissionsManagement/InterfaceList?uuid=${record.uuid}`}   >
                分配页面权限
                </Link>
                <Link   style={styles.link} 
                onClick={()=>sessionStorage.setItem("roleInfo",JSON.stringify(record))} 
                to={`/permissionsManagement/permissionsList?uuid=${record.uuid}`}   >
                分配接口权限
                </Link>
                <Button type="primary" onClick={()=>this.deleteRole(record)} style={styles.button}>
                    删除
                </Button>
              </div>
      }
    };
    // let dataInfo =[]
    // if(JSON.stringify(this.props.lists)!=='[]'){
    //   dataInfo.push(this.props.lists)
    // }
    return (
      <IceContainer>
        <Table dataSource={[this.props.lists]} primaryKey="key" isTree >
          <Table.Column title="角色名称" dataIndex="itemName"/>
          <Table.Column title="账号" dataIndex="mobile" />
          <Table.Column title="用户名" dataIndex="nickname"/>
          <Table.Column title="性别" dataIndex="sex" cell={renderSex} />
          <Table.Column title="注册时间" dataIndex="created" cell={renderTime}/>
          <Table.Column title="操作" dataIndex="created" cell={renderOper}/>
      </Table>
      <Dialog
          title="删除角色"
          visible={this.state.textCustomizedVisible}
          onOk={this.onOK}
          onCancel={this.onClose}
          onClose={this.onClose}
          okProps={{children: '确认',}}
          cancelProps={{children: '取消'}}
          >
          确定删除此角色？
      </Dialog>
      </IceContainer>
    );
  }
}

const styles = {
  link:{
    marginLeft: '10px',
  },
  button: {
    borderRadius: '4px',
    marginLeft: '10px',
  },
};