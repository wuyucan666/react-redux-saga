/* eslint-disable react/no-unused-state, no-plusplus */
import React, { useState, useRef } from 'react';
import {
  Table,
  Switch,
  Icon,
  Button,
  Grid,
  Pagination,
  Dialog,
  Input,
  Message,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import {
  AuctionListType,
  auditStatus,
  imgUrl,
  ShootType,
  ShootCreateType,
  ShootChannel,
  renderTime,
  Spokesman,
} from '../../../../../common/js/filter';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;

export default function CustomTable(props) {
  const [value, setValue] = useState({});
  const [page, setPage] = useState(1);
  const [id, setId] = useState('');
  const [visible, setVisible] = useState(false);
  const [recordVisible, setrecordVisible] = useState(false);
  const [simpleFormDialog, setSimpleFormDialog] = useState({
    ...styles.simpleFormDialog,
  });
  const ref = useRef('form');

  const handlePaginationChange = current => {
    setPage(current);
    // console.log(props.pages);
    props.handlePage(current);
  };

  const recordClose = () => {
    setrecordVisible(false);
  };

  const freezeRecord = (e, val) => {
    console.log(e, val);
    const newVal = {
      id: val,
    };
    props.freezeRecord(newVal);
    setrecordVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };

  const failure = (e, val) => {
    setVisible(true);
    setId(val);
  };

  const onOk = e => {
    const NewVal = {
      terminateReason: '',
      id,
      ...value,
    };
    setValue(NewVal);
    if (NewVal.terminateReason == '') {
      Message.error('请输入下架原因');
    } else {
      props.failure(NewVal);
      hideDialog();
    }
  };

  const renderOper = (val, o, data) => {
    if (data.status == 0) { // 待审核
      return (
        <div style={styles.oper}>
          <Link
            style={styles.link}
            to={`/PasswordActivity/ReviewDetails?id=${data.id}&status=${data.status}`}
          >
            审核
          </Link>
        </div>
      );
    } else if (data.status == 1) { // 审核通过(即合作中)
      return (
        <div style={styles.oper}>
          <Link
            style={styles.link}
            to={`/PasswordActivity/ReviewDetails?id=${data.id}&status=${data.status}`}
          >
            查看
          </Link>
          <Link
            style={styles.link}
            to={`/PasswordActivity/DistributionGift?nickname=${data.nickname}&mobile=${data.mobile}&uuid=${data.uuid}&realname=${data.realname}`}
          >
            发放礼品
          </Link>
          <Link
            style={styles.link}
            to={`/PasswordActivity/IssueRecord?id=${data.id}`}
          >
            发放记录
          </Link>
          <Link style={styles.link} to="#" onClick={e => failure(e, data.id)}>
            解约
          </Link>
          <Link style={styles.link} to={`/PasswordActivity/Cooperative?id=${data.id}&uuid=${data.uuid}`} >
            合作记录
          </Link>
        </div>
      );
    } else if (data.status == -1) { // 审核失败
      return (
        <div style={styles.oper}>
          <Link
            style={styles.link}
            to={`/PasswordActivity/ReviewDetails?id=${data.id}&status=${data.status}`}
          >
            查看
          </Link>
        </div>
      );
    } else if (data.status == -2) { // 已解约
      return (
        <div style={styles.oper}>
          <Link
            style={styles.link}
            to={`/PasswordActivity/ReviewDetails?id=${data.id}&status=${data.status}`}
          >
            查看
          </Link>
          <Link
            style={styles.link}
            to={`/PasswordActivity/IssueRecord?id=${data.id}`}
          >
            发放记录
          </Link>
        </div>
      );
    }
  };

  return (
    // <IceContainer title={`资金列表(共${this.props.total}条)`}>
    <IceContainer title={`数据列表  总数据：${props.total}条`}>
      {/* <div>
          用户:{props.total}人
        </div>
        <div>
          获奖数量:{props.rewardsSum}件
        </div> */}
      <Table dataSource={props.lists}>
        {/* <Table.Column title="编号" dataIndex="nickname" width={100} /> */}
        <Table.Column title="用户ID" dataIndex="uuid" width={100} />
        <Table.Column title="用户名称" dataIndex="nickname" width={200} />
        <Table.Column title="用户账号" dataIndex="mobile" width={200} />
        <Table.Column title="真实姓名" dataIndex="realname" width={100} />
        <Table.Column
          title="申请时间"
          dataIndex="created"
          width={200}
          cell={renderTime}
        />
        <Table.Column title="微信号" dataIndex="wxAccount" width={200} />
        <Table.Column title="获得礼品数量" dataIndex="prizeTotal" width={200} />
        <Table.Column
          title="代言人状态"
          dataIndex="status"
          width={200}
          cell={Spokesman}
        />
        <Table.Column
          title="审核人员"
          dataIndex="checkAuthorName"
          width={200}
        />
        <Table.Column title="操作" width={200} cell={renderOper} />
      </Table>
      <Dialog
        style={simpleFormDialog}
        autoFocus={false}
        footerAlign="center"
        title="解约确认"
        // {...this.props}
        onOk={e => onOk(e)}
        onCancel={hideDialog}
        onClose={hideDialog}
        isFullScreen
        visible={visible}
      >
        <IceFormBinderWrapper value={value} ref={ref}>
          <div style={styles.dialogContent}>
            <Row style={styles.formRow}>
              你正在用户解约操作，请输入下架原因!
            </Row>
            <Row style={styles.formRow}>
              <IceFormBinder name="terminateReason">
                <Input.TextArea
                  style={styles.input}
                  maxLength={200}
                  placeholder="请输入解约原因"
                  // htmlType="number"
                />
              </IceFormBinder>
              <IceFormError name="terminateReason" />
            </Row>
          </div>
        </IceFormBinderWrapper>
      </Dialog>
      <Dialog
        title="发放记录"
        visible={recordVisible}
        onCancel={recordClose}
        onClose={recordClose}
        footer={
          <Button type="normal" onClick={recordClose}>
            取消
          </Button>
        }
        id="cls"
      >
        <div style={styles.widFixed}>
          {props.record.length == 0
            ? '暂无数据'
            : props.record.map((item, index) => {
                return (
                  <div key={index}>
                    <div style={styles.pbFixed}>
                      {/* <span style={styles.mrFixed}>第几次发放:</span> */}
                      <span>{item.name}</span>
                    </div>
                    {item.prizeList
                      ? item.prizeList.forEach((i, index) => {
                        <div style={styles.pbFixed}>
                          <span style={styles.mrFixed}>礼品名称:</span>
                          <span>{i.name}</span>
                        </div>;

                          //  <div style={styles.pbFixed}>
                          //   <span style={styles.mrFixed}>礼品总数量:</span>
                          //   <span>{i.total}</span>
                          // </div>
                        })
                      : ''}
                    <br />
                    <br />
                    <br />
                  </div>
                );
              })}
        </div>
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
  marginLeft: {
    marginLeft: '10px',
  },
  formRow: {
    marginTop: '5px',
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
  mr20: {
    marginRight: '20px',
  },
  links: {
    float: 'right',
    lineHeight: '40px',
  },
  widFixed: {
    width: '400px',
  },
  pbFixed: {
    paddingBottom: '15px',
  },
  mrFixed: {
    marginRight: '15px',
  },
  link: {
    whiteSpace: 'nowrap',
    textAlign: 'center',
    display: 'block',
  },
};
