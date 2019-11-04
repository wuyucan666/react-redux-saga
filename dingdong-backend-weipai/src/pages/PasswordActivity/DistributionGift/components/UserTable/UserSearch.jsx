/* eslint-disable react/no-unused-state, no-plusplus */
import React, { useState, useRef, useEffect } from 'react';
import { Table, Switch, Balloon, Button, Grid, Pagination, Input, Message, Field, DatePicker, Upload } from '@alifd/next';
import IceContainer from '@icedesign/container';
import Zmage from 'react-zmage';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Link } from 'react-router-dom';
import { removeArray, Debounce, uploadImg, formatImgUrl } from '../../../../../common/js/common';
import { AuctionListType, auditStatus, imgUrl, ShootType, ShootCreateType, ShootChannel, renderTime } from '../../../../../common/js/filter';
import nw from '../../../../../common/http/post';

const { Row, Col } = Grid;
const { RangePicker } = DatePicker;
function onPreview(info) {
  // console.log('onPreview callback : ', info);
}

function onChange(info) {
  // console.log('onChange callback : ', info);
}

function onSuccess(res, file) {
  // console.log('onSuccess callback : ', res, file);
}

function onError(file) {
  // console.log('onError callback : ', file);
}
export function Forms(props) {
  useEffect(() => {
  }, [props.arr]);

  // const [num,setNum] = useState(0);

  const onchange = (obj, val) => {
    console.log(obj, val, props.arr);
    obj.val.name = val;
    props.setArr(props.arr);
  };

  const onChange1 = (obj, val) => {
    obj.val.total = val;
    props.setArr(props.arr);
  };

  const InputName = (a, b, val) => {
    return (
      <Input onChange={onchange.bind(this, { val, b })} placeholder="请输入礼品名称" />
    );
  };

  const renderInput = (a, b, val) => {
    return (
      <Input onChange={onChange1.bind(this, { val, b })} placeholder="请输入发放数量" maxLength={10} htmlType="number" />
    );
  };

  // 点击上传事件
  const beforeUplooad = (record, idx, info) => {
    console.log('每一行：', record, idx, info);

    const data = { imageType: 'avatar', file: info };
    const obj = {};
    const arr = [];
    nw.post(uploadImg(), data, res => {
      if (res.errorCode == 0) {
        // console.log(res.data);
        obj.url = formatImgUrl(res.data.url);
        obj.mid = res.data.mid;
        arr.push(obj);
        const copy = Object.assign([], arr);
        const concatArr = props.imgArr.concat(copy);
        props.setImgArr(concatArr);
        record.thumb = concatArr;
      }
    });
  };
  const up = (info) => {
    console.log(info);
  };
  // 删除图片事件
  const remove = v => {
    console.log(v, props.imgArr);
    // console.log(props.imgArr.findIndex(item => item.mid === v.mid));
    props.imgArr.splice(props.imgArr.findIndex(item => item.mid === v.mid), 1);
    const newimgs = Object.assign([], props.imgArr);
    props.setImgArr(newimgs);
  };

  const renderThumb = (v, idx, record) => {
    return (
      <div>
        <Upload.Card
          listType="card"
          action=""
          key={idx}
          accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
          beforeUpload={beforeUplooad.bind(this, record, idx)}
          onSuccess={onSuccess}
          // onCancel={onCancel}
          onError={onError}
          value={props.imgArr}
          limit={2}
          onRemove={(v) => { remove(v); }}
        />
      </div>
    );
  };

  const handle = (v) => {
    const date = new Date(v).getTime() / 1000;
    // console.log(date, props.arr);
    props.setObj({ expire: date });
  };

  if (props.arr.length != 0) {
    return (
      <div>
        <div style={styles.formItem} >
          <Table dataSource={props.arr}>
            <Table.Column title="礼品名称" dataIndex="name" cell={InputName} />
            <Table.Column title="礼品总数量" dataIndex="total" cell={renderInput} />
            <Table.Column title="奖品图片" dataIndex="thumb" cell={renderThumb} />
            <Table.Column title="操作" cell={props.renderOper} />
          </Table>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <Row wrap gutter="20" style={styles.formRow}>
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>领取截止时间：</span>
                <DatePicker format="YYYY-M-D" onChange={handle} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
  return '';
}


export default function UserTable(props) {
  const [value, setValue] = useState({});
  const [arr, setArr] = useState([]);
  const [val, setval] = useState(0);
  const [info, setInfo] = useState({});
  // const [Boole,setBoole] = useState(true)
  const [obj, setObj] = useState({});
  const [imgArr, setImgArr] = useState([]);

  useEffect(() => {
    let obj = {};
    if (window.location.href.split('?').length <= 1) {

    } else {
      obj = {
        mobile: window.location.href.split('mobile=')[1].split('&')[0],
        nickname: decodeURI(window.location.href.split('nickname=')[1].split('&')[0]),
        uuid: window.location.href.split('&')[2].split('=')[1],
        realname: decodeURI(window.location.href.split('&')[3].split('=')[1]),
      };
    }
    setInfo(obj);
  }, []);

  const renderOper = (value, index, record) => {
    return (<div>
      <Button type="primary" style={styles.button} onClick={deleteUser.bind(this, record)} >
        删除
      </Button>
    </div>);
  };

  const deleteUser = (val) => {
    const newArr = Object.assign([], arr);
    console.log(newArr);
    const arr2 = removeArray(newArr, val);
    // console.log(arr2);
    setArr(arr2);
  };
  // 添加活动礼品
  const add = () => {
    const newArr = Object.assign([], arr);
    newArr.push({
      type: 1,
      name: '',
      total: '',
      id: newArr.length,
      thumb: [],
    });
    console.log('add', newArr);
    setArr(newArr);
  };
  // 发放礼品
  const save = () => {
    console.log('imgArr', imgArr, 'arr:', arr);
    let eachcount = 0;
    let Boole = true;
    arr.forEach(v => {
      console.log(v.total);
      eachcount++;
      if (v.total > 100000000000 || v.total == 0 || v.name == '' || v.total == '' || !v.total || !obj.expire || imgArr.length == 0) {
        Message.error('请填写正确的信息');
        Boole = false;
      }
    });

    if (eachcount >= arr.length && arr.length != 0) {
      if (Boole) {
        const sendData = Object.assign([], arr);
        sendData.forEach(element => {
          delete element.id;
        });
        // console.log(JSON.stringify(sendData), obj);
        props.add(JSON.stringify(sendData), obj);
      }
    }

    if (arr.length == 0) {
      Message.error('请添加发放礼品');
    }
  };

  return (
    <div>
      <IceContainer title="发放礼品(用户信息)">
        <Row wrap gutter="20" style={styles.formRow}>
          {/* <Col l="24">
          <div style={styles.formItem}>
            <span style={styles.formLabel}>用户ID：</span>
            {info.uuid}
          </div>
        </Col> */}
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户姓名：</span>
              {info.realname}
            </div>
          </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户昵称：</span>
              {info.nickname}
            </div>
          </Col>
        </Row>
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户账号：</span>
              {info.mobile}
            </div>
          </Col>
        </Row>
        <Forms
          arr={arr}
          renderOper={renderOper}
          imgArr={imgArr}
          setArr={(o) => setArr(o)}
          setImgArr={(o) => setImgArr(o)}
          setObj={(o) => setObj(o)}
        />
        <Row wrap gutter="20" style={styles.formRow}>
          <Button type="primary" onClick={e => add()} style={styles.button}>
              添加活动礼品
          </Button>
          <Button type="primary" onClick={e => save()} style={styles.ml10}>
              发放礼品
          </Button>
        </Row>
      </IceContainer>
    </div>
  );
}


const styles = {
  link: {
    marginRight: '10px',
  },
  headRow: {
    marginBottom: '10px',
  },
  icon: {
    color: '#2c72ee',
    cursor: 'pointer',
  },
  deleteIcon: {
    marginLeft: '20px',
  },
  center: {
    textAlign: 'right',
  },
  button: {
    borderRadius: '4px',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'center',
  },
  buttonRow: {
    marginTop: '10px',
    float: 'right',
  },
  link: {
    display: 'block',
  },
  formItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  ml10: {
    marginLeft: '10px',
  },
  inputfile: {
    opacity: 0,
  },
};
