/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select, DatePicker,Search,Button,Icon  } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import moment from 'moment';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
const { Row, Col } = Grid;
const { RangePicker } = DatePicker;
const onChange = (value) => console.log(value);
const onOk = (value) => console.log('onOK:', value.format('YYYY-MM-DD HH:mm:ss'));
const onRangeOk = (value) => console.log('onOk: [%s, %s]', value[0].format('YYYY-MM-DD HH:mm:ss'), value[1].format('YYYY-MM-DD HH:mm:ss'));


const defaultTimeValue = moment('09:00:00', 'HH:mm:ss', true);
export default class Filter extends Component {
  static displayName = 'Filter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
    };
  }

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  render() {
    // console.log(this.props.parentRole)
    let disable = this.props.parentRole ==''?true:false
    return (
      <IceContainer title="">
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="24">
            <div style={styles.formItem}>
            <Button type="primary" disabled={disable} style={styles.button}>
              <Link   style={styles.link} 
              onClick={()=>sessionStorage.setItem("data",null)}
              to="/permissionsManagement/AddRoles"   >
                增加角色
            </Link>
            </Button>
            </div>
          </Col>
        </Row>
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
    minWidth: '70px',
  },
  link:{
    color:'#fff'
  }
};
