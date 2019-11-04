/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Input, Grid,Button,ConfigProvider, Message  } from '@alifd/next';
import { FormBinderWrapper } from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
import {renderAmount,oflRemittanceWay,imgUrl2} from '../../../../../common/js/filter'
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
      text:'',
      disable:false
    };
  }

  componentDidMount(){
    const status = window.location.hash.split('=')[2] != 6
    // console.log(status)
    this.setState({
      disable:status
    })
  }

  passOn=(reason)=>{
    this.props.passOn(this.state.value.text)
  }
  turnOff=(reason)=> {
    if (!this.state.value.text) {
      Message.warning('请输入驳回原因')
      return false
    }
    this.props.turnOff(this.state.value.text)
  }


  showDialog = () => {
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
        return;
      }
      // deal with value

      this.hideDialog();
    });
  };
  onChange= (val)=>{
    // console.log(this.state.value.text)
    this.setState({
      value:{
        text:val
      }
    });
  }
  onFormChange = (value) => {
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

  render() {
    const {Sn} = this.props
    const { formValue } = this.state;
    const { isMobile } = this.state;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }
    return (
      <div>
      <IceContainer title="汇款单详情">
      <div style={styles.buttonfr}>
      {/* <Button type="primary" style={styles.fr} onClick={()=>{window.history.go(-1)}} >
          返回
      </Button> */}
      </div>
        <FormBinderWrapper value={formValue} onChange={this.formChange}>
          <div style={styles.ml10}>
          <Row wrap >
            <Col  style={styles.formCol}>
              <span style={styles.label}>收款账户:</span>
             <span>{Sn.toAccount}</span>
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>汇款账户： </span>
                <span>{Sn.fromAccount}</span>
                {/* <Input value="17362301056" disabled/> */}
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>汇款人姓名： </span>
                <span>{Sn.remittanceAuthorName}</span>
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>汇款方式 ：</span>
                <span>{oflRemittanceWay(Sn.remittanceWay)}</span>
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>汇款金额：</span>
                <span>{renderAmount(Sn.amount)}</span>
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>汇款交易流水号： </span>
                <span>{Sn.remittanceSn}</span>
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>申请备注 ：</span>
                <span>{Sn.remark}</span>
            </Col>
            <Col  style={styles.formCol}>
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>凭证图片:</span>
                <img style={styles.img} src={imgUrl2(Sn.remittanceImg)} alt=""/>
            </Col>
            <Col l="24">
                <div style={styles.formItem}>
                  <span style={styles.formLabel}>驳回理由：</span>
                  <Input.TextArea
                  value={Sn.reason || null}  
                  onChange={this.onChange}
                  style={{width: 400}}
                  rows={8}
                  disabled={this.state.disable}
                  />
                </div>
            </Col>
          <Col l="24">
          <ConfigProvider locale={{ Dialog: { ok: 'OK', cancel: 'Cancel' } }}>
            <span>
                <Button  type="primary" disabled={this.state.disable} style={styles.button} onClick={this.passOn}>通过</Button> &nbsp;
                <Button  type="primary" disabled={this.state.disable} style={styles.button} onClick={this.turnOff}>驳回</Button> &nbsp;
            </span>
            {/* <span>
                <Button  type="primary" style={styles.button} onClick={popupAlert}>驳回</Button> &nbsp;
            </span>
            <span>
                <Button  type="primary" style={styles.button} onClick={popupAlert}>冻结</Button> &nbsp;
            </span>
            <span>
                <Button  type="primary" style={styles.button} onClick={popupAlert}>解冻</Button> &nbsp;
            </span> */}
        </ConfigProvider>
          </Col> 
          </Row>
          </div>
        </FormBinderWrapper>
      </IceContainer>
      </div>
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
    
  },
  img:{
    width:'180px',
    height:'180px'
  },
  image:{
    width:'180px',
    verticalAlgin: 'top'
  },
  flex:{
    display: 'flex',
    justifyContent:'spaceBetween'
  },
  ml10:{
    marginLeft: '10px',
  },
  formItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
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
    right: '10px',
    top: '5px',
    // display:'none'
  },
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px',width:'200px' },
  fr: {
    float: 'right',
  },
  buttonfr:{
    width: '100%',
    height: '40px'
  }
};
