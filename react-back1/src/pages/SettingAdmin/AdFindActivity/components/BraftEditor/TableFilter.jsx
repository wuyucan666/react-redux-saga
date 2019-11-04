/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Dialog, Button, Upload, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import moment from 'moment';
import nw from '../../../../../common/http/post'
import { formatImgUrl, uploadImg } from '../../../../../common/js/common'
import IceContainer from '@icedesign/container';
// import {timeForMat} from '../../../../../common/js/common'
const { Row, Col } = Grid;

export default class Filter extends Component {
  static displayName = 'Filter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        activName: ''
      },
      settingVisible: false,
      adThumb: '',
      activName: '',
      adLink: '',
    };
  }

  // 图片上传
  beforeUpload1 = (info) => {
    let thiz = this;
    let data = { imageType: "avatar", file: info }
    nw.post(uploadImg(), data, function (res) {
      if (res.errorCode == 0) {
        thiz.setState({
          adThumb: res.data.url,
        });
      }
    })

    return false
  }

  componentDidMount() {
    if (window.location.hash.split('=')[1]) {
      this.setState({
        value: {
          status: window.location.hash.split('=')[1],
        }
      });
    }
  }

  // 查询
  condition = () => {
    this.props.handleListChange(this.state.value)
  }

  // 关闭添加弹框
  addClose = () => {
    this.setState({
      ...this.state,
      settingVisible: false,
    })
  }

  // 添加保存
  addCommit = () => {
    this.setState({
      ...this.state,
      settingVisible: false,
    })
    let img = [{ mid: '', url: this.state.adThumb }]
    let param = {
      activName: this.state.activName,
      adLink: this.state.adLink,
      adThumb: JSON.stringify(img)
    }
    this.props.AddAD(param)
  }

  // 移除图片
  onRemove = (e) => {
    if (e.imgURL) {
      this.setState({
        adThumb: ''
      })
    }
  }

  // 添加
  addAd = () => {
    this.setState({
      ...this.state,
      settingVisible: !this.state.settingVisible
    })
  }

  // 活动名称
  onChangeAddTitle = (activName) => {
    if (activName.length > 15) {
      Message.warning('最多只能输入15个字')
      return false
    }
    this.setState({
      ...this.state,
      activName
    })
  }

  // 活动链接
  onChangeAdLink = (adLink) => {
    this.setState({
      ...this.state,
      adLink
    })
  }

  render() {
    let img = []
    if (this.state.adThumb !== '') {
      img = [
        {
          name: '新增活动广告位.png',
          state: 'done',
          imgURL: formatImgUrl(this.state.adThumb)
        }
      ];
    } else {
      img = []
    }
    return (
      <IceContainer title="">
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <Row wrap gutter="20" style={styles.formRow}>
            <Col l="12">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>活动名称：</span>
                <IceFormBinder triggerType="onBlur" name="activName">
                  <Input placeholder="请输入" size="large" />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="activName" />
                </div>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <Button type="primary" onClick={this.condition} style={styles.button}>
                  查询
                </Button>
                <Button type="primary" onClick={this.addAd} style={styles.button}>
                  添加
                </Button>
              </div>
            </Col>
          </Row>
        </IceFormBinderWrapper>
        <Dialog
          title="添加活动广告"
          visible={this.state.settingVisible}
          onCancel={this.addClose}
          onClose={this.addClose}
          onOk={this.addCommit}
          okProps={{ children: '保存', }}
        >
          <div style={styles.widFixed}>
            <div style={styles.pbFixedFLex}>
              <span style={styles.formLabel}>活动名称：</span>
              <Input placeholder="请输入活动名称"
                value={this.state.activName}
                onChange={this.onChangeAddTitle}
              />
            </div>
            <div style={styles.pbFixedFLex}>
              <span style={styles.formLabel}>活动链接：</span>
              <Input placeholder="请输入活动链接"
                value={this.state.adLink}
                onChange={this.onChangeAdLink}
              />
            </div>
            <div style={styles.pbFixedFLex}>
              <span style={styles.formLabel}>图片：</span>
              <Upload.Card
                name="avatar"
                listType="card"
                action=""
                accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                beforeUpload={this.beforeUpload1}
                onRemove={this.onRemove}
                limit={1}
                value={img}
              />
            </div>
          </div>
        </Dialog>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    margin: '20px',
    padding: '0',
  },
  button: {
    margin: '0 10px'
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
    minWidth: '70px',
  },
  widFixed: {
    minWidth: '500px',
  },
  pbFixed: {
    paddingBottom: '15px',
  },
  pbFixedFLex: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '15px',
  },
  mrFixed: {
    marginRight: '15px'
  },
};
