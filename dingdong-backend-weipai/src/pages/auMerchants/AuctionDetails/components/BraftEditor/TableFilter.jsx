/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select, DatePicker, Search, Button, Icon, Upload, Table } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import moment from 'moment';
import IceContainer from '@icedesign/container';
import { renderAmount,imgUrl } from '../../../../../common/js/filter'
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

// let buttonDisabled = true

export default class Filter extends Component {
  static displayName = 'Filter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      buttonDisabled:true
    };
  }

  passOn = () => {
    this.props.passOn(this.state.value.text)
  }

  turnDown = () => {
    // console.log(this.state.value)
    this.props.turnDown(this.state.value.text)
  }
  componentWillMount() {
    const status = Number(window.location.hash.split('=')[2])
    console.log(status);
    if (status === 0) {
      // buttonDisabled = false
      this.setState({
        buttonDisabled:false
      });
    }
  }
  onChange= (val)=>{
    console.log(val)
    this.setState({
      value:{
        text:val
      }
    });
  }

  formChange = (value) => {
    console.log('value', this);
    this.setState({
      value,
    });
  };
  goBefore = () => {
    window.history.go(-1);
  }


  render() {
    const { info } = this.props
    if(info.auCoList==null ){
      info.auCoList=[]
    }
    const HandleQuality = (val) => {
      val = JSON.parse(val)
      return (
        <div>{val.quality}</div>
      )
    }
    const productRender = (val) => {
      val = JSON.parse(val)
      return (
        <div>
        {
          val.map((items,index) => (
            <img key={index} src={imgUrl(items.url)} className="media" width={80} style={{margin:'3px'}} />
         ))
        }
     </div>
     )
    }
    const TextAreaShow = function (props) {
      // console.log(this,props.data.text)
      const status = Number(window.location.hash.split('=')[2])
      if(status==0){
        return (
          <Input.TextArea
                style={styles.input}
                placeholder="请输入原因"
                // value={props.data.text}
                rows={4}
                required 
                name="keywords"
                onChange={(val)=>{
                  // console.log(val);
                  props.setVal(val)
                }}
              />
        )
      }else{
        return (
              <Input.TextArea
                style={styles.input}
                placeholder="请输入原因"
                disabled
                value={props.info.reason==null?'':props.info.reason}
                rows={4}
                required 
                name="keywords"
                // onChange={this.onChange}
              />
        )
      }
    }
    // TextAreaShow.call(this)
    return (
      <IceContainer>
        {/* {/* <Button type="primary" style={styles.fr} onClick={this.goBefore} >
          返回
        </Button> */} 
        <IceContainer title="商户信息审核">
          <IceContainer title={info.name}>
          </IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <Row wrap gutter="20" style={styles.formRow}>
              <Col l="24">
                <div style={styles.formItem}>
                  <span style={styles.formLabel}>商家专场描述内容：</span>
                  <Input.TextArea disabled 
                  style={{width: 500}}
                  rows={8}
                  value={info.depict} />
                </div>
              </Col>
              <Col l="12">
                <div style={styles.formItem}>
                  <span style={styles.formLabel}>封面图：</span>
                  <div style={styles.dimg}>
                    <img src={imgUrl(info.thumb)} alt="" style={styles.img} />
                  </div>
                </div>
              </Col>
              <Col l="24">
                <Table
                  dataSource={info.auCoList}
                // rowSelection={{ onChange: this.onChange }}
                >
                  <Table.Column title="拍品名称" dataIndex="name" width={100} />
                  <Table.Column title="品相" dataIndex="tags" cell={HandleQuality} width={100} />
                  <Table.Column title="描述" dataIndex="depict"  />
                  <Table.Column title="起拍价" dataIndex="startPrice" cell={renderAmount} width={100} />
                  <Table.Column title="图片" dataIndex="imgs" cell={productRender} width={300} />
                </Table>
              </Col>
              {/* <Col l="24" style={styles.mt10}>
          <Table
          dataSource={info.auCoList}   style={styles.mt10}
          // rowSelection={{ onChange: this.onChange }}
          >
            <Table.Column title="拍品名称" dataIndex="id" width={100} />
            <Table.Column title="品相" dataIndex="name" width={100} />
            <Table.Column title="描述" dataIndex="university" width={100} />
            <Table.Column title="起拍价" dataIndex="college" width={100} />
            <Table.Column title="图片" dataIndex="class" width={600} />
          </Table>
          </Col> */}
              <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>理由：</span>
              {/* <Input.TextArea
                      style={styles.input}
                      placeholder="请输入原因"
                      // value={info.reason==null?'':info.reason}
                      rows={4}
                      required 
                      name="keywords"
                      onChange={this.onChange}
                    /> */}
                  <TextAreaShow info ={this.props.info} setVal={this.props.setVal} />  
            </div>
          </Col>
              <Col l="24">
                <div style={styles.formItem}>
                  <Button type="primary" disabled={this.state.buttonDisabled} style={styles.button} onClick={this.passOn}>
                    通过
              </Button>
                  <Button type="primary" disabled={this.state.buttonDisabled} style={styles.button} onClick={this.turnDown}>
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
  img: {
    width: '180px',
    height: '180px'
  },
  button: {
    marginRight: '10px'
  },
  mt10: {
    marginTop: '10px'
  },
  fr: {
    float: 'right'
  },
};
