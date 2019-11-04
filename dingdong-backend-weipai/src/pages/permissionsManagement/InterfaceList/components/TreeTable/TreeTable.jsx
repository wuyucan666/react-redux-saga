import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Table } from '@alifd/next';
import IceContainer from '@icedesign/container';

// let arrs = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
let num =0
// let assginArr; 

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
      // console.log(this.props.perListCheck)
      this.setState({
        keyList:this.props.listName
      })
    }, 800);
  }

  // onSelectAll = (choose,arr) =>{
  //   // console.log(choose,arr[0].index)
  //   if(choose){
  //     num = arr[0].index
  //   }
  // }
  // onSelect = (choose,arr) =>{
  //   // console.log(index,arr.index);
  //   if(choose){
  //     num = arr.index
  //   }
  // }
  onSelect = (index) =>{
    num = index
    // console.log(num);
  }
  onChange = (...args) => {
    this.setState({
      keyList:[...args][0] 
    })
    let addArr = [...new Set([...args][0])]
    // assginArr = Object.assign([],[...args][0])
    // console.log([...args]);
    // if(addArr.length!==0 && [...args][1].length!==0){
    //   // assginArr.push([...args][1][0].pid)
    //   if([...args][1][0].name!=='首页'){
    //     addArr.push([...args][1][0].pid)
    //   }
    // }
    // console.log(addArr)
    this.props.getPermission(addArr)
    // console.log([...args][0],assginArr);
    // console.log([...args][1][0].pid,assginArr)
    // arrs.splice(num,1,assginArr)
    // console.log(arrs);
    // let allPermission = []
    // arrs.forEach(e => {
    //   if(JSON.stringify(e)!=='[]'){
    //     e.forEach(ele => {
    //       if(ele!==null){
    //         allPermission.push(ele)
    //       }
    //     });
    //   }
    // });
    // console.log([...new Set(allPermission)],[...new Set(addArr)]) 
  };
  

  render() {
    // console.log(this.props.permission);
    return (
      <div>
       <IceContainer>
         {
           this.props.permission.map((items,index) => (
            //  console.log(items,items.child.length)
             items.child[0]==undefined?
             <div key={index}>
              <Table dataSource={[items]} primaryKey="name" isTree  
              rowSelection={{
                onChange: this.onChange,
                onSelectAll:()=>this.onSelect(index),
                onSelect:()=>this.onSelect(index),
                selectedRowKeys:this.state.keyList
              }}>
              <Table.Column title={items.name}   dataIndex="name" />
              </Table>
            </div> 
             :
            <div key={index}>
              <Table dataSource={items.child} primaryKey="name" isTree  
              rowSelection={{
                onChange: this.onChange,
                onSelectAll:()=>this.onSelect(index),
                onSelect:()=>this.onSelect(index),
                selectedRowKeys:this.state.keyList
              }}>
              <Table.Column title={items.name}  dataIndex="name" />
              </Table>
            </div> 
           ))
         }
       </IceContainer>
      </div>
 
    )
  }
}
