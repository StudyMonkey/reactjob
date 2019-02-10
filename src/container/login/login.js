import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { login } from '../../redux/user.redux'
import { connect } from 'react-redux'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: '',
      pwd: ''
    }
  }

  handleChange = (key, val) => {
    this.setState({
      [key]: val
    })
  }

  handleLogin = () => {
    this.props.login(this.state);
  }

  register = () => {
    console.log(this.props);
    this.props.history.push('/register');
  }

  render() {
    return (
      <div>
        <Logo />
        <WingBlank>
            <List>
                <InputItem onChange={v => this.hanleChange('user', v)}>用户名</InputItem>
                <InputItem type="password" onChange={v => this.hanleChange('pwd', v)}>密码</InputItem>
            </List>
            <WhiteSpace />
            <Button type="primary" onClick={this.handleLogin}>登录</Button>
            <WhiteSpace />
            <Button type="primary" onClick={ this.register }>注册</Button>
        </WingBlank>        
      </div>
    )
  }
}

const mapStatetoProps = state => state.user

const actionCreaters = { login };

export default connect(mapStatetoProps, actionCreaters)(Login);
