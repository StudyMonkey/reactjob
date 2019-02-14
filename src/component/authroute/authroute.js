import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'

@connect(
  state => state,
  { loadData }
)
@withRouter
class AuthRoute extends Component {

  componentDidMount(){
      // 已经是登录/注册页面的情况下
      const publicList = ['/login', '/register'];
      const pathname = this.props.location.pathname;
      if (publicList.indexOf(pathname)> -1) {
        return null
      }
      // 获取用户信息
      axios.get('/user/info').then( res => {
        if ( res.status === 200 ) {
            if (res.data.code === 0) {
                // 有登录信息的
                this.props.loadData(res.data.data);
            } else {                              
                this.props.history.push('/login');
            }
            console.log(res.data)
        }        
      }).catch( err => {
        console.log(err)
      })
  }

  render() {
    return null
  }
}

export default AuthRoute;
