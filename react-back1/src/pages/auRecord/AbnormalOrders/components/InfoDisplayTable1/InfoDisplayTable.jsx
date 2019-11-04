import React, { Component } from 'react';
import { Table,Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';
import './InfoDisplayTable.scss';
const handlePageSizeChange = size => console.log(size); 

/**
 * 表格接收的数据
 */


export default class InfoDisplayTable extends Component {
  static displayName = 'InfoDisplayTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      current: 1,
    };
  }

  formChange = (value) => {
    console.log('changed value', value);
    this.setState({
      formValue: value,
    });
  };

  getData = () => {
    const result = [];
    for (let i = 0; i < 10; i++) {
      result.push({
        id: i + 1,
        name: `李晓红${i + 1}`,
        university: '浙江大学',
        college: '计算机',
        class: i + 1,
        phone: `187666206123${i}`,
        role: '管理员',
      });
    }
    return result;
  };

  onChange = (...args) => {
    console.log(...args);
  };

  handlePaginationChange = (current) => {
    this.setState({
      current,
    });
  };
  
  render() {
    return (
      <div className="info-display-table" style={styles.infoDisplayTable}>
       <IceContainer title="数据列表">
        <Table
          dataSource={this.getData()}
          // rowSelection={{ onChange: this.onChange }}
        >
          <Table.Column title="用户ID" dataIndex="id" width={100} />
          <Table.Column title="用户昵称" dataIndex="name" width={100} />
          <Table.Column title="异常时间" dataIndex="university" width={200} />
          <Table.Column title="受访网址" dataIndex="college" width={200} />
          <Table.Column title="操作" dataIndex="class" width={100} />
          <Table.Column title="备注" dataIndex="phone" width={200} />
          <Table.Column title="操作平台" dataIndex="role" width={200} />
        </Table>
        <Pagination
          style={styles.pagination}
          current={this.state.current}
          onChange={this.handlePaginationChange}
          pageSize={20}
          pageSizeSelector="dropdown" pageSizePosition="end" onPageSizeChange={handlePageSizeChange}
        />
      </IceContainer>
      </div>
    );
  }
}

const styles = { 
  infoDisplayTable: {} ,
  pagination: {
    marginTop: '20px',
    textAlign: 'center',
  },
};
