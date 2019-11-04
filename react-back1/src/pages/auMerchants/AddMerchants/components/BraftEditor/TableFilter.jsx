/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select, DatePicker, Search, Button, Icon, Upload, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import moment from 'moment';
import IceContainer from '@icedesign/container';
import nw from '../../../../../common/http/post';
// import {formatImgUrl} from '../../../../../common/js/filter'
import { formatImgUrl, uploadImg } from '../../../../../common/js/common';
// import fn from '../../../../../js/util.js';//外部公用文件

const { Row, Col } = Grid;
const { RangePicker } = DatePicker;

// const onChange = (value,res, file) => console.log(value,res, file);

// 请求
const onChange = (value, res, file) => {
  // console.log(value)
//  nw.post('https://image.ddybw.com/upload_image',{imageType:"avatar",file:value},function (res) {

//   })
};
const onOk = (value) => console.log('onOK:', value.format('YYYY-MM-DD HH:mm:ss'));
const onRangeOk = (value) => console.log('onOk: [%s, %s]', value[0].format('YYYY-MM-DD HH:mm:ss'), value[1].format('YYYY-MM-DD HH:mm:ss'));
// function beforeUpload(info) {
//   nw.post('https://image.ddybw.com/upload_image',{imageType:"avatar",file:info},function (res) {

//   })
// }

function onPreview(info) {
  console.log('onPreview callback : ', info);
}

function onSuccess(res, file) {
  console.log('onSuccess callback : ', res, file);
}

function onError(file) {
  // console.log('onError callback : ', file);
}


const defaultTimeValue = moment('09:00:00', 'HH:mm:ss', true);
export default class Filter extends Component {
  static displayName = 'Filter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        companyAddress: '', // 公司地址
        companyTel: '', // 公司负责人电话
        email: '', // 联系邮箱
      },
      businessLicenseImg: '', // 营业执照图片
      bankLicenseImg: '', // 银行许可证图片
      pFrontImg: '', // 负责人正面身份证图片
      pBackImg: '', // 负责人反面身份证图片
      lFrontImg: '', // 法定代表身份证正面
      lBackImg: '', // 法定代表身份证反面图片
    };
  }

  formChange = (value) => {
    // console.log('value', value);
    this.setState({
      value,
    });
  };

  handleEnterKey = (e) => {
    if (e.nativeEvent.keyCode === 13 && this.state.value.pageName) { // e.nativeEvent获取原生的事件对像
      this.props.query(this.state.value.pageName);
    }
    // this.props.query(this.state.value.pageName);
  }

  onBlur = (e) => {
    if (this.state.value.pageName) {
      this.props.query(this.state.value.pageName);
    }
  }

add = (e, data) => {
  const obj = {};
  if (data) {
    obj.uuid = data.uuid;
  } else {
    Message.error('请先输入正确的用户名核对用户电话等信息');
  }
  if (!/^1(3|4|5|7|8)\d{9}$/.test(this.state.value.companyTel)) {
    Message.error('请输入正确的电话号码');
    return;
  }
  if (!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.state.value.email)) {
    Message.error('请输入正确的邮箱地址');
    return;
  }
  obj.companyAddress = this.state.value.companyAddress;
  obj.companyTel = this.state.value.companyTel;
  obj.email = this.state.value.email;
  obj.businessLicenseImg = this.state.businessLicenseImg;
  obj.bankLicenseImg = this.state.bankLicenseImg;
  obj.pFrontImg = this.state.pFrontImg;
  obj.pBackImg = this.state.pBackImg;
  obj.lFrontImg = this.state.lFrontImg;
  obj.lBackImg = this.state.lBackImg;

  if (obj.companyAddress == '' || obj.companyTel == '' || obj.email == '' || obj.businessLicenseImg == '' || obj.bankLicenseImg == '' || obj.pFrontImg == '' || obj.pBackImg == '' || obj.lFrontImg == '' || obj.lBackImg == '') {
    Message.error('请将信息填写完整后再提交');
  } else {
    this.props.submit(obj);
  }
}


