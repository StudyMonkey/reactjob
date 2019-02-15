import React, { Component } from 'react'
import { WingBlank, Card, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser_redux'
import { withRouter } from 'react-router-dom'

@connect(
    state => state.chatUser,
    { getUserList }
)
@withRouter
class usercard extends Component {

  componentDidMount(){
    this.props.getUserList(this.props.type);
  } 

  handleChooseUser = v => {
    console.log('object')
    this.props.history.push(`/chat/${v._id}`);
  }

  render() {
    const Header = Card.Header
    const Body = Card.Body   
    return (
      <div>
        <WhiteSpace />
        <WingBlank>
          {
            this.props.userList.map( v => (
              v.avatar? (
              <Card onClick={() => this.handleChooseUser(v)} key={v._id} style={{marginTop: 10}}>
                <Header
                  title={v.user}
                  thumb={require(`../img/${v.avatar}.png`)}
                  extra={<span>{v.title}</span>}
                >
                </Header>
                <Body>
                { v.type === 'boss' ? <div>公司: <span>{v.company}</span></div> : null }
                  {v.desc.split('\n').map( d=> (
                    <div key={d}>{d}</div>
                  ))}
                  { v.type === 'boss' ? <div>薪资: <span>{v.money}</span></div> : null }
                </Body>
              </Card>) : null
            ))
          }
          
          <WhiteSpace />
        </WingBlank>        
      </div>
    )
  }
}

export default usercard;
