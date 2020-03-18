import React from 'react'
import ReactDOM from 'react-dom'
import logo from './logo.svg'
import style from './index.module.css'

// React 类负责逻辑控制，比如修改数据 -> vdom
// ReactDOM 类负责渲染，vdom -> dom
// babel-loader 可以转换 jsx -> vdom，React.createElement()
const name = 'React真帅'
const title = name ? <h1>{name}</h1> : null
const arr = [1, 2, 3].map(num => <li key={num}>{num}</li>)
const jsx = (
  <div>
    <h1>{title}</h1>
    <ul>{arr}</ul>
    <img src={logo} alt='logo' style={{ width: 100 }} className={style.img} />
  </div>
)
console.log(jsx)

ReactDOM.render(jsx, document.getElementById('root'))
