import { Grid, Input, Select, DatePicker,Search,Button,Icon ,Radio,Upload,RadioForm, Form,Checkbox,Table, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
// hooks
import React, { useState,useRef,useEffect } from 'react';
import { renderAllAmount,CouponsType,renderValidityPeriod,renderWorkingDay,CouponsIsAdd,renderAmount,orderType } from '../../../../../common/js/filter';
import { removeArray,Debounce } from '../../../../../common/js/common';
// import ColumnGroup from '_antd@3.21.2@antd/lib/table/ColumnGroup';
// import { Link } from 'react-router-dom';
const { Row, Col } = Grid;
const { RangePicker } = DatePicker;
const { Group: RadioGroup } = Radio;


export function Forms(props){
  // useEffect(() => {
  //   console.log(props.arr)
  // },[props.arr])

  const onchange =(obj,val)=>{
    obj.val.total = val
    // console.log(props.arr);
    let num = 0
    props.arr.forEach(ele => {
      num += Number(ele.total)
    });
    props.setTotal(num)
  }

  const renderInput = (a,b,val) => {
    return(
      <Input onChange={onchange.bind(this,{val,b})} placeholder="请输入发放数量" />
    )
  }

  return(
    <div style={styles.formItem} >
        <Table dataSource={props.arr}>
          <Table.Column title="商铺ID" dataIndex="shopId"/>
          <Table.Column title="商铺名称" dataIndex="name"/>
          <Table.Column title="联系电话" dataIndex="tel" />
          <Table.Column title="张数"  cell={renderInput}/>
          <Table.Column title="操作" cell={props.renderOper}/>
        </Table>
    </div>
  )
}

export default function Filter(props){
  const ref = useRef('form')
  const [value, setValue] = useState({
    arr:{}
  });
  const [date, setDate] = useState({});
  const [arr,setArr] = useState([])
  const [total,setTotal] = useState(0)

  
  const [display1, display1Fn] = useState('block');
  
  const condition = () => {
    setValue(value);
    
    let couponId = window.location.hash.split('couponId=')[1]
    let sendData = []
    
    arr.forEach(element => {
      const {shopId,total} = element
      const obj = {
        shopId,
        total
      }
      sendData.push(obj)
    });
    
    console.log(sendData);
    props.send({
      couponId,
      sendData:JSON.stringify(sendData)
    })
  }

  const onChange = (val)=>{
    setDate(val)
    console.log(date)
  }

  
  const handleEnterKey = (e) => {
    //20102
    if(e.nativeEvent.keyCode === 13 ){ //e.nativeEvent获取原生的事件对像
      console.log(value)
    }
    // this.props.query(this.state.value.pageName);
  }
  const onBlur = (e) => {
    // console.log(value)
    const {shopId} =value
    props.getShopId({shopId})
  }

  const onChange1 = (val) =>{
    if( val == 4 || val == 3){
      display1Fn('block');
    }else{
      display1Fn('none');
    }
  }

  const addUser = ()=>{
    const newArr = Object.assign([],arr)
    console.log(props.info.id,Object.values(newArr));
    if(newArr.length!==0){
      let addIt = true
      try {
        newArr.forEach(element => {
          if(element.shopId===props.info.id){
            Message.error('已有该商户')
            addIt = false 
            throw new Error('stop')
          }else{
            addIt = true 
          }
        });
      } catch (error) {}
      console.log(addIt);
      if(addIt){
        newArr.push({
          name:props.info.nickname,
          tel:props.info.mobile,
          shopId:props.info.id
        });
        setArr(newArr);
      }
    }else{
      newArr.push({
        name:props.info.nickname,
        tel:props.info.mobile,
        shopId:props.info.id
      });
      setArr(newArr);
    }
    
    // console.log(arr)
  }

  const deleteUser = ( val ) =>{
    const newArr = Object.assign([],arr)
    const arr2 =removeArray(newArr,val)
    setArr(arr2);
    console.log(arr);
  }

  const renderOper = ( value, index, record) =>{
    return <div>
    <Button type="primary" style={styles.button} onClick={deleteUser.bind(this,record)} >
        删除
    </Button>
  </div>
  }
  // console.log(props.info);
  return (
    <IceContainer title="发布优惠券">
    <IceContainer title="优惠券信息">
    <Row wrap gutter="20" style={styles.formRow}>
      <Col l="24">
        <div style={styles.formItem}>
          <span style={styles.formLabel}>优惠券总金额：</span>
          {renderAllAmount(1,2,props.detail)}
        </div>
      </Col>
      </Row>
      <Row wrap gutter="20" style={styles.formRow}>
      <Col l="24">
        <div style={styles.formItem}>
          <span style={styles.formLabel}>优惠券类型：</span>
          {CouponsType(props.detail.type)}
        </div>
      </Col>
      </Row>
      <Row wrap gutter="20" style={styles.formRow}>
      <Col l="24">
        <div style={styles.formItem}>
          <span style={styles.formLabel}>优惠券名称：</span>
          {props.detail.couponName}
        </div>
      </Col>
      </Row>
      <Row wrap gutter="20" style={styles.formRow}>
      <Col l="24">
        <div style={styles.formItem}>
          <span style={styles.formLabel}>面值：</span>
          {renderAmount,orderType(props.detail.amount)}
        </div>
      </Col>
      </Row>
      <Row wrap gutter="20" style={styles.formRow}>
      <Col l="24">
        <div style={styles.formItem}>
          <span style={styles.formLabel}>总发行量：</span>
          {props.detail.total}张
        </div>
      </Col>
      </Row>
      <Row wrap gutter="20" style={styles.formRow}>
      <Col l="24">
        <div style={styles.formItem}>
          <span style={styles.formLabel}>优惠券剩余数：</span>
          {props.detail.totalSurplus}张
        </div>
      </Col>
      </Row>
      <Row wrap gutter="20" style={styles.formRow}>
      <Col l="24">
        <div style={styles.formItem}>
          <span style={styles.formLabel}>使用限制：</span>
          {orderType(props.detail.auctionLimit)}
        </div>
      </Col>
      </Row>
      <Row wrap gutter="20" style={styles.formRow}>
      <Col l="24">
        <div style={styles.formItem}>
          <span style={styles.formLabel}>是否可叠加：</span>
          {CouponsIsAdd(props.detail.multiCoupons)}
        </div>
      </Col>
      </Row>
      <Row wrap gutter="20" style={styles.formRow}>
      <Col l="24">
        <div style={styles.formItem}>
          <span style={styles.formLabel}>使用门槛：</span>
          {renderAmount,orderType(props.detail.threshold)}
        </div>
      </Col>
      </Row>
      <Row wrap gutter="20" style={styles.formRow}>
      <Col l="24">
        <div style={styles.formItem}>
          <span style={styles.formLabel}>有效领取时间：</span>
          {renderValidityPeriod(1,2,props.detail)}
        </div>
      </Col>
      </Row>
      <Row wrap gutter="20" style={styles.formRow}>
      <Col l="24">
        <div style={styles.formItem}>
          <span style={styles.formLabel}>有效使用时间：</span>
          {renderWorkingDay(props.detail.timeout)}
        </div>
      </Col>
      </Row>
      <Row wrap gutter="20" style={styles.formRow}>
      <Col l="24">
        <div style={styles.formItem}>
          <span style={styles.formLabel}>备注：</span>
          {props.detail.remark}
        </div>
      </Col>
      </Row>
      <Row wrap gutter="20" style={styles.formRow}>
      <Col l="24">
        <div style={styles.formItem}>
          <span style={styles.formLabel}>审核理由：</span>
          {props.detail.checkReason || '无'}
        </div>
      </Col>
      </Row>
    </IceContainer>
    <IceContainer title="发放优惠券">
    <IceFormBinderWrapper
      value={value}
      ref={ref}
    >
        {/* <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>每人发放数量：</span>
            <IceFormBinder triggerType="onBlur" name="title">
              <Input placeholder="请输入发放数量" size="large" />
            </IceFormBinder>
            <span style={styles.ml10}>库存总数：{props.detail.total} 张</span>
            <div style={styles.formError}>
              <IceFormError name="title" />
            </div>
          </div>
        </Col>
        </Row> */}
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
        <div style={{ display: display1 }}>
          <div style={styles.formItem}>
            <span style={styles.formLabel}>发放总数：</span>
            {total}张
          </div>
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
        <div style={{ display: display1 }}>
          <div style={styles.formItem}>
            <span style={styles.formLabel}>发放总金额：</span>
            {renderAmount,orderType(Number(total)*Number(props.detail.amount))}
          </div>
          </div>
        </Col>
        </Row>
        {/* <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>发放时间：</span>
            <IceFormBinder triggerType="onBlur" name="date">
            <RangePicker showTime onChange={onChange}  />
            </IceFormBinder>
            <div style={styles.formError}>
              <IceFormError name="date" />
            </div>
          </div>
        </Col>
        </Row> */}
        {/* <Row wrap gutter="20" style={styles.formRow}>
        <Col l="24" >
          <div style={styles.formItem} >
            <span style={styles.formLabel}>发放对象：</span>
            <IceFormBinder triggerType="onBlur" name="scope" >
                <RadioGroup name="gender" onChange={onChange1}>
                <Radio value="3">指定用户</Radio>
                <Radio value="4">指定商户</Radio>
              </RadioGroup>
            </IceFormBinder>
            <div style={styles.formError}>
              <IceFormError name="target" />
            </div>
          </div>
        </Col>
        </Row> */}
        <Row wrap gutter="20" style={styles.formRow}>
        <Col>
          <div>
          <div style={styles.formItem} >
            <div>
              <IceFormBinder  name="shopId">
                <Input placeholder="填写商户ID" size="large" onKeyPress={handleEnterKey} onBlur={onBlur}/>
                {/* <Input placeholder="填写用户名,Enter键查询" size="large" onKeyPress={handleEnterKey}/> */}
              </IceFormBinder>
            </div>
            <div style={ {display: props.info.nickname?'block':'none'} }>
            {/* <div> */}
              <span style={styles.ml10}> 商铺名称:{props.info.nickname}</span>
              <span style={styles.ml10}> 联系电话:{props.info.mobile}</span>
              <Button type="primary" onClick={addUser} style={styles.ml10}>
                添加该用户
              </Button>
            </div>
          </div>
          </div>
        </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
        <Forms 
        arr={arr}
        renderOper={renderOper}
        setArr={(o)=>setArr(o)}
        setTotal={(o)=>setTotal(o)}
        />
        {/* <div style={styles.formItem} >
          <Table dataSource={arr}>
            <Table.Column title="手机号" dataIndex="id"/>
            <Table.Column title="昵称" dataIndex="title.name" />
            <Table.Column title="真实姓名" dataIndex="time"/>
            <Table.Column title="操作" cell={renderOper}/>
          </Table>
          </div> */}
        </Row>
        <Button type="primary" onClick={condition} style={styles.mt10}>
          保存
        </Button>
    </IceFormBinderWrapper>
    </IceContainer>
    </IceContainer>
  );
}

const styles = {
  container: {
    margin: '20px',
    padding: '0',
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
  // formRow: {
  //   padding: '10px 20px',
  // },
  formItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  formLabel: {
    minWidth: '180px',
  },
  fr:{
    float: 'right'
  },
  ml10:{
    marginLeft: '10px',
  },
  mt10:{
    marginTop: '10px',
  }
};
