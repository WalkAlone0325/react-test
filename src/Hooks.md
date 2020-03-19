## Hooks

Hook 是 React16.8 一个新增项，他可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。
Hook 的特点：

- 使你在无需修改组件结构的情况下复用状态逻辑
- 可将组件中相互关联的部分拆分成更小的函数，复杂组件将变得更容易理解
- 更简洁、更易理解的代码

#### 准备工作

升级 react、react-dom
`npm i react react-dom -S`

### 状态钩子 State Hook

- 创建 HooksTest.jsx

```jsx
import React, { useState } from 'react'

// 仅展示水果列表
function FruitList({ fruits, onSetFruit }) {
  return (
    <ul>
      {fruits.map(f => (
        <li key={f} onClick={() => onSetFruit(f)}>
          {f}
        </li>
      ))}
    </ul>
  )
}

export default function HooksTest() {
  // useState(initialState)，接收初始状态，返回一个由状态和其更新函数组成的数组
  const [fruit, setFruit] = useState('')
  const [fruits, setFruits] = useState(['香蕉', '草莓', '芒果'])
  return (
    <div>
      <p>{fruit === '' ? '请选择喜爱的水果' : `您的选择是：${fruit}`}</p>
      {/* 列表 */}
      <FruitList fruits={fruits} onSetFruit={setFruit}></FruitList>
    </div>
  )
}
```

### 副作用钩子 Effect Hook

useEffect 给函数组件增加了执行副作用操作的能力

数据获取，设置订阅以及受冻更改 React 组件中的 DOM 都属于副作用

```jsx
// 异步获取水果列表
useEffect(() => {
  setTimeout(() => {
    setFruits(['香蕉', '西瓜'])
  }, 1000)
}, []) // 依赖为空表示只执行一次，依赖变化重新执行

// 修改网页标题.此处根据点击的水果更改标题，所以需要依赖
useEffect(() => {
  document.title = fruit
}, [fruit])

// 清除定时器
useEffect(() => {
  const timer = setInterval(() => {
    console.log('msg')
  }, 1000)
  return () => {
    clearInterval(timer)
  }
}, [])
```

### useReducer

useReducer 是 useState 的可选项，常用于组件有复杂状态逻辑时，类似于 redux 中 reducer 概念。

- 商品列表状态维护

```jsx
/**
 * useReducer的方式
 */
import React, { useState, useEffect, useReducer } from 'react'

// 仅展示水果列表
function FruitList({ fruits, onSetFruit }) {
  return (
    <ul>
      {fruits.map(f => (
        <li key={f} onClick={() => onSetFruit(f)}>
          {f}
        </li>
      ))}
    </ul>
  )
}

// 添加fruit状态维护fruitReducer
// 理解为 vuex 里面的 mutations
function fruitReducer(state, action) {
  switch (action.type) {
    case 'init':
      return action.payload
    case 'add':
      return [...state, action.payload]
    default:
      return state
  }
}

export default function HooksTest() {
  // useState(initialState)，接收初始状态，返回一个由状态和其更新函数组成的数组
  const [fruit, setFruit] = useState('')
  // 组件内的状态不需要了
  // const [fruits, setFruits] = useState([])

  // 参数1是reducer 参数2是初始值
  const [fruits, dispatch] = useReducer(fruitReducer, [])

  // 异步获取水果列表
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'init', payload: ['香蕉', '西瓜'] })
    }, 1000)
  }, []) // 依赖为空表示只执行一次，依赖变化重新执行

  return (
    <div>
      {/* <FruitAdd onAddFruit={pname => dispatch({ type: 'add', payload: pname })}></FruitAdd> */}
      <p>{fruit === '' ? '请选择喜爱的水果' : `您的选择是：${fruit}`}</p>
      {/* 列表 */}
      <FruitList fruits={fruits} onSetFruit={setFruit}></FruitList>
    </div>
  )
}
```

### useContext

useContext 用于在快速在函数组件中导入上下文
