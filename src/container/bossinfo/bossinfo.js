import React, { Component } from 'react'
import { NavBar } from 'antd-mobile';
import Avatar from '../../component/avatar/avatar'
import { List, InputItem, WingBlank, WhiteSpace, Button, TextareaItem } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from '../../redux/user.redux'

class BossInfo extends Component {

  constructor(props){
      super(props);
      this.state = {
          title: '',
          desc: '',
          company: '',
          money: ''
      }
  }

  handleChange = (key, val) => {
      this.setState({
          [key]: val
      })
  }

  render() {
    return (
      <div>
        { this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null }
        <NavBar leftContent="Back" mode="dark">BOSS完善信息页</NavBar>
        <WhiteSpace />
        <WingBlank>
          <Avatar 
            selectAvatar={ 
              imgname => {
                this.setState({
                  avatar: imgname
          })}}></Avatar>
          <WhiteSpace />
          <List>
              <InputItem onChange={v => this.handleChange('title', v)}>招聘职位</InputItem>
              <InputItem onChange={v => this.handleChange('company', v)}>公司名称</InputItem>
              <InputItem onChange={v => this.handleChange('money', v)}>职位薪资</InputItem>
              <TextareaItem rows={3} autoHeight title="职位要求" onChange={v => this.handleChange('desc', v)}></TextareaItem>              
          </List>
          <WhiteSpace />
          <Button onClick={ () => this.props.update(this.state) } type="primary">提交</Button>
        </WingBlank>
      </div>
    )
  }
}

const mapStatetoProps = state => state.user;

const actionCreaters = { update }

export default connect(mapStatetoProps, actionCreaters)(BossInfo);
