/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Dialog,Input, Select, Grid,Button,Icon,Radio,ConfigProvider,Table  } from '@alifd/next';
import { FormBinderWrapper,  } from '@icedesign/form-binder';
import {remittanceWay,imgUrl,renderAmount} from '../../../../../common/js/filter'
import IceContainer from '@icedesign/container';
import { enquireScreen } from 'enquire-js';
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
    };
  }
  componentDidMount() {
    let orderSn = window.location.hash.split('=')[1]
    let sn = {orderSn}
    this.props.postDetail(sn)
    // console.log(this.props.snDetail.snDetail);
    // setTimeout(() => {
    //   console.log(this.props.snDetail.snDetail);
    // }, 1000);
  }


  showDialog = () => {
    console.log(11)
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

  passOn=()=>{
    // console.log(Sn);
    const Sn = window.location.hash.split('=')[1]
    this.props.passOn(Sn)
  }
  
  turnOff=()=>{
    // console.log(Sn);
    const Sn = window.location.hash.split('=')[1]
    this.props.turnOff(Sn)
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
    const { formValue } = this.state;
    const { isMobile } = this.state;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    const {snDetail} = this.props.snDetail
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }
    return (
      <div>
      <IceContainer title="充值详情">
      </IceContainer>
      <IceContainer title="汇款信息">
      <div style={styles.buttonfr}>
      {/* {/* <Button type="primary" style={styles.fr} onClick={()=>{window.history.go(-1)}} >
          返回
      </Button> */} 
      </div>
        <FormBinderWrapper value={formValue} onChange={this.formChange}>
          <div style={styles.ml10}>
          <Row wrap >
            <Col xxs="24" l="12" style={styles.formCol}>
              <span style={styles.label}>叮咚收藏网收款账号：</span>
              <span style={styles.label}>{snDetail.toAccount}</span>
             {/* <Input value="snDetail.toAccount" disabled/> */}
            </Col>
            <Col xxs="24" l="12" style={styles.formCol}>
              <span style={styles.label}>汇款账号： </span>
                <span style={styles.label}>{snDetail.fromAccount}</span>
                {/* <Input value="17362301056" disabled/> */}
            </Col>
            <Col xxs="24" l="12" style={styles.formCol}>
              <span style={styles.label}>汇款方式： </span>
                <span style={styles.label}>{remittanceWay(snDetail.remittanceWay)}</span>
                {/* <Input value="下一站" disabled/> */}
            </Col>
            <Col xxs="24" l="12" style={styles.formCol}>
              <span style={styles.label}>汇款人姓名 ：</span>
                <span style={styles.label}>{snDetail.remittanceAuthorName}</span>
                {/* <Input value="女" disabled/> */}
            </Col>
            <Col xxs="24" l="12" style={styles.formCol}>
              <span style={styles.label}>汇款人电话：  </span>
                <span style={styles.label}>{snDetail.remittanceAuthorTel}</span>
                {/* <Input value="2000年8月8日" disabled/> */}
            </Col>
            <Col xxs="24" l="12" style={styles.formCol}>
              <span style={styles.label}>汇款金额：</span>
                <span style={styles.label}>{renderAmount(snDetail.amount)}</span>
                {/* <Input value="广东 ，广州" disabled/> */}
            </Col>
            <Col xxs="24" l="12" style={styles.formCol}>
              <span style={styles.label}>汇款交易流水号：  </span>
                <span style={styles.label}>{snDetail.remittanceSn}</span>
                {/* <Input value="2017-07-24 17：25:38" disabled/> */}
            </Col>
            <Col xxs="24" l="24" style={styles.formCol}>
              <span style={styles.label}>汇款凭证：</span>
              <img src={imgUrl(snDetail.image)} alt="" style={styles.img}/>
            </Col>
            <Col xxs="24" l="12" style={styles.formCol}>
              <span style={styles.label}>备注:</span>
                <span style={styles.label}>{snDetail.remark}</span>
                {/* <Input.TextArea value="PC端" disabled/> */}
            </Col>
          <Col l="24">
          <ConfigProvider locale={{ Dialog: { ok: 'OK', cancel: 'Cancel' } }}>
            <span>
                <Button  type="primary" style={styles.button} onClick={this.passOn}>通过</Button> &nbsp;
                <Button  type="primary" style={styles.button} onClick={this.turnOff}>驳回</Button> &nbsp;
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
      <IceContainer title="用户账户信息">
      <Row wrap >
        <Col xxs="24" l="12" style={styles.formCol}>
          <span style={styles.label}>用户余额：</span>
          <span style={styles.label}>{snDetail.balance}</span>
          {/* <Input value="12580" disabled/> */}
        </Col>
        <Col xxs="24" l="12" style={styles.formCol}>
          <span style={styles.label}>保证金额:</span>
            <span style={styles.label}>{snDetail.margin}</span>
            {/* <Input value="17362301056" disabled/> */}
        </Col>
        </Row>
      </IceContainer>
      {/* <IceContainer title="提现记录">
          <Table dataSource={[]}>
            <Table.Column title="时间" dataIndex="id"/>
            <Table.Column title="原账户余额" dataIndex="title.name" />
            <Table.Column title="充值金额" dataIndex="time"/>
            <Table.Column title="现有金额" dataIndex="time"/>
            <Table.Column title="类型" dataIndex="time"/>
            <Table.Column title="订单编号" dataIndex="time"/>
          </Table>
        </IceContainer> */}
      </div>
    );
  }
}

const styles = {
  formRow: {
    marginBottom: '18px',
  },
  formCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  label: {
    lineHeight: '28px',
    paddingRight: '10px',
    width:'150px'
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
    float: 'right'
  },  
  buttonfr:{
    width: '100%',
    height: '40px'
  }
};
