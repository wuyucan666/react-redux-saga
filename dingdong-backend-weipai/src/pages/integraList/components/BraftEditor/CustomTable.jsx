/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, Dialog, Icon, Button, Grid, Pagination, Input,Message } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { renderAmount, renderOriginalAmount,renderTime, renderMoneyType } from '../../../../common/js/filter'
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
      recordVisible:false,
      titleReason: '',
      reason:'',
      amount:'0',
    };
  }

  formChange = (value) => {
    console.log('changed value', value);
    this.setState({
      formValue: value,
    });
  };

  onChange = (val) =>{
    // console.log(val);
    this.setState({
      ...this.state,
      amount: val,
    })
  }

  handlePaginationChange = (current) => {
    let val = {}
    console.log(this.state);
    this.props.handlePage(current)
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

  render() {
    console.log(this.props.recordList)
    const {list} = this.props.recordList
    // console.log(Boolean(list),list)
    return (
      <div>
        <IceContainer title={`积分列表(共${this.props.total}条)`}>
          <Table
            dataSource={this.props.lists}
          // rowSelection={{ onChange: this.onChange }}
          >
            <Table.Column title="时间" dataIndex="created" cell={renderTime} width={200} />
            <Table.Column title="变更途径" dataIndex="channel"  width={200} />
            <Table.Column title="积分变动" dataIndex="rewards"  width={200} />
            <Table.Column title="剩余积分" dataIndex="balance"  width={100} />
          </Table>
          <Pagination
            style={styles.pagination}
            current={this.props.pages}
            onChange={this.handlePaginationChange}
            onPageSizeChange={handlePageSizeChange}
            total={this.props.total}
            pageSize={20}
          />
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
    marginRight: '20px'
  },
  links: {
    float: 'right',
    lineHeight: '40px',
  },
  widFixed:{
    width:'400px',
  },
  pbFixed:{
    paddingBottom:'15px',
  },
  mrFixed:{
    marginRight:'15px'
  }
};
