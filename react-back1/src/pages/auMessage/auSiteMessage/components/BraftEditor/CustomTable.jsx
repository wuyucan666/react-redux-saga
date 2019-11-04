/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, Switch, Icon, Button, Grid, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';

import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from '../../../../../utils/injectReducer';
import { bindActionCreators } from 'redux';
import reducer from '../../../../../redux/UserLogin/reducer';
import { Link } from 'react-router-dom';
import {msgType,msgstatus,renderTime,delHtmlTag} from '../../../../../common/js/filter'
const { Row, Col } = Grid;;

const handlePageSizeChange = size => console.log(size);

// let list = [];

export class CustomTable extends Component {
  static displayName = 'CustomTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      page: 1,
      limit: 20,
    };
  }

  componentDidMount() {
    console.log(document.cookie);
    //  list = this.props.state.list
    // console.log(list,this);
  }

  formChange = (value) => {
    console.log('changed value', value);
    this.setState({
      formValue: value,
    });
  };

  onChange = (...args) => {
    console.log(...args);
  };

  handlePaginationChange = (current) => {
    this.props.handlePage(current);
  };

  handlePageSizeChange = (size) => {
    this.props.handleSize(size);
  }


  renderOper = (val, o, data) => {
    console.log(val, o, data);
    return (
      <div style={styles.oper}>
        {/* <Icon
          type="edit"
          size="small"
          style={{ ...styles.icon, ...styles.editIcon }}
        />
        <Icon
          type="ashbin"
          size="small"
          style={{ ...styles.icon, ...styles.deleteIcon }}
        /> */}
        <Link target="_blank" style={styles.link} to={`/auMessage/UpdateMessage?id=${data.id}&val=1`} >
        查看
       </Link>
        <Link target="_blank" style={styles.link} to={`/auMessage/UpdateMessage?id=${data.id}`} >
        编辑
        </Link>
        <a style={styles.link} onClick={this.handleUpdate}>
          发布
        </a>
      </div>
    );
  };

  render() {
    if (this.props.lists != undefined) {
      if (this.props.lists != '') {
        for (let i = 0; i < this.props.lists.length; i++) {
          console.log(this.props.lists[i].content);
        }
      }
    }
    return (
      <IceContainer title="消息列表">
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
        {/* <div class="new-messages"> */}
        <Table
          dataSource={this.props.lists}
          // rowSelection={{ onChange: this.onChange }}
        >
          {/* <Table.Column title="编号" dataIndex="id" width={100} /> */}
          <Table.Column title="消息类型" dataIndex="msgType" width={150} cell={msgType} />
          <Table.Column title="消息标题" dataIndex="title" width={300} />
          <Table.Column title="消息内容" dataIndex="content" width={300} cell={delHtmlTag} style={styles.contents} />
          <Table.Column title="阅读数" dataIndex="readCount" width={100} />
          <Table.Column title="推送时间" dataIndex="sendTime" width={200} cell={renderTime} />
          <Table.Column title="创建时间" dataIndex="created" width={200} cell={renderTime} />
          <Table.Column title="消息状态" dataIndex="status" width={100} cell={msgstatus} />
          <Table.Column title="发布人员" dataIndex="sender" width={100} />
          <Table.Column title="操作" width={200} cell={this.renderOper} />
        </Table>
        {/* </div> */}
        <Pagination
          style={styles.pagination}
          current={this.props.pages}
          onChange={this.handlePaginationChange}
          onPageSizeChange={handlePageSizeChange}
          // pageSizeSelector="dropdown" pageSizePosition="end"  onPageSizeChange={this.handlePageSizeChange}
          total={this.props.total}
          pageSize={20}
        />
      </IceContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => ({
  // actions: bindActionCreators(loginAction, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'list', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomTable);


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
  link: {
    margin: '0 5px',
    color: 'rgba(49, 128, 253, 0.65)',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  // contents:{
  //   height: '100px',
  //   display: '-webkit-box',
  //   '-webkit-box-orient':'vertical',
  //   '-webkit-line-clamp': 5,
  //   overflow: 'hidden',
  // }
  /* .next-table td .next-table-cell-wrapper{ } */
};
