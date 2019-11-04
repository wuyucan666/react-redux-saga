import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import 'braft-editor/dist/braft.css';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';
import { Link } from 'react-router-dom';
// import { Message } from '@alifd/next';
//redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import * as pipeAction from '../../../../../redux/FinancialManagement/UserPipelineQuery/action';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../../../../../redux/FinancialManagement/UserPipelineQuery/reducer';

let beforeExport =''
let parmas ={}
export class CustomBraftEditor extends Component {
  static displayName = 'CustomBraftEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount(){
    let val = {
      page:1
    }
  }

  handleConChange = (values) => {
    parmas = values
    // console.log(parmas);
    values.page = 1
    // const {actions} = this.props
    // actions.userCondition(values);
    // actions.userResultPage(1);
    // console.log(this.props.state.pipe)
  };

  handleExportData = (val) => {
    console.log(val);
  }

  handleChange = (rawContent) => {
    console.log(rawContent);
  };

  handlePage = (page) => {
    parmas.page=page
    console.log(page);
    // const {actions} = this.props
    // actions.userCondition(parmas);
    // actions.userResultPage(page);
  }
  
  render() {
    // console.log(this.props.state.pipe)
    return (
      <div>
        <IceContainer >
        <Link  to="/financialManagement/FinaCouponOperation"  style={styles.nav1} >
        审核补发优惠券
        </Link>
        <Link  to="/financialManagement/FinaCouponSupply" style={styles.nav} >
        审核运营优惠券
        </Link>
      </IceContainer>
      <IceContainer>
             <TableFilter 
             handleConChange={(obj)=>this.handleConChange(obj)} 
             handleExportData={(obj)=>this.handleExportData(obj)}
             />
    </IceContainer>
    <IceContainer>
            <CustomTable 
            handlePage = {(page)=>this.handlePage(page)} />
    </IceContainer>
    </div>
    );
  }
}

//redux
const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(pipeAction, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'userPipe', reducer });

export default compose(
  withReducer,
  withConnect
)(CustomBraftEditor);


const styles = {
  nav1:{
    padding:'10px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  nav:{
    padding:'10px',
    fontSize: '20px',
    fontWeight: 'bold',
    color:'#21242a'
  },

};
