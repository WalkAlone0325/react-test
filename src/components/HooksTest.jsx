import React, { useState, useEffect } from 'react'

// 仅展示水果列表
function FruitList ({ fruits, onSetFruit }) {
  return (
    <ul>
      {fruits.map(f => <li key={f} onClick={() => onSetFruit(f)}>{f}</li>)}
    </ul>
  )
}

// 声明输入组件
function FruitAdd (props) {
  // 输入内容状态及设置内容状态的方法
  const [pname, setPname] = useState('')
  // 键盘事件处理
  const onAddFruit = e => {
    if (e.key === 'Enter') {
      props.onAddFruit(pname)
      setPname('')
    }
  }
  return (
    <div>
      <input
        type="text"
        value={pname}
        onChange={e => setPname(e.target.value)}
        onKeyDown={onAddFruit}
      />
    </div>
  )
}

export default function HooksTest () {
  // useState(initialState)，接收初始状态，返回一个由状态和其更新函数组成的数组
  const [fruit, setFruit] = useState("")
  const [fruits, setFruits] = useState(['香蕉', '草莓', '芒果'])

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
    }, 1000);
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div>
      <FruitAdd onAddFruit={pname => setFruits([...fruits, pname])}></FruitAdd>
      <p>{fruit === "" ? "请选择喜爱的水果" : `您的选择是：${fruit}`}</p>
      {/* 列表 */}
      <FruitList fruits={fruits} onSetFruit={setFruit}></FruitList>
    </div>
  )
}
