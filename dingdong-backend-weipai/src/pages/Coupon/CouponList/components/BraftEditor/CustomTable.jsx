/* eslint-disable react/no-unused-state, no-plusplus */
import React, { useState } from 'react';
import { Table, Switch, Dialog, Button, Grid, Pagination,Input } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import {renderAmount,renderAllAmount,CouponsType,renderTime,renderGetCouponTime,renderCouponsStatus} from '../../../../../common/js/filter'
const { Row, Col } = Grid;

export default function CustomTable(props)  {

  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [sendData, setSendData] = useState({
    shopId :'',
    total :1
  });
  const[couponId,setCouponId] = useState('')
  
//页码查询
  const handlePaginationChange = (current) => {
    setPage(current)
    // console.log(props.pages);
    props.handlePage(current)
  };

  //删除优惠券
  const deleteCoupon = (val) => {
    Dialog.confirm({
      title: '提示',
      content: '是否确认删除',
      onOk:() => {
        props.fnDelete(val)
      },
    });
  }

  //撤销优惠券
  const undoCoupon = (val) => {
    Dialog.confirm({
      title: '提示',
      content: '是否确认撤销',
      onOk:() => {
        props.fnUndo(val)
      },
    });
  }

  //失效优惠券
  const failureCoupon = (val) => {
    Dialog.confirm({
      title: '提示',
      content: '是否确认失效，失效后该组优惠券不可使用',
      onOk:() => {
        props.fnFailure(val)
      },
    });
  }
//提审优惠券
  const submitCoupon = (val) => {
    props.fnSubmit({
      couponId:val
    })
  }

//发出优惠券
  const issueCoupons = (val) => {
  // props.fnIssue(val)
  setCouponId(val.goodId)
  window.location.hash=`/Coupon/CouponIssue?couponId=${val.goodId}`
  // setVisible(true)
};  

const onOk = () => {
  props.fnIssue({
    sendData:JSON.stringify([sendData]),
    couponId})
  setVisible(false)
};  

  const renderOper = (v,o,list) => {
    //根据状态值判断显示的按钮分别是什么list.sendStatus假数据先判断
    //已发放
    if( list.status == 1 ){
      console.log(list.businessLimit);
      return(
        <div>
          <Link target="_blank" to={`/Coupon/CouponDetails?id=${list.goodId}`} >
            查看
          </Link>
          {/* {list.type==1?
            <Link style={styles.link}  to={`/Coupon/CouponIssue?couponId=${list.goodId}`} >
              发出
            </Link>:null
            } */}
          <Link style={styles.link} onClick={()=>failureCoupon(list)} to={'#'} >
            失效
          </Link>
          <Link target="_blank" to={`/Coupon/CouponReceiveDetails?id=${list.goodId}&businessLimit=${list.businessLimit}`} >
            领取情况
          </Link>
        </div>
      )
    }
     //审核中
    if( list.status == 2 ){
      return(
        <div>
          <Link target="_blank" to={`/Coupon/CouponDetails?id=${list.goodId}`} >
            查看
          </Link>
          {/* <Link style={styles.link} onClick={()=>undoCoupon(list.goodId)} to={'#'} >
            撤销
          </Link> */}
        </div>
      )
    }
    //审核失败
    if( list.status == 3 ){
      return(
        <div>
          {/* <Link style={styles.link} target="_blank" to={`/Coupon/CouponEdit?id=${list.goodId}`} >
            编辑
          </Link> */}
          <Link target="_blank" to={`/Coupon/CouponDetails?id=${list.goodId}`} >
            查看
          </Link>
          <Link style={styles.link} onClick={()=>deleteCoupon(list)} to={'#'} >
            删除
          </Link>
          <Link style={styles.link} onClick={()=>submitCoupon(list.goodId)} to={'#'} >
            提审
          </Link>
        </div>
      )
    }
    //待提审
    if( list.status == 4 ){
      return(
        <div>
          {/* <Link style={styles.link} target="_blank" to={`/Coupon/CouponEdit?id=${list.goodId}`} >
            编辑
          </Link> */}
          <Link target="_blank" to={`/Coupon/CouponDetails?id=${list.goodId}`} >
            查看
          </Link>
          <Link style={styles.link} onClick={()=>deleteCoupon(list)} to={'#'} >
            删除
          </Link>
          <Link style={styles.link} onClick={()=>submitCoupon(list.goodId)} to={'#'} >
            提审
          </Link>
        </div>
      )
    }
    //已失效
    if( list.status == 5 ){
      return(
        <div>
          <Link target="_blank" to={`/Coupon/CouponDetails?id=${list.goodId}`} >
            查看
          </Link>
          <Link style={styles.link} onClick={()=>deleteCoupon(list)} to={'#'} >
            删除
          </Link>
          <Link target="_blank" to={`/Coupon/CouponReceiveDetails?id=${list.goodId}&businessLimit=${list.businessLimit}`} >
          领取情况
          </Link>
        </div>
      )
    }
    //库存中
    if( list.status == 0 ){
      if(list.businessLimit==0){
        return(
          <div>
            <Link target="_blank" to={`/Coupon/CouponDetails?id=${list.goodId}`} >
              查看
            </Link>
            <Link style={styles.link} onClick={()=>deleteCoupon(list)} to={'#'} >
              删除
            </Link>
            {list.type==1?
            list.totalSurplus=='0'?null:
            <Link style={styles.link}  to={`/Coupon/CouponIssue?couponId=${list.goodId}`} >
              发出
            </Link>
            :null
            }
          </div>
        )
      }else{
        return(
          <div>
            <Link target="_blank" to={`/Coupon/CouponDetails?id=${list.goodId}`} >
              查看
            </Link>
            {/* {list.type==1?
            <Link style={styles.link}  to={`/Coupon/CouponIssue?couponId=${list.goodId}`} >
              发出
            </Link>:null
            } */}
            <Link style={styles.link} onClick={()=>failureCoupon(list)} to={'#'} >
              失效
            </Link>
            <Link target="_blank" to={`/Coupon/CouponReceiveDetails?id=${list.goodId}&businessLimit=${list.businessLimit}`} >
              领取情况
            </Link>
          </div>
        )
      }
      
    }

  };
  return (
    <div>
    <IceContainer title="优惠券列表">
      <Table
        dataSource={props.lists}
        // dataSource={[{orderSn:123,name:231,amount:'amount',transferFee:'1',account:'2',author:'2d',auditor:'23'}]}
        // rowSelection={{ onChange: onChange }}
      >
        <Table.Column title="创建时间" dataIndex="created" cell={renderTime}  width={200} />
        <Table.Column title="优惠券类型" dataIndex="type" cell={CouponsType}  width={80} />
        <Table.Column title="优惠券名称" dataIndex="couponName"  width={150} />
        <Table.Column title="优惠券总金额" dataIndex="amount" cell={renderAllAmount}  width={100} />  
        <Table.Column title="面额" dataIndex="amount" cell={renderAmount} width={100} />
        <Table.Column title="数量（张）" dataIndex="total"  width={100} />
        <Table.Column title="剩余张数" dataIndex="totalSurplus"  width={100} />
        <Table.Column title="有效领取时间" dataIndex="timeout" cell={renderGetCouponTime} width={300} />
        <Table.Column title="使用门槛" dataIndex="threshold" cell={renderAmount} width={120} />
        <Table.Column title="优惠券状态" dataIndex="status" cell={renderCouponsStatus} width={100} />
        <Table.Column title="创建人员" dataIndex="createNickname" width={100} />
        <Table.Column title="发布人员" dataIndex="createNickname" width={100} />
        <Table.Column title="操作" dataIndex="id" width={150}  cell={renderOper}/>
      </Table>
      <Pagination
        style={styles.pagination}
        current={props.pages}
        onChange={handlePaginationChange}
        total={props.total}
        pageSize={20}
      />
      {/* <Dialog title="确定发放"
        visible={visible}
        isFullScreen
        onOk={onOk}
        onCancel={onClose}
        onClose={onClose}>
          <div>
            <span style={styles.widthFix}>发放用户ID：</span>
            <Input onChange={onChangeId} placeholder="请输入用户ID"  />
          </div>
          <div style={styles.marginTop}>
            <span style={styles.widthFix}>发放张数：</span>
            <Input onChange={onChangeNum} placeholder="请输入用户张数"  />
          </div>
      </Dialog> */}
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
  marginTop: {
    marginTop: '10px',
  },
  widthFix: {
    width:'90px',
    display:'inline-block'
  }
};
