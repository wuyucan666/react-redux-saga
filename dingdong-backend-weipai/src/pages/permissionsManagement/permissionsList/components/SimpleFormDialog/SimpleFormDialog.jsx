import React, { Component } from 'react';
import { Dialog, Grid, Input, Radio, Button } from '@alifd/next';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { enquireScreen } from 'enquire-js';
import { Message } from '@alifd/next';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/Permission/Role/reducer';
import * as RoleAction from '../../../../../redux/Permission/Role/action';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;

const defaultValue = {
  pid:20600,
  type: 3,
};

class SimpleFormDialog extends Component {
  static displayName = 'SimpleFormDialog';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: defaultValue,
      isMobile: false,
    };
  }

  componentDidMount() {
    if(window.location.hash.indexOf('isrole')<0){
      sessionStorage.clear()
    };
  }

  addrolepermission = (obj) =>{
    if(this.props.state.Role.items == undefined || this.props.state.Role.items.length == 0){
      Message.error('请选择要分配的权限')
    }else{
      let {items} = this.props.state.Role
      const uuid = window.location.hash.split('=')[1]
      let role = JSON.parse(sessionStorage.getItem("data"))
      const {perListCheck} = this.props
      // console.log(perListCheck)
      items.forEach(ele => {
        if(perListCheck[ele]){
          items.push(perListCheck[ele])
        }
      });
      // console.log([...new Set(items)])
      let params = {
        type:3,
        items:JSON.stringify([...new Set(items)])
      }
      // console.log(uuid,params);
      if(uuid!==undefined && uuid!==null){
        params.pid=20601
        params.uuid=uuid
        const {actions} = this.props
        actions.userAddRole(params);
      }else if(role!==null){
        params.pid=20608
        params.role=role.name
        // console.log(role)
        const {actions} = this.props
        actions.userAddRole(params);
      }else{
        Message.error("获取不到角色或者用户，因为无法添加权限")
      }
    }
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  showDialog = () => {
    // console.log(this.state.value)
    this.setState({
      visible: true,
    });
  };

  hideDialog = () => {
    this.setState({
      visible: false,
    });
  };

  onOk = () => {
    this.refForm.validateAll((error) => {
      if (error) {
        // show validate error
        console.log(error)
        return;
      }else{
        const {actions} = this.props
        const {value} = this.state
        actions.userAddRole(value);
      }
      // deal with value
      // console.log(this.state.value)
      this.hideDialog();
    });
  };  

  inputValidator = (rule, value, callback) => {
    const errors = [];
    // console.log(value)
    if (value.length < 1) {
      callback('输入不能为空');
    } else if (value.length > 30) {
      callback('输入长度必须小于 30 位');
    } else {
      callback();
    }
  };

  onFormChange = (value) => {
    // console.log(value)
    this.setState({
      value,
    });
  };

 

  delete = () =>{
    Dialog.confirm({
      content: "请确认是否删除此权限",
      title: "提示",
      onOk: () => {
        return new Promise(resolve => {
          setTimeout(resolve, 2000);
        });
      }
    });
  }

  render() {
    const { isMobile } = this.state;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }
    const uuid = window.location.hash.split('=')[1]
    const role = JSON.parse(sessionStorage.getItem("data"))
    return (
      <IceContainer>
        <Dialog
          className="simple-form-dialog"
          style={simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          title="添加权限"
          {...this.props}
          onOk={this.onOk}
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
                <Col span={`${isMobile ? '6' : '3'}`}>
                  <label style={styles.formLabel}>接口pid：</label>
                </Col>
                <Col span={`${isMobile ? '18' : '16'}`}>
                  <IceFormBinder
                    name="name"
                    validator={this.inputValidator}
                    required
                    min={1}
                    // max={10}
                  >
                    <Input
                      style={styles.input}
                      placeholder="填写相对应信息"
                    />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col span={`${isMobile ? '6' : '3'}`}>
                  <label style={styles.formLabel}>上级页面名称：</label>
                </Col>
                <Col span={`${isMobile ? '18' : '16'}`}>
                  <IceFormBinder
                    name="parentId"
                    validator={this.inputValidator}
                    required
                    min={1}
                    // max={10}
                  >
                    <Input
                      style={styles.input}
                      placeholder="填写相对应信息"
                    />
                  </IceFormBinder>
                  <IceFormError name="parentId" />
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col span={`${isMobile ? '6' : '3'}`}>
                  <label style={styles.formLabel}>接口描述：</label>
                </Col>
                <Col span={`${isMobile ? '18' : '16'}`}>
                  <IceFormBinder
                    name="description"
                    validator={this.inputValidator}
                    // required
                    // min={2}
                    // max={10}
                  >
                    <Input
                      style={styles.input}
                      placeholder="填写相对应信息"
                    />
                  </IceFormBinder>
                  <IceFormError name="description" />
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </Dialog>
        <Button type="primary" onClick={this.showDialog}>
          添加权限
        </Button>
        {/* <Button type="primary" onClick={this.delete} style={styles.ml10}>
          删除权限
        </Button> */}
        <Button type="primary" onClick={this.addrolepermission} disabled={uuid==undefined && role==null} style={styles.ml10}>
          保存
        </Button>
        {/* <Button type="primary" style={styles.fr} onClick={()=>{window.history.go(-1)}} >
          返回
        </Button> */}
      </IceContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(RoleAction, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'Role', reducer });

export default compose(
  withReducer,
  withConnect
)(SimpleFormDialog);

const styles = {
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
  ml10:{
    marginLeft:'10px',
  },
  fr: {
    float: 'right',
  },
};
