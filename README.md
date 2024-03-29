测试更新

## 组件

> 组件是抽象的独立功能模块，react 应用程序由组建构建而成。

### 组件的两种形式

1. function 组件

   > 函数组件通常 无状态，仅关注内容展示，返回渲染结果即可

2. class 组件

   > class 组件通常拥有状态和生命周期，继承于 Component，实现 render 方法，创建 component/CompType.js 提取前面 jsx 相关代码至 component/JsxTest.js

### 组件状态管理

如果组件中的数据会变化，并影响页面内容，则组件需要拥有状态（state），并维护状态。

#### 类组件中的状态管理

class 组件使用 state 和 setState 维护状态
范例：创建状态管理组件 components/StateMgt.js

```jsx
import React, { Component } from 'react'

class Clock extends Component {
  constructor(props) {
    super(props)
    // 初始化状态
    this.state = {
      date: new Date()
    }
  }

  componentDidMount() {
    // 定时器
    this.timerId = setInterval(() => {
      // 通过setState更新状态
      this.setState({
        date: new Date()
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  render() {
    return <div>{this.state.date.toLocaleTimeString()}</div>
  }
}

export default function StateMgt() {
  return (
    <div>
      <Clock></Clock>
    </div>
  )
}
```

拓展：setState 特性讨论

- 用 setState 更新状态而不能直接修改
  `this.state.counter += 1 // 错误的`
- setState 是批量执行的，因此对同一个状态执行多次只起一次作用，多个状态的更新可以放在同一个 setState 中进行：

```jsx
componentDidMount() {
  // 假如counter初始值为0，执行三次以后其结果是多少
  // 若同一个key多次出现，最后那个起作用
  this.setState({counter: this.state + 1})
  this.setState({counter: this.state + 1})
  this.setState({counter: this.state + 1})
}
```

- setState 通常是异步的，因此如果需要获取到最新状态值有以下是三种方式：

  1. 传递函数给 setState 方法，

  ```js
  this.setState((state, props) => ({ counter: state.counter + 1 })) // 1
  this.setState((state, props) => ({ counter: state.counter + 1 })) // 2
  this.setState((state, props) => ({ counter: state.counter + 1 })) // 3
  ```

  2. 使用定时器

  ```js
  setTimeout(() => {
    console.log(this.state.counter)
  }, 0)
  ```

  3. 原生实践中修改状态

  ```js
  componentDidMount () {
    document.body.addEventListener('click', this.changeValue, false)
    changeValue () {
      this.setState({counter:this.state.counter + 1})
      console.log(this.state.counter)
    }
  }
  ```

### 事件处理

```jsx
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

  handleChange(e) {
    // this 指向
    this.setState({
      name: e.target.value
    })
  }

  // 3. 使用箭头函数(推荐使用)
  // handleChange = e => {
  //   this.setState({
  //     name: e.target.value
  //   })
  // }

  render() {
    return (
      <div>
        {/* 2. 使用箭头函数传参的方式 */}
        <input
          type='text'
          value={this.state.name}
          onChange={e => this.handleChange(e)}
        />
        <p>{this.state.name}</p>
      </div>
    )
  }
}
```

### 组件通信

#### Props 属性传递

```jsx
// index.js
ReactDOM.render(<App title='react真帅' />, document.getElementById('root'))

// App.js
{
  this.props.title
}
```

如果父组件传递的是函数，则可以把子组件信息传入父组件，这个常被称为状态提升。StateMgt.js

```jsx
// StateMgt
<Clock change={this.onChange}>

// clock
this.timerID = setInterval(() => {
  this.setState({
    date: new Date()
  }, () => {
    // 每次状态更新就通知父组件
    this.props.change(this.state.date)
  })
}, 1000)
```

#### context

跨层级组件之间通信。context 实现祖代组件向后代组件跨层级传值。
在 Context 模式下有两个角色：

- Provider：外层提供数据的组件
- Consumer：内层获取数据的组件

> 主要用于组件库开发中

```jsx
import React, { Component } from 'react'

// 1.创建上下文
const Context = React.createContext()

// 2.获取Provider和Consumer
const Provider = Context.Provider
const Consumer = Context.Consumer

function Child(props) {
  return <div onClick={() => props.add()}>{props.counter}</div>
}

export default class ContextTest extends Component {
  state = {
    counter: 0
  }

  add = () => {
    this.setState({ counter: this.state.counter + 1 })
  }
  render() {
    return (
      <Provider value={{ counter: this.state.counter, add: this.add }}>
        <Consumer>{value => <Child>{...value}</Child>}</Consumer>
      </Provider>
    )
  }
}
```

#### redux

类似 vuex，无明显关系的组件间通信

### HOC 高阶组件

为了提高组件复用率，可测试性，就要**保证组件功能单一性**，但是若要满足复杂需求就要扩展功能单一的组件，在 React 里就有了 HOC（Higher-Order Components）的概念，**高阶组件是一个工厂函数，它接收一个组件并返回另一个组件**

##### 基本使用

例：为展示组件添加获取数据能力

