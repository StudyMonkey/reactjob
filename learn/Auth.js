import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, getUserData } from './Auth.redux'
import { Button } from 'antd-mobile';
import { Redirect } from 'react-router-dom'

 class Auth extends Component {
  

  componentDidMount(){
    this.props.getUserData();
  }

  render() {
    const { isAuth, login } = this.props;
    return (
      <div>
        { isAuth ? <Redirect to="/dashboard" /> : null } 
        <h2>我的姓名是{this.props.name}, 我的年龄是{this.props.age}</h2>  
        <h2>你没有权限，需要登录才能查看<Button onClick={ login }>点击登录</Button></h2>    
        
      </div>
    )
  }
}

const mapStatetoProps = state => state.auth
  
const actionCreaters = { login,getUserData };

export default connect(mapStatetoProps, actionCreaters)(Auth)
