import React, { Component } from 'react'
import JsxTest from './components/JsxTest'
import StateMgt from './components/StateMgt'
import EventHandle from './components/EventHandle'
import Lifecycle from './components/Lifecycle'
import ContextTest from './components/ContextTest'
import HocTest from './components/HocTest'
import Composition from './components/Composition'
import HooksTest from './components/HooksTest'
import HooksReducer from './components/HooksReducer'
import HooksContext from './components/HooksContext'

// class组件
// class App extends Component {
//   render () {
//     return (
//       <h1>{this.props.title}</h1>
//     )
//   }
// }

// 函数式组件
function App (props) {
  return (
    <div>
      <JsxTest />
      {/* 状态管理 */}
      {/* <StateMgt /> */}
      {/* 事件处理 */}
      <EventHandle />
      {/* 组件通信 */}
      <h1>{props.title}</h1>
      {/* 生命周期 */}
      <Lifecycle />
      {/* Context */}
      <ContextTest />
      {/* HOC */}
      <HocTest />
      {/* 组件复合 */}
      <Composition />
      {/* Hooks */}
      <HooksTest />
      <HooksReducer />
      <HooksContext />
    </div>
  )
}

export default App
