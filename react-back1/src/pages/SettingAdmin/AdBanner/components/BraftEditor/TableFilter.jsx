/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Dialog,Button,Upload  } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import moment from 'moment';
import nw from '../../../../../common/http/post'
import {formatImgUrl,uploadImg} from '../../../../../common/js/common'
import IceContainer from '@icedesign/container';
// import {timeForMat} from '../../../../../common/js/common'
const { Row, Col } = Grid;

export default class Filter extends Component {
  static displayName = 'Filter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        adName:''
      },
      settingVisible:false,
      adThumb:'',
      adName:'',
      adLink:'',
    };
  }

  beforeUpload1 = (info)=> {
    let thiz = this;
    let data = {imageType:"avatar",file:info}
    nw.post(uploadImg(),data,function (res) {
      if(res.errorCode == 0){
        thiz.setState({
          adThumb:res.data.url,
        });
      }
    })

    return false
  }

  componentDidMount(){
    if ( window.location.hash.split('=')[1]){
      this.setState({
        value :{
          status:window.location.hash.split('=')[1],
        }
      });
    }
  }

  condition = ()=> {
    // console.log(this.state.value,this.props);
    this.props.handleListChange(this.state.value)
  }
  addClose = () => {
    this.setState({
      ...this.state,
      settingVisible: false,
    })
    // console.log(aid,shopId,startTime)
  }
  addCommit = () => {
    this.setState({
      ...this.state,
      settingVisible: false,
    })
    // let {adThumb,adName,adLink} = this.state
    let img = [{mid:'',url:this.state.adThumb}]
    let param = {
      adName:this.state.adName,
      adLink:this.state.adLink,
      adThumb:JSON.stringify(img)
    }
    this.props.AddAD(param)
    // console.log(param)
  }

  onRemove=(e)=>{
    if(e.imgURL){
      this.setState({
        adThumb:''
      })
    }
  }

  addAd = () => {
    this.setState({
      ...this.state,
      settingVisible:!this.state.settingVisible
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

  render() {
    let img = []
    if(this.state.adThumb!==''){
      img = [
        {
          name: '新增封面图.png',
          state: 'done',
          imgURL:formatImgUrl(this.state.adThumb)
        }
      ];
    }else{
      img = []
    }
    return (
      <IceContainer title="">
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>广告标题：</span>
              <IceFormBinder triggerType="onBlur" name="adName">
                <Input placeholder="请输入" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="adName" />
              </div>
            </div>
          </Col>
          <Col l="24">
            <div style={styles.formItem}>
              <Button type="primary" onClick={this.condition} style={styles.button}>
                查询
              </Button>
              <Button type="primary" onClick={this.addAd} style={styles.button}>
                添加
              </Button>
            </div>
          </Col>
        </Row>
        
      </IceFormBinderWrapper>
      <Dialog
            title="新增内容"
            visible={this.state.settingVisible}
            onCancel={this.addClose}
            onClose={this.addClose}
            onOk={this.addCommit}
            okProps={{ children: '保存', }}
          >
            <div style={styles.widFixed}>
              <div style={styles.pbFixed}>
                <span style={styles.mrFixed}>广告标题:</span>
                <Input placeholder="请输入广告标题" 
                value = {this.state.adName}
                onChange={this.onChangeAddTitle}
                />
              </div>
              <div style={styles.pbFixed}>
                <span style={styles.mrFixed}>广告链接:</span>
                <Input placeholder="请输入广告链接"
                value = {this.state.adLink}
                onChange={this.onChangeAdLink}
                />
              </div>
              <div style={styles.pbFixedFLex}>
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
  container: {
    margin: '20px',
    padding: '0',
  },
  button:{
    margin:'0 10px'
  },
  title: {
    margin: '0',
    padding: '20px',
    fonSize: '16px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: 'rgba(0,0,0,.85)',
    fontWeight: '500',
    borderBottom: '1px solid #eee',
  },
  formRow: {
    padding: '10px 20px',
  },
  formItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  formLabel: {
    minWidth: '70px',
  },
  widFixed:{
    minWidth:'500px',
  },
  pbFixed:{
    paddingBottom:'15px',
  },
  pbFixedFLex:{
    display:'flex',
    alignItems:'center',
    paddingBottom:'15px',
  },
  mrFixed:{
    marginRight:'15px'
  },
};
