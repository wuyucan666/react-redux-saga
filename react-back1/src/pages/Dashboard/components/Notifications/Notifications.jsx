import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';

import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

export default class Notifications extends Component {
  static displayName = 'Notifications';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const dashboardObj = this.props.dashboardObj;
    return (
      <IceContainer title="待处理" >
        <Row wrap>
          <Col l="" >
            <div style={styles.noticeItem}>
              <div style={styles.noticeItemTitle}>用户管理</div>
              <div style={styles.noticeItemBody}>
                <Link target="_blank" to="/auUser/UserAudit?status=1" style={styles.bodyItem}>
                邀请人修改审核：
                  {
                  dashboardObj.userInviteCheck == '0' ?
                    <span>{dashboardObj.userInviteCheck}个</span> :
                    <span style={{ display: 'flex' }}>
                      <span style={styles.red}>{`（${dashboardObj.userInviteCheck}）`}
                      </span>
                      <span>个</span>
                    </span>
                }
                </Link>
                {/* <Link target="_blank"  to="/financialManagement/UserPipelineQuery"  style={styles.bodyItem}>
                  投诉意见处理：<a href="#">88</a>个
                </Link> */}
              </div>
            </div>
          </Col>

          <Col l="" >
            <div style={styles.noticeItem}>
              <div style={styles.noticeItemTitle}>微拍管理：</div>
              <div style={styles.noticeItemBody}>
                <Link target="_blank" to="/auMerchants/SiteManagement?status=5" style={styles.bodyItem}>
                  待审微拍专场:
                  {
                    dashboardObj.auctionCheck == '0' ?
                      <span>{dashboardObj.auctionCheck}个</span> :
                      <span style={{ display: 'flex' }}>
                        <span style={styles.red}>{`（${dashboardObj.auctionCheck}）`}
                        </span>
                        <span>个</span>
                      </span>
                  }
                </Link>
                <Link target="_blank" to="/orderManagement/GbOrder?status=1" style={styles.bodyItem}>
                  待审团购专场:
                  {
                    dashboardObj.groupbuyCheck == '0' ?
                      <span>{dashboardObj.groupbuyCheck}个</span> :
                      <span style={{ display: 'flex' }}>
                        <span style={styles.red}>{`（${dashboardObj.groupbuyCheck}）`}
                        </span>
                        <span>个</span>
                      </span>
                  }
                </Link>
                {/* <Link target="_blank"  to="/financialManagement/UserPipelineQuery"  style={styles.bodyItem}>
                待审团购专场：<a href="#">0</a>个
                </Link> */}
                <Link target="_blank" to="/auMerchants/MerchantsAuditList?status=0" style={styles.bodyItem}>
                待审商家 ：
                  {
                  dashboardObj.shopCheck == '0' ?
                    <span>{dashboardObj.shopCheck}个</span> :
                    <span style={{ display: 'flex' }}>
                      <span style={styles.red}>{`（${dashboardObj.shopCheck}）`}
                      </span>
                      <span>个</span>
                    </span>
                }
                </Link>
              </div>
            </div>
          </Col>

          <Col l="">
            <div style={styles.noticeItem}>
              <div style={styles.noticeItemTitle}>支付管理</div>
              <div style={styles.noticeItemBody}>
                <Link target="_blank" to="/financialManagement/OfflineList?status=6" style={styles.bodyItem}>
                  待审线下汇款：
                  {
                  dashboardObj.offlineRechargeCheck == '0' ?
                    <span>{dashboardObj.offlineRechargeCheck}个</span> :
                    <span style={{ display: 'flex' }}>
                      <span style={styles.red}>{`（${dashboardObj.offlineRechargeCheck}）`}
                      </span>
                      <span>个</span>
                    </span>
                  }
                </Link>
                <Link target="_blank" to="/financialManagement/UserPipelineQuery?status=1" style={styles.bodyItem}>
                  待审提现：
                  {
                  dashboardObj.transCheck == '0' ?
                    <span>{dashboardObj.transCheck}个</span> :
                    <span style={{ display: 'flex' }}>
                      <span style={styles.red}>{`（${dashboardObj.transCheck}）`}
                      </span>
                      <span>个</span>
                    </span>
                  }
                </Link>
                <Link target="_blank" to="/financialManagement/ChargeSingle?status=1" style={styles.bodyItem}>
                  待审充值补单：
                  {
                  dashboardObj.transExtraCheck == '0' ?
                    <span>{dashboardObj.transExtraCheck}个</span> :
                    <span style={{ display: 'flex' }}>
                      <span style={styles.red}>{`（${dashboardObj.transExtraCheck}）`}</span>
                      <span>个</span>
                    </span>
                  }
                </Link>
              </div>
            </div>
          </Col>

          {/* <Col l="" >
            <div style={styles.noticeItem}>
              <div style={styles.noticeItemTitle}>日志管理</div>
              <div style={styles.noticeItemBody}>
                 <Link target="_blank"  to="/auRecord/AbnormalOrders"  style={styles.bodyItem}>
                  日志异常处理：100
                  </Link>
              </div>
            </div>
          </Col> */}
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  noticeItem: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '50%',
    padding: '20px',
    width: '400px',
    // float: 'left',
    // flex: '0 0 50%!important'
  },
  noticeItemTitle: {
    marginBottom: '10px',
    fontSize: '14px',
    color: '#333',
    fontWeight: 'bold',
  },
  noticeItemBody: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  bodyItem: {
    display: 'flex',
    // flexBasis: '33%',
    // width: '33%',
    color: '#999',
    fontSize: '13px',
    marginBottom: '10px',
    marginLeft: '15px',
    whiteSpace: 'nowrap',
  },
  red: {
    color: '#2077ff',
  },
};

