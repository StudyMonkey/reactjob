import React, { Component } from 'react'
import { WingBlank, Card, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser_redux'

class boss extends Component {

  componentDidMount(){
    this.props.getUserList('genius');
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
                  {v.desc.split('\n').map( v=> (
                    <div key={v}>{v}</div>
                  ))}
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

const mapStatetoProps = state => state.chatUser

const actionCreaters = { getUserList }

export default connect(mapStatetoProps, actionCreaters)(boss);
