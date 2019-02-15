import React, { Component } from 'react'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg }
)
class chat extends Component {

  constructor(props) {
    super(props);

    this.state = { text: '', msg: []}
  }

  componentDidMount(){
    if ( !this.props.chat.chatmsg.length) { // 如果之前没有请求
      this.props.getMsgList();     
      this.props.recvMsg(); 
    }
   
  }

  handleSend = () => {
    console.log(this.props.user);
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const content = this.state.text;
    this.props.sendMsg({from, to, content});
    this.setState({
      text: ''
    })
  }

  render() {
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users;
    if ( !users[userid]){
      return null;
    }
    return (
      <div id="chat-page">
        <NavBar 
          mode="dark" 
          icon={<Icon type='left' />}
          onLeftClick={() => this.props.history.goBack()}
        >
          {users[userid].name}
        </NavBar>
        <div style={{ marginBottom: 45}}>
          { this.props.chat.chatmsg.map( v => {
            console.log(users[v.from].name);
            const avatar = require(`../img/${users[v.from].avatar}.png`)
            return v.from === userid ? 
                    (
                      <List key={v._id}>
                        <Item
                          thumb={avatar}
                        >
                          {v.content}
                        </Item>  
                      </List>) : 
                    (                  
                      <List key={v._id}>
                        <Item 
                          className="chat-me"
                          extra={<img src={avatar} alt=""/>}
                        >
                          {v.content}
                        </Item>  
                      </List>
                    )
          })}
        </div>
        <div className="stick-footer">
            <List>
                <InputItem 
                    placeholder="请输入"
                    value={this.state.text}
                    onChange={ v=> {
                      this.setState({
                        text: v
                      })
                    }}
                    extra={<span onClick={() => this.handleSend()}>发送</span>}
                />
            </List>
        </div>
      </div>
    )
  }
}

export default chat
