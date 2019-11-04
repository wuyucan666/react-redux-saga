import React, {Component} from 'react';
import {Table, Switch, Input, Grid, Pagination, Dialog, Message} from '@alifd/next';
import IceContainer from '@icedesign/container';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import {Link} from 'react-router-dom';
import nw from '../../../../../common/http/post'
import {imgUrl, renderTime} from '../../../../../common/js/filter';
const {Row, Col} = Grid;

const handlePageSizeChange = size => console.log(size);

export default class CustomTable extends Component {
  static displayName = 'CustomTable';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visibleDialog: false,
      settingVisible: false,
      lwerID: '',
      dialogContent: '',
      reason: ''
    };
  };

  handleOnRelease = (id) => { // 发布
    this.props.handleOnRelease({id, status: 1})
  };

  handleOnLowerShelf = (id) => { // 下架
    this.setState({
      settingVisible: true,
      lwerID: id
    })
  };

  handleOnDelete = (id) => { // 删除
    this.props.handleOnDelete(id)
  };

  handlePaginationChange = () => { // 翻页

  };

  handleOnConfirmDialog = () => { // 确认弹框
    if (!this.state.reason) {
      Message.warning('请输入下架原因')
      return false
    }
    this.props.handleOnLowerShelf({id: this.state.lwerID, status: 2, offReason: this.state.reason})
    this.setState({
      settingVisible: false
    })
  };

  handleOnCloseDialog = () => { // 关闭弹框
    this.setState({
      settingVisible: false
    })
  };

  handleChangeReason = (reason) => { // 获取下架原因
    this.setState({
      reason
    })
  }
  
  renderOper = (val, o, data) => { // 操作
    return (
      <div style={styles.oper}>
        <Row wrap>
          <Col l="24" >
            {
              val == 0 ? (
                <>
                  <Link onClick={() => this.handleOnRelease(data.id)} style={styles.link} to={`#`}  >
                    发布
                  </Link>
                  <Link style={styles.link} to={`/setting/NoviceGuideUpdate?id=${data.id}`} >
                    编辑
                  </Link>
                  <Link style={styles.link} onClick={() => this.handleOnDelete(data.id)} to={'#'} >
                    删除
                  </Link>
                </>
              ) : val == 1 ? (
                <>
                  <Link style={styles.link} to={`/setting/NoviceGuideDetail?id=${data.id}`} >
                    查看
                  </Link>
                  <Link style={styles.link} to={`/setting/NoviceGuideUpdate?id=${data.id}`} >
                    编辑
                  </Link>
                  <Link style={styles.link} onClick={() => this.handleOnLowerShelf(data.id)} to={'#'} >
                    下架
                  </Link>
                </>
              ) : val == 2 ? (
                <>
                  <Link style={styles.link} to={`/setting/NoviceGuideDetail?id=${data.id}`} >
                    查看
                  </Link>
                  <Link style={styles.link} onClick={() => this.handleOnDelete(data.id)} to={'#'} >
                    删除
                  </Link>
                </>
              ) : null
            }
          </Col>
        </Row>
      </div>
    )
  };

  renderIndex = (val, index) => {
    return (
      <div style={styles.oper}>
        {index + 1}
      </div>
    )
  };

  renderStatus = (val, i, all) => { // 自动发布
    return (
      <span>{val == 0 ? '待发布' : val == 1 ? '已发布' : '已下架'}</span>
    )
  };

  platformRender = (val, i, all) => { // 发布平台
    let types = [{id: 1, type: '安卓'}, {id: 2, type: 'IOS'}, {id: 3, type: '小程序'}, {id: 4, type: '商户后台'}, {id: 5, type: 'H5'}];
    if (!val) return false;

    let platformParmas = val.split(',');
    let newArr = []
    if (platformParmas.length > 0) {
      types.forEach(el => {
        platformParmas.forEach(list => {
          if (list == el.id) {
            newArr.push(el)
          }
        })
      })
      return(
        newArr.map(el => <span style={{paddingRight: '10px'}} key={el.id}>{el.type}</span>)
      )
    } else {
      return null
    }
  };

  newsState = (val, i, all) => {
    return (
      <span>{val == 0 ? '待发布' : val == 1 ? '已发布' : val == 2 ? '已下架' : ''}</span>
    )
  };

  render() {
    return(
      <IceContainer title={`新手指引列表（共${this.props.total}条数据）`}>
        <Row wrap style={styles.headRow}>
        </Row>
        <Table
          dataSource={this.props.lists}
        >
          <Table.Column title="序列" dataIndex="id" cell={this.renderIndex} width={80} />
          <Table.Column title="指引名称" dataIndex="title" width={240} />
          <Table.Column title="上传时间" dataIndex="created" cell={renderTime} width={150} />
          <Table.Column title="发布时间" dataIndex="issueTime" cell={renderTime} width={150} />
          <Table.Column title="发布平台" dataIndex="platform" cell={this.platformRender} width={150} />
          <Table.Column title="指引状态" dataIndex="status" cell={this.renderStatus} width={100} />
          <Table.Column title="操作人" dataIndex="addNickname" width={100} />
          <Table.Column title="操作" dataIndex="status" width={180} cell={this.renderOper} />
        </Table>
        <Pagination
          style={styles.pagination}
          current={this.props.pages}
          onChange={this.handlePaginationChange}
          onPageSizeChange={handlePageSizeChange}
          pageSize={20}
          total={this.props.total}
        />
        <Dialog 
          title="下架提示"
          visible={this.state.settingVisible}
          onCancel={this.handleOnCloseDialog}
          onClose={this.handleOnCloseDialog}
          onOk={this.handleOnConfirmDialog}
          okProps={{children: '确认'}}
        >
          <div style={styles.widFixed}>
            <div style={styles.tips}>你正在操作指引下架操作，操作成功后用户端将停止该指引的展示，是请输入下架原因。</div>
            <div style={styles.reasonWrapper}>
              <span style={styles.formLabel}>原因：</span>
              <Input placeholder="请输入下架原因" onChange={this.handleChangeReason} value={this.state.reason} style={{width: '320px'}} size="medium" />
            </div>
          </div>
        </Dialog>
      </IceContainer>
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
  handle: {
    textAlign: 'center',
  },
  button: {
    borderRadius: '4px',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'center',
  },
  link: {
    marginLeft: '10px'
  },
  widFixed: {
    minWidth: '330px',
  },
  tips: {
    textAlign: 'center',
    width: '370px',
    margin: '0 auto',
    fontWeight: '600',
    lineHeight: '30px',
  },
  reasonWrapper: {
    padding: '40px 0 40px 15px',
    boxSizing: 'border-box',
    width: '400px',
    margin: '0 auto'
  },
  pbFixed: {
    paddingBottom: '15px',
  },
  pbFixedFLex: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '15px',
  },
  mrFixed: {
    marginRight: '15px'
  },
  formItem: {
    display: 'flex',
    alignItems: 'center',
  },
  formLabel: {
    minWidth: '70px',
  },
  formDate: {
    minWidth: '150px',
  },
  switch: {
    width: '80px'
  }
}
