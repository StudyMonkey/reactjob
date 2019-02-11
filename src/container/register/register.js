import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { Redirect } from 'react-router-dom'
import { List, InputItem, Radio, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux'


class Register extends Component {

  constructor(props) {
      super(props);
      this.state = {
          user: '',
          pwd: '',
          repeatPwd: '',
          type: 'genius'  // 或者boss
      }
  }

  handleRegister = () => {
      this.props.register(this.state);
      console.log(this.state);
  }

  handleChange = (key, val) => {
    this.setState({
      [key]: val    
    })
  }  

  render() {
    const RadioItem = Radio.RadioItem
    return (     
      <div>
        { this.props.redirectTo ? <Redirect to={ this.props.redirectTo } /> : null }
        <Logo />
        { this.props.msg ? <p className="error-msg">{ this.props.msg }</p> : null }
        <List>
            <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
            <InputItem type="password" onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
            <InputItem type="password" onChange={v => this.handleChange('repeatPwd', v)}>确认密码</InputItem>
            <RadioItem checked={this.state.type==='genius'} onChange={ () => this.handleChange('type', 'genius')}>牛人</RadioItem>
            <RadioItem checked={this.state.type==='boss'} onChange={ () => this.handleChange('type', 'boss')}>Boss</RadioItem>
        </List>
        <WhiteSpace />
        <Button type="primary" onClick={this.handleRegister}>注册</Button>
      </div>
    )
  }
}

const mapStatetoProps = state => state.user;

const actionCreaters = { register }

export default connect(mapStatetoProps, actionCreaters)(Register);