import React, { Component } from 'react';
import { Tab } from '@alifd/next';
import IceContainer from '@icedesign/container';
import InfoDisplayTable from '.././InfoDisplayTable';
import InfoDisplayTable1 from '.././InfoDisplayTable1';
// import PrivacyTable from '.././PrivacyTable';

export default class BasicTab extends Component {
  static displayName = 'BasicTab';
  
  
  jump =()=>{
    let url = '/#/auUser/Privacy?uuid='+window.location.hash.split('uuid=')[1]
    window.location.href=url
  }

  money =()=>{
    const {mobile,nickname,uuid} = this.props.info
    // let enName = encodeURI(encodeURI(nickname))
    let url = '/#/financialManagement/moneyList?nickname='+nickname+'&mobile='+mobile+'&uuid='+uuid
    window.location.href=url
  }

  integral =()=>{
    const {mobile,nickname,uuid} = this.props.info
    let url = '/#/integralManagement/integraList?nickname='+nickname+'&mobile='+mobile+'&uuid='+uuid
    window.location.href=url
  }

  Coupons =()=>{
    const {mobile,nickname,uuid} = this.props.info
    let url = '/#/auUser/UserCoupons?nickname='+nickname+'&mobile='+mobile+'&uuid='+uuid
    window.location.href=url
  }

  

  render() {
    // let encode = encodeURI(this.props.info.nickname)
    // console.log(encode,decodeURI(encode))
    return (

      <div className="basic-tab">
        <IceContainer style={styles.tabCardStyle}>
        <Tab>
            <Tab.Item title="用户信息" key="1">
            <InfoDisplayTable information={this.props.information}  userInvite={this.props.userInvite} userProve={this.props.userProve}/>
            </Tab.Item>
            <Tab.Item title="隐私信息" key="2" onClick={e=>this.jump()}>
            {/* <InfoDisplayTable1 /> */}
            </Tab.Item>
            <Tab.Item title="资金明细" key="4" onClick={e=>this.money()}>
            资金明细
            </Tab.Item>
            <Tab.Item title="积分明细" key="5" onClick={e=>this.integral()}>
            积分明细
            </Tab.Item>
            <Tab.Item title="优惠券" key="6" onClick={e=>this.Coupons()}>
            优惠券
            </Tab.Item>
        </Tab>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  tabCardStyle: {
    padding: 0,
  },
};
