/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Dialog,Input, Select, Grid,Button,Icon,Radio } from '@alifd/next';
import { FormBinderWrapper, FormBinder } from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
import { enquireScreen } from 'enquire-js';
import Img from '@icedesign/img';
import {renderSex,renderTime,renderAccountStatus} from "../../../../../common/js/filter"
import {formatImgUrl,uploadImg,getToken} from '../../../../../common/js/common'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
const { Group: RadioGroup } = Radio;
const { Row, Col } = Grid;
const defaultValue = {
  keywords: '',
  type: 'post',
  content: '',
};
export default class UserTable extends Component {
  static displayName = 'UserTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      visible: false,
      value: defaultValue,
      isMobile: false,
      display_name: 'none', //此状态机为display的取值
      display_name_delete:'none',
      visibleAccount:false,
      sn:{
        avator: null,
        birthday: "",
        city: "",
        created: "",
        invite: null,
        level: "",
        mobile: "",
        nickname: "",
        preference: "",
        realname: "",
        sex: "",
        signature: "",
        status: "",
        uuid: "",
        vipEndTime: "",
        vipStartTime: "",
      }
    };
  }
  // componentDidUpdate(){
  //   // this.setState({
  //   //   sn:this.props.sn
  //   // })
  // }
  //   componentWillReceiveProps(nextProps) { // 父组件重传props时就会调用这个方法
  //     if(Object.keys(nextProps.sn).length!==0){
  //       // console.log(`测试^^!^^^${nextProps.sn}`)
  //       this.setState({sn: nextProps.sn});
  //     }
  // }  
  // shouldComponentUpdate(nextProps,nextState){
  //   // console.log(nextProps.sn,Object.keys(nextProps.sn).length==0)
  //   if(Object.keys(nextProps.sn).length==0 || nextProps.sn==nextState.sn){
  //   return false
  //   }
    
  //   this.setState({
  //     sn:nextProps.sn
  //   })
  //   console.log(nextProps.sn,nextState.sn,nextProps.sn==nextState.sn);
    
  //   return true
  // }

  passOn=()=>{
    this.props.passOn()
  }
  turnOff=()=> {
    this.props.turnOff()
  }

  showDialog = (e,data) => {
    this.setState({
      display_name: 'inline-block',
    });
    // console.log(data);
    if(data.invite && data.issetInvite!=0){
      this.setState({
        display_name_delete: 'inline-block',
      });
    }
    
  };

  Delete = (e,data) =>{
    Dialog.confirm({
      title: '提示',
      content: '确认删除邀请人',
      onOk:() => {
        // console.log(data)
        this.props.fndelete(data.uuid)
      },
    });
  }

  Update = (e,data) =>{
    this.setState({
      visible: true,
    });
    // this.props.fnupdate(data)
  }

  Account = (e,data) =>{
    this.setState({
      visibleAccount: true,
    });
    // this.props.fnaccount(data)
  }

  onOk = (e,data) => {
    console.log(data)
    if( this.state.value.tel == '' || this.state.value.tel == undefined){
      Message.error('请输入邀请人手机号') 
      return
    }else{
      const id = {
        userUuid:window.location.hash.split('uuid=')[1],
        currentInviteUuid:data.inviteUuid,
        tel:this.state.value.tel,
        reason:this.state.value.reason
      }
      this.props.fnupdate(id)
      this.hideDialog();
    } 

  };

  onOkAccount = () => {
    const id = {
      uuid:window.location.hash.split('uuid=')[1],
      status:this.state.value.status,
    }
    this.props.fnaccount(id)
    this.hideDialog();
  };

  hideDialog = () => {
    this.setState({
      visible: false,
      visibleAccount:false
    });
  };


  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };
  onFormChange = (value) => {
    // console.log(value)
    this.setState({
      value,
    });
  };
  formChange = (value) => {
    // console.log('changed value', value);
    this.setState({
      formValue: value,
    });
  };

  goBefore =()=>{
    window.history.go(-1);
  }

  render() {
    // console.log(this.state.sn)
    let {sn} =this.props
    sessionStorage.setItem('info',JSON.stringify(sn))
    let { formValue } = this.state;
    let { isMobile } = this.state;
    let simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }
    return (

    <IceContainer title="商户详情">
      {/* {/* <Button type="primary" style={styles.fr} onClick={()=>{window.history.go(-1)}} >
          返回
      </Button> */} 
      {/* <IceContainer > */}
        <FormBinderWrapper value={formValue} onChange={this.formChange}>
          <div  style={styles.flex}>
          <div style={styles.dimg}>
           <img src={formatImgUrl(sn.avatar ? sn.avatar : '')} alt="" style={styles.img}/>
          </div>
          <div style={styles.ml30}>
          <Row wrap >
            <Col  style={styles.formCol}>
              <span style={styles.label}>用户ID:</span>
             <Input value={sn.uuid==null?'':sn.uuid} disabled/>
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>账号:</span>
                <Input value={sn.mobile==null?'':sn.mobile } disabled/>
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>昵称:</span>
                <Input value={sn.nickname==null?'':sn.nickname } disabled/>
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>性别:</span>
                <Input value={sn.sex==null?'':renderSex(sn.sex) } disabled/>
            </Col>
            <Col style={styles.formCol}>
              <span style={styles.label}>生日:</span>
                <Input value={sn.birthday==null?'':renderTime(sn.birthday) } disabled/>
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>城市:</span>
                <Input value={sn.city==null?'':sn.city } disabled/>
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>注册时间:</span>
                <Input value={sn.created ==null?'':renderTime(sn.created) } disabled/>
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>真实姓名:</span>
                <Input value={sn.realname==null?"":sn.realname} disabled/>
            </Col>
            <Col  style={styles.formCol}>
                <span style={styles.label}>偏好分类:</span>
                <Input value={sn.preference==null?"暂无数据":sn.preference} disabled/>
            </Col>
            <Col style={styles.formCol}>
              <span style={styles.label}>会员等级:</span>
                <Input value={sn.level==null?'':sn.level} disabled/>
            </Col>
            <Col  style={styles.formCol}>
              <div style={styles.prel}>
                  <span style={styles.label}>账号状态:</span>
                    <Input value={sn.status==null?'':renderAccountStatus(sn.status)} disabled/>
                    <div style={styles.Icon}>
                      <Icon
                        type="edit"
                        size="small"
                        style={{ ...styles.icon, ...styles.editIcon,display: this.state.display_name }}
                        onClick={e=>this.Account(e,sn)}
                      />
                    </div>
                </div>
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>会员开始时间:</span>
                <Input value={sn.vipStartTime==null?'':sn.vipStartTime} disabled/>
            </Col>
            <Col  style={styles.formCol}>
              <div style={styles.prel}>
                <span style={styles.label}>受邀人:</span>
                  <Input value={sn.invite==null || sn.issetInvite == 0?'':sn.invite} disabled/>
                  <div style={styles.Icon}>
                    <Icon
                      type="edit"
                      size="small"
                      style={{ ...styles.icon, ...styles.editIcon ,display: this.state.display_name }}
                      onClick={e=>this.Update(e,sn)}
                    />
                    <Icon
                      type="ashbin"
                      size="small"
                      style={{ ...styles.icon, ...styles.deleteIcon,...styles.ml10,display: this.state.display_name_delete  }}
                      onClick={e=>this.Delete(e,sn)}
              
                    />
                  </div>
              </div>
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>会员到期时间:</span>
                <Input  value={sn.vipEndTime==null?'':sn.vipEndTime} disabled/>
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>个性签名:</span>
              <span>{sn.signature==null?'':sn.signature}</span>
                {/* <Input  value={sn.signature==null?'':sn.signature} disabled/> */}
            </Col>
          <Col l="24">
            <Button type="primary" style={styles.button} onClick={e=>this.showDialog(e,sn)}>
              编辑
            </Button>
          </Col>
          <Dialog
          className="simple-form-dialog"
          style={simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          title="修改邀请人"
          // {...this.props}
          onOk={e=>this.onOk(e,sn)}
          onCancel={this.hideDialog}
          onClose={this.hideDialog}
          isFullScreen
          visible={this.state.visible}
        >
          <IceFormBinderWrapper
            ref={(ref) => {
              this.refForm = ref;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <div style={styles.dialogContent}>
              <Row style={styles.formRow}>
                <label style={styles.formLabel}>邀请人手机号:</label>
                <IceFormBinder
                  name="tel"
                >
                 <Input
                  style={styles.input}
                  placeholder="请输入邀请人手机号"
                  htmlType="number"
                  maxLength={11}
                />
                </IceFormBinder>
                <IceFormError name="tel" />
              </Row>
              <Row style={styles.formRow}>
                <Col>
                  <IceFormBinder name="reason">
                    <Input.TextArea
                      style={styles.input}
                      placeholder="请输入修改原因"
                      rows={4}
                      required
                      name="reason"
                      message="当前字段必填"
                      maxLength={200}
                    />
                  </IceFormBinder>
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </Dialog>
        <Dialog
          className="simple-form-dialog"
          style={simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          title="修改账号状态"
          // {...this.props}
          onOk={this.onOkAccount}
          onCancel={this.hideDialog}
          onClose={this.hideDialog}
          isFullScreen
          visible={this.state.visibleAccount}
        >
          <IceFormBinderWrapper
            ref={(ref) => {
              this.refForm = ref;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <div style={styles.dialogContent}>
              <Row style={styles.formRow}>
              <Col l="24">
                <div style={styles.formItem}>
                  <span style={styles.formLabel}>修改状态：</span>
                  <IceFormBinder triggerType="onBlur" name="status">
                    <Select size="large" style={{ width: '200px' }}>
                      <Select.Option value="1">启用</Select.Option>
                      <Select.Option value="0">禁封</Select.Option>
                      {/* <Select.Option value="1">禁封2月</Select.Option>
                      <Select.Option value="2">禁封6月</Select.Option> */}
                    </Select>
                  </IceFormBinder>
                  {/* <IceFormBinder triggerType="onBlur" name="targetType1" >
                    <Checkbox name="agreement" defaultChecked>优惠券1</Checkbox>
                    <Checkbox name="agreement1" defaultChecked>优惠券2</Checkbox>
                    <Checkbox name="agreement2" defaultChecked>优惠券3</Checkbox>
                 </IceFormBinder> */}
                  <div style={styles.formError}>
                    <IceFormError name="status" />
                  </div>
                </div>
              </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </Dialog>
          </Row>
          </div>
          </div>
        </FormBinderWrapper>
        
      {/* </IceContainer> */}
      </IceContainer>
    );
  }
}

const styles = {
  formRow: {
    marginBottom: '18px',
  },
  formCol: {
    marginBottom: '20px',
    float:'left',
    width:'350px',
    flex: 'none',
  },
  label: {
    lineHeight: '28px',
    paddingRight: '10px',
    width:'100px',
    display: 'inline-block'
  },
  img:{
    width:'180px',
    height:'180px'
  },
  ml30:{
    marginLeft: '30px',
  },
  flex:{
    display: 'flex',
    justifyContent:'spaceBetween'
  },
  ml10:{
    marginLeft: '10px',
  },
  w400:{
    width:'400px',
  },
  prel:{
    position: 'relative',
    display:'flex'
  },
  Icon:{
    position: 'absolute',
    right: '70px',
    top: '5px',
  },
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px',width:'200px' },
  fr: {
    float: 'right'
  },
};