img1(value) {
  if (value == '') {
    this.setState({
      businessLicenseImg: '',
    });
  }
}
img2(value) {
  if (value == '') {
    this.setState({
      bankLicenseImg: '',
    });
  }
}
img3(value) {
  if (value == '') {
    this.setState({
      pFrontImg: '',
    });
  }
}
img4(value) {
  if (value == '') {
    this.setState({
      pBackImg: '',
    });
  }
}
img5(value) {
  if (value == '') {
    this.setState({
      lFrontImg: '',
    });
  }
}
img6(value) {
  if (value == '') {
    this.setState({
      lBackImg: '',
    });
  }
}
// const postUrlData =(param) => {
//   return nw.post('/',param,function (res) {})
// }
  // 企业营业执照副本：
  beforeUpload1 = (info) => {
    const thiz = this;
    const data = { imageType: 'avatar', file: info };
    nw.post(uploadImg(), data, (res) => {
      if (res.errorCode == 0) {
        thiz.setState({
          businessLicenseImg: res.data.url,
        });
      }
    });
  }
  // 银行开户许可证：
  beforeUpload2 = (info) => {
    const thiz = this;
    const data = { imageType: 'avatar', file: info };
    nw.post(uploadImg(), data, (res) => {
      if (res.errorCode == 0) {
        thiz.setState({
          bankLicenseImg: res.data.url,
        });
      }
    });
  }
  // 负责人正面身份证图片
  beforeUpload3 = (info) => {
    const thiz = this;
    const data = { imageType: 'avatar', file: info };
    nw.post(uploadImg(), data, (res) => {
      if (res.errorCode == 0) {
        thiz.setState({
          pFrontImg: res.data.url,
        });
      }
    });
  }
  // 负责人反面身份证图片
  beforeUpload4 = (info) => {
    const thiz = this;
    const data = { imageType: 'avatar', file: info };
    nw.post(uploadImg(), data, (res) => {
      if (res.errorCode == 0) {
        thiz.setState({
          pBackImg: res.data.url,
        });
      }
    });
  }
  // 法定代表身份证正面
  beforeUpload5 = (info) => {
    const thiz = this;
    const data = { imageType: 'avatar', file: info };
    nw.post(uploadImg(), data, (res) => {
      if (res.errorCode == 0) {
        thiz.setState({
          lFrontImg: res.data.url,
        });
      }
    });
  }
  // 法定代表身份证背面
  beforeUpload6 = (info) => {
    const thiz = this;
    const data = { imageType: 'avatar', file: info };
    nw.post(uploadImg(), data, (res) => {
      if (res.errorCode == 0) {
        thiz.setState({
          lBackImg: res.data.url,
        });
      }
    });
  }
  goBefore =() => {
    window.history.go(-1);
  }
  render() {
    console.log(this.state.businessLicenseImg);
    let img = [];
    let img1 = [];
    let img2 = [];
    let img3 = [];
    let img4 = [];
    let img5 = [];
    if (this.state.businessLicenseImg != '') {
      console.log(formatImgUrl(this.state.businessLicenseImg));
      img = [
        {
          name: '企业营业执照副本.png',
          state: 'done',
          imgURL: formatImgUrl(this.state.businessLicenseImg),
        },
      ];
    }
    if (this.state.bankLicenseImg != '') {
      img1 = [
        {
          name: '银行开户许可证.png',
          state: 'done',
          imgURL: formatImgUrl(this.state.bankLicenseImg),
        },
      ];
    }
    if (this.state.pFrontImg != '') {
      img2 = [
        {
          name: '人正面身份证图片.png',
          state: 'done',
          imgURL: formatImgUrl(this.state.pFrontImg),
        },
      ];
    }
    if (this.state.pBackImg != '') {
      img3 = [
        {
          name: '反面身份证图片.png',
          state: 'done',
          imgURL: formatImgUrl(this.state.pBackImg),
        },
      ];
    }
    if (this.state.lFrontImg != '') {
      img4 = [
        {
          name: '法定代表身份证正面.png',
          state: 'done',
          imgURL: formatImgUrl(this.state.lFrontImg),
        },
      ];
    }
    if (this.state.lBackImg != '') {
      img5 = [
        {
          name: '法定代表身份证背面.png',
          state: 'done',
          imgURL: formatImgUrl(this.state.lBackImg),
        },
      ];
    }
    console.log(img);
    console.log(this.props.user);
    const user = this.props.user;
    return (
      <IceContainer >
        {/* {/* <Button type="primary" style={styles.fr} onClick={this.goBefore} >
          返回
        </Button> */}
        <IceContainer title="添加商户">
          <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户名：</span>
              <IceFormBinder name="pageName">
                <Input placeholder="填写用户名,Enter键查询" size="large" onKeyPress={this.handleEnterKey} onBlur={this.onBlur} />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="pageName" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户手机号：</span>
              {/* <IceFormBinder triggerType="onBlur" name="pageName"> */}
              <Input placeholder="" value={user == null ? '' : user.mobile} size="large" disabled />
              {/* </IceFormBinder> */}
              {/* <div style={styles.formError}>
                <IceFormError name="pageName" />
              </div> */}
            </div>
          </Col>
          {/* <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>账号等级：</span>
              <IceFormBinder triggerType="onBlur" name="eventId">
                <Input placeholder="" value={user==null?'':user.account} size="large" disabled/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="eventId" />
              </div>
            </div>
          </Col> */}
          {/* <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>审核状态：</span>
              <IceFormBinder triggerType="onBlur" name="type">
                <Select size="large" style={{ width: '200px' }}>
                  <Select.Option value="1">已审核</Select.Option>
                  <Select.Option value="2">未审核</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="type" />
              </div>
            </div>
          </Col> */}
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>企业地址：</span>
              <IceFormBinder triggerType="onBlur" name="companyAddress">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="companyAddress" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>店铺负责人电话：</span>
              <IceFormBinder triggerType="onBlur" name="companyTel">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="companyTel" />
              </div>
            </div>
          </Col>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>联系邮箱：</span>
              <IceFormBinder triggerType="onBlur" name="email">
                <Input placeholder="" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="email" />
              </div>
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>企业营业执照副本：</span>
              <Upload.Card
                name="avatar"
                listType="card"
                action=""
                accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                beforeUpload={this.beforeUpload1}
                onSuccess={onSuccess}
                onError={onError}
                limit={1}
                value={img}
                onChange={this.img1.bind(this)}
              />
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>银行开户许可证：</span>
              <Upload.Card
                listType="card"
                action=""
                accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                beforeUpload={this.beforeUpload2}
                onChange={onChange}
                onSuccess={onSuccess}
                onError={onError}
                limit={1}
                value={img1}
                onChange={this.img2.bind(this)}
              />
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>店铺负责人身份证（正面）：</span>
              <Upload.Card
                name="avatar"
                listType="card"
                action=""
                accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                beforeUpload={this.beforeUpload3}
                onChange={onChange}
                onSuccess={onSuccess}
                onError={onError}
                limit={1}
                value={img2}
                onChange={this.img3.bind(this)}
              />
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>店铺负责人身份证（反面）：</span>
              <Upload.Card
                name="avatar"
                listType="card"
                action=""
                accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                beforeUpload={this.beforeUpload4}
                onChange={onChange}
                onSuccess={onSuccess}
                onError={onError}
                limit={1}
                value={img3}
                onChange={this.img4.bind(this)}
              />
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>法定代表身份证（正面）：</span>
              <Upload.Card
                name="avatar"
                listType="card"
                action=""
                accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                beforeUpload={this.beforeUpload5}
                onChange={onChange}
                onSuccess={onSuccess}
                onError={onError}
                limit={1}
                value={img4}
                onChange={this.img5.bind(this)}
              />
            </div>
          </Col>
          <Col l="12">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>法定代表身份证（反面）：</span>
              <Upload.Card
                name="avatar"
                listType="card"
                action=""
                accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                beforeUpload={this.beforeUpload6}
                onChange={onChange}
                onSuccess={onSuccess}
                onError={onError}
                limit={1}
                value={img5}
                onChange={this.img6.bind(this)}
              />
            </div>
          </Col>

          <Col l="24">
            <div style={styles.formItem}>
              <Button type="primary" style={styles.button} onClick={e => this.add(e, user)}>
                确认添加
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
    width: '500px',
  },
  formLabel: {
    minWidth: '180px',
  },
  fr: {
    float: 'right',
  },
};
