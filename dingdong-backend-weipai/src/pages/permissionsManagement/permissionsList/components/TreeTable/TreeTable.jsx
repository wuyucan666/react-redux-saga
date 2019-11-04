import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Table } from '@alifd/next';
import IceContainer from '@icedesign/container';

// let arrs = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
let num =0
export default class TreeTable extends Component {
  static displayName = 'TreeTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      total:0,
      allPermission:[],
      keyList:[],
    };
  }

  componentDidMount(){
    setTimeout(() => {
      // console.log(this.props.listName)
      this.setState({
        keyList:this.props.listName
      })
    }, 800);
  }

  onSelect = (current,total) =>{
    num = current
  }
  onChange = (...args) => {
    this.setState({
      keyList:[...args][0] 
    })
    let addArr = [...args][0]
    // if(addArr.length!==0 && [...args][1].length!==0){
    //   if([...args][1][0].name!=='首页'){
    //     addArr.push([...args][1][0].pid)
    //   }
    // }
    this.props.getPermission([...new Set(addArr)])
  };

  render() {
    // console.log(this.props.permission.length);
    return (
      <div>
       <IceContainer>
         {
           this.props.permission.map((items,index) => (
            //  console.log(items,items.child.length)
             items.child[0]==undefined?
             <div key={index}>
              <Table dataSource={[items]} primaryKey="name" isTree  rowSelection={{ onChange: this.onChange,
              onSelectAll:()=>this.onSelect(index) ,
              onSelect:()=>this.onSelect(index),
              selectedRowKeys:this.state.keyList
              }}>
              <Table.Column title={items.name}  dataIndex="description" />
              </Table>
            </div> 
             :
            <div key={index}>
              <Table dataSource={items.child} primaryKey="name" isTree  
              rowSelection={{ onChange: this.onChange,
              onSelectAll:()=>this.onSelect(index) ,
              onSelect:()=>this.onSelect(index),
              selectedRowKeys:this.state.keyList
              }}>
              <Table.Column title={items.name}  dataIndex="description" />
              </Table>
            </div> 
           ))
         }
       </IceContainer>
      </div>
 
    )
  }
}
