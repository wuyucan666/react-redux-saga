/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Step, Table, Button, Balloon } from '@alifd/next';

// import moment from 'moment';
import IceContainer from '@icedesign/container';
import { renderTime, renderAmount, snPayType, imgUrl, orderSituation, orderType, evaluationLevel } from '../../../../../common/js/filter';

export default class Filter extends Component {
  static displayName = 'Filter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
    };
  }

  goBefore = () => {
    window.history.go(-1);
  }

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  renderUserRating = (value, index, record) => {
    const defaultTrigger = <span style={{ color: '#0066CC', cursor: 'pointer' }}>{evaluationLevel(record.buyerEvaluatePoint)}</span>;
    return (
      <div>
        <Balloon trigger={defaultTrigger} closable={false} align="br">
          <span>评价内容：{record.buyerEvaluateContent}</span>
        </Balloon>
      </div>
    );
  };

  renderMerchantRating = (value, index, record) => {
    const defaultTrigger = <span style={{ color: '#0066CC', cursor: 'pointer' }}>{evaluationLevel(record.sellerEvaluatePoint)}</span>;
    return (
      <div>
        <Balloon trigger={defaultTrigger} closable={false} align="br">
          <span>评价内容：{record.sellerEvaluateContent}</span>
        </Balloon>
      </div>
    );
  }

  renderYouHui = (value, index, record) => {
    return `${(record.businessCouponAmount * 1 + record.commonCouponAmount * 1) / 100}元`;
  }

  render() {
    const { info, order } = this.props;
    (order.auorderDetail && order.orderAuco && order.orderAuco[0]) && (order.auorderDetail.type = order.orderAuco[0].type);

    console.log(order);
    const status = orderSituation(order.auorderDetail.status);
    const productRender = (val) => {
      if (val !== undefined) {
        const url = imgUrl(val);
        // console.log(val,url);
        return <img src={url} className="media-side" width={80} />;
      }
    };
    const source = (val) => {
      if (!val) return '暂无';
    };
    const discountWay = (list) => {
      const lists = list || [];
      let content = '';
      for (let i = 0; i < lists.length; i++) {
        content += `${lists[i].name}:减${renderAmount(lists[i].value)}\n`;
      }
      return (
        <div>
          <pre>{content}</pre>
        </div>
      );
    };


    return (

      <IceContainer title="订单详情">
        {/* <Button type="primary" style={styles.fr} onClick={this.goBefore} >
        返回
      </Button> */}
        <IceContainer title="订单详情">
          <Step current={Number(order.auorderDetail.status)} >
            <Step.Item title="买家拍下藏品" />
            <Step.Item title="买家付款到叮咚" />
            <Step.Item title="卖家发货" />
            <Step.Item title="买家确认收货" />
            <Step.Item title="双方评价" />
          </Step>
          <div style={styles.Group}>.
            <div style={styles.Item}>{order.auorderDetail.created == '0' ? '' : renderTime(order.auorderDetail.created)}</div>
            <div style={styles.Item}>{order.auorderDetail.paymentTime == '0' ? '' : renderTime(order.auorderDetail.payTime)}</div>
            <div style={styles.Item}>{order.auorderDetail.deliveryTime == '0' ? '' : renderTime(order.auorderDetail.shipTime)}</div>
            <div style={styles.Item}>{order.auorderDetail.completeTime == '0' ? '' : renderTime(order.auorderDetail.confirmTime)}</div>
            <div style={styles.Item}>{order.auorderDetail.finishTime == '0' ? '' : renderTime(order.auorderDetail.finishTime)}</div>
          </div>
        </IceContainer>
        <IceContainer title={`当前订单状态:${status}`} />
        <IceContainer title="基本信息">
          <Table
            dataSource={[order.auorderDetail]}
          >
            <Table.Column title="支付方式" dataIndex="payType" cell={snPayType} width={100} />
            <Table.Column title="订单编号" dataIndex="orderSn" width={100} />
            <Table.Column title="发货单流水号" dataIndex="trackingNo" width={100} />
            {/* <Table.Column title="订单来源" dataIndex="reqSource" width={100} /> */}
            <Table.Column title="订单来源" dataIndex="reqSource" cell={source} width={100} />
            <Table.Column title="订单类型" dataIndex="orderType" cell={orderType} width={100} />
            <Table.Column title="拍品类型" dataIndex="type" width={100} />
          </Table>
          <Table
            dataSource={[order.auorderDetail]}
          >
            <Table.Column title="商品总金额" dataIndex="cAmount" cell={renderAmount} width={100} />
            <Table.Column title="服务费总额" dataIndex="servicePrice" cell={renderAmount} width={100} />
            <Table.Column title="优惠总额" dataIndex="discountValue" cell={this.renderYouHui} width={100} />
            <Table.Column title="优惠方式" dataIndex="discountValue" cell={discountWay(order.auorderDetail.discountList)} width={100} />
            <Table.Column title="实际支付金额" dataIndex="payAmount" cell={renderAmount} width={100} />
            <Table.Column title="配送方式" dataIndex="express" width={100} />
          </Table>
        </IceContainer>
        <IceContainer title="拍品信息">
          {
          order.orderAuco && order.orderAuco.map((items, index) => (
            <Table
              dataSource={[items]}
              key={index}
              // rowSelection={{ onChange: this.onChange }}
            >
              <Table.Column title="商品图片" dataIndex="thumb" cell={productRender} width={100} />
              <Table.Column title="商品名称" dataIndex="name" width={100} />
              <Table.Column title="品相" dataIndex="quality" width={100} />
              <Table.Column title="成交价" dataIndex="winPrice" cell={renderAmount} width={100} />
              <Table.Column title="用户服务费" dataIndex="buyerServFee" width={100} cell={renderAmount} />
              <Table.Column title="送拍人服务费" dataIndex="senderServRate" width={100} cell={renderAmount} />
              <Table.Column title="制作费" dataIndex="productionFee" width={100} cell={renderAmount} />
              <Table.Column title="用户评价等级" dataIndex="buyerEvaluatePoint" width={100} cell={this.renderUserRating} />
              <Table.Column title="商家评价等级" dataIndex="" width={100} cell={this.renderMerchantRating} />
              {/* <Table.Column title="拍品类型" dataIndex="type" width={100} />
              <Table.Column title="拍场名称" dataIndex="aName" width={100} />
              <Table.Column title="服务费" dataIndex="buyerServFee" cell={renderAmount} width={100} /> */}
            </Table>
          ))
        }
        </IceContainer>
        <IceContainer title="地址信息">
          <Table
            dataSource={order.address ? [order.address] : []}
          >
            <Table.Column title="收货人" dataIndex="contacts" width={100} />
            <Table.Column title="手机号码" dataIndex="mobile" width={100} />
            <Table.Column title="邮政编码" dataIndex="postCode" width={100} />
            <Table.Column title="收获地址" dataIndex="address" width={100} />
          </Table>
        </IceContainer>
      </IceContainer>
    );
  }
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
  formRow: {
    padding: '10px 20px',
  },
  formItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  formLabel: {
    minWidth: '180px',
  },
  img: {
    width: '180px',
    height: '180px',
  },
  button: {
    marginRight: '10px',
  },
  mt10: {
    marginTop: '10px',
  },
  Item: {
    width: '20%',
  },
  attachPics: {
    width: '80px',
    height: '80px',
    border: '1px solid #eee',
    marginRight: '10px',
  },
  Group: {
    display: 'flex',
    flexwrap: 'nowrap',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  Ml: {
    marginLeft: '30px',
  },
  fr: {
    float: 'right',
  },
};
