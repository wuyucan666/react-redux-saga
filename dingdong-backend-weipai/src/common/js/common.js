import { Message } from '@alifd/next';
import defaultImgSrc from '../images/avatar_110_110.jpg';

// 飞冰返回的时间数据转换为时间戳。
export function changeTimestamp(parmas) {

  const newParmas = Object.assign({}, parmas);
  if (newParmas.date) {
    // console.log(newParmas.date);
    if (newParmas.date.length !== 0) {
      const startTime = newParmas.date[0]._d.valueOf() / 1000;
      const endTime = newParmas.date[1]._d.valueOf() / 1000;
      newParmas.startTime = startTime;
      newParmas.endTime = endTime;
      // newParmas = Object.assign({},parmas)
      delete newParmas.date;
      return newParmas;
    }
    newParmas.startTime = 0;
    newParmas.endTime = 0;
    delete newParmas.date;
    return newParmas;

  }

  newParmas.startTime = 0;
  newParmas.endTime = 0;
  delete newParmas.date;
  return newParmas;

}
// 返回的时间数据转换为时间戳(通用版)
export function timestamp(parmas, all, start, end) {
  const newParmas = Object.assign({}, parmas);
  if (newParmas[all]) {
    // console.log(newParmas[all]);
    if (newParmas[all].length !== 0) {
      const startTime = newParmas[all][0]._d.valueOf() / 1000;
      const endTime = newParmas[all][1]._d.valueOf() / 1000;
      newParmas[start] = startTime;
      newParmas[end] = endTime;
      // newParmas = Object.assign({},parmas)
      delete newParmas[all];
      return newParmas;
    }
    newParmas[start] = 0;
    newParmas[end] = 0;
    delete newParmas[all];
    return newParmas;

  }

  newParmas[start] = 0;
  newParmas[end] = 0;
  delete newParmas[all];
  return newParmas;

}

// 最近时间转换时间戳
export function timeForMat(num) {
  const count = Number(num);
  if (count !== 0) {
    const time1 = new Date();
    time1.setTime(time1.getTime());
    const Y1 = time1.getFullYear();
    const M1 = ((time1.getMonth() + 1) > 10 ? (time1.getMonth() + 1) : `0${time1.getMonth() + 1}`);
    const D1 = (time1.getDate() > 10 ? time1.getDate() : `0${time1.getDate()}`);
    const timer1 = `${Y1}/${M1}/${D1} `;
    const endTime = parseInt((new Date()).getTime() / 1000);


    const time2 = new Date();
    time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * count));
    const Y2 = time2.getFullYear();
    const M2 = ((time2.getMonth() + 1) > 9 ? (time2.getMonth() + 1) : `0${time2.getMonth() + 1}`);
    const D2 = (time2.getDate() > 9 ? time2.getDate() : `0${time2.getDate()}`);
    const timer2 = `${Y2}/${M2}/${D2} `;
    const startTime = (new Date(timer2)).getTime() / 1000;
    return [{
      startTime,
      endTime,
    }];
  }
  return [{
    startTime: 0,
    endTime: 0,
  }];

}

// obj要传的参数，date传obj具体key值位置
export function timeToObj(obj, date) {
  // console.log(obj,date);
  if (date !== undefined) {
    const newObj = obj;
    const dateArr = timeForMat(date);
    // console.log(dateArr[0].endTime);
    newObj.startTime = dateArr[0].startTime;
    newObj.endTime = dateArr[0].endTime;
    // delete newObj['date']
    return newObj;
  }
  const newObj = obj;
  newObj.startTime = 0;
  newObj.endTime = 0;
  return newObj;

  // if(parmas.date!==undefined){
  //     let startTime = parmas.date[0]._d.valueOf()/1000
  //     let endTime = parmas.date[1]._d.valueOf()/1000
  //     parmas.startTime = startTime
  //     parmas.endTime = endTime
  //     delete parmas['date']
  //     // console.log(parmas)
  //   }
}


// 后台返回前端图片转换
export function formatImgUrl(url) {
  if (url) {
    if (url.indexOf('http') >= 0) {
      return url;
    }
    if (window.location.host == 'customer.ddybw.com' || window.location.host == 'test.customer.ddybw.com') {
      return `https://image.ddybw.com${url}`;
    }
    return `http://192.168.1.5:89/${url}`;


  }
  return defaultImgSrc;

}


// 图片上传

export function uploadImg(data) {
  let imgUrl = '',
    url = window.location.href;
  if (window.location.host == 'customer.ddybw.com' || window.location.host == 'test.customer.ddybw.com')
  {
    imgUrl = 'https://image.ddybw.com/upload_image';
  } else {
    imgUrl = 'http://192.168.1.5:89/upload_image';
  }

  return imgUrl;

}

export function AppId(data) {
  if (window.location.host == 'customer.ddybw.com') {
    return 'ddcustomer';
  } else if (window.location.host == 'test.customer.ddybw.com' || window.location.host == 'http://192.168.1.5:9091') {
    return 'testddcustomer';
  }
  return 'ddcustomer';

}


// //图片上传

// export function uploadVersion (data) {
//     var imgUrl='',
//     url=window.location.href;
//     if(window.location.host=='customer.ddybw.com' || window.location.host=='test.customer.ddybw.com')
//     {
//         imgUrl='https://image.ddybw.com/upload_image'
//     }else{
//         imgUrl='http://192.168.1.5:89/upload_image'
//     }

