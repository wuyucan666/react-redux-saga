/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, Switch , Dialog, Input, Grid, Pagination,Upload } from '@alifd/next';
import IceContainer from '@icedesign/container';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { Link } from 'react-router-dom';
import nw from '../../../../../common/http/post'
import {formatImgUrl,uploadImg} from '../../../../../common/js/common'
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
      adThumb:'',
      adName:'',
      adLink:'',
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

  onChangeAddTitle = (adName) => {

    this.setState({
      ...this.state,
      adName
    })
  }
  onChangeAdLink = (adLink) => {
    this.setState({
      ...this.state,
      adLink
    })
  }

  adCommit = () => {
    this.setState({
      ...this.state,
      settingVisible: false,
    })
    let {adName,adThumb,adLink} = this.state
    this.props.EditAD({
      id:this.state.formValue.id,
      adName,
      adLink,
      adThumb
    })
    // console.log(this.state)
  }
  timeClose = () => {
    this.setState({
      ...this.state,
      settingVisible: false,
    })
    // console.log(aid,shopId,startTime)
  }

  onChangeSwtich = (all) =>{
    // console.log(all);
    const {id,status} = all
    if(status=='1'){
      this.props.SETTINGHiden({id})
    }
    else if (status == '0'){
      this.props.SETTINGShowOn({id})
    }
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

  beforeUpload1 = (info)=> {
    let thiz = this;
    let data = {imageType:"avatar",file:info}
    nw.post(uploadImg(),data,function (res) {
    let url = [{mid:'',url:res.data.url}]
      if(res.errorCode == 0){
        thiz.setState({
          adThumb:JSON.stringify(url),
        });
      }
    })

    return false
  }

  deleteThis = (id) => {
    Dialog.confirm({
      title: '提示',
      content: '是否删除该广告',
      onOk:() => {
        this.props.SETTINGDelte({id})
      },
    });
  }

  editAd = (data) => {
    this.setState({
      ...this.state,
      formValue:data,
      adThumb:data.adThumb,
      adName:data.adName,
      adLink:data.adLink,
      settingVisible:!this.state.settingVisible
    })
  }

  onRemove=(e)=>{
    if(e.imgURL){
      this.setState({
        adThumb:''
      })
    }
  }

  renderOper = (val,o,data) => {
    return (
      <div style={styles.oper}>
        <Row wrap>
          <Col l="24" >
            <Link onClick={()=>this.editAd(data)} style={styles.link} to={`#`}  >
              修改
            </Link>
            <Link style={styles.link} onClick={()=>this.deleteThis(data.id)} to={'#'} >
              删除
            </Link>
          </Col>
        </Row>
      </div>
      )
  };

  renderIndex = (val,index) => {
    return(
      <div style={styles.oper}>
        {index}
      </div>
    )
  }
  renderImg = (val) => {
    // console.log(val.indexof('url'));
    if(val){
      let imgInfo = JSON.parse(val)
      return(
        <div style={styles.oper}>
          <img width={150} height={150} src={imgUrl(imgInfo[0].url)} alt=""/>
        </div>
      )
    }
  }


  renderStatus= (val,i,all) => {
    return(
      <Switch checkedChildren="展示" style={styles.switch} defaultChecked={val=='1'?true:false} 
      onChange={()=>this.onChangeSwtich(all)} unCheckedChildren="不展示" />
    )
  }

  renderLink = (val) => {
    return(
      <div style={styles.oper}>
        <a href={val}>{val}</a>
      </div>
    )
  }

  render() {
    let img = []
    if(this.state.adThumb){
      let url = JSON.parse(this.state.adThumb)
      img = [
        {
          name: '封面图.png',
          state: 'done',
          imgURL:formatImgUrl(url[0].url)
        }
      ];
    }else{
      img = []
    }
    return (
      <IceContainer title={`广告列表（共${this.props.total}条数据）`}>
        <Row wrap style={styles.headRow}>
        </Row>
        <Table
          dataSource={this.props.lists}
        >
          <Table.Column title="序列" dataIndex="id" cell={this.renderIndex} width={100} />
          <Table.Column title="创建时间" dataIndex="created" cell={renderTime} width={100} />
          <Table.Column title="广告标题" dataIndex="adName" width={100} />
          <Table.Column title="广告位置" dataIndex="positionId" width={100} />
          <Table.Column title="广告链接" dataIndex="adLink" cell={this.renderLink}  width={200} />
          <Table.Column title="宣传图" dataIndex="adThumb" cell={this.renderImg} width={150} />
          <Table.Column title="是否展示" dataIndex="status" cell={this.renderStatus} width={100} />
          <Table.Column title="操作人" dataIndex="addNickname" width={100} />
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
            title="编辑内容"
            visible={this.state.settingVisible}
            onCancel={this.timeClose}
            onClose={this.timeClose}
            onOk={this.adCommit}
            okProps={{ children: '保存', }}
          >
            <div style={styles.widFixed}>
              <div style={styles.pbFixed}>
                <span style={styles.mrFixed}>广告标题:</span>
                <Input
                  value = {this.state.adName}
                  onChange={this.onChangeAddTitle}
                  placeholder="请输入广告标题"
                />
              </div>
              <div style={styles.pbFixed}>
                <span style={styles.mrFixed}>广告链接:</span>
                <Input
                  value = {this.state.adLink}
                  onChange={this.onChangeAdLink}
                  placeholder="请输入广告链接"
                />
              </div>
              <div style={styles.pbFixed}>
                <span style={styles.formLabel}>图片：</span>
                <Upload.Card
                  name="avatar"
                  listType="card"
                  action=""
                  accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                  beforeUpload={this.beforeUpload1}
                  onRemove = {this.onRemove}
                  limit={1}
                  value={img}
                />
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
  },
  switch:{
    width:'80px'
  }
};
