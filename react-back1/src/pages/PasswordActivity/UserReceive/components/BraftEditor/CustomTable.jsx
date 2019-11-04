
/* eslint-disable react/no-unused-state, no-plusplus */
import React, { useState,useRef } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination,Dialog,Input,Message  } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import {AuctionListType,auditStatus,imgUrl,ShootType,ShootCreateType,ShootChannel,renderTime,RaffleStatus } from '../../../../../common/js/filter'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
const { Row, Col } = Grid;


export default function CustomTable(props)  {
  const [value, setValue] = useState({
    
  });
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


const renderOper = (val,o,data) => {
  return (
    <div style={styles.oper}>
     <Link style={styles.link}  to={`/PasswordActivity/UserReceiveDetails?id=${data.id}`}  >
      查看
    </Link>
    </div>
  );
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
          <Table
          dataSource={props.lists}
        >
          {/* <Table.Column title="编号" dataIndex="nickname" width={100} /> */}
          <Table.Column title="领取用户" dataIndex="nickname" width={100} />
          <Table.Column title="用户uuid" dataIndex="uuid" width={200}  />
          <Table.Column title="用户姓名" dataIndex="realname" width={200}  />
          <Table.Column title="用户账号" dataIndex="mobile" width={100} />
          <Table.Column title="领取时间" dataIndex="getTime" width={200} cell={renderTime}/>
          <Table.Column title="礼品状态" dataIndex="status" width={200}  cell={RaffleStatus}/>
          <Table.Column title="操作人员" dataIndex="optName" width={200} />
          <Table.Column title="操作" width={200} cell={renderOper}/>
        </Table>
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
  }
};
