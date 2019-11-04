/* eslint-disable react/no-unused-state, no-plusplus */
import React, { useState,useRef,useEffect } from 'react';
import { Table, Switch, Balloon, Button, Grid, Pagination,Input,Message,Field,DatePicker,Dialog  } from '@alifd/next';
import IceContainer from '@icedesign/container';
import Zmage from 'react-zmage'
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Link } from 'react-router-dom';
import { removeArray,Debounce } from '../../../../../common/js/common';
import {GetQueryString,imgUrl,ShootType,ShootCreateType,renderAmount,renderTime} from '../../../../../common/js/filter'
const { Row, Col } = Grid;
const { RangePicker } = DatePicker;
import moment from 'moment';
const currentDate = moment();

export function Coupons(props){

  useEffect(() => {

  },[props.coupons])

  const onChange1 = (obj,val)=>{
      obj.val.couponId = obj.val.couponId
      obj.val.prizeName = obj.val.prizeName
      obj.val.total = val
      obj.val.extension = 0
      obj.val.type = '1'
      props.setCoupons(props.coupons)
  }
  const renderInput = (a,b,val) => {
      return(
        <Input onChange={onChange1.bind(this,{val,b})}  defaultValue={a} placeholder="请输入数量" maxLength={10} htmlType="number"/>
      )
  }

  if( props.coupons.length != 0 ){
    return(
      <div style={styles.formItem} >
          <Table dataSource={props.coupons}>
            <Table.Column title="优惠券名称"  dataIndex="prizeName" />
            <Table.Column title="优惠券门槛"  dataIndex="threshold" />
            <Table.Column title="未发出数量"  dataIndex="totalSurplus" />
            <Table.Column title="优惠券数量"  dataIndex="total" cell={renderInput}/>
            <Table.Column title="操作"  cell={props.renderOper}/>
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

  const onchange =(obj,val)=>{
    obj.val.extension = val
    obj.val.prizeName = val+'积分'
    props.setIntegral(props.integral)
  }

  const onChange1 = (obj,val)=>{
    obj.val.total = val
    props.setIntegral(props.integral)
  }

  const InputName = (a,b,val) =>{
    return(
      <Input onChange={onchange.bind(this,{val,b})}  defaultValue={a} placeholder="请输入数值" maxLength={10} htmlType="number"/>
    )
  }

  const renderInput = (a,b,val) => {
    return(
      <Input onChange={onChange1.bind(this,{val,b})}  defaultValue={a} placeholder="请输入总发行量" maxLength={10} htmlType="number"/>
    )
  }

  if( props.integral.length != 0 ){
    return(
      <div style={styles.formItem} >
          <Table dataSource={props.integral}>
            <Table.Column title="积分数值"   dataIndex="extension" cell={InputName}/>
            <Table.Column title="积分总发行量"  dataIndex="total"  cell={renderInput}/>
            <Table.Column title="操作"  cell={props.renderOper}/>
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

  const onchange =(obj,val)=>{
    obj.val.total = val
    props.setRaffle(props.raffle)
  }


  const InputName = (a,b,val) =>{
    return(
      <Input onChange={onchange.bind(this,{val,b})} defaultValue={a} placeholder="请输入抽奖券数量" maxLength={10} htmlType="number"/>
    )
  }


  if( props.raffle.length != 0 ){
    return(
      <div style={styles.formItem} >
          <Table dataSource={props.raffle}>
            <Table.Column title="抽奖券数量"  dataIndex="total" cell={InputName}/>
            <Table.Column title="操作"  cell={props.renderOper}/>
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

  const onchange =(obj,val)=>{
    obj.val.prizeName = val
    props.setPhysical(props.physical)
  }

  const onChange1 = (obj,val)=>{
    obj.val.total = val
    props.setPhysical(props.physical)
  }

  const InputName = (a,b,val) =>{
    return(
      <Input onChange={onchange.bind(this,{val,b})} defaultValue={a} placeholder="请输入礼品名称" maxLength={20} />
    )
  }

  const renderInput = (a,b,val) => {
    return(
      <Input onChange={onChange1.bind(this,{val,b})} defaultValue={a} placeholder="请输入发放数量" maxLength={10} htmlType="number"/>
    )
  }

  if( props.physical.length != 0 ){
    return(
      <div style={styles.formItem} >
          <Table dataSource={props.physical}>
            <Table.Column title="礼品名称"   dataIndex="prizeName" cell={InputName}/>
            <Table.Column title="礼品总数量"  dataIndex="total"  cell={renderInput}/>
            <Table.Column title="操作"  cell={props.renderOper}/>
          </Table>
      </div>
    )
  }else{
    return ''
  }

}


export default function UserTable(props)  {
  const ref = useRef('form')
  const [recordVisible, setrecordVisible] = useState(false);
  const [value, setValue] = useState({
    ddToken:'',
    rules:'',
    remark:'',
    bringRemarks:'',
    
  });
  const [arr, setArr] = useState([]);
  const [coupons, setCoupons] = useState([]);//优惠券
  const [integral, setIntegral] = useState([]);//积分
  const [raffle, setRaffle] = useState([]);//抽奖券
  const [physical, setPhysical] = useState([]);//实物
  const [val, setval] = useState(0);
  const [initial, setInitial] = useState(0);
  // const [Boole,setBoole] = useState(true)
  const recordClose = () => {
    setrecordVisible(false) 
  }

  const [Visible, setVisible] = useState(false);
const renderOper1 = ( value, index, record) =>{
  return <div>
  <Button type="primary" style={styles.button} onClick={deleteUser1.bind(this,record)} >
      删除
  </Button>
</div>
}

const deleteUser1 = ( val ) =>{

  Dialog.confirm({
    title: '提示',
    content: '是否删除该项',
    onOk:() => {
      const newArr = Object.assign([],coupons)
      const arr2 =removeArray(newArr,val)
      const arr3 = arr2 
      setCoupons(arr3);
    },
    onCancel:() =>{
    }
  })
}

const renderOper2 = ( value, index, record) =>{
  return <div>
  <Button type="primary" style={styles.button} onClick={deleteUser2.bind(this,record)} >
      删除
  </Button>
</div>
}

const deleteUser2 = ( val ) =>{
  Dialog.confirm({
    title: '提示',
    content: '是否删除该项',
    onOk:() => {
      const newArr = Object.assign([],integral)
      const arr2 =removeArray(newArr,val)
      setIntegral(arr2);
    },
    onCancel:() =>{
        console.log(123)
    }
  })
}

const renderOper3 = ( value, index, record) =>{
  return <div>
  <Button type="primary" style={styles.button} onClick={deleteUser3.bind(this,record)} >
      删除
  </Button>
</div>
} 

const deleteUser3 = ( val ) =>{
  
  Dialog.confirm({
    title: '提示',
    content: '是否删除该项',
    onOk:() => {
      const newArr = Object.assign([],raffle)
      const arr2 =removeArray(newArr,val)
      setRaffle(arr2);
    },
    onCancel:() =>{
        console.log(123)
    }
  })
}

const renderOper4 = ( value, index, record) =>{
  return <div>
  <Button type="primary" style={styles.button} onClick={deleteUser4.bind(this,record)} >
      删除
  </Button>
</div>
}

const deleteUser4 = ( val ) =>{
  Dialog.confirm({
    title: '提示',
    content: '是否删除该项',
    onOk:() => {
      const newArr = Object.assign([],physical)
      const arr2 =removeArray(newArr,val)
      setPhysical(arr2);
    },
    onCancel:() =>{
        console.log(123)
    }
  })
}
  const addCoupons = () => {
    //这里要请求添加优惠券
    if( Date.parse(value.startTime)/1000 >= Date.parse(value.endTime)/1000){
      Message.error('开始时间不能小于结束时间');
      return
    }
    if( !Date.parse(value.startTime)/1000){
      Message.error('请输入开始时间');
      return
    }
    if( !Date.parse(value.endTime)/1000){
      Message.error('请输入结束时间');
      return
    }
    if( Date.parse(new Date())/1000 >= Date.parse(value.endTime)/1000){
      Message.error('结束时间不能小于当前时间');
      return
    }
    let obj = {
      getEndTime:Date.parse(value.endTime)/1000
    }
    props.GetCoupons(obj);
    setrecordVisible(true)
    setInitial(1);
  }

  const addC = (val,o,data) => {
    return <div>
    <Button type="primary" style={styles.button} onClick={addCoupon.bind(this,data)} >
        添加
    </Button>
  </div>
  }

  const addCoupon = (val) => {
    const newArr = Object.assign([],coupons)
    console.log(newArr)
    newArr.push({
      couponId:val.goodId,
      prizeName:val.couponName,
      // extension:val.extension,
      totalSurplus:val.totalSurplus,
      threshold:val.threshold,
      total:'',
      type:'1',
      id:newArr.length
    });
    setCoupons(newArr);
    setrecordVisible(false) 
  }

  const addIntegral = () => {
    const newArr = Object.assign([],integral)
    newArr.push({
      couponId:val.couponId?val.couponId:'',
      prizeName:val.prizeName?val.prizeName:'积分',
      total:val.total?val.total:'',
      extension:val.extension?val.extension:0,
      type:'2',
      id:newArr.length
    });
    setIntegral(newArr);
  }

  const addRaffle = () => {
    const newArr = Object.assign([],raffle)
    if( newArr.length <1 ){
      newArr.push({
        couponId:val.couponId?val.couponId:'',
        prizeName:val.prizeName?val.prizeName:'抽奖券',
        total:val.total?val.total:'',
        extension:val.extension?val.extension:0,
        type:'0',
        id:newArr.length
      });
      setRaffle(newArr);
    }else{
      Message.success('抽奖券只能添加一次哦')
    }
  }

  const addPhysical = () => {
    const newArr = Object.assign([],physical)
    newArr.push({
      couponId:val.couponId?val.couponId:'',
      prizeName:val.prizeName?val.prizeName:'',
      total:val.total?val.total:'',
      extension:val.extension?val.extension:0,
      type:'6',
      id:newArr.length
    });
    setPhysical(newArr);
  }

  const condition = () => {
    const goodsDetail = physical.concat(raffle,integral,coupons)
    if( Date.parse(value.startTime)/1000 >= Date.parse(value.endTime)/1000){
      Message.error('开始时间不能小于结束时间');
      return
    }
    if( !Date.parse(value.startTime)/1000){
      Message.error('请输入开始时间');
      return
    }
    if( !Date.parse(value.endTime)/1000){
      Message.error('请输入结束时间');
      return
    }
    if( Date.parse(new Date())/1000 >= Date.parse(value.endTime)/1000){
      Message.error('结束时间不能小于当前时间');
      return
    }
    var eachcount=0;
    var Boole = true
    goodsDetail.forEach(v=>{
      eachcount++
      if( v.total > 100000000000 || v.total =='' ) {
        Message.error('请填写正确的信息');
        Boole = false
      }
    });

    if(eachcount >= goodsDetail.length){
      if( Boole ){
        let NewData = {
          goodsDetail:JSON.stringify(goodsDetail),
          isCreate:GetQueryString('id')?1:0,
          name:'叮咚令',
          ...value
        }
        props.CreateActivity(NewData)
      }
    }
  }
  const generate = () => {
    props.generate()
  }
  // console.log(props.details)
  // console.log(props.details.base)
  const formChange = (val) => {
    setValue(val);
    setInitial(1);
  }
  const onFocus = () => {
    setInitial(1);
  }


  const onOk = (val) => {
    const NewVal = {
      ...value
    }
    setValue(NewVal);
    setInitial(1);
  }

  const onOk1 = (val) => {
    const NewVal = {
      ...value
    }
    setValue(NewVal);
    setInitial(1);
  }

  

  useEffect(() => {
    if( GetQueryString('id') && initial==0 ){
      const NewVal = {
        ddToken:props.details.base?props.details.base.ddToken:'',
        rules:props.details.detail?JSON.parse(props.details.detail.detail).rules:'',
        remark:props.details.base?props.details.base.remark:'',
        bringRemarks:props.details.detail?JSON.parse(props.details.detail.detail).bringRemark:'',
        startTime:renderTime(props.details.base?props.details.base.startTime:0),
        endTime:renderTime(props.details.base?props.details.base.endTime:0)
      }
      setValue(NewVal)
    }

  },[props.details]);


  //优惠券
  useEffect(() => {
    if( GetQueryString('id')){
      const NewCoupons = props.details.giftsCoupon?props.details.giftsCoupon:[]
      NewCoupons.forEach(function(item,index){
        item.id = index;
      })
      setCoupons(NewCoupons)
    }
  },[props.details]);

 //积分
  useEffect(() => {
    if( GetQueryString('id') ){
      const NewIntegral = props.details.giftsIntegral?props.details.giftsIntegral:[]
      NewIntegral.forEach(function(item,index){
        item.id = index;
      })
      setIntegral(NewIntegral)
    }
  },[props.details]);

   //抽奖券
   useEffect(() => {
    if( GetQueryString('id')){
      const NewRaffle = props.details.giftsRolls?props.details.giftsRolls:[]
      NewRaffle.forEach(function(item,index){
        item.id = index;
      })
      setRaffle(NewRaffle)
    }
  },[props.details]);

   //实物
   useEffect(() => {
    if( GetQueryString('id') ){
      const NewPhysical = props.details.giftsEntity?props.details.giftsEntity:[]
      NewPhysical.forEach(function(item,index){
        item.id = index;
      })
      setPhysical(NewPhysical)
    }
  },[props.details]);

  //请求叮咚令
  useEffect(() => {
    const NewValue = {
      ...value,
      ddToken:props.ddToken?props.ddToken:'',
    }
    setValue(NewValue)
  },[props.ddToken]);

    //请求叮咚令
    useEffect(() => {
      if( GetQueryString('type') == 3 ){
        console.log(123)
        setVisible(false)
      }
    },[]);
// console.log(value)

  return (  
    <div>
      <IceContainer title="编辑活动">
      <IceFormBinderWrapper
        value={value}
        onChange={formChange}
        ref={ref}
      >
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24" >
          <div style={styles.formItem} >
          <span style={styles.formLabel}>活动类型：</span>
            口令类
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24" >
          <div style={styles.formItem} >
          <span style={styles.formLabel}>活动名称：</span>
            叮咚令
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24" >
          <div style={styles.formItem} >
          <span style={styles.formLabel}>口令密码：</span>
            <IceFormBinder triggerType="onBlur" name="ddToken" >
              <Input placeholder="请输入..." size="large" onFocus={onFocus} disabled={GetQueryString('type')==3?true:false} maxLength={8}/>
            </IceFormBinder>
            <div style={styles.formError}>
              <IceFormError name="ddToken" />
            </div>

            <span style={styles.ml20}  onClick={e=>generate()} >{GetQueryString('type')==3?'':'自动生成'}</span>
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>活动开始时间：</span>
              <IceFormBinder triggerType="onBlur" name="startTime">
              {/* <RangePicker showTime  onOk={onOk}/> */}
              <DatePicker showTime  onOk={onOk} disabled={GetQueryString('type')==3?true:false}/>
                {/* <DatePicker showTime onChange={onChange} onOk={onOk} resetTime /> */}
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="startTime" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>活动结束时间：</span>
              <IceFormBinder triggerType="onBlur" name="endTime">
              {/* <RangePicker showTime  onOk={onOk}/> */}
              <DatePicker showTime  onOk={onOk1} disabled={GetQueryString('type')==3?true:false}/>
                {/* <DatePicker showTime onChange={onChange} onOk={onOk} resetTime /> */}
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="endTime" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
            <Button type="primary"  onClick={e=>addCoupons()} >
              添加优惠券
            </Button>
            <Button type="primary"  onClick={e=>addIntegral()} style={styles.ml20}>
              添加积分
            </Button>
            <Button type="primary"  onClick={e=>addRaffle()} style={styles.ml20}>
              添加抽奖券
            </Button>
            <Button type="primary"  onClick={e=>addPhysical()} style={styles.ml20}>
              添加实物礼品
            </Button>
        </Row>
        <Coupons
        coupons={coupons} 
        renderOper={renderOper1}
        setCoupons={(o)=>setCoupons(o)}
        />
        <Integral
        integral={integral} 
        renderOper={renderOper2}
        setIntegral={(o)=>setIntegral(o)}
        />
        <Raffle
        raffle={raffle} 
        renderOper={renderOper3}
        setRaffle={(o)=>setRaffle(o)}
        />
        <Physical
        physical={physical} 
        renderOper={renderOper4}
        setPhysical={(o)=>setPhysical(o)}
        />
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24" >
            <div style={styles.formItem} >
            <span style={styles.formLabel}>活动规则：</span>
              <IceFormBinder triggerType="onBlur" name="rules" >
              <Input.TextArea
                      style={styles.input}
                      placeholder="请输入活动规则"
                      rows={4}
                      required
                      name="reason"
                      maxLength={200}
                      onFocus={onFocus}
                    />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="rules" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24" >
            <div style={styles.formItem} >
            <span style={styles.formLabel}>活动说明：</span>
              <IceFormBinder triggerType="onBlur" name="remark" >
              <Input.TextArea
                      style={styles.input}
                      placeholder="请输入活动说明"
                      rows={4}
                      required
                      name="reason"
                      maxLength={200}
                      onFocus={onFocus}
                    />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="remark" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24" >
            <div style={styles.formItem} >
            <span style={styles.formLabel}>提审备注：</span>
              <IceFormBinder triggerType="onBlur" name="bringRemarks" >
              <Input.TextArea
                      style={styles.input}
                      placeholder="请输入备注"
                      rows={4}
                      required
                      name="reason"
                      maxLength={200}
                      onFocus={onFocus}
                    />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="bringRemarks" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <Button type="primary" onClick={condition} style={styles.button}>
                保存
              </Button>
            </div>
          </Col>
        </Row>
      </IceFormBinderWrapper>
      <Dialog
            title="优惠券"
            visible={recordVisible}
            onCancel={recordClose}
            onClose={recordClose}
            footer={false}
            // footer={<Button type="normal" onClick={recordClose}>确定</Button>}
            id="cls" 
          >
            <div style={styles.widFixed}>
              <Table dataSource={props.lists}>
                <Table.Column title="优惠券名称"   dataIndex="couponName" />
                <Table.Column title="优惠券门槛"  dataIndex="threshold" cell={renderAmount}/>
                <Table.Column title="库存数量"  dataIndex="totalSurplus" />
                <Table.Column title="操作"  cell={addC}/>
              </Table>
            </div>
          </Dialog>
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
  ml20:{
    marginLeft: '20px', 
    cursor: 'pointer'
  }
};
