/* eslint react/no-string-refs:0 */
import React, { useState,useRef } from 'react';
import { Grid, Input, Select, DatePicker,Search,Button,Icon  } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import moment from 'moment';
import IceContainer from '@icedesign/container';
// import {timeForMat} from '../../../../../common/js/common'
const { Row, Col } = Grid;
const { RangePicker } = DatePicker;

export default function Filter(props){
  const [value, setValue] = useState({});
  const ref = useRef('form');
  const [val , setVal] = useState(2)
  const condition = (e,val) => {
    setVal(val)
    const NewVal = {
      source:val?val:2
    }
    props.handleLists(NewVal)
  }
  const onChange = (val)=>{
  }
    return (

    <IceFormBinderWrapper
         value={value}
         ref={ref}
      >
      <div style={styles.formItem}>
        <Button type={`${val == 2 ? 'primary' : 'normal'}`} onClick={e=>condition(e,2)} style={styles.button}>
          IOS
        </Button>
        <Button type={`${val == 1 ? 'primary' : 'normal'}`} onClick={e=>condition(e,1)} style={styles.ml10}>
          安卓
        </Button>
      </div> 
      </IceFormBinderWrapper>

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
    minWidth: '70px',
  },
  ml10:{
    marginLeft: '10px',
  }
};

