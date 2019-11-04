
/* eslint-disable react/no-unused-state, no-plusplus */
import React, { useState,useRef } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination,Dialog,Input,Message  } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import {AuctionListType,ActiveState,imgUrl,ShootType,ShootCreateType,ShootChannel,renderTime,ActiveType} from '../../../../../common/js/filter'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
const { Row, Col } = Grid;


export default function CustomTable(props)  {
  const [value, setValue] = useState({});
  const [page, setPage] = useState(1);
  const [id, setId] = useState('');
  const [visible, setVisible] = useState(false);
  const [simpleFormDialog, setSimpleFormDialog] = useState({
    ...styles.simpleFormDialog,
  });
  const ref = useRef('form')


  const handlePaginationChange = (current) => {
    setPage(current)
    // console.log(props.pages);
    props.handlePage(current)
  };

const hideDialog = () => {
  setVisible(false)
};




// const release = (e,val) =>{
//   let obj = {
//     id:val
//   }
//   Dialog.confirm({
//     title: '提示',
//     content: '确认发布该活动?',
//     onOk:() => {
//       props.release(obj);
//     },
//   });
// }

const Delete = (e,val) =>{
  let obj = {
    id:val
  }
  Dialog.confirm({
    title: '提示',
    content: '确认删除该活动?',
    onOk:() => {
      props.Delete(obj);
    },
  });
}

const audit = (e,val) =>{
  let obj = {
    id:val
  }
  props.audit(obj);
}

const failure = (e,val) =>{
  setVisible(true)
  setId(val)
}

const onOk = (e) => {
  let NewVal = {
    soldoutRemark:'',
    id:id,
    ...value,
  }
  setValue(NewVal)
  if( NewVal.soldoutRemark == '' ){
    Message.error('请输入下架原因') 
    return
  }else{
    props.failure(NewVal);
    hideDialog();
  } 

};


const typeList = (val,o,data) => {
  let str = ''
  if(data.typeList && data.typeList.indexOf("1") != -1 ){
    str += '优惠券+'
  }
  if(data.typeList && data.typeList.indexOf("2") != -1 ){
    str += '积分+'
  }
  if(data.typeList && data.typeList.indexOf("0") != -1 ){
    str += '抽奖券+'
  }
  if(data.typeList && data.typeList.indexOf("6") != -1 ){
    str += '礼包+'
  }
  if(data.typeList && data.typeList.indexOf("3") != -1 ){
    str += '纪念钞+'
  }
  if(data.typeList && data.typeList.indexOf("3") != -1 ){
    str += '现金+'
  }
  str = str.substr(0,str.length-1)
  return str
}
const renderOper = (val,o,data) => {
  console.log(data)
  if( data.status == 2){
    return (
      <div style={styles.oper} >
      <Link  style={styles.link} target="_blank" to={`/PasswordActivity/CreateActivity?id=${data.id}&type=3`}  >
        编辑
      </Link>
      <Link style={styles.link}  target="_blank" to={`/PasswordActivity/DdEventDetails?id=${data.id}`}  >
        查看
      </Link>
      <Link  style={styles.link} to={'#'} onClick={e=>Delete(e,data.id)} >
        删除
      </Link>
      <Link  style={styles.link}  to={'#'} onClick={e=>audit(e,data.id)}  >
        提审
      </Link>
      </div>
    );
  }else if( data.status == 3){
    return (
      <div style={styles.oper}>
      <Link style={styles.link}  target="_blank" to={`/PasswordActivity/DdEventDetails?id=${data.id}`}  >
        查看
      </Link>
      </div>
    );
  }else if( data.status == -4 ){
    return (
      <div style={styles.oper}>
       <Link  style={styles.link} target="_blank" to={`/PasswordActivity/CreateActivity?id=${data.id}&type=3`}  >
        编辑
      </Link>
      <Link style={styles.link}  target="_blank" to={`/PasswordActivity/DdEventDetails?id=${data.id}`}  >
        查看
      </Link>
      <Link  style={styles.link} to={'#'} onClick={e=>Delete(e,data.id)} >
        删除
      </Link>
      <Link  style={styles.link}  to={'#'} onClick={e=>audit(e,data.id)}  >
        提审
      </Link>
      </div>
    );
  }else if( data.status == 4 ){
    return (
      <div style={styles.oper}>
      <Link style={styles.link}  target="_blank" to={`/PasswordActivity/DdEventDetails?id=${data.id}`}  >
        查看
      </Link>
      <Link  style={styles.link} to={'#'} onClick={e=>Delete(e,data.id)} >
        删除
      </Link>
      <Link  style={styles.link}  target="_blank" to={`/PasswordActivity/DdEventDetails?type=2&id=${data.id}`} >
        发布
      </Link>
      </div>
    );
  }else if( data.status == 1 ){
    return (
      <div style={styles.oper}>
      <Link style={styles.link}  target="_blank" to={`/PasswordActivity/DdEventDetails?id=${data.id}`}  >
        查看
      </Link>
      <Link  style={styles.link}  to={'#'} onClick={e=>failure(e,data.id)}  >
        失效
      </Link>
      <Link  style={styles.link}  target="_blank" to={`/PasswordActivity/UserReceive?id=${data.id}`}  >
       查看领取详情
      </Link>
      </div>
    );
  }else if(data.status == 0){
    return (
      <div style={styles.oper}>
      <Link style={styles.link}  target="_blank" to={`/PasswordActivity/DdEventDetails?id=${data.id}`}  >
        查看
      </Link>
      <Link  style={styles.link} to={'#'} onClick={e=>Delete(e,data.id)} >
        删除
      </Link>
      <Link  style={styles.link}  target="_blank" to={`/PasswordActivity/UserReceive?id=${data.id}`}  >
       查看领取详情
      </Link>
      </div>
    );
  }
    
  }

    return (
      // <IceContainer title={`资金列表(共${this.props.total}条)`}>
      <IceContainer title={`数据列表${props.total}条`}>
        {/* <div>
          用户:{props.total}人
        </div>
        <div>
          获奖数量:{props.rewardsSum}件
        </div> */}
          <Table
          dataSource={props.lists}
        >
          {/* <Table.Column title="编号" dataIndex="nickname" width={100} /> */}
          {/* <Table.Column title="活动类型" dataIndex="type" width={100} cell={ActiveType}/> */}
          <Table.Column title="活动名称" dataIndex="name" width={200} />
          <Table.Column title="参与人数" dataIndex="joinCount" width={100} />
          <Table.Column title="创建时间" dataIndex="created" width={200} cell={renderTime}/>
          <Table.Column title="开始时间" dataIndex="startTime" width={200} cell={renderTime}/>
          <Table.Column title="结束时间" dataIndex="endTime" width={200} cell={renderTime}/>
          <Table.Column title="活动礼品" dataIndex="typeList" width={200}  cell={typeList}/>
          <Table.Column title="礼品总数" dataIndex="total" width={200} />
          <Table.Column title="活动状态" dataIndex="status" width={200}  cell={ActiveState}/>
          <Table.Column title="创建人员" dataIndex="createrNickname" width={200} />
          <Table.Column title="发布人员" dataIndex="issueName" width={200} />
          <Table.Column title="操作"  cell={renderOper}/>
        </Table>
        <Dialog
          style={simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          title="下架提示"
          // {...this.props}
          onOk={e=>onOk(e)}
          onCancel={hideDialog}
          onClose={hideDialog}
          isFullScreen
          visible={visible}
        >
          <IceFormBinderWrapper
            value={value}
            ref={ref}
          >
            <div style={styles.dialogContent}>
              <Row style={styles.formRow}>你正在操作活动下架操作，操作成功后用户端将停止该活动的展示，请输入下架原因!</Row>
              <Row style={styles.formRow}>
                <IceFormBinder
                  name="soldoutRemark"  
                >
                <Input.TextArea
                  style={styles.input}
                  maxLength={200}
                  placeholder="请输入原因"
                  // htmlType="number"
                />
                </IceFormBinder>
                <IceFormError name="soldoutRemark" />
              </Row>
            </div>
          </IceFormBinderWrapper>
        </Dialog>
        <Pagination
          style={styles.pagination}
          current={props.pages}
          onChange={handlePaginationChange}
          pageSize={20}
          total={props.total}
        />
      </IceContainer>
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
  marginLeft:{
    marginLeft: '10px',
  },
  formRow:{
    marginTop: '5px',
  },
  link:{
    whiteSpace: 'nowrap',
    textAlign: 'center',
    display:'block'
  }
};
