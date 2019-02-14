import React, { Component } from 'react'
import { WingBlank, Card, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser_redux'

@connect(
    state => state.chatUser,
    { getUserList }
)
class usercard extends Component {

  componentDidMount(){
    this.props.getUserList(this.props.type);
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
              v.avatar? (<Card key={v._id} style={{marginTop: 10}}>
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
