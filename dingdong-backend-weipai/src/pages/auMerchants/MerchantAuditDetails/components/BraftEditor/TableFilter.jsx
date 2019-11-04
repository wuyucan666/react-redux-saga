/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select, DatePicker,Search,Button,Icon ,Upload } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import moment from 'moment';
import IceContainer from '@icedesign/container';
import {renderCheckStatus,imgUrl} from '../../../../../common/js/filter'
import {formatImgUrl} from '../../../../../common/js/common'

const { Row, Col } = Grid;
const { RangePicker } = DatePicker;
const onChange = (value) => console.log(value);
const onOk = (value) => console.log('onOK:', value.format('YYYY-MM-DD HH:mm:ss'));
const onRangeOk = (value) => console.log('onOk: [%s, %s]', value[0].format('YYYY-MM-DD HH:mm:ss'), value[1].format('YYYY-MM-DD HH:mm:ss'));
function beforeUpload(info) {
  console.log('beforeUpload callback : ', info);
}

function onSuccess(res, file) {
  console.log('onSuccess callback : ', res, file);
}

function onError(file) {
  console.log('onError callback : ', file);
}


// const status = window.location.hash.split('&')[1].split('=')[1] == 1
// console.log(status)
const defaultTimeValue = moment('09:00:00', 'HH:mm:ss', true);
export default class Filter extends Component {
  static displayName = 'Filter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        button:false
      },
    };
  }

  // componentDidMount(){
  //   let status = window.location.hash.split('&')[1].split('=')[1] 
  //   console.log(status==0)
  // }

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  passOn =()=> {
    this.props.passOn()
  }

  turnDown =()=> {
    this.props.turnDown(this.state.value.text)
  }
  onChange= (val)=>{
    this.setState({
      value:{
        text:val,
      }
    });
  }
  render() {
    const {info} = this.props
    // console.log(this.props.status)
    return (
      <IceContainer>
        {/* {/* <Button type="primary" style={styles.fr} onClick={()=>{window.history.go(-1)}} >
          返回
        </Button> */} 
      <IceContainer title="商户信息审核" >
      <div style={styles.buttonfr}>
      {/* <Button type="primary" style={styles.fr} onClick={()=>{window.history.go(-1)}} >
        返回
      </Button> */}
      </div>
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户名：</span>
              <Input value={info.nickname==null?'':info.nickname} disabled />
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户手机号：</span>
              <Input value={info.tel==null?'':info.tel} disabled />
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>账号等级：</span>
              <Input value={info.level==null?'':info.level} disabled />
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>审核状态：</span>
              <Input value={info.status==null?'':renderCheckStatus(info.status)} disabled />
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>联系邮箱：</span>
              <Input value={info.email==null?'':info.email} disabled />
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>店铺负责人电话：</span>
              <Input value={info.companyTel==null?'':info.companyTel} disabled />
            </div>
          </Col>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>企业地址：</span>
              <Input style={styles.Address} value={info.companyAddress==null?'':info.companyAddress} disabled />
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>企业营业执照：</span>
              <div style={styles.dimg}>
              <img src={info.businessLicenseImg==null?"":formatImgUrl(info.businessLicenseImg)} alt="" style={styles.img}/>
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>银行开户许可证：</span>
              <div style={styles.dimg}>
              <img src={info.bankLicenseImg==null?"":formatImgUrl(info.bankLicenseImg)} alt="" style={styles.img}/>
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>店铺负责人身份证（正面）：</span>
              <div style={styles.dimg}>
              <img src={info.pFrontImg==null?'':formatImgUrl(info.pFrontImg)} alt="" style={styles.img}/>
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>店铺负责人身份证（反面）：</span>
              <div style={styles.dimg}>
              <img src={info.pBackImg==null?'':formatImgUrl(info.pBackImg)} alt="" style={styles.img}/>
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>法定代表身份证（正面）：</span>
              <div style={styles.dimg}>
              <img src={info.lFrontImg==null?'':formatImgUrl(info.lFrontImg)} alt="" style={styles.img}/>
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>法定代表身份证（反面）：</span>
              <div style={styles.dimg}>
              <img src={info.lBackImg==null?'':formatImgUrl(info.lBackImg)} alt="" style={styles.img}/>
              </div>
            </div>
          </Col>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>理由：</span>
              <Input.TextArea
                      style={styles.input}
                      value={info.reason}
                      rows={4}
                      required
                      name="keywords"
                      onChange={this.onChange.bind(this)}
                    />
            </div>
          </Col>
          <Col l="24">
            <div style={styles.formItem}>
              <Button type="primary"  style={styles.button} disabled={this.props.status}  onClick={this.passOn}>
                通过
              </Button>
              <Button type="primary" style={styles.button} disabled={this.props.status} onClick={this.turnDown}>
                驳回
              </Button>
            </div>
          </Col>

        </Row>
        
      </IceFormBinderWrapper>
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
  Address: {
    width: '400px',
  },
  dimg:{
    width:'150px',
    height:'150px',
    border:'1px solid #eee'
  },
  img:{
    width:'150px',
    height:'150px',
  },
  button:{
    marginRight:'10px'
  },
  fr: {
    float: 'right',
  }, 
  buttonfr:{
    width: '100%',
    height: '40px'
  }
};
