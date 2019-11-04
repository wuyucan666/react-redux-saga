import React, {Component} from 'react';
import {Grid, Input, Button, Select, Dialog} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError
} from '@icedesign/form-binder';
import nw from '../../../../../common/http/post';
import {formatImgUrl, uploadImg} from '../../../../../common/js/common';
import IceContainer from '@icedesign/container';

const {Row, Col} = Grid;

export default class Filter extends Component {
  static displayName = 'Filter';
  static propType = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {

      },
      settingVisible: false, // 是否显示弹窗
    };
  };

  handleOnQuery = () => { // 查询
    this.props.handleListChange(this.state.value)
  };

  handleOnAdd = () => { // 添加
    window.location.href = '/#/setting/NoviceGuideEdit'
  };

  handleOnFormChange = (value) => { // 表单改变
    console.log(value)
  };

  handleOnCancelDialog = () => { // 取消
    this.setState({
      settingVisible: false
    })
  };

  handleOnCloseDialog = () => { // 关闭
    this.setState({
      settingVisible: false
    })
  };

  handleOnConform = () => { // 确认下架

  };

  render() {
    return(
      <IceContainer title="">
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.handleOnFormChange}
          ref="form"
        >
          <Row
            wrap
            gutter="20"
            style={styles.formRow}
          >
            <Col l="12">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>指引名称：</span>
                <IceFormBinder triggerType="onBlur" name="title">
                  <Input style={{ width: '300px' }} placeholder="请输入..." size="large" />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="title" />
                </div>
              </div>
            </Col>
            <Col l="12">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>指引状态：</span>
                <IceFormBinder triggerType="onBlur" name="status">
                  <Select size="large" style={{ width: '150px' }}>
                    <Select.Option value="">全部</Select.Option>
                    <Select.Option value="0">待发布</Select.Option>
                    <Select.Option value="1">已发布</Select.Option>
                    <Select.Option value="2">已下架</Select.Option>
                  </Select>
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="status" />
                </div>
              </div>
            </Col>
            <Col l="24">
              <div style={styles.formItem}>
                <Button type="primary" onClick={this.handleOnQuery} style={styles.button}>
                  查询
                </Button>
                <Button type="primary" onClick={this.handleOnAdd} style={styles.button}>
                  添加新手指引
                </Button>
              </div>
            </Col>
          </Row>
        </IceFormBinderWrapper>
      </IceContainer>
    )
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
  tips: {
    textAlign: 'center',
    width: '370px',
    margin: '0 auto',
    fontWeight: '600',
    lineHeight: '30px',
  },
  reasonWrapper: {
    padding: '40px 0 40px 15px',
    boxSizing: 'border-box',
    width: '400px',
    margin: '0 auto'
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

