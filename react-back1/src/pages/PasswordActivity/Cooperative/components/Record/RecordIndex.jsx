import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Message, Button, Tab, Collapse, Upload, Dialog } from '@alifd/next';

import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/PasswordActivity/reducer';
import * as RecordAction from '../../../../../redux/PasswordActivity/action';
import { GetQueryString } from '../../../../../common/js/filter';
import Zmage from 'react-zmage';
import {
  formatImgUrl,
  uploadImg,
  getToken,
  timestampToFormatDate,
} from '../../../../../common/js/common';
import nw from '../../../../../common/http/post';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const Panel = Collapse.Panel;

function onSuccess(res, file) {
  console.log('onSuccess callback : ', res, file);
}

function onError(file) {
  console.log('onError callback : ', file);
}
function onCancel(file) {
  console.log('onCancel callback : ', file);
}
class Index extends Component {
  static displayName = 'Index';
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      list: [],
      imgArr: [
        // {
        //   mid: '1',
        //   url: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
        // },
        // {
        //   mid: '2',
        //   url: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
        // },
      ],
      isMadal: false, // 上传弹窗
      isEdit: false,
      isload: false,
    };
  }

  componentDidMount() {
    const id = GetQueryString('id');

    nw.post('/', { id, pid: 21709 }, res => {
      if (res.errorCode == 0) {
        console.log(res.data.list);
        this.setState({
          list: res.data.list ? res.data.list : [],
        });
        this._map(res.data.list);
      }
    });
  }

  _map = (arr) => {
    arr.map((a, a_idx) => {

    });
  }
  formChange = value => {
    // console.log('value', value);
    this.setState({
      value,
    });
  };

  // 外层提交图片之前
  beforeUplooad_outside = info => {
    const { imgArr } = this.state;
    const thiz = this;
    const data = { imageType: 'avatar', file: info };
    const obj = {};
    const arr = [];
    nw.post(uploadImg(), data, res => {
      if (res.errorCode == 0) {
        console.log(res.data);
        obj.url = formatImgUrl(res.data.url);
        obj.mid = res.data.mid;
        arr.push(obj);
        const concatArr = imgArr.concat(arr);
        console.log(arr, imgArr, concatArr);
        thiz.setState({
          imgArr: concatArr,
        });
      }
    });
  };
  // 外层删除
  remove_outside = (v) => {
    const { imgArr } = this.state;
    console.log(v, imgArr);
    console.log(imgArr.findIndex(item => item.mid === v.mid));
    imgArr.splice(imgArr.findIndex(item => item.mid === v.mid), 1);
    // console.log(imgArr);
    this.setState({
      imgArr,
    });
  }

  handleUpdate = () => {
    this.setState({
      isMadal: true,
    });
  };

  onClose = () => {
    this.setState({
      isMadal: false,
    });
  }
  // 外层提交请求
  addPictures = () => {
    const { imgArr } = this.state;
    const uuid = GetQueryString('uuid');
    const pid = 21710;
    const imgs = JSON.stringify(imgArr);
    console.log(uuid, imgArr, pid, imgs);
    nw.post('/', { uuid, pid, imgs }, res => {
      if (res.errorCode == 0) {
        // console.log(res.data);
        Message.success('上传成功!');
        this.setState({
          isMadal: false,
        });
      }
    });
  }
  // 内层上传图片之前
  beforeUpload_inside = (info, o) => {
    let { list } = this.state;
    console.log(o, list);

    const thiz = this;
    const data = { imageType: 'avatar', file: info };
    const obj = {};
    const arr = [];
    nw.post(uploadImg(), data, res => {
      if (res.errorCode == 0) {
        // console.log(res.data);
        obj.url = res.data.url;
        obj.mid = res.data.mid;
        list = list.forEach((a, a_idx) => {
          a.recordList && a.recordList.forEach((b, b_idx) => {
            b.list && b.list.forEach((c, c_idx) => {
              if (c.id == o.id) {
                const itemArr = JSON.parse(c.image);
                itemArr.push(obj);
                const newItem = JSON.stringify(itemArr);
                console.log(newItem);
                c.image = newItem;
              }
            });
          });
        });
      }
    });
    this.setState({
      list,
      isload: true,
    }, () => {
      this.setState({
        isload: false,
      });
    });
    console.log(list, 'list');
  }

  remove_inside = (it, o) => {
    const { list } = this.state;
    console.log(it, o, list);
    if (o.image) {
      const itemArr = JSON.parse(o.image);
      itemArr.splice(itemArr.findIndex(item => item.mid === it.mid), 1);
      // console.log(itemArr,'itemArr')
      const newItem = JSON.stringify(itemArr);
      console.log(newItem);
      o.image = newItem;
    }
    console.log(o, 'ooooooooooooooooo');
    this.setState({
      list,
      isload: true,
    }, () => {
      this.setState({
        isload: false,
      });
    });

  }

  edit = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  }

  save = (obj) => {
    // console.log('保存', obj);
    const q = {};
    q.pid = 21711;
    q.uuid = obj.uuid;
    q.id = obj.id;
    q.imgs = obj.image;
    nw.post('/', { ...q }, res => {
      if (res.errorCode == 0) {
        // console.log(res.data);
        Message.success('保存成功!');
        this.setState({
          isload: false,
          isEdit: false,
        });
      }
    });
  }

  // 格式渲染的图片数组
  renderImg = (images) => {
    // console.log(images, '------------');
    images = JSON.parse(images);
    if (images) {
      images.map(v => {
        v.url = formatImgUrl(v.url);
        return v;
      });
      return images;
    }
    return [];

  }
  render() {
    const { imgArr, list } = this.state;

    return (
      <div>
        <IceContainer title="代言周期">
          <IceFormBinderWrapper
            value={this.state.value}
            ref="form"
            onChange={this.formChange}
          >
            <Col l="24">
              <div style={styles.formItem}>
                <span style={styles.formTitle}>代言周期：</span>
                {/* <IceFormBinder triggleType="onBlur" name="zhouqi">
                    <Input placeholder="请输入..." size="large"  />
                  </IceFormBinder>
                  <div style={styles.formError}>
                    <IceFormError name="zhouqi" />
                  </div> */}
                <span>3月</span>
              </div>
            </Col>
            <Col l="24" style={{ paddingBottom: '20px' }}>
              <Button
                type="primary"
                style={styles.backBtn}
                onClick={this.handleUpdate}
              >
                上传资料
              </Button>
            </Col>
          </IceFormBinderWrapper>
        </IceContainer>
        <IceContainer>

          {
            list ? (
              <div>
                <Tab style={{ overflow: 'hidden' }}>
                  {
                  list.map((item, idx) => {
                    return (
                      <Tab.Item
                        key={idx}
                        style={{ float: 'left' }}
                        title={
                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div>
                              <span style={{ color: '#0066CC' }}>
                                第{item.cycle}次合作：上传{item.total}次
                              </span>
                            </div>
                            <div>
                              <span style={{ color: '#0066CC' }}>
                                {timestampToFormatDate(item.startTime)} ~ {timestampToFormatDate(item.endTime)}
                              </span>
                            </div>
                          </div>
                        }
                      >
                        {
                          item.recordList && (
                            item.recordList.map((_v, _i) => {
                              return (
                                <Collapse key={_i}>
                                  <Panel
                                    title={
                                      <span style={{ color: '#0066CC' }}>
                                        <span>{_v.date}</span>
                                        <span style={{ marginLeft: '20px' }}>共上传{_v.total}次</span>
                                      </span>
                                    }
                                  >
                                    {
                                      _v.list && _v.list.map((_c, _cidx) => {
                                        return (
                                          <div key={_cidx}>
                                            <div
                                              style={{ display: 'flex', justifyContent: 'space-between' }}
                                              >
                                              <div>第{_cidx + 1}次上传：{timestampToFormatDate(_c.created)}（时间）</div>
                                              <div style={{ display: _c.isAdmin * 1 === 0 ? 'none' : 'block' }}>最多上传9张，图片可放大查看</div>
                                            </div>
                                            {
                                                _c.isAdmin * 1 === 0 ? (
                                                  <div style={{ padding: '20px 0', display: 'flex' }}>
                                                    {
                                                      _c.image && JSON.parse(_c.image).map((_d, _didx) => {
                                                        return (
                                                          <img
                                                            src={formatImgUrl(_d.url)}
                                                            style={{ width: '98px', height: '98px', marginRight: '12px', border: '1px solid #ccc' }}
                                                            key={_didx}
                                                            onClick={() => Zmage.browsing({ src: formatImgUrl(_d.url) })}
                                                          />
                                                        );
                                                      })
                                                    }
                                                  </div>
                                                ) : (
                                                  <div>

                                                    {!this.state.isload && <div style={{ display: this.state.isEdit ? 'block' : 'none' }}>
                                                      <div style={{ padding: '20px 0' }}>
                                                        <Upload.Card
                                                          listType="card"
                                                          action=""
                                                          accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                                                          beforeUpload={(info) => { this.beforeUpload_inside(info, _c); }}
                                                          onSuccess={onSuccess}
                                                          onError={onError}
                                                          defaultValue={_c.image ? this.renderImg(_c.image) : []}
                                                          limit={9}
                                                          onPreview={(v) => Zmage.browsing({ src: v.url })}
                                                          onRemove={(v) => { this.remove_inside(v, _c); }}
                                                        />
                                                      </div>
                                                      <Col >
                                                        <div>
                                                          <Button type="primary" onClick={this.edit} style={styles.button}>
                                                            编辑
                                                          </Button>
                                                          <Button type="primary" onClick={() => { this.save(_c); }} style={styles.button}>
                                                            保存
                                                          </Button>
                                                        </div>
                                                      </Col>
                                                                           </div>
                                                    }
                                                    <div style={{ display: this.state.isEdit ? 'none' : 'block' }}>
                                                      <div style={{ padding: '20px 0', display: 'flex' }}>
                                                        {
                                                          _c.image && JSON.parse(_c.image).map((_d, _didx) => {
                                                            return (
                                                              <img
                                                                src={formatImgUrl(_d.url)}
                                                                style={{ width: '98px', height: '98px', marginRight: '12px', border: '1px solid #ccc' }}
                                                                key={_didx}
                                                                onClick={() => Zmage.browsing({ src: formatImgUrl(_d.url) })}
                                                              />
                                                            );
                                                          })
                                                        }
                                                      </div>
                                                      <Col >
                                                        <div>
                                                          <Button type="primary" onClick={this.edit} style={styles.button}>
                                                            编辑
                                                          </Button>
                                                        </div>
                                                      </Col>
                                                    </div>

                                                  </div>
                                                )
                                              }
                                          </div>
                                        );
                                      })
                                    }
                                  </Panel>
                                </Collapse>
                              );
                            })
                          )
                        }
                      </Tab.Item>
                    );
                  })
                }
                </Tab>
              </div>
            ) :
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>暂无数据</div>
          }
        </IceContainer>
        <Dialog
          title={
            <div style={{ display: 'flex' }}>
              <div style={{ color: '#0066CC', marginRight: '20px' }}>上传资料</div>
              <div>最多上传9张</div>
            </div>
          }
          style={{ minWidth: '800px' }}
          visible={this.state.isMadal}
          onClose={this.onClose}
          footer={<Button type="primary" onClick={this.addPictures} >提交资料</Button>}
          // closeable="esc,close,mask"
        >
          <div style={{ padding: '20px 0' }}>
            <Upload.Card
              listType="card"
              action=""
              accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
              beforeUpload={this.beforeUplooad_outside}
              onSuccess={onSuccess}
              onCancel={onCancel}
              onError={onError}
              value={imgArr}
              limit={9}
              onRemove={(v) => { this.remove_outside(v); }}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(RecordAction, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'record', reducer });

export default compose(
  withReducer,
  withConnect
)(Index);

const styles = {
  backBtn: {
    float: 'right',
  },
  formItem: {
    padding: '0 0 10px 0',
  },
  formTitle: {
    width: '110px',
    display: 'inline-block',
  },
  formRow: {
    display: 'block',
    padding: '0px 0px 40px 0px',
  },
  formError: {},
  formFlex: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '30px',
  },
  button: {
    marginRight: '20px',
  },
};
