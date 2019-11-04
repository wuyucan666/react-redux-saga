import Container from '@icedesign/container';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DataOverview extends Component {
  state = {
    // dataSource: [
    //   {
    //     icon: require('./images/icon4.png'),
    //     title: '今日订单总数',
    //     total: '300',
    //     url:'/financialManagement/UserPipelineQuery',
    //   },
    //   {
    //     icon: require('./images/icon6.png'),
    //     title: '服务费总金额',
    //     total: '20',
    //   },
    //   {
    //     icon: require('./images/icon3.png'),
    //     title: '用户总数',
    //     total: '89万',
    //   },
    //   {
    //     icon: require('./images/icon2.png'),
    //     title: '商家总数',
    //     total: '80',
    //   },
    // ],
  };

  render() {
    // return (
    //   <Container style={styles.container} >
    //     {this.state.dataSource.map((data, index) => {
    //       return (
    //         <div key={index} style={styles.overviewItem}>
    //           <Link target="_blank" style={styles.link}   to="/financialManagement/UserPipelineQuery">
    //           <div style={styles.overviewItemIcon}>
    //             <img alt={data.title} src={data.icon} style={{ width: 70 }} />
    //           </div>
    //           </Link>
    //           <div
    //             style={{
    //               paddingLeft: 10,
    //               display: 'flex',
    //               justifyContent: 'center',
    //               flexDirection: 'column',
    //             }}
    //           >
    //             <div style={styles.overviewItemTitle}>{data.title}</div>
    //             <div style={styles.overviewItemTotal}>{data.total}</div>
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </Container>
    // );
    return (
      <Container style={styles.container} >
          <div style={styles.overviewItem}>
            <Link target="_blank" style={styles.link}   to="/orderManagement/AuOrder">
            <div style={styles.overviewItemIcon}>
              <img src="./images/icon4.png" style={{ width: 70 }} />
            </div>
           
            <div
              style={{
                paddingLeft: 10,
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <div style={styles.overviewItemTitle}>今日订单总数</div>
              <div style={styles.overviewItemTotal}>300</div>
            </div>
            </Link>
          </div>
          <div  style={styles.overviewItem}>
            <Link target="_blank" style={styles.link}   to="/orderManagement/AuOrder">
            <div style={styles.overviewItemIcon}>
              <img  src="./images/icon6.png" style={{ width: 70 }} />
            </div>
            
            <div
              style={{
                paddingLeft: 10,
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <div style={styles.overviewItemTitle}>服务费总金额</div>
              <div style={styles.overviewItemTotal}>200</div>
            </div>
            </Link>
          </div>
          <div  style={styles.overviewItem}>
            <Link target="_blank" style={styles.link}   to="/auUser/UserList">
            <div style={styles.overviewItemIcon}>
              <img  src="./images/icon3.png" style={{ width: 70 }} />
            </div> 
            <div
              style={{
                paddingLeft: 10,
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <div style={styles.overviewItemTitle}>用户总数</div>
              <div style={styles.overviewItemTotal}>500</div>
            </div>
            </Link>
          </div>
          <div  style={styles.overviewItem}>
            <Link target="_blank" style={styles.link}   to="/auMerchants/MerchantsList">
            <div style={styles.overviewItemIcon}>
              <img src="./images/icon2.png"  style={{ width: 70 }}/>
            </div> 
            <div  
              style={{
                paddingLeft: 10,
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <div style={styles.overviewItemTitle}>商家总数</div>
              <div style={styles.overviewItemTotal}>234</div>  
            </div>
            </Link>

          </div>
      </Container>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  overviewItem: {
    flex: '0 0 25%',
    display: 'flex',
    padding: '10px 0',
  },
  overviewItemTitle: {
    fontSize: 12,
    lineHeight: '20px',
    color: '#999',
  },
  overviewItemTotal: {
    fontSize: 24,
    lineHeight: '30px',
    color: '#333',
  },
  overviewItemIcon:{
    float:'left'
  }
};

export default DataOverview;
