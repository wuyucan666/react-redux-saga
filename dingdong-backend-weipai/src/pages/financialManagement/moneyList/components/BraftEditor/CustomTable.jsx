/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, Dialog, Icon, Button, Grid, Pagination, Input, Message } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { renderAmount, renderOriginalAmount, renderTime, renderMoneyType } from '../../../../../common/js/filter';
import { Link } from 'react-router-dom';

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
      textCustomizedVisible: false,
      recordVisible: false,
      titleReason: '',
      reason: '',
      amount: '0',
    };
  }

  formChange = (value) => {
    console.log('changed value', value);
    this.setState({
      formValue: value,
    });
  };
  freezeRecord = (e) => {
    this.setState({
      ...this.state,
      recordVisible: true,
    });
  };
  freeze = (e) => {
    this.setState({
      ...this.state,
      textCustomizedVisible: true,
      titleReason: '冻结',
    });
  };
  unfreeze = (e) => {
    this.setState({
      ...this.state,
      textCustomizedVisible: true,
      titleReason: '解冻',
    });
  };
  onClose = () => {
    this.setState({
      ...this.state,
      textCustomizedVisible: false,
    });
  }
  recordClose = () => {
    this.setState({
      ...this.state,
      recordVisible: false,
    });
  }
  onChange = (val) => {
    // console.log(val);
    this.setState({
      ...this.state,
      amount: val,
    });
  }
  onChangeReason = (val) => {
    // console.log(val);
    this.setState({
      ...this.state,
      reason: val,
    });
  }
  onCommit = () => {
    const { amount, reason } = this.state;
    const { mobile } = this.props;
    console.log('mobile', mobile);
    if (mobile.length == 11) {
      const param = {
        moneyType: 1,
        mobile,
        amount,
        reason,
      };
      // console.log(param);
      if (this.state.titleReason == '冻结') {
        this.setState({
          textCustomizedVisible: false,
        }, () => {
          this.props.freeze(param);
        });
      } else {
        this.setState({
          textCustomizedVisible: false,
        }, () => {
          this.props.unfreeze(param);
        });
      }
    } else {
      Message.error('用户手机号码不正确');
    }
  }

  handlePaginationChange = (current) => {
    const val = {};
    console.log(this.state);
    this.props.handlePage(current);
  };


  renderOper = () => {
    return (
      <div style={styles.oper}>
        <Icon
          type="edit"
          size="small"
          style={{ ...styles.icon, ...styles.editIcon }}
        />
        <Icon
          type="ashbin"
          size="small"
          style={{ ...styles.icon, ...styles.deleteIcon }}
        />
      </div>
    );
  };

  renderTradeSn = (val) => {
    return (val || '无');
  };

  rederFormer = (value, index, record) => {
    const balance = record.balance !== undefined && record.balance !== null ? record.balance / 100 : 0;
    const amount = record.amount !== undefined && record.amount !== null ? record.amount / 100 : 0;
    const f = `${balance - amount}元`;
    return f;
  }

  render() {
    const { list } = this.props.recordList;
    // console.log(Boolean(list),list)
    return (
      <div>
        <IceContainer>
          <Row wrap style={styles.headRow}>
            <Col l="8">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>账户余额：</span>
                <Input value={renderAmount(this.props.balance)} disabled style={{ marginLeft: '14px' }} />
              </div>
            </Col>
            <Col l="8">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>冻结余额：</span>
                <Input value={renderAmount(this.props.freezeBalance)} disabled style={{ marginLeft: '14px' }} />
              </div>
            </Col>
            <Col l="8">
              <div style={styles.formItem}>
                <Button type="primary" style={styles.mr20} onClick={this.freeze} >
                    冻结
                </Button>
                <Button type="primary" onClick={this.unfreeze} >
                    解冻
                </Button>
              </div>
            </Col>
          </Row>
          <Row wrap style={styles.headRow}>
            <Col l="8">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>保证金余额：</span>
                <Input value={renderAmount(this.props.margin)} disabled />
              </div>
            </Col>
            <Col l="8">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>冻结保证金：</span>
                <Input value={renderAmount(this.props.freezeMargin)} disabled />
              </div>
            </Col>
            <Col l="2">
              <div style={styles.links}>
                <Link to="#" onClick={this.freezeRecord} >余额冻结记录>></Link>
              </div>
            </Col>
          </Row>
        </IceContainer>
        <IceContainer title={`资金列表(共${this.props.total}条)`}>
          <Table
            dataSource={this.props.lists}
          // rowSelection={{ onChange: this.onChange }}
          >
            {/* <Table.Column title="交易时间" dataIndex="created" cell={renderTime} width={200} />
            <Table.Column title="用户昵称" dataIndex="nickname"  width={200} />
            <Table.Column title="真实姓名" dataIndex="realname"  width={200} />
            <Table.Column title="原账号金额" dataIndex="balance" cell={renderOriginalAmount} width={100} />
            <Table.Column title="变动金额" dataIndex="amount" cell={renderAmount} width={100} />
            <Table.Column title="现有金额" dataIndex="balance" cell={renderAmount} width={100} />
            <Table.Column title="交易方式" dataIndex="cashType" cell={renderMoneyType} width={100} />
            <Table.Column title="订单号" dataIndex="orderSn" width={200} /> */}
            <Table.Column title="交易时间" dataIndex="created" cell={renderTime} width={150} />
            <Table.Column title="用户uuid" dataIndex="uuid" width={150} />
            <Table.Column title="手机号码" dataIndex="mobile" width={100} />
            <Table.Column title="用户昵称" dataIndex="nickname" width={100} />
            <Table.Column title="真实姓名" dataIndex="realname" width={100} />
            <Table.Column title="原账户余额" dataIndex="former" cell={this.rederFormer} width={100} />
            <Table.Column title="变动金额" dataIndex="amount" cell={renderAmount} width={100} />
            <Table.Column title="现有余额" dataIndex="balance" cell={renderAmount} width={100} />
            <Table.Column title="现有保证金" dataIndex="margin" cell={renderAmount} width={100} />
            <Table.Column title="交易方式" dataIndex="title" width={100} />
            <Table.Column title="订单号" dataIndex="orderSn" width={180} />
            {/* <Table.Column title="关联单号" dataIndex="tradeSn" cell={this.renderTradeSn} width={100} /> */}
          </Table>
          <Pagination
            style={styles.pagination}
            current={this.props.pages}
            onChange={this.handlePaginationChange}
            onPageSizeChange={handlePageSizeChange}
            total={this.props.total}
            pageSize={20}
          />
          <Dialog
            title={`${this.state.titleReason}说明`}
            visible={this.state.textCustomizedVisible}
            onOk={this.onCommit}
            onCancel={this.onClose}
            onClose={this.onClose}
            okProps={{ children: '提交' }}
          // cancelProps={{children: '取消'}}
          >
            <div style={styles.widFixed}>
              <div style={styles.pbFixed}>
                <span>{`${this.state.titleReason}用户:`}</span>
                <span style={{ marginLeft: '15px' }}>{this.props.nickname}</span>
              </div>
              <div style={styles.pbFixed}>
                <span>{`${this.state.titleReason}金额:`}</span>
                <Input
                  value={this.state.amount}
                  onChange={this.onChange}
                  // size='small'
                  style={{ marginLeft: '15px' }}
                />
              </div>
              <div style={styles.pbFixed}>
                <span>{`${this.state.titleReason}原因`}:</span>
                <Input.TextArea
                  value={this.state.reason}
                  onChange={this.onChangeReason}
                  style={{ width: 400, marginTop: '15px' }}
                />
              </div>
            </div>
          </Dialog>
          <Dialog
            title="冻结记录"
            visible={this.state.recordVisible}
            onCancel={this.recordClose}
            onClose={this.recordClose}
            footer={<Button type="normal" onClick={this.recordClose}>取消</Button>}
          >
            <div style={styles.widFixed}>
              { list.length == 0 ?
                '暂无数据'
                :
                list.map((item, index) => {
                return (
                  <div key={index}>
                    <div style={styles.pbFixed}>
                      <span style={styles.mrFixed}>类型:</span>
                      <span>{item.type == '1' ? '冻结' : '解冻'}</span>
                    </div>
                    <div style={styles.pbFixed}>
                      <span style={styles.mrFixed}>时间:</span>
                      <span>{renderTime(item.created)}</span>
                    </div>
                    <div style={styles.pbFixed}>
                      <span style={styles.mrFixed}>用户姓名:</span>
                      <span>{item.nickname}</span>
                    </div>
                    <div style={styles.pbFixed}>
                      <span style={styles.mrFixed}>金额:</span>
                      <span>{renderAmount(item.amount)}</span>
                    </div>
                    <div style={styles.pbFixed}>
                      <span style={styles.mrFixed}>理由:</span>
                      <span>{item.reason}</span>
                    </div>
                    <br /><br /><br />
                  </div>
                );
              })}
            </div>
          </Dialog>
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
};
