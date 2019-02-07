import React, { Component } from 'react';
import { Button, List } from 'antd-mobile';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';

function YiYing(props){
  return (
    <List.Item>
        {props.data}
    </List.Item>
  )
}

class QiBing extends Component {
  render(){
    return(
      <div>
        <h2>骑兵连连长, {this.props.cap}</h2>
        <h3>骑兵赵又廷报道</h3>
      </div>
    )
  }
}

class App extends Component {

  componentDidMount(){
    axios.get('/data').then( res =>{
      console.log(res)
    }).catch( (err) => {
      console.log(err);
    })
  }

  constructor(props){
    super(props);

    this.state = {
      soldiers: ['虎子', '柱子', '王大锤', '皮蛋']
    }
  }
  addSoldiers = () => {
    console.log(this);
    this.setState( prevState => ({
      
        soldiers: [...prevState.soldiers, '新兵蛋子'+ parseInt(Math.random()*1000)]
      
    }))  
  }
  render() {
    return (
      <div className="App">
          <h1>司令官，李云龙</h1>
          <Button type="primary" onClick={this.addSoldiers}>新兵入伍</Button>
          <List>
              { this.state.soldiers.map(v => {
                return (
                  <YiYing key={v} data={v}></YiYing>
                )              
              })}
          </List>
          <QiBing cap="大铁"/>
      </div>
    );
  }
}



export default App;
