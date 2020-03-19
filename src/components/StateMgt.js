/**
 * 演示状态管理
 */
import React, { Component, useState, useEffect } from 'react'

// 函数组件状态管理：useState, useEffect
// hooks 只能在 16.8.x 以后使用
function ClockFunc () {
  // 创建状态，useState 返回状态和修改状态的函数所组成的数组
  const [date, setDate] = useState(new Date())

  // 副作用：dom操作，异步调用，ajax
  // 定时器是副作用，需要用到useEffect 
  useEffect(() => {
    const timerId = setInterval(() => {
      // 通过setState更新状态
      setDate(new Date())
    }, 1000)
    // 释放函数
    return () => {
      clearInterval(timerId)
    }
  }, []) // 参数2指的是依赖状态，本例中没有依赖，放一个空数组
  return (
    <div>{date.toLocaleTimeString()}</div>
  )
}


class Clock extends Component {
  constructor(props) {
    super(props)
    // 初始化状态
    this.state = {
      date: new Date()
    }
  }

  componentDidMount () {
    // 定时器
    this.timerId = setInterval(() => {
      // 通过setState更新状态
      this.setState({
        date: new Date()
      }, () => {
        // 每次状态更新就通知父组件
        this.props.change(this.state.date)
      })
      // 通知父组件变更
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timerId)
  }

  render () {
    return (
      <div>
        {this.state.date.toLocaleTimeString()}
      </div>
    )
  }
}

export default function StateMgt () {
  return (
    <div>
      <Clock change={(date) => console.log(date.toLocaleTimeString())} />
      <ClockFunc />
    </div>
  )
}
