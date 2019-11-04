/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Dialog,Input, Select, Grid,Button,Icon,Radio,Message,Checkbox } from '@alifd/next';
import { FormBinderWrapper, FormBinder } from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
import { enquireScreen } from 'enquire-js';
import Img from '@icedesign/img';
import {AccountStatus,renderSex,renderTime} from '../../../../../common/js/filter'
import {formatImgUrl,uploadImg,getToken} from '../../../../../common/js/common'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
const { Group: RadioGroup } = Radio;
const { Row, Col } = Grid;
const defaultValue = {
  type:[],
  reason:''
};
const { Group: CheckboxGroup } = Checkbox;
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
      display_select:'none',
    };
  }
  componentDidMount() {
    this.enquireScreenRegister();

  }

  showDialog = (e,data) => {
    this.setState({
      display_name: 'inline-block',
    });
    if(data.inviteUser && data.issetInvite!=0){
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
        this.props.fndelete(data.uuid)
      },
    });
  }

  Update = () =>{
    this.setState({
      visible: true,
    });
  }

  Account = () =>{
    this.setState({
      visibleAccount: true,
    });
  }

  onOk = (e,data) => {
    console.log(this.state.value.tel)
    if( this.state.value.tel == '' || this.state.value.tel == undefined){
      Message.error('请输入邀请人手机号') 
      return
    }else{
      const id = {
        userUuid:window.location.hash.split('=')[1],
        currentInviteUuid:data.inviteUuid,
        tel:this.state.value.tel,
        reason:this.state.value.reason
      }
      this.props.fnupdate(id)
      this.hideDialog();
    } 

  };

  trimSpace = ( array ) =>{
    array == undefined ? array =[]: array;
    for(var i = 0 ;i<array.length;i++)  
     {  
         if(array[i] == "" || array[i] == null || typeof(array[i]) == "undefined")  
         {  
                  array.splice(i,1);  
                  i= i-1;  

         }  
     }  
     return array;  
  }

  onOkAccount = () => {
    this.state.value.type = this.trimSpace(this.state.value.type);

    if( this.state.value.type.length >= 2 ){
      this.state.value.type = 0
    }else{
      this.state.value.type =  this.state.value.type[0];
    }
    if( this.state.value.status == 0 ){
      this.state.value.type = ''
    }

    if( this.state.value.type == undefined &&  this.state.value.status != 0){
      Message.error('请选择禁封类型') 
      return false
    }

    if( this.state.value.reason == '' ){
      Message.error('请输入修改原因') 
      return false
    }
    const id = {
      uuid:window.location.hash.split('=')[1],
      status:this.state.value.status,
      type:this.state.value.type,
      reason:this.state.value.reason
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
    console.log(value)
    this.setState({
      value,
    });
  };
  formChange = (value) => {
    console.log('changed value', value);
    this.setState({
      formValue: value,
    });
  };
  goBefore =()=>{
    window.history.go(-1);
  }
  SelectonChange = (val) =>{
    if(val == 0){
      this.setState({
        display_select: 'none',
      });
    }else{
      this.setState({
        display_select: 'inline-block',
      });
    }
    this.setState({
      type: [],
    });

  }

  // CheckboxonChange = (val) =>{

  // }
// /this.status = 0; //状态 1正常  2禁用
  render() {
    const sn = this.props.sn
    const { formValue } = this.state;
    const { isMobile } = this.state;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    if(sn.banStatus == 0){
      sn.status = "正常"
    }
    if(sn.banStatus == 1){
      sn.status = "封禁2个月"
    }
    if(sn.banStatus == 2){
      sn.status = "禁用6个月"
    }
    if(sn.sex == 1){
      sn.sex = "男"
    }
    if(sn.sex == 2){
      sn.sex = "女"
    }
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }
    return (
      <IceContainer>
       {/* <Button type="primary" style={styles.fr} onClick={this.goBefore} >
            返回
         </Button> */}
      <IceContainer title="用户详情">
         
        <FormBinderWrapper value={formValue} onChange={this.formChange}>
          <div  style={styles.flex}>
          <div style={styles.dimg}>
           <img src={formatImgUrl(sn.avatar)} alt="" style={styles.img}/>
          </div>
          <div style={styles.ml30}>
          <Row wrap >
            <Col   style={styles.formCol}>
              <span style={styles.label}>用户ID:</span>
             <Input value={sn.uuid==null?'':sn.uuid } disabled/>
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>账号:</span>
                <Input value={sn.mobile==null?'':sn.mobile } disabled/>
            </Col>
            <Col   style={styles.formCol}>
              <span style={styles.label}>昵称:</span>
                <Input value={sn.nickname==null?'':sn.nickname } disabled/>
            </Col>
            <Col   style={styles.formCol}>
              <span style={styles.label}>性别:</span>
                <Input value={sn.sex==null?'':sn.sex}   disabled/>
            </Col>
            <Col   style={styles.formCol}>
              <span style={styles.label}>生日:</span>
                <Input value={sn.birthday==null?'':sn.birthday } disabled/>
            </Col>
            <Col   style={styles.formCol}>
              <span style={styles.label}>IP城市:</span>
                <Input value={sn.ipCity==null?'':sn.ipCity } disabled/>
            </Col>
            <Col   style={styles.formCol}>
              <span style={styles.label}>注册时间:</span>
                <Input value={sn.created ==null?'':renderTime(sn.created) } disabled/>
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>真实姓名:</span>
                <Input value={sn.realname==null?"":sn.realname} disabled/>
            </Col>
            <Col  style={styles.formCol}>
                <span style={styles.label}>喜欢的分类:</span>
                <Input value="暂无数据" disabled/>
            </Col>
            <Col   style={styles.formCol}>
              <span style={styles.label}>用户来源:</span>
                <Input value={sn.source==null?'':sn.source } disabled/>
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>会员等级:</span>
                <Input value={sn.level==null?'':sn.level} disabled/>
            </Col>
            <Col  style={styles.formCol}>
              <div style={styles.prel}>
                <span style={styles.label}>受邀人:</span>
                  <Input value={sn.inviteUser==null || sn.issetInvite == 0?'':sn.inviteUser} disabled/>
                  <div style={styles.Icon}>
                    <Icon
                      type="edit"
                      size="small"
                      style={{ ...styles.icon, ...styles.editIcon,display: this.state.display_name }}
                      onClick={this.Update}
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
            <Col style={styles.formCol}>
              <div style={styles.prel}>
                  <span style={styles.label}>账号状态:</span>
                    <Input value={sn.status==null?'':sn.status}  disabled/>
                    {/* cell={AccountStatus} */}
                    <div style={styles.Icon}>
                      <Icon
                        type="edit"
                        size="small"
                        style={{ ...styles.icon, ...styles.editIcon,display: this.state.display_name }}
                        onClick={e=>this.Account()}
                      />
                    </div>
                </div>
            </Col>

            <Col  style={styles.formCol}>
              <span style={styles.label}>会员到期时间:</span>
                <Input  value={sn.likeSort==null?'':sn.likeSort} disabled/>
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>个性签名:</span>
              <span>{sn.signature==null?'':sn.signature}</span> 

                {/* <Input  value={sn.signature==null?'':sn.signature} disabled/> */}
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>邀请码:</span>
              <Input  value={sn.inviteCode==null?'':sn.inviteCode} disabled/>
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
                    <Select size="large" style={{ width: '200px' }} onChange={this.SelectonChange} value={sn.status}>
                      <Select.Option value="0">启用</Select.Option>
                      {/* <Select.Option value="0">禁封</Select.Option> */}
                      <Select.Option value="1">禁封2月</Select.Option>
                      <Select.Option value="2">禁封6月</Select.Option>
                    </Select>
                  </IceFormBinder>
                  <div style={styles.formError}>
                    <IceFormError name="status" />
                  </div>     
                </div>
              </Col>
              </Row>
              <Row style={styles.formRow } >
              <Col l="24"  style={{display: this.state.display_select }}>
                <div style={styles.formItem}>
                  <IceFormBinder triggerType="onBlur" name="type">
                  <CheckboxGroup  >
                    <Checkbox id="apple" value="1"  >禁止交易操作</Checkbox>
                    <Checkbox id="watermelon" value="2">冻结账户</Checkbox>
                </CheckboxGroup>
                  </IceFormBinder>
                  <div style={styles.formError}>
                    <IceFormError name="type" />
                  </div>
                 
                </div>
              </Col>
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
          </Row>
          </div>
          </div>
        </FormBinderWrapper>
        
      </IceContainer>
      </IceContainer>
    );
  }
}

const styles = {
  formRow: {
    marginBottom: '18px',
  },
  formCol: {
    // display: 'flex',
    // alignItems: 'center',
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
  flex:{
    display: 'flex',
    justifyContent:'spaceBetween'
  },
  ml10:{
    marginLeft: '10px',
  },
  ml30:{
    marginLeft: '30px',
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
  formLabel: { lineHeight: '26px',width:'200px', display: 'inline-block' },
  fr:{
    float: 'right'
  }
};
