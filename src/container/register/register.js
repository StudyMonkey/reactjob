import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { Redirect } from 'react-router-dom'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux'
import wrapForm from '../../component/wrap-form/wrap-form'

@connect(
  state => state.user,
  { register }
)
@wrapForm
class Register extends Component {

  componentDidMount(){
    this.props.handleChange('type', 'genius');
  }

  handleRegister = () => {
      this.props.register(this.props.state);
  } 

  render() {
    const RadioItem = Radio.RadioItem
    return (     
      <div>
        { this.props.redirectTo ? <Redirect to={ this.props.redirectTo } /> : null }
        <Logo />
        { this.props.msg ? <p className="error-msg">{ this.props.msg }</p> : null }
        <WingBlank>
          <List>
              <InputItem onChange={v => this.props.handleChange('user', v)}>用户名</InputItem>
              <InputItem type="password" onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
              <InputItem type="password" onChange={v => this.props.handleChange('repeatPwd', v)}>确认密码</InputItem>
              <RadioItem checked={this.props.state.type==='genius'} onChange={ () => this.props.handleChange('type', 'genius')}>牛人</RadioItem>
              <RadioItem checked={this.props.state.type==='boss'} onChange={ () => this.props.handleChange('type', 'boss')}>Boss</RadioItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
          <WhiteSpace />
          <Button type="primary" onClick={() => this.props.history.push('/login')}>已有账号，返回登录</Button>
        </WingBlank>
        
        
      </div>
    )
  }
}

export default Register;