//     return  imgUrl;

// }


export function getToken() {

  const key = 'dt';

  if (document.cookie.length > 0) {

    let c_start = document.cookie.indexOf(`${key}=`);

    if (c_start !== -1) {

      c_start = c_start + key.length + 1;
      let c_end = document.cookie.indexOf(';', c_start);

      if (c_end === -1) c_end = document.cookie.length;

      return decodeURIComponent(document.cookie.substring(c_start, c_end));

    }

  }

  return null;

}

export function removeArray(_arr, _obj) {

  const length = _arr.length;
  for (let i = 0; i < length; i++) {
    if (_arr[i] == _obj) {
      if (i == 0) {
        _arr.shift(); // 删除并返回数组的第一个元素
        return _arr;
      }
      else if (i == length - 1) {
        _arr.pop(); // 删除并返回数组的最后一个元素
        return _arr;
      }

      _arr.splice(i, 1); // 删除下标为i的元素
      return _arr;

    }
  }

}

// 对象数组去重
export function uniqObjInArray(_arr, _obj) {

  const len = objarray.length;
  const tempJson = {

  };
  const res = [];
  for (let i = 0; i < len; i++) {
    // 取出每一个对象
    tempJson[JSON.stringify(objarray[i])] = true;
  }
  const keyItems = Object.keys(tempJson);
  for (let j = 0; j < keyItems.length; j++) {
    res.push(JSON.parse(keyItems[j]));
  }
  return res;

}




// 防抖函数
export const Debounce = (fn, t) => {
  const delay = t || 500;
  let timer;
  return function () {
    const args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, delay);
  };
};


// 新增优惠券检验
export const addCouponCheck = (obj) => {
  const checkVal = (val) => {
    const bool = !obj[val];
    return bool;
  };

  if (checkVal('type')) {
    Message.error('未填写商家类型');
    return false;
  }
  if (checkVal('couponName')) {
    Message.error('未填写优惠券名称');
    return false;
  }
  if (obj.couponName.length > 15) {
    Message.error('优惠券名称不能多于15字');
    return false;
  }
  if (checkVal('amount')) {
    Message.error('未填写面值');
    return false;
  }
  if (!/^[0-9]+$/.test(Number(obj.amount))) {
    Message.error('面值为纯数字');
    return false;
  }
  if (Number(obj.amount) <= 0) {
    Message.error('面值要为正数');
    return false;
  }
  if (checkVal('total')) {
    Message.error('未填写总发行量');
    return false;
  }
  if (Number(obj.total) <= 0) {
    Message.error('总发行量要为正数');
    return false;
  }
  if (obj.threshold > 100000) {
    Message.error('门槛不能超过100000元');
    return false;
  }
  if (checkVal('endTime')) {
    Message.error('未填写有效领取时间');
    return false;
  }
  if (checkVal('timeout')) {
    Message.error('未填写日期范围');
    return false;
  }
  if (Number(obj.endTime) <= (Date.parse(new Date()) / 1000)) {
    Message.error('无法创建已超时的优惠券');
    return false;
  }
  if (Number(obj.timeout) <= 0) {
    Message.error('固定天数要为正数');
    return false;
  }
  if (obj.receiveTime !== 0) {
    if (obj.startTime >= obj.receiveTime) {
      Message.error('有效使用开始时间要小于有效领取开始时间');
      return false;
    }
    if (Number(obj.receiveTime) + Number(obj.timeout) < Number(obj.endTime)) {
      Message.error('有效使用截止时间要大于有效领取截止时间');
      return false;
    }
  } else if ((Date.parse(new Date()) / 1000) + Number(obj.timeout) < Number(obj.endTime)) {
    Message.error('有效使用截止时间要大于有效领取截止时间');
    return false;
  }
  if (obj.type == obj.multiCoupons) {
    Message.error('不能叠加同类型优惠券');
    return false;
  }


  return true;
};

// 时间戳转格式
export const timestampToTime = (timestamp) => {
  // 计算年月日时分的函数
  const date = new Date(parseInt(timestamp) * 1000);
  const Y = `${date.getFullYear()}/`;
  const M = `${date.getMonth() + 1}/`;
  const D = `${date.getDate()} `;
  const h = `${date.getHours()}:`;
  const m = `${date.getMinutes()}:`;
  const s = date.getSeconds();
  return Y + M + D + h + m + s;
};

export const formDate = (time) => {
  const thisTime = time.replace(/ /g, '/');
  let nowTime = new Date(thisTime);
  nowTime = nowTime.getTime() / 1000;
  return nowTime;
};

// 时间戳转格式
export const timestampToFormatDate = (timestamp) => {
  // 计算年月日时分的函数
  const date = new Date(parseInt(timestamp) * 1000);
  const Y = `${date.getFullYear()}-`;
  let M = `${date.getMonth() + 1}-`;
  let D = `${date.getDate()} `;
  let h = `${date.getHours()}:`;
  let m = `${date.getMinutes()}:`;
  let s = date.getSeconds();
  M = M < 10 ? `0${M}` : M;
  D = D < 10 ? `0${D}` : D;
  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  return Y + M + D + h + m + s;
};
