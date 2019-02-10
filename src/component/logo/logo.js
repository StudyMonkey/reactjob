import React, { Component } from 'react'
import imgLogo from './job.png'
import './logo.css'

export default class Logo extends Component {
  render() {
    return (
      <div>       
        <div className="img-container">
            <img src={imgLogo} alt="job"/>
        </div>       
      </div>
    )
  }
}
