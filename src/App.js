import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
// 路由组件
import Login from './container/login/login';
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo';
import Dashboard from './container/dashboard/dashboard'
import Chat from './component/chat/chat'
import Demo from './demo'

export default class App extends Component {

  constructor(props){
      super(props);
      this.state = {
          hasError: false
      }
  }

  componentDidCatch(err, info){ // 渲染组件出错时的生命周期
    console.log(err,info);
    this.setState({
        hasError: true
    })

  }

  render() {
    return this.state.hasError ? <img src={require('./error.jpg')} alt="error" /> : (
        <div>
        <AuthRoute />
            <Switch>
                <Route path="/bossinfo" component={ BossInfo } />
                <Route path="/geniusinfo" component={ GeniusInfo } />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/chat/:user" component={Chat} />
                <Route path="/demo" component={Demo} />
                <Route component={Dashboard} />
            </Switch>
        </div>
    )
  }
}
