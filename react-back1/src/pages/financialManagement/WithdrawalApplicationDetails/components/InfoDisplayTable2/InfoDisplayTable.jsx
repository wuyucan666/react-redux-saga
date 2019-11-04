import React, { Component } from 'react';
import { Table } from '@alifd/next';
import IceContainer from '@icedesign/container';
import './InfoDisplayTable.scss';

/**
 * 表格接收的数据
 */
const dataSource = () => {
  const result = [];
  for (let i = 0; i < 1; i++) {
      result.push({
          title: {name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible`},
          id: 100306660940 + i,
          time: 2000 + i
      });
  }
  return result;
};

export default class InfoDisplayTable extends Component {
  static displayName = 'InfoDisplayTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="info-display-table" style={styles.infoDisplayTable}>
       <IceContainer title="充值记录">
          <Table dataSource={dataSource()}>
            <Table.Column title="充值时间" dataIndex="id"/>
            <Table.Column title="原账户余额" dataIndex="title.name" />
            <Table.Column title="充值金额" dataIndex="time"/>
            <Table.Column title="现有金额" dataIndex="time"/>
            <Table.Column title="订单类型" dataIndex="time"/>
            <Table.Column title="订单编号" dataIndex="time"/>
            <Table.Column title="订单关联号（平台出纳订单号）" dataIndex="time"/>
          </Table>
        </IceContainer>
      </div>
    );
  }
}

const styles = { infoDisplayTable: {} };
