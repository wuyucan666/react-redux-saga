/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import {Dialog, Table, DatePicker, Icon, Button, Grid, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import {renderGborderStatus,AuctionListType,imgUrl,renderTime} from '../../../../../common/js/filter'

const { Row, Col } = Grid;

const handlePageSizeChange = size => console.log(size); 

const GbModificationCommit = (props) =>{
  // console.log(props);
  if (Number(props.record.auditStatus)!=3){
    return <div>
      <Link style={styles.link} to={`#`} onClick={()=>{props.specialTime(props.record);}} >
        修改专场
      </Link>
    </div>
  }
  return null;
}
const GbModificationRecord = (props) =>{
  // console.log(props.record.changeStartFlag);
  if(Number(props.record.changeStartFlag) != 0){
    return <div>
    {/* <Col></Col> */}
    <Link style={styles.link} to={`#`} onClick={()=>{props.specialRecord(props.record);}} >
      查看专场记录
    </Link>
    </div>
  }
  return null;
  
}

export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      current: 1,
      size:15,
      recordVisible:false,
      settingVisible:false,
      aid:'',
      shopId:'',
      startTime:0,
      endTime:0
    };
  }

  formChange = (value) => {
    console.log('changed value', value);
    this.setState({
      formValue: value,
    });
  };


  onChangeStart = (value) => {
    // console.log(value);
    this.setState({
      startTime:value._d.getTime()/1000
    })
  }
  onChangeEnd = (value) => {
    // console.log(value);
    this.setState({
      endTime:value._d.getTime()/1000
    })
  }

  handlePaginationChange = (current) => {
    let obj={};
    obj.page = current;
    obj.limit = this.state.size;
    this.props.handlePage(obj)
  };

  handlePageSizeChange = (size) => {
    this.setState({
      size: size,
    });
  };

  agreed =(e,data)=>{
    console.log(data.id)
    
    Dialog.confirm({
      title: '提示',
      content: '确认同意该申请',
      onOk:() => {
        this.props.Agreed(data.id)
      },
    });
  }

  rejected =(e,data)=>{
    console.log(data.id)
    Dialog.confirm({
      title: '提示',
      content: '确认驳回该申请',
      onOk:() => {
        this.props.Rejected(data.id)
      },
    });

  }
  
  recordClose = () => {
    this.setState({
      ...this.state,
      recordVisible: false,
    })
  }

  timeClose = () => {
    this.setState({
      ...this.state,
      settingVisible: false,
    })
    // console.log(aid,shopId,startTime)
  }

  specialTime = (data) =>{
    const{gid,shopId,startTime,endTime,name} = data
    this.setState({
      ...this.state,
      formValue: {
        startTime,
        endTime,
        name
      },
      settingVisible: true,
      gid,
      shopId
    })
  }

  specialRecord = (data) =>{
    // console.log(data);
    const{gid,shopId,name} = data
    this.setState({
      ...this.state,
      recordVisible: true,
      formValue: {
        name
      },
    })
    // console.log(aid,shopId)
    this.props.modifyRecord({gid,shopId})
  }


  timeCommit = () => {
    this.setState({
      ...this.state,
      settingVisible: false,
    })
    let {gid,shopId,startTime,endTime} = this.state
    this.props.modifyCommit({
      gid,
      shopId,
      startTime,
      endTime
  })


}

  renderOper = (value, index, record) => {
    let context= ''
    if (record.auditStatus == 1) {
      context = '查看审核'
    } else {
      context = '查看'
    }
      return (
         <div>
            <Link target="_blank" style={styles.link} to={`/orderManagement/GbDetails?gid=${record.gid}&status=${record.status}`}    >
            { context }
            </Link>
            <GbModificationCommit
            record = {record}
            specialTime = {()=> this.specialTime(record)}
            />
            <GbModificationRecord
            record = {record}
            specialRecord = {()=>this.specialRecord(record)}
            />
          </div>
      );
  };


  render() {
    // console.log(this.props.list)
    let total = this.props.total
    const renderImg = (val) => {
      val = JSON.parse(val)
      // console.log(val)
      return (
        <div>
        {
          val.map((items,index) => (
            <img key={index} src={imgUrl(items.url)} className="media" width={80} style={{margin:'3px'}} />
         ))
        }
     </div>
     )
    }
    return (
      <IceContainer title={`数据列表 (专场数:${total})`}>
        <Table
          dataSource={this.props.list}
          // rowSelection={{ onChange: this.onChange }}
        >
          <Table.Column title="商家昵称" dataIndex="shopName" width={100} />
          <Table.Column title="商户ID" dataIndex="shopId" width={100} />
          <Table.Column title="专场名称" dataIndex="name" width={100} />
          <Table.Column title="专场类型" dataIndex="type" cell={AuctionListType} width={200} />
          {/* <Table.Column title="封面展示图" dataIndex="thumb" cell={renderImg} width={200} /> */}
          <Table.Column title="拍品数" dataIndex="coCount" width={100} />
          <Table.Column title="开始时间" dataIndex="startTime" cell={renderTime} width={200} />
          <Table.Column title="结束时间" dataIndex="endTime" cell={renderTime} width={200} />
          <Table.Column title="审核状态" dataIndex="auditStatus" cell={renderGborderStatus} width={200}/>
          <Table.Column title="审核人员" dataIndex="checkAuthorName" width={200} />
          <Table.Column title="操作"  width={300} cell={this.renderOper} />
        </Table>
        <Pagination
          // pageSizeSelector="dropdown"
          // pageSizePosition="end"
          // onPageSizeChange={this.handlePageSizeChange}
          style={styles.pagination}
          current={this.props.pages}
          onChange={this.handlePaginationChange}
          onPageSizeChange={handlePageSizeChange}
          total={this.props.total}
          pageSize={20}
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
                <span style={styles.mrFixed}>开团时间:</span>
                <span>{renderTime(this.state.formValue.startTime)}</span>
              </div>
              <div style={styles.pbFixed}>
                <span style={styles.mrFixed}>结束时间:</span>
                <span>{renderTime(this.state.formValue.endTime)}</span>
              </div>
              <div style={styles.pbFixed}>
                <span style={styles.formLabel}>开始日期：</span>
                <DatePicker showTime style={styles.formDate} onChange={this.onChangeStart} />
              </div>
              <div style={styles.pbFixed}>
                <span style={styles.formLabel}>结束日期：</span>
                <DatePicker showTime style={styles.formDate} onChange={this.onChangeEnd} />
              </div>
            </div>
          </Dialog>
          <Dialog
            title="专场记录"
            isFullScreen
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
                      <span style={styles.mrFixed}>专场开团时间:</span>
                      <span>{(item.originalStartTime)}</span>
                    </div>
                    <div style={styles.pbFixed}>
                      <span style={styles.mrFixed}>结束时间:</span>
                      <span>{(item.originalEndTime)}</span>
                    </div>
                    <br/>
                    <div style={styles.pbFixed}>
                      <span style={styles.mrFixed}>修改后专场开团时间:</span>
                      <span>{(item.nowStartTime)}</span>
                    </div>
                    <div style={styles.pbFixed}>
                      <span style={styles.mrFixed}>结束时间:</span>
                      <span>{(item.nowEndTime)}</span>
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
  button: {
    borderRadius: '4px',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'center',
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
};
