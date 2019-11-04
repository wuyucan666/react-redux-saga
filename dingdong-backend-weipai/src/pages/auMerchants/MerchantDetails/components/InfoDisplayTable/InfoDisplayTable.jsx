import React, { Component } from 'react';
import { Table } from '@alifd/next';
import IceContainer from '@icedesign/container';
import './InfoDisplayTable.scss';
import {renderImg,renderTime,renderState,renderRate} from '../../../../../common/js/filter'
import {formatImgUrl,uploadImg,getToken} from '../../../../../common/js/common'
import { Link } from 'react-router-dom';
import nw from '../../../../../common/http/post'
/**
 * 表格接收的数据
 */

export default class InfoDisplayTable extends Component {
  static displayName = 'InfoDisplayTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
        au:[],
        gb:[],
        common:[]
    };
  }

  renderOper = (val,o,data) => {
    if( data.examine_time ){
      return ('未审核')
    }
  };

  componentDidMount(){
    let that = this
    let data = {
      pid:20408,
      shopId: window.location.hash.split('=')[1].split('&')[0]
    }
    nw.post('/',data,function (res) {
      if(res.errorCode == 0){
        // console.log(res.data.au)
        that.setState({
          au:res.data.au,
          gb:res.data.gb,
          common:res.data.common,
        })
      }
    })
  }



  render() {
    const renderImg = value => {
      return (<div className="media">
          <img src={formatImgUrl(value)} className="media-side" width={200}  height={200}/>
          {/* <div className="media-content">{product[0].title}</div> */}
      </div>);
    }
    const renderpigeonsCount = value => {
      return (<div className="media">
         {/* <Link target="_blank" style={styles.link} to={`/orderManagement/DefaultNum?uuid=${this.props.data.baseInfo.uuid}`} >{value}</Link> */}
         {value}
      </div>);
    }
    
    let inviteList = [[]]
    if(this.props.data.inviteList){
      inviteList.push(this.props.data.inviteList)
    }
    let sellerInfo = []
    if(this.props.data.sellerInfo){
      sellerInfo.push(this.props.data.sellerInfo)
    }
    let au = [];
    let gb = [];
    let common = [];
    if( this.state.au != null && this.state.gb != null && this.state.common != null){
      au.push(this.state.au);
      gb.push(this.state.gb);
      common.push(this.state.common);
    }

    // if(this.props.data.sellerStatistics!==null){
    //   au.push(this.props.data.sellerStatistics.au)
    //   // sellerStatistics.push(this.props.data.sellerStatistics.gb)
    // }
    // console.log(sellerStatistics[0])
    // let {inviteList,sellerInfo,sellerStatistics} = this.props.data
    // console.log(au,gb,common,sellerInfo);
    return (
      <div className="info-display-table" style={styles.infoDisplayTable}>
         <IceContainer title="微拍统计信息">
          <Table dataSource={au} >
            <Table.Column title="拍品数" dataIndex="coCount" width={80}/>
            <Table.Column title="专场数" dataIndex="auCount" width={80}/>
            <Table.Column title="成交总件数" dataIndex="coTransCount" width={80}/>
            <Table.Column title="拍品成交率" dataIndex="transRate" width={80} cell={renderRate}/>
            <Table.Column title="服务费" dataIndex="servFee" width={80}/>
            <Table.Column title="拍品鸽子数" dataIndex="coDoveCount" width={80}  cell={renderpigeonsCount}/>
            <Table.Column title="拍品流拍数" dataIndex="coPassInCount" width={80}/>
          </Table>
        </IceContainer> 
        <IceContainer title="团购统计信息">
          <Table dataSource={gb} >
            <Table.Column title="拍品数" dataIndex="coCount" width={80}/>
            <Table.Column title="专场数" dataIndex="auCount" width={80}/>
            <Table.Column title="成交总件数" dataIndex="coTransCount" width={80}/>
            <Table.Column title="拍品成交率" dataIndex="transRate" width={80} cell={renderRate}/>
            <Table.Column title="服务费" dataIndex="servFee" width={80}/>
            <Table.Column title="拍品鸽子数" dataIndex="coDoveCount" width={80}  cell={renderpigeonsCount}/>
            <Table.Column title="拍品流拍数" dataIndex="coPassInCount" width={80}/>
          </Table>
        </IceContainer> 
        <IceContainer title="其他统计信息">
          <Table dataSource={common} >
            <Table.Column title="潜在用户" dataIndex="poBuyerCount" width={80}/>
            <Table.Column title="成交用户" dataIndex="buyerCount" width={80}/>
            <Table.Column title="送拍人总数" dataIndex="senderCount" width={80}/>
            <Table.Column title="被关注次数" dataIndex="followCount" width={80}/>
            <Table.Column title="邀请人数" dataIndex="inviteCount" width={80}/>
            {/* <Table.Column title="违约次数" dataIndex="ShopDefault" width={80} /> */}
          </Table>
        </IceContainer> 
        <IceContainer title="商户信息">
          <Table dataSource={sellerInfo}>
            <Table.Column title="企业地址" dataIndex="companyAddress" />
            <Table.Column title="店铺负责人手机号" dataIndex="companyTel" />
            <Table.Column title="联系邮箱" dataIndex="email"/>
            <Table.Column title="企业营业执照副本" dataIndex="businessLicenseImg" cell={renderImg}/>
            <Table.Column title="银行开户许可证" dataIndex="bankLicenseImg" cell={renderImg}/>
            {/* <Table.Column title="法定代表身份证（正面）" dataIndex="pFrontImg"/>
            <Table.Column title="法定代表身份证（反面）" dataIndex="pBackImg"/>
            <Table.Column title="店铺负责人身份证（正面）" dataIndex="lFrontImg"/>
            <Table.Column title="店铺负责人身份证（反面）" dataIndex="lBackImg"/> */}
          </Table>
          <Table dataSource={sellerInfo}>
            {/* <Table.Column title="企业地址" dataIndex="companyAddress"/>
            <Table.Column title="店铺负责人手机号" dataIndex="companyTel" />
            <Table.Column title="联系邮箱" dataIndex="email"/>
            <Table.Column title="企业营业执照副本" dataIndex="businessLicenseImg"/>
            <Table.Column title="银行开户许可证" dataIndex="bankLicenseImg"/> */}
            <Table.Column title="法定代表身份证（正面）" dataIndex="lFrontImg" cell={renderImg} />
            <Table.Column title="法定代表身份证（反面）" dataIndex="lBackImg" cell={renderImg}/>
            <Table.Column title="店铺负责人身份证（正面）" dataIndex="pFrontImg" cell={renderImg}/>
            <Table.Column title="店铺负责人身份证（反面）" dataIndex="pBackImg" cell={renderImg}/>
          </Table>
        </IceContainer>
        <IceContainer title="邀请修改人记录">
          <Table dataSource={inviteList[0]}>
            <Table.Column title="修改前邀请人" dataIndex="currentInvitename" width={50}/>
            <Table.Column title="修改后邀请人" dataIndex="modifyInvitename" width={50}/>
            <Table.Column title="创建时间" dataIndex="apply_time" width={60} cell={renderTime}/>
            <Table.Column title="创建人" dataIndex="Applyname" width={70}/>
            <Table.Column title="审核状态" dataIndex="status" width={50} cell={renderState}/>
            <Table.Column title="审核人" dataIndex="examinename" width={40}/>
            <Table.Column title="审核时间" dataIndex="examine_time" width={50} cell={renderTime}/>
            <Table.Column title="修改原因" dataIndex="reason" width={100}/>
          </Table>
        </IceContainer>
      </div>
    );
  }
}

const styles = { infoDisplayTable: {} };
