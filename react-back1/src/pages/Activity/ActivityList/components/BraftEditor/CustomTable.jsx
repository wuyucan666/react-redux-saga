
/* eslint-disable react/no-unused-state, no-plusplus */
import React, { useState,useRef } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination,Dialog,Input  } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import {AuctionListType,auditStatus,imgUrl,ShootType,renderTime,ShootChannel,userType} from '../../../../../common/js/filter'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
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
  console.log(val)
  Dialog.confirm({
    title: '提示',
    content: '确认提醒该用户?',
    onOk:() => {
      // this.props.fndelete(data.uuid)
    },
  });
}

const fill = (e,val) =>{
  console.log(val)
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
  console.log(this.state.value.tel)
  if( this.state.value.tel == '' || this.state.value.tel == undefined){
    Message.error('请输入邀请人手机号') 
    return
  }else{
    const id = {
      userUuid:window.location.hash.split('=')[1],
      currentInviteUuid:data.inviteUuid,
      tel:this.state.value.tel,
      reason:this.state.value.reason
    }
    this.props.fnupdate(id)
    this.hideDialog();
  } 

};

const renderOper = (val,o,data) => {
  // console.log(data.auditStatus)
  if( data.id == 1 ){
    return (
      <div style={styles.oper}>
       <Link target="_blank" style={styles.link}  to={`/Activity/RaffleList`}  >
          查看
        </Link>
      </div>
    );
  }
  if( data.id == 4 ){
    return (
      <div style={styles.oper}>
       <Link target="_blank" style={styles.link}  to={`/Activity/RegisteredList`}  >
          查看
        </Link>
      </div>
    );
  }
  if( data.id == 3 ){
    return (
      <div style={styles.oper}>
       <Link target="_blank" style={styles.link}  to={`/Activity/InvitationList`}  >
          查看
        </Link>
      </div>
    );
  }
  if( data.id == 2 ){
    return (
      <div style={styles.oper}>
       <Link target="_blank" style={styles.link}  to={`/Activity/ShootList`}  >
          查看
        </Link>
      </div>
    );
  }  
};

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
          <Table.Column title="活动名称" dataIndex="name" width={100} />
          <Table.Column title="参与人数" dataIndex="joinCount" width={200}  />
          <Table.Column title="活动对象" dataIndex="userType" width={200}  cell={userType}/>
          <Table.Column title="活动开始时间" dataIndex="startTime" width={100} cell={renderTime}/>
          <Table.Column title="活动结束时间" dataIndex="endTime" width={100} cell={renderTime}/>
          <Table.Column title="活动礼品" dataIndex="reward" width={200} />
          <Table.Column title="活动说明" dataIndex="description" width={200}  cell={ShootType}/>
          <Table.Column title="操作" width={200} cell={renderOper}/>
        </Table>
        <Dialog
          style={simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          title="物流信息"
          // {...this.props}
          onOk={e=>onOk(e,sn)}
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
                  name="tel"
                  required    
                >
                <Input
                  style={styles.input}
                  placeholder="请输入物流公司"
                  // htmlType="number"
                />
                </IceFormBinder>
                <IceFormError name="tel" />
              </Row>
              <Row style={styles.formRow}>
                <label style={styles.formLabel}>物流单号:</label>
                <IceFormBinder
                  name="tel"
                  required    
                >
                <Input
                  style={styles.input}
                  placeholder="请输入物流单号"
                  // htmlType="number"
                />
                </IceFormBinder>
                <IceFormError name="tel" />
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
};
