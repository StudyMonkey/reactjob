import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd-mobile';
import { addGun, removeGun, addGunAsync } from './index.redux'


// @connect(mapStatetoProps, actionCreaters);
class App extends Component {
  render() {
    const { addGun, removeGun, addGunAsync, num } = this.props;
    return (
      <div>
        <Button type="primary" onClick={addGun}>申请武器</Button>
        <Button onClick={removeGun}>上交武器</Button>
        <Button onClick={ addGunAsync }>拖两天再给</Button>
        <h1>现在有机枪{num}把</h1>
      </div>
    )
  }
}

const mapStatetoProps = state => (
  {num: state.counter}
)

const actionCreaters = { addGun, removeGun, addGunAsync };

export default connect(mapStatetoProps, actionCreaters)(App);