import React, { Component } from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'

import { getChatId } from '../../util'

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg, readMsg }
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

  componentWillUnmount(){
    const to = this.props.match.params.user;
    this.props.readMsg(to) 
  }

  fixCarsoul(){
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'));
    }, 0)
  }

  handleSend = () => {
    console.log(this.props.user);
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const content = this.state.text;
    this.props.sendMsg({from, to, content});
    this.setState({
      text: '',
      showEmoji: false
    })
  }

  render() { 

    const emoji = '😍 💼 😃 😄 😂 😘 😏 😴 😍 💼 😃 😄 😂 😘 😏 😴 😍 💼 😃 😄 😂 😘 😏 😴 😍 💼 😃 😄 😂 😘 😏 😴 😍 💼 😃 😄 😂 😘 😏 😴 😍 💼 😃 😄 😂 😘 😏 😴 😍 💼 😃 😄 😂 😘 😏 😴 😍 💼 😃 😄 😂 😘 😏 😴 😍 💼 😃 😄 😂 😘 😏 😴 😍 💼 😃 😄 😂 😘 😏 😴 😍 💼 😃 😄 😂 😘 😏 😴 😍 💼 😃 😄 😂 😘 😏 😴 😍 💼 😃 😄 😂 😘 😏 😴'
                  .split(' ')
                  .filter( v=> v)
                  .map( v=> ({text: v}) )

    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users;
    if ( !users[userid]){
      return null;
    }
    const chatid = getChatId(userid, this.props.user._id);
    const chatmsgs = this.props.chat.chatmsg.filter( v => v.chatid === chatid);
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
          { chatmsgs.map( v => {
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
                    extra={
                      <div>
                        <span onClick={ () => {
                          this.setState({
                            showEmoji: !this.state.showEmoji
                          })
                          this.fixCarsoul()
                        }} style={{marginRight: 15}}>😃</span>
                        <span onClick={() => this.handleSend()}>发送</span>
                      </div>                  
                    }
                />
            </List>
            {
              this.state.showEmoji ? 
              <Grid 
                data={emoji}
                columnNum={9}
                carouselMaxRow={4}
                isCarousel={true}
                onClick={ el => {
                  this.setState({
                    text: this.state.text+el.text
                  })
                }}
              /> : null
            }

        </div>
      </div>
    )
  }
}

export default chat
