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
        <IceContainer title="地址信息">
          <Table dataSource={dataSource()}>
            <Table.Column title="收件人" dataIndex="id"/>
            <Table.Column title="电话号码" dataIndex="title.name" />
            <Table.Column title="所在地区" dataIndex="time"/>
            <Table.Column title="详细地址" dataIndex="time"/>
          </Table>
        </IceContainer>
        <IceContainer title="银行卡信息">
          <Table dataSource={dataSource()}>
            <Table.Column title="银行卡类型" dataIndex="id"/>
            <Table.Column title="开户支行" dataIndex="title.name" />
            <Table.Column title="银行卡号" dataIndex="time"/>
            <Table.Column title="绑定手机号" dataIndex="time"/>
          </Table>
        </IceContainer>
      </div>
    );
  }
}

const styles = { infoDisplayTable: {} };
