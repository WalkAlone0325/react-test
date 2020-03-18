/**
 * 用户事件处理
 */
import React, { Component } from 'react'

export default class EventHandle extends Component() {

  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
    // 1. 在constructor里重新绑定this
    // this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    // this 指向
    this.setState({
      name: e.target.value
    })
  }

  // 3. 使用箭头函数
  // handleChange = e => {
  //   this.setState({
  //     name: e.target.value
  //   })
  // }

  render () {
    return (
      <div>
        {/* 2. 使用箭头函数传参的方式 */}
        <input type="text" value={this.state.name} onChange={e => this.handleChange(e)} />
        <p>{this.state.name}</p>
      </div>
    )
  }
}
