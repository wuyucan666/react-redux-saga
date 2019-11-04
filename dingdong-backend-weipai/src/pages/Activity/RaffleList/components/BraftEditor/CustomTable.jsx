
/* eslint-disable react/no-unused-state, no-plusplus */
import React, { useState,useRef } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination,Dialog,Input  } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import {AuctionListType,auditStatus,imgUrl,ShootType,ShootCreateType,renderTime,RaffleStatus,RaffleType} from '../../../../../common/js/filter'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Message } from '@alifd/next';
const { Row, Col } = Grid;


export default function CustomTable(props)  {
  const [value, setValue] = useState({});
  const [page, setPage] = useState(1);
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

  const productRender = (val) =>{
    // console.log(val)
    if(val !== undefined){
      return <img src={imgUrl(val)} className="media-side"  width={80}/>
    }
  }

const remind = (e,val) =>{
  let obj = {
    id:val
  }
  Dialog.confirm({
    title: '提示',
    content: '确认提醒该用户?',
    onOk:() => {
      props.remind(obj);
    },
  });
}

const fill = (e,val) =>{
  console.log(val);
  let obj = {
    id:val
  }
  setValue(obj)
  setVisible(true)
}

const issue = (e,val) =>{
  console.log(val)
  Dialog.confirm({
    title: '提示',
    content: '确认发放?',
    onOk:() => {
      // this.props.fndelete(data.uuid)
    },
  });
}

const hideDialog = () => {
  setVisible(false)
};

const onOk = (e,data) => {
  setVisible(false)
  if( value.trackingNo == '' || value.express == '' ){
    Message.error('请提醒消息后提交')
  }else{
    props.logistics(value);
  }
  // if( this.state.value.tel == '' || this.state.value.tel == undefined){
  //   Message.error('请输入邀请人手机号') 
  //   return
  // }else{
  //   const id = {
  //     userUuid:window.location.hash.split('=')[1],
  //     currentInviteUuid:data.inviteUuid,
  //     tel:this.state.value.tel,
  //     reason:this.state.value.reason
  //   }
  //   this.props.fnupdate(id)
  //   this.hideDialog();
  // } 

};

const RaffleoptUuid = (val,o,data) => {
  if(data.optName){
    return(data.optName)
  }else{
    return('系统')
  }
}

const renderOper = (val,o,data) => {

  if( data.type == 3 && data.status == 1 && data.address && data.logistics == '' ){
    return (
      <div style={styles.oper}>
       <Link target="_blank" style={styles.link}  to={`/Activity/IssueDetails?nickname=${data.nickname}&mobile=${data.mobile}&id=${data.id}`}  >
          查看
        </Link>
        <Button type="normal" onClick={e=>fill(e,data.id)} style={{ ...styles.button, marginLeft: 10 }}>
          填写物流
        </Button>
      </div>
    );
  }else if( data.type == 3 && data.status == 1 && data.address == '' ){
    return (
      <div style={styles.oper}>
       <Link target="_blank" style={styles.link}  to={`/Activity/IssueDetails?nickname=${data.nickname}&mobile=${data.mobile}&id=${data.id}`}  >
          查看
        </Link>
        <Button type="normal" onClick={e=>remind(e,data.id)} style={{ ...styles.button, marginLeft: 10 }}>
          提醒用户
        </Button>
      </div>
    );
  }else if( data.type == 3 && data.status == 0){
    return (
      <div style={styles.oper}>
       <Link target="_blank" style={styles.link}  to={`/Activity/IssueDetails?nickname=${data.nickname}&mobile=${data.mobile}&id=${data.id}`}  >
          查看
        </Link>
        <Button type="normal" onClick={e=>remind(e,data.aid)} style={{ ...styles.button, marginLeft: 10 }}>
          发放
        </Button>
      </div>
    );
  }else{
    return (
      <div style={styles.oper}>
       <Link target="_blank" style={styles.link}  to={`/Activity/IssueDetails?nickname=${data.nickname}&mobile=${data.mobile}&id=${data.id}`}  >
          查看
        </Link>
      </div>
    );
  }
    
  }

  const RaffleStatus = (val,o,data) => {

    if( data.type == 3 && data.status == 1 && data.address && data.logistics == '' ){
      return ('已发放(已填地址)');
    }else if( data.type == 3 && data.status == 1 && data.address == '' ){
      return ('已发放(未填地址)');
    }else if( data.type == 3 && data.status == 0){
      return ('未发放');
    }else{
      return ('已发放');
    }
      
    }
  

    


    return (
      // <IceContainer title={`资金列表(共${this.props.total}条)`}>
      <IceContainer title="数据列表" >
        {/* <div>
          用户:{props.total}人
        </div>
        <div>
          获奖数量:{props.rewardsSum}件
        </div> */}
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
          dataSource={props.lists}
        >
          {/* <Table.Column title="编号" dataIndex="nickname" width={100} /> */}
          {/* <Table.Column title="抽奖券编号" dataIndex="id" width={100} /> */}
          <Table.Column title="抽奖用户" dataIndex="nickname" width={200}  />
          <Table.Column title="抽奖账号" dataIndex="colCount" width={200}  />
          <Table.Column title="抽奖时间" dataIndex="created" width={100} cell={renderTime}/>
          <Table.Column title="抽奖结果" dataIndex="prizeName" width={200} />
          <Table.Column title="奖品状态" dataIndex="status" width={200}   cell={RaffleStatus}/>
          <Table.Column title="操作人员" dataIndex="optName" width={200} cell={RaffleoptUuid}/>
          <Table.Column title="操作" width={200} cell={renderOper}/>
        </Table>
        <Dialog
          style={simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          title="物流信息"
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
              <Row style={styles.formRow}>
                <label style={styles.formLabel}>物流公司:</label>
                <IceFormBinder
                  name="express"
                  required    
                >
                <Input
                  style={styles.input}
                  placeholder="请输入物流公司"
                  // htmlType="number"
                />
                </IceFormBinder>
                <IceFormError name="express" />
              </Row>
              <Row style={styles.formRow}>
                <label style={styles.formLabel}>物流单号:</label>
                <IceFormBinder
                  name="trackingNo"
                  required    
                >
                <Input
                  style={styles.input}
                  placeholder="请输入物流单号"
                  // htmlType="number"
                />
                </IceFormBinder>
                <IceFormError name="trackingNo" />
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
  oper:{
    textAlign: 'center',
  },
  formRow:{
    marginTop: '10px',
  },
  formLabel:{
    lineHeight: '30px'
  }
};
