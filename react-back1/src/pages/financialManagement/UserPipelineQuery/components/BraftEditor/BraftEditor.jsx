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
    const {actions} = this.props

    if ( window.location.hash.split('=')[1]){
      val.status = 1;
      actions.userCondition(val);
    }else{
      actions.userCondition(val);
    }


  }

  handleConChange = (values) => {
    parmas = values
    // console.log(parmas);
    values.page = 1
    const {actions} = this.props
    actions.userCondition(values);
    actions.userResultPage(1);
    // console.log(this.props.state.pipe)
  };

  handleExportData = (val) => {
    const {actions} = this.props
    actions.userPipeExport(val);
    setTimeout(() => {
      const {exportUrl} = this.props.state.pipe
      if(beforeExport !== exportUrl){
        window.location.href = exportUrl;
        // console.log(exportUrl,beforeExport)
        beforeExport = exportUrl
      }
    }, 1000);
  }

  handleChange = (rawContent) => {
    console.log(rawContent);
  };

  handleOnConfirmDialog = (val) => {
    const {actions} = this.props
    actions.userofflineSnArrival(val)
  }

  handlePage = (page) => {
    parmas.page=page
    // console.log(this.props.state.pipe.pages);
    const {actions} = this.props
    actions.userCondition(parmas);
    actions.userResultPage(page);
  }
  
  render() {
    // console.log(this.props.state.pipe)
    return (
      <div>
        <IceContainer >
        <Link  to="/financialManagement/UserPipelineQuery"  style={styles.nav1} >
        提现记录
        </Link>
        <Link  to="/financialManagement/UserCharge" style={styles.nav} >
        充值记录
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
            lists={this.props.state.pipe.lists} 
            pages={this.props.state.pipe.pages} 
            total={this.props.state.pipe.pageTotal} 
            handleOnConfirmDialog={(obj) => this.handleOnConfirmDialog(obj)}
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
