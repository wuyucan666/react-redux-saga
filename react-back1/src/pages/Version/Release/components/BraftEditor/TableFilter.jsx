/* eslint react/no-string-refs:0 */
import React, { useState,useRef,useEffect } from 'react';
import { Grid, Input, Select, DatePicker,Search,Button,Icon ,Radio,Upload,RadioForm, Form,Checkbox,Dialog } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import moment from 'moment';
import IceContainer from '@icedesign/container';
import {formatImgUrl,uploadImg} from '../../../../../common/js/common'
import nw from '../../../../../common/http/post'
// import {timeForMat} from '../../../../../common/js/common'
const { Row, Col } = Grid;
const { RangePicker } = DatePicker;
const { Group: RadioGroup } = Radio;
import { Message } from '@alifd/next';
export default function Filter(props){
  const [value, setValue] = useState({});
  const [date, setDate] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const ref = useRef('form')
  const condition = () => {
    if( value == '' || value.source =='' || value.version =='' || value.force_update =='' || value.tips =='' || value.contents =='' || value.is_reinstall =='' || value.old_version =='' 
    ||value.source ==undefined || value.version ==undefined || value.force_update ==undefined || value.tips ==undefined || value.contents ==undefined || value.is_reinstall ==undefined || value.old_version ==undefined){
      Message.error('请完善信息后提交')
    }
    else{ 
      Dialog.confirm({
      title: '提示',
      content: '确认发布此版本?',
      onOk:() => {
        props.handleLists(value)
        setValue(value)
      },
    });
    }
    
  }

  const formChange = (value) => {
    if( value == '' || value.source =='' || value.version =='' || value.force_update =='' || value.tips =='' || value.contents =='' || value.is_reinstall =='' || value.old_version =='' 
    ||value.source ==undefined || value.version ==undefined || value.force_update ==undefined || value.tips ==undefined || value.contents ==undefined || value.is_reinstall ==undefined || value.old_version ==undefined){
    }else{
        setButtonDisabled(false)
    }
  };

  const upload = (info)=>{
    if(info.length == 0){
      const Newval1 = {
        ...value,
        app_url:''
      }
      setValue(Newval1)
    }
    
  }

  
  //上传版本：
  const beforeUpload = (info)=> {
    let data = {pid:20803,file:info }
    nw.post('/',data,function (res) {
      if(res.errorCode == 0){
        const Newval = {
          ...value,
          app_url:res.data.path
        }
        setValue(Newval)
      } 
    })
  }
    return (
      <IceContainer title="">
      <IceFormBinderWrapper
         value={value}
         ref={ref}
         onChange={formChange}
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>应用发布渠道：</span>
              <IceFormBinder triggerType="onBlur" name="source" >
                  <RadioGroup name="gender" >
                  <Radio value="2">IOS</Radio>
                  <Radio value="1">安卓</Radio>
                </RadioGroup>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="source" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>是否强制更新：</span>
              <IceFormBinder triggerType="onBlur" name="force_update" >
                  <RadioGroup name="gender" >
                  <Radio value="1">是</Radio>
                  <Radio value="0">否</Radio>
                </RadioGroup>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="force_update" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>是否重新下载：</span>
              <IceFormBinder triggerType="onBlur" name="is_reinstall" >
                  <RadioGroup name="gender" >
                  <Radio value="1">是</Radio>
                  <Radio value="0">否</Radio>
                </RadioGroup>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="is_reinstall" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24" >
            <div style={styles.formItem} >
            <span style={styles.formLabel}>当前版本号：</span>
              <IceFormBinder triggerType="onBlur" name="old_version" >
                <Input placeholder="请输入当前版本号" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="old_version" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24" >
            <div style={styles.formItem} >
            <span style={styles.formLabel}>更新后版本号：</span>
              <IceFormBinder triggerType="onBlur" name="version" >
                <Input placeholder="请输入更新后版本号" size="large" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="version" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24" >
            <div style={styles.formItem} >
            <span style={styles.formLabel}>更新包地址：</span>
              <IceFormBinder triggerType="onBlur" name="update_package_url" >
                <Input placeholder="请输入更新包地址" size="large" style={styles.w300}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="update_package_url" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24" >
            <div style={styles.formItem} >
            <span style={styles.formLabel}>更新提示：</span>
              <IceFormBinder triggerType="onBlur" name="tips">
                <Input placeholder="请输入更新提示" size="large" maxLength={30} style={styles.w300}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="tips" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24" >
            <div style={styles.formItem} >
            <span style={styles.formLabel}>更新内容：</span>
              <IceFormBinder triggerType="onBlur" name="contents" >
              <Input.TextArea
                      placeholder="请输入更新内容"
                      rows={4}
                      required
                      name="reason"
                      maxLength={300}
                      style={styles.w300}
                    />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="contents" />
              </div>
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24" >
            <div style={styles.formItem} >
            <span style={styles.formLabel}>上传更新包：</span>
            <Upload
                  listType="text"
                  accept=".apk,.ipa,.rar"
                  beforeUpload={beforeUpload}
                  limit={1}
                  onChange={upload.bind(this)}
                >
                <Button type="primary" style={{margin: '0 0 10px'}}  disabled={buttonDisabled}>点击上传更新包</Button>
            </Upload>
            (应用内更新)
            </div>
          </Col>
          </Row>
          <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <Button type="primary" onClick={condition} style={styles.button}>
                确定
              </Button>
              {/* <Button type="primary" onClick={this.condition} style={styles.ml10}>
                导出数据
              </Button> */}
            </div>
          </Col>
          </Row>
      </IceFormBinderWrapper>
      </IceContainer>
    );
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
    minWidth: '100px',
  },
  w300:{
    width:'300px'
  }
};

