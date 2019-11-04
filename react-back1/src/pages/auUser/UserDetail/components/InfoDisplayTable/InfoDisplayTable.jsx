import React, { Component } from 'react';
import { Table,Grid,Input } from '@alifd/next';
import IceContainer from '@icedesign/container';
import './InfoDisplayTable.scss';
import { Link } from 'react-router-dom';
const { Row, Col } = Grid;
import {renderState,renderTime} from '../../../../../common/js/filter'
import {formatImgUrl,uploadImg,getToken} from '../../../../../common/js/common'


/**
 * 表格接收的数据
 */

const render = (value, index, record) => {
  return<Link target="_blank" to={record.DoveNum} > {record.time}</Link>
};

const InviteFriendsList = (value, index, record) => {
  return<Link target="_blank" to={record.InviteFriendsList} > {record.time}</Link>
};

export default class InfoDisplayTable extends Component {
  static displayName = 'InfoDisplayTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderOper = (val,o,data) => {
    if( data.examine_time ){
      return ('未审核')
    }
  };
  
  render() {
    const uuid = window.location.hash.split('=')[1];
    const userStatisInfo = this.props.information;
    const userProve = this.props.userProve;
    console.log(userProve)
    const productRender = (val) =>{
      return <img src={val} className="media-side"  width={80}/>
    }
    let userInvite = [];
    if(this.props.userInvite.list !=  null){
      userInvite = this.props.userInvite.list
    }
    console.log(userInvite.list)
    return (
      <div className="" style={styles.infoDisplayTable}>
        <IceContainer title="身份证信息" >
          <Row wrap >
          <Col  style={styles.formCol}>
              <span style={styles.label}>身份证号:</span>
                <Input value={userProve==null?'':userProve.idNum} disabled/>
            </Col>
            {/* <Col  style={styles.formCol}>
              <span style={styles.label}>身份证正面:</span>
                <div style={styles.dimg}>
                 <img src={userProve==null?'':formatImgUrl(userProve.frontImg)} alt="" style={styles.img}/>
                </div>
            </Col>
            <Col  style={styles.formCol}>
                <span style={styles.label}>身份证反面:</span>
                <div style={styles.dimg}>
                 <img  src={userProve==null?'':formatImgUrl(userProve.backendImg)} alt="" style={styles.img}/>
                </div>
            </Col>
            <Col  style={styles.formCol}>
                <span style={styles.label}>手持身份证:</span>
                <div style={styles.dimg}>
                 <img src={userProve==null?'':formatImgUrl(userProve.handingImg)} alt="" style={styles.img}/>
                </div>
            </Col> */}
          </Row>
        </IceContainer>
        <IceContainer title="统计信息">
        <Row wrap >
            <Col  style={styles.formCol}>
              <span style={styles.label}>好评数:</span>
                <Input value={userStatisInfo ==null?'':userStatisInfo.negativeCount } disabled/>
            </Col>
            <Col  style={styles.formCol}>
              <span style={styles.label}>差评数:</span>
                <Input value={userStatisInfo==null?"":userStatisInfo.praiseCount} disabled/>
            </Col>
            <Col  style={styles.formCol}>
                <span style={styles.label}>邀请好友:</span>
                <Link target="_blank" to={`/auUser/InviteFriendsList?uuid=${uuid}`}>
                  <span>{userStatisInfo==null?"":userStatisInfo.invitefriend}</span>
               
                </Link>
            </Col>
            <Col  style={styles.formCol}>
                <span style={styles.label}>关注好友:</span>
                <Input value={userStatisInfo==null?"":userStatisInfo.followFriendCount} disabled/>
            </Col>
            <Col  style={styles.formCol}>
                <span style={styles.label}>关注藏品总数:</span>
                <Input value={userStatisInfo==null?"":userStatisInfo.collectionCount} disabled/>
            </Col>
            <Col  style={styles.formCol}>
                <span style={styles.label}>鸽子数:</span>
                {/* <Link target="_blank" to={`/orderManagement/DoveNum?uuid=${uuid}`}> */}
                <span>{userStatisInfo==null?"":userStatisInfo.pigeonsCount}</span>
                {/* </Link> */}
            </Col>
          </Row>
        </IceContainer>
        <IceContainer title="邀请修改人记录">
          <Table dataSource={userInvite}>
            <Table.Column title="修改前邀请人" dataIndex="currentInvitename" width={150}/>
            <Table.Column title="修改后邀请人" dataIndex="modifyInvitename" width={150}/>
            <Table.Column title="创建时间" dataIndex="apply_time" width={200} cell={renderTime}/>
            <Table.Column title="创建人" dataIndex="Applyname" width={150}/>
            <Table.Column title="审核状态" dataIndex="status" cell={renderState} width={200}/>
            <Table.Column title="审核人" dataIndex="examinename" width={200}/>
            <Table.Column title="审核时间" dataIndex="examine_time" width={200} cell={renderTime}/>
            <Table.Column title="修改原因" dataIndex="reason" width={20400}/>
          </Table>
        </IceContainer>
      </div>
    );
  }
}

const styles = { infoDisplayTable: {} , 
formCol: {
  marginBottom: '20px',
  float:'left',
  width:'350px',
  flex: 'none',
},
label:{
  width:'100px',
  display: 'inline-block'
},
dimg:{
  width:'200px',
  height:'200px'
},
img:{
  width:'200px',
  height:'200px'
}
};
