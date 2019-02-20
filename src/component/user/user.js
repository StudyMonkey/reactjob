import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Result, WhiteSpace, WingBlank, List, Button, Modal } from 'antd-mobile'
import browserCookies from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  { logoutSubmit }
)
class User extends Component {

  logout = () => {
    const alert = Modal.alert;
    alert('注销', '确认退出登录么？',[
      {text: '取消', onPress: ()=> console.log('cancel')},
      {text: '确定', onPress: () => {
        browserCookies.erase('userid');
        this.props.logoutSubmit();
      }}
    ])
  }

  render() {
    const props = this.props;
    const Item = List.Item;
    const Brief = Item.Brief;
    return props.user ? (
      <div>
        <WhiteSpace />
        <WingBlank>
          <Result 
            img={<img src={require(`../img/${props.avatar}.png`)} style={{width: 50}} alt=""/>}
            title={props.user}
            message={props.type==='boss' ? props.company : null}
          />
          <List renderHeader={() => '简介'}>
            <Item multipleLine>
              {props.title}
              { props.desc.split('\n').map( v => <Brief key={v}>{v}</Brief> ) }
              { props.money ? <Brief>薪资: {props.money}</Brief> : null }
            </Item>
          </List>
          <WhiteSpace />
          <Button type="warning" onClick={ this.logout }>退出登录</Button>
        </WingBlank>
        
      </div>
    ) : <Redirect to={props.redirectTo=== '' ? '/login' : ''} />
  }
}

export default User;
