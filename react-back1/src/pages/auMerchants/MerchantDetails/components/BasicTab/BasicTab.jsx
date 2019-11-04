import React, { Component } from 'react';
import { Tab } from '@alifd/next';
import IceContainer from '@icedesign/container';
import InfoDisplayTable from '.././InfoDisplayTable';
import InfoDisplayTable1 from '.././InfoDisplayTable1';
// import PrivacyTable from '.././PrivacyTable';

// let uuid = window.location.hash.split('=')[1];
export default class BasicTab extends Component {
  static displayName = 'BasicTab';


  jump =()=>{
    let url = '/#/auUser/Privacy?uuid='+window.location.hash.split('uuid=')[1]
    window.location.href=url
  }

  money =()=>{
    let url = '/#/financialManagement/moneyList?uuid='+window.location.hash.split('uuid=')[1]
    window.location.href=url
  }

  integral =()=>{
    let url = '/#/integralManagement/integraList?uuid='+window.location.hash.split('uuid=')[1]
    window.location.href=url
  }

  render() {
    // console.log(this.props)
    return (
      <div className="basic-tab">
        <IceContainer style={styles.tabCardStyle}>
        <Tab>
            <Tab.Item title="用户信息" key="1">
            <InfoDisplayTable data={this.props.data}
            //  au = {this.props.state.au}
            // common = {this.props.state.common}
            // gb = {this.props.state.gb}
            // inviteList = {this.props.state.inviteList}
            // sellerInfo =  {this.props.state.sellerInfo}
            />
            </Tab.Item>
            <Tab.Item title="隐私信息" key="2"  onClick={e=>this.jump()}>
            <InfoDisplayTable1 />
            </Tab.Item>
            {/* <Tab.Item title="交易明细" key="3"  onClick={e=>this.money()}>
            交易明细
            </Tab.Item> */}
            <Tab.Item title="资金明细" key="4" onClick={e=>this.money()}>
            资金明细
            </Tab.Item>
            <Tab.Item title="积分明细" key="5" onClick={e=>this.integral()}>
            积分明细
            </Tab.Item>
            {/* <Tab.Item title="优惠券" key="6">
            优惠券
            </Tab.Item> */}
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
