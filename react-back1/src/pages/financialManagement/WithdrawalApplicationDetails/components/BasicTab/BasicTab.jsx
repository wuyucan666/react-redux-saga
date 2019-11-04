import React, { Component } from 'react';
import { Tab } from '@alifd/next';
import IceContainer from '@icedesign/container';
import InfoDisplayTable from '.././InfoDisplayTable';
import InfoDisplayTable1 from '.././InfoDisplayTable1';
import InfoDisplayTable2 from '.././InfoDisplayTable2';
// import PrivacyTable from '.././PrivacyTable';
export default class BasicTab extends Component {
  static displayName = 'BasicTab';

  render() {
    return (
      <div className="basic-tab">
        <IceContainer style={styles.tabCardStyle}>
        <Tab>
            <Tab.Item title="提现记录" key="1">
            <InfoDisplayTable />
            </Tab.Item>
            <Tab.Item title="交易订单" key="2">
            <InfoDisplayTable1 />
            </Tab.Item>
            <Tab.Item title="充值记录" key="4">
            <InfoDisplayTable2 />
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
