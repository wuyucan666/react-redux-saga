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
    const tabs = [
      { tab: '订阅号概览', key: 'guide' },
      { tab: '订阅号推送', key: 'push' },
      { tab: '互动消息', key: 'message' },
      { tab: '自动回复设置', key: 'autoreply' },
    ];

    return (
      <div className="basic-tab">
        <IceContainer style={styles.tabCardStyle}>
        <Tab>
            <Tab.Item title="订单异常" key="1">
            <InfoDisplayTable />
            </Tab.Item>
            <Tab.Item title="支付异常" key="2">
            <InfoDisplayTable1 />
            </Tab.Item>
            <Tab.Item title="操作异常" key="4">
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
