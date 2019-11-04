/* eslint-disable react/no-unused-state, no-plusplus */
import React, { useState } from 'react';
import { Table, Switch, Balloon, Button, Grid, Pagination,Input } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import {renderAmount,imgUrl,AuctionListType,renderTime} from '../../../../../common/js/filter'
const { Row, Col } = Grid;

export default function CustomTable(props)  {

  const [formValue, setformValue] = useState({});
  const [downNum, setDownNum] = useState(0);
  const [upNum, setUpNum] = useState(0);
  const [page, setPage] = useState(1);
  

  

  const hiddenList = (value) => {
    console.log('changed value', value.sendStatus);
    if(value.sendStatus=='0'){
      props.hideList({
        id:value.id,
        status:'1'
      })
    }else{
      props.hideList({
        id:value.id,
        status:'0'
      })
    }


  };
  const descendingList = (value) => {
    // console.log(upNum,value.sendSort);
    let sort = Number(value.sendSort)-Number(upNum)
    if(sort<=0){
      sort = 1
    }
    // console.log(sort)
    props.sortList({
      id:value.id,
      sort
    })
    
  };
  const ascendingList = (value) => {
    // console.log(downNum,value.sendSort);
    let sort = Number(value.sendSort)+Number(downNum)
    if(sort<=0){
      sort = 1
    }
    props.sortList({
      id:value.id,
      sort
    })
  };


  const onChangeUp = (val) => {
    // console.log(val);
    setUpNum(val)
  };
  const onChangeDown = (val) => {
    // console.log(val);
    setDownNum(val)
  };

  const handlePaginationChange = (current) => {
    setPage(current)
    // console.log(props.pages);
    props.handlePage(current)
  };

  const renderImg = value => {
    return (<div className="media">
        <img src={imgUrl(value)} className="media-side" width={100}  height={100}/>
        {/* <div className="media-content">{product[0].title}</div> */}
    </div>);
  }


  const renderOper = (v,o,list) => {
    return (
      <div style={styles.oper}>
        {/* <a style={styles.link} onClick={handleMore}>
          查看
        </a> */}
        <Link style={styles.link} onClick={()=>hiddenList(list)} to={'#'} >
        {list.sendStatus=='1'?'隐藏':'显示'}
        </Link>
        <Balloon type="primary" 
        autoFocus 
        trigger={
          <Link style={styles.link} to={'#'} >
          上升
          </Link>
        } 
        closable={false} 
        triggerType="click">
          <div>
            <Input placeholder="请输入上升位数" onChange = {onChangeUp} />
            <Button type="primary" size = 'small' style={styles.buttonRow}
            onClick={()=>descendingList(list)} >确定</Button>
          </div>
        </Balloon>
        <Balloon type="primary" 
        autoFocus 
        trigger={
          <Link style={styles.link}  to={'#'} >
          下降
          </Link>
        } 
        closable={false} 
        triggerType="click">
          <div>
            <Input placeholder="请输入下降位数" onChange = {onChangeDown} />
            <Button type="primary" size = 'small' style={styles.buttonRow}
            onClick={()=>ascendingList(list)} >确定</Button>
          </div>
        </Balloon>
        
      </div>
    );
  };
    // console.log(props);
  return (
    <div>
    <IceContainer title="数据列表">
      <Table
        dataSource={props.lists}
        // dataSource={[{orderSn:123,name:231,amount:'amount',transferFee:'1',account:'2',author:'2d',auditor:'23'}]}
        // rowSelection={{ onChange: onChange }}
      >
        <Table.Column title="商户头像" dataIndex="avatar" cell={renderImg} width={200} />
        <Table.Column title="商户昵称" dataIndex="nickname" width={200} />
        <Table.Column title="商户姓名" dataIndex="name"  width={150} />
        <Table.Column title="商户ID" dataIndex="id"  width={160} />  
        <Table.Column title="会员等级" dataIndex="level" width={200} />
        <Table.Column title="业务类型" dataIndex="type" cell={AuctionListType} width={200} />
        <Table.Column title="信誉积分" dataIndex="highOpinion" width={120} />
        <Table.Column title="成交率" dataIndex="rate" width={120} />
        <Table.Column title="收拍总数" dataIndex="sendCount" width={120} />
        <Table.Column title="鸽子数" dataIndex="doveCount" width={120} />
        <Table.Column title="列位" dataIndex="sendSort" width={120} />
        <Table.Column title="操作人员" dataIndex="editor" width={120} />
        <Table.Column title="操作" dataIndex="id" width={150}  cell={renderOper}/>
      </Table>
      <Pagination
        style={styles.pagination}
        current={props.pages}
        onChange={handlePaginationChange}
        total={props.total}
        pageSize={20}
      />
    </IceContainer>
    </div>
  );
  }


const styles = {
  link:{
    marginRight:'10px'
  },
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
  buttonRow: {
    marginTop: '10px',
    float:'right'
  },
};