```jsx
import React from 'react'

// Lesson保证功能单一，他不关心数据来源，只负责显示
function Lesson(props) {
  return (
    <div>
      {props.stage} - {props.title}
    </div>
  )
}

// 模拟数据
const lessons = [
  { stage: 'react', title: '核心api' },
  { stage: 'react', title: '组件化1' },
  { stage: 'react', title: '组件化2' }
]

// 定义高阶组件withContent
// 包装后的组件传入参数，根据改参数获取显示数据
const withContent = Comp => props => {
  const content = lessons[props.idx]
  return <Comp {...content} />
}

// 包装
const LessonWithContent = withContent(Lesson)

export default function HocTest() {
  return (
    <div>
      {[0, 0, 0].map((item, idx) => (
        <LessonWithContent key={idx} idx={idx} />
      ))}
    </div>
  )
}
```

#### 链式调用

```jsx
// withLog高阶组件，能够在组件挂载时输出日志
const withLog = Comp => {
  return class extends React.Component {
    componentDidMount() {
      console.log('didMount', this.props)
    }

    render() {
      return <Comp {...this.props} />
    }
  }
}

// 包装
const LessonWithContent = withLog(withContent(Lesson))
```

### 组件复合-Composition

复合组件给予你足够的敏捷去定义自定义组件的外观和行为，这种方式更明确和安全，如果组件间有公用的非 UI 逻辑，将它们抽取为 js 模块导入使用而不是继承它。

#### 组建复合

例：Dialog 组件负责展示，内容从外部传入即可，components/Composition.js

```jsx
/**
 * 类似vue的插槽slot
 */
import React from 'react'

// Dialog定义组件外观和行为
function Dialog(props) {
  // 这里props.children代表了标签内部的内容
  // children是一个合法的js表达式
  return (
    <div style={{ border: '1px solid blue' }}>
      {props.children.def}
      <div>{props.children.footer}</div>
    </div>
  )
}

export default function Composition() {
  return (
    <div>
      <Dialog>
        {/* 具名插槽功能的实现 */}
        {{
          def: (
            <>
              <h1>组件复合</h1>
              <p>复合组件给予你足够的敏捷去定义自定义组件的外观和行为 </p>
            </>
          ),
          footer: <button onClick={() => alert('react真好')}>确定</button>
        }}
      </Dialog>
    </div>
  )
}
```

```jsx
/**
 * 类似vue的插槽slot
 */
import React from 'react'

// Dialog定义组件外观和行为
function Dialog(props) {
  // 这里props.children代表了标签内部的内容
  // children是一个合法的js表达式

  // 备选消息
  const message = {
    foo: { title: 'foo', content: 'foo~' },
    bar: { title: 'bar', content: 'bar~' }
  }
  // 执行函数获得要显示的内容
  const { def, footer } = props.children(message[props.msg])

  return (
    <div style={{ border: '1px solid blue' }}>
      {def}
      <div>{footer}</div>
    </div>
  )
}

export default function Composition() {
  return (
    <div>
      <Dialog msg='foo'>
        {/* 作用域插槽功能的实现 */}
        {({ title, content }) => ({
          def: (
            <>
              <h1>{title}</h1>
              <p>{content}</p>
            </>
          ),
          footer: <button onClick={() => alert('react真好')}>确定</button>
        })}
      </Dialog>
    </div>
  )
}
```

### 高阶应用：修改 children

如果 props.children 是 jsx，此时他是不能修改的，是只读的

例：实现 RadioGroup 和 Radio 组件，可通过 RadioGroup 设置 Radio 的 name

```jsx
/**
 * 类似vue的插槽slot
 */
import React from 'react'

// Dialog定义组件外观和行为
function Dialog(props) {
  // 这里props.children代表了标签内部的内容
  // children是一个合法的js表达式

  // 备选消息
  const message = {
    foo: { title: 'foo', content: 'foo~' },
    bar: { title: 'bar', content: 'bar~' }
  }
  // 执行函数获得要显示的内容
  const { def, footer } = props.children(message[props.msg])

  return (
    <div style={{ border: '1px solid blue' }}>
      {def}
      <div>{footer}</div>
    </div>
  )
}

function RadioGroup(props) {
  return (
    <div>
      {React.Children.map(props.children, radio => {
        // 要修改虚拟dom 只能克隆它
        // 参数1：克隆对象  参数2：设置的属性
        return React.cloneElement(radio, { name: props.name })
      })}
    </div>
  )
}

function Radio({ children, ...rest }) {
  return (
    <label>
      <input type='radio' {...rest} />
      {children}
    </label>
  )
}

export default function Composition() {
  return (
    <div>
      <Dialog msg='foo'>
        {/* 作用域插槽功能的实现 */}
        {({ title, content }) => ({
          def: (
            <>
              <h1>{title}</h1>
              <p>{content}</p>
            </>
          ),
          footer: <button onClick={() => alert('react真好')}>确定</button>
        })}
      </Dialog>

      <RadioGroup name='mvvm'>
        <Radio value='vue'>Vue</Radio>
        <Radio value='react'>React</Radio>
        <Radio value='ng'>angular</Radio>
      </RadioGroup>
    </div>
  )
}
```

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
