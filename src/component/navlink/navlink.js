import React, { Component } from 'react'
import { TabBar } from 'antd-mobile';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import propTypes from 'prop-types'

@connect(
    state => state.chat
)
@withRouter
class navlink extends Component {

  static propTypes = {
      data: propTypes.array.isRequired
  }

  render() {
    const navList = this.props.data.filter( v => !v.hide);
    const { pathname } = this.props.location;
    console.log('navlink unread:', this.props.unread);
    return (
        <TabBar>
            { navList.map( v => 
                (<TabBar.Item
                    badge={v.path === '/msg' ? this.props.unread : 0}
                    key={v.path}
                    title={v.text}
                    icon={{uri: require(`./img/${v.icon}.png`)}}
                    selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                    selected={v.path === pathname}
                    onPress={() => this.props.history.push(v.path)}
                >

                </TabBar.Item>)
            ) }
        </TabBar>
    )
  }
}

export default navlink;
