/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, DatePicker, Dialog, Button, Grid, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';
// import {
//   FormBinderWrapper as IceFormBinderWrapper,
//   FormBinder as IceFormBinder,
//   FormError as IceFormError,
// } from '@icedesign/form-binder';
// import { DatePicker } from '@alifd/next';
// const { RangePicker} = DatePicker;
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { Link } from 'react-router-dom';
import {AuctionListType,auditStatus,imgUrl,renderTime} from '../../../../../common/js/filter'
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
      recordVisible:false,
      settingVisible:false,
      aid:'',
      shopId:'',
      startTime:0,
    };
  }

  handlePaginationChange = (current) => {
    this.props.handlePage(current)
  };
  
  productRender = (val) =>{
    if(val){
      val = JSON.parse(val)
      // console.log(val)
      return <img src={imgUrl(val.url)} className="media-side"  width={80}/>
    }
  }

  onChange = (value) => {
    // console.log(value);
    this.setState({
      startTime:value._d.getTime()/1000
    })
  }

  recordClose = () => {
    this.setState({
      ...this.state,
      recordVisible: false,
    })
  }

  timeCommit = () => {
    this.setState({
      ...this.state,
      settingVisible: false,
    })
    let {aid,shopId,startTime} = this.state
    this.props.modifyCommit({
      aid,
      shopId,
      startTime
    })
    // console.log(aid,shopId,startTime)
  }
  timeClose = () => {
    this.setState({
      ...this.state,
      settingVisible: false,
    })
    // console.log(aid,shopId,startTime)
  }

  closeAuco = (aid) =>{
    this.props.closeAuco(aid)
  }
  specialTime = (data) =>{
    const{aid,shopId,startTime,name} = data
    this.setState({
      ...this.state,
      formValue: {
        startTime,
        name
      },
      settingVisible: true,
      aid,
      shopId
    })
  }
  specialRecord = (data) =>{
    const{aid,shopId,name} = data
    this.setState({
      ...this.state,
      recordVisible: true,
      formValue: {
        name
      },
    })
    // console.log(aid,shopId)
    this.props.modifyRecord({aid,shopId})
  }

  renderOper = (val,o,data) => {
    if( data.auditStatus == 3 ){
      // if(data.changeStartTimeFlag==1){
        return (
          <div style={styles.oper}>
            <Row wrap>
              <Col l="24" >
                <Link target="_blank" style={styles.link} to={`/auMerchants/AuctionDetails?aid=${data.aid}&status=${data.auditStatus}`}  >
                  查看
                </Link>
              </Col>
            </Row>
          </div>
          )
    }else{
      if(data.changeStartTimeFlag== 1){
        return (
          <div style={styles.oper}>
            <Link target="_blank" style={styles.link} to={`/auMerchants/AuctionDetails?aid=${data.aid}&status=${data.auditStatus}`}  >
              查看
            </Link>
            <Col l="24" >
              <Link style={styles.link} to={`#`} onClick={()=>{this.specialTime(data);}} >
              修改专场
              </Link>
            </Col>
            <Col l="24" >
              <Link style={styles.link} to={`#`} onClick={()=>{this.specialRecord(data);}} >
                查看专场记录
              </Link>
            </Col>
          </div>
        );
      }else{
        return (
          <div style={styles.oper}>
            <Link target="_blank" style={styles.link} to={`/auMerchants/AuctionDetails?aid=${data.aid}&status=${data.auditStatus}`}  >
              查看
            </Link>
            <Col l="24" >
              <Link style={styles.link} to={`#`} onClick={()=>{this.specialTime(data);}} >
              修改专场
              </Link>
            </Col>
          </div>
        );
      }
    }
  };

  render() {
    // console.log(this.props.modification);
    return (
      <IceContainer title="数据列表">
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
        <Table
          dataSource={this.props.lists}
        >
          <Table.Column title="商家昵称" dataIndex="shopName" width={100} />
          <Table.Column title="商户ID" dataIndex="shopId" width={100} />
          <Table.Column title="专场名称" dataIndex="name" width={100} />
          <Table.Column title="专场类型" dataIndex="type" width={200}  cell={AuctionListType}/>
          {/* <Table.Column title="封面展示图" dataIndex="thumb" width={200} cell={this.productRender} /> */}         
          <Table.Column title="拍品数" dataIndex="coCount" width={100} />
          <Table.Column title="开拍时间" dataIndex="startTime" cell={renderTime} width={200} />
          {/* <Table.Column title="结束时间" dataIndex="coCount" width={100} /> */}
          <Table.Column title="审核人员" dataIndex="auditor" width={200} />
          <Table.Column title="审核状态" dataIndex="auditStatus" width={200}  cell={auditStatus}/>
          {/* <Table.Column title="审核人员状态" dataIndex="auditStatus" width={200}  cell={AuctionListAuditStatus}/> */}
          <Table.Column title="操作" dataIndex="auditStatus" width={200} cell={this.renderOper}/>
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
            title="修改专场时间"
            visible={this.state.settingVisible}
            onCancel={this.timeClose}
            onClose={this.timeClose}
            onOk={this.timeCommit}
            okProps={{ children: '提交', }}
          >
            <div style={styles.widFixed}>
              <div style={styles.pbFixed}>
                <span style={styles.mrFixed}>专场名称:</span>
                <span>{this.state.formValue.name}</span>
              </div>
              <div style={styles.pbFixed}>
                <span style={styles.mrFixed}>开拍时间:</span>
                <span>{renderTime(this.state.formValue.startTime)}</span>
              </div>
              <div style={styles.pbFixed}>
                <span style={styles.formLabel}>日期：</span>
                <DatePicker showTime style={styles.formDate} onChange={this.onChange} />
              </div>
              {/* <div style={styles.pbFixed}>
                <span style={styles.formLabel}>结束日期：</span>
                <DatePicker style={styles.formDate} onChange={onChange} />
              </div> */}
            </div>
        </Dialog>
        <Dialog
            title="专场记录"
            isFullScreen={true}
            visible={this.state.recordVisible}
            onCancel={this.recordClose}
            onClose={this.recordClose}
            footer={<Button type="normal" onClick={this.recordClose}>取消</Button>}
          >
            <div style={styles.widFixed}>
                <div style={styles.pbFixed}>
                  <span style={styles.mrFixed}>专场名称:</span>
                  <span>{this.state.formValue.name}</span>
                </div>
              <br/><br/>
              { this.props.modification.length==0?
                '暂无数据'
                :
                this.props.modification.map((item,index) => {
                return (
                  <div key ={index}>
                    <div style={styles.pbFixed}>
                      <span style={styles.mrFixed}>{`第${index+1}次修改`}</span>
                    </div>
                    <div style={styles.pbFixed}>
                      <span style={styles.mrFixed}>专场开拍时间:</span>
                      <span>{item.originalStartTime}</span>
                    </div>
                    <div style={styles.pbFixed}>
                      <span style={styles.mrFixed}>修改后专场开拍时间:</span>
                      <span>{item.nowStartTime}</span>
                    </div>
                    
                    <br/><br/><br/>
                  </div>
                );
              })}
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
  handle:{
    textAlign: 'center',
  },
  button: {
    borderRadius: '4px',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'center',
  },
  link:{
    marginLeft:'10px'
  },
  widFixed:{
    minWidth:'500px',
  },
  pbFixed:{
    paddingBottom:'15px',
  },
  mrFixed:{
    marginRight:'15px'
  },
  formItem: {
    display: 'flex',
    alignItems: 'center',
    // margin: '10px 10px 0 10px',
  },
  formLabel: {
    minWidth: '70px',
  },
  formDate:{
    minWidth: '150px',
  }
};
