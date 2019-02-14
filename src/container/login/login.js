import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'
import { connect } from 'react-redux'

import wrapForm from '../../component/wrap-form/wrap-form'

@connect(
  state => state.user,
  { login }
)
@wrapForm
class Login extends Component {
/*   constructor(props){
    super(props)
  } */

  handleLogin = () => {
    this.props.login(this.props.state);
  }

  register = () => {
    this.props.history.push('/register');
  }

  render() {
    return (
      <div>   
        <Logo />
        { (this.props.redirectTo&& this.props.redirectTo!=='/login') ? <Redirect to={ this.props.redirectTo } /> : null }
        { this.props.msg ? <p className="error-msg">{ this.props.msg }</p> : null }
        <WingBlank>
            <List>           
                <InputItem onChange={v => this.props.handleChange('user', v)}>用户名</InputItem>
                <InputItem type="password" onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
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

export default Login;
