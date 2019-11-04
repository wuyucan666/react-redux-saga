
/* eslint-disable react/no-unused-state, no-plusplus */
import React, { useState,useRef } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination,Dialog,Input  } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import {AuctionListType,auditStatus,imgUrl,ShootType,renderTime,reinstall,forceUpdate} from '../../../../../common/js/filter'
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


const renderOper = (val,o,data) => {
  // console.log(data.auditStatus)
  return (
    <div style={styles.oper}>
     <Link style={styles.linkNav} to={`/Version/VersionDetails?id=${data.id}`}  >
        查看
      </Link>
     <Link style={styles.link} to={`/Version/EditVersion?id=${data.id}`}  >
        编辑
      </Link>
    </div>
  ); 
};

    return (
      <IceContainer title="数据列表" >
          <Table
          dataSource={props.lists}
        >
          {/* <Table.Column title="编号" dataIndex="nickname" width={100} /> */}
          <Table.Column title="发布版本号" dataIndex="version"  />
          <Table.Column title="发布时间" dataIndex="create_time" />
          <Table.Column title="上个版本号" dataIndex="old_version" />
          <Table.Column title="发布人" dataIndex="admin_name"  />
          <Table.Column title="是否强制更新" dataIndex="force_update"  cell={forceUpdate}/>
          <Table.Column title="是否重新安装" dataIndex="is_reinstall"   cell={reinstall}/>
          <Table.Column title="更新提示" dataIndex="tips"  />
          <Table.Column title="操作" cell={renderOper}/>
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
  linkNav: {
    marginRight: '20px',
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
