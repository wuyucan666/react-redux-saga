/* eslint-disable react/no-unused-state, no-plusplus */
import React, { useState,useRef,useEffect } from 'react';
import { Table, Switch, Balloon, Button, Grid, Pagination,Input,Message,Dialog } from '@alifd/next';
import IceContainer from '@icedesign/container';
import Zmage from 'react-zmage'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {renderTime,GetQueryString,ActiveState,renderAmount} from '../../../../../common/js/filter'
import { Panel } from '@icedesign/qrcode';
const { Row, Col } = Grid;


export function Coupons(props){

  useEffect(() => {
  },[props.coupons])

  if( props.coupons.length != 0 ){
    return(
      <div style={styles.formItem} >
          <Table dataSource={props.coupons}>
            <Table.Column title="优惠券名称"   dataIndex="prizeName" />
            <Table.Column title="优惠券门槛"  dataIndex="threshold" cell={props.renderAmount}/> 
            <Table.Column title="优惠券数量"  dataIndex="total"  />
          </Table>
      </div>
    )
  }else{
    return ''
  }

}

export function Integral(props){

  useEffect(() => {
  },[props.integral])


  if( props.integral.length != 0 ){
    return(
      <div style={styles.formItem} >
          <Table dataSource={props.integral}>
            <Table.Column title="积分数值"   dataIndex="extension" />
            <Table.Column title="积分总发行量"   dataIndex="total" />
            <Table.Column title="积分总数值"   dataIndex="totals" />
          </Table>
      </div>
    )
  }else{
    return ''
  }

}

export function Raffle(props){

  useEffect(() => {
  },[props.raffle])

  if( props.raffle.length != 0 ){
    return(
      <div style={styles.formItem} >
          <Table dataSource={props.raffle}>
            <Table.Column title="抽奖券数量"   dataIndex="total" />
          </Table>
      </div>
    )
  }else{
    return ''
  }

}

export function Physical(props){

  useEffect(() => {
  },[props.physical])

  if( props.physical.length != 0 ){
    return(
      <div style={styles.formItem} >
          <Table dataSource={props.physical}>
            <Table.Column title="礼品名称"   dataIndex="prizeName" />
            <Table.Column title="礼品数量"  dataIndex="total" />
            {/* <Table.Column title="礼品总数量"  dataIndex="num" />
            <Table.Column title="礼品总金额"  dataIndex="num" /> */}
          </Table>
      </div>
    )
  }else{
    return ''
  }

}

