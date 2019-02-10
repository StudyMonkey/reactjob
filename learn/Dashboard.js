import React, { Component } from 'react'
import { Link, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from './Auth.redux'
import App from './App'
import { Button } from 'antd-mobile'

function Erying(){
    return <h1>二营</h1>
}

function Qibinglian(){
    return <h1>骑兵连</h1>
}

/* class Test extends React.Component{
    render(){
        console.log(this.props);
        return (
            <div>
                <h2>测试组件</h2>
                {this.props.match.params.location}
            </div>
        )
    }
} */

class Dashboard extends Component {
  render() {
    console.log(this.props);
    const { isAuth, logout,match } = this.props;
    const redirectToLogin = <Redirect to="/login"></Redirect>
    const app = (
        <div>
            <ul>
                <li><Link to={`${match.url}`}>一营</Link></li>
                <li><Link to={`${match.url}/Erying`}>二营</Link></li>
                <li><Link to={`${match.url}/Qibinglian`}>骑兵连</Link></li>
            </ul> 
            <Route path={`${match.url}`} exact component={App} />
            <Route path={`${match.url}/Erying`} component={Erying} />
            <Route path={`${match.url}/Qibinglian`} component={Qibinglian} />

        </div>
    );
    return (
        <div>
            { isAuth ? app : redirectToLogin }
            <Button onClick={logout}>退出登录</Button>
        </div>
    )
  }
}

const mapStatetoProps = state => state.auth
  
  const actionCreaters = { logout };

  export default connect(mapStatetoProps, actionCreaters)(Dashboard)