export default function UserTable(props)  {
  const [simpleFormDialog, setSimpleFormDialog] = useState({
    ...styles.simpleFormDialog,
  });
  const [value, setValue] = useState({
    link:''
  });
  const ref = useRef('form');
  const [coupons, setCoupons] = useState([]);//优惠券
  const [integral, setIntegral] = useState([]);//积分
  const [raffle, setRaffle] = useState([]);//抽奖券
  const [physical, setPhysical] = useState([]);//实物
  const [record , setRecord] = useState([]);//记录时间
  const [failure  , setFailure ] = useState([]);//失效内容
  const [issue  , setIssue ] = useState([]);//发放内容
  const [visible, setVisible] = useState(false);
  const [Link,setLink] = useState('')
  
  const hideDialog = () => {
    setVisible(false)
  };
  const condition = (e,val) => {
    let NewVal = {
      ...value,
    }
    setValue(NewVal);
    if( NewVal.link == ''){
      Message.error('请输入发布链接') 
    }else{
      props.DdLaunchEvent(value);
    } 
  }

  
  const share = (e,val) => {
    setVisible(true)
  }


  
  //链接
  useEffect(() => {
    if( props.details.base && props.details.detail){
      let Link = JSON.parse(props.details.detail.detail).link+'?id='+props.details.base.ddToken
      setLink(Link)
    }
  },[props.details]);
  //优惠券
  useEffect(() => {
    const NewCoupons = props.details.giftsCoupon?props.details.giftsCoupon:[]
    setCoupons(NewCoupons)
  },[props.details]);
 //积分
  useEffect(() => {
    const NewIntegral = props.details.giftsIntegral?props.details.giftsIntegral:[]
    setIntegral(NewIntegral)
  },[props.details]);

   //抽奖券
   useEffect(() => {
      const NewRaffle = props.details.giftsRolls?props.details.giftsRolls:[]
      setRaffle(NewRaffle)
  },[props.details]);

   //实物
   useEffect(() => {
    const NewPhysical = props.details.giftsEntity?props.details.giftsEntity:[]
    setPhysical(NewPhysical)
  },[props.details]);

  const Release = () =>{
    if (GetQueryString('type')==2 && props.details.detail && !JSON.parse(props.details.detail.detail).link ){
      return <IceContainer title="发布活动">
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <IceFormBinderWrapper
              value={value}
              ref={ref}
            >
            <Row wrap gutter="20" style={styles.formRow}>
                  <div style={styles.formItem}>
                    <span style={styles.formLabel}>活动链接：</span>
                    <IceFormBinder triggerType="onBlur" name="link">
                      <Input placeholder="请输入活动链接" size="large" />
                    </IceFormBinder>
                    <div style={styles.formError}>
                      <IceFormError name="link" />
                    </div>
                  </div>
              </Row>
            </IceFormBinderWrapper>
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
            <Button type="primary"  onClick={e=>condition(e,1)} style={styles.button}>
              发布
            </Button>
        </Row>
      </IceContainer> 
    }else{
      return null;
    }

  }

  const Share = () =>{
    if( props.details.base &&　props.details.base.status == 1){
      //已发出
      return <Button type="primary"  onClick={e=>share(e,1)} style={styles.button}>
              分享
            </Button>
    }else{
      return null;
    }
  }
  

  const Record = () =>{
      if( props.details.base　&& props.details.base.status == -4){
        //审核失败
        return <IceContainer title="流转记录">
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>创建时间：</span>
              {props.details.flow?renderTime(JSON.parse(props.details.flow).created):0}
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>提审时间：</span>
              {props.details.flow?renderTime(JSON.parse(props.details.flow).bringTime):0}
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>审核时间：</span>
              {props.details.flow?renderTime(JSON.parse(props.details.flow).auditTime):0}
            </div>
          </Col>
          </Row>
        </IceContainer>

      }else if( props.details.base　&& props.details.base.status == 1){
        //已发出
        return <IceContainer title="流转记录">
      <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>创建时间：</span>
            {props.details.flow?renderTime(JSON.parse(props.details.flow).created):0}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>提审时间：</span>
            {props.details.flow?renderTime(JSON.parse(props.details.flow).bringTime):0}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>发出时间：</span>
            {props.details.flow?renderTime(JSON.parse(props.details.flow).issueTime):0}
          </div>
        </Col>
        </Row>
      </IceContainer>

      }else if( props.details.base　&& props.details.base.status == 0){
      //已下架
      return <IceContainer title="流转记录">
      <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>创建时间：</span>
            {props.details.flow?renderTime(JSON.parse(props.details.flow).created):0}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>提审时间：</span>
            {props.details.flow?renderTime(JSON.parse(props.details.flow).bringTime):0}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>发出时间：</span>
            {props.details.flow?renderTime(JSON.parse(props.details.flow).issueTime):0}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>下架时间：</span>
            {props.details.flow?renderTime(JSON.parse(props.details.flow).soldoutTime):0}
          </div>
        </Col>
        </Row>
      </IceContainer>
      }else{
        return null;
      }
    }

    
    const Failure = () =>{
      if( props.details.base　&& props.details.base.status == 0){
      //已下架
      return  <div>
      <Row wrap gutter="20" style={styles.formRow}>
      <Col l="24">
        <div style={styles.formItem}>
          <span style={styles.formLabel}>失效原因：</span>
          {props.details.detail?JSON.parse(props.details.detail.detail).soldoutRemark:''}
        </div>
      </Col>
      </Row>
      <Row wrap gutter="20" style={styles.formRow}>
      <Col l="24">
        <div style={styles.formItem}>
          <span style={styles.formLabel}>失效操作人员：</span>
          {props.details.detail?props.details.detail.soldoutName:''}
        </div>
      </Col>
      </Row>
      </div>
      }else{
        return null;
      }
    }

    const Issue = () =>{
      if( props.details.base){
      //已下架和已发出
        if( props.details.base.status == 0 || props.details.base.status == 1 ){
          return  <div>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>发放对象：</span>
              {props.details.base? props.details.base.wordUserType:''}
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>活动链接：</span>
              {Link}
            </div>
          </Col>
          </Row>
        </div>
        }

      }else{
        return null;
      }
      return null
    }


  return (
    <div>
       <Release />
      <IceContainer title="活动详情" >
      <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>状态：</span>
            {props.details.base?ActiveState(props.details.base.status):''}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>活动类型：</span>
            {props.details.base? props.details.base.type:''}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>活动名称：</span>
            {props.details.base? props.details.base.name:''}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>口令密码：</span>
            {props.details.base? props.details.base.ddToken:''}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>活动开始时间：</span>
            {renderTime(props.details.base? props.details.base.startTime:'')}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>活动结束时间：</span>
            {renderTime(props.details.base? props.details.base.endTime:'')}
          </div>
        </Col>
        </Row>
        <Issue/>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>活动规则说明：</span>
            {props.details.detail?JSON.parse(props.details.detail.detail).rules:''}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>提审备注：</span>
            {props.details.detail?JSON.parse(props.details.detail.detail).bringRemark:''}
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>审核说明：</span>
            {props.details.detail?JSON.parse(props.details.detail.detail).checkRemark:''}
          </div>
        </Col>
        </Row>
      <Share />
      <Failure />
      <Dialog
          style={simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          title="分享"
          footer={false}
          isFullScreen
          visible={visible}
          onCancel={hideDialog}
          onClose={hideDialog}
        >
          <div style={styles.dialogContent}>
            <div style={styles.mb20}>活动密令:{props.details.base? props.details.base.ddToken:''}</div>
            <Panel value={Link}/>
            <div style={styles.mt20}>复制分享链接:{Link}</div>
          </div>
        </Dialog>
      </IceContainer>
      <Record  />
      <IceContainer title="活动礼品">
      <Coupons
        coupons={coupons} 
        setCoupons={(o)=>setCoupons(o)}
        renderAmount={renderAmount}
        />
        <Integral
        integral={integral} 
        setIntegral={(o)=>setIntegral(o)}
        />
        <Raffle
        raffle={raffle} 
        setRaffle={(o)=>setRaffle(o)}
        />
        <Physical
        physical={physical} 
        setPhysical={(o)=>setPhysical(o)}
        />
      </IceContainer>
    </div>
  );
  }


const styles = {
  link:{
    marginRight:'10px'
  },
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
  buttonRow: {
    marginTop: '10px',
    float:'right'
  },
  link:{
    display:'block'
  },
  formItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  ml10:{
    marginLeft: '10px', 
  },
  dialogContent:{
    textAlign: 'center',
  },
  mb20:{
    marginBottom: '20px',
  },
  mt20:{
    marginTop: '20px',
  }
};
